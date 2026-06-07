import { supabaseAdmin } from "@/lib/supabase/admin";

type RegisterBody = {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  companyName: string;
  website: string;
  industry: string;
  companySize: string;
  headquarters: string;
  description?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function optionalStr(value: unknown): string | null {
  const s = str(value);
  return s.length > 0 ? s : null;
}

function isEmailTakenError(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes("already registered") ||
    m.includes("already been registered") ||
    m.includes("already exists") ||
    m.includes("user already")
  );
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!raw || typeof raw !== "object") {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const body = raw as Record<string, unknown>;

  const fullName = str(body.fullName);
  const email = str(body.email).toLowerCase();
  const password = typeof body.password === "string" ? body.password : "";
  const phone = optionalStr(body.phone);
  const companyName = str(body.companyName);
  const website = str(body.website);
  const industry = str(body.industry);
  const companySize = str(body.companySize);
  const headquarters = str(body.headquarters);
  const description = optionalStr(body.description);

  if (!fullName) {
    return Response.json({ error: "Full name is required." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return Response.json(
      { error: "A valid email address is required." },
      { status: 400 },
    );
  }
  if (!password || password.length < 8) {
    return Response.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 },
    );
  }
  if (!companyName) {
    return Response.json({ error: "Company name is required." }, { status: 400 });
  }
  if (!website) {
    return Response.json(
      { error: "Company website is required." },
      { status: 400 },
    );
  }
  if (!industry) {
    return Response.json({ error: "Industry is required." }, { status: 400 });
  }
  if (!companySize) {
    return Response.json({ error: "Company size is required." }, { status: 400 });
  }
  if (!headquarters) {
    return Response.json(
      { error: "Headquarters location is required." },
      { status: 400 },
    );
  }

  const createdUser = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, role: "employer" },
  });

  if (createdUser.error || !createdUser.data.user) {
    const message = createdUser.error?.message ?? "Failed to create user.";
    if (isEmailTakenError(message)) {
      return Response.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }
    const e = createdUser.error as {
      message?: string;
      details?: string;
      hint?: string;
      code?: string;
    } | null;
    console.error("[auth.admin.createUser] failed:", {
      message: e?.message,
      details: e?.details,
      hint: e?.hint,
      code: e?.code,
      error: createdUser.error,
    });
    return Response.json({ error: message }, { status: 500 });
  }

  const userId = createdUser.data.user.id;

  const companyInsert = await supabaseAdmin
    .from("companies")
    .insert({
      name: companyName,
      website,
      industry,
      company_size: companySize,
      headquarters,
      description,
      status: "pending",
      created_by: userId,
    })
    .select("id")
    .single();

  if (companyInsert.error || !companyInsert.data) {
    const e = companyInsert.error as {
      message?: string;
      details?: string;
      hint?: string;
      code?: string;
    } | null;
    console.error("[companies insert] failed:", {
      message: e?.message,
      details: e?.details,
      hint: e?.hint,
      code: e?.code,
      error: companyInsert.error,
    });
    await supabaseAdmin.auth.admin.deleteUser(userId);
    return Response.json(
      {
        error:
          companyInsert.error?.message ??
          "Failed to create company. Please try again.",
      },
      { status: 500 },
    );
  }

  const companyId = companyInsert.data.id as string;

  const profileInsert = await supabaseAdmin.from("employer_profiles").insert({
    user_id: userId,
    company_id: companyId,
    full_name: fullName,
    phone,
    role: "owner",
  });

  if (profileInsert.error) {
    const e = profileInsert.error as {
      message?: string;
      details?: string;
      hint?: string;
      code?: string;
    };
    console.error("[employer_profiles insert] failed:", {
      message: e.message,
      details: e.details,
      hint: e.hint,
      code: e.code,
      error: profileInsert.error,
    });
    await supabaseAdmin.from("companies").delete().eq("id", companyId);
    await supabaseAdmin.auth.admin.deleteUser(userId);
    return Response.json(
      {
        error:
          profileInsert.error.message ??
          "Failed to create employer profile. Please try again.",
      },
      { status: 500 },
    );
  }

  return Response.json({ ok: true } satisfies { ok: true }, { status: 200 });
}

export type { RegisterBody };

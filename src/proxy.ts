import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Next.js 16 Proxy (formerly "middleware").
 *
 * Routes that require an authenticated session. The marketing landing page,
 * /employers, and the auth pages stay public — the landing promotes the
 * product, the product itself lives behind login.
 */
const PROTECTED_PREFIXES = [
  "/jobs",
  "/companies",
  "/events",
  "/dashboard",
  "/profile",
];

function isProtected(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase isn't configured yet, leave routing open (gating inactive).
  if (!url || !key) return response;

  // Supabase sometimes drops the auth `code` on the Site URL root instead of
  // our /auth/callback (when emailRedirectTo isn't allow-listed). Funnel any
  // stray code to the callback handler so confirmation still completes.
  if (
    request.nextUrl.pathname !== "/auth/callback" &&
    request.nextUrl.searchParams.has("code")
  ) {
    const cbUrl = request.nextUrl.clone();
    cbUrl.pathname = "/auth/callback";
    return NextResponse.redirect(cbUrl);
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Refreshes the session and is the single source of truth for auth state.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Redirect helper that preserves any session cookies refreshed above.
  const redirectTo = (apply: (u: URL) => void) => {
    const url = request.nextUrl.clone();
    apply(url);
    const redirect = NextResponse.redirect(url);
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  };

  // Gate the product behind login.
  if (!user && isProtected(pathname)) {
    return redirectTo((u) => {
      u.pathname = "/login";
      u.searchParams.set("redirect", pathname);
    });
  }

  // Logged-in users shouldn't see the auth screens.
  if (user && (pathname === "/login" || pathname === "/signup")) {
    return redirectTo((u) => {
      u.pathname = "/dashboard";
      u.search = "";
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Run on all routes except Next internals and static assets.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

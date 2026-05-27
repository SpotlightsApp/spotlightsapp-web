import { cookies } from "next/headers";
import { dictionaries, type Locale } from "@/lib/i18n/dictionaries";

/** Read the locale chosen by the visitor (cookie set by the client toggle). */
export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get("spotlight.locale")?.value;
  return value === "th" ? "th" : "en";
}

/** Server-side dictionary for translating server components. */
export async function getDict() {
  return dictionaries[await getLocale()];
}

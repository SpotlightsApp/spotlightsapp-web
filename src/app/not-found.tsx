import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { getDict } from "@/lib/i18n/server";

export default async function NotFound() {
  const t = await getDict();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Logo href="/" />
      <p className="font-display mt-10 text-7xl text-accent-strong">404</p>
      <h1 className="mt-4 text-2xl font-semibold">{t.notFound.title}</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">{t.notFound.body}</p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">{t.notFound.home}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/jobs">{t.notFound.browse}</Link>
        </Button>
      </div>
    </div>
  );
}

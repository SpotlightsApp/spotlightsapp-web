import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Sign up · Spotlights" };

export default function SignupChooserPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="flex gap-4">
        <Button asChild size="lg" className="min-w-[180px]">
          <Link href="/signup/student">Student</Link>
        </Button>
        <Button asChild size="lg" className="min-w-[180px]">
          <Link href="/employers/register">Employer</Link>
        </Button>
      </div>
    </main>
  );
}

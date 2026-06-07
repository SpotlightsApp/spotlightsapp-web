import type { Metadata } from "next";
import { EmployerRegisterForm } from "@/components/employers/employer-register-form";

export const metadata: Metadata = {
  title: "Employer registration — Spotlights",
};

export default function EmployerRegisterPage() {
  return (
    <main className="min-h-screen bg-surface px-6 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-2xl">
        <EmployerRegisterForm />
      </div>
    </main>
  );
}

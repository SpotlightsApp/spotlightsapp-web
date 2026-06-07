"use client";

import { useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Step1Errors = Partial<{
  fullName: string;
  workEmail: string;
  password: string;
  confirmPassword: string;
  phone: string;
}>;

type Step2Errors = Partial<{
  companyName: string;
  companyWebsite: string;
  industry: string;
  companySize: string;
  headquarters: string;
}>;

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "proton.me",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INDUSTRY_OPTIONS = [
  "Technology / Software",
  "Finance / Banking",
  "Consulting",
  "Healthcare",
  "Education",
  "Retail / E-commerce",
  "Manufacturing",
  "Media / Entertainment",
] as const;

const COMPANY_SIZE_OPTIONS = ["1-10", "11-50", "51-200", "201-500", "500+"] as const;

type FieldLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
};

function FieldLabel({ htmlFor, children, required }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
      {children}
      {required && <span className="ml-0.5 text-destructive">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-destructive">{message}</p>;
}

export function EmployerRegisterForm() {
  // Form lifecycle
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);

  // Step 1 state
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [step1Errors, setStep1Errors] = useState<Step1Errors>({});

  // Step 2 state
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [headquarters, setHeadquarters] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [step2Errors, setStep2Errors] = useState<Step2Errors>({});

  function validateStep1(): Step1Errors {
    const errors: Step1Errors = {};
    if (!fullName.trim()) errors.fullName = "Full name is required.";

    const email = workEmail.trim().toLowerCase();
    if (!email) {
      errors.workEmail = "Work email is required.";
    } else if (!EMAIL_RE.test(email)) {
      errors.workEmail = "Please enter a valid email address.";
    } else {
      const domain = email.split("@")[1] ?? "";
      if (FREE_EMAIL_DOMAINS.has(domain)) {
        errors.workEmail = "Please use your company email address.";
      }
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  }

  function validateStep2(): Step2Errors {
    const errors: Step2Errors = {};
    if (!companyName.trim()) errors.companyName = "Company name is required.";
    if (!companyWebsite.trim()) {
      errors.companyWebsite = "Company website is required.";
    }
    if (!industry) errors.industry = "Please select an industry.";
    if (!companySize) errors.companySize = "Please select a company size.";
    if (!headquarters.trim()) {
      errors.headquarters = "Headquarters location is required.";
    }
    return errors;
  }

  function handleContinue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors = validateStep1();
    setStep1Errors(errors);
    if (Object.keys(errors).length === 0) {
      setStep(2);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors = validateStep2();
    setStep2Errors(errors);
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[var(--radius)] border border-border bg-background p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h1 className="mt-6 font-display text-3xl text-foreground">
          Registration submitted
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your company is pending review. We&apos;ll email you at{" "}
          <span className="font-medium text-foreground">{workEmail}</span> once
          it&apos;s approved.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius)] border border-border bg-background p-6 shadow-sm sm:p-10">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-accent-strong">
            Step {step} of 2
          </span>
          <span className="text-xs text-muted-foreground">
            {step === 1 ? "Your account" : "Your company"}
          </span>
        </div>
        <div className="mt-2 flex gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-accent" />
          <div
            className={
              step === 2
                ? "h-1.5 flex-1 rounded-full bg-accent"
                : "h-1.5 flex-1 rounded-full bg-surface-2"
            }
          />
        </div>
      </div>

      <h1 className="font-display text-3xl text-foreground">
        {step === 1 ? "Create your employer account" : "Tell us about your company"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {step === 1
          ? "Set up your sign-in details. Use your company email."
          : "We'll show this to candidates once your company is approved."}
      </p>

      {step === 1 ? (
        <form onSubmit={handleContinue} className="mt-8 space-y-5" noValidate>
          <div>
            <FieldLabel htmlFor="fullName" required>
              Full name
            </FieldLabel>
            <Input
              id="fullName"
              name="fullName"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Smith"
            />
            <FieldError message={step1Errors.fullName} />
          </div>

          <div>
            <FieldLabel htmlFor="workEmail" required>
              Work email
            </FieldLabel>
            <Input
              id="workEmail"
              name="workEmail"
              type="email"
              autoComplete="email"
              value={workEmail}
              onChange={(e) => setWorkEmail(e.target.value)}
              placeholder="jane@yourcompany.com"
            />
            <FieldError message={step1Errors.workEmail} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="password" required>
                Password
              </FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <FieldError message={step1Errors.password} />
            </div>
            <div>
              <FieldLabel htmlFor="confirmPassword" required>
                Confirm password
              </FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
              <FieldError message={step1Errors.confirmPassword} />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="phone">Phone (optional)</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+66 81 234 5678"
            />
            <FieldError message={step1Errors.phone} />
          </div>

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <div>
            <FieldLabel htmlFor="companyName" required>
              Company name
            </FieldLabel>
            <Input
              id="companyName"
              name="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme Inc."
            />
            <FieldError message={step2Errors.companyName} />
          </div>

          <div>
            <FieldLabel htmlFor="companyWebsite" required>
              Company website
            </FieldLabel>
            <Input
              id="companyWebsite"
              name="companyWebsite"
              type="url"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              placeholder="https://yourcompany.com"
            />
            <FieldError message={step2Errors.companyWebsite} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="industry" required>
                Industry
              </FieldLabel>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger id="industry" aria-label="Industry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRY_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError message={step2Errors.industry} />
            </div>
            <div>
              <FieldLabel htmlFor="companySize" required>
                Company size
              </FieldLabel>
              <Select value={companySize} onValueChange={setCompanySize}>
                <SelectTrigger id="companySize" aria-label="Company size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {COMPANY_SIZE_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError message={step2Errors.companySize} />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="headquarters" required>
              Headquarters location
            </FieldLabel>
            <Input
              id="headquarters"
              name="headquarters"
              value={headquarters}
              onChange={(e) => setHeadquarters(e.target.value)}
              placeholder="Bangkok, Thailand"
            />
            <FieldError message={step2Errors.headquarters} />
          </div>

          <div>
            <FieldLabel htmlFor="companyDescription">
              Company description
            </FieldLabel>
            <Textarea
              id="companyDescription"
              name="companyDescription"
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              placeholder="What does your company do, and what makes it a great place to start a career?"
            />
          </div>

          <div>
            <FieldLabel htmlFor="companyLogo">Company logo</FieldLabel>
            <label
              htmlFor="companyLogo"
              className="flex h-11 w-full cursor-pointer items-center justify-between rounded-md border border-input bg-background px-3.5 text-sm transition-colors hover:bg-surface-2"
            >
              <span className="truncate text-muted-foreground">
                {companyLogo ? companyLogo.name : "Choose an image (PNG, JPG, SVG)"}
              </span>
              <Upload className="h-4 w-4 opacity-60" />
            </label>
            <input
              id="companyLogo"
              name="companyLogo"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => setCompanyLogo(e.target.files?.[0] ?? null)}
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
            <Button type="submit">Submit registration</Button>
          </div>
        </form>
      )}
    </div>
  );
}

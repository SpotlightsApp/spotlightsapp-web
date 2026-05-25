import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "For students",
    links: [
      { label: "Find jobs", href: "/jobs" },
      { label: "Internships", href: "/jobs?type=Internship" },
      { label: "Companies", href: "/companies" },
      { label: "Career events", href: "/events" },
    ],
  },
  {
    title: "For employers",
    links: [
      { label: "Post a job", href: "/employers" },
      { label: "Find talent", href: "/employers" },
      { label: "Campus events", href: "/employers" },
      { label: "Pricing", href: "/employers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Career guides", href: "#" },
      { label: "Resume tips", href: "#" },
      { label: "Salary insights", href: "#" },
      { label: "Help center", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Universities", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-[15rem] text-sm text-muted-foreground">
              Where Thailand&apos;s students and new grads find what&apos;s next.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-accent-strong"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Spotlight. Made in Bangkok 🇹🇭</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

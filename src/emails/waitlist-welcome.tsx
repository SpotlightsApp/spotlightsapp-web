import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://spotlightsapp.com";

const brand = {
  blue: "#3A78C2",
  blueDark: "#235A97",
  text: "#1a1a1a",
  muted: "#6b6b6b",
  border: "#e7e7e4",
  surface: "#fafafa",
  bg: "#f4f6f8",
};

const styles = {
  body: {
    backgroundColor: brand.bg,
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: brand.text,
    margin: 0,
    padding: "40px 0",
  } as const,
  container: {
    maxWidth: "560px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    border: `1px solid ${brand.border}`,
  } as const,
  header: {
    padding: "28px 32px 0",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  } as const,
  brandName: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
    color: brand.text,
    letterSpacing: "-0.01em",
  } as const,
  body_section: { padding: "8px 32px 28px" } as const,
  eyebrow: {
    margin: "16px 0 0",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: brand.blueDark,
  } as const,
  heading: {
    margin: "8px 0 16px",
    fontSize: "26px",
    lineHeight: "1.15",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    color: brand.text,
  } as const,
  paragraph: {
    margin: "0 0 14px",
    fontSize: "15px",
    lineHeight: "1.6",
    color: brand.text,
  } as const,
  bullets: {
    margin: "8px 0 20px",
    padding: "16px 18px",
    backgroundColor: brand.surface,
    borderRadius: "12px",
    border: `1px solid ${brand.border}`,
  } as const,
  bullet: {
    margin: "0 0 8px",
    fontSize: "14px",
    lineHeight: "1.5",
    color: brand.text,
  } as const,
  bulletLast: {
    margin: 0,
    fontSize: "14px",
    lineHeight: "1.5",
    color: brand.text,
  } as const,
  cta: {
    display: "inline-block",
    backgroundColor: brand.blue,
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 600,
    padding: "12px 22px",
    borderRadius: "9999px",
  } as const,
  hr: {
    border: "none",
    borderTop: `1px solid ${brand.border}`,
    margin: "24px 0 16px",
  } as const,
  footer: {
    padding: "0 32px 28px",
    fontSize: "12px",
    lineHeight: "1.5",
    color: brand.muted,
  } as const,
  footerLink: { color: brand.blueDark, textDecoration: "none" } as const,
};

export function WaitlistWelcome({ name }: { name?: string }) {
  const first = (name?.trim().split(" ")[0]) || "there";
  return (
    <Html>
      <Head />
      <Preview>You&apos;re on the Spotlights waitlist — we&apos;ll be in touch.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Img
              src={`${ORIGIN}/Spotlightslogo.png`}
              alt=""
              width="28"
              height="28"
              style={{ borderRadius: "8px" }}
            />
            <Text style={styles.brandName}>Spotlights</Text>
          </Section>

          <Section style={styles.body_section}>
            <Text style={styles.eyebrow}>Launching soon</Text>
            <Heading as="h1" style={styles.heading}>
              You&apos;re on the list, {first} 🎉
            </Heading>

            <Text style={styles.paragraph}>
              Thanks for signing up. We&apos;re building Spotlights — Thailand&apos;s
              home for early-career talent. One profile, every internship and
              new-grad role, and the companies that are actually hiring you next.
            </Text>

            <Text style={styles.paragraph}>Here&apos;s what to expect:</Text>
            <Section style={styles.bullets}>
              <Text style={styles.bullet}>
                ✦ We&apos;ll email you the moment access opens up.
              </Text>
              <Text style={styles.bullet}>
                ✦ Waitlist members get in <strong>first</strong>, before public
                launch.
              </Text>
              <Text style={styles.bulletLast}>
                ✦ No spam — only launch news and a few product updates.
              </Text>
            </Section>

            <Link href={ORIGIN} style={styles.cta}>
              Visit Spotlights
            </Link>

            <Hr style={styles.hr} />

            <Text style={styles.paragraph}>
              Have a friend who&apos;s job-hunting? Forward this email — early
              access has limited seats.
            </Text>
          </Section>

          <Section style={styles.footer}>
            Spotlights · Bangkok, Thailand ·{" "}
            <Link href={ORIGIN} style={styles.footerLink}>
              spotlightsapp.com
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default WaitlistWelcome;

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
    textAlign: "center" as const,
  } as const,
  logo: {
    margin: "0 auto",
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

export function WaitlistWelcome(_props: { name?: string } = {}) {
  return (
    <Html>
      <Head />
      <Preview>You&apos;re on the Spotlight waitlist. We&apos;ll be in touch.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Img
              src="https://spotlightsapp.com/Spotlightslogo.png"
              width={140}
              alt="Spotlight"
              style={styles.logo}
            />
          </Section>

          <Section style={styles.body_section}>
            <Heading as="h1" style={styles.heading}>
              You&apos;re on the list.
            </Heading>

            <Text style={styles.paragraph}>
              Thanks for joining the Spotlight waitlist — Thailand&apos;s home
              for connecting university students with employers.
            </Text>

            <Text style={styles.paragraph}>
              We&apos;ll email you the moment early access opens up. Keep an eye
              on your inbox.
            </Text>

            <Text style={styles.paragraph}>— The Spotlight team</Text>

            <Hr style={styles.hr} />
          </Section>

          <Section style={styles.footer}>
            Spotlight · Bangkok, Thailand ·{" "}
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

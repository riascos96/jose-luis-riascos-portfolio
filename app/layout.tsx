import type { Metadata } from "next";
import { profile } from "@/lib/portfolio-content";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.jobTitle}`,
    template: `%s | ${profile.name}`,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: ["/icon.svg"],
  },
  description: profile.seoDescription,
  alternates: {
    canonical: "/",
  },
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.linkedinUrl }],
  creator: profile.name,
  publisher: profile.name,
  keywords: [
    "Jose Luis Riascos Murillo",
    "Cloud & DevOps Engineer",
    "AWS",
    "Serverless Architecture",
    "Node.js",
    "React",
    "Next.js",
    "TypeScript",
    "CI/CD",
    "CloudFormation",
  ],
  openGraph: {
    title: `${profile.name} | ${profile.jobTitle}`,
    description: profile.seoDescription,
    url: "/",
    siteName: profile.name,
    locale: "es_PA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.jobTitle}`,
    description: profile.seoDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}

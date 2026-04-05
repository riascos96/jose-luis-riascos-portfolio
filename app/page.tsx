import Script from "next/script";
import { ArchitectureSection } from "@/components/landing/ArchitectureSection";
import { CapabilityMatrix } from "@/components/landing/CapabilityMatrix";
import { ContactBlock } from "@/components/landing/ContactBlock";
import { DeliverySection } from "@/components/landing/DeliverySection";
import { HeroSection } from "@/components/landing/HeroSection";
import { PortfolioLocaleProvider } from "@/components/landing/PortfolioLocaleProvider";
import { SignalStrip } from "@/components/landing/SignalStrip";
import { StackDepthSection } from "@/components/landing/StackDepthSection";
import { buildProfileJsonLd, getPortraitPath } from "@/lib/site";

export default function Home() {
  const portraitPath = getPortraitPath();
  const profileJsonLd = buildProfileJsonLd(portraitPath);

  return (
    <>
      <Script
        id="profile-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <main id="main-content" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,119,182,0.12),transparent_34%),radial-gradient(circle_at_85%_8%,rgba(27,59,90,0.08),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(0,119,182,0.08),transparent_36%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(27,59,90,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(27,59,90,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40 mask-[radial-gradient(circle_at_center,black,transparent_82%)]"
        />
        <PortfolioLocaleProvider>
          <HeroSection portraitSrc={portraitPath} />
          <SignalStrip />
          <CapabilityMatrix />
          <ArchitectureSection />
          <DeliverySection />
          <StackDepthSection />
          <ContactBlock />
        </PortfolioLocaleProvider>
      </main>
    </>
  );
}

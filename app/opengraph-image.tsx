import { ImageResponse } from "next/og";
import { profile } from "@/lib/portfolio-content";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 48%, rgba(238,243,247,1) 100%)",
          color: "#1B3B5A",
          padding: "64px",
          position: "relative",
          fontFamily: "Avenir Next, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(0,119,182,0.12), transparent 32%), radial-gradient(circle at 85% 12%, rgba(27,59,90,0.1), transparent 20%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(27,59,90,0.12)",
            borderRadius: "32px",
            padding: "48px",
            background: "rgba(255,255,255,0.72)",
            boxShadow: "0 24px 80px rgba(27,59,90,0.12)",
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#0077B6",
            }}
          >
            {profile.jobTitle}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                fontSize: 76,
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                maxWidth: "840px",
              }}
            >
              {profile.name}
            </div>
            <div
              style={{
              fontSize: 34,
              lineHeight: 1.3,
              maxWidth: "880px",
              color: "#4f6478",
            }}
          >
            {profile.headline}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              fontSize: 24,
              color: "#4f6478",
            }}
          >
            <div>LinkedIn prioritario</div>
            <div>Panamá · Remoto / presencial</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const runtime = "edge";
export const alt = `${profile.name} — Supply Chain & Logistics Professional · Dubai`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#020617",
          backgroundImage: [
            "radial-gradient(ellipse 80% 60% at 85% 50%, rgba(34,211,238,0.22), transparent 60%)",
            "radial-gradient(ellipse 60% 50% at 15% 90%, rgba(96,165,250,0.18), transparent 60%)",
            "linear-gradient(rgba(96,165,250,0.08) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(96,165,250,0.08) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "100% 100%, 100% 100%, 60px 60px, 60px 60px",
          fontFamily: "Inter, system-ui, sans-serif",
          color: "#e2e8f0",
          position: "relative",
        }}
      >
        {/* Top row — monogram + status pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #22d3ee 0%, #60a5fa 100%)",
                color: "#020617",
                fontSize: "26px",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 40px rgba(34,211,238,0.45)",
              }}
            >
              SC
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "14px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#67e8f9",
                  fontWeight: 500,
                }}
              >
                Portfolio
              </span>
              <span
                style={{
                  fontSize: "18px",
                  color: "#cbd5e1",
                  marginTop: "4px",
                }}
              >
                satteches.com
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 18px",
              borderRadius: "9999px",
              border: "1px solid rgba(34,211,238,0.35)",
              backgroundColor: "rgba(34,211,238,0.08)",
              fontSize: "13px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#67e8f9",
              fontWeight: 500,
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#22d3ee",
                boxShadow: "0 0 12px rgba(34,211,238,0.9)",
              }}
            />
            Dubai · UAE
          </div>
        </div>

        {/* Middle — name + headline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "880px" }}>
          <span
            style={{
              fontSize: "16px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#67e8f9",
              fontWeight: 500,
              marginBottom: "18px",
            }}
          >
            Supply Chain & Logistics Professional
          </span>
          <h1
            style={{
              fontSize: "84px",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              margin: 0,
              color: "#f8fafc",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Sattanathan</span>
            <span
              style={{
                background: "linear-gradient(135deg, #22d3ee 0%, #60a5fa 50%, #a78bfa 100%)",
                backgroundClip: "text",
                color: "transparent",
                marginTop: "-4px",
              }}
            >
              Chandran
            </span>
          </h1>
          <p
            style={{
              fontSize: "26px",
              lineHeight: 1.4,
              color: "#94a3b8",
              marginTop: "22px",
              maxWidth: "780px",
            }}
          >
            Transforming Global Supply Chains Through Operational Excellence —
            SAP S/4HANA power user · Automation builder · Freight forwarding specialist.
          </p>
        </div>

        {/* Bottom — KPI strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "48px",
            paddingTop: "28px",
            borderTop: "1px solid rgba(148,163,184,0.18)",
          }}
        >
          {[
            { value: "99%+", label: "Inventory Accuracy" },
            { value: "98%", label: "On-Time Delivery" },
            { value: "10+", label: "Global Clients" },
            { value: "Zero", label: "Customs Holds" },
          ].map((s) => (
            <div
              key={s.label}
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#22d3ee",
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                  fontWeight: 500,
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}

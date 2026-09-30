import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const alt = `${profile.name} · ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0a",
          backgroundImage: "radial-gradient(circle at 85% 20%, rgba(198,244,50,0.22), transparent 45%)",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#8f8f8f" }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#fafafa" }}>
            SC<span style={{ color: "#c6f432" }}>.</span>
          </div>
          <span style={{ marginLeft: 12, padding: "6px 18px", borderRadius: 999, background: "rgba(198,244,50,0.15)", color: "#c6f432", fontSize: 24 }}>
            {profile.availability}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 30, color: "#8f8f8f" }}>
            {`${profile.role} · AI tools and SaaS platforms · ${profile.location}`}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#8f8f8f", fontFamily: "monospace" }}>
          <span style={{ color: "#c6f432" }}>~</span>&nbsp;$ npm run ship&nbsp;&nbsp;<span style={{ color: "#c6f432" }}>deployed</span>
        </div>
      </div>
    ),
    size,
  );
}

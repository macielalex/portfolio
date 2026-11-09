import { ImageResponse } from "next/og";

export const alt = "Alex Maciel — Dev Full Stack Sênior";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mesmas cores de app/globals.css; o gerador de imagem não lê variáveis CSS.
const colors = {
  background: "#1c1917",
  card: "#292524",
  foreground: "#e7e0d8",
  muted: "#a8a29e",
  primary: "#c4572a",
  border: "rgba(231, 224, 216, 0.1)",
};

const stats = [
  { value: "80 mil+", label: "usuários no app" },
  { value: "10+", label: "marcas no mesmo código" },
  { value: "17 anos", label: "de TI, do ERP ao código" },
];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: colors.background,
          backgroundImage: `radial-gradient(circle at 85% 0%, rgba(196, 87, 42, 0.22), transparent 55%)`,
          color: colors.foreground,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: colors.muted }}>
          <span style={{ color: colors.primary, fontFamily: "monospace" }}>$</span>
          <span style={{ fontFamily: "monospace" }}>deployed to production</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>Alex Maciel</div>
          <div style={{ marginTop: 18, fontSize: 36, color: colors.primary, fontFamily: "monospace" }}>
            Dev Full Stack Sênior
          </div>
          <div style={{ marginTop: 24, fontSize: 32, color: colors.muted }}>
            Começo pelo que trava o negócio.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 16 }}>
            {stats.map((stat) => (
              <div
                key={stat.value}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px 22px",
                  borderRadius: 14,
                  border: `1px solid ${colors.border}`,
                  background: colors.card,
                }}
              >
                <span style={{ fontSize: 34, fontWeight: 700, color: colors.primary }}>{stat.value}</span>
                <span style={{ marginTop: 4, fontSize: 18, color: colors.muted }}>{stat.label}</span>
              </div>
            ))}
          </div>
          <span style={{ fontSize: 22, color: colors.muted, fontFamily: "monospace" }}>alexmaciel.dev.br</span>
        </div>
      </div>
    ),
    size,
  );
}

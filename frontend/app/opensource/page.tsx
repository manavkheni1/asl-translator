import Link from "next/link";
import Image from "next/image";

const COLORS = {
  strawberry: "#e63946",
  honeydew: "#f1faee",
  frosted: "#a8dadc",
  steel: "#457b9d",
  deep: "#1d3557",
};

export default function OpenSource() {
  return (
    <main style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#fff", color: COLORS.deep }}>

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${COLORS.frosted}50`, padding: "0 64px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <Image src="/Gestura.png" alt="Gestura logo" width={38} height={38} style={{ borderRadius: "10px", display: "block" }} />
          <span style={{ fontSize: "20px", fontWeight: 800, color: COLORS.deep, letterSpacing: "-0.5px" }}>Gestura</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {["Home", "About", "Blog", "Reference", "Open Source", "Contact"].map((item) => (
            <Link key={item} href={item === "Home" ? "/" : item === "Open Source" ? "/opensource" : `/${item.toLowerCase()}`}
              style={{ fontSize: "14px", fontWeight: 500, color: item === "Open Source" ? COLORS.deep : COLORS.steel, textDecoration: "none" }}>
              {item}
            </Link>
          ))}
          <Link href="/app-page" style={{ background: COLORS.deep, color: "#fff", padding: "10px 22px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Try Gestura free →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: COLORS.deep, padding: "80px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: `${COLORS.frosted}15`, border: `1px solid ${COLORS.frosted}30`, borderRadius: "20px", padding: "6px 16px", marginBottom: "28px" }}>
          <span style={{ color: COLORS.frosted, fontSize: "12px", fontWeight: 600 }}>⭐ Star us on GitHub</span>
        </div>
        <h1 style={{ fontSize: "52px", fontWeight: 800, color: "#fff", letterSpacing: "-2px", lineHeight: 1.1, marginBottom: "20px" }}>
          Gestura is<br /><span style={{ color: COLORS.frosted }}>fully open source.</span>
        </h1>
        <p style={{ fontSize: "17px", color: `${COLORS.frosted}cc`, lineHeight: 1.7, maxWidth: "520px", margin: "0 auto 36px" }}>
          Every line of code — from the LSTM training pipeline to the React frontend — is publicly available on GitHub. Fork it, learn from it, build on it.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
          <a href="https://github.com/manavkheni1/asl-translator" target="_blank" rel="noopener noreferrer"
            style={{ background: "#fff", color: COLORS.deep, padding: "13px 28px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            ⭐ Star on GitHub
          </a>
          <a href="https://github.com/manavkheni1/asl-translator/fork" target="_blank" rel="noopener noreferrer"
            style={{ background: "transparent", color: COLORS.frosted, padding: "13px 28px", borderRadius: "12px", fontSize: "15px", fontWeight: 600, textDecoration: "none", border: `1.5px solid ${COLORS.frosted}40`, display: "inline-flex", alignItems: "center", gap: "8px" }}>
            🍴 Fork it
          </a>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: COLORS.honeydew, padding: "48px 64px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", textAlign: "center" }}>
        {[
          ["87,000+", "Training images"],
          ["98.2%", "Model accuracy"],
          ["4", "Phases built"],
          ["100%", "Open source"],
        ].map(([val, label]) => (
          <div key={label}>
            <div style={{ fontSize: "36px", fontWeight: 800, color: COLORS.deep, letterSpacing: "-1px" }}>{val}</div>
            <div style={{ fontSize: "13px", color: COLORS.steel, marginTop: "4px" }}>{label}</div>
          </div>
        ))}
      </section>

      {/* Tech stack */}
      <section style={{ padding: "80px 64px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: COLORS.steel, marginBottom: "12px" }}>Tech stack</p>
          <h2 style={{ fontSize: "36px", fontWeight: 800, color: COLORS.deep, letterSpacing: "-1px" }}>Everything built from scratch.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {[
            { title: "PyTorch + LSTM", desc: "Custom LSTM neural network trained on 87,000 ASL images. Runs on Apple Silicon via MPS acceleration.", tag: "ML Model", icon: "🧠" },
            { title: "MediaPipe", desc: "Extracts 21 hand landmarks per frame. We use normalized coordinates — not raw pixels — for faster, lighter inference.", tag: "Hand Tracking", icon: "✋" },
            { title: "FastAPI + Uvicorn", desc: "Python REST API serving predictions. Processes each webcam frame in under 200ms with full CORS support.", tag: "Backend", icon: "⚡" },
            { title: "React + Next.js", desc: "Modern frontend with live webcam feed, hand landmark overlay, confidence graph, and real-time sentence builder.", tag: "Frontend", icon: "⚛️" },
            { title: "Docker + GitHub Actions", desc: "Fully containerized with a CI/CD pipeline. Push to main and it deploys automatically to AWS.", tag: "DevOps", icon: "🐳" },
            { title: "AWS EC2 + Vercel", desc: "Backend runs on AWS EC2 inside Docker. Frontend deployed on Vercel with a custom domain.", tag: "Cloud", icon: "☁️" },
          ].map(({ title, desc, tag, icon }) => (
            <div key={title} style={{ background: COLORS.honeydew, borderRadius: "16px", padding: "24px" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{icon}</div>
              <div style={{ display: "inline-block", background: `${COLORS.frosted}40`, color: COLORS.steel, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", padding: "3px 10px", borderRadius: "20px", marginBottom: "10px" }}>{tag}</div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: COLORS.deep, marginBottom: "8px" }}>{title}</h3>
              <p style={{ fontSize: "13px", color: COLORS.steel, lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to contribute */}
      <section style={{ background: COLORS.honeydew, padding: "80px 64px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: COLORS.steel, marginBottom: "12px" }}>Contribute</p>
            <h2 style={{ fontSize: "36px", fontWeight: 800, color: COLORS.deep, letterSpacing: "-1px" }}>Want to help build Gestura?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {[
              { title: "Report a bug", desc: "Found something broken? Open an issue on GitHub and we'll fix it fast.", icon: "🐛" },
              { title: "Suggest a feature", desc: "Have an idea for improving Gestura? We'd love to hear it. Open a discussion.", icon: "💡" },
              { title: "Improve the model", desc: "Have a better dataset or training approach? Submit a PR and let's improve accuracy together.", icon: "🧪" },
              { title: "Spread the word", desc: "Star the repo, share it on LinkedIn, or write about it. Every bit helps.", icon: "📣" },
            ].map(({ title, desc, icon }) => (
              <div key={title} style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: `1px solid ${COLORS.steel}15` }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: COLORS.deep, marginBottom: "8px" }}>{title}</h3>
                <p style={{ fontSize: "13px", color: COLORS.steel, lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <a href="https://github.com/manavkheni1/asl-translator" target="_blank" rel="noopener noreferrer"
              style={{ background: COLORS.deep, color: "#fff", padding: "14px 36px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
              View on GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: COLORS.deep, padding: "40px 64px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image src="/Gestura.png" alt="Gestura logo" width={32} height={32} style={{ borderRadius: "8px", display: "block" }} />
          <span style={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}>Gestura</span>
        </div>
        <div style={{ display: "flex", gap: "32px" }}>
          {["Home", "About", "Blog", "Reference", "Open Source", "Contact"].map((item) => (
            <Link key={item} href={item === "Home" ? "/" : item === "Open Source" ? "/opensource" : `/${item.toLowerCase()}`} style={{ fontSize: "13px", color: `${COLORS.frosted}80`, textDecoration: "none" }}>
              {item}
            </Link>
          ))}
        </div>
        <p style={{ fontSize: "12px", color: `${COLORS.frosted}50` }}>© 2026 Gestura. Built by Manav Kheni.</p>
      </footer>

    </main>
  );
}
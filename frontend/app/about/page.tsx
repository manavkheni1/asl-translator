import Image from "next/image";
import Link from "next/link";

const COLORS = {
  strawberry: "#e63946",
  honeydew: "#f1faee",
  frosted: "#a8dadc",
  steel: "#457b9d",
  deep: "#1d3557",
};

export default function About() {
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
              style={{ fontSize: "14px", fontWeight: 500, color: item === "About" ? COLORS.deep : COLORS.steel, textDecoration: "none" }}>
              {item}
            </Link>
          ))}
          <Link href="/app-page" style={{ background: COLORS.deep, color: "#fff", padding: "10px 22px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Try Gestura free →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: COLORS.honeydew, padding: "80px 64px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: COLORS.steel, marginBottom: "16px" }}>About Gestura</p>
        <h1 style={{ fontSize: "52px", fontWeight: 800, color: COLORS.deep, letterSpacing: "-2px", lineHeight: 1.1, marginBottom: "20px" }}>
          We believe communication<br />is a human right.
        </h1>
        <p style={{ fontSize: "17px", color: COLORS.steel, lineHeight: 1.7, maxWidth: "580px", margin: "0 auto" }}>
          Gestura was built to close the gap between the deaf and hearing communities — using AI trained entirely from scratch, with no shortcuts.
        </p>
      </section>

      {/* Mission + image */}
      <section style={{ padding: "80px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", maxWidth: "1100px", margin: "0 auto" }}>
        <div>
          <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: COLORS.steel, marginBottom: "16px" }}>Our mission</p>
          <h2 style={{ fontSize: "36px", fontWeight: 800, color: COLORS.deep, letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "20px" }}>
            Making sign language accessible to everyone
          </h2>
          <p style={{ fontSize: "15px", color: COLORS.steel, lineHeight: 1.8, marginBottom: "16px" }}>
            Over 70 million people worldwide use sign language as their primary form of communication. Yet most people around them can't understand a single sign. That disconnect is the problem we set out to solve.
          </p>
          <p style={{ fontSize: "15px", color: COLORS.steel, lineHeight: 1.8 }}>
            Gestura uses a custom-trained LSTM neural network — built on 87,000 hand gesture images — to recognize ASL letters in real time, directly from your webcam. No external AI services. No data sent to third parties. Just a model we trained ourselves.
          </p>
        </div>
        <div style={{ borderRadius: "20px", overflow: "hidden", border: `1px solid ${COLORS.steel}20` }}>
          <Image src="/Features_Accessibility.png" alt="People communicating with sign language" width={600} height={500} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </section>

      {/* Team */}
      <section style={{ background: COLORS.honeydew, padding: "80px 64px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
            <div style={{ borderRadius: "20px", overflow: "hidden", border: `1px solid ${COLORS.steel}20` }}>
              <Image src="/About.png" alt="Gestura team" width={600} height={500} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: COLORS.steel, marginBottom: "16px" }}>The team</p>
              <h2 style={{ fontSize: "36px", fontWeight: 800, color: COLORS.deep, letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "20px" }}>
                Built by engineers who care
              </h2>
              <p style={{ fontSize: "15px", color: COLORS.steel, lineHeight: 1.8, marginBottom: "16px" }}>
                Gestura started as a passion project with a simple goal — build something that actually matters. We spent months training the model, iterating on the UI, and testing with real users.
              </p>
              <p style={{ fontSize: "15px", color: COLORS.steel, lineHeight: 1.8 }}>
                Every part of the stack was built from scratch — the dataset preprocessing pipeline, the LSTM architecture, the FastAPI inference server, and the React frontend. No shortcuts, no pre-built models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section style={{ padding: "80px 64px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: COLORS.steel, marginBottom: "12px" }}>Under the hood</p>
          <h2 style={{ fontSize: "36px", fontWeight: 800, color: COLORS.deep, letterSpacing: "-1px" }}>The technology behind Gestura</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {[
            { title: "PyTorch + LSTM", desc: "Custom LSTM neural network trained on 87,000 images. Runs on Apple Silicon via MPS.", tag: "ML Model" },
            { title: "MediaPipe", desc: "Extracts 21 hand landmarks per frame in real time. No raw image pixels — just coordinates.", tag: "Hand Tracking" },
            { title: "FastAPI", desc: "Python backend serving predictions via REST API. Processes each webcam frame in under 200ms.", tag: "Backend" },
            { title: "React + Next.js", desc: "Modern frontend with live webcam feed, landmark overlay, and real-time prediction display.", tag: "Frontend" },
            { title: "Docker + AWS", desc: "Containerized deployment with GitHub Actions CI/CD pipeline to AWS EC2.", tag: "Deployment" },
            { title: "Tailwind CSS", desc: "Clean, responsive design system built with utility-first CSS. Works on all screen sizes.", tag: "Design" },
          ].map(({ title, desc, tag }) => (
            <div key={title} style={{ background: COLORS.honeydew, borderRadius: "16px", padding: "24px" }}>
              <div style={{ display: "inline-block", background: `${COLORS.frosted}40`, color: COLORS.steel, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", padding: "3px 10px", borderRadius: "20px", marginBottom: "12px" }}>{tag}</div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: COLORS.deep, marginBottom: "8px" }}>{title}</h3>
              <p style={{ fontSize: "13px", color: COLORS.steel, lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: COLORS.deep, padding: "80px 64px", textAlign: "center" }}>
        <h2 style={{ fontSize: "40px", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", marginBottom: "16px" }}>See it in action</h2>
        <p style={{ fontSize: "16px", color: `${COLORS.frosted}cc`, marginBottom: "36px" }}>Open Gestura and start signing — no account needed.</p>
        <Link href="/app-page" style={{ background: COLORS.strawberry, color: "#fff", padding: "14px 36px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
          Try Gestura free →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ background: COLORS.deep, borderTop: `1px solid ${COLORS.frosted}15`, padding: "40px 64px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
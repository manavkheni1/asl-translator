"use client";

import Link from "next/link";
import Image from "next/image";

const COLORS = {
  strawberry: "#e63946",
  honeydew: "#f1faee",
  frosted: "#a8dadc",
  steel: "#457b9d",
  deep: "#1d3557",
};

const ASL_SIGNS = [
  { letter: "A", desc: "Fist with thumb resting on side" },
  { letter: "B", desc: "Four fingers up, thumb tucked across palm" },
  { letter: "C", desc: "Curved hand like holding a cup" },
  { letter: "D", desc: "Index finger up, others curl to touch thumb" },
  { letter: "E", desc: "All fingers curl down to touch thumb" },
  { letter: "F", desc: "Index and thumb touch, others extended" },
  { letter: "G", desc: "Index finger points sideways, thumb parallel" },
  { letter: "H", desc: "Index and middle fingers extended sideways" },
  { letter: "I", desc: "Pinky finger up, others closed" },
  { letter: "J", desc: "Pinky up, draw a J in the air" },
  { letter: "K", desc: "Index up, middle finger angled, thumb between" },
  { letter: "L", desc: "Index finger up, thumb out — L shape" },
  { letter: "M", desc: "Three fingers folded over thumb" },
  { letter: "N", desc: "Two fingers folded over thumb" },
  { letter: "O", desc: "All fingers and thumb form a circle" },
  { letter: "P", desc: "Like K but pointing downward" },
  { letter: "Q", desc: "Like G but pointing downward" },
  { letter: "R", desc: "Index and middle fingers crossed" },
  { letter: "S", desc: "Fist with thumb over fingers" },
  { letter: "T", desc: "Thumb between index and middle finger" },
  { letter: "U", desc: "Index and middle fingers up together" },
  { letter: "V", desc: "Index and middle fingers up in V shape" },
  { letter: "W", desc: "Three fingers up — index, middle, ring" },
  { letter: "X", desc: "Index finger bent like a hook" },
  { letter: "Y", desc: "Thumb and pinky out — hang loose" },
  { letter: "Z", desc: "Index finger draws a Z in the air" },
];

export default function Reference() {
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
              style={{ fontSize: "14px", fontWeight: 500, color: item === "Reference" ? COLORS.deep : COLORS.steel, textDecoration: "none" }}>
              {item}
            </Link>
          ))}
          <Link href="/app-page" style={{ background: COLORS.deep, color: "#fff", padding: "10px 22px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Try Gestura free →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: COLORS.deep, padding: "64px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: COLORS.frosted, opacity: 0.7, marginBottom: "12px" }}>ASL Reference Guide</p>
        <h1 style={{ fontSize: "48px", fontWeight: 800, color: "#fff", letterSpacing: "-2px", lineHeight: 1.1, marginBottom: "16px" }}>
          All 26 ASL letters
        </h1>
        <p style={{ fontSize: "16px", color: `${COLORS.frosted}cc`, lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 28px" }}>
          Learn the hand positions for every letter. Use this guide while practicing with the live translator.
        </p>
        <Link href="/app-page" style={{ background: COLORS.strawberry, color: "#fff", padding: "12px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
          Practice with live translator →
        </Link>
      </section>

      {/* Signs grid */}
      <section style={{ padding: "64px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {ASL_SIGNS.map(({ letter, desc }) => (
            <div key={letter} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: `1px solid ${COLORS.steel}15`, boxShadow: "0 2px 8px rgba(29,53,87,0.08)" }}>
              <div style={{ height: "340px", overflow: "hidden", background: "#fff", position: "relative" }}>
                <img
                  src={`/asl/${letter}.jpeg`}
                  alt={`ASL sign for ${letter}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center bottom", display: "block" }}
                />
                <div style={{ position: "absolute", top: "10px", right: "10px", background: COLORS.deep, color: "#fff", fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "8px" }}>
                  {letter}
                </div>
              </div>
              <div style={{ padding: "14px 16px", background: COLORS.honeydew }}>
                <div style={{ fontSize: "28px", fontWeight: 900, color: COLORS.deep, lineHeight: 1, marginBottom: "6px" }}>
                  {letter}
                </div>
                <p style={{ fontSize: "11px", color: COLORS.steel, lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section style={{ background: COLORS.deep, padding: "64px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#fff", letterSpacing: "-1px", marginBottom: "40px", textAlign: "center" }}>Tips for better accuracy</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {[
              { tip: "Good lighting", desc: "Make sure your hand is well lit. Avoid backlighting or dark rooms." },
              { tip: "Camera distance", desc: "Keep your hand about 30-60cm from the camera for best detection." },
              { tip: "Hold steady", desc: "Hold each sign steady for 3 frames — the model needs consistency to confirm." },
              { tip: "Plain background", desc: "A plain wall or background helps MediaPipe detect your hand landmarks faster." },
            ].map(({ tip, desc }) => (
              <div key={tip} style={{ background: `${COLORS.frosted}10`, borderRadius: "14px", padding: "20px 24px", border: `1px solid ${COLORS.frosted}20` }}>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>✓ {tip}</p>
                <p style={{ fontSize: "13px", color: `${COLORS.frosted}80`, lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <Link href="/app-page" style={{ background: COLORS.strawberry, color: "#fff", padding: "13px 32px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
              Start signing →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: COLORS.deep, borderTop: `1px solid ${COLORS.frosted}10`, padding: "40px 64px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
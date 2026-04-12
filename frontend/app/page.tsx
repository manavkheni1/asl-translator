import Image from "next/image";
import Link from "next/link";

const COLORS = {
  strawberry: "#e63946",
  honeydew: "#f1faee",
  frosted: "#a8dadc",
  steel: "#457b9d",
  deep: "#1d3557",
};

export default function Home() {
  return (
    <main style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#fff", color: COLORS.deep }}>

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${COLORS.frosted}50`, padding: "0 64px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image src="/Gestura.png" alt="Gestura logo" width={38} height={38} style={{ borderRadius: "10px", display: "block" }} />
          <span style={{ fontSize: "20px", fontWeight: 800, color: COLORS.deep, letterSpacing: "-0.5px" }}>Gestura</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {["Home", "About", "Blog", "Reference", "Open Source", "Contact"].map((item) => (
            <Link key={item} href={item === "Home" ? "/" : item === "Open Source" ? "/opensource" : `/${item.toLowerCase()}`}style={{ fontSize: "14px", fontWeight: 500, color: COLORS.steel, textDecoration: "none" }}>
              {item}
            </Link>
          ))}
          <Link href="/app-page" style={{ background: COLORS.deep, color: "#fff", padding: "10px 22px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Try Gestura free →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: COLORS.deep, padding: "100px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", minHeight: "90vh" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: `${COLORS.frosted}20`, border: `1px solid ${COLORS.frosted}40`, borderRadius: "20px", padding: "6px 16px", marginBottom: "28px" }}>
            <div style={{ width: "7px", height: "7px", background: "#4ade80", borderRadius: "50%" }} />
            <span style={{ color: COLORS.frosted, fontSize: "12px", fontWeight: 500 }}>Now live — 98.2% model accuracy</span>
          </div>
          <h1 style={{ fontSize: "62px", fontWeight: 800, color: "#fff", lineHeight: 1.05, letterSpacing: "-2px", marginBottom: "24px" }}>
            Sign language,<br />
            <span style={{ color: COLORS.frosted }}>understood</span><br />
            instantly.
          </h1>
          <p style={{ fontSize: "18px", color: `${COLORS.frosted}cc`, lineHeight: 1.7, marginBottom: "40px", maxWidth: "480px" }}>
            Gestura uses a custom-trained AI model to translate American Sign Language into text in real time — directly from your webcam. No external APIs. No subscriptions. Just your hands.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link href="/app-page" style={{ background: COLORS.strawberry, color: "#fff", padding: "14px 32px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
              Try it free →
            </Link>
            <Link href="/about" style={{ background: "transparent", color: COLORS.frosted, padding: "14px 32px", borderRadius: "12px", fontSize: "15px", fontWeight: 600, textDecoration: "none", border: `1.5px solid ${COLORS.frosted}40`, display: "inline-block" }}>
              Learn more
            </Link>
          </div>
          <div style={{ display: "flex", gap: "40px", marginTop: "56px" }}>
            {[["98.2%", "Model accuracy"], ["29", "ASL letters"], ["<200ms", "Inference time"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontSize: "28px", fontWeight: 800, color: "#fff" }}>{val}</div>
                <div style={{ fontSize: "12px", color: `${COLORS.frosted}80`, marginTop: "2px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderRadius: "24px", overflow: "hidden", border: `2px solid ${COLORS.frosted}30` }}>
          <Image src="/Hero.png" alt="ASL hand gesture" width={600} height={700} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "100px 64px", background: COLORS.honeydew }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: COLORS.steel, marginBottom: "12px" }}>Why Gestura</p>
          <h2 style={{ fontSize: "44px", fontWeight: 800, color: COLORS.deep, letterSpacing: "-1.5px", lineHeight: 1.1 }}>Built for real people.<br />Powered by real AI.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", maxWidth: "1100px", margin: "0 auto" }}>

          {/* Feature 1 */}
          <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: `1px solid ${COLORS.steel}15` }}>
            <div style={{ height: "280px", overflow: "hidden" }}>
              <Image src="/Features_Accessibility.png" alt="Accessibility" width={600} height={400} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "28px" }}>
              <div style={{ display: "inline-block", background: `${COLORS.frosted}30`, color: COLORS.steel, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", padding: "4px 12px", borderRadius: "20px", marginBottom: "14px" }}>Accessibility</div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: COLORS.deep, marginBottom: "10px", letterSpacing: "-0.5px" }}>Breaking the communication barrier</h3>
              <p style={{ fontSize: "14px", color: COLORS.steel, lineHeight: 1.7 }}>Over 70 million deaf people worldwide use sign language as their primary language. Gestura bridges the gap — letting anyone understand ASL instantly, no training required.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div style={{ background: COLORS.deep, borderRadius: "20px", overflow: "hidden" }}>
            <div style={{ height: "280px", overflow: "hidden" }}>
              <Image src="/Features_Tech.png" alt="AI Technology" width={600} height={400} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "28px" }}>
              <div style={{ display: "inline-block", background: `${COLORS.frosted}20`, color: COLORS.frosted, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", padding: "4px 12px", borderRadius: "20px", marginBottom: "14px" }}>AI Technology</div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "10px", letterSpacing: "-0.5px" }}>A model trained from scratch</h3>
              <p style={{ fontSize: "14px", color: `${COLORS.frosted}cc`, lineHeight: 1.7 }}>No GPT. No external APIs. We trained our own LSTM neural network on 87,000 hand gesture images using MediaPipe landmark extraction — achieving 98.2% accuracy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "100px 64px", background: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: COLORS.steel, marginBottom: "12px" }}>How it works</p>
          <h2 style={{ fontSize: "44px", fontWeight: 800, color: COLORS.deep, letterSpacing: "-1.5px" }}>Three steps. Real time.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", maxWidth: "960px", margin: "0 auto" }}>
          {[
            { num: "01", title: "Point your camera", desc: "Open Gestura in any browser and allow webcam access. No downloads, no installs.", color: COLORS.frosted },
            { num: "02", title: "Sign a letter", desc: "Hold any ASL hand sign in front of the camera. Our model detects 21 hand landmarks in real time.", color: COLORS.strawberry },
            { num: "03", title: "See it translated", desc: "The predicted letter appears instantly with a confidence score. Build full words and sentences.", color: COLORS.steel },
          ].map(({ num, title, desc, color }) => (
            <div key={num} style={{ background: COLORS.honeydew, borderRadius: "20px", padding: "32px 28px" }}>
              <div style={{ fontSize: "40px", fontWeight: 900, color, marginBottom: "16px", letterSpacing: "-2px" }}>{num}</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: COLORS.deep, marginBottom: "10px" }}>{title}</h3>
              <p style={{ fontSize: "14px", color: COLORS.steel, lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats banner */}
      <section style={{ background: COLORS.deep, padding: "64px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", textAlign: "center" }}>
        {[
          ["87,000+", "Training images"],
          ["98.2%", "Model accuracy"],
          ["29", "ASL signs supported"],
          ["<200ms", "Real-time inference"],
        ].map(([val, label]) => (
          <div key={label}>
            <div style={{ fontSize: "40px", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px" }}>{val}</div>
            <div style={{ fontSize: "13px", color: `${COLORS.frosted}90`, marginTop: "6px" }}>{label}</div>
          </div>
        ))}
      </section>
      
      {/* Testimonials */}
      <section style={{ padding: "100px 64px", background: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: COLORS.steel, marginBottom: "12px" }}>What people are saying</p>
          <h2 style={{ fontSize: "44px", fontWeight: 800, color: COLORS.deep, letterSpacing: "-1.5px" }}>Loved by users worldwide.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
          {[
            { name: "Sarah M.", role: "Special Education Teacher", text: "Gestura has completely changed how I communicate with my deaf students. The real-time detection is incredibly accurate and my students love it.", avatar: "SM" },
            { name: "James K.", role: "Software Engineer", text: "As someone who built ML projects before, I'm genuinely impressed. 98% accuracy with a custom-trained model and no external APIs is no joke.", avatar: "JK" },
            { name: "Priya R.", role: "Accessibility Advocate", text: "Finally a tool that takes ASL seriously. The landmark overlay makes it feel futuristic and the sentence builder is super intuitive.", avatar: "PR" },
            { name: "David L.", role: "CS Student", text: "I used Gestura as inspiration for my own ML project. The architecture is clean, the docs are solid, and the UI is genuinely beautiful.", avatar: "DL" },
            { name: "Maya T.", role: "Product Designer", text: "The UI is one of the best I've seen in an accessibility tool. Clean, fast, and the confidence graph is a brilliant touch.", avatar: "MT" },
            { name: "Carlos F.", role: "Deaf Community Member", text: "It's not perfect yet but it's the most promising ASL tool I've tried. The fact that it works in real time from a webcam is huge.", avatar: "CF" },
          ].map(({ name, role, text, avatar }) => (
            <div key={name} style={{ background: COLORS.honeydew, borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "4px" }}>
                {[1,2,3,4,5].map((s) => (
                  <span key={s} style={{ color: "#f59e0b", fontSize: "14px" }}>★</span>
                ))}
              </div>
              <p style={{ fontSize: "14px", color: COLORS.steel, lineHeight: 1.75, flex: 1 }}>"{text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: `1px solid ${COLORS.steel}15`, paddingTop: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: COLORS.deep, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: COLORS.frosted, flexShrink: 0 }}>
                  {avatar}
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: COLORS.deep, margin: 0 }}>{name}</p>
                  <p style={{ fontSize: "12px", color: COLORS.steel, margin: 0 }}>{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 64px", background: COLORS.honeydew, textAlign: "center" }}>
        <h2 style={{ fontSize: "52px", fontWeight: 800, color: COLORS.deep, letterSpacing: "-2px", marginBottom: "20px" }}>Ready to try Gestura?</h2>
        <p style={{ fontSize: "18px", color: COLORS.steel, marginBottom: "40px", maxWidth: "480px", margin: "0 auto 40px" }}>Open your browser, allow camera access, and start signing. No account needed.</p>
        <Link href="/app-page" style={{ background: COLORS.strawberry, color: "#fff", padding: "16px 40px", borderRadius: "14px", fontSize: "16px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
          Launch Gestura →
        </Link>
      </section>

      {/* Newsletter */}
      <section style={{ background: COLORS.deep, padding: "64px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: COLORS.frosted, opacity: 0.6, marginBottom: "12px" }}>Stay in the loop</p>
          <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#fff", letterSpacing: "-1px", marginBottom: "12px" }}>Get Gestura updates</h2>
          <p style={{ fontSize: "14px", color: `${COLORS.frosted}80`, marginBottom: "28px", lineHeight: 1.7 }}>Model improvements, new features, and behind-the-scenes ML content — straight to your inbox.</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{ flex: 1, padding: "12px 18px", borderRadius: "10px", border: `1.5px solid ${COLORS.frosted}25`, background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: "14px", outline: "none" }}
            />
            <button style={{ background: COLORS.strawberry, color: "#fff", border: "none", borderRadius: "10px", padding: "12px 24px", fontSize: "14px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
              Subscribe →
            </button>
          </div>
          <p style={{ fontSize: "11px", color: `${COLORS.frosted}40`, marginTop: "12px" }}>No spam. Unsubscribe anytime.</p>
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
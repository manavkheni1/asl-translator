"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"

const COLORS = {
  strawberry: "#e63946",
  honeydew: "#f1faee",
  frosted: "#a8dadc",
  steel: "#457b9d",
  deep: "#1d3557",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await fetch("https://formspree.io/f/xzdypyyy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
        }),
        });
        if (response.ok) {
        setSubmitted(true);
        }
    } catch (err) {
        console.error("Form submission error:", err);
    }
    };

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
              style={{ fontSize: "14px", fontWeight: 500, color: item === "Contact" ? COLORS.deep : COLORS.steel, textDecoration: "none" }}>
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
        <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: COLORS.steel, marginBottom: "16px" }}>Get in touch</p>
        <h1 style={{ fontSize: "52px", fontWeight: 800, color: COLORS.deep, letterSpacing: "-2px", lineHeight: 1.1, marginBottom: "20px" }}>
          We'd love to hear<br />from you.
        </h1>
        <p style={{ fontSize: "17px", color: COLORS.steel, lineHeight: 1.7, maxWidth: "500px", margin: "0 auto" }}>
          Whether you have a question, feedback, or just want to say hello — our inbox is always open.
        </p>
      </section>

      {/* Contact grid */}
      <section style={{ padding: "80px 64px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "64px" }}>

        {/* Left info */}
        <div>
          <h2 style={{ fontSize: "26px", fontWeight: 700, color: COLORS.deep, marginBottom: "16px", letterSpacing: "-0.5px" }}>Contact information</h2>
          <p style={{ fontSize: "14px", color: COLORS.steel, lineHeight: 1.8, marginBottom: "40px" }}>
            Have a partnership idea? Found a bug? Want to learn more about the technology? Reach out and we'll get back to you within 24 hours.
          </p>

          {[
            { label: "Email", value: "khenimanav@outlook.com", icon: "✉️", href: "mailto:khenimanav@outlook.com" },
            { label: "GitHub", value: "github.com/manavkheni1/asl-translator", icon: "💻", href: "https://github.com/manavkheni1/asl-translator" },
            { label: "LinkedIn", value: "linkedin.com/in/manav-kheni-678368383", icon: "💼", href: "https://www.linkedin.com/in/manav-kheni-678368383/" },
            { label: "Location", value: "Boston, Massachusetts", icon: "📍", href: null },
            ].map(({ label, value, icon, href }) => (
            <div key={label} style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "24px" }}>
                <div style={{ width: "44px", height: "44px", background: COLORS.honeydew, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>
                {icon}
                </div>
                <div>
                <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: COLORS.steel, marginBottom: "2px" }}>{label}</p>
                {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", color: COLORS.steel, fontWeight: 500, textDecoration: "none", borderBottom: `1px solid ${COLORS.steel}40` }}>
                    {value}
                    </a>
                ) : (
                    <p style={{ fontSize: "14px", color: COLORS.deep, fontWeight: 500, margin: 0 }}>{value}</p>
                )}
                </div>
            </div>
            ))}

          {/* Divider */}
          <div style={{ borderTop: `1px solid ${COLORS.steel}20`, paddingTop: "32px", marginTop: "16px" }}>
            <p style={{ fontSize: "13px", color: COLORS.steel, marginBottom: "16px", fontWeight: 600 }}>Also built with</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["PyTorch", "MediaPipe", "FastAPI", "Next.js", "Docker", "AWS"].map((tech) => (
                <span key={tech} style={{ background: COLORS.honeydew, color: COLORS.steel, fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "20px" }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div style={{ background: COLORS.honeydew, borderRadius: "24px", padding: "40px" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: "56px", marginBottom: "20px" }}>🎉</div>
              <h3 style={{ fontSize: "24px", fontWeight: 700, color: COLORS.deep, marginBottom: "12px" }}>Message sent!</h3>
              <p style={{ fontSize: "14px", color: COLORS.steel, lineHeight: 1.7 }}>Thanks for reaching out. We'll get back to you within 24 hours.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                style={{ marginTop: "24px", background: COLORS.deep, color: "#fff", border: "none", borderRadius: "10px", padding: "12px 28px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: COLORS.deep, marginBottom: "28px" }}>Send us a message</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: COLORS.steel, display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Manav Kheni"
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1.5px solid ${COLORS.steel}25`, fontSize: "14px", color: COLORS.deep, background: "#fff", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: COLORS.steel, display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="hello@example.com"
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1.5px solid ${COLORS.steel}25`, fontSize: "14px", color: COLORS.deep, background: "#fff", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: COLORS.steel, display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Partnership, feedback, question..."
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1.5px solid ${COLORS.steel}25`, fontSize: "14px", color: COLORS.deep, background: "#fff", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: COLORS.steel, display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1.5px solid ${COLORS.steel}25`, fontSize: "14px", color: COLORS.deep, background: "#fff", outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  style={{ background: COLORS.deep, color: "#fff", border: "none", borderRadius: "10px", padding: "14px", fontSize: "15px", fontWeight: 700, cursor: "pointer", marginTop: "4px" }}
                >
                  Send message →
                </button>
              </div>
            </>
          )}
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
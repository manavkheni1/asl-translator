import Link from "next/link";
import Image from "next/image";

const COLORS = {
  strawberry: "#e63946",
  honeydew: "#f1faee",
  frosted: "#a8dadc",
  steel: "#457b9d",
  deep: "#1d3557",
};

const posts = [
  {
    slug: "building-gestura",
    tag: "Story",
    tagColor: COLORS.frosted,
    tagText: COLORS.steel,
    date: "April 12, 2026",
    title: "How we built Gestura from scratch in 4 phases",
    excerpt: "From a blank Python file to a live cloud-deployed ASL translator — here's the full story of how Gestura was built, what broke, and what we learned.",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "training-lstm-asl",
    tag: "ML",
    tagColor: COLORS.deep,
    tagText: "#fff",
    date: "April 10, 2026",
    title: "Training an LSTM model on 87,000 ASL images — what we learned",
    excerpt: "We processed 87,000 hand gesture images through MediaPipe, extracted 63 landmark coordinates per image, and trained a custom LSTM. Here's exactly how we did it and what 98.2% accuracy actually means.",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "mediapipe-landmarks",
    tag: "Technical",
    tagColor: COLORS.honeydew,
    tagText: COLORS.steel,
    date: "April 8, 2026",
    title: "Why we use MediaPipe landmarks instead of raw images",
    excerpt: "Most ASL projects train on raw images. We don't. Here's why extracting 21 hand landmarks first made our model faster, smaller, and more accurate.",
    readTime: "4 min read",
    featured: false,
  },
  {
    slug: "real-time-inference",
    tag: "Engineering",
    tagColor: COLORS.honeydew,
    tagText: COLORS.steel,
    date: "April 6, 2026",
    title: "Getting real-time inference under 200ms with FastAPI",
    excerpt: "Real-time means nothing if your API is slow. Here's how we optimized our FastAPI + PyTorch inference pipeline to consistently hit sub-200ms response times.",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "gestura-roadmap",
    tag: "Roadmap",
    tagColor: COLORS.strawberry,
    tagText: "#fff",
    date: "April 4, 2026",
    title: "Gestura roadmap — what's coming next",
    excerpt: "Word-level detection, mobile support, multi-language sign languages, and a public API. Here's everything we're building next and why.",
    readTime: "3 min read",
    featured: false,
  },
  {
    slug: "accessibility-mission",
    tag: "Mission",
    tagColor: COLORS.honeydew,
    tagText: COLORS.steel,
    date: "April 2, 2026",
    title: "Why accessibility tech matters more than ever",
    excerpt: "Over 70 million people use sign language as their primary language. Here's why we believe AI-powered accessibility tools are one of the most important things we can build right now.",
    readTime: "4 min read",
    featured: false,
  },
];

export default function Blog() {
  const featured = posts[0];
  const rest = posts.slice(1);

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
              style={{ fontSize: "14px", fontWeight: 500, color: COLORS.steel, textDecoration: "none" }}>
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
        <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: COLORS.steel, marginBottom: "16px" }}>Blog</p>
        <h1 style={{ fontSize: "52px", fontWeight: 800, color: COLORS.deep, letterSpacing: "-2px", lineHeight: 1.1, marginBottom: "20px" }}>
          Stories, updates,<br />and engineering.
        </h1>
        <p style={{ fontSize: "17px", color: COLORS.steel, lineHeight: 1.7, maxWidth: "500px", margin: "0 auto" }}>
          Behind the scenes of building Gestura — model training, product decisions, and what's coming next.
        </p>
      </section>

      {/* Featured post */}
      <section style={{ padding: "64px 64px 0", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ background: COLORS.deep, borderRadius: "24px", padding: "48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ background: COLORS.strawberry, color: "#fff", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Featured</span>
              <span style={{ background: `${COLORS.frosted}20`, color: COLORS.frosted, fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px" }}>{featured.tag}</span>
            </div>
            <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.2, marginBottom: "16px" }}>{featured.title}</h2>
            <p style={{ fontSize: "15px", color: `${COLORS.frosted}cc`, lineHeight: 1.75, marginBottom: "28px" }}>{featured.excerpt}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "16px" }}>
                <span style={{ fontSize: "12px", color: `${COLORS.frosted}60` }}>{featured.date}</span>
                <span style={{ fontSize: "12px", color: `${COLORS.frosted}60` }}>{featured.readTime}</span>
              </div>
              <Link href={`/blog/${featured.slug}`} style={{ background: COLORS.strawberry, color: "#fff", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
                Read more →
              </Link>
            </div>
          </div>
          <div style={{ background: `${COLORS.frosted}10`, borderRadius: "16px", height: "260px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${COLORS.frosted}20` }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "64px", marginBottom: "12px" }}>🤟</div>
              <p style={{ color: `${COLORS.frosted}60`, fontSize: "13px" }}>Gestura origin story</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of posts */}
      <section style={{ padding: "40px 64px 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {rest.map(({ slug, tag, tagColor, tagText, date, title, excerpt, readTime }) => (
            <div key={slug} style={{ background: COLORS.honeydew, borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ background: tagColor, color: tagText, fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "0.5px", border: tagColor === COLORS.honeydew ? `1px solid ${COLORS.steel}20` : "none" }}>
                  {tag}
                </span>
                <span style={{ fontSize: "12px", color: COLORS.steel, opacity: 0.6 }}>{readTime}</span>
              </div>
              <h3 style={{ fontSize: "19px", fontWeight: 700, color: COLORS.deep, letterSpacing: "-0.5px", lineHeight: 1.3, margin: 0 }}>{title}</h3>
              <p style={{ fontSize: "13px", color: COLORS.steel, lineHeight: 1.75, margin: 0, flex: 1 }}>{excerpt}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${COLORS.steel}15`, paddingTop: "14px" }}>
                <span style={{ fontSize: "12px", color: COLORS.steel, opacity: 0.6 }}>{date}</span>
                <Link href={`/blog/${slug}`} style={{ fontSize: "13px", fontWeight: 700, color: COLORS.deep, textDecoration: "none" }}>
                  Read more →
                </Link>
              </div>
            </div>
          ))}
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
            <Link key={item} href={item === "Home" ? "/" : item === "Open Source" ? "/opensource" : `/${item.toLowerCase()}`}style={{ fontSize: "13px", color: `${COLORS.frosted}80`, textDecoration: "none" }}>
              {item}
            </Link>
          ))}
        </div>
        <p style={{ fontSize: "12px", color: `${COLORS.frosted}50` }}>© 2026 Gestura. Built by Manav Kheni.</p>
      </footer>

    </main>
  );
}
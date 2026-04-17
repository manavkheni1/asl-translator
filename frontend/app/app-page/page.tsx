"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";

const INFERENCE_INTERVAL = 200;
const STREAK_THRESHOLD = 3;
const HISTORY_LENGTH = 8;
const GRAPH_LENGTH = 20;

const C = {
  strawberry: "#e63946",
  honeydew: "#f1faee",
  frosted: "#a8dadc",
  steel: "#457b9d",
  deep: "#1d3557",
};

type Session = {
  id: string;
  sentence: string;
  timestamp: string;
  duration: string;
};

export default function AppPage() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sentence, setSentence] = useState<string>("");
  const [noHand, setNoHand] = useState(false);
  const [letterHistory, setLetterHistory] = useState<string[]>([]);
  const [confidenceGraph, setConfidenceGraph] = useState<number[]>([]);
  const [streakCount, setStreakCount] = useState(0);
  const [lastAutoAdded, setLastAutoAdded] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [showShareCard, setShowShareCard] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const sessionStartRef = useRef<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const streakRef = useRef<{ letter: string; count: number }>({ letter: "", count: 0 });

  const fireConfetti = () => {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: [C.strawberry, C.frosted, C.steel] });
  };

  const drawLandmarks = useCallback((lms: number[][]) => {
    const canvas = canvasRef.current;
    const webcam = webcamRef.current?.video;
    if (!canvas || !webcam) return;
    canvas.width = webcam.videoWidth;
    canvas.height = webcam.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (lms.length === 0) return;
    const connections = [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[0,9],[9,10],[10,11],[11,12],[0,13],[13,14],[14,15],[15,16],[0,17],[17,18],[18,19],[19,20],[5,9],[9,13],[13,17]];
    ctx.strokeStyle = C.frosted;
    ctx.lineWidth = 2;
    connections.forEach(([a, b]) => {
      if (!lms[a] || !lms[b]) return;
      ctx.beginPath();
      ctx.moveTo(lms[a][0] * canvas.width, lms[a][1] * canvas.height);
      ctx.lineTo(lms[b][0] * canvas.width, lms[b][1] * canvas.height);
      ctx.stroke();
    });
    lms.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x * canvas.width, y * canvas.height, 4, 0, Math.PI * 2);
      ctx.fillStyle = C.strawberry;
      ctx.fill();
    });
  }, []);

  const predict = useCallback(async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    const base64Image = imageSrc.split(",")[1];
    try {
      const response = await fetch("https://gestura-6bia.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });
      const data = await response.json();
      if (data.prediction && data.message === "success") {
        const pred = data.prediction;
        const conf = data.confidence;
        setPrediction(pred);
        setConfidence(conf);
        setNoHand(false);
        setFeedback(null);
        setConfidenceGraph((prev) => [...prev.slice(-GRAPH_LENGTH + 1), conf]);
        setLetterHistory((prev) => [...prev.slice(-HISTORY_LENGTH + 1), pred]);
        if (data.landmarks) drawLandmarks(data.landmarks);
        if (streakRef.current.letter === pred) {
          streakRef.current.count += 1;
          setStreakCount(streakRef.current.count);
          if (streakRef.current.count === STREAK_THRESHOLD && pred !== "nothing") {
            if (pred === "space") { setSentence((p) => p + " "); fireConfetti(); }
            else if (pred === "del") { setSentence((p) => p.slice(0, -1)); }
            else { setSentence((p) => p + pred); }
            setLastAutoAdded(pred);
            setTimeout(() => setLastAutoAdded(null), 800);
            streakRef.current.count = 0;
          }
        } else {
          streakRef.current = { letter: pred, count: 1 };
          setStreakCount(1);
        }
      } else {
        setNoHand(true);
        setPrediction(null);
        drawLandmarks([]);
      }
    } catch (err) {
      console.error("Prediction error:", err);
    }
  }, [drawLandmarks]);

  const startTranslation = () => {
    setIsRunning(true);
    sessionStartRef.current = new Date();
    streakRef.current = { letter: "", count: 0 };
    intervalRef.current = setInterval(predict, INFERENCE_INTERVAL);
  };

  const stopTranslation = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Save session to history if sentence is not empty
    if (sentence.trim() && sessionStartRef.current) {
      const end = new Date();
      const diffMs = end.getTime() - sessionStartRef.current.getTime();
      const diffSecs = Math.round(diffMs / 1000);
      const duration = diffSecs < 60 ? `${diffSecs}s` : `${Math.round(diffSecs / 60)}m`;
      const newSession: Session = {
        id: Date.now().toString(),
        sentence: sentence.trim(),
        timestamp: end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        duration,
      };
      setSessions((prev) => [newSession, ...prev.slice(0, 9)]);
    }

    setPrediction(null);
    setConfidence(0);
    setNoHand(false);
    setStreakCount(0);
    drawLandmarks([]);
  };

  const addToSentence = () => {
    if (!prediction || prediction === "nothing") return;
    if (prediction === "space") { setSentence((p) => p + " "); fireConfetti(); }
    else if (prediction === "del") { setSentence((p) => p.slice(0, -1)); }
    else { setSentence((p) => p + prediction); }
  };

  const handleShare = () => {
    setShowShareCard(true);
  };

  const copyShareText = () => {
    navigator.clipboard.writeText(`I just signed "${sentence}" using Gestura — a real-time ASL translator built with a custom-trained AI model. Try it at gestura.ai 🤟`);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <main style={{ background: C.honeydew, minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Navbar */}
      <nav style={{ background: C.deep, padding: "0 40px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <Image src="/Gestura.png" alt="Gestura logo" width={32} height={32} style={{ borderRadius: "9px", display: "block" }} />
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: "15px", letterSpacing: "-0.3px" }}>Gestura</div>
            <div style={{ color: C.frosted, fontSize: "10px", opacity: 0.7 }}>ASL Translator</div>
          </div>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(168,218,220,0.12)", border: `1px solid ${C.frosted}25`, borderRadius: "20px", padding: "5px 14px" }}>
            <div style={{ width: "7px", height: "7px", background: "#4ade80", borderRadius: "50%" }} />
            <span style={{ color: C.frosted, fontSize: "12px", fontWeight: 500 }}>Model active — 98.2% accuracy</span>
          </div>
          <Link href="/reference" style={{ color: C.frosted, fontSize: "13px", textDecoration: "none", opacity: 0.8 }}>📖 ASL Reference</Link>
          <Link href="/" style={{ color: `${C.frosted}80`, fontSize: "13px", textDecoration: "none" }}>← Back to home</Link>
        </div>
      </nav>

      {/* Page header */}
      <div style={{ padding: "28px 40px 0", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 800, color: C.deep, letterSpacing: "-0.8px", marginBottom: "4px" }}>Live ASL Translator</h1>
        <p style={{ fontSize: "14px", color: C.steel }}>Point your camera at your hand and start signing — detection happens in real time.</p>
      </div>

      {/* Main grid */}
      <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 400px", gap: "20px" }}>

        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Webcam */}
          <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: `1px solid ${C.steel}15`, boxShadow: "0 2px 12px rgba(29,53,87,0.07)" }}>
            <div style={{ position: "relative", background: C.deep }}>
              <Webcam ref={webcamRef} screenshotFormat="image/jpeg" style={{ width: "100%", display: "block" }} mirrored={true} />
              <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", transform: "scaleX(-1)" }} />
              {isRunning && (
                <div style={{ position: "absolute", top: "14px", left: "14px", background: "rgba(0,0,0,0.6)", borderRadius: "20px", padding: "5px 12px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "7px", height: "7px", background: C.strawberry, borderRadius: "50%" }} />
                  <span style={{ color: "#fff", fontSize: "11px", fontWeight: 700, letterSpacing: "1px" }}>LIVE</span>
                </div>
              )}
              {noHand && isRunning && (
                <div style={{ position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.65)", borderRadius: "10px", padding: "8px 18px" }}>
                  <span style={{ color: "#fff", fontSize: "12px" }}>👋 Show your hand to the camera</span>
                </div>
              )}
            </div>
            <div style={{ padding: "16px 20px", display: "flex", gap: "10px", alignItems: "center", borderTop: `1px solid ${C.steel}10` }}>
              {!isRunning ? (
                <button onClick={startTranslation} style={{ background: C.deep, color: "#fff", border: "none", borderRadius: "10px", padding: "11px 28px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
                  ▶ Start
                </button>
              ) : (
                <button onClick={stopTranslation} style={{ background: C.strawberry, color: "#fff", border: "none", borderRadius: "10px", padding: "11px 28px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
                  ■ Stop
                </button>
              )}
              <button onClick={addToSentence} disabled={!prediction || !isRunning}
                style={{ background: isRunning && prediction ? C.steel : "#f3f4f6", color: isRunning && prediction ? "#fff" : "#9ca3af", border: "none", borderRadius: "10px", padding: "11px 24px", fontSize: "14px", fontWeight: 600, cursor: isRunning && prediction ? "pointer" : "default", transition: "all 0.2s" }}>
                + Add letter
              </button>
              <span style={{ marginLeft: "auto", fontSize: "12px", color: C.steel, opacity: 0.7 }}>Hold sign for 3 frames to auto-add</span>
            </div>
          </div>

          {/* Letter history */}
          <div style={{ background: "#fff", borderRadius: "16px", padding: "18px 20px", border: `1px solid ${C.steel}15`, boxShadow: "0 1px 4px rgba(29,53,87,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: C.steel }}>Recent predictions</p>
              <p style={{ fontSize: "11px", color: C.steel, opacity: 0.6 }}>Last {HISTORY_LENGTH} detections</p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {letterHistory.length === 0 ? (
                <span style={{ fontSize: "13px", color: "#9ca3af" }}>Start detection to see predictions here</span>
              ) : (
                letterHistory.map((l, i) => (
                  <div key={i} style={{ width: "38px", height: "38px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: 700, background: i === letterHistory.length - 1 ? C.deep : C.honeydew, color: i === letterHistory.length - 1 ? "#fff" : C.steel, transform: i === letterHistory.length - 1 ? "scale(1.12)" : "scale(1)", transition: "all 0.15s", border: i === letterHistory.length - 1 ? "none" : `1px solid ${C.steel}15` }}>
                    {l}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Session history */}
          <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${C.steel}15`, boxShadow: "0 1px 4px rgba(29,53,87,0.05)", overflow: "hidden" }}>
            <button onClick={() => setShowHistory(!showHistory)}
              style={{ width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: C.steel, margin: 0 }}>Session history</p>
                {sessions.length > 0 && (
                  <span style={{ background: C.deep, color: "#fff", fontSize: "10px", fontWeight: 700, padding: "2px 7px", borderRadius: "10px" }}>{sessions.length}</span>
                )}
              </div>
              <span style={{ color: C.steel, fontSize: "12px" }}>{showHistory ? "▲" : "▼"}</span>
            </button>
            {showHistory && (
              <div style={{ borderTop: `1px solid ${C.steel}10`, padding: "12px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {sessions.length === 0 ? (
                  <p style={{ fontSize: "13px", color: "#9ca3af", textAlign: "center", padding: "16px 0" }}>No sessions yet — stop the translator to save a session</p>
                ) : (
                  sessions.map((s) => (
                    <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: C.honeydew, borderRadius: "10px" }}>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: C.deep, margin: 0, fontFamily: "monospace", letterSpacing: "1px" }}>{s.sentence}</p>
                        <p style={{ fontSize: "11px", color: C.steel, margin: "2px 0 0", opacity: 0.7 }}>{s.timestamp} · {s.duration}</p>
                      </div>
                      <button onClick={() => { navigator.clipboard.writeText(s.sentence); }}
                        style={{ background: "#fff", color: C.steel, border: `1px solid ${C.steel}20`, borderRadius: "7px", padding: "4px 10px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                        Copy
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Prediction */}
          <div style={{ background: C.deep, borderRadius: "20px", padding: "28px 24px", textAlign: "center", boxShadow: "0 4px 20px rgba(29,53,87,0.18)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "160px", height: "160px", background: `${C.frosted}08`, borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: "-30px", left: "-30px", width: "120px", height: "120px", background: `${C.strawberry}06`, borderRadius: "50%" }} />
            <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: C.frosted, opacity: 0.6, marginBottom: "16px" }}>Current prediction</p>
            {noHand && isRunning ? (
              <div style={{ padding: "32px 0" }}>
                <div style={{ fontSize: "40px", marginBottom: "10px" }}>👋</div>
                <p style={{ color: C.frosted, opacity: 0.5, fontSize: "14px" }}>No hand detected</p>
              </div>
            ) : prediction ? (
              <>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <div style={{ fontSize: "100px", fontWeight: 900, color: "#fff", lineHeight: 1, textShadow: `0 0 40px ${C.frosted}30` }}>
                    {prediction}
                  </div>
                  {lastAutoAdded && (
                    <div style={{ position: "absolute", top: "-6px", right: "-20px", background: "#4ade80", color: "#fff", fontSize: "10px", fontWeight: 800, padding: "3px 8px", borderRadius: "10px", letterSpacing: "0.5px" }}>
                      ADDED
                    </div>
                  )}
                </div>
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "8px", height: "5px", margin: "20px 0 8px", overflow: "hidden" }}>
                  <div style={{ height: "5px", background: confidence > 90 ? "#4ade80" : confidence > 70 ? C.frosted : C.strawberry, borderRadius: "8px", width: `${confidence}%`, transition: "width 0.2s, background 0.3s" }} />
                </div>
                <p style={{ color: C.frosted, fontSize: "12px", opacity: 0.75, marginBottom: "12px" }}>{confidence.toFixed(1)}% confidence</p>

                {/* Accuracy feedback */}
                <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "12px" }}>
                  <button onClick={() => setFeedback("up")}
                    style={{ background: feedback === "up" ? "#4ade80" : "rgba(255,255,255,0.08)", border: "none", borderRadius: "8px", padding: "6px 14px", fontSize: "14px", cursor: "pointer", transition: "all 0.2s" }}>
                    👍
                  </button>
                  <button onClick={() => setFeedback("down")}
                    style={{ background: feedback === "down" ? C.strawberry : "rgba(255,255,255,0.08)", border: "none", borderRadius: "8px", padding: "6px 14px", fontSize: "14px", cursor: "pointer", transition: "all 0.2s" }}>
                    👎
                  </button>
                </div>
                {feedback && (
                  <p style={{ color: C.frosted, fontSize: "11px", opacity: 0.6, marginBottom: "8px" }}>
                    {feedback === "up" ? "Thanks! Helps improve the model." : "Got it — we'll work on this sign."}
                  </p>
                )}

                <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "8px" }}>
                  {[1, 2, 3].map((i) => (
                    <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: streakCount >= i ? "#f59e0b" : "rgba(255,255,255,0.12)", transition: "all 0.2s", transform: streakCount >= i ? "scale(1.2)" : "scale(1)" }} />
                  ))}
                </div>
                <p style={{ color: C.frosted, fontSize: "11px", opacity: 0.5 }}>
                  {streakCount >= STREAK_THRESHOLD ? "Adding..." : `Hold steady — ${STREAK_THRESHOLD - streakCount} more frame${STREAK_THRESHOLD - streakCount !== 1 ? "s" : ""}`}
                </p>
              </>
            ) : (
              <div style={{ padding: "32px 0" }}>
                <div style={{ fontSize: "40px", marginBottom: "10px" }}>🤟</div>
                <p style={{ color: C.frosted, opacity: 0.5, fontSize: "14px" }}>Press Start to begin</p>
              </div>
            )}
          </div>

          {/* Confidence graph */}
          <div style={{ background: "#fff", borderRadius: "16px", padding: "18px 20px", border: `1px solid ${C.steel}15`, boxShadow: "0 1px 4px rgba(29,53,87,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: C.steel }}>Confidence over time</p>
              {confidenceGraph.length > 0 && (
                <p style={{ fontSize: "11px", color: C.steel, opacity: 0.6 }}>{confidenceGraph[confidenceGraph.length - 1].toFixed(0)}% last frame</p>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "56px" }}>
              {confidenceGraph.length === 0 ? (
                <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", width: "100%" }}>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} style={{ flex: 1, borderRadius: "3px", height: "8px", background: C.honeydew }} />
                  ))}
                </div>
              ) : (
                confidenceGraph.map((val, i) => (
                  <div key={i} style={{ flex: 1, borderRadius: "3px", height: `${Math.max(val, 4)}%`, background: val > 90 ? "#4ade80" : val > 70 ? C.frosted : C.strawberry, transition: "height 0.2s" }} />
                ))
              )}
            </div>
          </div>

          {/* Sentence builder */}
          <div style={{ background: "#fff", borderRadius: "16px", padding: "18px 20px", border: `1px solid ${C.steel}15`, boxShadow: "0 1px 4px rgba(29,53,87,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: C.steel }}>Sentence builder</p>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={handleShare} disabled={!sentence}
                  style={{ background: sentence ? C.deep : "#f3f4f6", color: sentence ? "#fff" : "#9ca3af", border: "none", borderRadius: "7px", padding: "5px 12px", fontSize: "12px", fontWeight: 600, cursor: sentence ? "pointer" : "default", transition: "all 0.2s" }}>
                  Share
                </button>
                <button onClick={() => { navigator.clipboard.writeText(sentence); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  style={{ background: copied ? "#4ade80" : C.honeydew, color: copied ? "#fff" : C.steel, border: "none", borderRadius: "7px", padding: "5px 12px", fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                  {copied ? "✓ Copied" : "Copy"}
                </button>
                <button onClick={() => setSentence("")} style={{ background: "transparent", color: "#9ca3af", border: "none", fontSize: "12px", cursor: "pointer" }}>Clear</button>
              </div>
            </div>
            <div style={{ minHeight: "52px", background: C.honeydew, borderRadius: "10px", padding: "12px 16px", display: "flex", alignItems: "center" }}>
              <p style={{ fontSize: "22px", fontWeight: 700, color: sentence ? C.deep : "#9ca3af", fontFamily: "monospace", letterSpacing: "2px", margin: 0, wordBreak: "break-all" }}>
                {sentence || "Start signing..."}
              </p>
            </div>
          </div>

          {/* Tips */}
          <div style={{ background: C.deep, borderRadius: "16px", padding: "18px 20px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: C.frosted, opacity: 0.6, marginBottom: "12px" }}>Quick tips</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                ["▶", "Click Start to begin live detection"],
                ["✋", "Hold sign steady for 3 frames to auto-add"],
                ["👍", "Thumbs up/down to give prediction feedback"],
                ["⎵", "Sign space gesture to add a space"],
                ["⌫", "Sign del gesture to delete last letter"],
              ].map(([icon, tip]) => (
                <div key={tip} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: C.frosted, opacity: 0.5, width: "16px", textAlign: "center" }}>{icon}</span>
                  <span style={{ fontSize: "12px", color: C.frosted, opacity: 0.75 }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Share card modal */}
      {showShareCard && (
        <div onClick={() => setShowShareCard(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: "24px", padding: "40px", maxWidth: "480px", width: "100%", textAlign: "center" }}>
            <div style={{ background: C.deep, borderRadius: "16px", padding: "32px", marginBottom: "24px" }}>
              <div style={{ fontSize: "13px", color: `${C.frosted}80`, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>Signed with Gestura</div>
              <div style={{ fontSize: "36px", fontWeight: 900, color: "#fff", fontFamily: "monospace", letterSpacing: "3px", wordBreak: "break-all" }}>{sentence}</div>
              <div style={{ marginTop: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <Image src="/Gestura.png" alt="Gestura" width={20} height={20} style={{ borderRadius: "5px" }} />
                <span style={{ color: `${C.frosted}80`, fontSize: "12px" }}>gestura.ai</span>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: C.steel, lineHeight: 1.7, marginBottom: "20px" }}>
              Share this sentence with anyone — let them know you signed it using Gestura!
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={copyShareText}
                style={{ flex: 1, background: shareCopied ? "#4ade80" : C.deep, color: "#fff", border: "none", borderRadius: "10px", padding: "12px", fontSize: "14px", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
                {shareCopied ? "✓ Copied!" : "Copy share text"}
              </button>
              <button onClick={() => setShowShareCard(false)}
                style={{ background: C.honeydew, color: C.steel, border: "none", borderRadius: "10px", padding: "12px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ paddingBottom: "40px" }} />
    </main>
  );
}
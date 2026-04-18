import { useState, useRef, useEffect } from "react";


// ── Graphite + Rose Theme ─────────────────────────────────────────
const T = {
  pageBg:        "#18181B",
  cardBg:        "#27272A",
  cardBg2:       "#3F3F46",
  border:        "rgba(255,255,255,.07)",
  borderHover:   "rgba(255,255,255,.15)",
  textPrimary:   "#FAFAFA",
  textMuted:     "#A1A1AA",
  textHint:      "#71717A",
  accent:        "#F43F5E",
  accentDim:     "rgba(244,63,94,.12)",
  accentText:    "#ffffff",
  success:       "#22D3EE",
  successBg:     "rgba(34,211,238,.1)",
  successBorder: "rgba(34,211,238,.25)",
  warn:          "#FB923C",
  warnBg:        "rgba(251,146,60,.12)",
  warnBorder:    "rgba(251,146,60,.3)",
  danger:        "#F87171",
  dangerBg:      "rgba(248,113,113,.12)",
  dangerBorder:  "rgba(248,113,113,.3)",
  inputBg:       "#3F3F46",
  btnBg:         "#F43F5E",
  btnText:       "#ffffff",
};


// ── Animated counter ──────────────────────────────────────────────
function useCountUp(target, duration = 900, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active || target === 0) { 
      setTimeout(() => setValue(target), 0);
       return; 
      }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, active, duration]);
  return value;
}

// ── Risk meta — dark-theme adapted ───────────────────────────────
function riskMeta(pct) {
  if (pct >= 60) return { color: "#F87171", bg: "rgba(248,113,113,.15)", txt: "#FCA5A5", label: "High risk",     border: "rgba(248,113,113,.3)", barColor: "#F87171" };
  if (pct >= 30) return { color: "#FB923C", bg: "rgba(251,146,60,.15)",  txt: "#FDBA74", label: "Moderate risk", border: "rgba(251,146,60,.3)",  barColor: "#FB923C" };
  return           { color: "#22D3EE", bg: "rgba(34,211,238,.12)",  txt: "#67E8F9", label: "Low risk",      border: "rgba(34,211,238,.25)", barColor: "#22D3EE" };
}

// ── Icons ─────────────────────────────────────────────────────────
const SparkIcon   = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2.5L9.5 5.5H13L10.5 7.5L11.5 11L8 9L4.5 11L5.5 7.5L3 5.5H6.5L8 2.5Z" fill="currentColor"/></svg>;
const BrainIcon   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3a3 3 0 0 0-2.83 4A3.5 3.5 0 0 0 3 10.5c0 1.5.94 2.8 2.28 3.31A3 3 0 0 0 8 17h1v4h6v-4h1a3 3 0 0 0 2.72-3.19A3.5 3.5 0 0 0 21 10.5a3.5 3.5 0 0 0-3.17-3.5A3 3 0 0 0 15 3c-.96 0-1.82.45-2.37 1.14A3 3 0 0 0 9 3Z"/></svg>;
const WarnIcon    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const ChevronIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const SpinIcon    = () => <svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.22-8.56"/></svg>;

// ── Sub-components ─────────────────────────────────────────────────
function Card({ children, style = {} }) {
  return <div style={{ background: T.cardBg, border: `0.5px solid ${T.border}`, borderRadius: 20, padding: "1.25rem", ...style }}>{children}</div>;
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
      <div style={{ width: 3, height: 14, borderRadius: 2, background: T.accent }}/>
      <span style={{ fontSize: 11, fontWeight: 600, color: T.textHint, textTransform: "uppercase", letterSpacing: ".08em" }}>{children}</span>
    </div>
  );
}

function Badge({ children, color, bg, border }) {
  return <span style={{ padding: "4px 10px", borderRadius: 100, background: bg, color, border: `0.5px solid ${border}`, fontSize: 12, fontWeight: 600 }}>{children}</span>;
}

function ConfPips({ conf }) {
  const on = (conf || "").toLowerCase().includes("high") ? 3 : (conf || "").toLowerCase().includes("mod") ? 2 : 1;
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[0,1,2].map(i => <div key={i} style={{ width: 22, height: 6, borderRadius: 3, background: i < on ? T.accent : T.cardBg2, transition: "background .4s" }}/>)}
    </div>
  );
}

function ChurnBar({ pct, meta }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 80); return () => clearTimeout(t); }, [pct]);
  return (
    <div style={{ height: 6, borderRadius: 100, background: T.cardBg2, overflow: "hidden", margin: "14px 0 4px" }}>
      <div style={{ height: "100%", borderRadius: 100, background: meta.barColor, width: w + "%", transition: "width .85s cubic-bezier(.4,0,.2,1)", boxShadow: `0 0 10px ${meta.barColor}88` }}/>
    </div>
  );
}

function StatChip({ label, value }) {
  return (
    <div style={{ background: T.cardBg, border: `0.5px solid ${T.border}`, borderRadius: 12, padding: "10px 14px", textAlign: "center" }}>
      <div style={{ fontSize: 17, fontWeight: 600, color: T.textPrimary, letterSpacing: "-.02em" }}>{value}</div>
      <div style={{ fontSize: 11, color: T.textHint, marginTop: 2, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function RecTile({ icon, label, value, color }) {
  return (
    <div style={{ borderRadius: 12, padding: 14, border: `0.5px solid ${color}33`, background: `${color}0f`, display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: T.textHint, textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</span>
      <span style={{ fontSize: 20, fontWeight: 600, color, letterSpacing: "-.02em" }}>{value}</span>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────
export default function App() {
  const whatIfRef = useRef(null);
  const [tenure,   setTenure]   = useState("");
  const [monthly,  setMonthly]  = useState("");
  const [total,    setTotal]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [result,   setResult]   = useState(null);
  const [error,    setError]    = useState("");
  const [animated, setAnimated] = useState(false);
  const resultsRef = useRef(null);

  const pct         = result ? Math.round(result.churn_probability > 1 ? result.churn_probability : result.churn_probability * 100) : 0;
  const meta        = riskMeta(pct);
  const animatedPct = useCountUp(pct, 900, animated);
  const ud          = result?.user_data || {};
  const tenureVal   = ud.tenure          ?? result?.tenure          ?? tenure;
  const monthlyVal  = ud.MonthlyCharges ?? monthly;
  const totalVal    = ud.TotalCharges   ?? total;
  const pri         = (result?.priority || "").toUpperCase();
const [whatIfResult, setWhatIfResult] = useState(null); // ✅ ADD THIS
const [whatIfLoading, setWhatIfLoading] = useState(false);

  const roi =
  result
    ? (result.expected_saves * 1000 - result.cost)
    : 0;

  function showResult(data) {
    setResult(data); setError(""); setAnimated(false);
    setTimeout(() => { setAnimated(true); resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 50);
  }

  async function analyze() {
  if (!tenure || !monthly || !total) {
    setError("Please fill in all three fields before analyzing.");
    return;
  }

  setError("");
  setLoading(true);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/predict?tenure=${tenure}&monthly_charges=${monthly}&total_charges=${total}`)

    if (!res.ok) {
  const err = await res.json();
  throw new Error(err.detail || "Invalid input");
}

    const data = await res.json();   // ✅ store response
    console.log("API RESULT:", data); // ✅ ADD THIS LINE

    showResult(data);                // ✅ pass data

  } catch (e) {
  if (e.message.includes("must be between")) {
    // ✅ User input error
    setError(e.message);
  } else {
    // ❌ Real server/network error
    setError("Server error. Please try again later.");
  }
} finally {
    setLoading(false);
  }
}
async function runWhatIf() {
  if (!tenure || !monthly || !total) return;

  setWhatIfLoading(true);

  // ✅ let UI update BEFORE heavy work
  await Promise.resolve();

  const discountedMonthly = Math.round(monthly * 0.8);

  try {
    const res = await fetch(
      `/predict?tenure=${tenure}&monthly_charges=${discountedMonthly}&total_charges=${total}`
    );

    const data = await res.json();
    setWhatIfResult(data);
    setTimeout(() => {
  whatIfRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}, 100);
  } catch (e) {
    console.log("What-if error", e);
  } finally {
    setWhatIfLoading(false);
  }
}

  function loadDemo() {
    setTenure("7"); setMonthly("920"); setTotal("6440");
    showResult({
      user_data: { tenure: 7, monthly_charges: 920, total_charges: 6440 },
      churn_probability: 0.69, priority: "HIGH",
      warning: "Low tenure combined with high monthly charges is a strong churn indicator.",
      segment: "High Value", confidence: "High",
      reason: "Customer has low tenure relative to charges, matching high-risk churn profiles in training data.",
      action: "Email Campaign", cost: 1200, expected_saves: 38,
      insight: "Customer has a 69% probability of churn. Users with low tenure and high monthly charges are at elevated risk. A targeted Email Campaign is recommended to re-engage and retain this high-value segment.",
    });
  }

  return (
    <div style={{ minHeight: "100vh", background: T.pageBg, fontFamily: "'DM Sans', system-ui, sans-serif", color: T.textPrimary }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
        @keyframes spin   { to   { transform:rotate(360deg) } }
        @keyframes pulse  { 0%,100% { opacity:1 } 50% { opacity:.35 } }
        .spin     { animation: spin .65s linear infinite; }
        .fade-up  { animation: fadeUp .45s cubic-bezier(.2,0,.2,1) both; }
        .pulse-dot{ animation: pulse 2.2s ease-in-out infinite; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      {/* Top accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent 0%, ${T.accent} 50%, transparent 100%)` }}/>

      {/* Header */}
      <div style={{ textAlign: "center", padding: "3rem 1rem 2rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 100, background: T.accentDim, border: `0.5px solid ${T.accent}55`, color: T.accent, fontSize: 12, fontWeight: 600, marginBottom: 18, letterSpacing: ".04em" }}>
          <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent, boxShadow: `0 0 0 3px ${T.accent}44` }}/>
          Powered by AI Decision Engine
        </div>
        <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 600, color: T.textPrimary, letterSpacing: "-.03em", lineHeight: 1.15, marginBottom: 10 }}>
          AI Customer Intelligence<span style={{ color: T.accent }}> Dashboard</span>
        </h1>
        <p style={{ fontSize: 15, color: T.textMuted, maxWidth: 460, margin: "0 auto", lineHeight: 1.65 }}>
          Turn customer data into confident, actionable business decisions — instantly
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 1rem 4rem" }}>

        {/* Input card */}
        <Card style={{ marginBottom: "1.25rem" }}>
          <SectionLabel>Customer data input</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
            {[
              { label: "Tenure",          sub: "in months",    val: tenure,  set: setTenure,  ph: "e.g. 12"    },
              { label: "Monthly charges", sub: "₹ per month",  val: monthly, set: setMonthly, ph: "e.g. 850"   },
              { label: "Total charges",   sub: "cumulative ₹", val: total,   set: setTotal,   ph: "e.g. 10200" },
            ].map(f => (
              <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.textMuted }}>{f.label}</span>
                <input
                  type="number"
  placeholder={f.ph}
  value={f.val}
  min="0"
  max={
    f.label === "Tenure" ? 72 :
    f.label === "Monthly charges" ? 150 :
    10000
  }
  onChange={e => f.set(e.target.value)}
                  style={{ height: 42, padding: "0 12px", border: `0.5px solid ${T.border}`, borderRadius: 10, background: T.inputBg, fontSize: 14, color: T.textPrimary, outline: "none", fontFamily: "inherit", transition: "border-color .15s, box-shadow .15s" }}
                  onFocus={e => { e.target.style.borderColor = T.accent; e.target.style.boxShadow = `0 0 0 3px ${T.accent}22`; }}
                  onBlur={e  => { e.target.style.borderColor = T.border; e.target.style.boxShadow = "none"; }}
                />
                {f.label === "Monthly charges" && Number(f.val) > 150 && (
  <span style={{ color: "orange", fontSize: "12px" }}>
    Max allowed is 150
  </span>
)}
                <span style={{ fontSize: 11, color: T.textHint }}>{f.sub}</span>
              </div>
            ))}
          </div>

          <button
            onClick={analyze} disabled={loading}
            style={{ width: "100%", height: 46, border: "none", borderRadius: 12, background: T.btnBg, color: T.btnText, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: loading ? .5 : 1, transition: "opacity .15s, box-shadow .15s", fontFamily: "inherit", letterSpacing: "-.01em", boxShadow: loading ? "none" : `0 0 24px ${T.accent}44` }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.opacity = ".88"; e.currentTarget.style.boxShadow = `0 0 32px ${T.accent}66`; }}}
            onMouseLeave={e => { if (!loading) { e.currentTarget.style.opacity = "1";   e.currentTarget.style.boxShadow = `0 0 24px ${T.accent}44`; }}}
          >
            {loading ? <><SpinIcon/><span>Analyzing…</span></> : <><SparkIcon/><span>Analyze customer</span></>}
          </button>
          {result && (
  <button
    onClick={runWhatIf}
    disabled={whatIfLoading}
    style={{
  marginTop: "10px",
  width: "100%",
  height: 38,
  borderRadius: 10,
  background: whatIfLoading ? "#1F2937" : "#27272A",
  color: "#A1A1AA",
  border: "1px solid rgba(255,255,255,.1)",
  cursor: "pointer",                 // ✅ no 🚫
  opacity: whatIfLoading ? 0.7 : 1,  // ✅ visual feedback instead
  transition: "all 0.15s ease"
}}
    onMouseDown={e => {
      e.currentTarget.style.transform = "scale(0.94)";
    }}
    onMouseUp={e => {
      e.currentTarget.style.transform = "scale(1)";
    }}
  >
    {whatIfLoading
      ? "⚡ Simulating impact..."
      : "🔍 Simulate 20% Discount Impact"}
  </button>
)}

          <button
            onClick={loadDemo}
            style={{ marginTop: 10, width: "100%", height: 38, border: `0.5px solid ${T.border}`, borderRadius: 10, background: "transparent", color: T.textMuted, fontSize: 13, cursor: "pointer", fontFamily: "inherit", transition: "background .15s, border-color .15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
            onMouseEnter={e => { e.currentTarget.style.background = T.cardBg2; e.currentTarget.style.borderColor = T.borderHover; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = T.border; }}
          >
            Try with demo data <ChevronIcon/>
          </button>

          {error && <div style={{ marginTop: 12, padding: "10px 14px", background: T.dangerBg, border: `0.5px solid ${T.dangerBorder}`, borderRadius: 10, fontSize: 13, color: T.danger }}>{error}</div>}
        </Card>

        {/* Results */}
        {result && (
          <div ref={resultsRef} className="fade-up">

            {/* Stat chips */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: "1rem" }}>
              <StatChip label="Tenure (months)" value={tenureVal  ?? "—"}/>
              <StatChip label="Monthly ₹"       value={monthlyVal ?? "—"}/>
              <StatChip label="Total ₹"         value={totalVal   ?? "—"}/>
            </div>

            {/* Churn + Profile */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1rem", marginBottom: "1rem" }}>

              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: T.textHint, textTransform: "uppercase", letterSpacing: ".07em" }}>Churn risk score</span>
                  <Badge color={meta.txt} bg={meta.bg} border={meta.border}>{pri || "—"}</Badge>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ fontSize: 62, fontWeight: 600, color: meta.color, lineHeight: 1, letterSpacing: "-.04em", fontVariantNumeric: "tabular-nums", textShadow: `0 0 30px ${meta.color}55` }}>
                    {animatedPct}%
                  </div>
                  <div style={{ paddingBottom: 10 }}>
                    <div style={{ fontSize: 13, color: T.textHint, marginBottom: 4 }}>probability of churn</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: meta.color, boxShadow: `0 0 6px ${meta.color}` }}/>
                      <span style={{ fontSize: 13, color: T.textMuted }}>{meta.label}</span>
                    </div>
                  </div>
                </div>
                <ChurnBar pct={pct} meta={meta}/>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: T.textHint }}>Safe</span>
                  <span style={{ fontSize: 11, color: T.textHint }}>Critical</span>
                </div>
              </Card>

              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: T.textHint, textTransform: "uppercase", letterSpacing: ".07em" }}>Customer profile</span>
                  <Badge color={T.accent} bg={T.accentDim} border={`${T.accent}44`}>{result.segment || "—"}</Badge>
                </div>
                {[
                  ["Tenure",          tenureVal  != null ? `${tenureVal} mo` : "—"],
                  ["Monthly charges", monthlyVal != null ? `₹${monthlyVal}` : "—"],
                  ["Total charges",   totalVal   != null ? `₹${totalVal}`   : "—"],
                  ["Segment",         result.segment || "—"],
                ].map(([k, v], i, arr) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: i < arr.length - 1 ? `0.5px solid ${T.border}` : "none", fontSize: 14 }}>
                    <span style={{ color: T.textHint }}>{k}</span>
                    <span style={{ fontWeight: 600, color: T.textPrimary }}>{v}</span>
                  </div>
                ))}
              </Card>
            </div>

            {/* Warning + Recommendation */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1rem", marginBottom: "1rem" }}>

              <Card>
                <SectionLabel>Warning signal</SectionLabel>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 10, background: T.warnBg, border: `0.5px solid ${T.warnBorder}`, marginBottom: 14 }}>
                  <span style={{ color: T.warn, flexShrink: 0, marginTop: 1 }}><WarnIcon/></span>
                  <span style={{ fontSize: 13, color: T.warn, lineHeight: 1.55 }}>{result.warning || "No active warnings detected."}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: T.textMuted }}>Model confidence</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ConfPips conf={result.confidence}/>
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary }}>{result.confidence || "—"}</span>
                  </div>
                </div>
                <div style={{ background: T.cardBg2, borderRadius: 10, padding: "10px 12px", fontSize: 13, color: T.textMuted, lineHeight: 1.6, border: `0.5px solid ${T.border}` }}>
                  {result.reason || "—"}
                </div>
              </Card>

              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <SectionLabel>Recommended action</SectionLabel>
                  <Badge color={T.success} bg={T.successBg} border={T.successBorder}>AI Decision</Badge>
                </div>
                <div style={{ fontSize: 22, fontWeight: 600, color: T.textPrimary, letterSpacing: "-.02em", marginBottom: "1rem" }}>
                  {result.action || "—"}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <RecTile icon="💰" label="Cost"           value={result.cost           != null ? `₹${result.cost}`              : "—"} color={T.success}/>
                  <RecTile icon="📈" label="Expected saves" value={result.expected_saves  != null ? `${result.expected_saves} users` : "—"} color={T.accent}/>
                </div>
                <div style={{
  marginTop: "10px",
  padding: "10px",
  borderRadius: "10px",
  background: "rgba(34,211,238,.1)",
  border: "1px solid rgba(34,211,238,.3)",
  fontSize: "13px",
  color: "#22D3EE"
}}>
  💰 Expected ROI: ₹{roi.toLocaleString()}
</div>

              </Card>
            </div>

            {/* AI Insight */}
            <div style={{ background: T.accentDim, border: `0.5px solid ${T.accent}33`, borderRadius: 20, padding: "1.25rem", boxShadow: `0 0 40px ${T.accent}0d` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: T.accentDim, border: `0.5px solid ${T.accent}55`, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent, flexShrink: 0 }}>
                  <BrainIcon/>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: T.accent, textTransform: "uppercase", letterSpacing: ".08em" }}>AI insight</span>
              </div>
              <p style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>
                {result.insight || result.reason || "No insight available."}
              </p>
            </div>
            {/* ✅ ADD THIS RIGHT BELOW */}
{result.note && (
  <div style={{
    marginTop: "10px",
    padding: "8px 12px",
    background: "rgba(251,146,60,.12)",
    border: "1px solid rgba(251,146,60,.3)",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#FB923C"
  }}>
    ⚠ {result.note}
  </div>
)}
{whatIfResult && (
  <div 
  ref={whatIfRef} 
  style={{
    marginTop: "15px",
    padding: "12px",
    borderRadius: "10px",
    background: "rgba(34,211,238,.08)",
    border: "1px solid rgba(34,211,238,.3)"
  }}>
    <div style={{ fontSize: "13px", color: "#22D3EE", marginBottom: "5px" }}>
      🔍 What-if Analysis (20% Discount)
    </div>

    <div style={{ fontSize: "14px", color: "#FAFAFA" }}>
      Before: <b>{result.churn_probability}%</b> → After: <b>{whatIfResult.churn_probability}%</b>
    </div>

    <div style={{ fontSize: "12px", color: "#A1A1AA", marginTop: "4px" }}>
      {whatIfResult.churn_probability < result.churn_probability
        ? "✅ Risk reduced with discount"
        : "⚠ No significant improvement"}
    </div>
  </div>
)}

          </div>
        )}
      </div>
    </div>
  );
}

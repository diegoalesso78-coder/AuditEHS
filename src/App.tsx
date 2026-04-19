import React, { useState, useEffect, useCallback } from "react";
import { STDS_BUILTIN, CONDUCTAS_BUILTIN, CATS, SCRIPT } from "./constants";
import { storage } from "./lib/storage";
import { getEHSRecommendations } from "./services/aiService";

const SKEY = "hse_v3";

async function loadData() {
  try {
    const r = await storage.get(SKEY);
    return r ? JSON.parse(r.value) : null;
  } catch {
    return null;
  }
}

async function saveData(d: any) {
  try {
    await storage.set(SKEY, JSON.stringify(d));
  } catch { }
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function calcScore(scores: Record<string, number>) {
  const vals = Object.values(scores).filter(v => v != null);
  if (!vals.length) return { total: 0, max: 0, pct: 100, iper: "BAJA", count: 0 };
  const total = vals.reduce((a, b) => a + b, 0), max = vals.length * 3;
  const pct = Math.round((1 - total / max) * 100);
  const avg = total / vals.length;
  return { total, max, pct, iper: avg < 0.5 ? "BAJA" : avg < 1.5 ? "MEDIA-BAJA" : avg < 2.5 ? "MEDIA-ALTA" : "ALTA", count: vals.length };
}

function pctColor(p: number) {
  return p >= 80 ? "#10b981" : p >= 60 ? "#f59e0b" : p >= 40 ? "#f97316" : "#ef4444";
}

function timeAgo(iso: string | null) {
  if (!iso) return null;
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "hace menos de 1 min";
  if (s < 3600) return `hace ${Math.floor(s / 60)} min`;
  if (s < 86400) return `hace ${Math.floor(s / 3600)} h`;
  return `hace ${Math.floor(s / 86400)} días`;
}

const S: Record<string, React.CSSProperties> = {
  app: { maxWidth: 480, margin: "0 auto", minHeight: "100vh", fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-text-primary)", display: "flex", flexDirection: "column" },
  screen: { flex: 1, overflowY: "auto", padding: "20px 16px", paddingBottom: 90 },
  card: { background: "var(--color-background-primary)", borderWidth: 1, borderStyle: "solid", borderColor: "var(--color-border-tertiary)", borderRadius: 14, padding: 18, marginBottom: 14 },
  btn: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 18px", borderRadius: 8, borderWidth: 1.5, borderStyle: "solid", borderColor: "var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: 13, fontWeight: 500, cursor: "pointer", width: "100%" },
  btnP: { background: "#0ea5e9", borderColor: "#0ea5e9", color: "#fff" },
  btnG: { background: "#10b981", borderColor: "#10b981", color: "#fff" },
  sm: { padding: "8px 14px", fontSize: 12, width: "auto" },
  nav: { display: "flex", borderTop: "1px solid var(--color-border-tertiary)", background: "var(--color-background-primary)", padding: "6px 0 2px", position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, zIndex: 100 },
  navBtn: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "8px 4px", background: "none", border: "none", cursor: "pointer", color: "var(--color-text-tertiary)", fontSize: 10, fontWeight: 500 },
  input: { width: "100%", padding: "11px 14px", borderRadius: 8, borderWidth: 1.5, borderStyle: "solid", borderColor: "var(--color-border-secondary)", background: "var(--color-background-tertiary)", color: "var(--color-text-primary)", fontSize: 13, fontFamily: "var(--font-sans)", marginBottom: 8, boxSizing: "border-box" },
  statRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, margin: "12px 0" },
  statBox: { background: "var(--color-background-secondary)", borderWidth: 1, borderStyle: "solid", borderColor: "var(--color-border-tertiary)", borderRadius: 8, padding: 12, textAlign: "center" },
  xpBar: { height: 8, borderRadius: 4, background: "var(--color-border-tertiary)", overflow: "hidden", margin: "6px 0" },
  xpFill: { height: "100%", borderRadius: 4, background: "#0ea5e9", transition: "width .4s" },
  sep: { height: 1, background: "var(--color-border-tertiary)", margin: "14px 0" },
};

function Alert({ type, text }: { type: 'ok' | 'warn' | 'err', text: string | React.ReactNode }) {
  const m = { ok: ["#d1fae5", "#065f46", "#6ee7b7"], warn: ["#fef9c3", "#713f12", "#fde047"], err: ["#fee2e2", "#991b1b", "#fca5a5"] };
  const [bg, fg, bd] = m[type] || m.warn;
  return <div style={{ padding: "11px 14px", borderRadius: 8, background: bg, color: fg, border: `1px solid ${bd}`, fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>{text}</div>;
}

function SyncBanner({ status, lastSync, onRefresh }: any) {
  const cfg = {
    loading: { bg: "#e0f2fe", color: "#0c4a6e", text: "Sincronizando con Google Sheets…" },
    ok: { bg: "#d1fae5", color: "#065f46", text: `Sincronización al día — ${timeAgo(lastSync)}` },
    offline: { bg: "#fef9c3", color: "#713f12", text: `Modo offline — ${timeAgo(lastSync) || "Sin datos"}` },
    error: { bg: "#fee2e2", color: "#991b1b", text: "Error de conexión: Revisa el Web App en Config." },
  }[status as 'loading' | 'ok' | 'offline' | 'error'];
  if (!cfg) return null;
  const icon = { loading: "🔄", ok: "✅", offline: "📶", error: "⚠️" }[status as 'loading' | 'ok' | 'offline' | 'error'];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, background: cfg.bg, color: cfg.color, fontSize: 12, marginBottom: 14, border: `1px solid ${cfg.color}33`, transition: "all 0.3s" }}>
      <span style={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ animation: status === "loading" ? "spin 1s linear infinite" : "none", display: "inline-block" }}>{icon}</span>
        {cfg.text}
      </span>
      {status !== "loading" && (
        <button 
          onClick={(e) => { e.stopPropagation(); onRefresh(); }} 
          style={{ background: cfg.color + "22", border: "none", cursor: "pointer", color: cfg.color, fontSize: 13, fontWeight: 700, padding: "4px 8px", borderRadius: 6 }}
          title="Sincronizar ahora"
        >⟳ Actualizar</button>
      )}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function SetupWizard({ onDone }: any) {
  const [step, setStep] = useState(0);
  const [url, setUrl] = useState("");
  const [testSt, setTestSt] = useState<string | null>(null);
  const [seedSt, setSeedSt] = useState<string | null>(null);
  const [checks, setChecks] = useState({ code: false, deploy: false });
  const [copied, setCopied] = useState(false);
  const STEPS = [
    { icon: "👋", title: "Bienvenido al asistente", sub: "Te guiamos para conectar la app con Google Sheets en 6 pasos. Sin conocimientos técnicos." },
    { icon: "📊", title: "Creá tu planilla", sub: "Necesitás una hoja de Google Sheets donde se van a guardar las inspecciones." },
    { icon: "📋", title: "Pegá el código", sub: "Vamos a agregar un pequeño programa a tu planilla. No necesitás saber programar." },
    { icon: "🚀", title: "Publicá el programa", sub: "Este paso habilita la conexión entre la app y tu planilla." },
    { icon: "🔗", title: "Conectá la app", sub: "Pegá la URL que obtuviste en el paso anterior y probá la conexión." },
    { icon: "🌱", title: "Cargá los 19 estándares", sub: "Último paso: enviamos todos los estándares HSE a tu planilla para que puedas editarlos." },
  ];
  const canNext = [true, true, checks.code, checks.deploy, testSt === "ok", false];
  const s = STEPS[step];
  function copyCode() { navigator.clipboard?.writeText(SCRIPT); setCopied(true); setTimeout(() => setCopied(false), 2500) }
  async function testConn() {
    if (!url.trim()) { setTestSt("error"); return }
    setTestSt("testing");
    try { const r = await fetch(url.trim()); const d = await r.json(); setTestSt(d.ok ? "ok" : "error") } catch { setTestSt("error") }
  }
  async function seed() {
    setSeedSt("loading");
    try {
      const r = await fetch(url.trim(), { method: "POST", body: JSON.stringify({ action: "seed", standards: STDS_BUILTIN }) });
      const d = await r.json();
      if (d.ok) { setSeedSt("ok"); setTimeout(() => onDone(url.trim()), 1500) } else setSeedSt("error");
    } catch { setSeedSt("error") }
  }
  const Instr = ({ steps }: any) => (
    <div style={{ background: "var(--color-background-secondary)", border: "1px solid var(--color-border-tertiary)", borderRadius: 8, padding: 14, marginBottom: 12 }}>
      {steps.map(([n, c]: any, i: number) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < steps.length - 1 ? 12 : 0 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#0ea5e9", color: "#fff", display: "flex", alignItems: "center", justifyComtent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{n}</div>
          <div style={{ fontSize: 13, lineHeight: 1.5 }}>{c}</div>
        </div>
      ))}
    </div>
  );
  const CB = ({ k, label, sub }: any) => (
    <div onClick={() => setChecks(c => ({ ...c, [k]: !c[k as keyof typeof checks] }))} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 14px", borderRadius: 8, border: `1.5px solid ${checks[k as keyof typeof checks] ? "#10b981" : "var(--color-border-secondary)"}`, background: "var(--color-background-primary)", cursor: "pointer", marginBottom: 12 }}>
      <div style={{ width: 22, height: 22, borderRadius: 6, background: checks[k as keyof typeof checks] ? "#10b981" : "transparent", border: `2px solid ${checks[k as keyof typeof checks] ? "#10b981" : "var(--color-border-secondary)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>{checks[k as keyof typeof checks] && "✓"}</div>
      <div><div style={{ fontWeight: 500 }}>{label}</div>{sub && <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 2 }}>{sub}</div>}</div>
    </div>
  );
  return (
    <div style={{ ...S.screen, paddingBottom: 20 }}>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24 }}>
        {STEPS.map((_, i) => <div key={i} style={{ height: 10, borderRadius: 5, transition: "all .3s", background: i === step ? "#0ea5e9" : i < step ? "#10b981" : "var(--color-border-tertiary)", width: i === step ? 28 : 10 }} />)}
      </div>
      <div style={{ fontSize: 52, textAlign: "center", marginBottom: 12 }}>{s.icon}</div>
      <div style={{ fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 6 }}>{s.title}</div>
      <div style={{ fontSize: 13, color: "var(--color-text-secondary)", textAlign: "center", marginBottom: 20, lineHeight: 1.5 }}>{s.sub}</div>
      {step === 0 && <div style={S.card}>{[["✅", "Sin instalaciones", "Todo funciona desde el navegador"], ["📱", "100% móvil", "iOS, Android y escritorio"], ["📊", "Google Sheets", "Editá los 19 estándares sin tocar código"], ["🔄", "Carga automática", "La app actualiza estándares al arrancar y cada 5 minutos"]].map(([icon, title, sub]) => <div key={title} style={{ display: "flex", gap: 14, marginBottom: 12 }}><div style={{ fontSize: 26, lineHeight: 1 }}>{icon}</div><div><div style={{ fontWeight: 600 }}>{title}</div><div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 2 }}>{sub}</div></div></div>)}</div>}
      {step === 1 && <><Instr steps={[[1, "Hacé clic en el botón de abajo. Se abre una planilla de Google nueva en otra pestaña."], [2, <>Guardala con el nombre <strong>"HSE Inspector"</strong>. Con eso alcanza por ahora.</>]]} /><a href="https://sheets.new" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}><button style={{ ...S.btn, ...S.btnG }}>📊 Crear planilla en Google Sheets ↗</button></a></>}
      {step === 2 && <>
        <Instr steps={[[1, <>En tu planilla, hacé clic en el menú <strong>Extensiones</strong>.</>], [2, <>Seleccioná <strong>Apps Script</strong>. Se abre una nueva pestaña.</>], [3, <>Seleccioná todo el texto (Ctrl+A), borralo y pegá el código de abajo.</>], [4, <>Hacé clic en el ícono 💾 para guardar. Nombrá el proyecto <strong>"HSE API"</strong>.</>]]} />
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}><span style={{ fontSize: 12, color: "var(--color-text-tertiary)", flex: 1 }}>Código para Apps Script:</span><button onClick={copyCode} style={{ ...S.btn, ...S.sm }}>{copied ? "✅ Copiado" : "📋 Copiar"}</button></div>
        <div style={{ background: "var(--color-background-secondary)", border: "1px solid var(--color-border-tertiary)", borderRadius: 8, padding: 12, fontFamily: "monospace", fontSize: 10, whiteSpace: "pre-wrap", wordBreak: "break-all", color: "var(--color-text-secondary)", maxHeight: 160, overflowY: "auto", marginBottom: 12 }}>{SCRIPT}</div>
        <CB k="code" label="Ya pegué y guardé el código" sub="Marco esto cuando lo haya completado" />
      </>}
      {step === 3 && <>
        <Instr steps={[[1, <>En Apps Script, hacé clic en <strong>"Implementar"</strong> (botón azul, arriba a la derecha).</>], [2, <>Seleccioná <strong>"Nueva implementación"</strong>.</>], [3, <>Hacé clic en el ícono ⚙ junto a "Tipo" y elegí <strong>"Aplicación web"</strong>.</>], [4, <>"Ejecutar como": <strong>Yo</strong>. "Quién tiene acceso": <strong>Cualquier usuario</strong>.</>], [5, <>Hacé clic en <strong>"Implementar"</strong>. Si pide autorización, aceptá con tu cuenta de Google.</>], [6, <>Copiá la URL que empieza con <strong>https://script.google.com/macros…</strong></>]]} />
        <Alert type="warn" text="⚠️ Si Google dice que la app no está verificada: hacé clic en 'Avanzado' → 'Ir a [nombre] (no seguro)' → 'Permitir'. Es normal en scripts propios." />
        <CB k="deploy" label="Ya copié la URL del Web App" sub="Marco esto cuando tenga la URL en el portapapeles" />
      </>}
      {step === 4 && <>
        <Instr steps={[[1, "Pegá abajo la URL completa que copiaste en el paso anterior."], [2, <>Hacé clic en <strong>"Probar conexión"</strong>. Necesitás ver el mensaje verde para continuar.</>]]} />
        <input style={{ ...S.input, borderColor: testSt === "ok" ? "#10b981" : testSt === "error" ? "#ef4444" : "var(--color-border-secondary)" }} placeholder="https://script.google.com/macros/s/.../exec" value={url} onChange={e => { setUrl(e.target.value); setTestSt(null) }} />
        {testSt === "ok" && <Alert type="ok" text="✅ ¡Conexión exitosa! La app está conectada con tu planilla." />}
        {testSt === "error" && <Alert type="err" text="❌ No se pudo conectar. Verificá que copiaste la URL completa y elegiste 'Cualquier usuario' al desplegar." />}
        {testSt === "testing" && <Alert type="warn" text="⏳ Probando la conexión, un momento…" />}
        <button style={{ ...S.btn, ...S.btnP, opacity: testSt === "testing" ? 0.6 : 1 }} onClick={testConn} disabled={testSt === "testing"}>🔗 Probar conexión</button>
      </>}
      {step === 5 && <>
        <Instr steps={[[1, <><strong>Este botón envía los 19 estándares HSE completos</strong> a tu planilla, en la hoja "Estándares".</>], [2, "Una vez cargados, podés editar cualquier texto directamente en la planilla. La app los lee automáticamente al arrancar."]]} />
        {!seedSt && <button style={{ ...S.btn, ...S.btnP }} onClick={seed}>🌱 Cargar los 19 estándares a Google Sheets</button>}
        {seedSt === "loading" && <Alert type="warn" text="⏳ Enviando los 19 estándares a tu planilla…" />}
        {seedSt === "ok" && <Alert type="ok" text="✅ ¡Listo! Los 19 estándares están en tu planilla. La app se va a abrir en un momento…" />}
        {seedSt === "error" && <Alert type="err" text="❌ Hubo un error al enviar. Verificá que la URL sea correcta y volvé al paso anterior." />}
      </>}
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        {step > 0 && step < 5 && <button style={{ ...S.btn, width: "auto", flex: "0 0 auto", padding: "11px 20px" }} onClick={() => setStep(s => s - 1)}>← Atrás</button>}
        {step < 5 && <button style={{ ...S.btn, ...S.btnP, flex: 1, opacity: canNext[step] ? 1 : 0.4 }} disabled={!canNext[step]} onClick={() => setStep(s => s + 1)}>{step === 0 ? "Empezar →" : "Siguiente →"}</button>}
      </div>
      {step < 5 && <div style={{ textAlign: "center", fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 12 }}>Paso {step + 1} de {STEPS.length}</div>}
      {step === 0 && <><div style={S.sep} /><button style={{ ...S.btn, color: "var(--color-text-tertiary)" }} onClick={() => onDone(null)}>Saltar — usar sin Google Sheets</button></>}
    </div>
  );
}

function Dashboard({ state, standards, syncStatus, lastSync, onStart, onRefresh }: any) {
  const { history, plan } = state;
  const today = new Date().toLocaleDateString();
  const todayN = history.filter((i: any) => new Date(i.date).toLocaleDateString() === today).length;
  const avg = history.length ? Math.round(history.reduce((a: any, b: any) => a + b.pct, 0) / history.length) : 0;
  
  // Racha de Seguridad (días seguidos con inspecciones)
  const streak = (() => {
    if (!history.length) return 0;
    const dates = [...new Set(history.map((i: any) => new Date(i.date).toISOString().split("T")[0]))].sort((a: any, b: any) => b.localeCompare(a));
    let s = 0;
    let curr = new Date();
    for (let i = 0; i < 30; i++) {
      const ds = curr.toISOString().split("T")[0];
      if (dates.includes(ds)) {
        s++;
        curr.setDate(curr.getDate() - 1);
      } else {
        if (i === 0) { // Si hoy no hay, pero ayer sí, la racha sigue viva hasta ayer
          curr.setDate(curr.getDate() - 1);
          const ys = curr.toISOString().split("T")[0];
          if (dates.includes(ys)) continue;
        }
        break;
      }
    }
    return s;
  })();

  const todayPlan = plan?.filter((p: any) => {
    const pd = new Date(p.fecha).toLocaleDateString();
    return pd === today;
  }) || [];

  return (
    <div style={S.screen}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Panel HSE</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fef3c7", padding: "4px 10px", borderRadius: 20, border: "1px solid #fcd34d" }}>
          <span style={{ fontSize: 14 }}>🔥</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#92400e" }}>{streak} días</span>
        </div>
      </div>
      
      <SyncBanner status={syncStatus} lastSync={lastSync} onRefresh={onRefresh} count={standards.length} />
      
      {todayPlan.length > 0 ? (
        <div style={{ ...S.card, background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)", color: "#fff", padding: 20, marginBottom: 16, borderRadius: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", opacity: 0.8, marginBottom: 8, letterSpacing: "0.05em" }}>Plan de Hoy</div>
          {todayPlan.map((p: any, idx: number) => (
            <div key={idx} style={{ marginBottom: idx < todayPlan.length - 1 ? 12 : 0 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{p.tipo === "conducta" ? "Auditoría de Conductas" : (standards.find((s:any)=>s.id===p.stdId)?.titulo || "Inspección")}</div>
              <div style={{ fontSize: 13, opacity: 0.9, marginTop: 2 }}>📍 {p.lugar}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ ...S.card, background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#fff", padding: 20, marginBottom: 16, borderRadius: 16 }}>
          <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 4 }}>EHS Audit Pro - MABE-CORDOBA-</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Sin inspecciones programadas para hoy.</div>
        </div>
      )}

      <div style={S.statRow}>
        {[[ "Total", history.length, "#0ea5e9" ], [ "Promedio", `${avg}%`, pctColor(avg) ], [ "Hoy", todayN, "#7c3aed" ]].map(([l, v, c]: any) => (
          <div key={l} style={S.statBox}><div style={{ fontSize: 22, fontWeight: 700, color: c }}>{v}</div><div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>{l}</div></div>
        ))}
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, marginTop: 10 }}>Actividad Reciente</div>
      {[...history].reverse().slice(0, 4).map((i: any) => {
        const isCond = i.type === "conducta";
        const s = isCond ? { titulo: "Conductas", cat: "conducta" } : (standards.find((s: any) => s.id === i.stdId) || { titulo: i.stdId, cat: "instalaciones" });
        return (
          <div key={i.id} style={{ ...S.card, display: "flex", alignItems: "center", gap: 12, padding: 12, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0, background: pctColor(i.pct) + "22", color: pctColor(i.pct) }}>{i.pct}%</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{isCond ? "Auditoría de Conductas" : s.titulo}</div>
              <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{new Date(i.date).toLocaleDateString("es-AR")}</div>
            </div>
            <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 20, background: "var(--color-background-secondary)", border: "1px solid var(--color-border-tertiary)" }}>{isCond ? `${i.safe}S` : i.iper}</span>
          </div>
        );
      })}
    </div>
  );
}

function InspectScreen({ standards, conductas, syncStatus, lastSync, onRefresh, onSelect, onSelectConducta, context, setContext, forceType }: any) {
  const [step, setStep] = useState("context"); // context | type | standards
  const [cat, setCat] = useState("all");

  const handleContextContinue = () => {
    if (forceType === "standards") setStep("standards");
    else if (forceType === "conductas") onSelectConducta(context);
    else setStep("type");
  };

  if (step === "context") {
    const canCont = context.inspector && context.sitio && context.udn && context.area;
    return (
      <div style={S.screen}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{forceType === "conductas" ? "Nueva Obs. Conducta" : "Nueva Inspección"}</div>
          <button style={{ fontSize: 11, color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }} onClick={() => setContext({ inspector: "", sitio: "", udn: "", area: "", puesto: "", estacion: "" })}>Limpiar</button>
        </div>
        <div style={{ fontSize: 13, color: "var(--color-text-tertiary)", marginBottom: 16 }}>Ingresá los datos del lugar y responsable</div>
        
        <div style={S.card}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 10, letterSpacing: "0.05em" }}>Responsable</div>
          <input style={S.input} placeholder="Nombre del inspector" value={context.inspector} onChange={e => setContext({ ...context, inspector: e.target.value })} />
          
          <div style={{ height: 1, background: "var(--color-border-tertiary)", margin: "16px 0" }} />
          
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 10, letterSpacing: "0.05em" }}>Ubicación</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <input style={S.input} placeholder="Sitio" value={context.sitio} onChange={e => setContext({ ...context, sitio: e.target.value })} />
            <input style={S.input} placeholder="UDN" value={context.udn} onChange={e => setContext({ ...context, udn: e.target.value })} />
          </div>
          <input style={S.input} placeholder="Área" value={context.area} onChange={e => setContext({ ...context, area: e.target.value })} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
            <input style={S.input} placeholder="Puesto de trabajo" value={context.puesto} onChange={e => setContext({ ...context, puesto: e.target.value })} />
            <input style={S.input} placeholder="Estación" value={context.estacion} onChange={e => setContext({ ...context, estacion: e.target.value })} />
          </div>
        </div>
        
        <button 
          style={{ ...S.btn, ...S.btnP, marginTop: 10, opacity: canCont ? 1 : 0.4 }} 
          disabled={!canCont} 
          onClick={handleContextContinue}
        >
          Continuar →
        </button>
      </div>
    );
  }

  if (step === "type") {
    return (
      <div style={S.screen}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <button style={{ ...S.btn, ...S.sm, width: "auto" }} onClick={() => setStep("context")}>←</button>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Tipo de Auditoría</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          <div onClick={() => setStep("standards")} style={{ ...S.card, cursor: "pointer", display: "flex", alignItems: "center", gap: 16, padding: 20, borderLeft: "4px solid #0ea5e9" }}>
            <div style={{ fontSize: 32 }}>📋</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Estándares HSE</div>
              <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 2 }}>Auditoría técnica basada en condiciones físicas.</div>
            </div>
          </div>
          <div onClick={() => onSelectConducta(context)} style={{ ...S.card, cursor: "pointer", display: "flex", alignItems: "center", gap: 16, padding: 20, borderLeft: "4px solid #10b981" }}>
            <div style={{ fontSize: 32 }}>🧠</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Conductas</div>
              <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 2 }}>Observación de comportamientos y actos seguros.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cats = ["all", ...new Set(standards.map((s: any) => s.cat)) as any];
  const filtered = cat === "all" ? standards : standards.filter((s: any) => s.cat === cat);

  return (
    <div style={S.screen}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <button style={{ ...S.btn, ...S.sm, width: "auto" }} onClick={() => setStep("type")}>←</button>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Seleccionar Estándar</div>
      </div>
      <SyncBanner status={syncStatus} lastSync={lastSync} onRefresh={onRefresh} count={standards.length} />
      <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 14, paddingBottom: 4 }}>
        {cats.map((c: any) => <button key={c} onClick={() => setCat(c)} style={{ padding: "5px 12px", borderRadius: 20, border: "1px solid var(--color-border-secondary)", background: cat === c ? "#0ea5e9" : "var(--color-background-primary)", color: cat === c ? "#fff" : "var(--color-text-primary)", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}>{c === "all" ? "Todos" : `${CATS[c]?.icon || ""} ${CATS[c]?.label || c}`}</button>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {filtered.map((s: any) => {
          const cc = CATS[s.cat] || { color: "#64748b", icon: "📋" };
          return (<div key={s.id} onClick={() => onSelect({ ...s, context })} style={{ background: "var(--color-background-primary)", border: "1px solid var(--color-border-tertiary)", borderRadius: 14, borderTop: `3px solid ${cc.color}`, padding: 14, cursor: "pointer" }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{cc.icon}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--color-text-tertiary)", marginBottom: 2 }}>{s.cod}</div>
            <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.3 }}>{s.titulo}</div>
            <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 6 }}>{s.items.length} ítems</div>
          </div>);
        })}
      </div>
    </div>
  );
}

function ConductaFlow({ conductas, context, onSave, onCancel }: any) {
  const [results, setResults] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState("inspect");

  const cats = [...new Set(conductas.map((c: any) => c.cat)) as any];
  const totalItems = conductas.length;
  const answered = Object.keys(results).length;
  const progress = Math.round((answered / totalItems) * 100);
  
  const safe = Object.values(results).filter(v => v === "S").length;
  const risk = Object.values(results).filter(v => v === "R").length;
  const total = answered;
  const pct = total > 0 ? Math.round((safe / total) * 100) : 100;

  function share(data: any) {
    const text = `🛡️ *Reporte de Conductas HSE*\n\n📅 Fecha: ${new Date(data.date).toLocaleDateString()}\n👤 Inspector: ${data.context.inspector}\n📍 Ubicación: ${data.context.sitio} - ${data.context.area}\n\n✅ Seguros: ${data.safe}\n⚠️ Riesgos: ${data.risk}\n📊 Cumplimiento: ${data.pct}%\n\n_Generado por EHS Audit Pro (MABE-CORDOBA-)_`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  if (phase === "result") {
    const c = pctColor(pct);
    return (
      <div style={S.screen}>
        <button style={{ ...S.btn, ...S.sm, width: "auto", marginBottom: 14 }} onClick={() => setPhase("inspect")}>← Volver</button>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ width: 120, height: 120, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", margin: "0 auto 14px", border: `4px solid ${c}` }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: c }}>{pct}%</div>
            <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>Seguro</div>
          </div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>Auditoría de Conductas</div>
        </div>
        <div style={S.statRow}>
          <div style={S.statBox}><div style={{ fontSize: 22, fontWeight: 700, color: "#10b981" }}>{safe}</div><div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>Seguros</div></div>
          <div style={S.statBox}><div style={{ fontSize: 22, fontWeight: 700, color: "#ef4444" }}>{risk}</div><div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>Riesgos</div></div>
          <div style={S.statBox}><div style={{ fontSize: 22, fontWeight: 700, color: "#0ea5e9" }}>{total}</div><div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>Total</div></div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...S.btn, flex: 1 }} onClick={() => share({ date: new Date().toISOString(), context, safe, risk, pct })}>📤 Compartir</button>
          <button style={{ ...S.btn, ...S.btnP, flex: 1 }} onClick={() => onSave({ id: uid(), type: "conducta", date: new Date().toISOString(), results, notes, pct, safe, risk, total, context })}>💾 Guardar</button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.screen}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Conductas</div>
        <button style={{ ...S.btn, ...S.sm, width: "auto" }} onClick={onCancel}>Cancelar</button>
      </div>
      
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", marginBottom: 4 }}>
          <span>Progreso de observación</span>
          <span>{progress}%</span>
        </div>
        <div style={S.xpBar}><div style={{ ...S.xpFill, width: `${progress}%` }} /></div>
      </div>
      
      {cats.map((cat: any) => (
        <div key={cat} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#0ea5e9", marginBottom: 8, letterSpacing: "0.05em", paddingLeft: 4 }}>{cat}</div>
          <div style={{ display: "grid", gap: 8 }}>
            {conductas.filter((c: any) => c.cat === cat).map((c: any) => (
              <div key={c.id} style={{ ...S.card, padding: 12, marginBottom: 0, borderWidth: 1.5, borderStyle: "solid", borderColor: results[c.id] === "R" ? "#ef4444" : "var(--color-border-tertiary)" }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>{c.t}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button 
                    onClick={() => setResults({ ...results, [c.id]: "S" })}
                    style={{ flex: 1, padding: "8px", borderRadius: 6, borderWidth: 1.5, borderStyle: "solid", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                      background: results[c.id] === "S" ? "#10b981" : "transparent",
                      borderColor: results[c.id] === "S" ? "#10b981" : "var(--color-border-secondary)",
                      color: results[c.id] === "S" ? "#fff" : "var(--color-text-primary)"
                    }}
                  >Seguro</button>
                  <button 
                    onClick={() => setResults({ ...results, [c.id]: "R" })}
                    style={{ flex: 1, padding: "8px", borderRadius: 6, borderWidth: 1.5, borderStyle: "solid", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                      background: results[c.id] === "R" ? "#ef4444" : "transparent",
                      borderColor: results[c.id] === "R" ? "#ef4444" : "var(--color-border-secondary)",
                      color: results[c.id] === "R" ? "#fff" : "var(--color-text-primary)"
                    }}
                  >Riesgo</button>
                </div>
                {results[c.id] === "R" && (
                  <input 
                    style={{ ...S.input, marginTop: 10, marginBottom: 0, fontSize: 12, padding: "8px 10px", background: "#fef2f2" }} 
                    placeholder="⚠️ Describí el riesgo observado..." 
                    value={notes[c.id] || ""} 
                    onChange={e => setNotes({ ...notes, [c.id]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <button 
        style={{ ...S.btn, ...S.btnP, marginTop: 10, opacity: answered > 0 ? 1 : 0.4 }} 
        disabled={answered === 0}
        onClick={() => setPhase("result")}
      >
        Finalizar Observación ({answered})
      </button>
    </div>
  );
}

function InspectionFlow({ std, onSave, onCancel }: any) {
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState("inspect");
  const [aiText, setAiText] = useState("");
  const [aiLoad, setAiLoad] = useState(false);

  const items = std.items, item = items[idx];
  const progress = Math.round((idx / items.length) * 100);
  const score = calcScore(scores);
  const canFinish = Object.keys(scores).length === items.length;
  const lvColor: Record<string, any> = { I: { bg: "#e0f2fe", color: "#0369a1" }, A: { bg: "#fef3c7", color: "#92400e" }, E: { bg: "#fce7f3", color: "#9d174d" } };
  const lvLabel: Record<string, string> = { I: "Ingeniería", A: "Administrativo", E: "EPP" };

  async function getAI() {
    setAiLoad(true);
    const devs = items.filter((i: any) => scores[i.id] > 0).map((i: any) => `${i.t} (desvío ${scores[i.id]})`).join("\n");
    const recs = await getEHSRecommendations(std.titulo, score.pct, devs);
    setAiText(recs);
    setAiLoad(false);
  }

  function share(data: any) {
    const text = `🛡️ *Reporte de Inspección HSE*\n\n📋 Estándar: ${std.titulo}\n👤 Inspector: ${std.context.inspector}\n📍 Ubicación: ${std.context.sitio}\n\n📊 Cumplimiento: ${data.pct}%\n⚠️ Riesgo IPER: ${data.iper}\n\n_Generado por EHS Audit Pro (MABE-CORDOBA-)_`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  if (phase === "result") {
    const c = pctColor(score.pct);
    return (
      <div style={S.screen}>
        <button style={{ ...S.btn, ...S.sm, width: "auto", marginBottom: 14 }} onClick={() => setPhase("inspect")}>← Volver</button>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ width: 120, height: 120, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", margin: "0 auto 14px", border: `4px solid ${c}` }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: c }}>{score.pct}%</div>
            <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>Cumplimiento</div>
          </div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{std.titulo}</div>
          <span style={{ fontSize: 12, padding: "4px 14px", borderRadius: 20, background: c + "22", color: c }}>IPER: {score.iper}</span>
        </div>
        <div style={S.statRow}>
          {[[ `${score.pct}%`, "Cumplimiento", c ], [ score.total, "Desvíos", "var(--color-text-primary)" ], [ score.count, "Ítems", "#0ea5e9" ]].map(([v, l, co]: any) => (
            <div key={l} style={S.statBox}><div style={{ fontSize: 22, fontWeight: 700, color: co }}>{v}</div><div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>{l}</div></div>
          ))}
        </div>
        {aiText && <div style={{ background: "var(--color-background-secondary)", border: "1px solid var(--color-border-tertiary)", borderRadius: 10, padding: 12, fontSize: 12, lineHeight: 1.7, marginBottom: 14 }}><div style={{ fontWeight: 600, fontSize: 11, color: "var(--color-text-tertiary)", marginBottom: 6 }}>Recomendaciones IA</div>{aiText}</div>}
        <div style={{ display: "flex", gap: 8 }}>
          {!aiText && <button style={{ ...S.btn, flex: 1, opacity: aiLoad ? 0.6 : 1 }} onClick={getAI} disabled={aiLoad}>{aiLoad ? "⟳ Analizando…" : "🤖 Rec. IA"}</button>}
          <button style={{ ...S.btn, flex: 1 }} onClick={() => share(score)}>📤 Compartir</button>
          <button style={{ ...S.btn, ...S.btnP, flex: 1 }} onClick={() => onSave({ id: uid(), stdId: std.id, date: new Date().toISOString(), scores, notes, pct: score.pct, total: score.total, max: score.max, count: score.count, iper: score.iper, ai: aiText, context: std.context })}>💾 Guardar</button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.screen}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#0ea5e9", textTransform: "uppercase" }}>{std.titulo}</div>
        <button style={{ ...S.btn, ...S.sm, width: "auto" }} onClick={onCancel}>Salir</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", marginBottom: 4 }}>
          <span>Ítem {idx + 1} de {items.length}</span>
          <span>{progress}%</span>
        </div>
        <div style={S.xpBar}><div style={{ ...S.xpFill, width: `${progress}%` }} /></div>
      </div>

      <div style={{ ...S.card, padding: 20, marginBottom: 16, borderWidth: 2, borderStyle: "solid", borderColor: scores[item.id] > 0 ? "#ef4444" : "var(--color-border-tertiary)" }}>
        <div style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 4, display: "inline-block", marginBottom: 8, ...(lvColor[item.n] || { bg: "#f1f5f9", color: "#475569" }) }}>{lvLabel[item.n] || item.n}</div>
        <p style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.5, marginBottom: 20 }}>{item.t}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[ [0, "0", "#10b981"], [1, "1", "#f59e0b"], [2, "2", "#f97316"], [3, "3", "#ef4444"] ].map(([v, l, c]: any) => {
            const sel = scores[item.id] === v;
            return (
              <button key={v} onClick={() => setScores(p => ({ ...p, [item.id]: v }))} style={{ padding: "12px", borderRadius: 10, borderWidth: 2, borderStyle: "solid", fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "all .2s",
                background: sel ? c : "transparent",
                borderColor: sel ? c : "var(--color-border-secondary)",
                color: sel ? "#fff" : "var(--color-text-primary)"
              }}>{l}</button>
            );
          })}
        </div>
      </div>

      {scores[item.id] > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", marginBottom: 6, textTransform: "uppercase" }}>Observación del Desvío</div>
          <textarea style={{ ...S.input, height: 80, padding: 12, fontSize: 13, background: "#fef2f2" }} placeholder="Describí el hallazgo..." value={notes[item.id] || ""} onChange={e => setNotes(p => ({ ...p, [item.id]: e.target.value }))} />
        </div>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <button style={{ ...S.btn, flex: 1, opacity: idx === 0 ? 0.3 : 1 }} disabled={idx === 0} onClick={() => setIdx(i => i - 1)}>Anterior</button>
        <button style={{ ...S.btn, ...S.btnP, flex: 1, opacity: scores[item.id] === undefined ? 0.5 : 1 }} disabled={scores[item.id] === undefined} onClick={() => idx < items.length - 1 ? setIdx(i => i + 1) : setPhase("result")}>
          {idx < items.length - 1 ? "Siguiente" : "Ver Resultados"}
        </button>
      </div>
    </div>
  );
}

function HistoryScreen({ history, standards }: any) {
  if (!history.length) return <div style={{ ...S.screen, textAlign: "center" }}><div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Historial</div><div style={{ fontSize: 48, margin: "40px 0" }}>📋</div><p style={{ color: "var(--color-text-tertiary)" }}>Sin inspecciones aún</p></div>;
  return (
    <div style={S.screen}>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Historial</div>
      <div style={{ fontSize: 13, color: "var(--color-text-tertiary)", marginBottom: 14 }}>{history.length} registros encontrados</div>
      {[...history].reverse().map((i: any) => {
        const isCond = i.type === "conducta";
        const std = !isCond ? (standards.find((s: any) => s.id === i.stdId) || { titulo: i.stdId, cat: "instalaciones" }) : null;
        const cc = isCond ? { color: "#10b981", label: "Conducta", icon: "🧠" } : (CATS[std.cat] || { color: "#64748b", label: std.cat, icon: "📋" });
        
        return (
          <div key={i.id} style={{ ...S.card, display: "flex", alignItems: "center", gap: 12, padding: 12, marginBottom: 8 }}>
            <div style={{ width: 46, height: 46, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0, background: pctColor(i.pct) + "22", color: pctColor(i.pct) }}>{i.pct}%</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{isCond ? "Auditoría de Conductas" : std.titulo}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 3, flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, color: cc.color, background: cc.color + "22", padding: "2px 8px", borderRadius: 10 }}>{cc.label}</span>
                <span style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>{new Date(i.date).toLocaleDateString("es-AR")}</span>
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600 }}>{isCond ? `${i.safe}S / ${i.risk}R` : i.iper}</div>
              <div style={{ fontSize: 9, color: "var(--color-text-tertiary)" }}>{i.context?.udn || ""}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


function SettingsScreen({ state, standards, syncStatus, lastSync, onRefresh, onChange, onRunWizard }: any) {
  const [seedSt, setSeedSt] = useState<string | null>(null);
  const [seedCondSt, setSeedCondSt] = useState<string | null>(null);
  const [seedPlanSt, setSeedPlanSt] = useState<string | null>(null);

  async function seed() {
    if (!state.config.sheetsUrl) return;
    setSeedSt("loading");
    try {
      const r = await fetch(state.config.sheetsUrl, { method: "POST", body: JSON.stringify({ action: "seed", standards: STDS_BUILTIN }) });
      const d = await r.json();
      setSeedSt(d.ok ? "ok" : "error");
      if (d.ok) setTimeout(() => setSeedSt(null), 3000);
    } catch { setSeedSt("error") }
  }

  async function seedConductas() {
    if (!state.config.sheetsUrl) return;
    setSeedCondSt("loading");
    try {
      const r = await fetch(state.config.sheetsUrl, { method: "POST", body: JSON.stringify({ action: "seed_conductas", conductas: CONDUCTAS_BUILTIN }) });
      const d = await r.json();
      setSeedCondSt(d.ok ? "ok" : "error");
      if (d.ok) setTimeout(() => setSeedCondSt(null), 3000);
    } catch { setSeedCondSt("error") }
  }

  async function seedPlan() {
    if (!state.config.sheetsUrl) return;
    setSeedPlanSt("loading");
    try {
      const r = await fetch(state.config.sheetsUrl, { method: "POST", body: JSON.stringify({ action: "seed_plan" }) });
      const d = await r.json();
      setSeedPlanSt(d.ok ? "ok" : "error");
      if (d.ok) setTimeout(() => setSeedPlanSt(null), 3000);
    } catch { setSeedPlanSt("error") }
  }

  return (
    <div style={S.screen}>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Configuración</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-tertiary)", marginBottom: 8 }}>Google Sheets</div>
      {state.config.sheetsUrl ? (
        <>
          <SyncBanner status={syncStatus} lastSync={lastSync} onRefresh={onRefresh} count={standards.length} />
          <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginBottom: 10, wordBreak: "break-all", background: "var(--color-background-secondary)", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--color-border-tertiary)" }}>{state.config.sheetsUrl.slice(0, 65)}…</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <button 
              style={{ ...S.btn, flex: 1, opacity: syncStatus === "loading" ? 0.6 : 1 }} 
              onClick={onRefresh}
              disabled={syncStatus === "loading"}
            >
              {syncStatus === "loading" ? "⏳ Sincronizando..." : "⟳ Sincronizar Todo"}
            </button>
            <button style={{ ...S.btn, flex: 1 }} onClick={onRunWizard}>🔄 Reconfigurar</button>
          </div>
          
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Mantenimiento de Hojas</div>
          
          <div style={{ ...S.card, padding: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginBottom: 8 }}>Estándares HSE (19 integrados):</div>
            {!seedSt && <button style={{ ...S.btn, fontSize: 12, padding: "8px 12px" }} onClick={seed}>🌱 Inicializar Estándares</button>}
            {seedSt === "loading" && <Alert type="warn" text="⏳ Enviando estándares…" />}
            {seedSt === "ok" && <Alert type="ok" text="✅ Estándares enviados." />}
            {seedSt === "error" && <Alert type="err" text="❌ Error al enviar." />}
          </div>

          <div style={{ ...S.card, padding: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginBottom: 8 }}>Grilla de Conductas (BBS):</div>
            <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginBottom: 8 }}>Se guardará en la hoja <strong>"Conductas"</strong>. Configuración en <strong>"Conductas_Config"</strong>.</div>
            {!seedCondSt && <button style={{ ...S.btn, fontSize: 12, padding: "8px 12px" }} onClick={seedConductas}>🧠 Inicializar Conductas</button>}
            {seedCondSt === "loading" && <Alert type="warn" text="⏳ Enviando conductas…" />}
            {seedCondSt === "ok" && <Alert type="ok" text="✅ Conductas enviadas." />}
            {seedCondSt === "error" && <Alert type="err" text="❌ Error al enviar." />}
          </div>

          <div style={{ ...S.card, padding: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginBottom: 8 }}>Plan Semanal de Inspección:</div>
            <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginBottom: 8 }}>Se leerá de la hoja <strong>"Plan"</strong>.</div>
            {!seedPlanSt && <button style={{ ...S.btn, fontSize: 12, padding: "8px 12px" }} onClick={seedPlan}>📅 Inicializar Hoja de Plan</button>}
            {seedPlanSt === "loading" && <Alert type="warn" text="⏳ Creando hoja de plan…" />}
            {seedPlanSt === "ok" && <Alert type="ok" text="✅ Hoja de Plan creada." />}
            {seedPlanSt === "error" && <Alert type="err" text="❌ Error al crear." />}
          </div>
        </>
      ) : <button style={{ ...S.btn, ...S.btnP }} onClick={onRunWizard}>⚙ Configurar Google Sheets</button>}
      <div style={S.sep} />
      <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", lineHeight: 1.6, background: "var(--color-background-secondary)", padding: "12px 14px", borderRadius: 8, border: "1px solid var(--color-border-tertiary)" }}>
        <strong>Modo offline:</strong> la app usa los datos de la última sincronización exitosa. La actualización es automática al iniciar y cada 5 minutos.
      </div>
    </div>
  );
}

const DEFAULT = { 
  user: { lastDate: null }, 
  history: [], 
  standards: null, 
  conductas: null, 
  plan: null, 
  config: { 
    sheetsUrl: "https://script.google.com/macros/s/AKfycbweT1Bd_YhBbVMl4JVf5DsHTF8nLb3yOJej-qV9Dcd-3uQIerDfURI-RHQmfasTsnTsBA/exec", 
    wizardDone: false, 
    lastSync: null 
  } 
};

export default function App() {
  const [state, setState] = useState(DEFAULT);
  const [tab, setTab] = useState("home");
  const [activeStd, setActiveStd] = useState<any>(null);
  const [activeCond, setActiveCond] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [syncStatus, setSyncStatus] = useState("idle");
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [context, setContext] = useState({ inspector: "", sitio: "", udn: "", area: "", puesto: "", estacion: "" });

  useEffect(() => {
    loadData().then(d => {
      if (d) { 
        // Si el usuario ya tiene datos pero la URL está vacía, usamos la nueva por defecto
        if (!d.config?.sheetsUrl) {
          d.config.sheetsUrl = DEFAULT.config.sheetsUrl;
        }
        setState(d); 
        setLastSync(d.config?.lastSync || null) 
      }
      else setShowWizard(true);
      setLoaded(true);
    });
  }, []);

  useEffect(() => { if (loaded) saveData(state) }, [state, loaded]);

  const refreshStandards = useCallback(async (url?: string) => {
    const u = url || state.config.sheetsUrl;
    if (!u || !u.startsWith("http")) {
      console.warn("Sync: URL no configurada o inválida");
      setSyncStatus("offline");
      return;
    }
    
    setSyncStatus("loading");
    console.log("Sync iniciado:", u);

    try {
      const sep = u.includes("?") ? "&" : "?";
      const [rStd, rCond, rPlan, rHist] = await Promise.all([
        fetch(`${u}${sep}action=standards`).then(r => r.json()).catch(err => { console.error("Sync Standards Error:", err); return { ok: false }; }),
        fetch(`${u}${sep}action=conductas`).then(r => r.json()).catch(err => { console.error("Sync Conductas Error:", err); return { ok: false }; }),
        fetch(`${u}${sep}action=plan`).then(r => r.json()).catch(err => { console.error("Sync Plan Error:", err); return { ok: false }; }),
        fetch(`${u}${sep}action=sync_history`).then(r => r.json()).catch(err => { console.error("Sync History Error:", err); return { ok: false }; })
      ]);
      
      const anyOk = rStd.ok || rCond.ok || rPlan.ok || rHist.ok;
      console.log("Resultados Sync:", { standards: rStd.ok, conductas: rCond.ok, plan: rPlan.ok, history: rHist.ok });

      if (anyOk) {
        const ts = new Date().toISOString();
        setLastSync(ts);
        setSyncStatus("ok");
        
        setState(s => { 
          let mergedHistory = s.history;
          if (rHist.ok && rHist.history) {
            const serverIds = new Set(rHist.history.map((h: any) => h.id));
            const localOnly = s.history.filter((h: any) => !serverIds.has(h.id));
            mergedHistory = [...rHist.history, ...localOnly]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 100);
          }

          const ns = { 
            ...s, 
            standards: rStd.ok ? rStd.standards : s.standards,
            conductas: rCond.ok ? rCond.conductas : s.conductas,
            plan: rPlan.ok ? rPlan.plan : s.plan,
            history: mergedHistory,
            config: { ...s.config, lastSync: ts } 
          }; 
          saveData(ns); 
          return ns;
        });
      } else {
        console.warn("Sync: Todas las acciones fallaron.");
        setSyncStatus(state.standards ? "offline" : "error");
      }
    } catch (err) {
      console.error("Error Crítico de Sync:", err);
      setSyncStatus(state.standards ? "offline" : "error");
    }
  }, [state.config.sheetsUrl, state.standards, state.conductas, state.plan]);

  useEffect(() => {
    if (!loaded) return;
    if (state.config.sheetsUrl) {
      refreshStandards(state.config.sheetsUrl);
      const id = setInterval(() => refreshStandards(state.config.sheetsUrl), 5 * 60 * 1000);
      return () => clearInterval(id);
    } else setSyncStatus("offline");
  }, [loaded, state.config.sheetsUrl, refreshStandards]);

  const standards = state.standards?.length ? state.standards : STDS_BUILTIN;
  const conductas = state.conductas?.length ? state.conductas : CONDUCTAS_BUILTIN;
  function update(ns: any) { setState(ns); saveData(ns) }

  function wizardDone(url: string | null) {
    setShowWizard(false);
    const ns = { ...state, config: { ...state.config, sheetsUrl: url || "", wizardDone: true } };
    update(ns);
    if (url) refreshStandards(url);
    setTab("home");
  }

  function handleSave(inspection: any) {
    const std = inspection.type === "conducta" 
      ? { titulo: "Auditoría de Conductas", cat: "conducta" }
      : standards.find((s: any) => s.id === inspection.stdId) || { titulo: inspection.stdId, cat: "instalaciones" };
    
    const cc = CATS[std.cat] || { label: std.cat || "Conducta" };
    
    // Actualización optimista del estado local
    setState(s => {
      const newHistory = [inspection, ...s.history].slice(0, 100);
      const ns = { ...s, history: newHistory };
      saveData(ns);
      return ns;
    });

    // Envío asíncrono a la nube
    if (state.config.sheetsUrl) {
      // Unificar observaciones en una sola cadena
      const obsUnificadas = Object.values(inspection.notes || {})
        .filter(v => typeof v === "string" && v.trim() !== "")
        .join(" | ");

      const body = inspection.type === "conducta"
        ? { 
            ...inspection, 
            inspector: inspection.context.inspector, 
            sitio: inspection.context.sitio, 
            udn: inspection.context.udn, 
            area: inspection.context.area, 
            puesto: inspection.context.puesto, 
            estacion: inspection.context.estacion,
            observaciones: obsUnificadas,
            detalle: JSON.stringify(inspection.results)
          }
        : { 
            ...inspection, 
            titulo: std.titulo, 
            cat: cc.label, 
            inspector: inspection.context.inspector, 
            sitio: inspection.context.sitio, 
            udn: inspection.context.udn, 
            area: inspection.context.area, 
            puesto: inspection.context.puesto, 
            estacion: inspection.context.estacion,
            observaciones: obsUnificadas,
            qDesvios: Object.values(inspection.scores || {}).filter(v => (v as number) > 0).length
          };
      
      fetch(state.config.sheetsUrl, { method: "POST", body: JSON.stringify(body) })
        .then(() => refreshStandards()) // Sincronizar de nuevo para confirmar
        .catch(() => { });
    }

    setActiveStd(null); setActiveCond(null); setTab("home");
  }

  const NAV = [
    { id: "home", label: "Inicio", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 22, height: 22 }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
    { id: "inspect", label: "Estándares", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 22, height: 22 }}><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" /></svg> },
    { id: "conductas", label: "Conductas", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 22, height: 22 }}><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /><path d="M12 16v.01" /></svg> },
    { id: "history", label: "Historial", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 22, height: 22 }}><polyline points="12 8 12 12 14 14" /><path d="M3.05 11a9 9 0 1 0 .5-4H1" /><polyline points="1 3 1 7 5 7" /></svg> },
    { id: "settings", label: "Config", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 22, height: 22 }}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg> },
  ];

  if (!loaded) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontSize: 48 }}>🛡</div>;
  if (showWizard) return <div style={S.app}><SetupWizard onDone={wizardDone} /></div>;

  let content;
  if (activeStd) content = <InspectionFlow std={activeStd} onSave={handleSave} onCancel={() => setActiveStd(null)} />;
  else if (activeCond) content = <ConductaFlow conductas={conductas} context={activeCond} onSave={handleSave} onCancel={() => setActiveCond(null)} />;
  else if (tab === "home") content = <Dashboard state={state} standards={standards} syncStatus={syncStatus} lastSync={lastSync} onStart={() => setTab("inspect")} onRefresh={() => refreshStandards()} />;
  else if (tab === "inspect") content = <InspectScreen standards={standards} conductas={conductas} syncStatus={syncStatus} lastSync={lastSync} onRefresh={() => refreshStandards()} onSelect={(s: any) => setActiveStd(s)} onSelectConducta={(ctx: any) => setActiveCond(ctx)} context={context} setContext={setContext} forceType="standards" />;
  else if (tab === "conductas") content = <InspectScreen standards={standards} conductas={conductas} syncStatus={syncStatus} lastSync={lastSync} onRefresh={() => refreshStandards()} onSelect={(s: any) => setActiveStd(s)} onSelectConducta={(ctx: any) => setActiveCond(ctx)} context={context} setContext={setContext} forceType="conductas" />;
  else if (tab === "history") content = <HistoryScreen history={state.history} standards={standards} />;
  else if (tab === "settings") content = <SettingsScreen state={state} standards={standards} syncStatus={syncStatus} lastSync={lastSync} onRefresh={() => refreshStandards()} onChange={update} onRunWizard={() => setShowWizard(true)} />;

  return (
    <div style={S.app}>
      <div style={{ flex: 1, overflow: "hidden" }}>{content}</div>
      {!activeStd && !activeCond && (
        <div style={S.nav}>
          {NAV.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ ...S.navBtn, color: tab === t.id ? "#0ea5e9" : "var(--color-text-tertiary)" }}>{t.svg}{t.label}</button>)}
        </div>
      )}
    </div>
  );
}

'use client'

import { useEffect, useState, useRef } from 'react'
import { ArrowRight, Star, Check, Brain, Calendar, Zap, Search } from 'lucide-react'

const CALENDLY = 'https://calendly.com/victoria-ashford/demo'

const KEYFRAMES = `
@keyframes fadeUp    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
@keyframes floatA    { 0%,100%{transform:translateY(0px)}   50%{transform:translateY(-9px)} }
@keyframes floatB    { 0%,100%{transform:translateY(-6px)}  50%{transform:translateY(6px)}  }
@keyframes floatC    { 0%,100%{transform:translateY(-3px)}  50%{transform:translateY(8px)}  }
@keyframes floatD    { 0%,100%{transform:translateY(0px)}   50%{transform:translateY(-7px)} }
@keyframes blinkCursor { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes pulseGlow { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.55;transform:scale(0.82)} }
@keyframes spinIcon  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes slideIn   { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
@keyframes ripple    { 0%{transform:scale(0.8);opacity:0.7} 100%{transform:scale(2.2);opacity:0} }
@keyframes barGrow   { from{height:0} to{height:var(--h)} }
@keyframes countUp   { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
`

/* ── Utility ── */
const S: React.CSSProperties = { fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }

/* ════════════════════════════════════════════════════════════════
   CARD 1 — Pre-Meeting Brief
   Animates: rows reveal one-by-one, then a "Ready" badge pulses
════════════════════════════════════════════════════════════════ */
function BriefCard({ show }: { show: boolean }) {
  const [rows, setRows] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!show) return
    setRows(0); setReady(false)
    const ids: ReturnType<typeof setTimeout>[] = []
    ids.push(setTimeout(() => setRows(1), 400))
    ids.push(setTimeout(() => setRows(2), 900))
    ids.push(setTimeout(() => setRows(3), 1400))
    ids.push(setTimeout(() => setReady(true), 1900))
    return () => ids.forEach(clearTimeout)
  }, [show])

  const items = [
    { label: 'Budget',   value: '$48K approved by CFO', icon: '💰' },
    { label: 'Risk',     value: 'Competitor quoted $40K', icon: '⚠️' },
    { label: 'Action',   value: 'Send ROI case study today', icon: '✅' },
  ]

  return (
    <div style={{
      ...S, background: '#fff', borderRadius: 16, padding: '16px 18px', width: 264,
      border: '1px solid #E2E8F0',
      boxShadow: '0 20px 60px rgba(15,23,42,0.15), 0 4px 12px rgba(15,23,42,0.07)',
      opacity: show ? 1 : 0, transition: 'opacity 0.5s ease',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 13 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10, flexShrink: 0,
          background: 'linear-gradient(135deg,#1D4ED8,#7C3AED)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Calendar style={{ width: 15, height: 15, color: '#fff' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>Pre-meeting brief</div>
          <div style={{ fontSize: 10.5, color: '#64748B' }}>Alex Morgan · Acme Corp · in 47 min</div>
        </div>
        <div style={{
          fontSize: 9.5, fontWeight: 700,
          color: ready ? '#059669' : '#94A3B8',
          background: ready ? '#DCFCE7' : '#F1F5F9',
          padding: '3px 8px', borderRadius: 6,
          transition: 'all 0.4s ease',
        }}>
          {ready ? 'Ready ✓' : 'Loading…'}
        </div>
      </div>

      {/* Rows */}
      {items.map((item, i) => (
        <div key={item.label} style={{
          display: 'flex', gap: 9, alignItems: 'flex-start',
          padding: '7px 10px', borderRadius: 9, marginBottom: 5,
          background: i < rows ? '#F8FAFF' : '#FAFAFA',
          border: `1px solid ${i < rows ? '#E0EAFF' : '#F1F5F9'}`,
          opacity: i < rows ? 1 : 0.22,
          transform: i < rows ? 'translateY(0)' : 'translateY(5px)',
          transition: 'all 0.45s ease',
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', minWidth: 44, paddingTop: 1 }}>{item.label}</span>
          <span style={{ fontSize: 11, color: '#334155', lineHeight: 1.45 }}>{item.value}</span>
        </div>
      ))}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   CARD 2 — Live Transcript (typewriter with waveform)
════════════════════════════════════════════════════════════════ */
function TranscriptCard({ show }: { show: boolean }) {
  const TEXT = "The 8K delta vs Acme's competitor is manageable — if we show concrete ROI. Legal review kicks off March 25, so we need everything signed before Q1 closes."
  const [chars, setChars] = useState(0)
  const [wavePhase, setWavePhase] = useState(0)
  const rafRef = useRef<number>()

  useEffect(() => {
    if (!show) return
    setChars(0)
    let idx = 0
    const id = setInterval(() => {
      idx += 3
      if (idx >= TEXT.length) { clearInterval(id); idx = TEXT.length }
      setChars(idx)
    }, 35)

    let phase = 0
    const tick = () => {
      phase += 0.08
      setWavePhase(phase)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      clearInterval(id)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [show])

  const wave = Array.from({ length: 24 }, (_, i) =>
    4 + Math.abs(Math.sin(wavePhase + i * 0.55)) * (chars > 0 ? 10 : 2)
  )

  return (
    <div style={{
      ...S, background: '#fff', borderRadius: 16, padding: '14px 16px', width: 252,
      border: '1px solid #E2E8F0',
      boxShadow: '0 20px 60px rgba(15,23,42,0.15), 0 4px 12px rgba(15,23,42,0.07)',
      opacity: show ? 1 : 0, transition: 'opacity 0.5s ease 0.1s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ position: 'relative', width: 10, height: 10, flexShrink: 0 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444', animation: 'pulseGlow 1.4s infinite' }} />
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'rgba(239,68,68,0.4)', animation: 'ripple 1.4s infinite',
          }} />
        </div>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: '#EF4444' }}>Recording · 45:12</span>
        {/* Waveform */}
        <div style={{ display: 'flex', gap: 1.5, alignItems: 'center', marginLeft: 'auto', height: 20 }}>
          {wave.map((h, i) => (
            <div key={i} style={{
              width: 2.5, borderRadius: 2, background: '#EF4444',
              height: h, opacity: 0.35 + (i % 4) * 0.12,
              transition: 'height 0.08s ease',
            }} />
          ))}
        </div>
      </div>

      <div style={{
        background: '#FFF8F8', borderRadius: 9, padding: '9px 11px',
        fontSize: 11, color: '#334155', lineHeight: 1.65, minHeight: 62,
      }}>
        <span style={{ fontWeight: 700, color: '#1D4ED8' }}>Alex: </span>
        {TEXT.slice(0, chars)}
        {chars < TEXT.length && (
          <span style={{
            display: 'inline-block', width: 1.5, height: 12,
            background: '#2563EB', marginLeft: 1, verticalAlign: 'text-bottom',
            animation: 'blinkCursor 0.7s infinite',
          }} />
        )}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   CARD 3 — CRM Sync (progress then checkmarks appear)
════════════════════════════════════════════════════════════════ */
function CRMCard({ show }: { show: boolean }) {
  const [progress, setProgress] = useState(0)
  const [fields, setFields] = useState(0)

  useEffect(() => {
    if (!show) return
    setProgress(0); setFields(0)
    let p = 0
    const id = setInterval(() => {
      p += 4
      if (p >= 100) { clearInterval(id); setProgress(100) } else { setProgress(p) }
    }, 28)
    const ids: ReturnType<typeof setTimeout>[] = []
    ids.push(setTimeout(() => setFields(1), 1000))
    ids.push(setTimeout(() => setFields(2), 1400))
    ids.push(setTimeout(() => setFields(3), 1800))
    return () => { clearInterval(id); ids.forEach(clearTimeout) }
  }, [show])

  const rows = [
    { field: 'Stage',      value: 'Negotiation', color: '#7C3AED', bg: '#F5F3FF' },
    { field: 'Close date', value: 'Mar 31, 2025', color: '#D97706', bg: '#FFFBEB' },
    { field: 'Deal value', value: '$48,000',      color: '#059669', bg: '#DCFCE7' },
  ]

  return (
    <div style={{
      ...S, background: '#fff', borderRadius: 16, padding: '14px 16px', width: 218,
      border: '1px solid #E2E8F0',
      boxShadow: '0 20px 60px rgba(15,23,42,0.15), 0 4px 12px rgba(15,23,42,0.07)',
      opacity: show ? 1 : 0, transition: 'opacity 0.5s ease 0.2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
        {/* Salesforce dot */}
        <div style={{ width: 20, height: 20, borderRadius: 6, background: '#00A1E0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Zap style={{ width: 11, height: 11, color: '#fff' }} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#0F172A' }}>Salesforce sync</span>
        <span style={{
          marginLeft: 'auto', fontSize: 9.5, fontWeight: 700,
          color: progress >= 100 ? '#059669' : '#2563EB',
          background: progress >= 100 ? '#DCFCE7' : '#EFF6FF',
          padding: '2px 6px', borderRadius: 5,
          transition: 'all 0.3s ease',
        }}>
          {progress >= 100 ? '✓ Done' : `${progress}%`}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: '#F1F5F9', borderRadius: 4, marginBottom: 11, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 4,
          background: progress >= 100 ? '#22C55E' : 'linear-gradient(90deg,#2563EB,#7C3AED)',
          width: `${progress}%`, transition: 'width 0.1s linear, background 0.4s ease',
        }} />
      </div>

      {rows.map((row, i) => (
        <div key={row.field} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '5px 8px', borderRadius: 7, marginBottom: 4,
          background: i < fields ? '#FAFBFF' : 'transparent',
          opacity: i < fields ? 1 : 0.3,
          transition: 'all 0.4s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {i < fields
              ? <Check style={{ width: 11, height: 11, color: '#22C55E', flexShrink: 0 }} />
              : <div style={{ width: 11, height: 11, borderRadius: '50%', border: '1.5px solid #CBD5E1', flexShrink: 0 }} />
            }
            <span style={{ fontSize: 10.5, color: '#64748B' }}>{row.field}</span>
          </div>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: row.color, background: row.bg, padding: '1px 6px', borderRadius: 5 }}>
            {row.value}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   CARD 4 — AI Search ("ask anything")
════════════════════════════════════════════════════════════════ */
function SearchCard({ show }: { show: boolean }) {
  const QUERY    = 'What did Alex say about budget?'
  const ANSWER   = 'On Feb 28 call: "$48K pre-approved by CFO James Chen. Board wants ROI justification before signing." Action: send case study.'
  const [qChars, setQChars] = useState(0)
  const [aChars, setAChars] = useState(0)
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    if (!show) return
    setQChars(0); setAChars(0); setSearching(false)
    let q = 0
    const qId = setInterval(() => {
      q += 2; if (q >= QUERY.length) { clearInterval(qId); setSearching(true) }
      setQChars(Math.min(q, QUERY.length))
    }, 55)
    const t1 = setTimeout(() => {
      setSearching(false)
      let a = 0
      const aId = setInterval(() => {
        a += 3; if (a >= ANSWER.length) clearInterval(aId)
        setAChars(Math.min(a, ANSWER.length))
      }, 28)
    }, QUERY.length * 55 + 800)
    return () => { clearInterval(qId); clearTimeout(t1) }
  }, [show])

  return (
    <div style={{
      ...S, background: '#fff', borderRadius: 16, padding: '14px 16px', width: 258,
      border: '1px solid #E2E8F0',
      boxShadow: '0 20px 60px rgba(15,23,42,0.15), 0 4px 12px rgba(15,23,42,0.07)',
      opacity: show ? 1 : 0, transition: 'opacity 0.5s ease 0.15s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 11 }}>
        <div style={{ width: 28, height: 28, borderRadius: 9, background: 'linear-gradient(135deg,#6366F1,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Brain style={{ width: 14, height: 14, color: '#fff' }} />
        </div>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: '#0F172A' }}>Ask AI about your deals</span>
      </div>

      {/* User bubble */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <div style={{
          maxWidth: '85%', background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
          borderRadius: '12px 12px 3px 12px', padding: '8px 11px',
          fontSize: 11, color: '#fff', lineHeight: 1.5,
        }}>
          {QUERY.slice(0, qChars)}
          {qChars < QUERY.length && (
            <span style={{ display: 'inline-block', width: 1.5, height: 10, background: 'rgba(255,255,255,0.7)', marginLeft: 1, verticalAlign: 'text-bottom', animation: 'blinkCursor 0.7s infinite' }} />
          )}
        </div>
      </div>

      {/* AI response or searching dots */}
      {(searching || aChars > 0) && (
        <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#6366F1,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 8, fontWeight: 700, color: '#fff' }}>AI</div>
          <div style={{
            flex: 1, background: '#F8FAFF', border: '1px solid #E0EAFF',
            borderRadius: '12px 12px 12px 3px', padding: '8px 11px',
            fontSize: 11, color: '#1E3A5F', lineHeight: 1.6,
          }}>
            {searching ? (
              <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '2px 0' }}>
                {[0,1,2].map(d => (
                  <div key={d} style={{
                    width: 6, height: 6, borderRadius: '50%', background: '#7C3AED',
                    animation: `pulseGlow 1.1s infinite ${d * 0.2}s`,
                  }} />
                ))}
              </div>
            ) : (
              <>
                {ANSWER.slice(0, aChars)}
                {aChars < ANSWER.length && (
                  <span style={{ display: 'inline-block', width: 1.5, height: 10, background: '#7C3AED', marginLeft: 1, verticalAlign: 'text-bottom', animation: 'blinkCursor 0.7s infinite' }} />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   MAIN HERO
════════════════════════════════════════════════════════════════ */
export default function Hero() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style>{KEYFRAMES}</style>
      <section style={{ background: '#080D1A', paddingTop: 96, paddingBottom: 72, overflow: 'hidden', position: 'relative' }}>

        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(37,99,235,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.055) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }} />
        {/* Glows */}
        <div style={{ position: 'absolute', top: -100, left: '12%', width: 640, height: 640, borderRadius: '50%', background: 'radial-gradient(circle,rgba(37,99,235,0.16) 0%,transparent 65%)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 80, right: '8%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 65%)', zIndex: 0, pointerEvents: 'none' }} />

        <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>

          {/* ── Headline block (centered) ── */}
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto', animation: 'fadeUp 0.65s ease both' }}>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,

              borderRadius: 100, padding: '7px 16px', marginBottom: 28,
            }}>

            </div>

            <h1 style={{
              fontSize: 'clamp(40px,5.8vw,66px)', fontWeight: 800,
              lineHeight: 1.05, letterSpacing: '-0.035em', color: '#F1F5F9', marginBottom: 22,
            }}>
              Stop losing deals to<br />
              <span style={{ background: 'linear-gradient(135deg,#60A5FA 0%,#A78BFA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                forgotten context
              </span>
            </h1>

            <p style={{ fontSize: 18.5, lineHeight: 1.68, color: '#94A3B8', maxWidth: 580, margin: '0 auto 38px' }}>
              AideMeet gives every rep a pre-meeting brief, live deal memory, and one-click CRM sync — so your team always walks in prepared and closes faster.
            </p>

            {/* Stats */}
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 48,
              marginBottom: 40, paddingBottom: 38,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              {[
                { val: '1–3h',    label: 'saved per rep / day' },
                { val: '30s',     label: 'to full deal context' },
                { val: '1-click', label: 'CRM sync after every call' },
              ].map(s => (
                <div key={s.val} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#60A5FA', letterSpacing: '-0.03em' }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
              <a
                href="https://app.aidemeet.com"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 30px', borderRadius: 12,
                  background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
                  boxShadow: '0 0 0 1px rgba(59,130,246,0.35),0 10px 28px rgba(37,99,235,0.45)',
                  color: '#fff', fontWeight: 700, fontSize: 15.5,
                  textDecoration: 'none', letterSpacing: '-0.01em',
                }}
              >
                Start 2-week Free Trial <ArrowRight style={{ width: 17, height: 17 }} />
              </a>
              <a
                href={CALENDLY}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 26px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.13)',
                  color: '#CBD5E1', fontWeight: 600, fontSize: 15.5,
                  textDecoration: 'none', letterSpacing: '-0.01em',
                }}
              >
                Book Founder Demo
              </a>
            </div>

            {/* Social proof */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <div style={{ display: 'flex' }}>
                {['#1D4ED8','#7C3AED','#059669','#D97706','#0F2D6B'].map((bg, i) => (
                  <div key={i} style={{
                    width: 27, height: 27, borderRadius: '50%', background: bg,
                    border: '2px solid #080D1A', marginLeft: i > 0 ? -9 : 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 8, fontWeight: 700, color: '#fff',
                  }}>
                    {['AM','IK','SJ','ML','VC'][i]}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 1 }}>
                {[...Array(5)].map((_, i) => <Star key={i} style={{ width: 12, height: 12, fill: '#FBBF24', color: '#FBBF24' }} />)}
              </div>
              <span style={{ fontSize: 12, color: '#64748B' }}>Trusted by sales teams at tech startups</span>
            </div>
          </div>

          {/* ── Floating cards ── */}
          <div style={{ position: 'relative', height: 380, marginTop: 68 }}>

            {/* Centre glow */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              width: 520, height: 260, borderRadius: '50%',
              background: 'radial-gradient(ellipse,rgba(37,99,235,0.14) 0%,transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Centre logo */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 10,
            }}>
              <div style={{
                width: 62, height: 62, borderRadius: 19,
                background: 'linear-gradient(135deg,#1D4ED8,#7C3AED)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 0 1px rgba(99,102,241,0.4),0 0 52px rgba(37,99,235,0.5)',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="1.7" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="1.7" strokeLinejoin="round" opacity="0.55"/>
                  <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="1.7" strokeLinejoin="round" opacity="0.82"/>
                </svg>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)',
                borderRadius: 100, padding: '5px 14px', fontSize: 11, fontWeight: 600, color: '#93C5FD',
              }}>AideMeet</div>
            </div>

            {/* Dashed connectors */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.15 }} aria-hidden>
              <line x1="28%" y1="22%" x2="50%" y2="50%" stroke="#60A5FA" strokeWidth="1" strokeDasharray="5 5"/>
              <line x1="73%" y1="14%" x2="50%" y2="50%" stroke="#A78BFA" strokeWidth="1" strokeDasharray="5 5"/>
              <line x1="24%" y1="82%" x2="50%" y2="50%" stroke="#34D399" strokeWidth="1" strokeDasharray="5 5"/>
              <line x1="74%" y1="80%" x2="50%" y2="50%" stroke="#818CF8" strokeWidth="1" strokeDasharray="5 5"/>
            </svg>

            {/* Card: Brief — top-left */}
            <div style={{ position: 'absolute', top: 0, left: '2%', animation: show ? 'floatA 5.5s ease-in-out infinite' : 'none' }}>
              <BriefCard show={show} />
            </div>

            {/* Card: CRM — top-right */}
            <div style={{ position: 'absolute', top: 18, right: '2%', animation: show ? 'floatB 5s ease-in-out infinite' : 'none' }}>
              <CRMCard show={show} />
            </div>

            {/* Card: Transcript — bottom-left */}
            <div style={{ position: 'absolute', bottom: 0, left: '13%', animation: show ? 'floatC 6.2s ease-in-out infinite' : 'none' }}>
              <TranscriptCard show={show} />
            </div>

            {/* Card: AI Search — bottom-right */}
            <div style={{ position: 'absolute', bottom: 6, right: '9%', animation: show ? 'floatD 5.8s ease-in-out infinite' : 'none' }}>
              <SearchCard show={show} />
            </div>
          </div>

          {/* Integrations strip */}
          <div style={{ textAlign: 'center', marginTop: 52 }}>
            <p style={{ fontSize: 11, color: '#374151', marginBottom: 16, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Works with your stack
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 36, flexWrap: 'wrap' }}>
              {[
                { name: 'HubSpot',     dot: '#FF5500' },
                { name: 'Salesforce',  dot: '#00A1E0' },
                { name: 'Pipedrive',   dot: '#1A73E8' },
                { name: 'Google Meet', dot: '#34A853' },
                { name: 'Zoom',        dot: '#2D8CFF' }
              ].map(t => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 7, opacity: 0.48 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.dot }} />
                  <span style={{ fontSize: 13, color: '#94A3B8', fontWeight: 500 }}>{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
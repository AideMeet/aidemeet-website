'use client'

import { useState, useEffect, useCallback } from 'react'
import { ArrowRight, Star } from 'lucide-react'

const CALENDLY = 'https://calendly.com/victoria-werner/demo'

// ── Shared data ──────────────────────────────────────────────────────

const DEALS = [
  { name: 'Irina Kovacs',   company: 'ScaleTribe',   value: '$8,400',  stage: 'Closing',     color: '#059669', bg: '#D1FAE5' },
  { name: 'Alex Morgan',    company: 'Acme Corp',     value: '$48,000', stage: 'Negotiation', color: '#7C3AED', bg: '#EDE9FE' },
  { name: 'Sarah Johnson',  company: 'TechVentures',  value: '$22,000', stage: 'Proposal',    color: '#2563EB', bg: '#DBEAFE' },
  { name: 'Michael Lee',    company: 'GlobalTech',    value: '$75,000', stage: 'Discovery',   color: '#D97706', bg: '#FEF3C7' },
]

// ── Step 0: Meeting Processed ────────────────────────────────────────

const INSIGHTS = [
  { icon: '💰', text: 'Budget $48K pre-approved by CFO James Chen' },
  { icon: '⚔️', text: 'Competitor X quoted $40K — ROI case study needed urgently' },
  { icon: '📅', text: 'Legal review window: Mar 25–27 → close before Q1 end' },
]

function StepProcess({ visible }: { visible: number }) {
  return (
    <div style={{ padding: '0 16px 16px' }}>
      {/* Processed badge */}
      <div style={{
        borderRadius: 12,
        background: 'linear-gradient(135deg,#0F2D6B,#1D4ED8)',
        padding: '14px 16px', marginBottom: 10,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ color: '#93C5FD', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              Just Processed ✓
            </div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Pricing Discussion</div>
            <div style={{ color: '#A5C3F0', fontSize: 11, marginTop: 2 }}>Alex Morgan · Acme Corp · 45 min</div>
          </div>
          <span style={{ background: '#D1FAE5', color: '#065F46', fontSize: 10, padding: '3px 8px', borderRadius: 6, fontWeight: 700 }}>✓ Ready</span>
        </div>
        {/* tiny waveform decoration */}
        <div style={{ marginTop: 10, display: 'flex', gap: 2, alignItems: 'flex-end', height: 18 }}>
          {[4,7,11,8,14,10,6,12,9,5,13,8,6,10,7,11,5,9,12,6].map((h, i) => (
            <div key={i} style={{
              flex: 1, borderRadius: 2,
              height: h, background: 'rgba(147,197,253,0.4)',
              opacity: visible > 0 ? 1 : 0,
              transition: `opacity 0.1s ease ${i * 0.02}s`,
            }} />
          ))}
        </div>
      </div>

      {/* Key Intelligence */}
      <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
        Key Intelligence
      </div>
      {INSIGHTS.map((item, i) => (
        <div key={i} style={{
          display: 'flex', gap: 8, alignItems: 'flex-start',
          padding: '8px 10px', borderRadius: 8, marginBottom: 5,
          background: '#fff', border: '1px solid #E8F0FF',
          opacity: i < visible ? 1 : 0,
          transform: i < visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          transitionDelay: `${i * 0.12}s`,
        }}>
          <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
          <span style={{ fontSize: 11.5, color: '#0F172A', lineHeight: 1.5 }}>{item.text}</span>
        </div>
      ))}

      {/* Action items */}
      <div style={{
        background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: '8px 10px', marginTop: 6,
        opacity: visible >= 3 ? 1 : 0,
        transform: visible >= 3 ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}>
        <div style={{ fontSize: 10, color: '#B45309', fontWeight: 700, marginBottom: 5 }}>⚠️ ACTION ITEMS</div>
        {['Send ROI case study to Alex (today)', 'Send updated contract PDF (Fri)'].map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: i === 0 ? 4 : 0 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, border: '2px solid #D97706', flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: '#92400E' }}>{a}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Step 1: AI Assistant Chat ────────────────────────────────────────

const CHAT_MESSAGES = [
  { from: 'user', text: 'What did Alex say about budget on our last call?' },
  { from: 'ai',   text: 'Alex confirmed budget of $48K pre-approved by CFO James Chen. He mentioned competitor X quoted $40K — the $8K gap is the main obstacle. He needs an ROI case study to justify the delta to his board by Mar 25.' },
  { from: 'user', text: 'Any previous objections I should prep for?' },
  { from: 'ai',   text: 'In 3 past calls, Alex raised: (1) implementation timeline risk, (2) integration complexity with their legacy CRM, (3) price vs competitor. He responds well to concrete data — ROI numbers closed his hesitation on timeline.' },
]

function StepChat({ msgCount }: { msgCount: number }) {
  return (
    <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>
        Ask AI about any deal
      </div>

      {CHAT_MESSAGES.slice(0, msgCount).map((msg, i) => (
        <div key={i} style={{
          display: 'flex',
          justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
          opacity: 0,
          animation: `fadeInUp 0.35s ease forwards`,
          animationDelay: `${i * 0.05}s`,
        }}>
          {msg.from === 'ai' && (
            <div style={{
              width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginRight: 6, marginTop: 2,
              background: 'linear-gradient(135deg,#1D4ED8,#7C3AED)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, color: '#fff', fontWeight: 700,
            }}>AI</div>
          )}
          <div style={{
            maxWidth: '80%',
            padding: '8px 11px',
            borderRadius: msg.from === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
            background: msg.from === 'user'
              ? 'linear-gradient(135deg,#1D4ED8,#3B82F6)'
              : '#fff',
            border: msg.from === 'ai' ? '1px solid #E8F0FF' : 'none',
            fontSize: 11,
            color: msg.from === 'user' ? '#fff' : '#0F172A',
            lineHeight: 1.5,
          }}>
            {msg.text}
          </div>
        </div>
      ))}

      {/* Typing indicator */}
      {msgCount > 0 && msgCount % 2 === 1 && msgCount < CHAT_MESSAGES.length && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg,#1D4ED8,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700 }}>AI</div>
          <div style={{ display: 'flex', gap: 3, padding: '8px 12px', background: '#fff', borderRadius: '12px 12px 12px 3px', border: '1px solid #E8F0FF' }}>
            {[0, 1, 2].map(d => (
              <div key={d} style={{ width: 5, height: 5, borderRadius: '50%', background: '#94A3B8', animation: 'pulse 1.2s infinite', animationDelay: `${d * 0.2}s` }} />
            ))}
          </div>
        </div>
      )}

      {/* Input bar */}
      <div style={{ marginTop: 4, display: 'flex', gap: 6, alignItems: 'center', background: '#F8FAFF', border: '1px solid #D1E3FF', borderRadius: 10, padding: '7px 10px' }}>
        <span style={{ fontSize: 11, color: '#94A3B8', flex: 1 }}>Ask about any deal or contact…</span>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowRight style={{ width: 10, height: 10, color: '#fff' }} />
        </div>
      </div>
    </div>
  )
}

// ── Step 2: Contact Profile ──────────────────────────────────────────

const PAST_MEETINGS = [
  { date: 'Feb 12', title: 'Discovery Call', outcome: 'Budget confirmed', color: '#059669', bg: '#D1FAE5' },
  { date: 'Feb 28', title: 'Demo + Pricing',  outcome: 'Proposal sent',   color: '#2563EB', bg: '#DBEAFE' },
  { date: 'Mar 14', title: 'Negotiation',      outcome: 'Action: ROI doc', color: '#D97706', bg: '#FEF3C7' },
]

function StepProfile({ phase }: { phase: number }) {
  return (
    <div style={{ padding: '0 16px 16px' }}>
      {/* Contact card */}
      <div style={{
        background: '#fff', border: '1px solid #D1E3FF', borderRadius: 12,
        padding: '14px', marginBottom: 10,
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.4s ease',
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#7C3AED,#1D4ED8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 0 3px #EDE9FE' }}>
            <span style={{ fontSize: 14, color: '#fff', fontWeight: 700 }}>AM</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#0F172A' }}>Alex Morgan</div>
            <div style={{ fontSize: 11, color: '#64748B' }}>VP Operations · Acme Corp</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#7C3AED' }}>$48,000</div>
            <span style={{ fontSize: 10, background: '#EDE9FE', color: '#7C3AED', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>Negotiation</span>
          </div>
        </div>

        {/* Context chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {['Budget confirmed ✓', 'Competitor: X', 'Decision: Q1', 'Decision maker 🔑'].map((chip, i) => (
            <span key={i} style={{
              fontSize: 10, padding: '3px 8px', borderRadius: 6,
              background: '#F0F6FF', color: '#2563EB', border: '1px solid #BFDBFE',
              opacity: phase >= 2 ? 1 : 0,
              transition: `opacity 0.3s ease ${0.1 + i * 0.08}s`,
            }}>
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Meeting history */}
      <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
        Meeting History
      </div>
      {PAST_MEETINGS.map((m, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, marginBottom: 5,
          background: '#fff', border: '1px solid #E8F0FF',
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(8px)',
          transition: `all 0.35s ease ${i * 0.1}s`,
        }}>
          <div style={{ width: 36, textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: 9, color: '#94A3B8' }}>{m.date}</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: '#0F172A' }}>{m.title}</div>
            <div style={{ fontSize: 10, color: '#64748B' }}>{m.outcome}</div>
          </div>
          <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: m.bg, color: m.color, fontWeight: 600, flexShrink: 0 }}>
            ✓
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Step 3: CRM Sync ─────────────────────────────────────────────────

const CRM_FIELDS = [
  { label: 'Contact',     value: 'Alex Morgan · VP Operations' },
  { label: 'Company',     value: 'Acme Corp' },
  { label: 'Deal Stage',  value: 'Negotiation',        color: '#7C3AED', bg: '#F5F3FF' },
  { label: 'Deal Value',  value: '$48,000',              color: '#059669', bg: '#ECFDF5' },
  { label: 'Objection',   value: 'Price vs Competitor X ($8K gap)' },
  { label: 'Next Action', value: 'Send ROI case study — OVERDUE ⚠️' },
]

function StepCRM({ fieldsVisible, done }: { fieldsVisible: number; done: boolean }) {
  return (
    <div style={{ padding: '0 16px 16px' }}>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 12, color: '#0F172A', marginBottom: 2 }}>Export to HubSpot CRM</div>
        <div style={{ fontSize: 11, color: '#64748B' }}>AI-extracted fields — auto-filled from call</div>
      </div>

      {done ? (
        <div style={{
          borderRadius: 12, background: 'linear-gradient(135deg,#ECFDF5,#D1FAE5)',
          border: '1px solid #A7F3D0', padding: '20px 16px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
          <div style={{ fontWeight: 700, color: '#065F46', fontSize: 14, marginBottom: 4 }}>Synced to HubSpot</div>
          <div style={{ fontSize: 11, color: '#059669' }}>6 fields updated · Contact profile enriched · 0 manual steps</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {CRM_FIELDS.map((field, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '7px 10px', borderRadius: 8,
              background: i < fieldsVisible ? '#F8FAFF' : 'transparent',
              border: `1px solid ${i < fieldsVisible ? '#D1E3FF' : '#F1F5F9'}`,
              opacity: i < fieldsVisible ? 1 : 0.25,
              transition: 'all 0.35s ease',
              transitionDelay: `${i * 0.08}s`,
            }}>
              {i < fieldsVisible ? (
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width={8} height={8} viewBox="0 0 8 8" fill="none"><polyline points="1.5,4 3.5,6 6.5,2" stroke="#fff" strokeWidth={1.5} strokeLinecap="round"/></svg>
                </div>
              ) : (
                <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid #CBD5E1', flexShrink: 0 }} />
              )}
              <span style={{ fontSize: 10, color: '#94A3B8', width: 70, flexShrink: 0 }}>{field.label}</span>
              {i < fieldsVisible && (
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  color: field.color || '#0F172A',
                  background: field.bg,
                  padding: field.bg ? '2px 7px' : '0',
                  borderRadius: 5,
                }}>{field.value}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Step 4: Follow-up + Pipeline ─────────────────────────────────────

function StepFollowupPipeline({ emailSent }: { emailSent: boolean }) {
  return (
    <div style={{ padding: '0 16px 16px' }}>
      {/* Follow-up section */}
      {!emailSent ? (
        <>
          <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
            AI Follow-up Draft
          </div>
          <div style={{ background: '#F8FAFF', border: '1px solid #D1E3FF', borderRadius: 8, padding: '10px 12px', marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, marginBottom: 3 }}>Subject</div>
            <div style={{ fontSize: 11.5, color: '#0F172A', fontWeight: 600 }}>Follow-up: ROI Case Study — Acme Corp</div>
          </div>
          <div style={{ background: '#F8FAFF', border: '1px solid #D1E3FF', borderRadius: 8, padding: '10px 12px', marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, marginBottom: 5 }}>AI Draft</div>
            {[
              'Hi Alex,',
              'As promised — attaching the ROI case study addressing the $8K vs Competitor X gap.',
              '✓ $48,000 pricing locked for Q1 close\n✓ Legal window: Mar 25–27\n✓ Confirms 14-month payback at current usage',
              'Best, Victoria',
            ].map((line, i) => (
              <div key={i} style={{ fontSize: 11, color: '#475569', lineHeight: 1.6, marginBottom: 3 }}>{line}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{ flex: 1, padding: '8px', borderRadius: 8, background: '#F1F5F9', border: 'none', fontSize: 11, color: '#64748B', cursor: 'pointer' }}>Edit</button>
            <button style={{ flex: 2, padding: '8px', borderRadius: 8, background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)', border: 'none', fontSize: 11, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
              Send via Gmail →
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{
            borderRadius: 12, background: 'linear-gradient(135deg,#ECFDF5,#D1FAE5)',
            border: '1px solid #A7F3D0', padding: '14px 16px', textAlign: 'center', marginBottom: 10,
          }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>✉️</div>
            <div style={{ fontWeight: 700, color: '#065F46', fontSize: 13, marginBottom: 3 }}>Follow-up Sent!</div>
            <div style={{ fontSize: 11, color: '#059669' }}>Alex Morgan · via Gmail · just now</div>
          </div>

          {/* Mini pipeline */}
          <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
            Active Pipeline · $153,400
          </div>
          {DEALS.map((deal, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '7px 10px', borderRadius: 8, marginBottom: 4,
              background: '#F8FAFF', border: '1px solid #E8F0FF',
              opacity: 0, animation: `fadeInUp 0.4s ease ${i * 0.1}s forwards`,
            }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: deal.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: deal.color }}>{deal.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{deal.name}</div>
                <div style={{ fontSize: 10, color: '#94A3B8' }}>{deal.company}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#0F172A' }}>{deal.value}</div>
                <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 4, background: deal.bg, color: deal.color, fontWeight: 600 }}>{deal.stage}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

// ── Demo Panel ──────────────────────────────────────────────────────

const STEP_CONFIG = [
  { icon: '📁', label: 'Process',    duration: 4500 },
  { icon: '💬', label: 'Ask AI',     duration: 5200 },
  { icon: '👤', label: 'Profile',    duration: 4000 },
  { icon: '🔄', label: 'CRM Sync',   duration: 4200 },
  { icon: '✉️', label: 'Follow-up',  duration: 4800 },
]

const STEP_HEADERS = [
  'Meeting → Pricing Discussion',
  'AI Assistant — Deal Memory',
  'Contacts → Alex Morgan',
  'Meeting → Export to HubSpot',
  'Follow-up → Pipeline',
]

function DemoPanel() {
  const [step, setStep]                     = useState(0)
  const [progress, setProgress]             = useState(0)
  const [insightsVisible, setInsightsVisible] = useState(0)
  const [msgCount, setMsgCount]             = useState(0)
  const [profilePhase, setProfilePhase]     = useState(0)
  const [crmFieldsVisible, setCrmFieldsVisible] = useState(0)
  const [crmDone, setCrmDone]               = useState(false)
  const [emailSent, setEmailSent]           = useState(false)

  const resetStep = useCallback((s: number) => {
    setStep(s)
    setProgress(0)
    setInsightsVisible(0)
    setMsgCount(0)
    setProfilePhase(0)
    setCrmFieldsVisible(0)
    setCrmDone(false)
    setEmailSent(false)
  }, [])

  // Auto-advance progress
  useEffect(() => {
    const dur = STEP_CONFIG[step].duration
    let elapsed = 0
    const tick = 50
    const timer = setInterval(() => {
      elapsed += tick
      setProgress(Math.min((elapsed / dur) * 100, 100))
      if (elapsed >= dur) {
        clearInterval(timer)
        resetStep((step + 1) % STEP_CONFIG.length)
      }
    }, tick)
    return () => clearInterval(timer)
  }, [step, resetStep])

  // Step 0 sub-animations
  useEffect(() => {
    if (step !== 0) return
    const t1 = setTimeout(() => setInsightsVisible(1), 500)
    const t2 = setTimeout(() => setInsightsVisible(2), 950)
    const t3 = setTimeout(() => setInsightsVisible(3), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [step])

  // Step 1 sub-animations (chat)
  useEffect(() => {
    if (step !== 1) return
    const timers = [400, 1400, 2500, 3800].map((delay, i) =>
      setTimeout(() => setMsgCount(i + 1), delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [step])

  // Step 2 sub-animations (profile)
  useEffect(() => {
    if (step !== 2) return
    const t1 = setTimeout(() => setProfilePhase(1), 300)
    const t2 = setTimeout(() => setProfilePhase(2), 800)
    const t3 = setTimeout(() => setProfilePhase(3), 1200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [step])

  // Step 3 sub-animations (CRM)
  useEffect(() => {
    if (step !== 3) return
    const timers = CRM_FIELDS.map((_, i) => setTimeout(() => setCrmFieldsVisible(i + 1), 300 + i * 280))
    const doneTimer = setTimeout(() => setCrmDone(true), 300 + CRM_FIELDS.length * 280 + 400)
    return () => { timers.forEach(clearTimeout); clearTimeout(doneTimer) }
  }, [step])

  // Step 4 sub-animations (follow-up)
  useEffect(() => {
    if (step !== 4) return
    const t = setTimeout(() => setEmailSent(true), 2600)
    return () => clearTimeout(t)
  }, [step])

  return (
    <div style={{ width: '100%', maxWidth: 440, position: 'relative', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.85); }
          50%       { opacity: 1;   transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

      {/* Glow backdrop */}
      <div style={{
        position: 'absolute', inset: -20, borderRadius: 32,
        background: 'radial-gradient(ellipse at 60% 40%, rgba(99,102,241,0.18) 0%, rgba(37,99,235,0.08) 50%, transparent 80%)',
        filter: 'blur(20px)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Main card */}
      <div style={{
        position: 'relative', zIndex: 1,
        borderRadius: 18, overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(15,45,107,0.22), 0 8px 24px rgba(15,45,107,0.12)',
        border: '1px solid rgba(255,255,255,0.65)',
      }}>
        {/* Title bar */}
        <div style={{ background: '#0F172A', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#FF5F57','#FEBC2E','#28C840'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div style={{ flex: 1, background: '#1E293B', borderRadius: 5, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 10, color: '#3B82F6' }}>●</span>
            <span style={{ fontSize: 10, color: '#94A3B8' }}>aidemeet.com</span>
          </div>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 0 2px rgba(34,197,94,0.3)' }} />
        </div>

        {/* App shell */}
        <div style={{ display: 'flex', background: '#F0F6FF', minHeight: 360 }}>
          {/* Sidebar */}
          <div style={{ width: 44, background: '#fff', borderRight: '1px solid #D1E3FF', padding: '12px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: 'linear-gradient(135deg,#1D4ED8,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, boxShadow: '0 3px 8px rgba(37,99,235,0.4)' }}>
              <span style={{ fontSize: 12, color: '#fff' }}>⚡</span>
            </div>
            {['🗒️','🤖','👥','📅','✉️'].map((icon, i) => (
              <div key={i} style={{
                width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                background: step === i ? '#EFF6FF' : 'transparent',
                borderLeft: step === i ? '2px solid #2563EB' : '2px solid transparent',
                transition: 'all 0.2s',
              }}>
                {icon}
              </div>
            ))}
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: 'hidden', minWidth: 0 }}>
            {/* Content header */}
            <div style={{ background: '#fff', borderBottom: '1px solid #D1E3FF', padding: '9px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: '#0F172A' }}>
                {STEP_HEADERS[step]}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 0 2px #D1FAE5' }} />
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#1D4ED8,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 8, color: '#fff', fontWeight: 700 }}>VC</span>
                </div>
              </div>
            </div>

            {/* Step panels */}
            <div style={{ position: 'relative', minHeight: 300 }}>
              {[
                <StepProcess key={0} visible={insightsVisible} />,
                <StepChat    key={1} msgCount={msgCount} />,
                <StepProfile key={2} phase={profilePhase} />,
                <StepCRM     key={3} fieldsVisible={crmFieldsVisible} done={crmDone} />,
                <StepFollowupPipeline key={4} emailSent={emailSent} />,
              ].map((panel, i) => (
                <div key={i} style={{
                  position: 'absolute', inset: 0,
                  opacity: step === i ? 1 : 0,
                  pointerEvents: step === i ? 'auto' : 'none',
                  transition: 'opacity 0.35s ease',
                  overflowY: 'auto',
                  paddingTop: 12,
                }}>
                  {panel}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step selector & progress */}
        <div style={{ background: '#fff', borderTop: '1px solid #D1E3FF', padding: '10px 12px' }}>
          <div style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
            {STEP_CONFIG.map((s, i) => (
              <button
                key={i}
                onClick={() => resetStep(i)}
                style={{
                  flex: 1, padding: '5px 2px', borderRadius: 7, border: 'none', cursor: 'pointer',
                  background: step === i ? '#EFF6FF' : 'transparent',
                  color: step === i ? '#2563EB' : '#94A3B8',
                  fontSize: 9, fontWeight: step === i ? 700 : 500,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                  transition: 'all 0.2s',
                  outline: 'none',
                }}
              >
                <span style={{ fontSize: 13 }}>{s.icon}</span>
                <span style={{ whiteSpace: 'nowrap' }}>{s.label}</span>
              </button>
            ))}
          </div>
          <div style={{ height: 3, background: '#E8F0FF', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 2,
              background: 'linear-gradient(90deg,#1D4ED8,#7C3AED)',
              width: `${progress}%`,
              transition: 'width 0.05s linear',
            }} />
          </div>
        </div>
      </div>


    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      className="pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #F0F6FF 0%, #EBF2FF 45%, #F3F0FF 100%)' }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 520, overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', top: -100, right: -100, width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: 100, left: -150, width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)',
        }} />
      </div>

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div className="space-y-7">
            {/* Pill badge */}
            <div
              className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-4 py-1.5"
              style={{ background: 'rgba(37,99,235,0.08)', color: '#2563EB', border: '1px solid rgba(37,99,235,0.2)' }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Access opens May 18 · Limited pilot spots
            </div>

            <div className="space-y-4">
              <h1
                className="text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.05] tracking-tight"
                style={{ color: '#0F172A' }}
              >
                Your reps forget{' '}
                <span style={{
                  background: 'linear-gradient(135deg,#1D4ED8,#7C3AED)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  deal context.
                </span>
                <br />You lose revenue.
              </h1>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#475569' }}>
                AideMeet turns every sales call into{' '}
                <strong style={{ color: '#0F172A' }}>deal memory</strong>, next-step tracking,
                and pre-meeting briefs — so your team always shows up prepared and closes faster.
              </p>
            </div>

            {/* Stats row */}
            <div
              className="flex items-center gap-6 py-4"
              style={{ borderTop: '1px solid rgba(37,99,235,0.12)', borderBottom: '1px solid rgba(37,99,235,0.12)' }}
            >
              {[
                { val: '1–3h',    label: 'saved per rep/day' },
                { val: '30s',     label: 'to full deal context' },
                { val: '1-click', label: 'CRM sync' },
              ].map(s => (
                <div key={s.val} className="text-center flex-1">
                  <div className="text-xl font-bold" style={{ color: '#1D4ED8' }}>{s.val}</div>
                  <div className="text-xs" style={{ color: '#64748B' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white text-[15px] transition-all"
                style={{
                  background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
                  boxShadow: '0 6px 20px rgba(37,99,235,0.35)',
                }}
              >
                Book Founder Demo
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[15px] transition-all"
                style={{ background: '#fff', color: '#1D4ED8', border: '1.5px solid rgba(37,99,235,0.25)' }}
              >
                Get Early Access →
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['AM','IK','SJ','ML','VC'].map((initials, idx) => (
                  <div
                    key={initials}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-white"
                    style={{ background: ['#1D4ED8','#7C3AED','#059669','#D97706','#0F2D6B'][idx] }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs" style={{ color: '#64748B' }}>Trusted by sales teams at tech startups</div>
              </div>
            </div>
          </div>

          {/* ── Right: Animated Demo ── */}
          <div className="flex justify-center md:justify-end">
            <DemoPanel />
          </div>
        </div>
      </div>
    </section>
  )
}
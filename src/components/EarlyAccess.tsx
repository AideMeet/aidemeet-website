'use client'

import { useState } from 'react'
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react'

const CALENDLY = 'https://calendly.com/victoria-werner/demo'

/* ── Google Sheets helper ──────────────────────────────────────────── */
// FIX: use text/plain instead of application/json — the latter triggers a CORS preflight
// which fails with no-cors mode. text/plain is a "simple" request and goes through directly.
// Google Apps Script still parses the body as JSON regardless of Content-Type.
async function submitToSheets(data: Record<string, string>) {
  const url = process.env.NEXT_PUBLIC_EARLY_ACCESS_URL
  if (!url) {
    console.log('[EarlyAccess] No EARLY_ACCESS_URL set. Data:', data)
    return
  }
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' }, // ← was 'application/json', which blocked requests
    body: JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
      type: 'early_access',
    }),
  })
}

/* ── Styles ─────────────────────────────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.18)',
  color: '#fff',
}

// Select matches the other inputs — same translucent bg, same border
const selectStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.18)',
  color: '#E2E8F0',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
}

export default function EarlyAccess() {
  const [email, setEmail]         = useState('')
  const [teamSize, setTeamSize]   = useState('')
  const [company, setCompany]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !teamSize) return
    setLoading(true)
    setError('')
    try {
      const cleanEmail = email.trim().toLowerCase()

      // 1. Save to Google Sheets
      await submitToSheets({ email: cleanEmail, teamSize, company })

      // 2. Send email notification via Web3Forms
      const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
      if (web3Key) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `New Early Access signup — ${cleanEmail}`,
            from_name: 'AideMeet Early Access',
            replyto: cleanEmail,
            message: `Email: ${cleanEmail}\nCompany: ${company || '—'}\nTeam size: ${teamSize}\nTime: ${new Date().toISOString()}`,
          }),
        })
      }

      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  const ready = !!email && !!teamSize

  return (
    <section
      id="early-access"
      className="py-20"
      style={{ background: 'linear-gradient(160deg,#0B1730 0%,#1D3A8A 50%,#0F2D6B 100%)' }}
    >
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* ── Left copy ── */}
          <div className="text-white space-y-6">
            <div
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Pilot opens May 18, 2025
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Founder personally onboards
              <br />
              <span style={{ color: '#93C5FD' }}>your sales team.</span>
            </h2>

            <p className="text-xl leading-relaxed" style={{ color: '#A5C3F0' }}>
              This isn't a waitlist. It's a founder-led pilot — we set up AideMeet for your team,
              integrate your CRM, and guarantee your reps start closing faster in 2 weeks.
            </p>

            <div className="space-y-3">
              {[
                { icon: '🎯', text: 'We personally set up CRM integration for your team' },
                { icon: '📞', text: '2-week pilot with daily check-ins from the founder' },
                { icon: '🔒', text: 'Locked-in early pricing — never goes up for you' },
                { icon: '🛣️', text: 'Direct influence on the product roadmap' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium" style={{ color: '#BFDBFE' }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Spot counter */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-1.5">
                {['AM','IK','SJ'].map((initials, idx) => (
                  <div
                    key={initials}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2"
                    style={{ background: ['#1D4ED8','#7C3AED','#059669'][idx], borderColor: '#0F2D6B' }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-sm font-bold text-white">3 of 7 pilot spots taken</div>
                <div className="text-xs" style={{ color: '#93C5FD' }}>4 spots remaining for May pilot</div>
              </div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {submitted ? (
              /* Success state */
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)' }}
                >
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">You're in! 🎉</h3>
                <p className="text-sm mb-4" style={{ color: '#A5C3F0' }}>
                  Victoria (founder) will personally email you within 24 hours to schedule your setup call.
                </p>

                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all"
                  style={{ background: 'linear-gradient(135deg,#22C55E,#16A34A)', boxShadow: '0 6px 20px rgba(34,197,94,0.35)' }}
                >
                  Or book now via Calendly <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ) : (
              /* Form */
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-1">Book Your Pilot Spot</h3>
                  <p className="text-sm" style={{ color: '#93C5FD' }}>
                    2-week founder-led pilot · 4 spots left for May
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Work email */}
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: '#93C5FD' }}>
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={inputStyle}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: '#93C5FD' }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={inputStyle}
                    />
                  </div>

                  {/* Team size */}
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: '#93C5FD' }}>
                      Team Size *
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={teamSize}
                        onChange={e => setTeamSize(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none pr-8"
                        style={selectStyle}
                      >
                        <option value=""     style={{ background: '#1e3a6e', color: '#94A3B8' }}>Select team size</option>
                        <option value="solo" style={{ background: '#1e3a6e', color: '#E2E8F0' }}>Just me (solo rep)</option>
                        <option value="2-5"  style={{ background: '#1e3a6e', color: '#E2E8F0' }}>2–5 reps</option>
                        <option value="6-15" style={{ background: '#1e3a6e', color: '#E2E8F0' }}>6–15 reps</option>
                        <option value="15+"  style={{ background: '#1e3a6e', color: '#E2E8F0' }}>15+ reps</option>
                      </select>
                      {/* Arrow */}
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1l5 5 5-5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div
                      className="px-4 py-3 rounded-xl text-sm"
                      style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#FCA5A5' }}
                    >
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading || !ready}
                    className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                    style={{
                      background: ready ? 'linear-gradient(135deg,#22C55E,#16A34A)' : 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      boxShadow: ready ? '0 6px 20px rgba(34,197,94,0.35)' : 'none',
                      cursor: ready ? 'pointer' : 'not-allowed',
                    }}
                  >
                    {loading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Booking your spot…</>
                    ) : (
                      <>Book My Pilot Spot <ArrowRight className="h-4 w-4" /></>
                    )}
                  </button>

                  <p className="text-xs text-center" style={{ color: '#FFFFFF' }}>
                    No credit card · Victoria personally follows up within 24 hours
                  </p>
                </form>

                {/* Calendly alternative */}
                <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-xs text-center mb-3" style={{ color: '#FFFFFF' }}>
                    Prefer to book a call directly?
                  </p>
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', color: '#93C5FD', border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    📅 Book Founder Demo on Calendly →
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
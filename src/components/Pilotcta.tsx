'use client'

import { ArrowRight, CheckCircle } from 'lucide-react'

const CALENDLY = 'https://calendly.com/victoria-ashford/demo'
const APP_URL = 'https://app.aidemeet.com'

const PERKS = [
  'Founder personally sets up CRM integration',
  '2-week onboarding with dedicated support',
  'Founding rate locked forever',
  'Direct influence on the product roadmap',
]

export default function PilotCTA() {
  return (
    <section
      id="pilot"
      style={{
        background: 'linear-gradient(160deg,#050C1F 0%,#0D2260 60%,#08154A 100%)',
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(37,99,235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.04) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
      }} />
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '-20%', left: '60%', width: 600, height: 600,
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(circle,rgba(47,111,237,0.13) 0%,transparent 65%)',
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 420px', gap: 56, alignItems: 'center',
        }}
          className="pilot-grid"
        >
          {/* Left */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '5px 12px', borderRadius: 6, marginBottom: 24,
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#93C5FD',
            }}>
              <span style={{ width: 6, height: 6, background: '#4ADE80', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
              Pilot program — 5 founding teams
            </div>

            <h2 style={{
              fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, lineHeight: 1.1,
              letterSpacing: '-0.03em', color: '#F1F5F9', margin: '0 0 20px',
            }}>
              Founder personally onboards
              <br />
              <span style={{ color: '#93C5FD' }}>your sales team</span>
            </h2>

            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#94A3B8', margin: '0 0 32px', maxWidth: 480 }}>
              We configure AideMeet for your team, integrate your CRM, and guarantee your reps start closing faster within 2 weeks.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
              {PERKS.map((perk, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle
                    size={15}
                    style={{ color: '#4ADE80', flexShrink: 0 }}
                  />
                  <span style={{ fontSize: 14, color: '#CBD5E1' }}>{perk}</span>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex' }}>
                {['AM','IK','SJ'].map((initials, idx) => (
                  <div
                    key={initials}
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: '#fff',
                      background: ['#1D4ED8','#7C3AED','#059669'][idx],
                      border: '2px solid #050C1F',
                      marginLeft: idx > 0 ? -8 : 0,
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9' }}>
                  2 of 5 pilot spots taken
                </div>
                <div style={{ fontSize: 12, color: '#64748B' }}>2 spots remaining</div>
              </div>
            </div>
          </div>

          {/* Right: CTA card */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16,
            padding: '32px 28px',
            backdropFilter: 'blur(8px)',
          }}>
            <h3 style={{
              fontSize: 20, fontWeight: 700, color: '#F1F5F9',
              letterSpacing: '-0.02em', margin: '0 0 6px',
            }}>
              Get your pilot spot
            </h3>
            <p style={{ fontSize: 13.5, color: '#64748B', margin: '0 0 24px' }}>
              30-min call with Victoria. We handle everything.
            </p>

            {/* Pricing tiers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
              {[
                { label: '5-person team', price: '$99', note: '/mo, forever', strike: '$105/mo' },
                { label: '10-person team', price: '$199', note: '/mo, forever', strike: '$350/mo' },
              ].map((tier) => (
                <div
                  key={tier.label}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10, padding: '14px 12px', textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#F1F5F9', letterSpacing: '-0.03em' }}>
                    {tier.price}
                  </div>
                  <div style={{ fontSize: 11, color: '#93C5FD', marginTop: 2 }}>{tier.note}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#4ADE80', marginTop: 4 }}>{tier.label}</div>
                  <div style={{ fontSize: 11, color: '#F1F5F9', textDecoration: 'line-through', marginTop: 3 }}>
                    {tier.strike}
                  </div>
                </div>
              ))}
            </div>

            {/* Primary CTA */}
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                width: '100%', padding: '13px 20px', borderRadius: 10,
                background: 'linear-gradient(135deg,#22C55E,#16A34A)',
                boxShadow: '0 6px 20px rgba(34,197,94,0.3)',
                color: '#fff', fontWeight: 700, fontSize: 14,
                textDecoration: 'none', marginBottom: 10,
                transition: 'opacity 0.15s',
              }}
            >
              Book Founder Demo <ArrowRight size={15} />
            </a>

            {/* Secondary */}
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '100%', padding: '11px 20px', borderRadius: 10,
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#93C5FD', fontSize: 13, fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Or start free trial →
            </a>

            <p style={{
              fontSize: 11.5, textAlign: 'center', marginTop: 14,
              color: 'rgba(255,255,255,0.3)',
            }}>
              No credit card · Victoria follows up within 24h
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pilot-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
'use client'

import { Check, ArrowRight, Zap } from 'lucide-react'

const CALENDLY = 'https://calendly.com/victoria-ashford/demo'
const APP_URL  = 'https://app.aidemeet.com'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '',
    description: 'Try core features. No card, no limit.',
    features: [
      '10 meetings / month',
      'Basic AI summaries',
      '30-day transcript storage',
      'Google Calendar integration',
    ],
    cta: 'Get started free',
    action: 'app',
    highlight: false,
    badge: null,
  },
  {
    id: 'individual',
    name: 'Individual',
    price: '$20',
    period: '/mo',
    description: 'Everything a solo rep needs.',
    features: [
      'Unlimited meetings & storage',
      'Pre-meeting briefs (auto)',
      'Deal memory across calls',
      'CRM sync — HubSpot, Salesforce',
      'AI follow-up drafts',
      'Semantic search',
    ],
    cta: 'Start free trial',
    action: 'app',
    highlight: false,
    badge: '14-day trial',
  },
  {
    id: 'pilot',
    name: 'Pilot',
    price: 'From $99',
    period: '/mo',
    description: 'Founder-led onboarding for your team.',
    features: [
      'Everything in Individual',
      'Founder personally onboards',
      '2-week pilot, daily support',
      'CRM setup & integration',
      'Team pipeline analytics',
      'Direct roadmap influence',
    ],
    cta: 'Book a call',
    action: 'demo',
    highlight: true,
    badge: 'Recommended',
  },

]

export default function Pricing() {
  const handleCta = (plan: typeof PLANS[0]) => {
    if (plan.action === 'demo') window.open(CALENDLY, '_blank')
    else window.open(APP_URL, '_blank')
  }

  return (
    <section id="pricing" style={{ background: '#fff', padding: '96px 0 80px' }}>
      <div className="section-container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-block', marginBottom: 16,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
            padding: '5px 12px', borderRadius: 6,
            background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE',
          }}>
            Pricing
          </div>
          <h2 style={{
            fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700,
            letterSpacing: '-0.03em', color: '#0F172A', lineHeight: 1.1, margin: '0 0 14px',
          }}>
            Simple, honest pricing
          </h2>
          <p style={{ fontSize: 16, color: '#64748B', margin: 0 }}>
            14-day free trial on all paid plans. No credit card required.
          </p>
        </div>

        {/* Founding team banner */}
        <div style={{
          marginBottom: 40,
          borderRadius: 12,
          background: 'linear-gradient(120deg, #F0F7FF 0%, #EFF6FF 100%)',
          border: '1px solid #BFDBFE',
          padding: '18px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 12, fontWeight: 700, color: '#059669',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%', background: '#22C55E',
                display: 'inline-block', flexShrink: 0,
              }} />
              Founding team pilot — 5 spots (43% OFF)
            </div>
            <span style={{ fontSize: 13, color: '#475569' }}>
              First 5 teams get permanently locked pricing + founder onboarding.
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {[
              { seats: '5 seats', price: '$99/mo', strike: '$175' },
              { seats: '10 seats', price: '$199/mo', strike: '$350' },
            ].map(t => (
              <div key={t.seats} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#0F172A' }}>{t.price}</div>
                <div style={{ fontSize: 11, color: '#22C55E', fontWeight: 600 }}>{t.seats}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', textDecoration: 'line-through' }}>{t.strike}</div>
              </div>
            ))}
            <a
              href={CALENDLY}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '9px 18px', borderRadius: 8,
                background: '#0F172A',
                color: '#fff', fontWeight: 600, fontSize: 13,
                textDecoration: 'none',
              }}
            >
              Claim a spot <ArrowRight size={13} />
            </a>
          </div>
        </div>

        {/* Plan cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12,
          alignItems: 'start',
        }}>
          {PLANS.map(plan => (
            <div
              key={plan.id}
              style={{
                position: 'relative',
                background: plan.highlight ? '#0F172A' : '#fff',
                border: plan.highlight ? '1.5px solid #1E3A8A' : '1.5px solid #E2E8F0',
                borderRadius: 14,
                padding: '24px 20px 20px',
                display: 'flex', flexDirection: 'column',
                boxShadow: plan.highlight
                  ? '0 20px 48px rgba(15,23,42,0.18)'
                  : '0 1px 4px rgba(15,23,42,0.05)',
              }}
            >
              {plan.badge && (
                <div style={{
                  position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '3px 12px', borderRadius: 20, whiteSpace: 'nowrap',
                  background: plan.badge === 'Recommended'
                    ? 'linear-gradient(135deg,#2F6FED,#6B9FFF)'
                    : '#22C55E',
                  color: '#fff',
                }}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: plan.highlight ? '#93C5FD' : '#94A3B8',
                marginBottom: 10,
              }}>
                {plan.name}
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 6 }}>
                <span style={{
                  fontSize: 30, fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: plan.highlight ? '#F1F5F9' : '#0F172A',
                }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontSize: 12, color: plan.highlight ? '#64748B' : '#94A3B8' }}>
                    {plan.period}
                  </span>
                )}
              </div>

              <p style={{
                fontSize: 12.5, lineHeight: 1.55, margin: '0 0 16px',
                color: plan.highlight ? '#93C5FD' : '#64748B',
              }}>
                {plan.description}
              </p>

              {/* Divider */}
              <div style={{
                borderTop: plan.highlight ? '1px solid rgba(255,255,255,0.08)' : '1px solid #F1F5F9',
                marginBottom: 16,
              }} />

              {/* Features */}
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', flex: 1, marginBottom: 20 }}>
                {plan.features.map((f, i) => (
                  <li key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 8,
                  }}>
                    <Check
                      size={12}
                      style={{
                        flexShrink: 0, marginTop: 2.5,
                        color: plan.highlight ? '#60A5FA' : '#22C55E',
                      }}
                    />
                    <span style={{
                      fontSize: 12.5, lineHeight: 1.45,
                      color: plan.highlight ? '#CBD5E1' : '#475569',
                    }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleCta(plan)}
                style={{
                  width: '100%', padding: '10px 16px', borderRadius: 8,
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  transition: 'all 0.15s',
                  ...(plan.highlight ? {
                    background: 'linear-gradient(135deg,#2F6FED,#4F8EF5)',
                    color: '#fff', border: 'none',
                    boxShadow: '0 4px 16px rgba(47,111,237,0.4)',
                  } : {
                    background: 'transparent',
                    color: '#475569',
                    border: '1.5px solid #E2E8F0',
                  }),
                }}
                onMouseEnter={e => {
                  if (!plan.highlight) {
                    e.currentTarget.style.borderColor = '#94A3B8'
                    e.currentTarget.style.color = '#0F172A'
                  }
                }}
                onMouseLeave={e => {
                  if (!plan.highlight) {
                    e.currentTarget.style.borderColor = '#E2E8F0'
                    e.currentTarget.style.color = '#475569'
                  }
                }}
              >
                {plan.cta}
                {plan.highlight && <ArrowRight size={13} />}
              </button>
            </div>
          ))}
        </div>

        {/* Fine print */}
        <p style={{ marginTop: 24, textAlign: 'center', fontSize: 12.5, color: '#94A3B8' }}>
          All paid plans include a 14-day free trial · No credit card · Cancel anytime ·{' '}
          <a href="mailto:hello@aidemeet.com" style={{ color: '#2563EB', textDecoration: 'none' }}>
            hello@aidemeet.com
          </a>
        </p>
      </div>
    </section>
  )
}
'use client'

import { Check, Gift } from 'lucide-react'

const CALENDLY = 'https://calendly.com/victoria-werner/demo'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Try the core value — no credit card, no commitment.',
    badge: null,
    features: [
      '10 meetings / month',
      'Basic AI summaries',
      '30-day transcript storage',
      'Google Calendar integration',
      'Limited smart search',
    ],
    cta: 'Start Free',
    ctaAction: 'waitlist',
    highlighted: false,
  },
  {
    id: 'individual',
    name: 'Individual',
    price: '$20',
    period: '/user/mo',
    description: 'Full deal memory for solo reps. Unlimited meetings, no surprise charges.',
    badge: '14-day free trial',
    features: [
      'Unlimited meetings & storage',
      'AI pre-meeting briefs (1h before)',
      'Deal memory across all calls',
      'CRM sync: HubSpot, Salesforce, Pipedrive',
      'AI follow-up email & LinkedIn drafts',
      'Semantic search across full history',
      'No credit card for trial',
    ],
    cta: 'Start Free Trial',
    ctaAction: 'waitlist',
    highlighted: false,
  },
  {
    id: 'pilot',
    name: 'Sales Team Pilot',
    price: 'Custom',
    period: '',
    description: 'Founder-led onboarding for teams of 3–15 reps. We set everything up personally.',
    badge: 'Most Popular',
    features: [
      'Everything in Individual, team-wide',
      'Founder personally onboards your team',
      '2-week pilot with dedicated support',
      'CRM integration & custom setup',
      'Team pipeline overview & analytics',
      'Admin panel + centralized billing',
      'Direct influence on product roadmap',
    ],
    cta: 'Book Founder Demo',
    ctaAction: 'demo',
    highlighted: true,
  },
  {
    id: 'teams',
    name: 'Teams',
    price: '$35',
    period: '/user/mo',
    description: 'For established sales teams who want AideMeet as part of their permanent stack.',
    badge: null,
    features: [
      'Everything in Individual',
      'Shared team knowledge base',
      'SSO + Admin panel',
      'Priority support (4 h response)',
      'Onboarding call with CSM',
      'Team analytics dashboard',
      '20% discount on annual billing',
    ],
    cta: 'Contact Sales',
    ctaAction: 'waitlist',
    highlighted: false,
  },
]

export default function Pricing() {
  const handleCta = (plan: typeof PLANS[0]) => {
    if (plan.ctaAction === 'demo') {
      window.open(CALENDLY, '_blank')
    } else {
      document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="section-container">

        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-block mb-4 text-sm font-semibold px-4 py-1.5 rounded-full"
            style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE' }}
          >
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0F172A' }}>
            Simple, transparent pricing
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-6" style={{ color: '#64748B' }}>
            Start free. Upgrade when you're ready. No surprise charges.
          </p>

          {/* Trial callout */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg,#ECFDF5,#D1FAE5)', border: '1px solid #A7F3D0', color: '#065F46' }}
          >
            <Gift className="h-4 w-4 text-green-500" />
            14-day free Pro trial — no credit card required. Upgrade only when you're sure.
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="relative rounded-2xl p-7 flex flex-col"
              style={{
                border: plan.highlighted ? '2px solid #2563EB' : '1.5px solid #E8F0FF',
                boxShadow: plan.highlighted
                  ? '0 16px 48px rgba(37,99,235,0.15)'
                  : '0 2px 12px rgba(37,99,235,0.04)',
                transform: plan.highlighted ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className="px-4 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap"
                    style={{
                      background: plan.badge === '14-day free trial'
                        ? 'linear-gradient(135deg,#059669,#10B981)'
                        : 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
                    }}
                  >
                    {plan.badge === '14-day free trial' ? '🎁 ' : ''}{plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name + description */}
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-1" style={{ color: '#0F172A' }}>{plan.name}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{plan.description}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 pb-5 mb-5" style={{ borderBottom: '1px solid #F1F5F9' }}>
                <span className="text-3xl font-bold" style={{ color: '#0F172A' }}>{plan.price}</span>
                {plan.period && <span className="text-xs" style={{ color: '#94A3B8' }}>{plan.period}</span>}
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-7 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check
                      className="h-3.5 w-3.5 mt-0.5 flex-shrink-0"
                      style={{ color: plan.highlighted ? '#2563EB' : '#22C55E' }}
                    />
                    <span className="text-xs leading-relaxed" style={{ color: '#475569' }}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleCta(plan)}
                className="w-full py-2.5 px-5 rounded-xl font-semibold text-sm transition-all"
                style={plan.highlighted ? {
                  background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
                  color: '#fff',
                  boxShadow: '0 6px 20px rgba(37,99,235,0.3)',
                } : {
                  background: '#F0F6FF',
                  color: '#2563EB',
                  border: '1.5px solid rgba(37,99,235,0.2)',
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Free tier reminder */}
        <div className="mt-10 text-center">
          <p className="text-sm" style={{ color: '#94A3B8' }}>
            All paid plans include a{' '}
            <strong style={{ color: '#475569' }}>14-day free Pro trial</strong> with no credit card.
            You're only charged after you decide to continue. Cancel anytime.
          </p>
        </div>

        {/* FAQ link */}
        <div className="mt-4 text-center">
          <p style={{ color: '#64748B', fontSize: 14 }}>
            Questions?{' '}
            <button
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-semibold"
              style={{ color: '#2563EB' }}
            >
              See FAQ
            </button>
            {' '}or email us at{' '}
            <a href="mailto:hello@aidemeet.com" className="font-semibold" style={{ color: '#2563EB' }}>
              hello@aidemeet.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
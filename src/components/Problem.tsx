'use client'

import { Clock, FileText, HelpCircle, TrendingDown, Zap, Target, Brain, Trophy } from 'lucide-react'

const BEFORE = [
  { Icon: Clock,       stat: '15–30 min',  text: 'prepping for calls — digging through old emails and notes' },
  { Icon: FileText,    stat: '20–40 min',  text: 'writing up notes after each call instead of following up' },
  { Icon: HelpCircle,  stat: 'Every call', text: '"Wait, what did they say about budget last time?"' },
  { Icon: TrendingDown,stat: 'One slip',   text: 'A forgotten objection handled poorly loses the deal' },
]

const AFTER = [
  { Icon: Zap,    stat: '30 min before', text: 'every call — AI brief ready, full context, no digging' },
  { Icon: Target, stat: 'Auto-tracked',  text: 'every commitment, action item, and promised follow-up' },
  { Icon: Brain,  stat: 'Instant',       text: '"What did Alex say about budget?" — AI answers in seconds' },
  { Icon: Trophy, stat: 'Every rep',     text: 'performs like your best rep, consistently' },
]

const STATS = [
  { value: '20+',    label: 'demos missed per rep/month on admin alone', highlight: false },
  { value: '5,000%', label: 'ROI on one recovered deal',                  highlight: true  },
  { value: '$20',    label: 'per person per month',                        highlight: false },
]

export default function Problem() {
  return (
    <section className="py-20 bg-white">
      <div className="section-container">

        {/* Heading */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div
            className="inline-block mb-4 text-sm font-semibold px-4 py-1.5 rounded-full"
            style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}
          >
            The real cost of "I'll update the CRM later"
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: '#0F172A' }}>
            Your reps have 6 calls a day.{' '}
            <span style={{ color: '#DC2626' }}>They remember none of them.</span>
          </h2>
          <p className="text-xl" style={{ color: '#64748B' }}>
            Every missed detail in a discovery call is leverage lost in negotiation.
            Every hour on admin is 2–3 demos that didn't happen.
          </p>
        </div>

        {/* Before / After grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-14">

          {/* Before */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid #FECACA' }}>
            <div className="px-6 py-4 flex items-center gap-3" style={{ background: '#FEF2F2', borderBottom: '1px solid #FECACA' }}>
              <TrendingDown className="w-4 h-4" style={{ color: '#DC2626' }} />
              <span className="font-bold text-sm" style={{ color: '#DC2626' }}>Right now, your reps…</span>
            </div>
            <div className="p-6 space-y-4" style={{ background: '#FFF5F5' }}>
              {BEFORE.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                    style={{ background: '#FEE2E2' }}
                  >
                    <item.Icon className="w-4 h-4" style={{ color: '#DC2626' }} />
                  </div>
                  <div>
                    <span className="text-sm font-bold" style={{ color: '#DC2626' }}>{item.stat} — </span>
                    <span className="text-sm" style={{ color: '#7F1D1D' }}>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid #A7F3D0' }}>
            <div className="px-6 py-4 flex items-center gap-3" style={{ background: '#ECFDF5', borderBottom: '1px solid #A7F3D0' }}>
              <Trophy className="w-4 h-4" style={{ color: '#065F46' }} />
              <span className="font-bold text-sm" style={{ color: '#065F46' }}>With AideMeet, every rep…</span>
            </div>
            <div className="p-6 space-y-4" style={{ background: '#F0FDF9' }}>
              {AFTER.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                    style={{ background: '#D1FAE5' }}
                  >
                    <item.Icon className="w-4 h-4" style={{ color: '#059669' }} />
                  </div>
                  <div>
                    <span className="text-sm font-bold" style={{ color: '#059669' }}>{item.stat} — </span>
                    <span className="text-sm" style={{ color: '#064E3B' }}>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROI stats bar */}
        <div
          className="max-w-4xl mx-auto rounded-2xl p-8"
          style={{
            background: 'linear-gradient(135deg,#0F1F4A,#1D3A8A)',
            boxShadow: '0 16px 48px rgba(15,31,74,0.25)',
          }}
        >
          <div className="text-center mb-6">
            <div className="text-sm font-semibold mb-1" style={{ color: '#93C5FD' }}>The pilot math</div>
            <p className="text-white font-bold text-lg">
              $199/month for 10 people. One recovered deal pays for 5+ years.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{ color: s.highlight ? '#4ADE80' : '#93C5FD' }}
                >
                  {s.value}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: '#A5C3F0' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pull quote */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <blockquote className="text-2xl font-bold leading-snug" style={{ color: '#0F172A' }}>
            Your top rep closes 2× better than average —
            and you can't explain why.{' '}
            <span style={{ color: '#1D4ED8' }}>AideMeet makes that rep every rep.</span>
          </blockquote>
        </div>

      </div>
    </section>
  )
}
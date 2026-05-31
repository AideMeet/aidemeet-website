'use client'

import { Check, X, Minus } from 'lucide-react'

const APP_URL = 'https://app.aidemeet.com'

const FEATURES = [
  {
    feature: 'Focus',
    aidemeet: 'Revenue Memory System — deal context across every call',
    gong:      'Call recording + conversation analytics',
    otter:     'Meeting transcription + basic notes',
    fireflies: 'Meeting transcription + notes',
    fathom:    'Call recording + highlight clips',
    readai:    'AI meeting summaries + search',
  },
  {
    feature: 'Pre-meeting brief',
    aidemeet: 'yes:Auto-delivered 1h before every call',
    gong:      'no:Not available',
    otter:     'no:Not available',
    fireflies: 'no:Not available',
    fathom:    'no:Not available',
    readai:    'partial:Limited',
  },
  {
    feature: 'Deal memory across calls',
    aidemeet: 'yes:Full history: context, objections, promises',
    gong:      'partial:Analytics only',
    otter:     'no:Each call isolated',
    fireflies: 'no:Each call isolated',
    fathom:    'no:Each call isolated',
    readai:    'partial:Search only',
  },
  {
    feature: 'CRM auto-sync',
    aidemeet: 'yes:HubSpot, Salesforce, Pipedrive',
    gong:      'yes:Yes (enterprise pricing)',
    otter:     'no:No',
    fireflies: 'partial:Limited',
    fathom:    'yes:HubSpot, Salesforce',
    readai:    'partial:Limited',
  },
  {
    feature: 'AI follow-up drafts',
    aidemeet: 'yes:Email + LinkedIn, personalised per call',
    gong:      'no:No',
    otter:     'no:No',
    fireflies: 'no:No',
    fathom:    'partial:Basic',
    readai:    'partial:Basic',
  },
  {
    feature: 'Built for',
    aidemeet: 'SMB & mid-market sales teams',
    gong:      'Enterprise sales orgs',
    otter:     'Anyone with meetings',
    fireflies: 'Anyone with meetings',
    fathom:    'Individual sellers',
    readai:    'Knowledge workers',
  },
]

const COMPETITORS = [
  { key: 'gong',      label: 'Gong',      sub: 'Enterprise' },
  { key: 'otter',     label: 'Otter',     sub: 'General'    },
  { key: 'fireflies', label: 'Fireflies', sub: 'General'    },
  { key: 'fathom',    label: 'Fathom',    sub: 'Individual' },
  { key: 'readai',    label: 'Read.ai',   sub: 'General'    },
]

function CellContent({ value }: { value: string }) {
  if (value.startsWith('yes:')) {
    const text = value.slice(4)
    return (
      <div className="flex items-start gap-1.5 justify-center">
        <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#16A34A' }} />
        <span className="text-xs font-medium" style={{ color: '#15803D' }}>{text}</span>
      </div>
    )
  }
  if (value.startsWith('no:')) {
    const text = value.slice(3)
    return (
      <div className="flex items-start gap-1.5 justify-center">
        <X className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#DC2626' }} />
        <span className="text-xs" style={{ color: '#DC2626' }}>{text}</span>
      </div>
    )
  }
  if (value.startsWith('partial:')) {
    const text = value.slice(8)
    return (
      <div className="flex items-start gap-1.5 justify-center">
        <Minus className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#D97706' }} />
        <span className="text-xs" style={{ color: '#D97706' }}>{text}</span>
      </div>
    )
  }
  return <span className="text-xs" style={{ color: '#64748B' }}>{value}</span>
}

export default function WhyNotCompetitors() {
  return (
    <section id="why-us" className="py-20" style={{ background: 'linear-gradient(160deg, #F8FAFF 0%, #EFF6FF 100%)' }}>
      <div className="section-container">

        {/* Heading */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div
            className="inline-block mb-4 text-sm font-semibold px-4 py-1.5 rounded-full"
            style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE' }}
          >
            vs. Gong · Otter · Fireflies · Fathom · Read.ai
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: '#0F172A' }}>
            They summarize meetings.{' '}
            <span style={{
              background: 'linear-gradient(135deg,#1D4ED8,#7C3AED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              We preserve deal memory.
            </span>
          </h2>
          <p className="text-xl" style={{ color: '#64748B' }}>
            Every tool on this list records calls. None of them walk into the next call
            knowing what was promised last time.
          </p>
        </div>

        {/* Table */}
        <div
          className="max-w-6xl mx-auto overflow-x-auto rounded-2xl"
          style={{ border: '1px solid #D1E3FF', boxShadow: '0 8px 40px rgba(37,99,235,0.08)' }}
        >
          <div style={{ minWidth: 720 }}>

            {/* Header row */}
            <div
              className="grid bg-white"
              style={{ gridTemplateColumns: '180px repeat(6, 1fr)', borderBottom: '1px solid #D1E3FF' }}
            >
              <div className="px-4 py-3.5" />

              {/* AideMeet column */}
              <div className="px-4 py-3.5 text-center" style={{ background: '#EFF6FF' }}>
                <div className="font-bold text-sm" style={{ color: '#1D4ED8' }}>AideMeet</div>
                <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>Sales-first</div>
                <div className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">Us</div>
              </div>

              {COMPETITORS.map(c => (
                <div key={c.key} className="px-4 py-3.5 text-center">
                  <div className="font-semibold text-sm" style={{ color: '#475569' }}>{c.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{c.sub}</div>
                </div>
              ))}
            </div>

            {/* Data rows */}
            {FEATURES.map((row, i) => (
              <div
                key={i}
                className="grid"
                style={{
                  gridTemplateColumns: '180px repeat(6, 1fr)',
                  borderBottom: i < FEATURES.length - 1 ? '1px solid #E8F0FF' : 'none',
                  background: i % 2 === 0 ? '#fff' : '#FAFBFF',
                }}
              >
                <div className="px-4 py-3.5">
                  <span className="text-xs font-semibold" style={{ color: '#475569' }}>{row.feature}</span>
                </div>

                {/* AideMeet */}
                <div className="px-4 py-3.5 text-center" style={{ background: '#EFF6FF' }}>
                  <CellContent value={row.aidemeet} />
                </div>

                {/* Competitors */}
                {COMPETITORS.map(c => (
                  <div key={c.key} className="px-4 py-3.5 text-center">
                    <CellContent value={(row as Record<string, string>)[c.key]} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <p className="text-base mb-5" style={{ color: '#64748B' }}>
            Stop paying enterprise prices for a tool that forgets your deals the moment the call ends.
          </p>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
              boxShadow: '0 6px 24px rgba(37,99,235,0.35)',
              fontSize: 15,
            }}
          >
            See AideMeet in Action →
          </a>
        </div>
      </div>
    </section>
  )
}
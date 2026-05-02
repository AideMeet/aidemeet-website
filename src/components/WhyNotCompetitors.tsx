'use client'

/* Columns: AideMeet, Gong, Otter, Fireflies, Fathom, Read.ai */

const FEATURES = [
  {
    feature: 'What they do',
    aidemeet: 'Revenue Memory System — deal context across every call',
    gong:      'Call recording + conversation analytics',
    otter:     'Meeting transcription + basic notes',
    fireflies: 'Meeting transcription + notes',
    fathom:    'Call recording + highlight clips',
    readai:    'AI meeting summaries + search',
  },
  {
    feature: 'Pre-meeting brief',
    aidemeet: '✅ Auto-delivered 1h before every call',
    gong:      '❌ Not available',
    otter:     '❌ Not available',
    fireflies: '❌ Not available',
    fathom:    '❌ Not available',
    readai:    '⚠️ Limited',
  },
  {
    feature: 'Deal memory across calls',
    aidemeet: '✅ Full history: context, objections, promises',
    gong:      '⚠️ Analytics only',
    otter:     '❌ Each call isolated',
    fireflies: '❌ Each call isolated',
    fathom:    '❌ Each call isolated',
    readai:    '⚠️ Search only',
  },
  {
    feature: 'CRM auto-sync',
    aidemeet: '✅ HubSpot, Salesforce, Pipedrive',
    gong:      '✅ Yes (enterprise pricing)',
    otter:     '❌ No',
    fireflies: '⚠️ Limited',
    fathom:    '✅ HubSpot, Salesforce',
    readai:    '⚠️ Limited',
  },
  {
    feature: 'AI follow-up drafts',
    aidemeet: '✅ Email + LinkedIn, personalised per call',
    gong:      '❌ No',
    otter:     '❌ No',
    fireflies: '❌ No',
    fathom:    '⚠️ Basic',
    readai:    '⚠️ Basic',
  },

  {
    feature: 'Built for',
    aidemeet: '🎯 SMB & mid-market sales teams',
    gong:      'Enterprise sales orgs',
    otter:     'Anyone with meetings',
    fireflies: 'Anyone with meetings',
    fathom:    'Individual sellers',
    readai:    'Knowledge workers',
  },
]

const COMPETITORS = [
  { key: 'gong',      label: 'Gong',      sub: 'Enterprise' },
  { key: 'otter',     label: 'Otter',     sub: 'Basic' },
  { key: 'fireflies', label: 'Fireflies', sub: 'General' },
  { key: 'fathom',    label: 'Fathom',    sub: 'Individual' },
  { key: 'readai',    label: 'Read.ai',   sub: 'General' },
]

function cellColor(val: string) {
  if (val.startsWith('✅')) return '#16A34A'
  if (val.startsWith('❌')) return '#DC2626'
  if (val.startsWith('⚠️')) return '#D97706'
  return '#64748B'
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
                <div className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">← Us</div>
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
                  <span className="text-xs font-semibold" style={{ color: cellColor(row.aidemeet) }}>
                    {row.aidemeet}
                  </span>
                </div>

                {/* Competitors */}
                {COMPETITORS.map(c => (
                  <div key={c.key} className="px-4 py-3.5 text-center">
                    <span className="text-xs" style={{ color: cellColor((row as any)[c.key]) }}>
                      {(row as any)[c.key]}
                    </span>
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
          <button
            onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
              boxShadow: '0 6px 24px rgba(37,99,235,0.35)',
              fontSize: 15,
            }}
          >
            See AideMeet in Action →
          </button>
        </div>
      </div>
    </section>
  )
}
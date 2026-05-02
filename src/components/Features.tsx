'use client'

import { FileText, Calendar, Search, Zap, Shield, Brain } from 'lucide-react'

const FEATURES = [
  {
    icon: Brain,
    title: 'Deal Memory Across Every Call',
    description: 'AideMeet builds a complete history for every prospect — linking all calls, objections, promises, and context. Your rep never asks "what did they say last time?" again.',
    color: 'bg-purple-100 text-purple-600',
    tag: 'Core',
  },
  {
    icon: Calendar,
    title: 'Pre-Meeting Briefs — Auto-Delivered',
    description: '1 hour before every call, your rep gets a one-page brief: past promises, open objections, deal stage, and suggested questions. Preparation on autopilot.',
    color: 'bg-green-100 text-green-600',
    tag: 'Fan Favourite',
  },
  {
    icon: Zap,
    title: '1-Click CRM Sync',
    description: 'After every call, AI extracts action items, deal updates, and key context — and pushes them to HubSpot, Salesforce, or Pipedrive. Zero manual entry.',
    color: 'bg-blue-100 text-blue-600',
    tag: 'Time Saver',
  },
  {
    icon: FileText,
    title: 'AI Follow-up Drafts',
    description: 'Instantly get a personalised follow-up email and LinkedIn message — grounded in what was actually said on the call. Send in one click.',
    color: 'bg-pink-100 text-pink-600',
    tag: 'New',
  },
  {
    icon: Search,
    title: 'Ask Anything About Your Deals',
    description: '"What did Ivan say about the budget?" Our AI searches across your entire call history and gives you the exact quote and context in seconds.',
    color: 'bg-orange-100 text-orange-600',
    tag: '',
  },
  {
    icon: Shield,
    title: 'Built for Sales Compliance',
    description: 'GDPR compliant, end-to-end encrypted, multiple consent modes (voice notice, participant consent, self-responsible). Enterprise: SOC 2, on-premise.',
    color: 'bg-indigo-100 text-indigo-600',
    tag: '',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block mb-4 text-sm font-semibold px-4 py-1.5 rounded-full" style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE' }}>
            Built for Sales Teams
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0F172A' }}>
            Revenue Memory System
            <br />
            <span style={{ color: '#2563EB' }}>for Sales Teams</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#64748B' }}>
            Not just another note-taker. AideMeet is the long-term memory layer for your entire sales operation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
              style={{ background: '#FAFBFF', border: '1px solid #E8F0FF' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${feature.color}`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                {feature.tag && (
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                    {feature.tag}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: '#0F172A' }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-base"
          >
            Start Free Pilot
          </button>
        </div>
      </div>
    </section>
  )
}
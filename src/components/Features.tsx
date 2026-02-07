'use client'

import { Mic, FileText, Calendar, Search, Zap, Shield } from 'lucide-react'

const features = [
  {
    icon: Mic,
    title: 'Automatic Transcription',
    description: 'Record any meeting and get accurate AI transcription in minutes. Supports 50+ languages.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: FileText,
    title: 'Smart Summaries',
    description: 'AI extracts key points, action items, and decisions. Customizable for Sales or HR workflows.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Calendar,
    title: 'Pre-Meeting Briefs',
    description: 'Get context before every call. AI summarizes past interactions and suggests talking points.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Search,
    title: 'Semantic Search',
    description: 'Find any detail instantly. Ask "What did John say about pricing?" and get exact quotes.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Zap,
    title: 'CRM Integration',
    description: 'Auto-sync notes to HubSpot, Salesforce, or Pipedrive. One click to update your CRM.',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'End-to-end encryption, SOC 2 compliant, GDPR ready. Your data stays private.',
    color: 'bg-indigo-100 text-indigo-600',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Never Forget
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built for Sales and HR professionals who have back-to-back meetings 
            and can't afford to lose context.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.color} mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              const element = document.getElementById('waitlist')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary text-lg"
          >
            Get Early Access
          </button>
        </div>
      </div>
    </section>
  )
}

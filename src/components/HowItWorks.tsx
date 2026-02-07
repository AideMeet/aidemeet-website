'use client'

import { Upload, Sparkles, Bell, Download } from 'lucide-react'

const steps = [
  {
    number: '1',
    icon: Upload,
    title: 'Record Your Meeting',
    description: 'Upload audio from any source: Zoom, Google Meet, phone calls, or in-person recordings.',
  },
  {
    number: '2',
    icon: Sparkles,
    title: 'AI Processes',
    description: 'Our AI transcribes, summarizes, and extracts key information in under 5 minutes.',
  },
  {
    number: '3',
    icon: Bell,
    title: 'Get Your Brief',
    description: 'Before your next meeting, receive a personalized brief with relevant context and history.',
  },
  {
    number: '4',
    icon: Download,
    title: 'Export to CRM',
    description: 'One-click sync to HubSpot, Salesforce, or download as PDF. Keep everything organized.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-primary-50 to-purple-50">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How AideMeet Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple workflow. Powerful results. Start using in under 5 minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line (hidden on mobile, last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-primary-200 z-0" />
              )}

              {/* Card */}
              <div className="relative z-10 bg-white rounded-xl p-6 shadow-md border border-gray-100">
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  <step.icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-2xl shadow-lg p-8 max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Transform Your Meetings?
            </h3>
            <p className="text-gray-600 mb-6">
              Join 50+ professionals already on the waitlist. Launch in 16 weeks.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('waitlist')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary text-lg"
            >
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

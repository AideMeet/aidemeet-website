'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
   {
    question: 'How does AideMeet work?',
    answer: 'AideMeet connects to your calendar (Google) and automatically joins your Zoom or Meet calls. It records, transcribes, and generates a smart summary with action items. Before your next meeting with the same person, you get a pre-meeting brief with all relevant context — past promises, open tasks, and suggested talking points. You can export everything to your CRM with one click.',
  },
  {
    question: 'Which meeting platforms do you support?',
    answer: 'We support Zoom and Google Meet via a bot that joins the call. For in-person meetings, phone calls, or any other source, you can upload an audio file directly.',
  },
  {
    question: 'Is there a free plan? What are its limits?',
    answer: 'Yes, our Free plan includes 10 meetings per month, 30-day transcript storage, basic summaries, Google Calendar integration, and limited smart search. It’s a great way to experience the core value. After 30 days, transcripts are automatically deleted unless you upgrade.',
  },
  {
    question: 'What makes AideMeet different from Fathom, Otter, or Fireflies?',
    answer: 'We focus on long-term personal memory. AideMeet builds a profile for every person you meet — linking all conversations, promises, and tasks. You get pre-meeting briefs automatically, a notes-only mode (no bot in the room), and a smart follow-up tracker that reminds you of commitments. We’re built for humans, not for surveillance.',
  },
  {
  question: 'Which CRMs do you integrate with?',
  answer: 'CSV-based export – compatible with HubSpot, Salesforce, Pipedrive, and any CRM that supports CSV import. One-click export, then import manually into your CRM. Native API integration is coming soon (roadmap Q4 2026).',
  },
  {
    question: 'Do you support languages other than English?',
    answer: 'Yes, transcription works in 99+ languages including Spanish, French, German, Ukrainian, Polish, and more. Summaries are currently generated in English, with multilingual summaries on the roadmap.',
  },

  {
    question: 'Is my data secure and private?',
    answer: 'Absolutely. All audio and transcripts are encrypted at rest and in transit (AES-256). You control your data — you can delete it anytime. We are GDPR compliant.',
  },

  {
    question: 'Can I try the Professional plan before paying?',
    answer: 'Yes. The Free plan gives you a solid taste. When you’re ready, you can start a 14‑day free trial of Professional with no credit card required.',
  },

  {
    question: 'What happens to my data if I cancel?',
    answer: 'You can export all your data (transcripts, summaries, audio) before canceling. After cancellation, data is retained for 30 days and then permanently deleted, unless you have a legal hold requirement (Enterprise - on our long-term roadmap).',
  },
  {
    question: 'How do you handle consent and recording laws?',
    answer: 'We provide multiple consent modes: you can choose to manually start recording (taking responsibility), enable an auto‑voice prompt (“this meeting is being recorded”), or send calendar notifications to attendees. Logs of consent are stored for compliance.',
  },
  ]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="section-container max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about AideMeet
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-primary-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We'd love to hear from you.
          </p>
          <a
            href="mailto:hello@aidemeet.com"
            className="text-primary-600 hover:text-primary-700 font-semibold text-lg"
          >
            hello@aidemeet.com
          </a>
        </div>
      </div>
    </section>
  )
}

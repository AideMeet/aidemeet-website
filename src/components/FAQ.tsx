'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'How does AideMeet work?',
    answer: 'Upload or record your meeting audio. Our AI transcribes it, generates a smart summary with action items, and extracts key information. Before your next meeting with the same person, you get a brief with all relevant context.',
  },
  {
    question: 'Which platforms do you support?',
    answer: 'AideMeet works with any audio source: Zoom, Google Meet, Microsoft Teams, phone calls, or in-person recordings. You can upload files directly or use our integrations for automatic recording.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. We use end-to-end encryption for all audio and transcripts. Your data is stored securely with AES-256 encryption. We\'re SOC 2 Type II compliant and GDPR ready. You can delete your data anytime.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. There are no long-term contracts. Cancel your subscription anytime from your account settings. You\'ll retain access until the end of your billing period.',
  },
  {
    question: 'What CRMs do you integrate with?',
    answer: 'Currently: HubSpot, Salesforce, and Pipedrive. More integrations (Greenhouse, Lever, BambooHR) coming soon based on user demand.',
  },
  {
    question: 'Do you support languages other than English?',
    answer: 'Yes! Our AI transcription supports 50+ languages including Spanish, French, German, Ukrainian, Polish, and more. Summaries are currently in English, with multilingual support coming in Q2 2024.',
  },
  {
    question: 'What happens to my data if I cancel?',
    answer: 'You can export all your data (transcripts, summaries, audio) before canceling. After cancellation, data is retained for 30 days then permanently deleted.',
  },
  {
    question: 'How accurate is the transcription?',
    answer: 'Our AI achieves 95%+ accuracy on clear audio. Accuracy depends on audio quality, accents, and background noise. You can always edit transcripts manually.',
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

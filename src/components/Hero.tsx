'use client'

import WaitlistForm from './WaitlistForm'
import { Sparkles, Zap, TrendingUp } from 'lucide-react'

export default function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 via-white to-purple-50">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Coming Soon - Join the Waitlist</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Never Forget a{' '}
              <span className="text-primary-600">Client Promise</span> Again
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              AI meeting assistant for Sales and HR professionals. Automatic transcription, 
              smart summaries, and pre-meeting briefs that remember every detail.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Save 1-3 hrs/day</div>
                  <div className="text-sm text-gray-500">on notes</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Close faster</div>
                  <div className="text-sm text-gray-500">with context</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">CRM auto-sync</div>
                  <div className="text-sm text-gray-500">HubSpot, Salesforce</div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-2">Trusted by professionals at</p>
              <div className="flex items-center space-x-6 text-gray-400">
                <span className="font-semibold">Tech Startups</span>
                <span>•</span>
                <span className="font-semibold">Sales Teams</span>
                <span>•</span>
                <span className="font-semibold">HR Departments</span>
              </div>
            </div>
          </div>

          {/* Right Column - Waitlist Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100" id="waitlist">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  )
}

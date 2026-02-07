'use client'

import { useState } from 'react'
import { Mail, Briefcase, CheckCircle, Loader2 } from 'lucide-react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    // Basic spam protection - check if submitting too fast
    const lastSubmit = localStorage.getItem('lastWaitlistSubmit')
    if (lastSubmit) {
      const timeSinceLastSubmit = Date.now() - parseInt(lastSubmit)
      if (timeSinceLastSubmit < 5000) { // 5 seconds cooldown
        setError('Please wait a moment before submitting again')
        setLoading(false)
        return
      }
    }

    try {
      // Google Sheets Web App URL - you'll need to create this
      // Instructions in README.md
      const GOOGLE_SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || ''
      
      if (!GOOGLE_SHEETS_URL) {
        // Fallback: log to console for testing
        console.log('Waitlist signup:', { email, role, timestamp: new Date().toISOString() })
        setSuccess(true)
        setEmail('')
        setRole('')
        setLoading(false)
        localStorage.setItem('lastWaitlistSubmit', Date.now().toString())
        return
      }

      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(), // Sanitize email
          role,
          timestamp: new Date().toISOString(),
        }),
      })

      // With no-cors, we can't read the response, so assume success
      setSuccess(true)
      setEmail('')
      setRole('')
      localStorage.setItem('lastWaitlistSubmit', Date.now().toString())
      
      // Send confirmation email (optional - using Web3Forms)

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: 'New AideMeet Waitlist Signup',
          from_name: 'AideMeet Waitlist',
          email: 'victoria.ashford54@gmail.com',
          message: `New signup: ${email} (${role})`,
        }),
      })


    } catch (err) {
      console.error('Error submitting form:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">You're on the list!</h3>
        <p className="text-gray-600 mb-6">
          We'll email you when AideMeet is ready to transform your meetings.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Add another email
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Join the Waitlist
      </h2>
      <p className="text-gray-600 mb-6">
        Be the first to know when we launch. Get early access and exclusive benefits.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="you@company.com"
            />
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            Your Role
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              id="role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">Select your role</option>
              <option value="Sales - SDR/BDR">Sales - SDR/BDR</option>
              <option value="Sales - AE">Sales - Account Executive</option>
              <option value="Sales - Manager">Sales - Manager</option>
              <option value="HR - Recruiter">HR - Recruiter</option>
              <option value="HR - Manager">HR - Manager</option>
              <option value="Consultant">Consultant</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Joining...</span>
            </>
          ) : (
            <span>Join Waitlist</span>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          By joining, you agree to receive updates about AideMeet. Unsubscribe anytime.
        </p>
      </form>

      {/* Benefits */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-3">Early Access Benefits:</p>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <span>3 months free Professional plan ($60 value)</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <span>Priority onboarding and support</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <span>Influence product roadmap with your feedback</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Mail, Briefcase, CheckCircle, Loader2, Zap, Users, Star, ArrowRight } from 'lucide-react'
import { EarlyAccessModal } from './EarlyAccess'
import type { Plan } from './EarlyAccess'

const founderPlan: Plan = {
  id: 'founder',
  badge: '⚡ Only 20 Spots',
  badgeClass: 'bg-white/20 text-white border border-white/30',
  name: "Founder's Pass",
  subtitle: 'Personal Early Access',
  icon: Star,
  dark: true,
  options: [
    { label: '3 Months', price: '$49', note: 'one-time' },
    { label: '1 Year', price: '$99', note: 'vs $240/yr · best value' },
  ],
  features: ['Priority access in 24–48 hours', 'Direct chat with the founder', 'Lifetime "Founder" discount locked in', 'Free upgrade to all future Pro features'],
  spotsTotal: 20,
  spotsLeft: 15,
  cta: 'Reserve My Spot',
  availability: 'Access in 24–48 hrs',
  needsCompany: false,
  needsTeamSize: false,
}

const alphaPlan: Plan = {
  id: 'alpha',
  badge: 'Corporate Early pilot',
  badgeClass: 'bg-primary-100 text-primary-700',
  name: 'Alpha Team',
  subtitle: '30-day pilot · Up to 10 people',
  icon: Users,
  dark: false,
  options: [
    { label: 'Up to 5 people', price: '$99', note: '60 days · one-time' },
    { label: 'Up to 10 people', price: '$199', note: '60 days · one-time' },
  ],
  features: ['White-glove onboarding & integrations setup', 'Direct influence on product roadmap', 'Request one custom minor feature', '30-day success review call', 'Video testimonial required'],
  spotsTotal: 7,
  spotsLeft: 6,
  cta: 'Apply for Corporate Early pilot',
  availability: 'Booking now',
  needsCompany: true,
  needsTeamSize: true,
}

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [activePlan, setActivePlan] = useState<Plan | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setLoading(false); return
    }

    const lastSubmit = localStorage.getItem('lastWaitlistSubmit')
    if (lastSubmit && Date.now() - parseInt(lastSubmit) < 5000) {
      setError('Please wait a moment before submitting again')
      setLoading(false); return
    }

    try {
      const SHEETS = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || ''
      if (!SHEETS) {
        console.log('Waitlist:', { email, role, timestamp: new Date().toISOString() })
        setSuccess(true); setEmail(''); setRole('')
        localStorage.setItem('lastWaitlistSubmit', Date.now().toString())
        setLoading(false); return
      }

      await fetch(SHEETS, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'waitlist', email: email.trim().toLowerCase(), role, timestamp: new Date().toISOString() }),
      })

      setSuccess(true); setEmail(''); setRole('')
      localStorage.setItem('lastWaitlistSubmit', Date.now().toString())

      const WEB3 = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
      if (WEB3) {
        const web3res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3,
            subject: 'New AideMeet Waitlist Signup',
            from_name: 'AideMeet Waitlist',
            replyto: email.trim().toLowerCase(),
            message: `New signup:\nEmail: ${email}\nRole: ${role}`,
          }),
        })
        const web3data = await web3res.json()
        if (!web3data.success) {
          console.error('Web3Forms error (waitlist):', web3data)
        }
      }
    } catch (err) {
      console.error(err); setError('Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }

  // ── Success: upsell to early access ────────────────────────────────────────
  if (success) {
    return (
      <>
        <div>
          <div className="text-center pb-6 border-b border-gray-100 mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-3">
              <CheckCircle className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">You're on the list!</h3>
            <p className="text-gray-500 text-sm">We'll email you when AideMeet is ready.</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-primary-500" />
              <p className="text-sm font-semibold text-gray-800">Want access now? Skip the wait:</p>
            </div>

            {[founderPlan, alphaPlan].map((plan) => (
              <button
                key={plan.id}
                onClick={() => setActivePlan(plan)}
                className="w-full flex items-center justify-between rounded-xl border-2 border-gray-100 bg-gray-50 hover:border-primary-300 hover:bg-primary-50 px-4 py-3.5 text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                    <plan.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{plan.name}</div>
                    <div className="text-xs text-gray-500">{plan.subtitle}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-primary-600">
                    from {plan.options[0].price}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}

            <button onClick={() => setSuccess(false)}
              className="w-full text-center text-xs text-gray-400 hover:text-gray-600 pt-2 transition-colors">
              Or add another email →
            </button>
          </div>
        </div>

        {activePlan && (
          <EarlyAccessModal plan={activePlan} selectedOptionIdx={0} onClose={() => setActivePlan(null)} />
        )}
      </>
    )
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Join the Waitlist</h2>
      <p className="text-gray-600 mb-6">Be the first to know when we launch. Get early access and exclusive benefits.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="you@company.com" />
          </div>
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Your Role</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select id="role" required value={role} onChange={(e) => setRole(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white">
              <option value="">Select your role</option>
              <option value="Sales - SDR/BDR">Sales - SDR/BDR</option>
              <option value="Sales - AE">Sales - Account Executive</option>
              <option value="Sales - Manager">Sales - Manager</option>
              <option value="HR - Recruiter">HR - Recruiter</option>
              <option value="HR - Manager">HR - Manager</option>
              <option value="BDM">BDM</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}

        <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center space-x-2">
          {loading ? <><Loader2 className="h-5 w-5 animate-spin" /><span>Joining...</span></> : <span>Join Waitlist — Free</span>}
        </button>

        <p className="text-xs text-gray-500 text-center">By joining, you agree to receive updates about AideMeet. Unsubscribe anytime.</p>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-3">Free waitlist benefits:</p>
        <ul className="space-y-2 text-sm text-gray-600">
          {['Lifetime 30% discount on the Professional plan', 'Priority onboarding and support', 'Influence product roadmap with your feedback'].map(b => (
            <li key={b} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-lg px-3 py-2.5 text-xs text-primary-700">
          <Zap className="h-3.5 w-3.5 flex-shrink-0" />
          <span><strong>Want access now?</strong> After joining, you'll see paid early access options.</span>
        </div>
      </div>
    </div>
  )
}
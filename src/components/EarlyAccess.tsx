'use client'

import { useState } from 'react'
import {
  Zap, Users, Building2, Check, Star, Clock, ArrowRight,
  X, Loader2, CheckCircle, Mail, User, Briefcase, Video,
  FileText, Linkedin, Sparkles, Globe, Target, MessageSquare,
  CreditCard, PhoneCall,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Plan definitions
// ─────────────────────────────────────────────────────────────────────────────
const plans = [
  {
    id: 'founder',
    badge: '⚡ Only 50 Spots',
    badgeClass: 'bg-white/20 text-white border border-white/30',
    name: "Founder's Pass",
    subtitle: 'Personal Early Access',
    icon: Star,
    dark: true,
    options: [
      { label: '3 Months', price: '$49', note: 'one-time' },
      { label: '1 Year', price: '$99', note: 'vs $240/yr · best value' },
    ],
    features: [
      'Priority access in 24–48 hours',
      'Direct chat with the founder',
      'Lifetime "Founder" discount locked in',
      'Free upgrade to all future Pro features',
    ],
    spotsTotal: 50,
    spotsLeft: 23,
    cta: 'Reserve My Spot',
    availability: 'Access in 24–48 hrs',
    needsCompany: false,
    needsTeamSize: false,
  },
  {
    id: 'alpha',
    badge: 'Corporate Early pilot',
    badgeClass: 'bg-primary-100 text-primary-700',
    name: 'Alpha Team',
    subtitle: '60-day pilot · Up to 10 people',
    icon: Users,
    dark: false,
    options: [
      { label: 'Up to 5 people', price: '$99', note: '60 days · one-time' },
      { label: 'Up to 10 people', price: '$199', note: '60 days · one-time' },
    ],
    features: [
      'White-glove onboarding & integrations setup',
      'Direct influence on product roadmap',
      'Request one custom minor feature',
      '30-day success review call',
      'Video testimonial required (in exchange for deep discount)',
    ],
    spotsTotal: 10,
    spotsLeft: 7,
    cta: 'Apply for Corporate Early pilot',
    availability: 'Booking now',
    needsCompany: true,
    needsTeamSize: true,
  },
  {
    id: 'corporate',
    badge: 'Summer 2026',
    badgeClass: 'bg-gray-100 text-gray-600',
    name: 'Corporate Pilot',
    subtitle: 'Full turnkey · 60 days',
    icon: Building2,
    dark: false,
    options: [
      { label: '60 Days', price: '$1,200', note: 'team · all-inclusive' },
    ],
    features: [
      'Full HubSpot / Salesforce / Pipedrive setup',
      'Team onboarding & training sessions',
      'Private roadmap: request one feature',
      '30-day success review call',
      'Dedicated Slack channel with founder',
    ],
    cta: 'Pre-order for Summer 2026',
    availability: 'Pre-order open',
    needsCompany: true,
    needsTeamSize: true,
  },
]

export type Plan = (typeof plans)[0]

// ─────────────────────────────────────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────────────────────────────────────
type PersonalFormData = {
  firstName: string
  lastName: string
  email: string
  linkedin: string
  role: string
  meetingsPerWeek: string
  meetingPlatform: string
  notesStorage: string
  motivation: string
  option: string
}

type CorporateFormData = {
  firstName: string
  lastName: string
  email: string
  company: string
  website: string
  role: string
  teamSize: string
  crm: string
  meetingPlatform: string
  notesStorage: string
  pilotGoal: string
  isDecisionMaker: boolean
  agreeTestimonial: boolean
  option: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Reusable primitives
// ─────────────────────────────────────────────────────────────────────────────
function SpotsBar({ total, left, dark }: { total: number; left: number; dark: boolean }) {
  const pct = Math.round(((total - left) / total) * 100)
  return (
    <div className="mb-5">
      <div className="flex justify-between text-xs mb-1.5">
        <span className={dark ? 'text-white/50' : 'text-gray-400'}>{total - left} taken</span>
        <span className={`font-semibold ${dark ? 'text-blue-300' : 'text-primary-600'}`}>{left} left</span>
      </div>
      <div className={`w-full rounded-full h-1.5 ${dark ? 'bg-white/10' : 'bg-gray-100'}`}>
        <div
          className={`h-1.5 rounded-full ${dark ? 'bg-blue-400' : 'bg-primary-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3 mt-1">
      {children}
    </p>
  )
}

const inputCls =
  'w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white'
const inputNoPadCls =
  'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white'
const selectCls =
  'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition appearance-none'
const selectIconCls =
  'w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition appearance-none'

// ─────────────────────────────────────────────────────────────────────────────
// Success screen (shared)
// ─────────────────────────────────────────────────────────────────────────────
function SuccessScreen({
  plan,
  optionLabel,
  optionPrice,
  email,
  onClose,
}: {
  plan: Plan
  optionLabel: string
  optionPrice: string
  email: string
  onClose: () => void
}) {
  return (
    <div className="text-center py-4">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Application received!</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-5">
        We'll review your application and reach out personally within{' '}
        <span className="font-semibold text-gray-900">24 hours</span>.
      </p>
      <div className="bg-gray-50 rounded-xl p-4 text-left text-sm space-y-2 mb-5">
        {[
          ['Plan', plan.name],
          ['Option', `${optionLabel} — ${optionPrice}`],
          ['Contact', email],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <span className="text-gray-500">{k}</span>
            <span className="font-medium text-gray-900 truncate">{v}</span>
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        className="w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
      >
        Done
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PERSONAL FORM — Founder's Pass
// ─────────────────────────────────────────────────────────────────────────────
function FounderForm({
  plan,
  chosenOption,
  onSuccess,
}: {
  plan: Plan
  chosenOption: { label: string; price: string; note?: string }
  onSuccess: (email: string) => void
}) {
  const [form, setForm] = useState<PersonalFormData>({
    firstName: '',
    lastName: '',
    email: '',
    linkedin: '',
    role: '',
    meetingsPerWeek: '',
    meetingPlatform: '',
    notesStorage: '',
    motivation: '',
    option: `${chosenOption.label} — ${chosenOption.price}`,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set =
    (key: keyof PersonalFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }
    try {
      const SHEETS_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_URL || ''
      const payload = {
        type: 'early_access',
        plan: plan.name,
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email.trim().toLowerCase(),
        linkedin: form.linkedin,
        role: form.role,
        meetingsPerWeek: form.meetingsPerWeek,
        meetingPlatform: form.meetingPlatform,
        notesStorage: form.notesStorage,
        motivation: form.motivation,
        option: form.option,
        timestamp: new Date().toISOString(),
      }
      if (SHEETS_URL) {
        try {
          await fetch(SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
          console.log('Sheets: early access (personal) sent', payload)
        } catch (sheetsErr) {
          console.error('Sheets error (personal):', sheetsErr)
        }
      } else {
        console.warn('NEXT_PUBLIC_EARLY_ACCESS_URL not set — Sheets skipped')
        console.log('Early access (personal):', payload)
      }

      const WEB3 = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
      if (WEB3) {
        const web3res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3,
            subject: `⚡ Founder's Pass — ${form.firstName} ${form.lastName} (${chosenOption.price})`,
            from_name: `${form.firstName} ${form.lastName}`,
            replyto: form.email.trim().toLowerCase(),
            message: Object.entries(payload)
              .map(([k, v]) => `${k}: ${v}`)
              .join('\n'),
          }),
        })
        const web3data = await web3res.json()
        if (!web3data.success) {
          console.error('Web3Forms error (founder):', web3data)
        }
      }
      onSuccess(form.email.trim().toLowerCase())
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* About you */}
      <div>
        <SectionLabel>About You</SectionLabel>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={set('firstName')}
                  placeholder="Alex"
                  className={inputCls}
                />
              </div>
            </Field>
            <Field label="Last Name">
              <input
                type="text"
                required
                value={form.lastName}
                onChange={set('lastName')}
                placeholder="Johnson"
                className={inputNoPadCls}
              />
            </Field>
          </div>

          <Field label="Work Email" hint="@gmail reviewed 2nd">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                required
                value={form.email}
                onChange={set('email')}
                placeholder="alex@company.com"
                className={inputCls}
              />
            </div>
          </Field>

          <Field label="LinkedIn" hint="optional, but speeds up review">
            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="url"
                value={form.linkedin}
                onChange={set('linkedin')}
                placeholder="linkedin.com/in/yourname"
                className={inputCls}
              />
            </div>
          </Field>

          <Field label="Your Role">
            <select required value={form.role} onChange={set('role')} className={selectCls}>
              <option value="">Select your role</option>
              <option>Sales — SDR/BDR</option>
              <option>Sales — Account Executive</option>
              <option>Sales — Manager</option>
              <option>HR — Recruiter</option>
              <option>HR — Manager</option>
              <option>Account Manager</option>
              <option>Founder / CEO</option>
              <option>Other</option>
            </select>
          </Field>
        </div>
      </div>

      {/* Usage context */}
      <div>
        <SectionLabel>How You Work</SectionLabel>
        <div className="space-y-3">
          <Field label="Meetings per week">
            <select
              required
              value={form.meetingsPerWeek}
              onChange={set('meetingsPerWeek')}
              className={selectCls}
            >
              <option value="">Select frequency</option>
              <option>Less than 5</option>
              <option>5–15 meetings</option>
              <option>20+ meetings</option>
            </select>
          </Field>

          <Field label="Meeting platform">
            <div className="relative">
              <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                required
                value={form.meetingPlatform}
                onChange={set('meetingPlatform')}
                className={selectIconCls}
              >
                <option value="">Select platform</option>
                <option>Zoom</option>
                <option>Google Meet</option>
                <option>Microsoft Teams</option>
                <option>Mix of platforms</option>
              </select>
            </div>
          </Field>

          <Field label="Where do you store meeting notes?">
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                required
                value={form.notesStorage}
                onChange={set('notesStorage')}
                className={selectIconCls}
              >
                <option value="">Select option</option>
                <option>CRM (HubSpot / Salesforce / other)</option>
                <option>Notion / Confluence</option>
                <option>Google Docs</option>
                <option>Nowhere / memory</option>
                <option>Other</option>
              </select>
            </div>
          </Field>
        </div>
      </div>

      {/* Motivation */}
      <div>
        <SectionLabel>One Quick Question</SectionLabel>
        <Field
          label="What's your biggest pain with meetings right now?"
          hint="2–3 sentences is perfect"
        >
          <textarea
            required
            value={form.motivation}
            onChange={set('motivation')}
            rows={3}
            placeholder="e.g. I have 12 calls a week and forget half the promises I make by Friday…"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white resize-none"
          />
        </Field>
      </div>

      {/* Perks reminder */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex gap-3 items-start">
        <Star className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-700 leading-relaxed">
          As a Founder's Pass holder you get <strong>direct access to the founder</strong> and your
          pricing is <strong>locked for life</strong> — no matter how we grow.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Reserve My Spot <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="text-xs text-gray-400 text-center">
        No automatic charge — we'll confirm everything by email within 24 hours.
      </p>
    </form>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CORPORATE FORM — Alpha Team / Corporate Pilot
// ─────────────────────────────────────────────────────────────────────────────
function CorporateForm({
  plan,
  chosenOption,
  onSuccess,
}: {
  plan: Plan
  chosenOption: { label: string; price: string; note?: string }
  onSuccess: (email: string) => void
}) {
  const isAlpha = plan.id === 'alpha'

  const [form, setForm] = useState<CorporateFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    website: '',
    role: '',
    teamSize: '',
    crm: '',
    meetingPlatform: '',
    notesStorage: '',
    pilotGoal: '',
    isDecisionMaker: false,
    agreeTestimonial: false,
    option: `${chosenOption.label} — ${chosenOption.price}`,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set =
    (key: keyof CorporateFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))

  const toggle = (key: 'isDecisionMaker' | 'agreeTestimonial') => () =>
    setForm(f => ({ ...f, [key]: !f[key] }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid work email')
      setLoading(false)
      return
    }
    if (isAlpha && !form.agreeTestimonial) {
      setError('A short video testimonial is required for Alpha Team partners.')
      setLoading(false)
      return
    }
    try {
      const SHEETS_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_URL || ''
      const payload = {
        type: 'early_access',
        plan: plan.name,
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email.trim().toLowerCase(),
        company: form.company,
        website: form.website,
        role: form.role,
        teamSize: form.teamSize,
        crm: form.crm,
        meetingPlatform: form.meetingPlatform,
        notesStorage: form.notesStorage,
        pilotGoal: form.pilotGoal,
        isDecisionMaker: form.isDecisionMaker ? 'Yes' : 'No',
        agreeTestimonial: form.agreeTestimonial ? 'Yes' : 'No',
        option: form.option,
        timestamp: new Date().toISOString(),
      }
      if (SHEETS_URL) {
        try {
          await fetch(SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
          console.log('Sheets: early access (corporate) sent', payload)
        } catch (sheetsErr) {
          console.error('Sheets error (corporate):', sheetsErr)
        }
      } else {
        console.warn('NEXT_PUBLIC_EARLY_ACCESS_URL not set — Sheets skipped')
        console.log('Early access (corporate):', payload)
      }

      const WEB3 = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
      if (WEB3) {
        const web3res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3,
            subject: `🏢 ${plan.name} application — ${form.company} (${chosenOption.price})`,
            from_name: `${form.firstName} ${form.lastName} — ${form.company}`,
            replyto: form.email.trim().toLowerCase(),
            message: Object.entries(payload)
              .map(([k, v]) => `${k}: ${v}`)
              .join('\n'),
          }),
        })
        const web3data = await web3res.json()
        if (!web3data.success) {
          console.error('Web3Forms error (corporate):', web3data)
        }
      }
      onSuccess(form.email.trim().toLowerCase())
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Contact person */}
      <div>
        <SectionLabel>Your Contact Details</SectionLabel>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={set('firstName')}
                  placeholder="Alex"
                  className={inputCls}
                />
              </div>
            </Field>
            <Field label="Last Name">
              <input
                type="text"
                required
                value={form.lastName}
                onChange={set('lastName')}
                placeholder="Johnson"
                className={inputNoPadCls}
              />
            </Field>
          </div>

          <Field label="Work Email" hint="no Gmail/Yahoo">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                required
                value={form.email}
                onChange={set('email')}
                placeholder="alex@company.com"
                className={inputCls}
              />
            </div>
          </Field>

          <Field label="Your Title / Role">
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select required value={form.role} onChange={set('role')} className={selectIconCls}>
                <option value="">Select your role</option>
                <option>VP of Sales</option>
                <option>Head of Sales</option>
                <option>Sales Manager</option>
                <option>Head of HR / People</option>
                <option>HR Manager</option>
                <option>Talent Acquisition Lead</option>
                <option>Founder / CEO</option>
                <option>Other</option>
              </select>
            </div>
          </Field>

          {/* Decision-maker toggle */}
          <label className="flex items-center gap-3 cursor-pointer select-none group">
            <div
              onClick={toggle('isDecisionMaker')}
              className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 ${
                form.isDecisionMaker ? 'bg-primary-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                  form.isDecisionMaker ? 'translate-x-5' : ''
                }`}
              />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900">
              I'm the decision-maker / budget owner for this purchase
            </span>
          </label>
        </div>
      </div>

      {/* Company */}
      <div>
        <SectionLabel>Company Info</SectionLabel>
        <div className="space-y-3">
          <Field label="Company Name">
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                required
                value={form.company}
                onChange={set('company')}
                placeholder="Acme Inc."
                className={inputCls}
              />
            </div>
          </Field>

          <Field label="Company Website" hint="optional">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="url"
                value={form.website}
                onChange={set('website')}
                placeholder="https://acme.com"
                className={inputCls}
              />
            </div>
          </Field>

          <Field label="Team size needing access">
            <select required value={form.teamSize} onChange={set('teamSize')} className={selectCls}>
              <option value="">Select size</option>
              <option>2–5 people</option>
              <option>5–10 people</option>
              <option>10–25 people</option>
              <option>25+ people</option>
            </select>
          </Field>
        </div>
      </div>

      {/* Tech stack */}
      <div>
        <SectionLabel>Current Tech Stack</SectionLabel>
        <div className="space-y-3">
          <Field label="CRM your team uses">
            <select required value={form.crm} onChange={set('crm')} className={selectCls}>
              <option value="">Select CRM</option>
              <option>HubSpot</option>
              <option>Salesforce</option>
              <option>Pipedrive</option>
              <option>Zoho CRM</option>
              <option>No CRM / spreadsheets</option>
              <option>Other</option>
            </select>
          </Field>

          <Field label="Primary meeting platform">
            <div className="relative">
              <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                required
                value={form.meetingPlatform}
                onChange={set('meetingPlatform')}
                className={selectIconCls}
              >
                <option value="">Select platform</option>
                <option>Zoom</option>
                <option>Google Meet</option>
                <option>Microsoft Teams</option>
                <option>Mix of platforms</option>
              </select>
            </div>
          </Field>

          <Field label="Where does your team store meeting notes?">
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                required
                value={form.notesStorage}
                onChange={set('notesStorage')}
                className={selectIconCls}
              >
                <option value="">Select option</option>
                <option>CRM (HubSpot / Salesforce / other)</option>
                <option>Notion / Confluence</option>
                <option>Google Docs / Sheets</option>
                <option>Each person does their own thing</option>
                <option>Other</option>
              </select>
            </div>
          </Field>
        </div>
      </div>

      {/* Pilot goal */}
      <div>
        <SectionLabel>Pilot Goals</SectionLabel>
        <Field
          label="What do you want to achieve in 60 days?"
          hint="2–4 sentences"
        >
          <div className="relative">
            <Target className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <textarea
              required
              value={form.pilotGoal}
              onChange={set('pilotGoal')}
              rows={3}
              placeholder="e.g. We want our 8 AEs to spend less time on CRM updates and never miss a follow-up. Success = 50% fewer missed commitments in month 2."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white resize-none"
            />
          </div>
        </Field>
      </div>

      {/* Alpha-only: testimonial agreement */}
      {isAlpha && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <MessageSquare className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>Alpha Team includes a deep discount</strong> in exchange for a short (2–3 min)
              video testimonial at the end of the pilot, shared with your permission.
            </p>
          </div>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.agreeTestimonial}
              onChange={toggle('agreeTestimonial')}
              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 font-medium">
              I agree to provide a video testimonial at the end of the pilot
            </span>
          </label>
        </div>
      )}

      {/* What happens next */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">What happens next</p>
        <div className="space-y-1.5">
          {[
            { icon: PhoneCall, text: 'We review your application within 24 hours' },
            { icon: CreditCard, text: 'A short 15-min fit call to confirm scope & timeline' },
            { icon: Check, text: 'Onboarding call scheduled — pilot kicks off' },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-gray-600">
              <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <Icon className="h-3 w-3 text-primary-600" />
              </div>
              {text}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Submit Application <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="text-xs text-gray-400 text-center">
        No automated checkout — we'll reply personally within 24 hours.
      </p>
    </form>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Modal shell — picks the right form based on plan.needsCompany
// ─────────────────────────────────────────────────────────────────────────────
export function EarlyAccessModal({
  plan,
  selectedOptionIdx,
  onClose,
}: {
  plan: Plan
  selectedOptionIdx: number
  onClose: () => void
}) {
  const chosenOption = plan.options[selectedOptionIdx] ?? plan.options[0]
  const [successEmail, setSuccessEmail] = useState<string | null>(null)

  const isPersonal = !plan.needsCompany

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[93vh] overflow-y-auto">

        {/* Sticky header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 rounded-t-2xl px-7 pt-6 pb-4 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
                plan.dark ? 'bg-slate-900 text-blue-400' : 'bg-primary-100 text-primary-600'
              }`}
            >
              <plan.icon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{plan.name}</h3>
              <p className="text-xs text-gray-500">
                {chosenOption.label} ·{' '}
                <span className="font-semibold text-gray-700">{chosenOption.price}</span>
                {chosenOption.note ? ` · ${chosenOption.note}` : ''}
              </p>
            </div>
          </div>

          {/* Form type indicator */}
          <div className="mt-3 flex gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${
                isPersonal
                  ? 'bg-blue-50 text-blue-600 border border-blue-100'
                  : 'bg-purple-50 text-purple-600 border border-purple-100'
              }`}
            >
              {isPersonal ? (
                <>
                  <User className="h-3 w-3" /> Personal application
                </>
              ) : (
                <>
                  <Building2 className="h-3 w-3" /> Corporate application
                </>
              )}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          {successEmail ? (
            <SuccessScreen
              plan={plan}
              optionLabel={chosenOption.label}
              optionPrice={chosenOption.price}
              email={successEmail}
              onClose={onClose}
            />
          ) : isPersonal ? (
            <FounderForm
              plan={plan}
              chosenOption={chosenOption}
              onSuccess={setSuccessEmail}
            />
          ) : (
            <CorporateForm
              plan={plan}
              chosenOption={chosenOption}
              onSuccess={setSuccessEmail}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main section (unchanged visually)
// ─────────────────────────────────────────────────────────────────────────────
export default function EarlyAccess() {
  const [activePlan, setActivePlan] = useState<Plan | null>(null)
  const [selectedOption, setSelectedOption] = useState<Record<string, number>>({})

  return (
    <section
      id="early-access"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-950 via-primary-950 to-slate-900"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>Limited Early Access — Skip the Waitlist</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shape the Product.<br />
            <span className="text-blue-400">Lock In Your Price.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Join as an early customer. Get direct access to the founder,
            priority onboarding, and lifetime pricing — before public launch.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto items-start">
          {plans.map(plan => {
            const selIdx = selectedOption[plan.id] ?? 0
            const isDark = plan.dark

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-7 transition-transform ${
                  isDark
                    ? 'bg-slate-900 border-blue-500/40 shadow-2xl shadow-blue-500/10 md:-translate-y-4 ring-1 ring-blue-500/30'
                    : 'bg-white/5 border-white/10 backdrop-blur-sm hover:-translate-y-1'
                }`}
              >
                {/* Badge */}
                <div className="absolute -top-3.5 left-6">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${plan.badgeClass}`}>
                    {plan.badge}
                  </span>
                </div>

                {/* Icon & title */}
                <div
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 mt-2 ${
                    isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-slate-300'
                  }`}
                >
                  <plan.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold mb-0.5 text-white">{plan.name}</h3>
                <p className={`text-sm mb-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.subtitle}
                </p>

                {/* Spots bar */}
                {'spotsLeft' in plan && plan.spotsLeft !== undefined && (
                  <SpotsBar total={plan.spotsTotal!} left={plan.spotsLeft} dark={isDark} />
                )}

                {/* Price options */}
                <div className="space-y-2 mb-6">
                  {plan.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(s => ({ ...s, [plan.id]: idx }))}
                      className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                        selIdx === idx
                          ? isDark
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-primary-400 bg-primary-500/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div
                          className={`font-semibold text-sm ${
                            selIdx === idx ? 'text-white' : 'text-slate-400'
                          }`}
                        >
                          {opt.label}
                        </div>
                        <div className="text-xs text-slate-500">{opt.note}</div>
                      </div>
                      <div
                        className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-primary-400'}`}
                      >
                        {opt.price}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-7">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                          isDark ? 'text-blue-400' : 'text-primary-400'
                        }`}
                      />
                      <span className="text-slate-400">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Availability */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-5">
                  <Clock className="h-3.5 w-3.5" />
                  {plan.availability}
                </div>

                {/* Form type label on card */}
                <div className="mb-3">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      !plan.needsCompany
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-white/5 text-slate-500 border border-white/10'
                    }`}
                  >
                    {!plan.needsCompany ? (
                      <><User className="h-2.5 w-2.5" /> Personal form</>
                    ) : (
                      <><Building2 className="h-2.5 w-2.5" /> Corporate form</>
                    )}
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={() => setActivePlan(plan)}
                  className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    isDark
                      ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/25'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )
          })}
        </div>

        <p className="text-center text-sm text-slate-600 mt-10">
          No automated checkout — every application is reviewed personally within 24 hours.
        </p>
      </div>

      {activePlan && (
        <EarlyAccessModal
          plan={activePlan}
          selectedOptionIdx={selectedOption[activePlan.id] ?? 0}
          onClose={() => setActivePlan(null)}
        />
      )}
    </section>
  )
}
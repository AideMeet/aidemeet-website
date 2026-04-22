'use client'

import { useState } from 'react'
import {
  Zap, Users, Star, ArrowRight, X, Loader2, CheckCircle,
  Mail, User, Briefcase, Video, FileText, Linkedin,
  Sparkles, Gift, Rocket, TrendingUp, PhoneCall, Building2,
  Check, Clock, Globe, Target, MessageSquare, CreditCard,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export type Plan = {
  id: string; badge: string; badgeClass: string; name: string
  subtitle: string; icon: React.ComponentType<{ className?: string }>
  dark: boolean; options: { label: string; price: string; note: string }[]
  features: string[]; spotsTotal?: number; spotsLeft?: number
  cta: string; availability: string; needsCompany: boolean; needsTeamSize: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// Plan objects
// ─────────────────────────────────────────────────────────────────────────────
const founderPlan: Plan = {
  id: 'founder', badge: '⚡ Only 20 Spots', badgeClass: '',
  name: "Founder's Pass", subtitle: 'Personal Early Access',
  icon: Star, dark: true,
  options: [{ label: "Founder's Pass", price: '$49', note: 'one-time · 3 months Pro access' }],
  features: [
    '14-day free test with personal demo first',
    '3 months of Pro access ($60 value)',
    'Locked subscription rate: $15/mo for life',
    'Direct chat with the founder',
    'Priority onboarding & feature requests',
  ],
  spotsTotal: 20, spotsLeft: 15,
  cta: 'Start Free Test', availability: 'Access in 24–48 hrs',
  needsCompany: false, needsTeamSize: false,
}

const teamPlan: Plan = {
  id: 'team', badge: '6 spots left', badgeClass: '',
  name: 'Design Partner Program', subtitle: 'Teams of 2–10 people',
  icon: Users, dark: false,
  options: [
    { label: 'Up to 5 people', price: '$99', note: '/month · 1-month pilot' },
    { label: 'Up to 10 people', price: '$199', note: '/month · 1-month pilot' },
  ],
  features: [
    '14-day free test with setup & demo first',
    '1-month full-team pilot',
    'White-glove onboarding & CRM integrations',
    'Locked team rate: $20/user/mo after pilot (vs $35)',
    '30-day success review call with founder',
  ],
  spotsTotal: 7, spotsLeft: 6,
  cta: 'Apply for Team Pilot', availability: 'Booking now',
  needsCompany: true, needsTeamSize: true,
}

// ─────────────────────────────────────────────────────────────────────────────
// Timeline steps (no prices — just the flow)
// ─────────────────────────────────────────────────────────────────────────────
const steps = [
  { icon: Gift,        label: 'Free Test',    duration: '14 days',       note: 'Personal demo + first 3–5 recordings together. No card.', color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30', dot: 'bg-emerald-500' },
  { icon: Rocket,      label: 'Paid Pilot',   duration: '1 month',       note: 'Founder accompaniment. Price locked forever.',             color: 'text-blue-400',    bg: 'bg-blue-500/15 border-blue-500/30',       dot: 'bg-blue-500'    },
  { icon: TrendingUp,  label: 'Ongoing Plan', duration: 'Your locked rate', note: 'Monthly or annual at your early-access price.',         color: 'text-violet-400',  bg: 'bg-violet-500/15 border-violet-500/30',   dot: 'bg-violet-500'  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Spots bar
// ─────────────────────────────────────────────────────────────────────────────
function SpotsBar({ total, left }: { total: number; left: number }) {
  const pct = Math.round(((total - left) / total) * 100)
  return (
    <div className="mb-5">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-slate-500">{total - left} taken</span>
        <span className="font-semibold text-blue-400">{left} left</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-1.5">
        <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Form primitives
// ─────────────────────────────────────────────────────────────────────────────
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
  return <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3 mt-1">{children}</p>
}

const inputCls     = 'w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white'
const inputNoPadCls = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white'
const selectCls    = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition appearance-none'
const selectIconCls = 'w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition appearance-none'

// ─────────────────────────────────────────────────────────────────────────────
// Success screen
// ─────────────────────────────────────────────────────────────────────────────
function SuccessScreen({ plan, optionLabel, optionPrice, email, onClose }: {
  plan: Plan; optionLabel: string; optionPrice: string; email: string; onClose: () => void
}) {
  return (
    <div className="text-center py-4">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Application received!</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-1">
        We'll reach out within <span className="font-semibold text-gray-900">24 hours</span> to schedule your free demo.
      </p>
      <p className="text-gray-400 text-xs mb-5">No payment until after your free test.</p>
      <div className="bg-gray-50 rounded-xl p-4 text-left text-sm space-y-2 mb-5">
        {[['Plan', plan.name], ['Option', `${optionLabel} — ${optionPrice}`], ['Contact', email]].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <span className="text-gray-500">{k}</span>
            <span className="font-medium text-gray-900 truncate">{v}</span>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors">Done</button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PERSONAL FORM — Founder's Pass
// ─────────────────────────────────────────────────────────────────────────────
type PersonalFormData = {
  firstName: string; lastName: string; email: string; linkedin: string
  role: string; meetingsPerWeek: string; meetingPlatform: string
  notesStorage: string; motivation: string; option: string
}

function FounderForm({ plan, chosenOption, onSuccess }: {
  plan: Plan; chosenOption: { label: string; price: string; note?: string }; onSuccess: (email: string) => void
}) {
  const [form, setForm] = useState<PersonalFormData>({
    firstName: '', lastName: '', email: '', linkedin: '',
    role: '', meetingsPerWeek: '', meetingPlatform: '', notesStorage: '',
    motivation: '', option: `${chosenOption.label} — ${chosenOption.price}`,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (key: keyof PersonalFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address'); setLoading(false); return
    }
    try {
      const SHEETS = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || ''
      const payload = {
        type: 'early_access', plan: plan.name,
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email.trim().toLowerCase(),
        linkedin: form.linkedin, role: form.role,
        meetingsPerWeek: form.meetingsPerWeek, meetingPlatform: form.meetingPlatform,
        notesStorage: form.notesStorage, motivation: form.motivation,
        option: form.option, timestamp: new Date().toISOString(),
      }
      if (SHEETS) {
        await fetch(SHEETS, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      } else { console.log('Early access (personal):', payload) }

      const WEB3 = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
      if (WEB3) {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3,
            subject: `⚡ Founder's Pass — ${form.firstName} ${form.lastName} (${chosenOption.price})`,
            from_name: `${form.firstName} ${form.lastName}`,
            replyto: form.email.trim().toLowerCase(),
            message: Object.entries(payload).map(([k, v]) => `${k}: ${v}`).join('\n'),
          }),
        })
        const d = await res.json()
        if (!d.success) console.error('Web3Forms error (founder):', d)
      }
      onSuccess(form.email.trim().toLowerCase())
    } catch (err) { console.error(err); setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <SectionLabel>About You</SectionLabel>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" required value={form.firstName} onChange={set('firstName')} placeholder="Alex" className={inputCls} />
              </div>
            </Field>
            <Field label="Last Name">
              <input type="text" required value={form.lastName} onChange={set('lastName')} placeholder="Johnson" className={inputNoPadCls} />
            </Field>
          </div>
          <Field label="Work Email" hint="@gmail reviewed 2nd">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="email" required value={form.email} onChange={set('email')} placeholder="alex@company.com" className={inputCls} />
            </div>
          </Field>
          <Field label="LinkedIn" hint="optional, speeds up review">
            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="url" value={form.linkedin} onChange={set('linkedin')} placeholder="linkedin.com/in/yourname" className={inputCls} />
            </div>
          </Field>
          <Field label="Your Role">
            <select required value={form.role} onChange={set('role')} className={selectCls}>
              <option value="">Select your role</option>
              <option>Sales — SDR/BDR</option>
              <option>Sales — Account Executive</option>
              <option>Sales — Manager</option>

              <option>Account Manager</option>
              <option>Founder / CEO</option>
              <option>Other</option>
            </select>
          </Field>
        </div>
      </div>

      <div>
        <SectionLabel>How You Work</SectionLabel>
        <div className="space-y-3">
          <Field label="Meetings per week">
            <select required value={form.meetingsPerWeek} onChange={set('meetingsPerWeek')} className={selectCls}>
              <option value="">Select frequency</option>
              <option>Less than 5</option>
              <option>5–15 meetings</option>
              <option>20+ meetings</option>
            </select>
          </Field>
          <Field label="Meeting platform">
            <div className="relative">
              <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select required value={form.meetingPlatform} onChange={set('meetingPlatform')} className={selectIconCls}>
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
              <select required value={form.notesStorage} onChange={set('notesStorage')} className={selectIconCls}>
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

      <div>
        <SectionLabel>One Quick Question</SectionLabel>
        <Field label="What's your biggest pain with meetings right now?" hint="2–3 sentences is perfect">
          <textarea required value={form.motivation} onChange={set('motivation')} rows={3}
            placeholder="e.g. I have 12 calls a week and forget half the promises I make by Friday…"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white resize-none" />
        </Field>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex gap-3 items-start">
        <Star className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-700 leading-relaxed">
          As a Founder's Pass holder you get <strong>direct access to the founder</strong> and your pricing is <strong>locked for life</strong>.
        </p>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">{error}</div>}

      <button type="submit" disabled={loading}
        className="w-full py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-60">
        {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</> : <>Reserve My Spot <ArrowRight className="h-4 w-4" /></>}
      </button>
      <p className="text-xs text-gray-400 text-center">No automatic charge — we'll confirm everything by email within 24 hours.</p>
    </form>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CORPORATE FORM — Design Partner Program
// ─────────────────────────────────────────────────────────────────────────────
type CorporateFormData = {
  firstName: string; lastName: string; email: string; company: string
  website: string; role: string; teamSize: string; crm: string
  meetingPlatform: string; notesStorage: string; pilotGoal: string
  isDecisionMaker: boolean; agreeTestimonial: boolean; option: string
}

function CorporateForm({ plan, chosenOption, onSuccess }: {
  plan: Plan; chosenOption: { label: string; price: string; note?: string }; onSuccess: (email: string) => void
}) {
  const [form, setForm] = useState<CorporateFormData>({
    firstName: '', lastName: '', email: '', company: '', website: '',
    role: '', teamSize: '', crm: '', meetingPlatform: '', notesStorage: '',
    pilotGoal: '', isDecisionMaker: false, agreeTestimonial: false,
    option: `${chosenOption.label} — ${chosenOption.price}`,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (key: keyof CorporateFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))

  const toggle = (key: 'isDecisionMaker' | 'agreeTestimonial') => () =>
    setForm(f => ({ ...f, [key]: !f[key] }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid work email'); setLoading(false); return
    }
    if (!form.agreeTestimonial) {
      setError('A short video testimonial is required for Design Partners.'); setLoading(false); return
    }
    try {
      const SHEETS = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || ''
      const payload = {
        type: 'early_access', plan: plan.name,
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email.trim().toLowerCase(),
        company: form.company, website: form.website, role: form.role,
        teamSize: form.teamSize, crm: form.crm,
        meetingPlatform: form.meetingPlatform, notesStorage: form.notesStorage,
        pilotGoal: form.pilotGoal,
        isDecisionMaker: form.isDecisionMaker ? 'Yes' : 'No',
        agreeTestimonial: form.agreeTestimonial ? 'Yes' : 'No',
        option: form.option, timestamp: new Date().toISOString(),
      }
      if (SHEETS) {
        await fetch(SHEETS, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      } else { console.log('Early access (corporate):', payload) }

      const WEB3 = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
      if (WEB3) {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3,
            subject: `🏢 ${plan.name} — ${form.company} (${chosenOption.price})`,
            from_name: `${form.firstName} ${form.lastName} — ${form.company}`,
            replyto: form.email.trim().toLowerCase(),
            message: Object.entries(payload).map(([k, v]) => `${k}: ${v}`).join('\n'),
          }),
        })
        const d = await res.json()
        if (!d.success) console.error('Web3Forms error (corporate):', d)
      }
      onSuccess(form.email.trim().toLowerCase())
    } catch (err) { console.error(err); setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <SectionLabel>Your Contact Details</SectionLabel>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" required value={form.firstName} onChange={set('firstName')} placeholder="Alex" className={inputCls} />
              </div>
            </Field>
            <Field label="Last Name">
              <input type="text" required value={form.lastName} onChange={set('lastName')} placeholder="Johnson" className={inputNoPadCls} />
            </Field>
          </div>
          <Field label="Work Email" hint="no Gmail/Yahoo">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="email" required value={form.email} onChange={set('email')} placeholder="alex@company.com" className={inputCls} />
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

                <option>Founder / CEO</option>
                <option>Other</option>
              </select>
            </div>
          </Field>
          <label className="flex items-center gap-3 cursor-pointer select-none group">
            <div onClick={toggle('isDecisionMaker')}
              className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 ${form.isDecisionMaker ? 'bg-primary-500' : 'bg-gray-200'}`}>
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.isDecisionMaker ? 'translate-x-5' : ''}`} />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900">I'm the decision-maker / budget owner</span>
          </label>
        </div>
      </div>

      <div>
        <SectionLabel>Company Info</SectionLabel>
        <div className="space-y-3">
          <Field label="Company Name">
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" required value={form.company} onChange={set('company')} placeholder="Acme Inc." className={inputCls} />
            </div>
          </Field>
          <Field label="Company Website" hint="optional">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="url" value={form.website} onChange={set('website')} placeholder="https://acme.com" className={inputCls} />
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
              <select required value={form.meetingPlatform} onChange={set('meetingPlatform')} className={selectIconCls}>
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
              <select required value={form.notesStorage} onChange={set('notesStorage')} className={selectIconCls}>
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

      <div>
        <SectionLabel>Pilot Goals</SectionLabel>
        <Field label="What do you want to achieve in 30 days?" hint="2–4 sentences">
          <div className="relative">
            <Target className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <textarea required value={form.pilotGoal} onChange={set('pilotGoal')} rows={3}
              placeholder="e.g. We want our 8 AEs to spend less time on CRM updates and never miss a follow-up."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white resize-none" />
          </div>
        </Field>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3 mb-3">
          <MessageSquare className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Design Partner discount</strong> is in exchange for a short (2–3 min) video testimonial at the end of the pilot, shared with your permission.
          </p>
        </div>
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input type="checkbox" checked={form.agreeTestimonial} onChange={toggle('agreeTestimonial')}
            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
          <span className="text-sm text-gray-700 font-medium">I agree to provide a video testimonial at the end of the pilot</span>
        </label>
      </div>

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

      {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">{error}</div>}

      <button type="submit" disabled={loading}
        className="w-full py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-60">
        {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</> : <>Submit Application <ArrowRight className="h-4 w-4" /></>}
      </button>
      <p className="text-xs text-gray-400 text-center">No automated checkout — we'll reply personally within 24 hours.</p>
    </form>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Modal shell
// ─────────────────────────────────────────────────────────────────────────────
export function EarlyAccessModal({ plan, selectedOptionIdx, onClose }: {
  plan: Plan; selectedOptionIdx: number; onClose: () => void
}) {
  const [selIdx, setSelIdx] = useState(selectedOptionIdx)
  const chosenOption = plan.options[selIdx] ?? plan.options[0]
  const [successEmail, setSuccessEmail] = useState<string | null>(null)
  const isPersonal = !plan.needsCompany

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[93vh] overflow-y-auto">

        {/* Sticky header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 rounded-t-2xl px-7 pt-6 pb-4 z-10">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1">
            <X className="h-5 w-5" />
          </button>

          {/* Journey mini-steps */}
          <div className="flex items-center gap-1.5 mb-4">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="flex items-center gap-1">
                  <div className={`w-4 h-4 rounded-full ${s.dot} flex items-center justify-center`}>
                    <span className="text-white text-[9px] font-bold">{i + 1}</span>
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${i === 0 ? 'text-gray-700' : 'text-gray-400'}`}>{s.label}</span>
                </div>
                {i < 2 && <ArrowRight className="h-3 w-3 text-gray-300 flex-shrink-0" />}
              </div>
            ))}
            <span className="text-xs text-gray-400 ml-1">— starting with free test</span>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isPersonal ? 'bg-slate-900 text-blue-400' : 'bg-primary-100 text-primary-600'}`}>
              <plan.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{plan.name}</h3>
              <p className="text-xs text-gray-500">
                14 days free →{' '}
                <span className="font-semibold text-gray-700">
                  {isPersonal ? 'then $49 one-time · 3 months Pro' : `then ${chosenOption.price}/mo pilot`}
                </span>
              </p>
            </div>
          </div>

          {/* Team size selector (team only) */}
          {!isPersonal && plan.options.length > 1 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {plan.options.map((opt, idx) => (
                <button key={idx} onClick={() => setSelIdx(idx)}
                  className={`rounded-xl border px-3 py-2 text-left transition-all ${selIdx === idx ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}>
                  <div className="text-xs font-semibold text-gray-900">{opt.label}</div>
                  <div className="text-sm font-bold text-primary-600">{opt.price}<span className="text-xs font-normal text-gray-500">/mo</span></div>
                </button>
              ))}
            </div>
          )}

          <div className="mt-3">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${isPersonal ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-purple-50 text-purple-600 border border-purple-100'}`}>
              {isPersonal ? <><User className="h-3 w-3" /> Personal application</> : <><Building2 className="h-3 w-3" /> Corporate application</>}
            </span>
          </div>
        </div>

        <div className="px-7 py-6">
          {successEmail
            ? <SuccessScreen plan={plan} optionLabel={chosenOption.label} optionPrice={chosenOption.price} email={successEmail} onClose={onClose} />
            : isPersonal
              ? <FounderForm plan={plan} chosenOption={chosenOption} onSuccess={setSuccessEmail} />
              : <CorporateForm plan={plan} chosenOption={chosenOption} onSuccess={setSuccessEmail} />
          }
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────────────────────────
export default function EarlyAccess() {
  const [activePlan, setActivePlan] = useState<Plan | null>(null)

  return (
    <section id="early-access" className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-[80px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center space-x-2 bg-white/8 border border-white/15 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>Limited Early Access</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Your Path to AideMeet</h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto">No commitments upfront. We earn your trust step by step.</p>
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto mb-14">
          <div className="flex items-start gap-0">
            {steps.map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center relative">
                {i < steps.length - 1 && <div className="absolute top-5 left-1/2 w-full h-px bg-white/10" />}
                <div className={`relative z-10 w-10 h-10 rounded-full border ${step.bg} flex items-center justify-center mb-3`}>
                  <step.icon className={`h-4 w-4 ${step.color}`} />
                </div>
                <div className={`text-xs font-bold mb-0.5 ${step.color}`}>{step.label}</div>
                <div className="text-[10px] text-slate-600 font-medium mb-1">{step.duration}</div>
                <div className="text-[11px] text-slate-500 leading-snug px-2">{step.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Two CTA cards */}
        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">

          {/* Founder's Pass */}
          <div className="rounded-2xl border border-blue-500/40 bg-slate-900 p-7 shadow-2xl shadow-blue-500/10 ring-1 ring-blue-500/20 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                <Star className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg leading-tight">Founder's Pass</h3>
                <p className="text-xs text-slate-500">Personal Early Access</p>
              </div>
              <span className="text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-full whitespace-nowrap">⚡ 20 Spots</span>
            </div>
            <SpotsBar total={20} left={15} />
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/8 px-5 py-4 mb-5">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-white">$49</span>
                <span className="text-slate-400 text-sm">one-time</span>
              </div>
              <p className="text-xs text-slate-500">3 months Pro access · <span className="text-slate-400">$60 value</span></p>
              <p className="text-xs text-emerald-400 mt-1.5 font-medium">Then $15/mo locked for life (vs $20 public)</p>
            </div>
            <ul className="space-y-2.5 mb-6 flex-1">
              {founderPlan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400">{f}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setActivePlan(founderPlan)}
              className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
              <Gift className="h-4 w-4" />Start Free Test
            </button>
            <p className="text-xs text-slate-600 text-center mt-2.5">14 days free · no card required</p>
          </div>

          {/* Design Partner Program */}
          <div className="rounded-2xl border border-white/12 bg-white/4 backdrop-blur-sm p-7 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-slate-300 flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg leading-tight">Design Partner Program</h3>
                <p className="text-xs text-slate-500">1-month team pilot</p>
              </div>
              <span className="text-[10px] font-bold bg-white/8 text-slate-400 border border-white/15 px-2.5 py-1 rounded-full whitespace-nowrap">6 spots left</span>
            </div>
            <SpotsBar total={7} left={6} />
            <div className="grid grid-cols-2 gap-2 mb-2">
              {[{ label: 'Up to 5 people', price: '$99' }, { label: 'Up to 10 people', price: '$199' }].map((opt, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-[10px] text-slate-500 mb-1">{opt.label}</div>
                  <div className="text-xl font-bold text-white">{opt.price}</div>
                  <div className="text-[10px] text-slate-600">/month · pilot</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-emerald-400 font-medium mb-5">Then $20/user/mo locked (vs $35 public)</p>
            <ul className="space-y-2.5 mb-6 flex-1">
              {teamPlan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400">{f}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setActivePlan(teamPlan)}
              className="w-full py-3.5 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/18 transition-all flex items-center justify-center gap-2">
              <PhoneCall className="h-4 w-4" />Apply for Team Pilot
            </button>
            <p className="text-xs text-slate-600 text-center mt-2.5">14 days free · personal onboarding included</p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-700 mt-8">Every application is reviewed personally — expect a reply within 24 hours.</p>
      </div>

      {activePlan && <EarlyAccessModal plan={activePlan} selectedOptionIdx={0} onClose={() => setActivePlan(null)} />}
    </section>
  )
}

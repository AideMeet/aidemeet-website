'use client'

import Image from 'next/image'
import { ArrowUpRight, Mail } from 'lucide-react'

const FOUNDERS = [
  {
    name: 'Victoria Ashford',
    role: 'CEO & Founder',
    tagline:
      'Ex‑tech-sales leader who turned pipeline chaos into predictable revenue. Spent years closing deals, then built the unfair advantage she never had.',
    credentials: ['GTM & Sales Strategy', 'Partnerships', 'Revenue Growth'],
    photo: '/Victoria_s_photo.jpeg',
    contact: { type: 'email' as const, href: 'mailto:victoria@aidemeet.com', label: 'victoria@aidemeet.com' },
    accentColor: '#2563EB',
    accentBg: '#EFF6FF',
    accentBorder: '#BFDBFE',
    gradientFrom: '#1D4ED8',
    gradientTo: '#3B82F6',
  },
  {
    name: 'Muhammad Saqib',
    role: 'CTO & Co-founder',
    tagline:
      'Architected RAG pipelines and AI knowledge platform at Corbo.ai. Scaled high‑traffic backends for Sozie and Fayvo. 10+ years of production AI — the engine of AideMeet.',
    credentials: ['Python & AI/ML', 'AWS & Infra', 'RAG Pipelines'],
    photo: '/Muhammad_s_photo.jpeg',
    contact: { type: 'linkedin' as const, href: 'http://linkedin.com/in/saqirana', label: 'linkedin.com/in/saqirana' },
    accentColor: '#7C3AED',
    accentBg: '#F5F3FF',
    accentBorder: '#DDD6FE',
    gradientFrom: '#6D28D9',
    gradientTo: '#8B5CF6',
  },
  {
    name: 'Alex Ustinov',
    role: 'Frontend Engineer',
    tagline:
      '10+ years crafting enterprise frontends for RingCentral, Wildix, and Maropost — platforms with millions of users. Turns heavyweight B2B workflows into interfaces reps actually enjoy.',
    credentials: ['React & TypeScript', 'Electron', 'Enterprise UX'],
    photo: '/Alex_s_photo.jpeg',
    contact: { type: 'linkedin' as const, href: 'https://ua.linkedin.com/in/alexander-ustinov-3909a05', label: 'LinkedIn profile' },
    accentColor: '#0891B2',
    accentBg: '#ECFEFF',
    accentBorder: '#A5F3FC',
    gradientFrom: '#0E7490',
    gradientTo: '#06B6D4',
  },
]

export default function Founders() {
  return (
    <section id="team" className="py-16 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="inline-block mb-4 text-sm font-semibold px-4 py-1.5 rounded-full"
            style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE' }}
          >
            The Team
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#0F172A' }}>
            Built by people who've{' '}
            <span style={{ color: '#2563EB' }}>lived the problem.</span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: '#64748B' }}>
            Not researchers. Operators who've been in the room where deals are won and lost.
          </p>
        </div>

        {/* Cards — wider grid with taller photos */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {FOUNDERS.map((f) => (
            <div
              key={f.name}
              className="rounded-2xl overflow-hidden flex flex-col group"
              style={{
                background: '#FAFBFF',
                border: '1px solid #E8F0FF',
                boxShadow: '0 2px 12px rgba(37,99,235,0.05)',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 12px 32px rgba(37,99,235,0.12)'
                el.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 2px 12px rgba(37,99,235,0.05)'
                el.style.transform = 'translateY(0)'
              }}
            >
              {/* Accent bar + photo */}
              <div style={{ position: 'relative', width: '100%', flexShrink: 0 }}>
                <div style={{
                  height: 3,
                  background: `linear-gradient(90deg, ${f.gradientFrom}, ${f.gradientTo})`,
                  width: '100%',
                }} />
                {/* Photo area — increased height */}
                <div style={{ position: 'relative', width: '100%', height: 240, background: f.accentBg }}>
                  <Image
                    src={f.photo}
                    alt={f.name}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                  {/* Bottom fade */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: 48,
                    background: 'linear-gradient(to top, #FAFBFF, transparent)',
                  }} />
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-4 flex flex-col gap-2.5 flex-1" style={{ marginTop: -2 }}>
                <div>
                  <h3 className="font-bold text-sm" style={{ color: '#0F172A' }}>{f.name}</h3>
                  <span
                    className="inline-block text-[11px] font-semibold mt-1 px-2 py-0.5 rounded-full"
                    style={{ background: f.accentBg, color: f.accentColor, border: `1px solid ${f.accentBorder}` }}
                  >
                    {f.role}
                  </span>
                </div>

                <p className="text-[12.5px] leading-relaxed" style={{ color: '#475569' }}>
                  {f.tagline}
                </p>

                <div className="flex flex-wrap gap-1">
                  {f.credentials.map(c => (
                    <span
                      key={c}
                      className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                      style={{ background: f.accentBg, color: f.accentColor }}
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-2.5" style={{ borderTop: '1px solid #F1F5F9' }}>
                  <a
                    href={f.contact.href}
                    target={f.contact.type === 'linkedin' ? '_blank' : undefined}
                    rel={f.contact.type === 'linkedin' ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 text-[11px] font-medium"
                    style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = f.accentColor)}
                    onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    {f.contact.type === 'email' ? <Mail className="h-3 w-3" /> : (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                    {f.contact.label}
                    <ArrowUpRight className="h-2.5 w-2.5 opacity-60" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const FOUNDERS = [
  {
    name: 'Victoria Ashford',
    role: 'CEO & Founder',
    bio: 'Spent years in tech sales closing complex B2B deals — and got tired of losing winnable opportunities to poor preparation. Built AideMeet so every rep walks in knowing exactly what matters to the buyer.',
    skills: ['GTM Strategy', 'Partnerships', 'Revenue Growth'],
    photo: '/Victoria_s_photo.jpeg',
    link: { href: 'mailto:victoria@aidemeet.com', label: 'victoria@aidemeet.com' },
    accent: '#2563EB',
    accentLight: '#EFF6FF',
  },
  {
    name: 'Muhammad Saqib',
    role: 'CTO & Co-founder',
    bio: 'Architected RAG pipelines and production AI at Corbo.ai, Sozie, and Fayvo — platforms with millions of users. 10+ years shipping AI in production. The engine powering AideMeet\'s deal memory.',
    skills: ['Python & ML', 'AWS & Infra', 'RAG Systems'],
    photo: '/Muhammad_s_photo.jpeg',
    link: { href: 'http://linkedin.com/in/saqirana', label: 'linkedin.com/in/saqirana' },
    accent: '#7C3AED',
    accentLight: '#F5F3FF',
  },
  {
    name: 'Alex Ustinov',
    role: 'Frontend Engineer',
    bio: '10+ years building enterprise UIs at RingCentral, Wildix, and Maropost — products used by millions. Specialises in turning heavy B2B workflows into interfaces that reps actually enjoy using.',
    skills: ['React & TypeScript', 'Electron', 'Enterprise UX'],
    photo: '/Alex_s_photo.jpeg',
    link: { href: 'https://ua.linkedin.com/in/alexander-ustinov-3909a05', label: 'LinkedIn' },
    accent: '#059669',
    accentLight: '#ECFDF5',
  },
]

export default function Founders() {
  return (
    <section id="team" style={{ background: '#fff', padding: '88px 0', borderTop: '1px solid #F1F5F9' }}>
      <div className="section-container">

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: 'inline-block', marginBottom: 16,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
            padding: '5px 12px', borderRadius: 6,
            background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0',
          }}>
            The Team
          </div>
          <h2 style={{
            fontSize: 'clamp(26px,3.5vw,36px)', fontWeight: 700,
            letterSpacing: '-0.03em', color: '#0F172A', lineHeight: 1.15, margin: 0,
          }}>
            Built by operators,{' '}
            <span style={{
              background: 'linear-gradient(135deg,#2563EB,#7C3AED)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              not researchers
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}>
          {FOUNDERS.map((f) => (
            <div
              key={f.name}
              style={{
                background: '#fff',
                border: '1.5px solid #E2E8F0',
                borderRadius: 14,
                overflow: 'hidden',
                transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = f.accent + '40'
                el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.08)`
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = '#E2E8F0'
                el.style.boxShadow = 'none'
                el.style.transform = 'translateY(0)'
              }}
            >
              {/* Top accent bar */}
              <div style={{ height: 3, background: `linear-gradient(90deg, ${f.accent}, ${f.accent}33)` }} />

              {/* Photo + info row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px 0' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                  overflow: 'hidden', position: 'relative',
                  border: `2px solid ${f.accent}22`,
                  boxShadow: `0 0 0 3px ${f.accentLight}`,
                }}>
                  <Image
                    src={f.photo}
                    alt={f.name}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                    sizes="52px"
                  />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#0F172A', letterSpacing: '-0.01em' }}>
                    {f.name}
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 600, marginTop: 3,
                    color: f.accent, letterSpacing: '0.03em',
                  }}>
                    {f.role}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p style={{
                fontSize: 13.5, color: '#64748B', lineHeight: 1.65,
                padding: '14px 20px 0', margin: 0,
              }}>
                {f.bio}
              </p>

              {/* Skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '14px 20px' }}>
                {f.skills.map(s => (
                  <span key={s} style={{
                    fontSize: 11, fontWeight: 600, padding: '4px 9px',
                    borderRadius: 5, letterSpacing: '0.01em',
                    background: f.accentLight,
                    color: f.accent,
                    border: `1px solid ${f.accent}20`,
                  }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* Footer link */}
              <div style={{ borderTop: '1px solid #F1F5F9', padding: '11px 20px' }}>
                <a
                  href={f.link.href}
                  target={f.link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 12, color: '#94A3B8', textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = f.accent)}
                  onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
                >
                  {f.link.label}
                  <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
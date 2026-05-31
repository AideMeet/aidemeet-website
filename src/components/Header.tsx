'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const CALENDLY = 'https://calendly.com/victoria-ashford/demo'
const APP_URL   = 'https://app.aidemeet.com'

const NAV = [
  { label: 'Features',    id: 'features'    },
  { label: 'How It Works',id: 'how-it-works' },
  { label: 'Pricing',     id: 'pricing'      },
  { label: 'Team',        id: 'team'         },
  { label: 'FAQ',         id: 'faq'          },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [atHero, setAtHero]         = useState(true)

  useEffect(() => {
    const onScroll = () => setAtHero(window.scrollY < window.innerHeight * 0.82)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <header
      className="fixed top-0 w-full z-50"
      style={{
        background: atHero ? 'rgba(5,12,31,0.55)' : 'rgba(255,255,255,0.93)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: atHero
          ? '1px solid rgba(255,255,255,0.07)'
          : '1px solid rgba(209,227,255,0.55)',
        transition: 'background 0.45s ease, border-color 0.45s ease',
      }}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <Image src="/logo.jpg" alt="AideMeet" width={34} height={34} style={{ borderRadius: 9 }} />
            <span style={{
              fontSize: 17, fontWeight: 800, letterSpacing: '-0.025em',
              color: atHero ? '#F1F5F9' : '#0F172A',
              transition: 'color 0.35s ease',
            }}>
              AideMeet
            </span>
          </button>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center" style={{ gap: 2 }}>
            {NAV.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: atHero ? 'rgba(255,255,255,0.72)' : '#4B5563',
                  background: 'transparent',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = atHero ? '#fff' : '#111827'
                  e.currentTarget.style.background = atHero ? 'rgba(255,255,255,0.09)' : '#F0F6FF'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = atHero ? 'rgba(255,255,255,0.72)' : '#4B5563'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('pilot')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold ml-1 transition-all duration-200"
              style={{ color: '#F59E0B' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = atHero ? 'rgba(245,158,11,0.12)' : '#FFFBEB'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              Pilot
            </button>
          </nav>

          {/* ── CTA buttons ── */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
  href={APP_URL}
  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
  style={{
    color: atHero ? 'rgba(255,255,255,0.8)' : '#2563EB',
    border: atHero ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid rgba(37,99,235,0.3)',
    background: 'transparent',
    textDecoration: 'none',
    display: 'inline-block',
    cursor: 'pointer',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.background = atHero ? 'rgba(255,255,255,0.08)' : '#EFF6FF'
    e.currentTarget.style.color = atHero ? '#fff' : '#1D4ED8'
  }}
  onMouseLeave={e => {
    e.currentTarget.style.background = 'transparent'
    e.currentTarget.style.color = atHero ? 'rgba(255,255,255,0.8)' : '#2563EB'
  }}
>
  Start free trial
</a>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg text-sm font-bold text-white"
              style={{
                background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
                boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
                textDecoration: 'none',
                transition: 'box-shadow 0.2s ease, transform 0.15s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.boxShadow = '0 6px 20px rgba(37,99,235,0.55)'
                el.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.boxShadow = '0 4px 14px rgba(37,99,235,0.4)'
                el.style.transform = 'translateY(0)'
              }}
            >
              Book Demo →
            </a>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              color: atHero ? 'rgba(255,255,255,0.8)' : '#374151',
              background: isMenuOpen
                ? (atHero ? 'rgba(255,255,255,0.1)' : '#F3F4F6')
                : 'transparent',
            }}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {isMenuOpen && (
          <div
            className="md:hidden py-3 space-y-1 border-t"
            style={{ borderColor: atHero ? 'rgba(255,255,255,0.08)' : '#E8F0FF' }}
          >
            {NAV.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium"
                style={{ color: atHero ? 'rgba(255,255,255,0.75)' : '#4B5563' }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('pilot')}
              className="block w-full text-left px-4 py-2.5 text-amber-500 font-semibold text-sm"
            >
              🔥 Pilot Program
            </button>
            <div className="pt-2 flex flex-col gap-2 px-2">
              <button
                onClick={() => scrollTo('pilot')}
                className="w-full py-2.5 rounded-xl text-sm font-semibold"
                style={{
                  color: atHero ? 'rgba(255,255,255,0.85)' : '#2563EB',
                  border: atHero ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid #BFDBFE',
                  background: 'transparent',
                }}
              >
                Start trial — Free
              </button>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2.5 rounded-xl text-sm font-bold text-white text-center"
                style={{
                  background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
                  textDecoration: 'none',
                }}
              >
                Book Demo →
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
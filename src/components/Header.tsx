'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const CALENDLY = 'https://calendly.com/victoria-werner/demo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <header
      className="fixed top-0 w-full z-50"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(209,227,255,0.6)',
      }}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image src="/logo.jpg" alt="AideMeet Logo" width={36} height={36} className="rounded-lg" />
            <span className="text-xl font-bold" style={{ color: '#0F172A' }}>AideMeet</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { label: 'Features',    id: 'features'  },
              { label: 'Why Us',      id: 'why-us'    },
              { label: 'Pricing',     id: 'pricing'   },
              { label: 'FAQ',         id: 'faq'       },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ color: '#475569' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F0F6FF')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('early-access')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
              style={{ color: '#D97706' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#FFFBEB')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              Early Access
            </button>
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollToSection('early-access')}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ color: '#2563EB', border: '1.5px solid rgba(37,99,235,0.3)' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#EFF6FF')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Get Early Access
            </button>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all"
              style={{
                background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
                boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
              }}
            >
              Book Demo →
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen
              ? <X className="h-5 w-5 text-gray-700" />
              : <Menu className="h-5 w-5 text-gray-700" />
            }
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t" style={{ borderColor: '#E8F0FF' }}>
            {['features','why-us','pricing','faq'].map(id => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="block w-full text-left px-4 py-2 rounded-lg text-sm font-medium capitalize"
                style={{ color: '#475569' }}
              >
                {id.replace('-', ' ')}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('early-access')}
              className="block w-full text-left px-4 py-2 text-amber-600 font-semibold text-sm"
            >
              🔥 Early Access
            </button>
            <button
              onClick={() => scrollToSection('early-access')}
              className="block w-full text-left px-4 py-2 text-sm font-medium"
              style={{ color: '#2563EB' }}
            >
              Get Early Access — Free
            </button>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full mt-2 py-2.5 rounded-xl text-sm font-semibold text-white text-center"
              style={{ background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)' }}
            >
              Book Demo →
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
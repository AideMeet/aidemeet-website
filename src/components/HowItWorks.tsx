'use client'

import { Calendar, Zap, Brain, ArrowRight, CheckCircle } from 'lucide-react'

const APP_URL = 'https://app.aidemeet.com'

const STEPS = [
  {
    number: '01',
    icon: Calendar,
    title: 'Connect your calendar',
    description:
      'Link Google Calendar in one click. AideMeet auto-joins your Zoom or Meet calls — no manual setup, no bots to configure.',
    detail: 'Works with Zoom · Google Meet · Teams',
    accent:   '#2563EB',
    accentBg: '#EFF6FF',
    accentMid: 'rgba(37,99,235,0.12)',
  },
  {
    number: '02',
    icon: Zap,
    title: 'AI transcribes & extracts',
    description:
      'Every call is transcribed in 99+ languages, summarized, and broken into action items, objections, and promises — in under 3 minutes.',
    detail: '< 3 min processing · 99+ languages',
    accent:   '#7C3AED',
    accentBg: '#F5F3FF',
    accentMid: 'rgba(124,58,237,0.12)',
  },
  {
    number: '03',
    icon: Brain,
    title: 'Get your pre-meeting brief',
    description:
      '1 hour before every call, your rep receives a one-page brief: full deal history, past promises, open objections, and suggested questions. Zero prep time.',
    detail: 'Auto-delivered 1h before every call',
    accent:   '#0891B2',
    accentBg: '#ECFEFF',
    accentMid: 'rgba(8,145,178,0.12)',
  },
  {
    number: '04',
    icon: ArrowRight,
    title: 'Sync to CRM in one click',
    description:
      'After the call, AI pushes action items, deal stage, and full context to HubSpot, Salesforce, or Pipedrive. No manual entry. Ever.',
    detail: 'HubSpot · Salesforce · Pipedrive',
    accent:   '#059669',
    accentBg: '#ECFDF5',
    accentMid: 'rgba(5,150,105,0.12)',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{ background: '#fff', padding: '104px 0', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #E8F0FF' }}
    >
      <div className="section-container">

        {/* ── Header ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '0 80px', alignItems: 'end', marginBottom: 72,
        }}
          className="hiw-header"
        >
          <div>
            <div style={{
              display: 'inline-block', marginBottom: 16,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
              padding: '5px 12px', borderRadius: 6,
              background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE',
            }}>
              How it works
            </div>
            <h2 style={{
              fontSize: 'clamp(30px,4vw,44px)', fontWeight: 800,
              letterSpacing: '-0.038em', color: '#0F172A',
              lineHeight: 1.07, margin: 0,
            }}>
              From first call to
              <br />
              <span style={{
                background: 'linear-gradient(135deg,#2563EB,#7C3AED)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                closed deal — automated
              </span>
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.7, margin: '0 0 20px' }}>
              AideMeet runs quietly in the background. Your reps show up prepared, follow up faster, and never lose context between calls.
            </p>
            <a
              href={APP_URL}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '11px 20px', borderRadius: 9,
                background: '#0F172A', color: '#fff',
                fontWeight: 600, fontSize: 13.5,
                textDecoration: 'none',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
            >
              Start free trial <ArrowRight size={13} />
            </a>
          </div>
        </div>

        {/* ── Steps ── */}
        <div style={{ position: 'relative' }}>

          {/* Vertical connecting line */}
          <div style={{
            position: 'absolute',
            left: 27,
            top: 52, bottom: 52,
            width: 1.5,
            background: 'linear-gradient(180deg, #BFDBFE 0%, #DDD6FE 33%, #BAE6FD 66%, #A7F3D0 100%)',
            zIndex: 0,
          }}
            className="hiw-line"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '56px 1fr',
                  gap: '0 28px',
                  position: 'relative',
                  zIndex: 1,
                }}
                className="hiw-step"
              >
                {/* ── Left: number badge ── */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 18, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: step.accentBg,
                    border: `2px solid ${step.accent}22`,
                    boxShadow: `0 4px 16px ${step.accent}20`,
                    zIndex: 2,
                  }}>
                    <step.icon size={22} color={step.accent} />
                  </div>
                  {/* Spacer line segment */}
                  {i < STEPS.length - 1 && (
                    <div style={{ flex: 1, width: 1.5, background: 'transparent', minHeight: 24 }} />
                  )}
                </div>

                {/* ── Right: content card ── */}
                <div style={{
                  background: '#FAFBFF',
                  border: '1.5px solid #E8F0FF',
                  borderRadius: 16,
                  padding: '28px 32px',
                  marginBottom: i < STEPS.length - 1 ? 16 : 0,
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = step.accent + '40'
                    el.style.boxShadow = `0 8px 32px ${step.accent}12`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = '#E8F0FF'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Step label */}
                      <div style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                        color: step.accent, marginBottom: 8,
                      }}>
                        STEP {step.number}
                      </div>
                      <h3 style={{
                        fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em',
                        color: '#0F172A', lineHeight: 1.3, margin: '0 0 10px',
                      }}>
                        {step.title}
                      </h3>
                      <p style={{
                        fontSize: 14.5, color: '#64748B', lineHeight: 1.7, margin: '0 0 16px',
                      }}>
                        {step.description}
                      </p>
                      {/* Detail chip */}
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 11.5, fontWeight: 600, color: step.accent,
                        background: step.accentBg,
                        padding: '5px 12px', borderRadius: 6,
                        border: `1px solid ${step.accent}18`,
                      }}>
                        <CheckCircle size={11} />
                        {step.detail}
                      </div>
                    </div>
                    {/* Big step number (decorative) */}
                    <div style={{
                      fontSize: 80, fontWeight: 900, lineHeight: 1,
                      color: step.accent, opacity: 0.07,
                      letterSpacing: '-0.06em',
                      userSelect: 'none', flexShrink: 0,
                      alignSelf: 'center',
                    }}>
                      {step.number}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom strip ── */}
        <div style={{
          marginTop: 40,
          background: 'linear-gradient(135deg,#0F172A,#1E293B)',
          borderRadius: 16,
          padding: '28px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
        }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#F1F5F9', marginBottom: 4 }}>
              Set up in under 5 minutes
            </div>
            <div style={{ fontSize: 13.5, color: '#64748B' }}>
              Connect your calendar, join a call, and AideMeet handles the rest.
            </div>
          </div>
          <a
            href={APP_URL}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 10,
              background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
              boxShadow: '0 6px 20px rgba(37,99,235,0.45)',
              color: '#fff', fontWeight: 700, fontSize: 14,
              textDecoration: 'none', flexShrink: 0,
              transition: 'box-shadow 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.boxShadow = '0 10px 28px rgba(37,99,235,0.6)'
              el.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.boxShadow = '0 6px 20px rgba(37,99,235,0.45)'
              el.style.transform = 'translateY(0)'
            }}
          >
            Start free trial <ArrowRight size={15} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hiw-header {
            grid-template-columns: 1fr !important;
            gap: 24px 0 !important;
          }
          .hiw-line { display: none; }
          .hiw-step {
            grid-template-columns: 44px 1fr !important;
            gap: 0 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
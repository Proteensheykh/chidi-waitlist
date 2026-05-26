'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type React from 'react'
import { Mark } from '@/components/chidi/chidi-mark'

interface YourWorkInSyncProps {
  width?: number | string
  height?: number | string
  className?: string
  theme?: 'light' | 'dark'
  startDelay?: number
}

type Phase =
  | 'idle'
  | 'cust1'
  | 'drafting'
  | 'shop1'
  | 'shop2'
  | 'cust2'
  | 'suggests'
  | 'chipTap'
  | 'composerFilled'
  | 'sent'
  | 'reset'

const YourWorkInSync: React.FC<YourWorkInSyncProps> = ({
  width = 340,
  height = 340,
  className = '',
  theme = 'light',
  startDelay = 0,
}) => {
  const isDark = theme === 'dark'
  const appBg = isDark ? '#1C1917' : '#F5F1EB'
  const surface = isDark ? '#292524' : '#FFFFFF'
  const borderSubtle = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(40,30,20,0.06)'
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(40,30,20,0.10)'
  const textPrimary = isDark ? '#E7E5E4' : '#1F1B16'
  const textMuted = isDark ? '#A8A29E' : '#74695F'
  const customerBubble = '#FFFFFF'
  const shopBubble = '#C6EFAA'
  const shopBubbleText = '#1B2E0F'
  const peachPillBg = '#F6DCC0'
  const peachPillText = '#9A5A21'

  const ref = useRef<HTMLDivElement | null>(null)
  const [armed, setArmed] = useState(false)
  const [shown, setShown] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setShown(true)
      setPhase('sent')
      return
    }
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setArmed(true)
            obs.disconnect()
            return
          }
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!armed) return
    const t = setTimeout(() => setShown(true), startDelay)
    return () => clearTimeout(t)
  }, [armed, startDelay])

  // Conversation choreography loop
  useEffect(() => {
    if (!shown) return
    let alive = true
    const timers: ReturnType<typeof setTimeout>[] = []

    const cycle = () => {
      if (!alive) return
      setPhase('idle')
      const seq: [Phase, number][] = [
        ['cust1', 300],
        ['drafting', 900],
        ['shop1', 1700],
        ['shop2', 2700],
        ['cust2', 3800],
        ['suggests', 4700],
        ['chipTap', 6000],
        ['composerFilled', 6500],
        ['sent', 7400],
        ['reset', 11000],
      ]
      seq.forEach(([p, t]) => {
        timers.push(setTimeout(() => alive && setPhase(p), t))
      })
      timers.push(setTimeout(cycle, 12000))
    }

    cycle()
    return () => {
      alive = false
      timers.forEach(clearTimeout)
    }
  }, [shown])

  const shown1 = ['cust1', 'drafting', 'shop1', 'shop2', 'cust2', 'suggests', 'chipTap', 'composerFilled', 'sent'].includes(phase)
  const shownDraft = phase === 'drafting'
  const shown2 = ['shop1', 'shop2', 'cust2', 'suggests', 'chipTap', 'composerFilled', 'sent'].includes(phase)
  const shown3 = ['shop2', 'cust2', 'suggests', 'chipTap', 'composerFilled', 'sent'].includes(phase)
  const shown4 = ['cust2', 'suggests', 'chipTap', 'composerFilled', 'sent'].includes(phase)
  const shownSent = phase === 'sent'
  const suggestsShown = ['suggests', 'chipTap', 'composerFilled', 'sent'].includes(phase)
  const chipActive = ['chipTap', 'composerFilled'].includes(phase)
  const composerFilled = ['composerFilled', 'sent'].includes(phase)

  return (
    <div
      ref={ref}
      className={className}
      style={{ width, height, position: 'relative', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      role="img"
      aria-label="Chat with Kemi: Chidi drafts a fast reply, you tap a suggestion, it sends"
    >
      <style jsx>{`
        .yws-card { opacity: 0; transform: translateY(8px); transition: opacity 360ms ease-out, transform 360ms cubic-bezier(0.22, 1, 0.36, 1); }
        .yws-card.in { opacity: 1; transform: translateY(0); }
        .yws-fade { opacity: 0; transform: translateY(6px) scale(0.97); transition: opacity 280ms ease-out, transform 360ms cubic-bezier(0.34, 1.4, 0.64, 1); }
        .yws-fade.in { opacity: 1; transform: translateY(0) scale(1); }
        .yws-fade.out { opacity: 0; transform: translateY(-4px) scale(0.97); transition: opacity 240ms ease-out, transform 240ms ease-out; }
        .yws-speedbadge { animation: ywsRise 1.4s ease-out forwards; }
        @keyframes ywsRise { 0% { opacity: 0; transform: translateY(0) scale(0.9); } 30% { opacity: 1; transform: translateY(-6px) scale(1); } 70% { opacity: 1; transform: translateY(-9px) scale(1); } 100% { opacity: 0; transform: translateY(-14px) scale(1); } }
        .yws-chip { transition: background 220ms ease-out, transform 220ms ease-out, box-shadow 220ms ease-out; }
        .yws-chip.glow { background: #1F1B16 !important; color: #F4DDC2 !important; transform: scale(1.04); box-shadow: 0 0 0 4px rgba(31, 27, 22, 0.10); }
        .yws-composer.filled { background: #F8F5F0 !important; }
        .yws-send.fire { animation: ywsSend 700ms ease-out; }
        @keyframes ywsSend { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6); } 40% { transform: scale(1.18); box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); } 100% { transform: scale(1); } }
        .yws-typing-dot { width: 4px; height: 4px; border-radius: 999px; display: inline-block; background: ${textMuted}; animation: ywsDots 1s ease-in-out infinite; }
        .yws-typing-dot:nth-child(1) { animation-delay: 0ms; }
        .yws-typing-dot:nth-child(2) { animation-delay: 130ms; }
        .yws-typing-dot:nth-child(3) { animation-delay: 260ms; }
        @keyframes ywsDots { 0%, 70%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-3px); opacity: 1; } }
      `}</style>

      <div
        className={`yws-card ${shown ? 'in' : ''}`}
        style={{
          width: 340,
          height: '100%',
          maxHeight: 460,
          background: appBg,
          borderRadius: 18,
          boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.10), 0 0 0 1px ' + border,
          overflow: 'hidden',
          fontFamily: 'Inter, sans-serif',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Customer header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderBottom: '1px solid ' + borderSubtle, background: appBg }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: 26, height: 26, borderRadius: 999, overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/testimonial-kemi.jpg" alt="Kemi" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ position: 'absolute', right: -1, bottom: -1, width: 7, height: 7, borderRadius: 999, background: '#22C55E', border: '1.5px solid ' + appBg }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span style={{ fontWeight: 600, fontSize: 12, color: textPrimary, letterSpacing: '-0.005em' }}>Kemi Ad…</span>
            <span style={{ fontSize: 9, fontWeight: 500, color: textMuted }}>14 orders · beauty</span>
          </div>
          <span style={{ marginLeft: 4, background: peachPillBg, color: peachPillText, fontSize: 8.5, fontWeight: 600, padding: '2px 8px', borderRadius: 999 }}>Needs you</span>
        </div>

        {/* Chat body */}
        <div style={{ padding: '8px 12px 4px', display: 'flex', flexDirection: 'column', gap: 5, flex: 1, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span style={{ fontSize: 8.5, fontWeight: 500, color: textMuted, background: surface, padding: '2px 8px', borderRadius: 999, border: '1px solid ' + borderSubtle }}>Today</span>
          </div>

          {/* Customer 1 */}
          <div className={`yws-fade ${shown1 ? 'in' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
            <div style={{ background: customerBubble, color: textPrimary, borderRadius: 12, borderBottomLeftRadius: 3, padding: '7px 11px', fontSize: 11, lineHeight: 1.4, maxWidth: 220, border: '1px solid ' + borderSubtle }}>
              The Ngozi maxi, can I exchange size?
            </div>
            <span style={{ fontSize: 8, color: textMuted, paddingLeft: 4 }}>08:38</span>
          </div>

          {/* Chidi drafting indicator */}
          <div className={`yws-fade ${shownDraft ? 'in' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 4 }}>
            <Mark size={11} variant="default" />
            <span style={{ fontSize: 9, fontWeight: 500, color: textMuted, fontStyle: 'italic' }}>Chidi drafting…</span>
            <span style={{ display: 'inline-flex', gap: 2, marginLeft: 2 }}>
              <span className="yws-typing-dot" />
              <span className="yws-typing-dot" />
              <span className="yws-typing-dot" />
            </span>
          </div>

          {/* Shop 1 + speed badge */}
          <div className={`yws-fade ${shown2 ? 'in' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, position: 'relative' }}>
            <div style={{ background: shopBubble, color: shopBubbleText, borderRadius: 12, borderBottomRightRadius: 3, padding: '7px 11px', fontSize: 11, lineHeight: 1.4, maxWidth: 220 }}>
              Let me check that for you — one moment.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingRight: 4 }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="#22C55E" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
              <span style={{ fontSize: 8, fontWeight: 600, color: '#15803D' }}>0.4s</span>
              {phase === 'shop1' && (
                <span className="yws-speedbadge" style={{ position: 'absolute', right: 4, top: -2, fontSize: 9, fontWeight: 700, color: '#15803D', background: 'rgba(34, 197, 94, 0.18)', padding: '2px 6px', borderRadius: 999 }}>
                  Auto-sent · 0.4s
                </span>
              )}
            </div>
          </div>

          {/* Shop 2 */}
          <div className={`yws-fade ${shown3 ? 'in' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
            <div style={{ background: shopBubble, color: shopBubbleText, borderRadius: 12, borderBottomRightRadius: 3, padding: '7px 11px', fontSize: 11, lineHeight: 1.4, maxWidth: 220 }}>
              Yes, we have it. Want me to set one aside?
            </div>
            <span style={{ fontSize: 8, color: textMuted, paddingRight: 4 }}>08:38</span>
          </div>

          {/* Customer 2 */}
          <div className={`yws-fade ${shown4 ? 'in' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
            <div style={{ background: customerBubble, color: textPrimary, borderRadius: 12, borderBottomLeftRadius: 3, padding: '7px 11px', fontSize: 11, lineHeight: 1.4, maxWidth: 220, border: '1px solid ' + borderSubtle }}>
              Yes please, I&apos;ll pay this evening.
            </div>
            <span style={{ fontSize: 8, color: textMuted, paddingLeft: 4 }}>11:08</span>
          </div>

          {/* Confirmation shop bubble after chip-fly */}
          {shownSent && (
            <div className="yws-fade in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
              <div style={{ background: shopBubble, color: shopBubbleText, borderRadius: 12, borderBottomRightRadius: 3, padding: '7px 11px', fontSize: 11, lineHeight: 1.4, maxWidth: 240 }}>
                Bank: GTBank 0123456789 — Onyema
              </div>
              <span style={{ fontSize: 8, color: textMuted, paddingRight: 4 }}>11:09</span>
            </div>
          )}
        </div>

        {/* Chidi suggests */}
        <div style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, borderTop: '1px solid ' + borderSubtle, opacity: suggestsShown ? 1 : 0.35, transition: 'opacity 300ms ease-out' }}>
          <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.08em', color: textMuted, textTransform: 'uppercase', flexShrink: 0 }}>Chidi suggests</span>
          <div style={{ display: 'flex', gap: 4, overflow: 'hidden', flex: 1 }}>
            <span
              className={`yws-chip ${chipActive ? 'glow' : ''}`}
              style={{
                fontSize: 9,
                fontWeight: 500,
                color: textPrimary,
                background: surface,
                padding: '3px 8px',
                borderRadius: 999,
                border: '1px solid ' + borderSubtle,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 150,
              }}
            >
              Bank: GTBank 0123456789…
            </span>
            <span style={{ fontSize: 9, fontWeight: 500, color: textPrimary, background: surface, padding: '3px 8px', borderRadius: 999, border: '1px solid ' + borderSubtle, whiteSpace: 'nowrap' }}>
              Got it, che…
            </span>
          </div>
        </div>

        {/* Composer */}
        <div style={{ padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 6, borderTop: '1px solid ' + borderSubtle, background: appBg }}>
          <div
            className={`yws-composer ${composerFilled ? 'filled' : ''}`}
            style={{
              flex: 1,
              background: surface,
              borderRadius: 999,
              padding: '7px 12px',
              border: '1px solid ' + borderSubtle,
              fontSize: 10.5,
              fontWeight: composerFilled ? 500 : 400,
              color: composerFilled ? textPrimary : textMuted,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              transition: 'background 240ms ease-out, color 240ms ease-out',
            }}
          >
            {composerFilled ? 'Bank: GTBank 0123456789 — Onyema' : 'Type your reply…'}
          </div>
          {/* Mic */}
          <div style={{ width: 26, height: 26, borderRadius: 999, background: surface, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid ' + borderSubtle, flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={textPrimary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="2" width="6" height="11" rx="3" />
              <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>
          {/* Send */}
          <div className={`yws-send ${phase === 'sent' ? 'fire' : ''}`} style={{ width: 26, height: 26, borderRadius: 999, background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourWorkInSync

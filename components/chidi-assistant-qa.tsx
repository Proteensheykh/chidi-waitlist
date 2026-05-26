'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import type React from 'react'
import { Mark } from '@/components/chidi/chidi-mark'

interface ChidiAssistantQAProps {
  width?: number | string
  height?: number | string
  className?: string
  theme?: 'light' | 'dark'
  startDelay?: number
}

const QUERY = 'What should I focus on today?'

const ShopAvatar: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" style={{ borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
    <rect width="20" height="20" fill="#A85A28" />
    <g fill="#7A4019" opacity="0.55">
      <rect x="0" y="0" width="5" height="5" /><rect x="10" y="0" width="5" height="5" />
      <rect x="5" y="5" width="5" height="5" /><rect x="15" y="5" width="5" height="5" />
      <rect x="0" y="10" width="5" height="5" /><rect x="10" y="10" width="5" height="5" />
      <rect x="5" y="15" width="5" height="5" /><rect x="15" y="15" width="5" height="5" />
    </g>
    <g fill="#C97A45" opacity="0.4">
      <rect x="5" y="0" width="5" height="5" /><rect x="15" y="0" width="5" height="5" />
      <rect x="0" y="5" width="5" height="5" /><rect x="10" y="5" width="5" height="5" />
      <rect x="5" y="10" width="5" height="5" /><rect x="15" y="10" width="5" height="5" />
      <rect x="0" y="15" width="5" height="5" /><rect x="10" y="15" width="5" height="5" />
    </g>
  </svg>
)

const promptRows = [
  { kind: 'package', label: 'Review my products' },
  { kind: 'trend', label: 'Help with pricing' },
  { kind: 'chat', label: 'Understand my customers' },
  { kind: 'globe', label: 'What have you learned?' },
]

const PromptIcon: React.FC<{ kind: string; color: string }> = ({ kind, color }) => {
  const common = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (kind === 'package') return (<svg {...common}><path d="M16.5 9.4 7.55 4.24" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>)
  if (kind === 'trend') return (<svg {...common}><path d="M22 7 13.5 15.5l-5-5L2 17" /><path d="M16 7h6v6" /></svg>)
  if (kind === 'chat') return (<svg {...common}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>)
  return (<svg {...common}><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>)
}

const TabIcon: React.FC<{ kind: string; color: string }> = ({ kind, color }) => {
  const common = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (kind === 'inbox') return (<svg {...common}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>)
  if (kind === 'orders') return (<svg {...common}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>)
  if (kind === 'products') return (<svg {...common}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>)
  if (kind === 'insights') return (<svg {...common}><line x1="6" y1="20" x2="6" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="18" y1="20" x2="18" y2="14" /></svg>)
  return (<svg {...common}><path d="M4 12c0-4 2-6 4-6" /><path d="M16 6c2 0 4 2 4 6" /><line x1="9" y1="14" x2="9.01" y2="14" /><line x1="15" y1="14" x2="15.01" y2="14" /><path d="M9 17c1 1 2 1.5 3 1.5s2-.5 3-1.5" /></svg>)
}

type Phase = 'home' | 'typing' | 'sending' | 'chat-user' | 'chat-typing' | 'chat-reply' | 'chat-card' | 'chat-hold'

const ChidiAssistantQA: React.FC<ChidiAssistantQAProps> = ({
  width = 340,
  height = 460,
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
  const userBubble = isDark ? '#3A352F' : '#FFFFFF'
  const userBubbleText = isDark ? '#E7E5E4' : '#1F1B16'
  const chidiBubble = isDark ? '#292524' : '#FFFFFF'
  const chidiBubbleText = isDark ? '#E7E5E4' : '#1F1B16'
  const activeAccent = '#C97D5E'

  const ref = useRef<HTMLDivElement | null>(null)
  const [armed, setArmed] = useState(false)
  const [shown, setShown] = useState(false)

  const [phase, setPhase] = useState<Phase>('home')
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setShown(true)
      setPhase('chat-hold')
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

  // Loop: home → type → SEND → chat-user → chat-typing → chat-reply → chat-card → hold → reset
  useEffect(() => {
    if (!shown) return
    let alive = true
    const timers: ReturnType<typeof setTimeout>[] = []
    let typeInt: ReturnType<typeof setInterval> | undefined

    const reset = () => {
      setPhase('home')
      setTyped('')
    }

    const cycle = () => {
      if (!alive) return
      reset()

      timers.push(setTimeout(() => {
        if (!alive) return
        setPhase('typing')
        let i = 0
        typeInt = setInterval(() => {
          if (!alive) return
          i++
          setTyped(QUERY.slice(0, i))
          if (i >= QUERY.length) {
            if (typeInt) clearInterval(typeInt)
            // SEND fires
            timers.push(setTimeout(() => {
              if (!alive) return
              setPhase('sending')
              // Chat opens with user message
              timers.push(setTimeout(() => {
                if (!alive) return
                setPhase('chat-user')
                setTyped('')
                // Chidi typing indicator
                timers.push(setTimeout(() => alive && setPhase('chat-typing'), 600))
                // Chidi text reply
                timers.push(setTimeout(() => alive && setPhase('chat-reply'), 1500))
                // Chidi rich card
                timers.push(setTimeout(() => alive && setPhase('chat-card'), 2400))
                // Hold
                timers.push(setTimeout(() => alive && setPhase('chat-hold'), 3300))
                // Reset
                timers.push(setTimeout(cycle, 8500))
              }, 520))
            }, 320))
          }
        }, 38)
      }, 700))
    }

    cycle()

    return () => {
      alive = false
      timers.forEach(clearTimeout)
      if (typeInt) clearInterval(typeInt)
    }
  }, [shown])

  const priorities = [
    { name: 'Restock wireless earbuds', meta: 'only 3 left', image: '/wireless-earbuds.png' },
    { name: 'Promote blue Ankara dress', meta: '12 customer asks', image: '/blue-ankara-dress.png' },
    { name: 'Check pending orders', meta: '4 delivery updates', kind: 'orders' },
  ]

  const inChat = ['chat-user', 'chat-typing', 'chat-reply', 'chat-card', 'chat-hold'].includes(phase)
  const showUserBubble = inChat
  const showTyping = phase === 'chat-typing'
  const showReply = ['chat-reply', 'chat-card', 'chat-hold'].includes(phase)
  const showCard = ['chat-card', 'chat-hold'].includes(phase)
  const sendFiring = phase === 'sending'
  const inputActive = ['typing', 'sending'].includes(phase) && typed.length > 0

  return (
    <div
      ref={ref}
      className={className}
      style={{ width, height, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}
      role="img"
      aria-label="Chidi assistant: ask, send, chat opens with reply"
    >
      <style jsx>{`
        .caq-card { opacity: 0; transform: translateY(8px); transition: opacity 360ms ease-out, transform 360ms cubic-bezier(0.22, 1, 0.36, 1); }
        .caq-card.in { opacity: 1; transform: translateY(0); }
        .caq-home, .caq-chat { transition: opacity 320ms ease-out, transform 380ms cubic-bezier(0.22, 1, 0.36, 1); }
        .caq-home.hide { opacity: 0; transform: translateY(-8px) scale(0.99); pointer-events: none; }
        .caq-chat { opacity: 0; transform: translateY(10px); pointer-events: none; }
        .caq-chat.in { opacity: 1; transform: translateY(0); }
        .caq-fade { opacity: 0; transform: translateY(6px) scale(0.97); transition: opacity 280ms ease-out, transform 320ms cubic-bezier(0.34, 1.4, 0.64, 1); }
        .caq-fade.in { opacity: 1; transform: translateY(0) scale(1); }
        .caq-input.active { box-shadow: 0 0 0 3px rgba(201, 125, 94, 0.15), 0 1px 2px rgba(0,0,0,0.04); border-color: rgba(201, 125, 94, 0.40) !important; }
        .caq-cursor { display: inline-block; width: 1.5px; height: 11px; background: currentColor; margin-left: 1px; vertical-align: middle; animation: caqBlink 1.05s steps(2, end) infinite; }
        @keyframes caqBlink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        .caq-send.fire { animation: caqSendFire 520ms ease-out; }
        @keyframes caqSendFire {
          0% { transform: scale(1) rotate(0deg); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55); }
          35% { transform: scale(1.22) rotate(-8deg); box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
          70% { transform: scale(0.92) rotate(-14deg) translate(2px, -3px); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .caq-typing-dot { width: 4px; height: 4px; border-radius: 999px; display: inline-block; background: ${textMuted}; animation: caqDots 1s ease-in-out infinite; }
        .caq-typing-dot:nth-child(1) { animation-delay: 0ms; }
        .caq-typing-dot:nth-child(2) { animation-delay: 130ms; }
        .caq-typing-dot:nth-child(3) { animation-delay: 260ms; }
        @keyframes caqDots { 0%, 70%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-3px); opacity: 1; } }
        .caq-pulse { animation: caqPulse 2.2s ease-in-out infinite; }
        @keyframes caqPulse { 0%, 100% { opacity: 0.55; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }
      `}</style>

      <div
        className={`caq-card ${shown ? 'in' : ''}`}
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
        {/* App chrome */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid ' + borderSubtle, background: appBg }}>
          <ShopAvatar size={20} />
          <span style={{ fontWeight: 600, fontSize: 12, color: textPrimary, letterSpacing: '-0.005em' }}>Onyema&apos;s Shop</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          <div style={{ marginLeft: 'auto' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={textPrimary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
          </div>
        </div>

        {/* Main stage */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {/* Home view */}
          <div className={`caq-home ${inChat ? 'hide' : ''}`} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 0 6px' }}>
              <Image src="/logo.png" alt="Chidi Business Assistant" width={88} height={55} priority style={{ height: 'auto', width: 88 }} />
            </div>
            <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: textPrimary, letterSpacing: '-0.01em' }}>How can I help today?</div>
              <div style={{ fontSize: 9.5, color: textMuted, textAlign: 'center', lineHeight: 1.4, maxWidth: 230 }}>
                My answers draw from your products, orders and conversations.
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '10px 14px 0' }}>
              {promptRows.map((p) => (
                <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px', borderRadius: 8 }}>
                  <PromptIcon kind={p.kind} color={textPrimary} />
                  <span style={{ fontWeight: 500, fontSize: 11, color: textPrimary, flex: 1, letterSpacing: '-0.003em' }}>{p.label}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              ))}
            </div>
          </div>

          {/* Chat view — mirrors TR's chat surface */}
          <div className={`caq-chat ${inChat ? 'in' : ''}`} style={{ position: 'absolute', inset: 0, padding: '8px 12px 6px', display: 'flex', flexDirection: 'column', gap: 6, overflow: 'hidden' }}>
            {/* Today pill */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{ fontSize: 8.5, fontWeight: 500, color: textMuted, background: surface, padding: '2px 8px', borderRadius: 999, border: '1px solid ' + borderSubtle }}>Today</span>
            </div>

            {/* User bubble (right, white) */}
            <div className={`caq-fade ${showUserBubble ? 'in' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
              <div style={{ background: userBubble, color: userBubbleText, borderRadius: 12, borderBottomRightRadius: 3, padding: '7px 11px', fontSize: 11, lineHeight: 1.4, maxWidth: 220, border: '1px solid ' + borderSubtle }}>
                {QUERY}
              </div>
              <span style={{ fontSize: 8, color: textMuted, paddingRight: 4 }}>11:08</span>
            </div>

            {/* Chidi typing indicator */}
            <div className={`caq-fade ${showTyping ? 'in' : ''}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <div style={{ background: chidiBubble, border: '1px solid ' + borderSubtle, borderRadius: 12, borderBottomLeftRadius: 3, padding: '8px 12px', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                <span className="caq-typing-dot" />
                <span className="caq-typing-dot" />
                <span className="caq-typing-dot" />
              </div>
            </div>

            {/* Chidi text reply (left, white) */}
            {showReply && (
              <div className="caq-fade in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                <div style={{ background: chidiBubble, color: chidiBubbleText, borderRadius: 12, borderBottomLeftRadius: 3, padding: '7px 11px', fontSize: 11, lineHeight: 1.4, maxWidth: 240, border: '1px solid ' + borderSubtle }}>
                  Start with these three things today.
                </div>
                <span style={{ fontSize: 8, color: textMuted, paddingLeft: 4 }}>11:08 · 0.4s</span>
              </div>
            )}

            {/* Chidi rich card (left, wider) */}
            {showCard && (
              <div className="caq-fade in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                <div style={{ background: chidiBubble, border: '1px solid ' + borderSubtle, borderRadius: 12, borderBottomLeftRadius: 3, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5, maxWidth: 250, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, paddingBottom: 5, borderBottom: '1px solid ' + borderSubtle }}>
                    <Mark size={11} variant="default" />
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: textPrimary, letterSpacing: '-0.005em' }}>Today&apos;s focus</span>
                  </div>
                  {priorities.map((p) => (
                    <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 4, overflow: 'hidden', background: '#F4F0EA', flexShrink: 0, border: '1px solid ' + borderSubtle }}>
                        {'image' in p ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EAF7EF' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                              <path d="M3 6h18" />
                              <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span style={{ fontSize: 9.5, fontWeight: 500, color: textPrimary, flex: 1, letterSpacing: '-0.003em' }}>{p.name}</span>
                      <span style={{ fontSize: 8.5, fontWeight: 600, color: '#BE5A24', background: 'rgba(190, 90, 36, 0.10)', padding: '1px 5px', borderRadius: 4 }}>{p.meta}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 2, padding: '5px 8px', borderRadius: 6, background: '#1F1B16', color: '#F4DDC2', fontSize: 9.5, fontWeight: 600, textAlign: 'center', letterSpacing: '-0.003em' }}>
                    Show me why →
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Composer (mirrors TR's composer when in chat) */}
        <div style={{ margin: '6px 12px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div
            className={`caq-input ${inputActive ? 'active' : ''}`}
            style={{
              flex: 1,
              background: surface,
              borderRadius: 999,
              padding: '7px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              border: '1px solid ' + borderSubtle,
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              transition: 'box-shadow 220ms ease-out, border-color 220ms ease-out',
            }}
          >
            <span style={{ flex: 1, fontWeight: 400, fontSize: 11, color: typed ? textPrimary : textMuted, letterSpacing: '-0.003em', minHeight: 14, display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {typed || (inChat ? 'Reply to Chidi…' : 'Ask Chidi about your business…')}
              {phase === 'typing' && typed.length > 0 && typed.length < QUERY.length && <span className="caq-cursor" style={{ color: textPrimary }} />}
            </span>
          </div>
          {inChat && (
            <div style={{ width: 26, height: 26, borderRadius: 999, background: surface, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid ' + borderSubtle, flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={textPrimary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="2" width="6" height="11" rx="3" />
                <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </div>
          )}
          <div className={`caq-send ${sendFiring ? 'fire' : ''}`} style={{ width: 26, height: 26, borderRadius: 999, background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ChidiAssistantQA

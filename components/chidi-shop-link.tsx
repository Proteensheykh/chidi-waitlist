'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type React from 'react'

interface ChidiShopLinkProps {
  width?: number | string
  height?: number | string
  className?: string
  theme?: 'light' | 'dark'
  startDelay?: number
}

const ShopAvatar: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" style={{ borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
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

const products = [
  { name: 'Casual sneakers', price: '₦42,000', image: '/casual-sneakers.png', stock: 'In stock' },
  { name: 'Blue Ankara dress', price: '₦18,000', image: '/blue-ankara-dress.png', stock: 'In stock' },
  { name: 'Leather handbag', price: '₦27,000', image: '/leather-handbag.png', stock: '2 left' },
  { name: 'Wireless earbuds', price: '₦15,500', image: '/wireless-earbuds.png', stock: 'In stock' },
]

const ChidiShopLink: React.FC<ChidiShopLinkProps> = ({
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
  const tileBg = isDark ? '#1C1917' : '#F7F2EC'

  const ref = useRef<HTMLDivElement | null>(null)
  const [armed, setArmed] = useState(false)
  const [shown, setShown] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showOrderToast, setShowOrderToast] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setShown(true)
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

  // Copy-link cycle
  useEffect(() => {
    if (!shown) return
    let alive = true
    let timeoutId: ReturnType<typeof setTimeout>
    const tick = (toCopied: boolean) => {
      if (!alive) return
      setCopied(toCopied)
      timeoutId = setTimeout(() => tick(!toCopied), toCopied ? 1800 : 5200)
    }
    timeoutId = setTimeout(() => tick(true), 2200)
    return () => {
      alive = false
      clearTimeout(timeoutId)
    }
  }, [shown])

  // Order-placed toast cycle (fires every ~9s)
  useEffect(() => {
    if (!shown) return
    let alive = true
    let timeoutId: ReturnType<typeof setTimeout>
    const fire = () => {
      if (!alive) return
      setShowOrderToast(true)
      timeoutId = setTimeout(() => {
        if (!alive) return
        setShowOrderToast(false)
        timeoutId = setTimeout(fire, 6800)
      }, 2400)
    }
    timeoutId = setTimeout(fire, 4200)
    return () => {
      alive = false
      clearTimeout(timeoutId)
    }
  }, [shown])

  return (
    <div
      ref={ref}
      className={className}
      style={{ width, height, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}
      role="img"
      aria-label="Onyema's Shop storefront at chidi.shop/onyema with Telegram order CTA"
    >
      <style jsx>{`
        .csl-card { opacity: 0; transform: translateY(8px); transition: opacity 360ms ease-out, transform 360ms cubic-bezier(0.22, 1, 0.36, 1); }
        .csl-card.in { opacity: 1; transform: translateY(0); }
        .csl-tile { opacity: 0; transform: translateY(8px) scale(0.97); transition: opacity 380ms ease-out var(--d, 0s), transform 420ms cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s); }
        .csl-tile.in { opacity: 1; transform: translateY(0) scale(1); }
        .csl-dot { animation: cslDotPulse 2.4s ease-in-out infinite; }
        @keyframes cslDotPulse { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.4); } }
        .csl-toast { opacity: 0; transform: translate(-50%, 4px) scale(0.96); transition: opacity 280ms ease-out, transform 320ms cubic-bezier(0.22, 1, 0.36, 1); pointer-events: none; }
        .csl-toast.in { opacity: 1; transform: translate(-50%, 0) scale(1); }
        .csl-copy-label { position: relative; display: inline-block; min-width: 60px; text-align: right; }
        .csl-copy-text { display: inline-block; transition: opacity 220ms ease-out, transform 220ms ease-out; }
        .csl-copy-text.out { opacity: 0; transform: translateY(-3px); }
        .csl-copy-text.in { opacity: 1; transform: translateY(0); }
      `}</style>

      <div
        className={`csl-card ${shown ? 'in' : ''}`}
        style={{
          width: 340,
          background: appBg,
          borderRadius: 18,
          boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.10), 0 0 0 1px ' + border,
          overflow: 'hidden',
          fontFamily: 'Inter, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* URL pill bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 14px',
            borderBottom: '1px solid ' + borderSubtle,
            background: surface,
          }}
        >
          <span className="csl-dot" style={{ width: 7, height: 7, borderRadius: 999, background: '#22C55E', flexShrink: 0 }} />
          <span style={{ fontWeight: 500, fontSize: 11, color: textMuted }}>chidi.shop/</span>
          <span style={{ fontWeight: 600, fontSize: 11, color: textPrimary }}>onyema</span>
          <span className="csl-copy-label" style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: copied ? '#047857' : textMuted }}>
            <span className={`csl-copy-text ${copied ? 'out' : 'in'}`}>Copy link</span>
            <span className={`csl-copy-text ${copied ? 'in' : 'out'}`} style={{ position: 'absolute', right: 0, top: 0 }}>
              ✓ Copied!
            </span>
          </span>
        </div>

        {/* Shop title block */}
        <div style={{ padding: '12px 16px 8px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid ' + borderSubtle }}>
          <ShopAvatar size={32} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: textPrimary, letterSpacing: '-0.012em', lineHeight: 1.1 }}>
              Onyema&apos;s Shop
            </span>
            <span style={{ fontSize: 9.5, fontWeight: 500, color: textMuted, letterSpacing: '-0.003em' }}>
              Lagos · 32 items · Open today
            </span>
          </div>
        </div>

        {/* Product grid */}
        <div style={{ padding: '8px 10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, flex: 1 }}>
          {products.map((p, i) => (
            <div
              key={p.name}
              className={`csl-tile ${shown ? 'in' : ''}`}
              style={{ '--d': `${180 + i * 90}ms`, background: surface, borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid ' + borderSubtle } as CSSProperties}
            >
              <div style={{ width: '100%', height: 62, background: tileBg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '5px 7px 6px', display: 'flex', flexDirection: 'column', gap: 1 }}>
                <span style={{ fontWeight: 500, fontSize: 9.5, color: textPrimary, letterSpacing: '-0.003em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.name}
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: 10, color: textPrimary, letterSpacing: '-0.005em' }}>{p.price}</span>
                  <span style={{ fontSize: 8, fontWeight: 500, color: p.stock === '2 left' ? '#BE5A24' : textMuted }}>{p.stock}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order CTA */}
        <div style={{ display: 'flex', padding: '8px 10px 12px' }}>
          <div style={{ flex: 1, background: '#26A5E4', color: '#FFFFFF', borderRadius: 8, padding: '8px 10px', fontWeight: 600, fontSize: 10, textAlign: 'center', letterSpacing: '0.01em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.55 8.16-1.85 8.72c-.14.62-.5.77-1.02.48l-2.82-2.08-1.36 1.31c-.15.15-.28.28-.57.28l.2-2.87 5.21-4.71c.23-.2-.05-.31-.35-.11l-6.44 4.05-2.77-.87c-.6-.19-.61-.6.13-.89l10.83-4.17c.5-.18.94.12.81.86z" /></svg>
            Order on Telegram
          </div>
        </div>

        {/* Order-placed toast */}
        <div
          className={`csl-toast ${showOrderToast ? 'in' : ''}`}
          style={{
            position: 'absolute',
            bottom: 56,
            left: '50%',
            background: '#1F1B16',
            color: '#F4DDC2',
            padding: '6px 12px',
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '-0.005em',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          New order via Telegram
        </div>
      </div>
    </div>
  )
}

export default ChidiShopLink

'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type React from 'react'

interface NumbersThatSpeakProps {
  width?: number | string
  height?: number | string
  className?: string
  theme?: 'light' | 'dark'
  startDelay?: number
}

type RangeKey = '7d' | '30d' | '90d'

interface KpiSet {
  revenue: number
  orders: number
  avg: number
  fulfilled: number
  revenueDelta: string
  revenueUp: boolean
  ordersDelta: string
  ordersUp: boolean
  avgDelta: string
  avgUp: boolean
  fulfilledDelta: string
  fulfilledUp: boolean
  topSold: number
  topPct: number
}

const RANGES: Record<RangeKey, KpiSet> = {
  '7d': {
    revenue: 5820000, orders: 8, avg: 727500, fulfilled: 75,
    revenueDelta: '+4.2%', revenueUp: true,
    ordersDelta: '+14.0%', ordersUp: true,
    avgDelta: '-22.0%', avgUp: false,
    fulfilledDelta: '+2.0%', fulfilledUp: true,
    topSold: 2, topPct: 38,
  },
  '30d': {
    revenue: 26869000, orders: 34, avg: 790265, fulfilled: 68,
    revenueDelta: '+11.5%', revenueUp: true,
    ordersDelta: '+36.0%', ordersUp: true,
    avgDelta: '-18.0%', avgUp: false,
    fulfilledDelta: '-0.5%', fulfilledUp: false,
    topSold: 7, topPct: 84,
  },
  '90d': {
    revenue: 82140000, orders: 102, avg: 805294, fulfilled: 71,
    revenueDelta: '+28.2%', revenueUp: true,
    ordersDelta: '+52.0%', ordersUp: true,
    avgDelta: '-8.0%', avgUp: false,
    fulfilledDelta: '+1.4%', fulfilledUp: true,
    topSold: 21, topPct: 96,
  },
}

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

const TabIcon: React.FC<{ kind: string; color: string }> = ({ kind, color }) => {
  const common = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (kind === 'inbox') return (<svg {...common}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>)
  if (kind === 'orders') return (<svg {...common}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>)
  if (kind === 'products') return (<svg {...common}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>)
  if (kind === 'insights') return (<svg {...common}><line x1="6" y1="20" x2="6" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="18" y1="20" x2="18" y2="14" /></svg>)
  return (<svg {...common}><path d="M4 12c0-4 2-6 4-6" /><path d="M16 6c2 0 4 2 4 6" /><line x1="9" y1="14" x2="9.01" y2="14" /><line x1="15" y1="14" x2="15.01" y2="14" /><path d="M9 17c1 1 2 1.5 3 1.5s2-.5 3-1.5" /></svg>)
}

const RANGE_KEYS: RangeKey[] = ['7d', '30d', '90d']
const RANGE_LABELS: Record<RangeKey, string> = { '7d': '7 days', '30d': '30 days', '90d': '90 days' }

const formatNaira = (n: number) => '₦' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// Smooth tween hook between previous and target value
function useTween(target: number, key: string | number, durationMs = 700) {
  const [v, setV] = useState(target)
  const prevRef = useRef(target)
  useEffect(() => {
    const start = prevRef.current
    const startTs = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTs) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      const cur = start + (target - start) * eased
      setV(cur)
      if (t < 1) raf = requestAnimationFrame(tick)
      else prevRef.current = target
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, key, durationMs])
  return v
}

const KpiTile: React.FC<{
  label: string
  value: string
  delta: string
  up: boolean
  surface: string
  border: string
  textPrimary: string
  textMuted: string
  delay: string
  shown: boolean
}> = ({ label, value, delta, up, surface, border, textPrimary, textMuted, delay, shown }) => {
  const arrowColor = up ? '#047857' : '#BE123C'
  return (
    <div
      className={`nts-tile ${shown ? 'in' : ''}`}
      style={{ '--d': delay, background: surface, border: '1px solid ' + border, borderRadius: 10, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 3 } as CSSProperties}
    >
      <span style={{ fontWeight: 500, fontSize: 9.5, color: textMuted, letterSpacing: '-0.003em' }}>{label}</span>
      <div style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.1, color: textPrimary, letterSpacing: '-0.025em', fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 1 }}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={arrowColor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          {up ? (<><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>) : (<><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" /></>)}
        </svg>
        <span style={{ fontSize: 9, fontWeight: 600, color: arrowColor, letterSpacing: '-0.003em' }}>{delta}</span>
        <span style={{ fontSize: 8.5, fontWeight: 500, color: textMuted }}>vs prev</span>
      </div>
    </div>
  )
}

const NumbersThatSpeak: React.FC<NumbersThatSpeakProps> = ({
  width = 340,
  height = 360,
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
  const activeAccent = '#C97D5E'

  const ref = useRef<HTMLDivElement | null>(null)
  const [armed, setArmed] = useState(false)
  const [shown, setShown] = useState(false)
  const [rangeIdx, setRangeIdx] = useState(1) // start on 30d (matches the real screenshot)

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

  // Auto-cycle 30 → 90 → 7 → 30 → ... every 4.2s after intro
  useEffect(() => {
    if (!shown) return
    const interval = setInterval(() => {
      setRangeIdx((i) => (i + 1) % RANGE_KEYS.length)
    }, 4200)
    return () => clearInterval(interval)
  }, [shown])

  const currentKey = RANGE_KEYS[rangeIdx]
  const r = RANGES[currentKey]
  const revenue = useTween(shown ? r.revenue : 0, currentKey)
  const orders = useTween(shown ? r.orders : 0, currentKey)
  const avg = useTween(shown ? r.avg : 0, currentKey)
  const fulfilled = useTween(shown ? r.fulfilled : 0, currentKey)
  const topPct = useTween(shown ? r.topPct : 0, currentKey, 900)
  const topSold = useTween(shown ? r.topSold : 0, currentKey, 900)

  return (
    <div
      ref={ref}
      className={className}
      style={{ width, height, position: 'relative', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      role="img"
      aria-label="Insights dashboard auto-cycling 7/30/90 day ranges with Top Sellers bar"
    >
      <style jsx>{`
        .nts-card { opacity: 0; transform: translateY(8px); transition: opacity 360ms ease-out, transform 360ms cubic-bezier(0.22, 1, 0.36, 1); }
        .nts-card.in { opacity: 1; transform: translateY(0); }
        :global(.nts-tile) { opacity: 0; transform: translateY(6px); transition: opacity 360ms ease-out var(--d, 0s), transform 360ms cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s); }
        :global(.nts-tile.in) { opacity: 1; transform: translateY(0); }
        .nts-rangepill { position: relative; }
        .nts-rangeglow { animation: ntsRangePulse 4.2s ease-out infinite; }
        @keyframes ntsRangePulse { 0% { box-shadow: 0 0 0 0 rgba(201, 125, 94, 0.30); } 30% { box-shadow: 0 0 0 3px rgba(201, 125, 94, 0.10); } 70% { box-shadow: 0 0 0 5px rgba(201, 125, 94, 0); } 100% { box-shadow: 0 0 0 0 rgba(201, 125, 94, 0); } }
      `}</style>

      <div
        className={`nts-card ${shown ? 'in' : ''}`}
        style={{
          width: 340,
          background: appBg,
          borderRadius: 18,
          boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.10), 0 0 0 1px ' + border,
          overflow: 'hidden',
          fontFamily: 'Inter, sans-serif',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* App header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid ' + borderSubtle, background: appBg }}>
          <ShopAvatar size={20} />
          <span style={{ fontWeight: 600, fontSize: 12, color: textPrimary, letterSpacing: '-0.005em' }}>Onyema&apos;s Shop</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          <div style={{ marginLeft: 'auto' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={textPrimary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 18, padding: '8px 16px 0', borderBottom: '1px solid ' + borderSubtle }}>
          <div style={{ fontWeight: 600, fontSize: 12, color: textPrimary, paddingBottom: 8, borderBottom: '2px solid ' + textPrimary, letterSpacing: '-0.005em' }}>Overview</div>
          <div style={{ fontWeight: 500, fontSize: 12, color: textMuted, paddingBottom: 8, letterSpacing: '-0.005em' }}>Customers</div>
        </div>

        {/* Range toggle (auto-cycle) */}
        <div style={{ padding: '8px 14px 4px', display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative', background: 'rgba(40,30,20,0.04)', borderRadius: 999, padding: 2 }}>
            {RANGE_KEYS.map((k, i) => (
              <div
                key={k}
                className={i === rangeIdx ? 'nts-rangepill nts-rangeglow' : 'nts-rangepill'}
                style={{
                  fontSize: 9.5,
                  fontWeight: i === rangeIdx ? 600 : 500,
                  color: i === rangeIdx ? textPrimary : textMuted,
                  padding: '3px 9px',
                  borderRadius: 999,
                  background: i === rangeIdx ? surface : 'transparent',
                  border: i === rangeIdx ? '1px solid ' + borderSubtle : '1px solid transparent',
                  transition: 'background 320ms ease-out, color 320ms ease-out, border-color 320ms ease-out',
                }}
              >
                {RANGE_LABELS[k]}
              </div>
            ))}
          </div>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto' }}>
            <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" /><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
          </svg>
        </div>

        {/* KPI grid */}
        <div style={{ padding: '6px 10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <KpiTile label="Revenue" value={formatNaira(revenue)} delta={r.revenueDelta} up={r.revenueUp} surface={surface} border={borderSubtle} textPrimary={textPrimary} textMuted={textMuted} delay="160ms" shown={shown} />
          <KpiTile label="Orders" value={Math.round(orders).toString()} delta={r.ordersDelta} up={r.ordersUp} surface={surface} border={borderSubtle} textPrimary={textPrimary} textMuted={textMuted} delay="250ms" shown={shown} />
          <KpiTile label="Avg Order" value={formatNaira(avg)} delta={r.avgDelta} up={r.avgUp} surface={surface} border={borderSubtle} textPrimary={textPrimary} textMuted={textMuted} delay="340ms" shown={shown} />
          <KpiTile label="Fulfilled" value={Math.round(fulfilled) + '%'} delta={r.fulfilledDelta} up={r.fulfilledUp} surface={surface} border={borderSubtle} textPrimary={textPrimary} textMuted={textMuted} delay="430ms" shown={shown} />
        </div>

        {/* Top Sellers */}
        <div style={{ margin: '6px 10px 12px', background: surface, border: '1px solid ' + borderSubtle, borderRadius: 10, padding: '8px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={'#047857'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
            <span style={{ fontWeight: 600, fontSize: 10, color: textPrimary, letterSpacing: '-0.005em' }}>Top Sellers</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 24, height: 24, borderRadius: 5, overflow: 'hidden', background: '#F4F0EA', flexShrink: 0, border: '1px solid ' + borderSubtle }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/casual-sneakers.png" alt="Casual sneakers" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontWeight: 500, fontSize: 10, color: textPrimary, letterSpacing: '-0.003em', flex: 1 }}>Casual sneakers</span>
            <span style={{ fontWeight: 600, fontSize: 10, color: textPrimary, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.005em' }}>
              {formatNaira(r.topSold * 42000)}
            </span>
          </div>
          <div style={{ position: 'relative', height: 5, background: 'rgba(40,30,20,0.06)', borderRadius: 999, overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${topPct}%`,
                background: '#22C55E',
                borderRadius: 999,
                transition: 'width 900ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          </div>
          <div style={{ marginTop: 3, textAlign: 'right' }}>
            <span style={{ fontSize: 8.5, fontWeight: 500, color: textMuted, fontVariantNumeric: 'tabular-nums' }}>
              {Math.round(topSold)} sold
            </span>
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', padding: '4px 8px 6px', borderTop: '1px solid ' + borderSubtle, background: appBg }}>
          {[
            { kind: 'inbox', label: 'Inbox' },
            { kind: 'orders', label: 'Orders' },
            { kind: 'products', label: 'Products' },
            { kind: 'insights', label: 'Insights', active: true },
            { kind: 'chidi', label: 'Chidi' },
          ].map((tab) => (
            <div key={tab.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, position: 'relative' }}>
              <TabIcon kind={tab.kind} color={tab.active ? activeAccent : textMuted} />
              <span style={{ fontSize: 8, fontWeight: 500, color: tab.active ? activeAccent : textMuted }}>{tab.label}</span>
              {tab.active && (
                <span style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', width: 16, height: 2, background: activeAccent, borderRadius: 2 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NumbersThatSpeak

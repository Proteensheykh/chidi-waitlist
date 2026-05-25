"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "section" | "article" | "aside" | "header" | "footer"
  rootMargin?: string
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  rootMargin = "0px 0px -10% 0px",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (shown || typeof window === "undefined") return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setShown(true)
      return
    }

    const node = ref.current
    if (!node) return

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            obs.disconnect()
            return
          }
        }
      },
      { rootMargin, threshold: 0.05 },
    )

    obs.observe(node)
    return () => obs.disconnect()
  }, [rootMargin, shown])

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={[
        "transition-all duration-[700ms] ease-out will-change-transform",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  )
}

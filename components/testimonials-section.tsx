'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'
import { TESTIMONIAL_AUDIO } from './testimonial-audio-data'

interface Word {
  text: string
  start: number
  end: number
}

interface Testimonial {
  slug: string
  quote: string
  name: string
  company: string
  image: string
  audio?: string
  words?: Word[]
}

// Estimate per-word timings from the quote so the karaoke effect works even
// before real recordings exist. Swap `words` for forced-aligned timestamps
// (Whisper word_timestamps / ElevenLabs alignment) once per-subject audio
// lands at the URL pointed to by `audio`.
function estimateWordTimings(quote: string, wordsPerSecond = 3.4): Word[] {
  const tokens = quote.split(/\s+/)
  const base = 1 / wordsPerSecond
  let cursor = 0.35
  return tokens.map((text) => {
    const endsWithPause = /[.!?]$/.test(text)
    const endsWithBreath = /[,;:]$/.test(text)
    const lengthScale = Math.min(1.6, 0.7 + text.replace(/[^\w]/g, '').length * 0.06)
    const duration = base * lengthScale
    const w: Word = { text, start: cursor, end: cursor + duration }
    cursor += duration + (endsWithPause ? 0.32 : endsWithBreath ? 0.18 : 0.04)
    return w
  })
}

const RAW_TESTIMONIALS: Omit<Testimonial, 'words'>[] = [
  {
    slug: 'amadi',
    quote:
      'I can ask Chidi what someone bought, their size, what they asked about before. When I follow up, it feels personal, like I remembered everything myself.',
    name: 'Amadi K.',
    company: 'Eyewear · Lagos',
    image: '/testimonial-amadi.jpg',
  },
  {
    slug: 'titi',
    quote:
      "Me, I'm not technical at all. I thought setting this up would stress me. But I launched my Telegram channel in a few clicks and Chidi started replying.",
    name: 'Titi O.',
    company: 'Catering · Lagos',
    image: '/testimonial-titi.jpg',
  },
  {
    slug: 'dami',
    quote:
      "I used to wait till month end to know how the shop was doing. Now Chidi shows me as it happens, what's selling, what's low, where the money is.",
    name: 'Dami O.',
    company: 'Vinyl & Audio · Lagos',
    image: '/testimonial-dami.jpg',
  },
  {
    slug: 'kemi',
    quote:
      'Chidi showed me the products people kept asking for in our Telegram chats. I added two new items from that, and honestly, they sold out in one week.',
    name: 'Sandra O.',
    company: 'Beauty and Cosmetics · Lagos',
    image: '/testimonial-kemi.jpg',
  },
  {
    slug: 'ngozi',
    quote:
      'Talking to Chidi feels like talking to someone who knows my business inside out. I ask what to restock, what to promote, even what to try next, and it gives me ideas I can consider.',
    name: 'Ngozi P.',
    company: 'Jewelry · Abuja',
    image: '/testimonial-ngozi.jpg',
  },
  {
    slug: 'efe',
    quote:
      'An influencer posted my shop and the messages just rushed in. I could not have answered all of them. Chidi kept up while I focused on packing orders.',
    name: 'Efe I.',
    company: 'Sneakers · Lagos',
    image: '/testimonial-efe.jpg',
  },
  {
    slug: 'zainab',
    quote:
      'This shop is my side business, and I have two small children. Chidi handles so much of the customer chat now, so I can use that time for stock, deliveries, and my family.',
    name: 'Zainab U.',
    company: 'Home Interior · Lagos',
    image: '/testimonial-zainab.jpg',
  },
  // {
  //   slug: 'palesa',
  //   quote:
  //     'I spend money to bring people to my shop, so I hate wasting leads. Chidi welcomes them quickly, answers the first questions, and pushes more chats to orders.',
  //   name: 'Palesa T.',
  //   company: 'Activewear · Abuja',
  //   image: '/testimonial-palesa.jpg',
  // },
  {
    slug: 'nnenna',
    quote:
      'Customers do not want plenty steps. If they ask inside Telegram, they want to buy there. Chidi helps them choose and confirm before they lose interest.',
    name: 'Nnenna V.',
    company: 'Stationery · Lagos',
    image: '/testimonial-femi.jpg',
  },
]

const TESTIMONIALS: Testimonial[] = RAW_TESTIMONIALS.map((t) => {
  const real = TESTIMONIAL_AUDIO[t.slug]
  return {
    ...t,
    audio: real?.audio,
    words: real?.words ?? estimateWordTimings(t.quote),
  }
})

const INK = '#49423D'
const INK_RGB = '73,66,61'

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const rafRef = useRef<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const t = TESTIMONIALS[active]
  const words = t.words ?? []
  const total = words.length ? words[words.length - 1].end + 0.6 : 0

  const transitionTo = useCallback((next: number, autoPlay: boolean) => {
    setTransitioning(true)
    setPlaying(false)
    setTimeout(() => {
      setActive(next)
      setCurrentTime(0)
      setTimeout(() => {
        setTransitioning(false)
        if (autoPlay) setPlaying(true)
      }, 100)
    }, 400)
  }, [])

  const handleEnded = useCallback(() => {
    const next = (active + 1) % TESTIMONIALS.length
    if (next === 0) {
      setPlaying(false)
      setCurrentTime(0)
    } else {
      transitionTo(next, true)
    }
  }, [active, transitionTo])

  useEffect(() => {
    if (!playing) return

    if (t.audio && audioRef.current) {
      const audio = audioRef.current
      audio.currentTime = 0
      const onEnded = () => handleEnded()
      const tick = () => {
        setCurrentTime(audio.currentTime)
        rafRef.current = requestAnimationFrame(tick)
      }
      audio.addEventListener('ended', onEnded)
      audio.play().catch(() => setPlaying(false))
      rafRef.current = requestAnimationFrame(tick)
      return () => {
        audio.pause()
        audio.removeEventListener('ended', onEnded)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      }
    }

    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000
      if (elapsed >= total) {
        handleEnded()
        return
      }
      setCurrentTime(elapsed)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [playing, active, t.audio, total, handleEnded])

  useEffect(() => {
    if (hasUserInteracted || playing) return

    const interval = window.setInterval(() => {
      transitionTo((active + 1) % TESTIMONIALS.length, false)
    }, 12000)

    return () => window.clearInterval(interval)
  }, [active, hasUserInteracted, playing, transitionTo])

  const goTo = (i: number) => {
    setHasUserInteracted(true)
    transitionTo(i, false)
  }

  const togglePlay = () => {
    setHasUserInteracted(true)

    if (playing) {
      setPlaying(false)
    } else {
      setCurrentTime(0)
      setPlaying(true)
    }
  }

  let activeWordIdx = -1
  let lastSpokenIdx = -1
  for (let i = 0; i < words.length; i++) {
    if (currentTime >= words[i].start && currentTime < words[i].end) activeWordIdx = i
    if (currentTime >= words[i].end) lastSpokenIdx = i
  }

  const firstName = t.name.split(' ')[0]

  return (
    <div
      id="testimonials"
      className="w-full border-b border-[rgba(0,0,0,0.08)] flex flex-col justify-center items-center"
    >
      <div className="self-stretch px-2 overflow-hidden flex justify-start items-center bg-background border-b border-[rgba(0,0,0,0.08)]">
        <div className="flex-1 py-16 md:py-24 flex flex-col md:flex-row justify-center items-end gap-6">
          <div className="self-stretch px-3 md:px-12 max-w-[1320px] mx-auto justify-center items-start gap-4 flex flex-col md:flex-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t.image}
              alt={t.name}
              className="w-48 h-[200px] md:w-48 md:h-[210px] rounded-lg object-cover flex-shrink-0"
              style={{
                opacity: transitioning ? 0.6 : 1,
                transform: transitioning ? 'scale(0.96)' : 'scale(1)',
                transition: 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out',
              }}
              loading="lazy"
            />

            <div className="flex-1 px-0 md:px-6 flex flex-col justify-start items-start gap-6">
              <div
                className="self-stretch flex flex-col text-2xl md:text-[32px] font-medium leading-10 md:leading-[42px] font-sans min-h-[160px] md:h-[210px] md:overflow-hidden tracking-tight"
                style={{
                  color: INK,
                  filter: transitioning ? 'blur(4px)' : 'blur(0px)',
                  transition: 'filter 0.7s ease-in-out',
                }}
                aria-live="polite"
              >
                <span>
                  <span aria-hidden="true">&ldquo;</span>
                  {words.map((w, i) => {
                    const current = i === activeWordIdx
                    const spoken = i <= lastSpokenIdx
                    const lit = !playing || spoken || current
                    return (
                      <span
                        key={i}
                        className="transition-[opacity] duration-150 ease-out"
                        style={{ opacity: lit ? 1 : 0.22 }}
                      >
                        {w.text}
                        {i < words.length - 1 ? ' ' : ''}
                      </span>
                    )
                  })}
                  <span aria-hidden="true">&rdquo;</span>
                </span>
              </div>

              <div
                className="self-stretch flex items-center gap-4"
                style={{
                  filter: transitioning ? 'blur(4px)' : 'blur(0px)',
                  transition: 'filter 0.7s ease-in-out',
                }}
              >
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-[1.04] active:scale-[0.97]"
                  style={{ background: INK, color: '#FAF7F2' }}
                  aria-label={playing ? `Pause ${t.name}` : `Hear ${firstName} speak`}
                >
                  {playing ? (
                    <Pause className="w-3.5 h-3.5" fill="currentColor" />
                  ) : (
                    <Play className="w-3.5 h-3.5 ml-[2px]" fill="currentColor" />
                  )}
                </button>
                <div className="flex flex-col">
                  <div
                    className="text-lg font-medium leading-[26px] font-sans"
                    style={{ color: `rgba(${INK_RGB},0.90)` }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-base font-medium leading-[22px] font-sans"
                    style={{ color: `rgba(${INK_RGB},0.70)` }}
                  >
                    {t.company}
                  </div>
                </div>
              </div>

              <div
                className="self-stretch h-px relative overflow-hidden"
                style={{ background: `rgba(${INK_RGB},0.20)` }}
              >
                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    background: INK,
                    width: `${Math.min(100, total ? (currentTime / total) * 100 : 0)}%`,
                    transition: playing ? 'width 80ms linear' : 'width 250ms ease',
                  }}
                />
              </div>

              {t.audio && <audio ref={audioRef} src={t.audio} preload="metadata" />}
            </div>
          </div>

          <div className="pr-6 justify-start items-start gap-[14px] flex">
            <button
              onClick={() => goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="w-9 h-9 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] overflow-hidden rounded-full border border-[rgba(0,0,0,0.15)] flex justify-center items-center hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="#46413E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => goTo((active + 1) % TESTIMONIALS.length)}
              className="w-9 h-9 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] overflow-hidden rounded-full border border-[rgba(0,0,0,0.15)] flex justify-center items-center hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#46413E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

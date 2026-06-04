"use client"

import { GutterStrip } from "@/components/gutter-strip"
import { Reveal } from "@/components/reveal"

const SIGNUP_URL = "https://my.chidi.app/auth?tab=signup"

function DollarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M6 1V11M8.5 3H4.75C4.28587 3 3.84075 3.18437 3.51256 3.51256C3.18437 3.84075 3 4.28587 3 4.75C3 5.21413 3.18437 5.65925 3.51256 5.98744C3.84075 6.31563 4.28587 6.5 4.75 6.5H7.25C7.71413 6.5 8.15925 6.68437 8.48744 7.01256C8.81563 7.34075 9 7.78587 9 8.25C9 8.71413 8.81563 9.15925 8.48744 9.48744C8.15925 9.81563 7.71413 10 7.25 10H3.5"
        stroke="#37322F"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckIcon({ stroke }: { stroke: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 3L4.5 8.5L2 6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const starterFeatures = [
  "Basic order capture",
  "Limited AI-assisted replies",
  "Automated order capture",
  "Customer records",
  "Up to 50 conversations/month",
  "Email support",
]

const growthFeatures = [
  "Unlimited conversations",
  "Automated product enquiries",
  "Inventory tracking",
  "Payment status tracking",
  "Customer CRM",
  "Sales analytics",
  "Repeat customer insights",
  "Priority support",
  "Early access to new features",
]

export default function PricingSection() {
  return (
    <div
      id="pricing"
      className="w-full border-t border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center"
    >
      {/* Header */}
      <div className="self-stretch px-6 md:px-24 py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6">
        <Reveal className="w-full max-w-[586px] flex flex-col justify-start items-center gap-4">
          <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-center items-center gap-[8px] border border-[rgba(2,6,23,0.08)]">
            <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">
              <DollarIcon />
            </div>
            <div className="text-center flex justify-center flex-col text-[#37322F] text-xs font-medium leading-3 font-sans">
              Plans &amp; Pricing
            </div>
          </div>
          <h2 className="self-stretch text-center flex justify-center flex-col text-[#49423D] text-3xl md:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Choose the perfect plan for your business
          </h2>
          <p className="self-stretch text-center text-[#605A57] text-base font-normal leading-7 font-sans">
            Start free. Upgrade only when your business starts outgrowing our generosity.
          </p>
          <p className="self-stretch text-center text-[#847971] text-sm font-medium leading-5 font-sans">
            No setup fees. No contracts. Cancel anytime.
          </p>
        </Reveal>
      </div>

      {/* Cards */}
      <div className="self-stretch border-b border-[rgba(55,50,47,0.12)] flex justify-center items-stretch">
        <div className="flex justify-center items-stretch w-full">
          <GutterStrip count={200} />

          <div className="flex-1 flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-5">
            {/* Starter */}
            <div className="flex-1 self-stretch px-6 py-8 border border-[rgba(55,50,47,0.12)] overflow-hidden flex flex-col justify-start items-start gap-12">
              <div className="self-stretch flex flex-col justify-start items-start gap-9">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="text-[rgba(55,50,47,0.90)] text-lg font-medium leading-7 font-sans">Starter</div>
                  <div className="w-full max-w-[242px] text-[rgba(41,37,35,0.70)] text-sm font-normal leading-5 font-sans">
                    For businesses exploring the Chidi way of doing things.
                  </div>
                </div>

                <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                  <div className="flex items-end gap-1.5">
                    <span className="text-[#37322F] text-5xl font-normal leading-none font-serif">₦0</span>
                    <span className="text-[#847971] text-sm font-medium font-sans pb-1">/month</span>
                  </div>
                  <div className="text-[#37322F] text-base md:text-lg font-semibold leading-6 font-sans">
                    Try the platform and experience the difference.
                  </div>
                </div>

                <a
                  href={SIGNUP_URL}
                  className="self-stretch h-11 px-4 relative bg-[#37322F] shadow-[0px_2px_4px_rgba(55,50,47,0.12)] overflow-hidden rounded-[99px] flex justify-center items-center hover:bg-[#2A2520] transition-colors"
                >
                  <div className="w-full h-full absolute left-0 top-0 bg-gradient-to-b from-[rgba(255,255,255,0.20)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                  <span className="relative text-[#FBFAF9] text-[13px] font-medium leading-5 font-sans">Start for Free</span>
                </a>
              </div>

              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                {starterFeatures.map((feature) => (
                  <div key={feature} className="self-stretch flex justify-start items-center gap-[13px]">
                    <div className="w-4 h-4 relative flex items-center justify-center shrink-0">
                      <CheckIcon stroke="#9CA3AF" />
                    </div>
                    <div className="flex-1 text-[rgba(55,50,47,0.80)] text-[12.5px] font-normal leading-5 font-sans">
                      {feature}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth (highlighted) */}
            <div className="flex-1 self-stretch px-6 py-8 bg-[#37322F] border border-[#37322F] overflow-hidden flex flex-col justify-start items-start gap-12">
              <div className="self-stretch flex flex-col justify-start items-start gap-9">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="text-[#FBFAF9] text-lg font-medium leading-7 font-sans">Growth</div>
                    <div className="px-2.5 py-0.5 rounded-full bg-[var(--chidi-win)]/15 border border-[var(--chidi-win)]/30">
                      <span className="text-[var(--chidi-win)] text-[10px] font-semibold uppercase tracking-[0.14em] leading-none font-sans">
                        Recommended
                      </span>
                    </div>
                  </div>
                  <div className="w-full max-w-[242px] text-[#B2AEA9] text-sm font-normal leading-5 font-sans">
                    For growing businesses that rely on chat to drive sales every day.
                  </div>
                </div>

                <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                  <div className="flex items-end gap-1.5">
                    <span className="text-[#F0EFEE] text-5xl font-normal leading-none font-serif">₦15,000</span>
                    <span className="text-[#D2C6BF] text-sm font-medium font-sans pb-1">/month</span>
                  </div>
                  <div className="text-white text-base md:text-lg font-semibold leading-6 font-sans">
                    A full-time assistant for less than ₦500 per day.
                  </div>
                </div>

                <a
                  href={SIGNUP_URL}
                  className="self-stretch h-11 px-4 relative bg-[#FBFAF9] shadow-[0px_2px_4px_rgba(55,50,47,0.12)] overflow-hidden rounded-[99px] flex justify-center items-center hover:bg-white transition-colors"
                >
                  <div className="w-full h-full absolute left-0 top-0 bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                  <span className="relative text-[#37322F] text-[13px] font-medium leading-5 font-sans">Get Started</span>
                </a>
              </div>

              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <div className="text-white/80 text-[12.5px] font-medium leading-5 font-sans">Everything in Starter, plus:</div>
                {growthFeatures.map((feature) => (
                  <div key={feature} className="self-stretch flex justify-start items-center gap-[13px]">
                    <div className="w-4 h-4 relative flex items-center justify-center shrink-0">
                      <CheckIcon stroke="var(--chidi-win)" />
                    </div>
                    <div className="flex-1 text-[#F0EFEE] text-[12.5px] font-normal leading-5 font-sans">{feature}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <GutterStrip count={200} />
        </div>
      </div>
    </div>
  )
}

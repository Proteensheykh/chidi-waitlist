"use client"

import { GutterStrip } from "@/components/gutter-strip"
import { Reveal } from "@/components/reveal"

const SIGNUP_URL = "https://my.chidi.app/auth?tab=signup"

function CheckIcon({ stroke }: { stroke: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 3L4.5 8.5L2 6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface Plan {
  name: string
  description: string
  price: string
  valueNote: string
  cta: string
  featuresPrefix?: string
  features: string[]
  highlighted?: boolean
  recommended?: boolean
}

const plans: Plan[] = [
  {
    name: "Side Hustle",
    description: "For businesses exploring the Chidi way of doing things.",
    price: "₦0",
    valueNote: "Try the platform and experience the difference.",
    cta: "Start for Free",
    features: [
      "Basic order capture",
      "Limited AI-assisted replies",
      "Automated order capture",
      "Customer records",
      "Up to 50 conversations/month",
      "Email support",
    ],
  },
  {
    name: "Grow",
    description: "For growing businesses that rely on chat to drive sales every day.",
    price: "₦15,000",
    valueNote: "A full-time assistant for less than ₦500 per day.",
    cta: "Get Started",
    highlighted: true,
    recommended: true,
    featuresPrefix: "Everything in Side Hustle, plus:",
    features: [
      "Unlimited conversations",
      "Automated product enquiries",
      "Inventory tracking",
      "Payment status tracking",
      "Customer CRM",
      "Sales analytics",
      "Repeat customer insights",
      "Priority support",
      "Early access to new features",
    ],
  },
  {
    name: "Soft Life",
    description: "For businesses that mean business.",
    price: "₦45,000",
    valueNote: "Exactly what the plan says; “Soft life”.",
    cta: "Get Started",
    featuresPrefix: "Everything in Grow, plus:",
    features: [
      "Advanced customer segmentation",
      "Automated follow-ups",
      "Abandoned order recovery",
      "Staff accounts",
      "Advanced analytics beyond your business data",
      "Dedicated onboarding",
      "VIP support",
      "Early access to new features",
    ],
  },
]

function PlanCard({ plan }: { plan: Plan }) {
  const hi = plan.highlighted

  return (
    <div
      className={`flex-1 self-stretch px-6 py-8 overflow-hidden flex flex-col justify-start items-start gap-12 border ${
        hi ? "bg-[#37322F] border-[#37322F]" : "border-[rgba(55,50,47,0.12)]"
      }`}
    >
      <div className="self-stretch flex flex-col justify-start items-start gap-9">
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className={`text-lg font-medium leading-7 font-sans ${hi ? "text-[#FBFAF9]" : "text-[rgba(55,50,47,0.90)]"}`}
            >
              {plan.name}
            </div>
            {plan.recommended && (
              <div className="px-2.5 py-0.5 rounded-full bg-[var(--chidi-win)]/15 border border-[var(--chidi-win)]/30">
                <span className="text-[var(--chidi-win)] text-[10px] font-semibold uppercase tracking-[0.14em] leading-none font-sans">
                  Recommended
                </span>
              </div>
            )}
          </div>
          <div
            className={`w-full max-w-[242px] text-sm font-normal leading-5 font-sans ${
              hi ? "text-[#B2AEA9]" : "text-[rgba(41,37,35,0.70)]"
            }`}
          >
            {plan.description}
          </div>
        </div>

        <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
          <div className="flex items-end gap-1.5">
            <span className={`text-5xl font-normal leading-none font-serif ${hi ? "text-[#F0EFEE]" : "text-[#37322F]"}`}>
              {plan.price}
            </span>
            <span className={`text-sm font-medium font-sans pb-1 ${hi ? "text-[#D2C6BF]" : "text-[#847971]"}`}>
              /month
            </span>
          </div>
          <div className={`text-base md:text-lg font-semibold leading-6 font-sans ${hi ? "text-white" : "text-[#37322F]"}`}>
            {plan.valueNote}
          </div>
        </div>

        <a
          href={SIGNUP_URL}
          className={`self-stretch h-11 px-4 relative shadow-[0px_2px_4px_rgba(55,50,47,0.12)] overflow-hidden rounded-[99px] flex justify-center items-center transition-colors ${
            hi ? "bg-[#FBFAF9] hover:bg-white" : "bg-[#37322F] hover:bg-[#2A2520]"
          }`}
        >
          <div
            className={`w-full h-full absolute left-0 top-0 bg-gradient-to-b ${
              hi ? "from-[rgba(255,255,255,0)]" : "from-[rgba(255,255,255,0.20)]"
            } to-[rgba(0,0,0,0.10)] mix-blend-multiply`}
          ></div>
          <span className={`relative text-[13px] font-medium leading-5 font-sans ${hi ? "text-[#37322F]" : "text-[#FBFAF9]"}`}>
            {plan.cta}
          </span>
        </a>
      </div>

      <div className="self-stretch flex flex-col justify-start items-start gap-3">
        {plan.featuresPrefix && (
          <div
            className={`text-[12.5px] font-medium leading-5 font-sans ${hi ? "text-white/80" : "text-[rgba(55,50,47,0.70)]"}`}
          >
            {plan.featuresPrefix}
          </div>
        )}
        {plan.features.map((feature) => (
          <div key={feature} className="self-stretch flex justify-start items-center gap-[13px]">
            <div className="w-4 h-4 relative flex items-center justify-center shrink-0">
              <CheckIcon stroke={hi ? "var(--chidi-win)" : "#9CA3AF"} />
            </div>
            <div
              className={`flex-1 text-[12.5px] font-normal leading-5 font-sans ${
                hi ? "text-[#F0EFEE]" : "text-[rgba(55,50,47,0.80)]"
              }`}
            >
              {feature}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>

          <GutterStrip count={200} />
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import SmartSimpleBrilliant from "@/components/smart-simple-brilliant"
import YourWorkInSync from "@/components/your-work-in-sync"
import EffortlessIntegration from "@/components/effortless-integration-updated"
import NumbersThatSpeak from "@/components/numbers-that-speak"
import DocumentationSection from "@/components/documentation-section"
import TestimonialsSection from "@/components/testimonials-section"
import FAQSection from "@/components/faq-section"
import CTASection from "@/components/cta-section"
import FooterSection from "@/components/footer-section"

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)] shadow-xs">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
      <div className="text-center flex justify-center flex-col text-[#37322F] text-xs font-medium leading-3 font-sans">
        {text}
      </div>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  isActive,
  animationKey,
  onClick,
}: {
  title: string
  description: string
  isActive: boolean
  animationKey: number
  onClick: () => void
}) {
  return (
    <div
      className={`w-full md:flex-1 self-stretch overflow-hidden flex flex-col justify-start items-start cursor-pointer transition-all duration-300 ${
        isActive
          ? "bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB_inset]"
          : "border-l-0 border-r-0 md:border border-[#E0DEDB]/80"
      }`}
      onClick={onClick}
    >
      <div
        className={`w-full h-0.5 bg-[rgba(50,45,43,0.08)] overflow-hidden ${isActive ? "opacity-100" : "opacity-0"}`}
      >
        <div
          key={animationKey}
          className="h-0.5 bg-[#322D2B] animate-[progressBar_5s_linear_forwards] will-change-transform"
        />
      </div>
      <div className="px-6 py-5 flex flex-col gap-2">
        <div className="self-stretch flex justify-center flex-col text-[#49423D] text-sm md:text-sm font-semibold leading-6 md:leading-6 font-sans">
          {title}
        </div>
        <div className="self-stretch text-[#605A57] text-[13px] md:text-[13px] font-normal leading-[22px] md:leading-[22px] font-sans">
          {description}
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [activeCard, setActiveCard] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3)
      setAnimationKey((prev) => prev + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleCardClick = (index: number) => {
    setActiveCard(index)
    setAnimationKey((prev) => prev + 1)
  }

  return (
    <>
      <Header />

      <div className="w-full min-h-screen relative bg-[#F7F5F3] overflow-x-hidden flex flex-col justify-start items-center">
        <div className="relative flex flex-col justify-start items-center w-full">
          {/* Main container with proper margins */}
          <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] relative flex flex-col justify-start items-start min-h-screen">
            {/* Left vertical line */}
            <div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

            {/* Right vertical line */}
            <div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

            <div className="self-stretch pt-[9px] overflow-hidden border-b border-[rgba(55,50,47,0.06)] flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[66px] relative z-10">
              {/* Hero Section */}
              <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-[216px] pb-8 sm:pb-12 md:pb-16 flex flex-col justify-start items-center px-2 sm:px-4 md:px-8 lg:px-0 w-full sm:pl-0 sm:pr-0 pl-0 pr-0">
                <div className="w-full max-w-[937px] lg:w-[937px] flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                  <div className="self-stretch rounded-[3px] flex flex-col justify-center items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                    <div className="w-full max-w-[748.71px] lg:w-[748.71px] text-center flex justify-center flex-col text-[#37322F] text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-normal leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-24 font-serif px-2 sm:px-4 md:px-0">
                      Run your entire business
                      <br />
                      through chat
                    </div>
                    <div className="w-full max-w-[506.08px] lg:w-[506.08px] text-center flex justify-center flex-col text-[rgba(55,50,47,0.80)] text-sm sm:text-base md:text-lg leading-[1.5] sm:leading-[1.55] md:leading-[1.6] lg:leading-7 font-sans px-2 sm:px-4 md:px-0 font-normal">
                      Manage customers, track orders and inventory — and sell on autopilot through your Telegram
                      self-service channel. No spreadsheets. No switching apps. No chaos.
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-[497px] lg:w-[497px] flex flex-col justify-center items-center gap-4 sm:gap-5 md:gap-6 relative z-10 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                  <div className="backdrop-blur-[8.25px] flex justify-start items-center gap-4">
                    <a
                      href="https://my.chidi.app/auth?tab=signup"
                      className="h-10 sm:h-11 md:h-12 px-6 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-[6px] relative bg-[#37322F] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] overflow-hidden rounded-full flex justify-center items-center hover:bg-[#2A2520] transition-colors"
                    >
                      <div className="w-20 sm:w-24 md:w-28 lg:w-44 h-[41px] absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                      <div className="flex flex-col justify-center text-white text-sm sm:text-base md:text-[15px] font-medium leading-5 font-sans">
                        Try Chidi now
                      </div>
                    </a>
                  </div>
                  <div className="text-center text-[rgba(55,50,47,0.60)] text-xs sm:text-sm font-medium leading-5 font-sans">
                    Launching with Telegram. WhatsApp & Instagram coming very soon.
                  </div>
                </div>

                <div className="absolute top-[232px] sm:top-[248px] md:top-[264px] lg:top-[320px] left-1/2 transform -translate-x-1/2 z-0 pointer-events-none">
                  <img
                    src="/mask-group-pattern.svg"
                    alt=""
                    className="w-[936px] sm:w-[1404px] md:w-[2106px] lg:w-[2808px] h-auto opacity-30 sm:opacity-40 md:opacity-50 mix-blend-multiply"
                    style={{
                      filter: "hue-rotate(15deg) saturate(0.7) brightness(1.2)",
                    }}
                  />
                </div>

                <div className="w-full max-w-[960px] lg:w-[960px] pt-2 sm:pt-4 pb-6 sm:pb-8 md:pb-10 px-2 sm:px-4 md:px-6 lg:px-11 flex flex-col justify-center items-center gap-2 relative z-5 my-8 sm:my-12 md:my-16 lg:my-16 mb-0 lg:pb-0">
                  <div className="w-full max-w-[960px] lg:w-[960px] h-[200px] sm:h-[280px] md:h-[450px] lg:h-[695.55px] bg-white shadow-[0px_0px_0px_0.9056603908538818px_rgba(0,0,0,0.08)] overflow-hidden rounded-[6px] sm:rounded-[8px] lg:rounded-[9.06px] flex flex-col justify-start items-start">
                    {/* Dashboard Content */}
                    <div className="self-stretch flex-1 flex justify-start items-start">
                      {/* Main Content */}
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="relative w-full h-full overflow-hidden">
                          {/* Product Image 1 - Conversation Management */}
                          <div
                            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                              activeCard === 0 ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"
                            }`}
                          >
                            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                              <div className="text-center text-[#605A57] p-8">
                                <div className="text-6xl mb-4">💬</div>
                                <div className="text-lg font-medium">Smart Conversations</div>
                                <div className="text-sm opacity-70">Reply instantly to customer questions</div>
                              </div>
                            </div>
                          </div>

                          {/* Product Image 2 - Orders & Payments */}
                          <div
                            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                              activeCard === 1 ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"
                            }`}
                          >
                            <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
                              <div className="text-center text-[#605A57] p-8">
                                <div className="text-6xl mb-4">📦</div>
                                <div className="text-lg font-medium">Orders & Payments</div>
                                <div className="text-sm opacity-70">Turn chats into trackable orders</div>
                              </div>
                            </div>
                          </div>

                          {/* Product Image 3 - Inventory & Insights */}
                          <div
                            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                              activeCard === 2 ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"
                            }`}
                          >
                            <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
                              <div className="text-center text-[#605A57] p-8">
                                <div className="text-6xl mb-4">📊</div>
                                <div className="text-lg font-medium">Inventory & Insights</div>
                                <div className="text-sm opacity-70">Track products and see your sales</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="self-stretch border-t border-[#E0DEDB] border-b border-[#E0DEDB] flex justify-center items-start">
                  <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
                    {/* Left decorative pattern */}
                    <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
                      {Array.from({ length: 50 }).map((_, i) => (
                        <div
                          key={i}
                          className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 px-0 sm:px-2 md:px-0 flex flex-col md:flex-row justify-center items-stretch gap-0">
                    <FeatureCard
                      title="Smart conversations"
                      description="Your AI shop assistant answers customer questions instantly 24/7."
                      isActive={activeCard === 0}
                      animationKey={activeCard === 0 ? animationKey : 0}
                      onClick={() => handleCardClick(0)}
                    />
                    <FeatureCard
                      title="Orders & payments"
                      description="Turn chats into trackable orders. Know who paid and who hasn't."
                      isActive={activeCard === 1}
                      animationKey={activeCard === 1 ? animationKey : 0}
                      onClick={() => handleCardClick(1)}
                    />
                    <FeatureCard
                      title="Inventory & insights"
                      description="Track products, sizes, stock levels — see your sales in real time."
                      isActive={activeCard === 2}
                      animationKey={activeCard === 2 ? animationKey : 0}
                      onClick={() => handleCardClick(2)}
                    />
                  </div>

                  <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
                    {/* Right decorative pattern */}
                    <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
                      {Array.from({ length: 50 }).map((_, i) => (
                        <div
                          key={i}
                          className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bento Grid Section */}
                <div
                  id="features"
                  className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center"
                >
                  {/* Header Section */}
                  <div className="self-stretch px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] py-8 sm:py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6">
                    <div className="w-full max-w-[616px] lg:w-[616px] px-4 sm:px-6 py-4 sm:py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4 shadow-none">
                      <Badge
                        icon={
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect x="1" y="1" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
                            <rect x="7" y="1" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
                            <rect x="1" y="7" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
                            <rect x="7" y="7" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
                          </svg>
                        }
                        text="Core Features"
                      />
                      <div className="w-full max-w-[598.06px] lg:w-[598.06px] text-center flex justify-center flex-col text-[#49423D] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
                        Everything your business needs
                      </div>
                      <div className="self-stretch text-center text-[#605A57] text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
                        From conversations to conversions, Chidi handles it all
                        <br />
                        so you can focus on what matters most.
                      </div>
                    </div>
                  </div>

                  {/* Bento Grid Content */}
                  <div className="self-stretch flex justify-center items-start">
                    <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
                      {/* Left decorative pattern */}
                      <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
                        {Array.from({ length: 200 }).map((_, i) => (
                          <div
                            key={i}
                            className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-r border-[rgba(55,50,47,0.12)]">
                      {/* Top Left - Every customer, remembered */}
                      <div className="border-b border-r-0 md:border-r border-[rgba(55,50,47,0.12)] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6">
                        <div className="flex flex-col gap-2">
                          <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold leading-tight font-sans">
                            Every customer, remembered
                          </h3>
                          <p className="text-[#605A57] text-sm md:text-base font-normal leading-relaxed font-sans">
                            Every chat, order, and detail lives in one timeline per customer. Pick up exactly where you
                            left off — even months later.
                          </p>
                        </div>
                        <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex items-center justify-center overflow-hidden">
                          <SmartSimpleBrilliant
                            width="100%"
                            height="100%"
                            theme="light"
                            className="scale-50 sm:scale-65 md:scale-75 lg:scale-90"
                          />
                        </div>
                      </div>

                      {/* Top Right - Replies that feel human, at machine speed */}
                      <div className="border-b border-[rgba(55,50,47,0.12)] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6">
                        <div className="flex flex-col gap-2">
                          <h3 className="text-[#37322F] font-semibold leading-tight font-sans text-lg sm:text-xl">
                            Replies that feel human, at machine speed
                          </h3>
                          <p className="text-[#605A57] text-sm md:text-base font-normal leading-relaxed font-sans">
                            Chidi answers product questions, qualifies leads, and books orders the moment they come in —
                            so customers don't wait and you don't lose sales to slow responses.
                          </p>
                        </div>
                        <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex overflow-hidden text-right items-center justify-center">
                          <YourWorkInSync
                            width="400"
                            height="250"
                            theme="light"
                            className="scale-60 sm:scale-75 md:scale-90"
                          />
                        </div>
                      </div>

                      {/* Bottom Left - Built for every channel */}
                      <div className="border-r-0 md:border-r border-[rgba(55,50,47,0.12)] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6 bg-transparent">
                        <div className="flex flex-col gap-2">
                          <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold leading-tight font-sans">
                            Built for every channel. Telegram first.
                          </h3>
                          <p className="text-[#605A57] text-sm md:text-base font-normal leading-relaxed font-sans">
                            Spin up your AI-powered Telegram channel today. WhatsApp Business and Instagram coming very
                            soon — same Chidi, more reach. Your customers, inventory, and orders follow you across all of them.
                          </p>
                        </div>
                        <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex overflow-hidden justify-center items-center relative bg-transparent">
                          <div className="w-full h-full flex items-center justify-center bg-transparent">
                            <EffortlessIntegration width={400} height={250} className="max-w-full max-h-full" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F7F5F3] to-transparent pointer-events-none"></div>
                        </div>
                      </div>

                      {/* Bottom Right - Know what's working */}
                      <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6">
                        <div className="flex flex-col gap-2">
                          <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold leading-tight font-sans">
                            Know what's working
                          </h3>
                          <p className="text-[#605A57] text-sm md:text-base font-normal leading-relaxed font-sans">
                            Sales, customers, products, and inventory — all tracked in real time as orders flow through
                            Chidi. See what's selling, what's running low, and who's coming back.
                          </p>
                        </div>
                        <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex overflow-hidden items-center justify-center relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <NumbersThatSpeak
                              width="100%"
                              height="100%"
                              theme="light"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F7F5F3] to-transparent pointer-events-none"></div>
                        </div>
                      </div>
                    </div>

                    <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
                      {/* Right decorative pattern */}
                      <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
                        {Array.from({ length: 200 }).map((_, i) => (
                          <div
                            key={i}
                            className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documentation Section */}
                <DocumentationSection />

                {/* Testimonials Section */}
                <TestimonialsSection />

                {/* FAQ Section */}
                <FAQSection />

                {/* CTA Section */}
                <CTASection />

                {/* Footer Section */}
                <FooterSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

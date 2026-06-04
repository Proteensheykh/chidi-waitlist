"use client"

import { GutterStrip } from "@/components/gutter-strip"
import { Reveal } from "@/components/reveal"
import ChidiAssistantQA from "@/components/chidi-assistant-qa"
import ChidiShopLink from "@/components/chidi-shop-link"
import NumbersThatSpeak from "@/components/numbers-that-speak"
import YourWorkInSync from "@/components/your-work-in-sync"

function Badge({ text }: { text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-[var(--card)] shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-center items-center border border-[var(--chidi-border-default)]">
      <div className="text-center flex justify-center flex-col text-[var(--chidi-text-primary)] text-[11px] font-medium uppercase tracking-[0.18em] leading-[1.4] font-sans">
        {text}
      </div>
    </div>
  )
}

export function BentoFeatures() {
  return (
    <div
      id="features"
      className="w-full border-b border-[var(--chidi-border-default)] flex flex-col justify-center items-center"
    >
      <div className="self-stretch px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] py-8 sm:py-12 md:py-16 border-b border-[var(--chidi-border-default)] flex justify-center items-center gap-6">
        <Reveal className="w-full max-w-[616px] lg:w-[616px] px-4 sm:px-6 py-4 sm:py-5 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4">
          <Badge text="Core Features" />
          <h2 className="w-full max-w-[598.06px] lg:w-[598.06px] text-center flex justify-center flex-col text-[var(--chidi-text-primary)] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Everything your business needs
          </h2>
          <p className="self-stretch text-center text-[var(--chidi-text-secondary)] text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
            Chidi turns your chats into orders, your orders into insights,
            <br />
            and your customers into regulars.
          </p>
        </Reveal>
      </div>

      <div className="self-stretch flex justify-center items-start">
        <GutterStrip count={200} />

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-r border-[var(--chidi-border-default)]">
          <Reveal
            delay={0}
            className="border-b border-r-0 md:border-r border-[var(--chidi-border-default)] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-[var(--chidi-text-primary)] text-[18px] md:text-[20px] font-semibold leading-[1.3] tracking-[-0.005em] font-sans">
                In-app Chidi AI assistant
              </h3>
              <p className="text-[var(--chidi-text-secondary)] text-sm font-normal leading-[1.55] font-sans">
                Ask Chidi what is happening across your shop and what to do next. It uses live inventory,
                orders, customers, and conversations to answer business questions, spot issues, and suggest
                clear next steps without manual searching.
              </p>
            </div>
            <div className="w-full h-[380px] sm:h-[420px] md:h-[460px] lg:h-[480px] rounded-lg flex items-center justify-center overflow-hidden">
              <ChidiAssistantQA
                width={340}
                height={460}
                theme="light"
                startDelay={0}
                className="scale-75 sm:scale-85 md:scale-95 lg:scale-100"
              />
            </div>
          </Reveal>

          <Reveal
            delay={80}
            className="border-b border-[var(--chidi-border-default)] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-[var(--chidi-text-primary)] text-[18px] md:text-[20px] font-semibold leading-[1.3] tracking-[-0.005em] font-sans">
                Replies that feel human, at machine speed
              </h3>
              <p className="text-[var(--chidi-text-secondary)] text-sm font-normal leading-[1.55] font-sans">
                Chidi answers product questions, qualifies leads, and books orders the moment they come in,
                so customers don&apos;t wait and you don&apos;t lose sales to slow responses.
              </p>
            </div>
            <div className="w-full h-[380px] sm:h-[420px] md:h-[460px] lg:h-[480px] rounded-lg flex overflow-hidden items-center justify-center">
              <YourWorkInSync
                width={340}
                height={460}
                theme="light"
                startDelay={350}
                className="scale-75 sm:scale-85 md:scale-95 lg:scale-100"
              />
            </div>
          </Reveal>

          <Reveal
            delay={160}
            className="border-r-0 md:border-r border-[var(--chidi-border-default)] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6 bg-transparent"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-[var(--chidi-text-primary)] text-[18px] md:text-[20px] font-semibold leading-[1.3] tracking-[-0.005em] font-sans">
                A shop link customers can browse
              </h3>
              <p className="text-[var(--chidi-text-secondary)] text-sm font-normal leading-[1.55] font-sans">
                Give customers one ready-to-share shop link for your products. They can browse items,
                variants, prices, and stock, then tap to order through WhatsApp or Telegram. Update products
                in Chidi once, and your public catalog stays current.
              </p>
            </div>
            <div className="w-full h-[380px] sm:h-[420px] md:h-[460px] lg:h-[480px] rounded-lg flex overflow-hidden justify-center items-center relative bg-transparent">
              <ChidiShopLink
                width={340}
                height={460}
                theme="light"
                startDelay={700}
                className="scale-75 sm:scale-85 md:scale-95 lg:scale-100"
              />
            </div>
          </Reveal>

          <Reveal
            delay={240}
            className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-[var(--chidi-text-primary)] text-[18px] md:text-[20px] font-semibold leading-[1.3] tracking-[-0.005em] font-sans">
                Know what&apos;s working
              </h3>
              <p className="text-[var(--chidi-text-secondary)] text-sm font-normal leading-[1.55] font-sans">
                Sales, customers, products, and inventory — all tracked in real time as orders flow through
                Chidi. See what&apos;s selling, what&apos;s running low, and who&apos;s coming back.
              </p>
            </div>
            <div className="w-full h-[380px] sm:h-[420px] md:h-[460px] lg:h-[480px] rounded-lg flex overflow-hidden items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <NumbersThatSpeak
                  width={340}
                  height={460}
                  theme="light"
                  startDelay={1050}
                  className="scale-75 sm:scale-85 md:scale-95 lg:scale-100"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <GutterStrip count={200} />
      </div>
    </div>
  )
}

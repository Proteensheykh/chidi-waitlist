"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What is Chidi and who is it for?",
    answer:
      "Chidi is an AI business assistant for social sellers. You manage customers, orders, and inventory just by chatting with Chidi. We also give your business a self-service Telegram channel where customers browse, ask, and order on their own — perfect for fashion brands, boutiques, beauty vendors, and retail.",
  },
  {
    question: "Do you support WhatsApp and Instagram?",
    answer:
      "Telegram is our launch channel — we're going live with it now. WhatsApp Business and Instagram integrations are actively in the works and shipping very soon. They'll plug into the same Chidi you already know, so your customers, inventory, and orders carry over automatically.",
  },
  {
    question: "How does Chidi handle my customer conversations?",
    answer:
      "Chidi powers a Telegram channel for your business that automatically answers questions, takes orders, and keeps full context of every customer — so nothing slips through, even after hours.",
  },
  {
    question: "Can Chidi really help me track sales and orders?",
    answer:
      "Yes! Chidi automatically turns chats into trackable orders, tracks payment status, and keeps customer records organized. Get real-time insights into your sales without manual data entry or spreadsheets.",
  },
  {
    question: "What makes Chidi different from other tools?",
    answer:
      "Chidi is built specifically for businesses that sell through chat. It works offline and syncs later (perfect for unreliable internet), supports multiple languages including local dialects, and understands the unique challenges of social commerce.",
  },
  {
    question: "Is my customer data secure with Chidi?",
    answer:
      "Absolutely. We use enterprise-grade encryption and comply with international data protection regulations. Your data is private, secure, and never shared with third parties.",
  },
  {
    question: "How quickly can I get started?",
    answer:
      "In minutes. Sign up, connect your Telegram channel, upload your inventory, and Chidi starts answering customers and tracking orders right away.",
  },
]

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="w-full flex justify-center items-start">
      <div className="flex-1 px-4 md:px-12 py-16 md:py-20 flex flex-col lg:flex-row justify-start items-start gap-6 lg:gap-12">
        {/* Left Column - Header */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-start gap-4 lg:py-5">
          <div className="w-full flex flex-col justify-center text-[#49423D] font-semibold leading-tight md:leading-[44px] font-sans text-4xl tracking-tight">
            Frequently Asked Questions
          </div>
          <div className="w-full text-[#605A57] text-base font-normal leading-7 font-sans">
            Everything you need to know about
            <br className="hidden md:block" />
            running your business with Chidi.
          </div>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-center">
          <div className="w-full flex flex-col">
            {faqData.map((item, index) => {
              const isOpen = openItems.includes(index)

              return (
                <div key={index} className="w-full border-b border-[rgba(73,66,61,0.16)] overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-5 py-[18px] flex justify-between items-center gap-5 text-left hover:bg-[rgba(73,66,61,0.02)] transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1 text-[#49423D] text-base font-medium leading-6 font-sans">
                      {item.question}
                    </div>
                    <div className="flex justify-center items-center">
                      <ChevronDownIcon
                        className={`w-6 h-6 text-[rgba(73,66,61,0.60)] transition-transform duration-300 ease-in-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-[18px] text-[#605A57] text-sm font-normal leading-6 font-sans">
                      {item.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

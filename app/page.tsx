"use client";

import { useState } from "react";
import {
  MessageCircle,
  Users,
  ShoppingBag,
  Package,
  ArrowRight,
  Check,
  Sparkles,
  Link as LinkIcon,
  ClipboardList,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

// Chat questions for the differentiator section
const CHAT_QUESTIONS = [
  "How much did I sell this week?",
  "Which products are running low?",
  "Who are my top customers?",
  "What was my revenue last month?",
];

export default function HomePage() {
  const [activeQuestion, setActiveQuestion] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--chidi-border-subtle)]">
        <div className="container-marketing px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[var(--chidi-text-primary)]">
            Chidi
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="#demo"
              className="hidden sm:inline-flex text-sm font-medium text-[var(--chidi-text-secondary)] hover:text-[var(--chidi-text-primary)] transition-colors"
            >
              Request a demo
            </Link>
            <Link
              href="https://chidi-web-client-git-ui-facelift-mo-hammed.vercel.app/auth"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-[var(--chidi-accent)] text-[var(--chidi-accent-foreground)] transition-all hover:shadow-lg hover:shadow-black/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 animate-gradient-shift"
            style={{
              background:
                "linear-gradient(-45deg, #fafafa, #f5f5f0, #faf8f5, #f8f8f8, #f5f0e8)",
              backgroundSize: "400% 400%",
            }}
          />
          {/* Floating orbs */}
          <div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-200/25 to-orange-100/15 blur-3xl animate-floating-orb"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-stone-200/35 to-neutral-100/25 blur-3xl animate-floating-orb"
            style={{ animationDelay: "-5s" }}
          />
          <div
            className="absolute top-1/2 right-1/3 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-emerald-100/20 to-teal-50/15 blur-3xl animate-floating-orb"
            style={{ animationDelay: "-10s" }}
          />
          {/* Subtle dot pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle, #d4d4d4 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative z-10 container-marketing px-6 py-20 text-center">
          <h1
            className="heading-hero text-[var(--chidi-text-primary)] mb-6 animate-fade-scale-in"
            style={{ animationDelay: "0ms" }}
          >
            Turn social media conversations
            <br className="hidden sm:block" />
            <span className="relative">
              into organised sales.
            </span>
          </h1>

          <p
            className="body-large text-[var(--chidi-text-secondary)] max-w-2xl mx-auto mb-10 animate-fade-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            Manage chats, customers, orders and stock in one place, and ask your
            business questions whenever you need clarity.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-slide-up"
            style={{ animationDelay: "400ms" }}
          >
            <Link href="https://chidi-web-client-git-ui-facelift-mo-hammed.vercel.app/auth" className="btn-primary">
              Get started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="#demo" className="btn-secondary">
              Request a demo
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHO IT IS FOR */}
      <section className="section-padding bg-white">
        <div className="container-marketing text-center">
          <h2
            className="heading-section text-[var(--chidi-text-primary)] mb-6"
          >
            Built for businesses that sell through conversations.
          </h2>
          <p className="body-large text-[var(--chidi-text-secondary)] max-w-2xl mx-auto">
            If customers message you to buy, Chidi helps you organise everything
            behind the scenes. From first message to completed order.
          </p>
        </div>
      </section>

      {/* SECTION 3: CORE CAPABILITIES */}
      <section className="section-padding section-highlighted">
        <div className="container-marketing">
          <h2 className="heading-section text-[var(--chidi-text-primary)] text-center mb-14">
            Everything your social sales need.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Chats */}
            <div className="card-feature group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="heading-feature text-[var(--chidi-text-primary)] mb-2">
                Chats
              </h3>
              <p className="body-default text-[var(--chidi-text-secondary)]">
                Keep customer conversations organised and easy to follow.
              </p>
            </div>

            {/* Customers */}
            <div className="card-feature group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="heading-feature text-[var(--chidi-text-primary)] mb-2">
                Customers
              </h3>
              <p className="body-default text-[var(--chidi-text-secondary)]">
                Store names, phone numbers and purchase history automatically.
              </p>
            </div>

            {/* Orders and Sales */}
            <div className="card-feature group">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="heading-feature text-[var(--chidi-text-primary)] mb-2">
                Orders and Sales
              </h3>
              <p className="body-default text-[var(--chidi-text-secondary)]">
                Record every order and track how your business is performing.
              </p>
            </div>

            {/* Inventory */}
            <div className="card-feature group">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Package className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="heading-feature text-[var(--chidi-text-primary)] mb-2">
                Inventory
              </h3>
              <p className="body-default text-[var(--chidi-text-secondary)]">
                Keep stock updated as sales happen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: DIFFERENTIATOR */}
      <section className="section-padding bg-[var(--chidi-surface)]">
        <div className="container-marketing">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Ask your business anything
              </div>
              <h2 className="heading-section text-[var(--chidi-text-primary)] mb-6">
                Talk to your business.
              </h2>
              <p className="body-large text-[var(--chidi-text-secondary)] mb-8">
                Chidi keeps track of your customers, sales and inventory in the
                background. When you need clarity, just ask:
              </p>

              {/* Question buttons */}
              <div className="flex flex-wrap gap-2 mb-8">
                {CHAT_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveQuestion(index)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeQuestion === index
                        ? "bg-[var(--chidi-accent)] text-[var(--chidi-accent-foreground)]"
                        : "bg-white text-[var(--chidi-text-secondary)] border border-[var(--chidi-border-default)] hover:border-[var(--chidi-text-muted)]"
                    }`}
                  >
                    {question}
                  </button>
                ))}
              </div>

              <p className="body-default text-[var(--chidi-text-secondary)]">
                You get clear, up to date answers. No reports to build. No
                spreadsheets to check.
              </p>
            </div>

            {/* Right: Chat UI Mock */}
            <div className="relative">
              <div className="bg-white rounded-3xl border border-[var(--chidi-border-subtle)] shadow-xl shadow-black/5 overflow-hidden">
                {/* Chat header */}
                <div className="px-5 py-4 border-b border-[var(--chidi-border-subtle)] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--chidi-accent)] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--chidi-text-primary)]">
                      Chidi
                    </p>
                    <p className="text-xs text-[var(--chidi-text-muted)]">
                      Your business assistant
                    </p>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="p-5 space-y-4 min-h-[280px]">
                  {/* User question */}
                  <div
                    key={activeQuestion}
                    className="chat-bubble chat-bubble-user animate-slide-in-right"
                  >
                    {CHAT_QUESTIONS[activeQuestion]}
                  </div>

                  {/* Assistant response */}
                  <div
                    className="chat-bubble chat-bubble-assistant animate-slide-in-right"
                    style={{ animationDelay: "300ms" }}
                  >
                    {activeQuestion === 0 && (
                      <>
                        You sold <strong>₦847,500</strong> this week across{" "}
                        <strong>23 orders</strong>. That's 12% higher than last
                        week! 📈
                      </>
                    )}
                    {activeQuestion === 1 && (
                      <>
                        <strong>3 products</strong> are running low:
                        <br />• Blue Ankara Dress (2 left)
                        <br />• Leather Handbag (1 left)
                        <br />• Wireless Earbuds (3 left)
                      </>
                    )}
                    {activeQuestion === 2 && (
                      <>
                        Your top 3 customers this month:
                        <br />
                        1. <strong>Amara O.</strong> – ₦125,000
                        <br />
                        2. <strong>Kwame A.</strong> – ₦98,500
                        <br />
                        3. <strong>Fatima B.</strong> – ₦87,200
                      </>
                    )}
                    {activeQuestion === 3 && (
                      <>
                        Last month's revenue: <strong>₦3,245,000</strong>
                        <br />
                        Total orders: <strong>89</strong>
                        <br />
                        Average order value: <strong>₦36,460</strong>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-200/40 to-orange-100/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-emerald-100/40 to-teal-50/30 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section className="section-padding bg-white">
        <div className="container-marketing">
          <h2 className="heading-section text-[var(--chidi-text-primary)] text-center mb-6">
            Simple setup. Structured selling.
          </h2>
          <p className="body-large text-[var(--chidi-text-secondary)] text-center max-w-xl mx-auto mb-14">
            Get started in minutes and bring order to your social sales.
          </p>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="text-center md:text-left">
              <div className="step-number mx-auto md:mx-0 mb-5">
                <LinkIcon className="w-5 h-5" />
              </div>
              <h3 className="heading-feature text-[var(--chidi-text-primary)] mb-3">
                Connect your social sales channels
              </h3>
              <p className="body-default text-[var(--chidi-text-secondary)]">
                Link WhatsApp, Instagram, or wherever you sell through
                conversations.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center md:text-left">
              <div className="step-number mx-auto md:mx-0 mb-5">
                <ClipboardList className="w-5 h-5" />
              </div>
              <h3 className="heading-feature text-[var(--chidi-text-primary)] mb-3">
                Capture orders directly from conversations
              </h3>
              <p className="body-default text-[var(--chidi-text-secondary)]">
                Turn chat messages into tracked orders with a few taps.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center md:text-left">
              <div className="step-number mx-auto md:mx-0 mb-5">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <h3 className="heading-feature text-[var(--chidi-text-primary)] mb-3">
                Manage your sales and get answers in one place
              </h3>
              <p className="body-default text-[var(--chidi-text-secondary)]">
                See everything clearly. Ask questions. Stay in control.
              </p>
            </div>
          </div>

          <p className="text-center text-[var(--chidi-text-muted)] font-medium mt-12">
            No switching between tools.
          </p>
        </div>
      </section>

      {/* SECTION 6: BENEFITS */}
      <section className="section-padding section-highlighted">
        <div className="container-marketing">
          <h2 className="heading-section text-[var(--chidi-text-primary)] text-center mb-14">
            Run your business with clarity.
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {[
              "Never lose track of a sale.",
              "Know who your customers are.",
              "See what you have sold.",
              "Stay organised as you grow.",
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-5 rounded-xl bg-white border border-[var(--chidi-border-subtle)]"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-[var(--chidi-text-primary)] font-medium">
                  {benefit}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center body-large text-[var(--chidi-text-secondary)]">
            Chidi supports you so you can focus on selling.
          </p>
        </div>
      </section>

      {/* SECTION 7: SCALABILITY */}
      <section className="section-padding-sm bg-white">
        <div className="container-marketing text-center">
          <h2 className="heading-section text-[var(--chidi-text-primary)] mb-6">
            Start simple. Grow confidently.
          </h2>
          <p className="body-large text-[var(--chidi-text-secondary)] max-w-xl mx-auto">
            Begin with one channel. Expand as your business grows.
            <br />
            Chidi adapts to how you sell.
          </p>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section
        id="demo"
        className="section-padding bg-[var(--chidi-accent)] text-[var(--chidi-accent-foreground)]"
      >
        <div className="container-marketing text-center">
          <h2 className="heading-section mb-6">
            Bring order to your social sales.
          </h2>
          <p className="body-large opacity-80 mb-10 max-w-lg mx-auto">
            Start using Chidi today.
          </p>
          <Link
            href="https://chidi-web-client-git-ui-facelift-mo-hammed.vercel.app/auth"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white text-[var(--chidi-accent)] transition-all hover:shadow-xl hover:shadow-black/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            Get started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--chidi-text-primary)] text-white/70 py-12">
        <div className="container-marketing px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="text-xl font-bold text-white"
              >
                Chidi
              </Link>
              <div className="flex items-center gap-6 text-sm">
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/thechidiway"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Follow us on X (Twitter)"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/thechidiway"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm">
            <p>© {new Date().getFullYear()} Chidi. All rights reserved.</p>
            <p className="mt-1">
              Contact:{" "}
              <a
                href="mailto:admin@chidi.app"
                className="hover:text-white transition-colors"
              >
                admin@chidi.app
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

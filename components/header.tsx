"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [developersOpen, setDevelopersOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full border-b border-[#37322f]/6 bg-[#f7f5f3] sticky top-0 z-50">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between py-3 sm:py-4">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <a href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Chidi"
                width={80}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Features Link */}
              <a
                href="#features"
                className="text-[#37322f] hover:text-[#37322f]/80 text-sm font-medium"
              >
                Features
              </a>

              {/* Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <button className="text-[#37322f] hover:text-[#37322f]/80 text-sm font-medium flex items-center gap-1">
                  Resources
                  <ChevronDown className="w-3 h-3" />
                </button>
                {resourcesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#37322f]/10 py-2 z-50">
                    <a
                      href="/privacy"
                      className="block px-4 py-2 text-sm text-[#37322f] hover:bg-[#f7f5f3] transition-colors"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="/terms"
                      className="block px-4 py-2 text-sm text-[#37322f] hover:bg-[#f7f5f3] transition-colors"
                    >
                      Terms of Service
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://my.chidi.app/auth?tab=signup"
              className="h-9 px-4 sm:px-6 bg-[#37322f] hover:bg-[#37322f]/90 text-white rounded-full font-medium text-sm inline-flex items-center justify-center transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-[#37322f]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-[#37322f]/10 mt-2 pt-4">
            <div className="flex flex-col space-y-4">
              {/* Features Link */}
              <a href="#features" className="text-[#37322f] font-medium text-sm">
                Features
              </a>

              {/* Resources Section */}
              <div>
                <div className="text-[#37322f] font-medium text-sm mb-2">Resources</div>
                <div className="flex flex-col space-y-2 pl-4">
                  <a href="/privacy" className="text-[#37322f]/80 text-sm hover:text-[#37322f]">
                    Privacy Policy
                  </a>
                  <a href="/terms" className="text-[#37322f]/80 text-sm hover:text-[#37322f]">
                    Terms of Service
                  </a>
                </div>
              </div>

              {/* Mobile CTA Button */}
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href="https://my.chidi.app/auth?tab=signup"
                  className="w-full h-10 bg-[#37322f] hover:bg-[#37322f]/90 text-white rounded-full font-medium text-sm inline-flex items-center justify-center transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

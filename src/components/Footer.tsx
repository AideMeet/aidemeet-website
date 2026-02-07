'use client'

'use client'

import Image from 'next/image'
import { Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="section-container py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/logo.jpg"
                alt="AideMeet Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold">AideMeet</span>
            </div>
            <p className="text-gray-400 text-sm">
              AI meeting assistant for Sales and HR professionals.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('features')
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="hover:text-white transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('pricing')
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('how-it-works')
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('faq')
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="font-semibold mb-4">Use Cases</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sales Teams
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  HR & Recruiting
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Consultants
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Customer Success
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="mailto:hello@aidemeet.com" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} AideMeet LLC. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <a
                href="https://twitter.com/aidemeet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/aidemeet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@aidemeet.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

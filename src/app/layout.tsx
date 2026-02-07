import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AideMeet - Your AI Meeting Assistant',
  description: 'Never forget a client promise or candidate detail again. AI-powered meeting intelligence for Sales and HR professionals.',
  keywords: 'AI meeting assistant, sales assistant, HR assistant, meeting notes, transcription, CRM integration',
  authors: [{ name: 'AideMeet' }],
  openGraph: {
    title: 'AideMeet - Your AI Meeting Assistant',
    description: 'Never forget a client promise or candidate detail again.',
    url: 'https://aidemeet.com',
    siteName: 'AideMeet',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AideMeet - Your AI Meeting Assistant',
    description: 'Never forget a client promise or candidate detail again.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

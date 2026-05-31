import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import WhyNotCompetitors from '@/components/WhyNotCompetitors'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Founders from '@/components/Founders'
import PilotCTA from '@/components/Pilotcta'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Problem />
      <WhyNotCompetitors />
      <Features />
      <HowItWorks />
      <Pricing />
      <Founders />
      <PilotCTA />
      <FAQ />
      <Footer />
    </main>
  )
}
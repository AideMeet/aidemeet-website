import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import WhyNotCompetitors from '@/components/WhyNotCompetitors'
import Features from '@/components/Features'
import EarlyAccess from '@/components/EarlyAccess'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Problem />
      <div id="why-us">
        <WhyNotCompetitors />
      </div>
      <Features />
      <EarlyAccess />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}

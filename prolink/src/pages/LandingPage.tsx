import HeroSection from "../components/landing/HeroSection"
import HowItWorks from "../components/landing/HowItWorks"
import SmartFeatures from "../components/landing/SmartFeatures"

const LandingPage = () => {
  return (
    <>
      <div className="landing-page">
        <section id="home">
          <HeroSection />
          <HowItWorks/>
          <SmartFeatures/>
        </section>
    
    </div>
    </>
  )
}

export default LandingPage
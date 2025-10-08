import HeroSection from "../components/landing/HeroSection"
import HowItWorks from "../components/landing/HowItWorks"
import SmartFeatures from "../components/landing/SmartFeatures"
import Testimonials from "../components/landing/Testimonials"

const LandingPage = () => {
  return (
    <>
      <div className="landing-page">
        <section id="home">
          <HeroSection />
          <HowItWorks/>
          <SmartFeatures/>
          <Testimonials/>
        </section>
    
    </div>
    </>
  )
}

export default LandingPage
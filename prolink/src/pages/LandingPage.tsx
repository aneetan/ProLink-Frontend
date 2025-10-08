import CompaniesSection from "../components/landing/CompaniesSection"
import CompanyRegisterSection from "../components/landing/CompanyRegisterSection"
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
          <CompanyRegisterSection/>
          <HowItWorks/>
          <SmartFeatures/>
          <CompaniesSection/>
          <Testimonials/>
        </section>
    
    </div>
    </>
  )
}

export default LandingPage
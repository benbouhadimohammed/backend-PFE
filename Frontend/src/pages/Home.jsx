import Hero from '../components/ui/Hero'
import Categories from '../components/ui/Categories'
import HowITWorks from '../components/ui/HowITWorks'
import CTA from '../components/ui/CTA'

function HomePage() {
  return (
    <div className="overflow-hidden  ">
      <Hero />
      <Categories />
      <HowITWorks />
      <CTA />
    </div>
  )
}

export default HomePage

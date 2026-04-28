import { motion } from "framer-motion"
import { Search, MessageCircle, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Search",
    description: "Browse our listings or use the search to find the service you need.",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    icon: MessageCircle,
    title: "Contact",
    description: "Communicate directly with service providers to discuss your project and obtain a quote..",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: CheckCircle,
    title: "Realize",
    description: "Choose the service provider that suits you and launch your project with confidence..",
    color: "bg-amber-100 text-amber-700",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How <span className="text-blue-600">TrustServ</span> Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find your ideal service provider in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connection line */}
          <div 
  className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-black/50 z-0" 
  aria-hidden="true"
/>

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative text-center"
            >
              <div className="relative z-10 inline-flex">
                <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-6 shadow-sm`}>
                  <step.icon className="w-9 h-9" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary bg-blue-400 text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default HowItWorks

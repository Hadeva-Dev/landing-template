'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "What is your product/service?",
    answer: "Our product/service helps you solve [specific problem] by providing [key benefit]. We offer a comprehensive solution that includes [main features]."
  },
  {
    question: "How does pricing work?",
    answer: "We offer flexible pricing plans to suit different needs. Our plans start at [price] and scale based on [usage/features]. Contact us for a custom quote tailored to your requirements."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a [duration] free trial with full access to all features. No credit card required. You can upgrade, downgrade, or cancel anytime."
  },
  {
    question: "How long does setup take?",
    answer: "Most customers are up and running in less than [time]. Our intuitive onboarding process guides you through setup, and our support team is available 24/7 if you need help."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We provide 24/7 customer support via email, chat, and phone. Plus, access to our comprehensive knowledge base, video tutorials, and dedicated account managers for enterprise customers."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. There are no long-term contracts or cancellation fees. You can cancel your subscription at any time, and you'll retain access until the end of your billing period."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about our product
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between text-left hover:bg-white/40 transition-colors duration-200"
              >
                <span className="text-lg sm:text-xl font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 sm:px-8 sm:pb-6 pt-2">
                      <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:support@example.com"
            className="inline-flex items-center text-lg font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Contact our support team
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

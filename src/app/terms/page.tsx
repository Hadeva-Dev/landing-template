'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-8 h-8 rounded-lg"
              />
              <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">Your Brand</span>
            </Link>
            <Link 
              href="/" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Effective Date: January 1, 2025</p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By accessing or using our platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Our platform provides the following services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>[Service feature one]</li>
                <li>[Service feature two]</li>
                <li>[Service feature three]</li>
                <li>[Service feature four]</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. User Responsibilities</h2>
              
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">Account Security</h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>You are responsible for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">Accurate Information</h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>Provide truthful and accurate information in your profile</li>
                <li>Update your information as circumstances change</li>
                <li>Ensure all scholarship applications contain accurate information</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">Proper Use</h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Use the Service only for legitimate scholarship applications</li>
                <li>Do not attempt to circumvent platform security measures</li>
                <li>Respect intellectual property rights</li>
                <li>Do not share or resell access to the platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. AI-Generated Content</h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-gray-800 dark:text-gray-200 font-medium">Important Notice About AI Content</p>
              </div>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>AI-generated essays and content are drafts meant to assist you, not final submissions</li>
                <li>You must review, edit, and personalize all AI-generated content</li>
                <li>You are responsible for ensuring all submitted content is accurate and represents your authentic voice</li>
                <li>Scholarship providers may have policies regarding AI assistance - check requirements</li>
                <li>We do not guarantee acceptance of any scholarship applications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Prohibited Activities</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">You may not:</p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Submit false or fraudulent information in scholarship applications</li>
                <li>Use the platform for any illegal activities</li>
                <li>Attempt to reverse engineer or copy our AI technology</li>
                <li>Harass other users or platform administrators</li>
                <li>Spam scholarship providers or abuse the platform</li>
                <li>Create multiple accounts to circumvent limitations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Intellectual Property</h2>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">Our Rights</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We retain all rights to the platform, technology, user interface, and related intellectual property. You may not copy, distribute, or create derivative works without permission.
              </p>

              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">Your Content</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You retain ownership of your personal essays and content. By using our Service, you grant us a limited license to use your content to provide platform services and improve our AI algorithms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Privacy and Data Protection</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your privacy is important to us. Please review our <Link href="/privacy" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Privacy Policy</Link> to understand how we collect, use, and protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Service Availability</h2>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>We strive for high uptime but cannot guarantee uninterrupted service</li>
                <li>We may perform maintenance that temporarily affects availability</li>
                <li>We reserve the right to modify or discontinue features with notice</li>
                <li>Service may be limited in certain geographic regions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Disclaimers and Limitations</h2>
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 mb-4">
                <p className="text-gray-800 dark:text-gray-200 font-medium">Important Disclaimers</p>
              </div>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>We do not guarantee specific outcomes or results</li>
                <li>Eligibility and requirements are determined by third parties, not us</li>
                <li>AI-generated content may contain errors or inaccuracies</li>
                <li>You are solely responsible for meeting any deadlines</li>
                <li>The Service is provided "as is" without warranties of any kind</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or opportunities, even if we have been advised of the possibility of such damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Termination</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Either party may terminate your account:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>You may delete your account at any time through platform settings</li>
                <li>We may suspend or terminate accounts for Terms violations</li>
                <li>Upon termination, your right to use the Service ceases immediately</li>
                <li>We will retain your data according to our Privacy Policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may modify these Terms periodically. Significant changes will be communicated via email or platform notifications. Your continued use after changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">13. Governing Law</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms are governed by the laws of [Jurisdiction] without regard to conflict of law principles. Any disputes will be resolved through binding arbitration in [Location].
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">14. Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                For questions about these Terms or our Service, contact us at:
              </p>
              <div className="p-4 bg-gray-100 dark:bg-slate-700 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  Email: legal@yourcompany.com<br/>
                  Address: [Company Address]<br/>
                  Phone: [Company Phone]
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
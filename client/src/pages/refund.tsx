import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Shield, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function RefundPolicy() {
  useEffect(() => {
    document.title = "Refund Policy - Bolt Flasher";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </Link>

        <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-purple-500/20 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Refund Policy</h1>
          </div>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <p className="text-green-400 font-medium">
                We stand behind our service with a fair and transparent refund policy. Your satisfaction is our priority.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-purple-400 mb-3">Eligibility for Refunds</h2>
              <p className="text-gray-300 mb-3">You may be eligible for a refund if:</p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-black/30 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Service Not Delivered</p>
                    <p className="text-gray-400 text-sm">If we fail to activate your subscription within 24 hours of payment approval</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-black/30 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Technical Issues</p>
                    <p className="text-gray-400 text-sm">If persistent technical problems prevent you from using the service despite our support efforts</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-black/30 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">First-Time Users</p>
                    <p className="text-gray-400 text-sm">New customers may request a refund within 7 days if unsatisfied with the service</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-purple-400 mb-3">Non-Refundable Situations</h2>
              <p className="text-gray-300 mb-3">Refunds are NOT available for:</p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-black/30 p-3 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Change of Mind</p>
                    <p className="text-gray-400 text-sm">After successfully using the service</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-black/30 p-3 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Violation of Terms</p>
                    <p className="text-gray-400 text-sm">If your account was terminated for violating our Terms of Service</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-black/30 p-3 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Flash Fees</p>
                    <p className="text-gray-400 text-sm">Network fees paid for flash transactions are non-refundable</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-black/30 p-3 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">After 30 Days</p>
                    <p className="text-gray-400 text-sm">Refund requests made more than 30 days after purchase</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-purple-400 mb-3">Refund Process</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Submit Request</p>
                    <p className="text-gray-400 text-sm">Contact support@boltflasher.live with your transaction details and reason for refund</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Review Period</p>
                    <p className="text-gray-400 text-sm">Our team will review your request within 48 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Decision</p>
                    <p className="text-gray-400 text-sm">You'll receive an email with our decision and next steps</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Processing</p>
                    <p className="text-gray-400 text-sm">Approved refunds are processed within 5-7 business days to your original payment method</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-purple-400 mb-3">Refund Timeline</h2>
              <div className="bg-black/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <p className="text-white font-medium">Processing Times</p>
                </div>
                <ul className="space-y-2 text-gray-300 ml-8">
                  <li>• Request Review: 24-48 hours</li>
                  <li>• Approval Decision: 48-72 hours</li>
                  <li>• Refund Processing: 5-7 business days</li>
                  <li>• Cryptocurrency refunds: 1-3 business days</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-purple-400 mb-3">Partial Refunds</h2>
              <p className="text-gray-300">
                In some cases, we may offer partial refunds:
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2 mt-2">
                <li>If you've used the service for part of the billing period</li>
                <li>For downgrades from higher to lower subscription tiers</li>
                <li>When technical issues affected only part of your service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-purple-400 mb-3">Contact Information</h2>
              <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg p-4 border border-purple-500/30">
                <p className="text-gray-300 mb-3">
                  For refund requests or questions about this policy:
                </p>
                <div className="space-y-2">
                  <p className="text-white">📧 Email: support@boltflasher.live</p>
                  <p className="text-white">💬 Telegram: @boltflasher</p>
                  <p className="text-white">⏰ Response Time: Within 24 hours</p>
                </div>
              </div>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Last updated: January 8, 2025
                <br />
                This policy is subject to change. Please check regularly for updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
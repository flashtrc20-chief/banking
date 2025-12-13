import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is Bolt Flasher?',
        a: 'Bolt Flasher is a professional cryptocurrency flash transaction platform that allows users to create temporary blockchain transactions for testing and demonstration purposes. Transactions appear in wallets but are not permanently recorded on the blockchain.'
      },
      {
        q: 'Is Bolt Flasher legal to use?',
        a: 'Yes, Bolt Flasher is legal for testing and educational purposes. Users must comply with local regulations and our Terms of Service. The platform is designed for legitimate testing scenarios only.'
      },
      {
        q: 'Which cryptocurrencies are supported?',
        a: 'We support major cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Tether (USDT), and Binance Coin (BNB). More cryptocurrencies are being added regularly.'
      }
    ]
  },
  {
    category: 'Subscription & Pricing',
    questions: [
      {
        q: 'What subscription plans are available?',
        a: 'We offer three plans: Basic ($199/month) for up to 5 BTC daily, Pro ($399/month) for up to 10 BTC daily, and Full Access ($599/month) for unlimited transactions across all supported cryptocurrencies.'
      },
      {
        q: 'How do I pay for my subscription?',
        a: 'All subscriptions are paid in USDT (TRC-20) to our secure wallet address. After payment, submit your transaction hash for manual verification by our team.'
      },
      {
        q: 'How long does payment approval take?',
        a: 'Payment approvals are typically processed within 1-2 hours during business hours. You will receive a confirmation once your subscription is activated.'
      },
      {
        q: 'Can I upgrade or downgrade my plan?',
        a: 'Yes, you can change your plan at any time. Upgrades take effect immediately upon payment approval. Downgrades take effect at the next billing cycle.'
      }
    ]
  },
  {
    category: 'Flash Transactions',
    questions: [
      {
        q: 'What is a flash fee?',
        a: 'A flash fee is a small network fee required to process flash transactions. It must be paid to our Tron wallet (TQm8yS3XZHgXiHMtMWbrQwwmLCztyvAG8y) before sending transactions.'
      },
      {
        q: 'How long do flash transactions last?',
        a: 'Flash transactions are temporary and typically remain visible for 24-72 hours, depending on the network and wallet type. They are not permanently recorded on the blockchain.'
      },
      {
        q: 'Can flash transactions be reversed?',
        a: 'Flash transactions automatically expire and disappear after the specified time period. They cannot be manually reversed once sent.'
      },
      {
        q: 'What are the transaction limits?',
        a: 'Transaction limits depend on your subscription plan. Basic allows up to 5 BTC daily, Pro up to 10 BTC daily, and Full Access has no limits.'
      }
    ]
  },
  {
    category: 'Security & Safety',
    questions: [
      {
        q: 'Is my data secure?',
        a: 'Yes, we use 256-bit SSL encryption, secure data centers, and industry-standard security practices to protect your information. We never store sensitive wallet keys.'
      },
      {
        q: 'Do you require my private keys?',
        a: 'No, we never ask for or store private keys. Flash transactions only require public wallet addresses to display temporary balances.'
      },
      {
        q: 'How do you prevent fraud?',
        a: 'We have strict verification processes, monitor all transactions, and require manual approval for subscriptions to prevent fraudulent activities.'
      }
    ]
  },
  {
    category: 'Technical Support',
    questions: [
      {
        q: 'How do I contact support?',
        a: 'You can reach our support team via email at support@boltflasher.live or through Telegram @boltflasher. We respond within 24 hours.'
      },
      {
        q: 'What if my transaction fails?',
        a: 'If a transaction fails, first check that you have paid the flash fee. If issues persist, contact support with your transaction details for assistance.'
      },
      {
        q: 'Do you offer refunds?',
        a: 'Refunds are evaluated on a case-by-case basis. Please review our Refund Policy or contact support within 7 days of purchase for refund requests.'
      }
    ]
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-purple-500/20 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between bg-black/40 hover:bg-black/60 transition-colors"
      >
        <span className="font-medium text-white pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-purple-400 flex-shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-black/20 border-t border-purple-500/10">
              <p className="text-gray-300">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  useEffect(() => {
    document.title = "FAQ - Frequently Asked Questions | Bolt Flasher";
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

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-300 text-lg">Find answers to common questions about Bolt Flasher</p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">{category.category}</h2>
              <div className="space-y-3">
                {category.questions.map((item, index) => (
                  <FAQItem key={index} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg border border-purple-500/30">
          <h3 className="text-xl font-semibold text-white mb-3">Still have questions?</h3>
          <p className="text-gray-300 mb-4">
            Our support team is here to help you 24/7. Reach out through any of these channels:
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:support@boltflasher.live" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              Email Support
            </a>
            <a href="https://t.me/boltflasher" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Telegram Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
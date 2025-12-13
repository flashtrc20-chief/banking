import { motion } from 'framer-motion';

export default function AsSeenOn() {
  const logos = [
    { name: 'CoinDesk', display: 'COINDESK' },
    { name: 'CryptoNews', display: 'CryptoNews' },
    { name: 'Bitcoin Magazine', display: 'BTC MAG' },
    { name: 'Forbes Crypto', display: 'FORBES' },
    { name: 'TechCrunch', display: 'TechCrunch' },
    { name: 'Bloomberg', display: 'Bloomberg' }
  ];

  return (
    <div className="py-8 bg-black/40">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-center text-gray-400 text-sm uppercase tracking-wider mb-6">
          As Featured In
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {logos.map((logo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              transition={{ delay: idx * 0.1 }}
              className="text-gray-500 font-bold text-lg hover:text-purple-400 transition-colors cursor-pointer"
            >
              {logo.display}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
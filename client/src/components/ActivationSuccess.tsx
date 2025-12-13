import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Zap, Lock } from 'lucide-react';

interface ActivationSuccessProps {
  onComplete: () => void;
  duration?: number;
}

export function ActivationSuccess({ onComplete, duration = 40000 }: ActivationSuccessProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Shield, text: 'Verifying activation key...', color: 'text-green-400' },
    { icon: Lock, text: 'Establishing secure connection...', color: 'text-blue-400' },
    { icon: Zap, text: 'Loading platform modules...', color: 'text-yellow-400' },
    { icon: CheckCircle, text: 'Preparing dashboard...', color: 'text-purple-400' },
  ];

  useEffect(() => {
    const stepDuration = duration / steps.length;
    const progressInterval = 50;
    const progressIncrement = 100 / (duration / progressInterval);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const next = prev + progressIncrement;
        if (next >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return next;
      });
    }, progressInterval);

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    const completionTimer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
      clearTimeout(completionTimer);
    };
  }, [duration, onComplete, steps.length]);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 shadow-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-white mb-2"
            data-testid="text-activation-success"
          >
            Activation Successful
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 mb-8"
          >
            Your license key has been verified. Preparing your dashboard...
          </motion.p>

          <div className="space-y-4 mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index <= currentStep ? 1 : 0.3,
                  x: 0 
                }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`flex items-center gap-3 ${index <= currentStep ? step.color : 'text-gray-500'}`}
              >
                <step.icon className={`w-5 h-5 ${index < currentStep ? 'text-green-400' : ''}`} />
                <span className="text-sm">{step.text}</span>
                {index < currentStep && (
                  <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
                )}
                {index === currentStep && (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin ml-auto" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-2">
              {Math.round(progress)}% Complete
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 flex items-center justify-center gap-2 text-green-400"
          >
            <Lock className="w-4 h-4" />
            <span className="text-sm">256-bit encrypted connection</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

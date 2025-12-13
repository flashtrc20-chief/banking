import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lock } from 'lucide-react';
import { BoltTextLogo } from '@/components/bolt-logo';
import Footer from '@/components/Footer';
import { SecurityBadgeBar } from '@/components/SecurityBadges';
import { ActivationSuccess } from '@/components/ActivationSuccess';

export default function Activation() {
  const [activationKey, setActivationKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { loginWithKey } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activationKey.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your activation key",
        variant: "destructive",
      });
      return;
    }

    // Validate format: 13-digit alphanumeric
    if (!/^[A-Z0-9]{13}$/.test(activationKey.toUpperCase())) {
      toast({
        title: "Invalid Format",
        description: "Activation key must be 13 alphanumeric characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await loginWithKey(activationKey);
      
      if (success) {
        toast({
          title: "Activation Successful",
          description: "Your license key has been verified. Loading dashboard...",
        });
        setIsLoading(false);
        setShowSuccess(true);
      } else {
        toast({
          title: "Invalid Key",
          description: "This activation key is invalid, expired, or has already been used.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while validating your key",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleActivationComplete = () => {
    setLocation('/dashboard');
  };

  if (showSuccess) {
    return <ActivationSuccess onComplete={handleActivationComplete} duration={40000} />;
  }

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert to uppercase and filter out invalid characters
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    // Limit to 13 characters
    setActivationKey(value.slice(0, 13));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <SecurityBadgeBar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <BoltTextLogo />
            </div>
            <CardTitle className="text-2xl text-white">Activate Access</CardTitle>
            <CardDescription className="text-slate-400 mt-2">
              Enter your 13-digit activation key to access the platform
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="activationKey" className="text-slate-300">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Activation Key
                  </div>
                </Label>
                <Input
                  id="activationKey"
                  type="text"
                  placeholder="e.g., ABC123DEF456G"
                  value={activationKey}
                  onChange={handleKeyChange}
                  disabled={isLoading}
                  maxLength={13}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-500 font-mono tracking-widest text-center text-lg"
                  autoFocus
                />
                <p className="text-xs text-slate-400 text-center mt-2">
                  {activationKey.length}/13 characters
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading || activationKey.length !== 13}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Validating...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Unlock Access
                  </>
                )}
              </Button>

              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <p className="text-sm text-slate-300">
                  Don't have an activation key?
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Contact our support team to get one
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}

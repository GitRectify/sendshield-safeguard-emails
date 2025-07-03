
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Mail, Key, CheckCircle, Star, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [step, setStep] = useState<'signup' | 'license' | 'success'>('signup');
  const [email, setEmail] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('license');
      toast({
        title: "Welcome to Email Magic!",
        description: "Check your email for your SendShield license key.",
      });
    }, 1500);
  };

  const handleLicenseActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate license validation
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      toast({
        title: "License Activated!",
        description: "SendShield is now protecting your emails.",
      });
    }, 1000);
  };

  const handleReset = () => {
    setStep('signup');
    setEmail('');
    setLicenseKey('');
  };

  const plans = [
    {
      name: "Email Magic Member",
      description: "Free with membership",
      price: "Included",
      duration: "Lifetime",
      features: ["Unlimited email protection", "Advanced analytics", "Priority support", "Team deployment"],
      badge: "Most Popular",
      badgeColor: "bg-shield-green"
    },
    {
      name: "Standalone License",
      description: "For non-members",
      price: "$49",
      duration: "One-time",
      features: ["Basic protection", "Usage analytics", "Email support", "Single user"],
      badge: "Available Soon",
      badgeColor: "bg-gray-500"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {step === 'signup' && (
          <>
            <DialogHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-premium-blue" />
                <DialogTitle className="text-2xl">Get SendShield Free</DialogTitle>
              </div>
              <DialogDescription className="text-lg">
                Enter your email to receive your free SendShield license
              </DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-8 mt-6">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative border-2 ${index === 0 ? 'border-shield-green shadow-lg' : 'border-gray-200'}`}>
                  {plan.badge && (
                    <Badge className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${plan.badgeColor} text-white px-4 py-1`}>
                      {plan.badge}
                    </Badge>
                  )}
                  <CardHeader className="text-center pt-8">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 ml-2">{plan.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-shield-green" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <form onSubmit={handleSignup} className="space-y-6 mt-8">
              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full premium-gradient text-white py-6 text-lg font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending License...
                    </div>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Get Free License
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="text-center text-sm text-gray-500 mt-4">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </div>
          </>
        )}

        {step === 'license' && (
          <>
            <DialogHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Key className="w-8 h-8 text-premium-blue" />
                <DialogTitle className="text-2xl">Activate Your License</DialogTitle>
              </div>
              <DialogDescription className="text-lg">
                Enter the license key we sent to your email
              </DialogDescription>
            </DialogHeader>

            <div className="max-w-md mx-auto mt-6">
              <Card className="border-2 border-premium-blue bg-blue-50">
                <CardContent className="p-6 text-center">
                  <Mail className="w-12 h-12 text-premium-blue mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Check Your Email</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We've sent your SendShield license key to:
                  </p>
                  <Badge variant="outline" className="text-premium-blue border-premium-blue">
                    {email}
                  </Badge>
                </CardContent>
              </Card>

              <form onSubmit={handleLicenseActivation} className="space-y-6 mt-6">
                <div>
                  <Label htmlFor="license" className="text-sm font-medium">
                    License Key
                  </Label>
                  <Input
                    id="license"
                    type="text"
                    placeholder="SENDSHIELD-XXXX-XXXX-XXXX"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                    required
                    className="mt-1 font-mono"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full premium-gradient text-white py-6 text-lg font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Activating...
                    </div>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Activate SendShield
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center mt-4">
                <Button variant="ghost" onClick={handleReset} className="text-gray-500">
                  ← Back to signup
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'success' && (
          <>
            <DialogHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="w-12 h-12 text-shield-green" />
                <DialogTitle className="text-2xl text-shield-green">Welcome to SendShield!</DialogTitle>
              </div>
              <DialogDescription className="text-lg">
                Your license has been activated successfully
              </DialogDescription>
            </DialogHeader>

            <div className="max-w-2xl mx-auto mt-6 space-y-6">
              <Card className="border-2 border-shield-green bg-green-50">
                <CardContent className="p-6 text-center">
                  <Shield className="w-16 h-16 text-shield-green mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    SendShield is Now Active
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your emails are now protected with enterprise-grade delay sending
                  </p>
                  <div className="flex justify-center gap-4">
                    <Badge className="bg-shield-green text-white">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      License Activated
                    </Badge>
                    <Badge className="bg-premium-blue text-white">
                      <Shield className="w-4 h-4 mr-1" />
                      Protection Enabled
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-premium-blue mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Install Extension</h4>
                    <p className="text-xs text-gray-600">Download from Chrome Web Store</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="w-8 h-8 text-warning-amber mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Configure Settings</h4>
                    <p className="text-xs text-gray-600">Customize your protection</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Shield className="w-8 h-8 text-shield-green mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Start Protecting</h4>
                    <p className="text-xs text-gray-600">Your emails are now safe</p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button 
                  onClick={onClose}
                  className="premium-gradient text-white px-8 py-6 text-lg font-semibold"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Continue to Dashboard
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

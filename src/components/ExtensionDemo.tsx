
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, Send, Edit, X, CheckCircle } from "lucide-react";

const ExtensionDemo = () => {
  const [step, setStep] = useState<'compose' | 'delay' | 'sent'>('compose');
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'delay' && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setStep('sent');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, countdown]);

  const handleSend = () => {
    setStep('delay');
    setCountdown(60);
  };

  const handleCancel = () => {
    setStep('compose');
    setCountdown(60);
  };

  const handleReset = () => {
    setStep('compose');
    setCountdown(60);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Gmail-like Interface */}
        <Card className="border-2 border-gray-200 overflow-hidden">
          <div className="bg-red-500 text-white px-4 py-2 text-sm font-medium">
            📧 Gmail Demo - SendShield Integration
          </div>
          
          <div className="p-6 bg-gray-50">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700 w-16">To:</label>
                  <input 
                    type="email" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    defaultValue="client@company.com"
                    disabled={step !== 'compose'}
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700 w-16">Subject:</label>
                  <input 
                    type="text" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    defaultValue="Quarterly Report - Urgent Review Needed"
                    disabled={step !== 'compose'}
                  />
                </div>
                
                <div className="border-t pt-4">
                  <textarea 
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                    defaultValue="Hi Sarah,

Please find the attached quarterly report. I need your feedback by end of day as the board meeting is tomorrow morning.

Let me know if you have any questions.

Best regards,
Alex"
                    disabled={step !== 'compose'}
                  />
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    {step === 'compose' && (
                      <Button 
                        onClick={handleSend}
                        className="premium-gradient text-white"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send
                      </Button>
                    )}
                    
                    {step === 'delay' && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-premium-blue animate-pulse-gentle">
                          <Shield className="w-5 h-5" />
                          <span className="font-medium">SendShield Active</span>
                        </div>
                        <Button variant="outline" onClick={handleCancel} size="sm">
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    )}
                    
                    {step === 'sent' && (
                      <div className="flex items-center gap-2 text-shield-green">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Email Sent Successfully</span>
                      </div>
                    )}
                  </div>
                  
                  {step !== 'compose' && (
                    <Button variant="ghost" onClick={handleReset} size="sm" className="text-gray-500">
                      Reset Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* SendShield Status Card */}
        {step === 'delay' && (
          <Card className="border-2 border-premium-blue bg-blue-50 animate-slide-up">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-premium-blue flex items-center justify-center text-white animate-pulse-gentle">
                      <Clock className="w-8 h-8" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-warning-amber text-white px-2 py-1 text-xs font-bold">
                      {countdown}s
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Email Delayed for Review
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your email will be sent in <span className="font-semibold text-premium-blue">{countdown} seconds</span>. 
                      Use this time to make any final changes.
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">Protected by</div>
                  <div className="flex items-center gap-1 text-premium-blue font-semibold">
                    <Shield className="w-4 h-4" />
                    SendShield
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-8">
          <div className={`flex items-center gap-2 transition-colors ${step === 'compose' ? 'text-premium-blue' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'compose' ? 'bg-premium-blue text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="text-sm font-medium">Compose Email</span>
          </div>
          
          <div className={`w-12 h-px ${step !== 'compose' ? 'bg-premium-blue' : 'bg-gray-300'}`} />
          
          <div className={`flex items-center gap-2 transition-colors ${step === 'delay' ? 'text-premium-blue' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'delay' ? 'bg-premium-blue text-white' : step === 'sent' ? 'bg-shield-green text-white' : 'bg-gray-200'}`}>
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">SendShield Protection</span>
          </div>
          
          <div className={`w-12 h-px ${step === 'sent' ? 'bg-shield-green' : 'bg-gray-300'}`} />
          
          <div className={`flex items-center gap-2 transition-colors ${step === 'sent' ? 'text-shield-green' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'sent' ? 'bg-shield-green text-white' : 'bg-gray-200'}`}>
              <CheckCircle className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Email Sent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtensionDemo;

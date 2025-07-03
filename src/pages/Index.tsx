
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, CheckCircle, Star, Users, BarChart3 } from "lucide-react";
import ExtensionDemo from "@/components/ExtensionDemo";
import SettingsPanel from "@/components/SettingsPanel";
import FeatureShowcase from "@/components/FeatureShowcase";
import AuthModal from "@/components/AuthModal";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'demo' | 'settings'>('demo');

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-shield-green" />,
      title: "Smart Delay Protection",
      description: "Automatically delays email sending for 15s-2min to prevent rushed mistakes"
    },
    {
      icon: <Clock className="w-6 h-6 text-premium-blue" />,
      title: "Customizable Timing",
      description: "Set your preferred delay time from quick 15-second saves to 2-minute reviews"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-warning-amber" />,
      title: "Impact Tracking",
      description: "Track how many mistakes you've prevented and emails you've improved"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-shield-green" />,
      title: "Enterprise Security",
      description: "No email content stored or transmitted. Built for corporate environments"
    }
  ];

  const stats = [
    { label: "Emails Protected", value: "10,000+", icon: <Shield className="w-5 h-5" /> },
    { label: "Mistakes Prevented", value: "2,347", icon: <CheckCircle className="w-5 h-5" /> },
    { label: "Active Users", value: "500+", icon: <Users className="w-5 h-5" /> },
    { label: "Success Rate", value: "98.7%", icon: <Star className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-premium-blue/5 to-shield-green/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
              <Shield className="w-4 h-4 mr-2" />
              Enterprise-Grade Email Protection
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Email Magic: <span className="premium-gradient bg-clip-text text-transparent">SendShield</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The premium Gmail extension that automatically delays your emails, giving you time to prevent mistakes, 
              improve communication, and maintain professional relationships.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                size="lg" 
                className="premium-gradient text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Shield className="w-5 h-5 mr-2" />
                Get SendShield Free
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-6 text-lg border-2 border-premium-blue text-premium-blue hover:bg-premium-blue hover:text-white transition-all duration-300"
                onClick={() => setActiveTab('demo')}
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center justify-center mb-2 text-premium-blue">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Demo Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            See SendShield in Action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience how SendShield seamlessly integrates with Gmail to protect your communications
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('demo')}
                className={`px-8 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'demo'
                    ? 'border-premium-blue text-premium-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Gmail Integration Demo
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-8 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'settings'
                    ? 'border-premium-blue text-premium-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Premium Settings Panel
              </button>
            </nav>
          </div>
          
          <div className="p-8">
            {activeTab === 'demo' ? <ExtensionDemo /> : <SettingsPanel />}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why SendShield is Essential
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built specifically for professionals who value precision, security, and peace of mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-premium-blue to-premium-blue-dark py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Protect Your Professional Reputation?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals using SendShield to prevent email mistakes and improve communication quality.
          </p>
          <Button 
            onClick={() => setIsAuthModalOpen(true)}
            size="lg" 
            variant="secondary"
            className="px-8 py-6 text-lg font-semibold bg-white text-premium-blue hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Shield className="w-5 h-5 mr-2" />
            Get Your Free License Now
          </Button>
          <p className="text-sm text-blue-200 mt-4">
            Free with Email Magic membership • No credit card required
          </p>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Index;


import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, BarChart3, Users, Zap, Lock } from "lucide-react";

const FeatureShowcase = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-shield-green" />,
      title: "Enterprise Security",
      description: "Zero email content storage or transmission. Built for regulated industries with complete privacy protection.",
      highlights: ["No data collection", "Local processing only", "GDPR compliant", "SOC 2 ready"],
      color: "border-shield-green"
    },
    {
      icon: <Clock className="w-8 h-8 text-premium-blue" />,
      title: "Smart Timing",
      description: "Intelligent delay algorithms that adapt to your communication patterns and urgency levels.",
      highlights: ["Customizable delays", "Priority detection", "Context awareness", "Learning system"],
      color: "border-premium-blue"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-warning-amber" />,
      title: "Impact Analytics",
      description: "Comprehensive insights into your email quality improvements and mistake prevention metrics.",
      highlights: ["Mistake tracking", "Quality scores", "Time savings", "Trend analysis"],
      color: "border-warning-amber"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Team Management",
      description: "Deploy across your organization with centralized policy management and compliance reporting.",
      highlights: ["Bulk deployment", "Policy controls", "Usage reporting", "Admin dashboard"],
      color: "border-purple-500"
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "Seamless Integration",
      description: "Works natively with Gmail without disrupting your existing workflow or requiring training.",
      highlights: ["Zero setup time", "Invisible operation", "All Gmail features", "Mobile compatible"],
      color: "border-orange-500"
    },
    {
      icon: <Lock className="w-8 h-8 text-red-500" />,
      title: "Mistake Prevention",
      description: "Advanced algorithms detect common email mistakes before they damage professional relationships.",
      highlights: ["Attachment checks", "Recipient validation", "Tone analysis", "Content screening"],
      color: "border-red-500"
    }
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Enterprise Features
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Built for Professional Excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every feature designed with enterprise security, user experience, and measurable business impact in mind
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`border-2 ${feature.color} hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in group`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>
                
                <div className="space-y-2">
                  {feature.highlights.map((highlight, highlightIndex) => (
                    <div 
                      key={highlightIndex} 
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-200">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Shield className="w-8 h-8 text-premium-blue" />
              <h3 className="text-2xl font-bold text-gray-900">
                Ready to Transform Your Email Experience?
              </h3>
            </div>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Join the professionals who trust SendShield to protect their communications and enhance their reputation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Badge className="bg-shield-green text-white px-4 py-2">
                ✓ 30-Day Free Trial
              </Badge>
              <Badge className="bg-premium-blue text-white px-4 py-2">
                ✓ No Credit Card Required
              </Badge>
              <Badge className="bg-warning-amber text-white px-4 py-2">
                ✓ Enterprise Support
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;

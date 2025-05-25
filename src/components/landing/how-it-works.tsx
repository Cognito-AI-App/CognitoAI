import { Card, CardContent } from "@/components/ui/card";
import { 
  UserPlus, 
  Settings, 
  Users, 
  MessageCircle, 
  Code2, 
  BarChart3,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: UserPlus,
      title: "Sign Up & Setup",
      description: "Create your account and set up your organization. Get started in minutes with our intuitive onboarding process.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      borderColor: "border-indigo-200"
    },
    {
      step: "02",
      icon: Settings,
      title: "Configure Interviewers",
      description: "Create AI interviewers with custom personalities, expertise areas, and interview styles tailored to your needs.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-200"
    },
    {
      step: "03",
      icon: Code2,
      title: "Design Assessments",
      description: "Build coding assessments with custom questions, test cases, and difficulty levels. Choose from multiple programming languages.",
      color: "text-green-600",
      bgColor: "bg-green-100",
      borderColor: "border-green-200"
    },
    {
      step: "04",
      icon: MessageCircle,
      title: "Conduct Interviews",
      description: "Candidates engage in natural conversations with AI interviewers, followed by hands-on coding challenges.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200"
    },
    {
      step: "05",
      icon: BarChart3,
      title: "Review & Analyze",
      description: "Get comprehensive analytics, scoring, and insights to make informed hiring decisions with confidence.",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-200"
    }
  ];

  const benefits = [
    "Reduce time-to-hire by 60%",
    "Eliminate interviewer scheduling conflicts",
    "Ensure consistent, unbiased evaluations",
    "Scale interviews to hundreds of candidates",
    "Get detailed analytics and insights",
    "Improve candidate experience"
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How CognitoAI Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From setup to insights, our streamlined process makes it easy to conduct 
            professional AI-powered interviews at scale.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 via-green-200 via-blue-200 to-orange-200"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className={`border-2 ${step.borderColor} hover:shadow-lg transition-all duration-300 bg-white`}>
                    <CardContent className="p-6 text-center">
                      {/* Step Number */}
                      <div className="text-sm font-bold text-gray-400 mb-4">
                        STEP {step.step}
                      </div>
                      
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className={`w-8 h-8 ${step.color}`} />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                  
                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-4 z-10">
                      <div className="w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Why Choose CognitoAI?
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Transform your hiring process with AI-powered efficiency and insights 
                  that help you make better decisions faster.
                </p>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">10x</div>
                    <div className="text-lg mb-4">Faster Hiring</div>
                    <div className="text-indigo-100">
                      Reduce your time-to-hire from weeks to days with automated interviews and instant insights.
                    </div>
                  </div>
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 

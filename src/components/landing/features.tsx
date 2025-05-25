import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Brain, 
  Code, 
  BarChart3, 
  Clock, 
  Shield,
  Zap,
  Target,
  MessageSquare
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Users,
      title: "AI Interviewers",
      description: "Create customizable AI interviewers with different personalities and expertise areas to conduct consistent, unbiased interviews.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    },
    {
      icon: Code,
      title: "Coding Assessments",
      description: "LeetCode-style coding challenges with real-time execution, multiple programming languages, and automated scoring.",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Brain,
      title: "Smart Analytics",
      description: "AI-powered analysis of communication skills, technical abilities, and overall candidate performance with detailed insights.",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: BarChart3,
      title: "Comprehensive Scoring",
      description: "Combined scoring system that evaluates both behavioral interviews and coding assessments for holistic candidate evaluation.",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Clock,
      title: "Scalable Interviews",
      description: "Conduct multiple interviews simultaneously without scheduling conflicts or interviewer availability constraints.",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Shield,
      title: "Consistent Evaluation",
      description: "Eliminate interviewer bias and ensure every candidate gets the same fair, standardized interview experience.",
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      icon: Zap,
      title: "Real-time Execution",
      description: "Execute code in 13+ programming languages with immediate feedback and comprehensive test case validation.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: Target,
      title: "Custom Questions",
      description: "Generate interview questions automatically from job descriptions or create custom questions tailored to your needs.",
      color: "text-pink-600",
      bgColor: "bg-pink-100"
    },
    {
      icon: MessageSquare,
      title: "Detailed Transcripts",
      description: "Complete interview transcripts with AI analysis, communication scoring, and actionable insights for better hiring decisions.",
      color: "text-teal-600",
      bgColor: "bg-teal-100"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Hiring
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to conduct professional, scalable, and insightful interviews 
            that help you identify the best talent for your organization.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1"
              >
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Ready to revolutionize your hiring process?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#screenshots" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            >
              See It In Action
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 

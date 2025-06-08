"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Brain, 
  Code, 
  MessageCircle, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Play
} from "lucide-react";

export default function Screenshots() {
  const [activeTab, setActiveTab] = useState(0);

  const screenshots = [
    {
      id: "interviews",
      title: "Interview Management",
      description: "Create and manage interviews with custom objectives, questions, and AI interviewers. Set up coding assessments and track candidate progress.",
      image: "/application_screenshots/Interviews.png",
      icon: MessageCircle,
      category: "Dashboard",
      features: ["Custom Interview Setup", "AI Interviewer Selection", "Assessment Integration", "Progress Tracking"]
    },
    {
      id: "interviewers",
      title: "AI Interviewers",
      description: "Design AI interviewers with unique personalities, expertise areas, and interview styles tailored to your specific hiring needs.",
      image: "/application_screenshots/Interviewers.png",
      icon: Users,
      category: "Dashboard",
      features: ["Personality Customization", "Expertise Areas", "Voice & Style", "Interview Templates"]
    },
    {
      id: "questions",
      title: "Coding Questions",
      description: "Create comprehensive coding questions with test cases, difficulty levels, and detailed explanations for technical assessments.",
      image: "/application_screenshots/Questions.png",
      icon: Code,
      category: "Dashboard",
      features: ["Custom Test Cases", "Difficulty Levels", "Multiple Languages", "Detailed Explanations"]
    },
    {
      id: "assessments",
      title: "Assessment Builder",
      description: "Build comprehensive coding assessments by selecting questions, setting time limits, and configuring evaluation criteria.",
      image: "/application_screenshots/Assessments.png",
      icon: BarChart3,
      category: "Dashboard",
      features: ["Question Selection", "Time Management", "Scoring Criteria", "Assessment Analytics"]
    },
    {
      id: "live-interview",
      title: "Live Interview Experience",
      description: "Candidates engage in natural conversations with AI interviewers in a professional, user-friendly interface.",
      image: "/application_screenshots/Live_Interview.png",
      icon: MessageCircle,
      category: "Candidate Experience",
      features: ["Natural Conversation", "Real-time Audio", "Professional Interface", "Seamless Experience"]
    },
    {
      id: "live-coding",
      title: "Live Coding Assessment",
      description: "LeetCode-style coding environment with real-time execution, multiple programming languages, and instant feedback.",
      image: "/application_screenshots/Live_Coding.png",
      icon: Code,
      category: "Candidate Experience",
      features: ["Monaco Code Editor", "13+ Languages", "Real-time Execution", "Instant Feedback"]
    }
  ];

  const categories = ["All", "Dashboard", "Candidate Experience"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredScreenshots = selectedCategory === "All" 
    ? screenshots 
    : screenshots.filter(screenshot => screenshot.category === selectedCategory);

  const nextSlide = () => {
    setActiveTab((prev) => (prev + 1) % filteredScreenshots.length);
  };

  const prevSlide = () => {
    setActiveTab((prev) => (prev - 1 + filteredScreenshots.length) % filteredScreenshots.length);
  };

  return (
    <section id="screenshots" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See CognitoAI in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our intuitive interface and powerful features that make AI-powered 
            interviews accessible and effective for organizations of all sizes.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveTab(0);
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Screenshot Display */}
        <div className="relative mb-12">
          <Card className="overflow-hidden shadow-2xl border-0">
            <div className="relative">
              <Image
                src={filteredScreenshots[activeTab].image}
                alt={filteredScreenshots[activeTab].title}
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
              
              {/* Navigation Arrows */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                onClick={prevSlide}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                onClick={nextSlide}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
              
              {/* Category Badge */}
              <Badge className="absolute top-4 left-4 bg-indigo-600 hover:bg-indigo-700">
                {filteredScreenshots[activeTab].category}
              </Badge>
            </div>
          </Card>
        </div>

        {/* Screenshot Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="flex items-center mb-4">
              {(() => {
                const IconComponent = filteredScreenshots[activeTab].icon;
                
return <IconComponent className="w-8 h-8 text-indigo-600 mr-3" />;
              })()}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                {filteredScreenshots[activeTab].title}
              </h3>
            </div>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {filteredScreenshots[activeTab].description}
            </p>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
              {filteredScreenshots[activeTab].features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Thumbnail Navigation */}
          <div className="grid grid-cols-2 gap-4">
            {filteredScreenshots.map((screenshot, index) => {
              const IconComponent = screenshot.icon;
              
return (
                <Card
                  key={screenshot.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    index === activeTab 
                      ? "ring-2 ring-indigo-500 shadow-lg" 
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <IconComponent className={`w-5 h-5 mr-2 ${
                        index === activeTab ? "text-indigo-600" : "text-gray-500"
                      }`} />
                      <h4 className={`font-medium text-sm ${
                        index === activeTab ? "text-indigo-600" : "text-gray-700"
                      }`}>
                        {screenshot.title}
                      </h4>
                    </div>
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={screenshot.image}
                        alt={screenshot.title}
                        width={300}
                        height={200}
                        className="w-full h-24 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience CognitoAI?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join forward-thinking companies that are already transforming their hiring 
            process with AI-powered interviews and assessments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-4 h-auto">
                <Play className="mr-2 w-5 h-5" />
                Start Free Trial
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 h-auto border-2"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 

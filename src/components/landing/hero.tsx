"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, Brain, Code } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { COMPANY_INFO } from "@/lib/contact";

export default function Hero() {
  const { isSignedIn } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-8">
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered Interview Platform
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              {" "}
              Hiring Process
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            {COMPANY_INFO.description}
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <Users className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="text-gray-700 font-medium">AI Interviewers</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <Code className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-gray-700 font-medium">
                Coding Assessments
              </span>
            </div>
            <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <Brain className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-gray-700 font-medium">Smart Analytics</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 relative z-10">
            {isSignedIn ? (
              <Link href="/dashboard" className="relative z-10">
                <Button
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-4 h-auto"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/sign-up" className="relative z-10">
                  <Button
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-4 h-auto"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 h-auto border-2 hover:bg-gray-50 relative z-10"
                  onClick={() =>
                    document
                      .getElementById("screenshots")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <Play className="mr-2 w-5 h-5" />
                  See Demo
                </Button>
              </>
            )}
          </div>

          {/* Hero Image/Logo */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <Image
                src="/CognitoAI.png"
                alt="CognitoAI Platform"
                width={400}
                height={400}
                className="mx-auto rounded-xl"
                priority
              />
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-indigo-500 text-white p-3 rounded-xl shadow-lg">
                <Users className="w-6 h-6" />
              </div>
              <div className="absolute -top-4 -right-4 bg-purple-500 text-white p-3 rounded-xl shadow-lg">
                <Brain className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded-xl shadow-lg">
                <Code className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin, 
  Send,
  MessageSquare,
  Clock,
  Users
} from "lucide-react";
import { CONTACT_INFO, COMPANY_INFO } from "@/lib/contact";
import { CreateContactMessageRequest } from "@/types/contact";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateContactMessageRequest>({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      value: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone}`,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      description: "Connect with us professionally",
      value: "CognitoAI Tech",
      href: CONTACT_INFO.linkedinUrl,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Quick Response",
      description: "We respond to all inquiries within 24 hours"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Get help from our AI and hiring experts"
    },
    {
      icon: MessageSquare,
      title: "Personalized Demo",
      description: "Schedule a custom demo for your team"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you within 24 hours.");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          company: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your hiring process? Contact us to learn more about 
            CognitoAI and schedule a personalized demo for your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Let's Start a Conversation
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're looking to streamline your hiring process, need a custom demo, 
              or have questions about our AI-powered interview platform, we're here to help.
            </p>

            {/* Contact Methods */}
            <div className="space-y-4 mb-8">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <a
                    key={index}
                    href={method.href}
                    target={method.icon === Linkedin ? "_blank" : undefined}
                    rel={method.icon === Linkedin ? "noopener noreferrer" : undefined}
                    className="block group"
                  >
                    <Card className="hover:shadow-md transition-all duration-300 border-l-4 border-l-indigo-500">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-lg ${method.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className={`w-6 h-6 ${method.color}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                              {method.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-1">{method.description}</p>
                            <p className="text-sm font-medium text-indigo-600">{method.value}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 mb-4">Why Contact Us?</h4>
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <IconComponent className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{feature.title}</h5>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <Input
                      id="first_name"
                      name="first_name"
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="John"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <Input
                      id="last_name"
                      name="last_name"
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Doe"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="john.doe@company.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Your Company Name"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="+1 (555) 123-4567"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="How can we help you?"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Tell us about your hiring needs and how CognitoAI can help..."
                    disabled={isSubmitting}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3 h-auto disabled:opacity-50"
                >
                  <Send className="mr-2 w-5 h-5" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the growing number of companies using CognitoAI to revolutionize 
            their hiring process with AI-powered interviews.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-4 h-auto">
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

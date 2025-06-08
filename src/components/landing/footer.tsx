"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Linkedin, Github, Twitter, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO, COMPANY_INFO } from "@/lib/contact";

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< Updated upstream
    if (!email.trim()) {return;}
=======
<<<<<<< HEAD
    if (!email.trim()) {
      return;
    }
=======
    if (!email.trim()) {return;}
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Successfully subscribed to our newsletter!");
        setEmail("");
      } else {
        toast.error(result.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-t border-gray-800 pt-8 mb-8">
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
        <p className="text-gray-300 mb-4">
          Get the latest updates on AI-powered hiring and new features.
        </p>
        <form className="flex space-x-2" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 disabled:opacity-50"
          >
            {isSubmitting ? "..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "How it Works", href: "#how-it-works" },
      { name: "Screenshots", href: "#screenshots" },
      { name: "Pricing", href: "#contact" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Contact", href: "#contact" },
      // { name: "Privacy Policy", href: "#" },
      // { name: "Terms of Service", href: "#" }
    ],
    resources: [
      // { name: "Documentation", href: "#" },
      // { name: "API Reference", href: "#" },
      { name: "Support", href: "#contact" },
      // { name: "Blog", href: "#" }
    ],
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: CONTACT_INFO.linkedinUrl,
      icon: Linkedin,
    },
    {
      name: "Email",
      href: `mailto:${CONTACT_INFO.email}`,
      icon: Mail,
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/CognitoAI.png"
                alt="CognitoAI Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold">{COMPANY_INFO.name}</span>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {COMPANY_INFO.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-indigo-400" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-indigo-400" />
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <NewsletterSignup />

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} {COMPANY_INFO.name}. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
<<<<<<< Updated upstream
                
return (
=======
<<<<<<< HEAD

                return (
=======
                
return (
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.name === "LinkedIn" ? "_blank" : undefined}
                    rel={
                      social.name === "LinkedIn"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Back to Top */}
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              onClick={scrollToTop}
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

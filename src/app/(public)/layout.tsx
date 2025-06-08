import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CognitoAI - AI-Powered Automated User Interviews",
  description:
    "Transform your hiring process with intelligent AI interviewers and comprehensive coding assessments. Conduct scalable, consistent, and insightful interviews that help you find the best talent.",
  openGraph: {
    title: "CognitoAI - AI-Powered Automated User Interviews",
    description:
      "Transform your hiring process with intelligent AI interviewers and comprehensive coding assessments. Conduct scalable, consistent, and insightful interviews that help you find the best talent.",
    siteName: "CognitoAI",
    images: [
      {
        url: "/CognitoAI.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/CognitoAI.ico" />
      </head>
      <body className={inter.className}>
        <ClerkProvider
          signInFallbackRedirectUrl={"/dashboard"}
          afterSignOutUrl={"/"}
        >
          <Providers>
            {children}
            <Toaster
              toastOptions={{
                classNames: {
                  toast: "bg-white border-2 border-indigo-400",
                  title: "text-black",
                  description: "text-red-400",
                  actionButton: "bg-indigo-400",
                  cancelButton: "bg-orange-400",
                  closeButton: "bg-lime-400",
                },
              }}
            />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}

import {
  Header,
  Hero,
  Features,
  HowItWorks,
  Screenshots,
  Contact,
  Footer,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Screenshots />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

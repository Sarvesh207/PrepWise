import React from "react";
import {
  AboutOurApps,
  HeroSection,
  OurLatestCreation,
  OurTestimonials,
  TrustedCompanies,
} from "../components/landing-page-sections";

function Landing() {
  return (
    <main className="px-6 md:px-16 lg:px-24 xl:px-32">
      <HeroSection />
      <OurLatestCreation />
      <AboutOurApps />
      <OurTestimonials />
      {/* <CompaniesMarqueScroll/>       */}
      <TrustedCompanies />
      {/* <GetInTouch /> */}
      {/* <SubscribeNewsletter /> */}
    </main>
  );
}

export default Landing;

import React from "react";
import SectionTitle from "../section-title";

function CompaniesMarqueScroll() {
  const companyLogos = [
    "framer",
    "netflix",
    "google",
    "linkedin",
    "instagram",
    "facebook",
  ];

  return (
    <>
      <SectionTitle title="Used by Industry Professionals" />
      <div className="mt-5">
        <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

        <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none">
          <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none " />
          <div
            className="marquee-inner flex will-change-transform min-w-[200%]"
            style={{ animationDuration: "15s" }}
          >
            <div className="flex">
              {[...companyLogos, ...companyLogos].map((company, index) => (
                <img
                  key={index}
                  src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/${company}.svg`}
                  alt={company}
                  className="w-full h-full object-cover mx-6"
                  draggable={false}
                />
              ))}
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none" />
        </div>
      </div>
    </>
  );
}

export default CompaniesMarqueScroll;

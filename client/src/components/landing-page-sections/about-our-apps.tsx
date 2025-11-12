import SectionTitle from "../section-title";
import { motion } from "framer-motion";

export default function AboutOurApps() {
  const sectionData = [
    {
      title: "Track Interviews",
      description:
        "Track every interview stage from scheduling to offers with ease.",
      image: "/assets/pointer.png",
      className:
        "py-10 border-b border-slate-700 md:py-0 md:border-r md:border-b-0 md:px-10",
    },
    {
      title: "Find Pears & Prep",
      description:
        "Practice with peers, share insights, and grow together effectively.",
      image: "/assets/interview.png",

      className:
        "py-10 border-b border-slate-700 md:py-0 lg:border-r md:border-b-0 md:px-10",
    },
    {
      title: "Mock With Pears",
      description:
        "Simulate real interviews, get feedback, and build confidence fast.",
      image: "/assets/autodidact.png",
      className:
        "py-10 border-b border-slate-700 md:py-0 md:border-b-0 md:px-10",
    },
  ];

  return (
    <section className="flex flex-col items-center" id="about">
      <SectionTitle
        title="About our Platform"
        description="Practice with peers in real-time, simulate actual interviews, and track your real interview progress effortlessly."
      />
      <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 md:px-0 mt-18">
        {sectionData.map((data, index) => (
          <motion.div
            key={data.title}
            className={data.className}
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: `${index * 0.15}`,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            <div className="size-12 p-2 bg-indigo-600/20 border border-indigo-600/30 rounded">
              <img src={data.image} alt="" />
            </div>
            <div className="mt-5 space-y-2">
              <h3 className="text-base font-medium text-slate-200">
                {data.title}
              </h3>
              <p className="text-sm text-slate-400">{data.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

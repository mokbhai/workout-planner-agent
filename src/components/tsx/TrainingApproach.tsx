import React from "react";
import { SparklesText } from "../ui/sparkles-text";

const TrainingApproach: React.FC = () => {
  const trainingFeatures = [
    {
      icon: "⌚",
      title: "Smart Device Integration",
      description:
        "Seamlessly sync with your smartwatch or fitness tracker for real-time data",
      color: "#0EA5E9",
    },
    {
      icon: "🤖",
      title: "AI Adaptation",
      description:
        "Training plans that adapt using real-time data from your smart devices",
      color: "#4F46E5",
    },
    {
      icon: "📈",
      title: "FIRST Method",
      description:
        "Science-based approach combining quality runs with device-tracked metrics",
      color: "#10B981",
    },
    {
      icon: "💪",
      title: "Recovery Tracking",
      description:
        "Monitor heart rate, sleep quality, and recovery metrics from your devices",
      color: "#F59E0B",
    },
  ];

  return (
    <section className="py-24 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-6 flex flex-col items-center gap-4">
            {/* Train Smarter, Not Harder */}
            <SparklesText text="Train Smarter, Not Harder" />
            <span className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent relative inline-block px-4">
              FIRST Method + Smart Devices + AI
              <div className="absolute left-0 right-0 bottom-1 h-2 bg-gradient-to-r from-indigo-200 to-sky-200 -z-10"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Combining the proven FIRST methodology with smart device integration
            and AI to deliver personalized, data-driven training plans that
            adapt to your performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trainingFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden border-2 border-transparent group"
              style={{ "--accent-color": feature.color } as any}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent-color)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div
                className="text-4xl mb-6 w-16 h-16 flex items-center justify-center rounded-xl bg-opacity-10 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${feature.color}1a` }}
              >
                {feature.icon}
              </div>
              <h3 className="text-2xl text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 p-12 bg-white rounded-xl shadow-sm relative overflow-hidden mt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-sky-50 -z-10"></div>
          <div className="relative z-10">
            <h3 className="text-2xl text-gray-900 mb-6 pb-4 border-b-2 border-gray-200 relative">
              Smart Device Benefits
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-indigo-600 to-sky-500"></div>
            </h3>
            <ul className="space-y-4">
              <li className="text-gray-600 pl-8 relative before:content-['→'] before:absolute before:left-0 before:text-sky-500 before:font-bold">
                Real-time performance tracking
              </li>
              <li className="text-gray-600 pl-8 relative before:content-['→'] before:absolute before:left-0 before:text-sky-500 before:font-bold">
                Heart rate zone monitoring
              </li>
              <li className="text-gray-600 pl-8 relative before:content-['→'] before:absolute before:left-0 before:text-sky-500 before:font-bold">
                Sleep quality analysis
              </li>
              <li className="text-gray-600 pl-8 relative before:content-['→'] before:absolute before:left-0 before:text-sky-500 before:font-bold">
                Recovery metrics tracking
              </li>
            </ul>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl text-gray-900 mb-6 pb-4 border-b-2 border-gray-200 relative">
              AI Enhancement
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-indigo-600 to-sky-500"></div>
            </h3>
            <ul className="space-y-4">
              <li className="text-gray-600 pl-8 relative before:content-['→'] before:absolute before:left-0 before:text-sky-500 before:font-bold">
                Device data analysis
              </li>
              <li className="text-gray-600 pl-8 relative before:content-['→'] before:absolute before:left-0 before:text-sky-500 before:font-bold">
                Adaptive training zones
              </li>
              <li className="text-gray-600 pl-8 relative before:content-['→'] before:absolute before:left-0 before:text-sky-500 before:font-bold">
                Recovery optimization
              </li>
              <li className="text-gray-600 pl-8 relative before:content-['→'] before:absolute before:left-0 before:text-sky-500 before:font-bold">
                Personalized pacing
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingApproach;

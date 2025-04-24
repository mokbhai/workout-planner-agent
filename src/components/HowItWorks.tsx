import React from "react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Connect Your Data",
      description:
        "Link your fitness accounts and devices to import your workout history and performance data.",
    },
    {
      number: "02",
      title: "Set Your Goals",
      description:
        "Define your fitness objectives, whether it's improving endurance, building strength, or training for a specific event.",
    },
    {
      number: "03",
      title: "Get Your Plan",
      description:
        "Our AI analyzes your data and creates a personalized workout plan tailored to your goals and fitness level.",
    },
    {
      number: "04",
      title: "Track Progress",
      description:
        "Follow your plan and monitor your progress with real-time feedback and adjustments from your AI coach.",
    },
  ];

  return (
    <section id="how-it-works" className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

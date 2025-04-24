import React from "react";

const Features: React.FC = () => {
  const features = [
    {
      title: "Smart Data Integration",
      description:
        "Seamlessly connect your fitness data from smart watches, Strava, and other fitness apps to create a comprehensive profile.",
      icon: "📊",
    },
    {
      title: "AI-Powered Planning",
      description:
        "Our advanced AI analyzes your workout history and performance to create personalized training plans that adapt to your progress.",
      icon: "🤖",
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor your improvements over time with detailed analytics and insights about your fitness journey.",
      icon: "📈",
    },
    {
      title: "Customizable Goals",
      description:
        "Set and adjust your fitness goals, and let our AI coach create the perfect plan to help you achieve them.",
      icon: "🎯",
    },
  ];

  return (
    <section id="features" className="features">
      <h2>Why Choose Our AI Workout Coach?</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;

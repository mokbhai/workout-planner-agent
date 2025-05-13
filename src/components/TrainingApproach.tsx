import React from "react";
import "../styles/TrainingApproach.css";

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
    <section className="training-approach">
      <div className="training-content">
        <div className="section-header">
          <h2>
            Train Smarter, Not Harder
            <span className="highlight">FIRST Method + Smart Devices + AI</span>
          </h2>
          <p className="subtitle">
            Combining the proven FIRST methodology with smart device integration
            and AI to deliver personalized, data-driven training plans that
            adapt to your performance.
          </p>
        </div>

        <div className="features-grid">
          {trainingFeatures.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{ "--accent-color": feature.color } as any}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="approach-details">
          <div className="detail-column">
            <h3>Smart Device Benefits</h3>
            <ul>
              <li>Real-time performance tracking</li>
              <li>Heart rate zone monitoring</li>
              <li>Sleep quality analysis</li>
              <li>Recovery metrics tracking</li>
            </ul>
          </div>
          <div className="detail-column">
            <h3>AI Enhancement</h3>
            <ul>
              <li>Device data analysis</li>
              <li>Adaptive training zones</li>
              <li>Recovery optimization</li>
              <li>Personalized pacing</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingApproach;

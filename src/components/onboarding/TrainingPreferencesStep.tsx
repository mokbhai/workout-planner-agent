import type { TrainingEnvironment, OnboardingData } from "@/types/onboarding";

interface TrainingPreferencesStepProps extends OnboardingData {
  onChange: (updates: Partial<OnboardingData>) => void;
}

export const TrainingPreferencesStep = ({
  trainingEnvironment,
  injuries,
  onChange,
}: TrainingPreferencesStepProps) => {
  const environments: {
    value: TrainingEnvironment;
    label: string;
    icon: string;
    description: string;
  }[] = [
    {
      value: "outdoor",
      label: "Outdoor",
      icon: "🌳",
      description: "Prefer running in parks, trails, or streets",
    },
    {
      value: "gym",
      label: "Gym",
      icon: "🏋️‍♂️",
      description: "Prefer running on treadmills or indoor tracks",
    },
    {
      value: "both",
      label: "Both Outdoor and Gym",
      icon: "🔄",
      description: "Comfortable with both indoor and outdoor running",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Training Preferences
        </h2>
        <p className="text-gray-600">
          Tell us about your preferred training environment and any health
          considerations
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Training Environment Preference
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {environments.map((env) => (
              <button
                key={env.value}
                onClick={() => onChange({ trainingEnvironment: env.value })}
                className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                  trainingEnvironment === env.value
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{env.icon}</span>
                  <div className="text-left">
                    <span
                      className={`text-lg font-medium ${
                        trainingEnvironment === env.value
                          ? "text-blue-600"
                          : "text-gray-900"
                      }`}
                    >
                      {env.label}
                    </span>
                    <p className="text-gray-600 mt-1">{env.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Previous/Current Injuries
          </h3>
          <p className="text-gray-600 mb-4">
            Please let us know about any injuries to help us create a safe
            training plan
          </p>
          <textarea
            value={injuries}
            onChange={(e) => onChange({ injuries: e.target.value })}
            placeholder="e.g., Previous knee injury, recovering from ankle sprain..."
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[120px] resize-none"
          />
        </div>
      </div>
    </div>
  );
};

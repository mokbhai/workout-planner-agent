import type { OnboardingData } from "@/types/onboarding";

interface RunningExperienceStepProps extends OnboardingData {
  onChange: (updates: Partial<OnboardingData>) => void;
}

export const RunningExperienceStep = ({
  runningFrequency,
  experience,
  onChange,
}: RunningExperienceStepProps) => {
  const frequencies = [
    { value: "Never", icon: "🏃‍♂️" },
    { value: "Once a month", icon: "📅" },
    { value: "2-3 times a month", icon: "📆" },
    { value: "Once a week", icon: "📊" },
    { value: "2-3 times a week", icon: "📈" },
    { value: "4-5 times a week", icon: "🏃‍♀️" },
    { value: "Daily", icon: "⚡" },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Your Running Experience
        </h2>
        <p className="text-gray-600">
          Help us understand your running habits and experience
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            How often do you run?
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {frequencies.map((freq) => (
              <button
                key={freq.value}
                onClick={() => onChange({ runningFrequency: freq.value })}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                  runningFrequency === freq.value
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{freq.icon}</span>
                  <span
                    className={`text-lg ${
                      runningFrequency === freq.value
                        ? "text-blue-600 font-medium"
                        : "text-gray-900"
                    }`}
                  >
                    {freq.value}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Years of Running Experience
          </h3>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="number"
                min="0"
                max="50"
                value={experience}
                onChange={(e) =>
                  onChange({ experience: Number(e.target.value) })
                }
                className="w-32 p-3 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                years
              </span>
            </div>
            <p className="text-gray-600">
              How many years have you been running?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

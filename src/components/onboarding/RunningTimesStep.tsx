import type { OnboardingData } from "@/types/onboarding";

interface RunningTimesStepProps extends OnboardingData {
  onChange: (updates: Partial<OnboardingData>) => void;
}

export const RunningTimesStep = ({
  runningTimes,
  onChange,
}: RunningTimesStepProps) => {
  const updateTime = (distance: keyof typeof runningTimes, value: string) => {
    onChange({
      runningTimes: {
        ...runningTimes,
        [distance]: value,
      },
    });
  };

  const distances = [
    {
      key: "fiveK",
      label: "5K Time",
      placeholder: "e.g., 25:30",
      icon: "🏃",
      description: "Your best 5K race or training time",
    },
    {
      key: "tenK",
      label: "10K Time",
      placeholder: "e.g., 55:00",
      icon: "🏃‍♂️",
      description: "Your best 10K race or training time",
    },
    {
      key: "halfMarathon",
      label: "Half Marathon Time",
      placeholder: "e.g., 2:15:00",
      icon: "🏃‍♀️",
      description: "Your best half marathon race time",
    },
    {
      key: "fullMarathon",
      label: "Full Marathon Time",
      placeholder: "e.g., 4:30:00",
      icon: "🏃",
      description: "Your best full marathon race time",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Your Running Times</h2>
        <p className="text-gray-600">
          Please enter your best times for each distance (if available)
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {distances.map((distance) => (
          <div key={distance.key} className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-start gap-4">
              <span className="text-2xl">{distance.icon}</span>
              <div className="flex-1">
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  {distance.label}
                </label>
                <p className="text-gray-600 mb-4">{distance.description}</p>
                <div className="relative">
                  <input
                    type="text"
                    value={
                      runningTimes[distance.key as keyof typeof runningTimes] ||
                      ""
                    }
                    onChange={(e) =>
                      updateTime(
                        distance.key as keyof typeof runningTimes,
                        e.target.value
                      )
                    }
                    placeholder={distance.placeholder}
                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

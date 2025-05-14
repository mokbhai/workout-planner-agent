import type { FitnessLevel, OnboardingData } from "@/types/onboarding";

interface FitnessLevelStepProps extends OnboardingData {
  onChange: (updates: Partial<OnboardingData>) => void;
}

export const FitnessLevelStep = ({
  fitnessLevel,
  onChange,
}: FitnessLevelStepProps) => {
  const levels: { value: FitnessLevel; label: string; description: string }[] =
    [
      {
        value: "novice",
        label: "Novice",
        description: "New to running or exercise in general",
      },
      {
        value: "little_better_than_novice",
        label: "Little Better Than Novice",
        description: "Some experience but still learning the basics",
      },
      {
        value: "intermediate",
        label: "Intermediate",
        description: "Regular runner with good understanding of training",
      },
      {
        value: "expert",
        label: "Expert",
        description: "Advanced runner with extensive experience",
      },
    ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          What's your fitness level?
        </h2>
        <p className="text-gray-600">
          Select the option that best describes your current fitness level
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {levels.map((level) => (
          <button
            key={level.value}
            onClick={() => onChange({ fitnessLevel: level.value })}
            className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
              fitnessLevel === level.value
                ? "border-blue-500 bg-blue-50 shadow-sm"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <div className="flex flex-col items-start text-left">
              <span
                className={`text-lg font-semibold ${
                  fitnessLevel === level.value
                    ? "text-blue-600"
                    : "text-gray-900"
                }`}
              >
                {level.label}
              </span>
              <span className="text-sm text-gray-600 mt-1">
                {level.description}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

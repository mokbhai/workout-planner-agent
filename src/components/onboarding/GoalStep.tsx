import type { OnboardingData } from "@/types/onboarding";

interface GoalStepProps extends OnboardingData {
  onChange: (updates: Partial<OnboardingData>) => void;
}

export const GoalStep = ({ goal, onChange }: GoalStepProps) => {
  const goalTypes = [
    {
      value: "time_reduction",
      label: "Reduce Running Time",
      icon: "⏱️",
      description: "Improve your pace and complete runs faster",
    },
    {
      value: "distance_increase",
      label: "Increase Running Distance",
      icon: "📏",
      description: "Build endurance to run longer distances",
    },
    {
      value: "general_fitness",
      label: "Improve General Fitness",
      icon: "💪",
      description: "Focus on overall fitness and health through running",
    },
  ];

  const updateGoal = (updates: Partial<OnboardingData["goal"]>) => {
    onChange({
      goal: {
        ...goal,
        ...updates,
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">What's Your Goal?</h2>
        <p className="text-gray-600">
          Select your primary running goal to help us create a personalized plan
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {goalTypes.map((type) => (
          <button
            key={type.value}
            onClick={() =>
              updateGoal({ type: type.value as OnboardingData["goal"]["type"] })
            }
            className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
              goal.type === type.value
                ? "border-blue-500 bg-blue-50 shadow-sm"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{type.icon}</span>
              <div className="text-left">
                <span
                  className={`text-lg font-medium ${
                    goal.type === type.value ? "text-blue-600" : "text-gray-900"
                  }`}
                >
                  {type.label}
                </span>
                <p className="text-gray-600 mt-1">{type.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {goal.type === "time_reduction" && (
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Target Time Reduction
          </h3>
          <p className="text-gray-600 mb-4">
            How much time would you like to reduce from your current pace?
          </p>
          <input
            type="text"
            value={goal.targetTime || ""}
            onChange={(e) => updateGoal({ targetTime: e.target.value })}
            placeholder="e.g., 5 minutes"
            className="w-full p-4 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      )}

      {goal.type === "distance_increase" && (
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Target Distance
          </h3>
          <p className="text-gray-600 mb-4">
            What distance would you like to achieve?
          </p>
          <input
            type="text"
            value={goal.targetDistance || ""}
            onChange={(e) => updateGoal({ targetDistance: e.target.value })}
            placeholder="e.g., 10K"
            className="w-full p-4 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      )}
    </div>
  );
};

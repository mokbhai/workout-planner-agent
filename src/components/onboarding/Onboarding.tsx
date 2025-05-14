import { useState } from "react";
import { FitnessLevelStep } from "./FitnessLevelStep";
import { RunningExperienceStep } from "./RunningExperienceStep";
import { TrainingPreferencesStep } from "./TrainingPreferencesStep";
import { RunningTimesStep } from "./RunningTimesStep";
import { GoalStep } from "./GoalStep";
import type {
  OnboardingData,
  FitnessLevel,
  TrainingEnvironment,
} from "@/types/onboarding";

const validationRules = {
  fitnessLevel: (value: string) => !!value,
  runningFrequency: (value: string) => !!value,
  experience: (value: number) => value >= 0,
  trainingEnvironment: (value: string) => !!value,
  injuries: (value: string) => true, // Optional
  runningTimes: (value: any) => true, // Optional
  goal: (value: any) => {
    if (!value.type) return false;
    if (value.type === "time_reduction" && !value.targetTime) return false;
    if (value.type === "distance_increase" && !value.targetDistance)
      return false;
    return true;
  },
};

const steps = [
  {
    title: "Fitness Level",
    component: FitnessLevelStep,
    validate: (data: OnboardingData) =>
      validationRules.fitnessLevel(data.fitnessLevel),
  },
  {
    title: "Running Experience",
    component: RunningExperienceStep,
    validate: (data: OnboardingData) =>
      validationRules.runningFrequency(data.runningFrequency) &&
      validationRules.experience(data.experience),
  },
  {
    title: "Training Preferences",
    component: TrainingPreferencesStep,
    validate: (data: OnboardingData) =>
      validationRules.trainingEnvironment(data.trainingEnvironment) &&
      validationRules.injuries(data.injuries),
  },
  {
    title: "Running Times",
    component: RunningTimesStep,
    validate: (data: OnboardingData) =>
      validationRules.runningTimes(data.runningTimes),
  },
  {
    title: "Goals",
    component: GoalStep,
    validate: (data: OnboardingData) => validationRules.goal(data.goal),
  },
];

export const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>({
    fitnessLevel: "novice",
    runningFrequency: "",
    experience: 0,
    trainingEnvironment: "outdoor",
    injuries: "",
    runningTimes: {
      fiveK: "",
      tenK: "",
      halfMarathon: "",
      fullMarathon: "",
    },
    goal: {
      type: "general_fitness",
      targetTime: "",
      targetDistance: "",
    },
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (steps[currentStep].validate(formData)) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save onboarding data");
      }

      // Redirect to dashboard or next page
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      alert("Failed to save your information. Please try again.");
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome to Workout Planner
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="text-lg font-semibold">
              {steps[currentStep].title}
            </div>
          </div>
          <div className="w-full bg-gray-200 h-2 mt-2 rounded-full">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <CurrentStepComponent
            {...formData}
            onChange={(updates: Partial<OnboardingData>) => {
              setFormData((prev) => ({ ...prev, ...updates }));
            }}
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!steps[currentStep].validate(formData)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

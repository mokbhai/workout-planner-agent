export type FitnessLevel =
  | "novice"
  | "little_better_than_novice"
  | "intermediate"
  | "expert";

export type TrainingEnvironment = "outdoor" | "gym" | "both";

export interface RunningTimes {
  fiveK?: string;
  tenK?: string;
  halfMarathon?: string;
  fullMarathon?: string;
}

export interface OnboardingData {
  fitnessLevel: FitnessLevel;
  runningFrequency: string;
  experience: number;
  trainingEnvironment: TrainingEnvironment;
  injuries: string;
  runningTimes: RunningTimes;
  goal: {
    type: "time_reduction" | "distance_increase" | "general_fitness";
    targetTime?: string;
    targetDistance?: string;
  };
}

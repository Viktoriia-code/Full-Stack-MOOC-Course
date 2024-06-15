import { isNotNumber } from "./utils";

interface ExerciseData {
  daily_exercise_hours: number[];
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): ExerciseData => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const daily_exercises = [];
  
  for (let i=3; i<args.length; i++) {
    if (!isNotNumber(args[i])) {
      daily_exercises.push(Number(args[i]));
    } else {
      throw new Error('Provided daily hours values were not numbers!');
    }
  }

  if (!isNotNumber(args[2])) {
    return {
      daily_exercise_hours: daily_exercises,
      target: Number(args[2])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (daily_exercise_hours: number[], target_amount: number): Result => {

  const trained_days = daily_exercise_hours.filter((daily_exercise) => daily_exercise > 0);

  const isTargetReached = daily_exercise_hours.every((daily_exercise) => daily_exercise >= target_amount);
  
  let sum = 0;
  for(let i = 0; i < daily_exercise_hours.length; i++) {
    sum += daily_exercise_hours[i];
  }

  const average = sum / daily_exercise_hours.length;
  
  let rating = 1;
  let ratingDesc = "Keep trying! You're not quite there yet.";
  if (isTargetReached) {
    rating = 3;
    ratingDesc = "Congratulations! You've successfully met your target.";
  } else if (average >= target_amount * 0.75) {
    rating = 2;
    ratingDesc = "Good effort! You're close to reaching your goal.";
  }
  
  return {
    periodLength: daily_exercise_hours.length,
    trainingDays: trained_days.length,
    success: isTargetReached,
    rating: rating,
    ratingDescription: ratingDesc,
    target: target_amount,
    average: average,
  };
};

try {
  const { daily_exercise_hours, target } = parseArguments(process.argv);
  console.log(calculateExercises(daily_exercise_hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
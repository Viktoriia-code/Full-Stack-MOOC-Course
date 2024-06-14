interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (daily_exercise_hours: number[], target_amount: number) => {

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
  }
}

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
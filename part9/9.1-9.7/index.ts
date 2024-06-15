import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculator, Operation } from './calculator';
import { calculateExercises } from './exerciseCalculator';
import { isNotNumber } from "./utils";
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  
  if (isNotNumber(height) || isNotNumber(weight) || !height || !weight) {
    return res.status(400).send({error: "malformatted parameters"});
  }
  return res.status(400).send({
    height: Number(height),
    weight: Number(weight),
    bmi: calculateBmi(Number(height), Number(weight))
  });
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if ( !value1 || isNaN(Number(value1)) ) {
    return res.status(400).send({ error: '...'});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(Number(value1), Number(value2), op as Operation);
  return res.send({ result });
});

app.post('/exercisions', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if ( !daily_exercises || !target ) {
    return res.status(400).send({ error: 'parameters missing'});
  }

  if (isNotNumber(target) || !Array.isArray(daily_exercises)) {
    return res.status(400).send({ error: 'malformatted parameters'});
  }

  for (const day of daily_exercises) {
    if (isNotNumber(day)) {
      return res.status(400).send({ error: 'malformatted parameters'});
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, Number(target));
  
  return res.status(400).send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
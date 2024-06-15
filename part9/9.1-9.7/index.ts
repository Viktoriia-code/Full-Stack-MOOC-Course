import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from "./utils";
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (isNotNumber(height) || isNotNumber(weight) || !height || !weight) {
    res.send({error: "malformatted parameters"})
  }
  res.send({
    height: height, 
    weight: weight, 
    bmi: calculateBmi(Number(height), Number(weight))
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
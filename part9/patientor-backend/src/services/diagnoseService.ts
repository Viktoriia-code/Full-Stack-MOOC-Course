import diagnosesData from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';

const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnosesData;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};
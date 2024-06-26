import axios from "axios";
import { DiagnoseEntry } from '../types';

import { apiBaseUrl } from "../constants";

const getDiagnoses = async () => {
  const { data } = await axios.get<DiagnoseEntry[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};
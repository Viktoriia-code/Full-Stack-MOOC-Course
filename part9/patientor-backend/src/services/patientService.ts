import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { parseId } from '../utils';

const getPatients = (): Patient[] => {
  return patientsData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = ( entry: NewPatient ): Patient => {
  const id: string = parseId(uuid());
  const newPatient = {
    id: id,
    ...entry
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};
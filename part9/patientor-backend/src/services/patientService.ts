import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { parseId } from '../utils';

const getPatients = (): Patient[] => {
  return patientsData;
};

const findById = (id: string): Patient | undefined => {
  return patientsData.find(d => d.id === id);
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
  findById,
  getNonSensitivePatients,
  addPatient
};
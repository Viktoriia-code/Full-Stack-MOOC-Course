import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NonSensitivePatient, NewPatient, NewEntry, Entry } from '../types';
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

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const id: string = parseId(uuid());
  const newEntry: Entry = {
    id: id,
    ...entry,
  };

  const patientIndex = patientsData.findIndex((p) => p.id === patientId);

  if (patientIndex === -1) {
    throw new Error('Patient not found');
  }
  patientsData[patientIndex].entries?.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  findById,
  getNonSensitivePatients,
  addPatient,
  addEntry
};
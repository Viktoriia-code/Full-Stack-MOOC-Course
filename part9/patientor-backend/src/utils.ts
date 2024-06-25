import { NewPatient, Gender, Entry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseId = (id: unknown): string => {
  if (!isString(id)) {
    throw new Error('Incorrect or missing id');
  }
  return id;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDateOfBirth = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDateOfBirth(dateOfBirth)) {
      throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (Array.isArray(entries)) {
    entries.forEach((entry) => {
      if (!('type' in entry)) {
        throw new Error("Entry is missing 'type' field.");
      }

      if (!isString(entry.type)) {
        throw new Error('Invalid entry type.');
      }

      parseEntryType(entry.type);
    });
  } else {
    throw new Error('Invalid entries format. Expected an array.');
  }
  return entries as Entry[];
};

const parseEntryType = ( type: unknown ): 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' => {

  if (!isString(type)) {
    throw new Error('Incorrect or missing type');
  }

  switch (type) {
    case 'HealthCheck':
      return 'HealthCheck';
    case 'Hospital':
      return 'Hospital';
    case 'OccupationalHealthcare':
      return 'OccupationalHealthcare';
    default:
      throw new Error('Invalid type');
  }
};

const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  } 

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};


export default toNewPatient;
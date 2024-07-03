import { Alert, Button, Input, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { DiagnoseEntry, Patient, NewEntry, HealthCheckRating } from '../../types';
import patientService from "../../services/patients";
import axios from 'axios';

interface HealthCheckRatingOption {
  value: string; // Use number type for enum values
  label: string; // Use string type for enum member names
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.keys(HealthCheckRating)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .filter(key => typeof HealthCheckRating[key as any] === 'number')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .map(key => ({ value: HealthCheckRating[key as any], label: key }));

const HealthCheckForm: React.FC<{patient: Patient; setPatient: Dispatch<SetStateAction<Patient | undefined>>; diagnoses:DiagnoseEntry[]}> = ({ patient, setPatient, diagnoses }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<DiagnoseEntry['code']>>([]);
  const [error, setError] = useState<string>('');
  
  const values: NewEntry = {
    description,
    date,
    specialist,
    diagnosisCodes,
    type: 'HealthCheck',
    healthCheckRating,
  };

  const notify = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const handleDiagnosisChange = (e: SelectChangeEvent<typeof diagnosisCodes>) => {
    const { target: {value} } = e;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await patientService.addEntry(patient.id, values);
      onCancel();
      const newPatient = await patientService.getOne(patient.id);
      setPatient(newPatient);
    } catch(e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          notify(message);
        } else {
          notify("Unrecognized axios error");
        }
      } else {
        //console.error("Unknown error", e);
        notify("Unknown error");
      }
    }
  };

  const onCancel = (): void => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating(0);
    setDiagnosisCodes([]);
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <div style={{border: '2px dotted black', borderRadius: "0.5rem", marginTop: "1rem", padding: "1rem"}}>
        <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>New Health Check entry</Typography >
        <form onSubmit={addEntry}>
          <InputLabel htmlFor="description-input">Description</InputLabel>
          <Input
            id="description-input"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <InputLabel htmlFor="date-input">Date</InputLabel>
          <Input
            id="date-input"
            type="date"
            fullWidth 
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <InputLabel htmlFor="specialist-input">Specialist</InputLabel>
          <Input
            id="specialist-input"
            fullWidth 
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <InputLabel htmlFor="healthcheckrating-input" style={{ marginTop: '0.5rem' }}>Healthcheck Rating</InputLabel>
          <Select
            id="healthcheckrating-input"
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value as HealthCheckRating)}
            fullWidth
          >
            {healthCheckRatingOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
          <InputLabel htmlFor="diagnosiscodes-input">Diagnosis Codes</InputLabel>
          <Select
            label="Diagnosis codes"
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisChange}
            fullWidth
            margin="dense"
            input={<OutlinedInput id="select-multiple-chip" label="Diagnosis codes" />}
            MenuProps={MenuProps}
            renderValue={(selected) => selected.join(', ')}
          >
            {diagnoses.map(option => {
              return <MenuItem
                  key={option.code}
                  value={option.code}
                  >{option.code}: {option.name}
                </MenuItem>;
            })}
          </Select>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
            <Button
              color="error"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </div>
        </form>
      </div>

    </>
  );
};

export default HealthCheckForm;
import { Alert, Button, Input, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { DiagnoseEntry, HealthCheckRating, Patient, NewEntry } from '../../types';
import patientService from "../../services/patients";
import axios from 'axios';

/*interface HealthCheckRatingOption {
  value: string; // Use number type for enum values
  label: string; // Use string type for enum member names
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.keys(HealthCheckRating)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .filter(key => typeof HealthCheckRating[key as any] === 'number')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .map(key => ({ value: HealthCheckRating[key as any], label: key }));*/

const AddEntryForm: React.FC<{patient: Patient}> = ({ patient }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
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

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(values);
    
    try {
      await patientService.addEntry(patient.id, values);
    } catch(e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          notify(message);
        } else {
          notify("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        notify("Unknown error");
      }
    }
  };

  const onCancel = (): void => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating(1);
    setDiagnosisCodes([]);
  };

  const onHealthCheckRatingChange = (value: unknown) => {
    const healthCheckRating = Object.values(HealthCheckRating).find(rating => rating.toString() === value);

    if (healthCheckRating !== undefined) {
      setHealthCheckRating(Number(healthCheckRating) as HealthCheckRating);
    } else {
      setHealthCheckRating(0);
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <div style={{border: '2px dotted black', borderRadius: "0.5rem", marginTop: "1rem", padding: "1rem"}}>
        <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>New HealthCheck entry</Typography >
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
          <InputLabel htmlFor="healthcheckrating-input">Healthcheck Rating</InputLabel>
          <Input
            id="healthcheckrating-input"
            fullWidth 
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          />
          <InputLabel htmlFor="diagnosiscodes-input">Diagnosis Codes</InputLabel>
          <Input
            id="diagnosiscodes-input"
            fullWidth 
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value.split(', '))}
          />
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

export default AddEntryForm;
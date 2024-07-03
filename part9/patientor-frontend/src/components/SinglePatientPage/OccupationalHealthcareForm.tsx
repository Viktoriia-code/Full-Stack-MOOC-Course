import { Alert, Button, Input, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { DiagnoseEntry, Patient, NewEntry, SickLeave } from '../../types';
import patientService from "../../services/patients";
import axios from 'axios';

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

const OccupationalHealthcareForm: React.FC<{patient: Patient; setPatient: Dispatch<SetStateAction<Patient | undefined>>; diagnoses:DiagnoseEntry[]}> = ({ patient, setPatient, diagnoses }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickleaveStart, setSickleaveStart] = useState('');
  const [sickleaveEnd, setSickleaveEnd] = useState('');
  const sickLeave:SickLeave = {startDate: sickleaveStart, endDate: sickleaveEnd};
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<DiagnoseEntry['code']>>([]);
  const [error, setError] = useState<string>('');
  
  const values: NewEntry = {
    description,
    date,
    specialist,
    diagnosisCodes,
    type: 'OccupationalHealthcare',
    employerName,
    sickLeave
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
    setEmployerName('');
    setSickleaveStart('');
    setSickleaveEnd('');
    setDiagnosisCodes([]);
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <div style={{border: '2px dotted black', borderRadius: "0.5rem", marginTop: "1rem", padding: "1rem"}}>
        <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>New Occupational Healthcare Check entry</Typography >
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
          <InputLabel htmlFor="criteria-input">Employer Name</InputLabel>
          <Input
            id="employerName-input"
            fullWidth 
            value={specialist}
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <Typography style={{marginTop: '1rem', marginBottom: '0.5rem'}}>Sick leave</Typography>
          <InputLabel htmlFor="sick-leave-start-input">Start</InputLabel>
          <Input
            id="sick-leave-start-input"
            type="date"
            fullWidth 
            value={date}
            onChange={({ target }) => setSickleaveStart(target.value)}
          />
          <InputLabel htmlFor="sick-leave-end-input">End</InputLabel>
          <Input
            id="sick-leave-end-input"
            type="date"
            fullWidth 
            value={date}
            onChange={({ target }) => setSickleaveEnd(target.value)}
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

export default OccupationalHealthcareForm;
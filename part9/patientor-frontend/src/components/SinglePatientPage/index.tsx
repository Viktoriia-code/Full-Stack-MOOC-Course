import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import { DiagnoseEntry, Patient } from '../../types';
import { Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import EntryDetails from './EntryDetails';

const genderIcons = {
  male: <MaleIcon />,
  female: <FemaleIcon />,
  other: <QuestionMarkIcon />
};

interface Props {
  diagnoses: DiagnoseEntry[];
}

const SinglePatientPage = ( {diagnoses}: Props ) => {
  const [patient, setPatient] = useState<Patient | undefined >();
  const id: string | undefined = useParams().id;
  
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id) {
          const patient = await patientService.getOne(id);
          setPatient(patient);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) {
    return <div></div>;
  } 

  return (
    <div>
      <Typography variant="h5" style={{ marginTop: "2rem", marginBottom: "1rem", fontWeight: "bold" }}>{patient.name} {genderIcons[patient.gender]}</Typography>
      <Typography>ssh: {patient.ssn}</Typography >
      <Typography>occupation: {patient.occupation}</Typography >
      <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "1rem" }}>entries</Typography >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {patient.entries?.map((entry, index) => (
          <EntryDetails key={index} entry={entry} diagnoses={diagnoses} />
        ))}
      </div>
    </div>
  );
};

export default SinglePatientPage;
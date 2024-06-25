import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import { Patient } from '../../types';
import { Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const genderIcons = {
  male: <MaleIcon />,
  female: <FemaleIcon />,
  other: <QuestionMarkIcon />
};

const SinglePatientPage = () => {
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
      {patient.entries?.map((entry, index) => (
        <div key={index}>
          <Typography>{entry.date} <span style={{ fontStyle: 'italic' }}>{entry.description}</span></Typography>
          <ul>
            {entry.diagnosisCodes?.map((code, index) => (
              <li key={index}><Typography>{code}</Typography></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SinglePatientPage;
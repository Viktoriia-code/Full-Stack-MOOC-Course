import React from 'react';
import { DiagnoseEntry, Entry } from '../../types';
import { Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import { assertNever } from '../../utils';
import FavoriteIcon from '@mui/icons-material/Favorite';

const healthCheckRatingIcons = {
  0: <FavoriteIcon color='success' />,
  1: <FavoriteIcon color='info' />,
  2: <FavoriteIcon color='warning' />,
  3: <FavoriteIcon color='error' />,
};

const EntryDetails: React.FC<{ entry: Entry, diagnoses: DiagnoseEntry[] }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div style={{border: '2px solid black', borderRadius: "0.5rem", padding: "0.5em"}}>
          <Typography>{entry.date} <LocalHospitalIcon /></Typography>
          <Typography style={{fontStyle: 'italic'}}>{entry.description}</Typography>

          <ul>
            {entry.diagnosisCodes?.map((code, index) => (
              <li key={index}><Typography>{code} {diagnoses.find((a) => a.code === code)?.name}</Typography></li>
            ))}
          </ul>
          <Typography>diagnose by {entry.specialist}</Typography>
        </div>
      );
    case "HealthCheck":
      return (
        <div style={{border: '2px solid black', borderRadius: "0.5rem", padding: "0.5em"}}>
          <Typography>{entry.date} <MedicalServicesIcon /></Typography>
          <Typography style={{fontStyle: 'italic'}}>{entry.description}</Typography>
          {healthCheckRatingIcons[entry.healthCheckRating]}
          <Typography>diagnose by {entry.specialist}</Typography>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={{border: '2px solid black', borderRadius: "0.5rem", padding: "0.5em"}}>
          <Typography>{entry.date} <WorkIcon /> <span style={{fontStyle: 'italic'}}>{entry.employerName}</span></Typography>
          <Typography style={{fontStyle: 'italic'}}>{entry.description}</Typography>
          <ul>
            {entry.diagnosisCodes?.map((code, index) => (
              <li key={index}><Typography>{code} {diagnoses.find((a) => a.code === code)?.name}</Typography></li>
            ))}
          </ul>
          <Typography>diagnose by {entry.specialist}</Typography>
        </div>
      );
    default:
      assertNever(entry);
  }
};

export default EntryDetails;
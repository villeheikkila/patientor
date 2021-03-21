import React from "react";
import { DiagnoseState, Entry } from "../types";
import { HealtCheckEntry } from "./HealthCheckEntry";
import { HospitalEntry } from "./HospitalEntry";

export const PatientEntry = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: DiagnoseState;
}) => {
  switch (entry.type) {
    case "Hospital": {
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    }
    case "OccupationalHealthcare": {
      return <HealtCheckEntry entry={entry} diagnoses={diagnoses} />;
    }
    default:
      return null;
  }
};

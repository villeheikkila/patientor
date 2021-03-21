import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Diagnose, DiagnoseState, Entry } from "../types";

export const HealtCheckEntry = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: DiagnoseState;
}) => (
  <Card style={{ width: "50rem", padding: "1rem" }}>
    <div style={{ display: "flex" }}>
      <h4>{entry.date}</h4> <Icon name="user doctor" />
    </div>
    <p>{entry.description}</p>
    <ul>
      {entry?.diagnosisCodes?.map((diagnosisCode) => (
        <li key={diagnosisCode}>
          {diagnoses[diagnosisCode as keyof Diagnose]?.code}:{" "}
          {diagnoses[diagnosisCode as keyof Diagnose]?.name}
        </li>
      ))}
    </ul>
  </Card>
);

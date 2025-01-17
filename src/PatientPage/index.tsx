import React, { useState } from "react";
import { Button, Container, Table } from "semantic-ui-react";
import HealthRatingBar from "../components/HealthRatingBar";
import { useParams } from "react-router";
import {
  addPatient,
  createNewEntry,
  patientFromApi,
  updateEntryForPatient,
  useStateValue,
} from "../state";
import AddEntryModal from "../AddEntryModal";
import { HospitalEntryValues } from "../AddEntryModal/AddEntryModal";
import { PatientEntry } from "./PatientEntry";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [field, setFieldValue] = useState([]);
  const [error, setError] = React.useState<string | undefined>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  React.useEffect(() => {
    if (patients[id]?.ssn === undefined) {
      void patientFromApi(id).then((patient) => dispatch(addPatient(patient)));
    }
  }, [dispatch]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = ({
    dischargeCriteria,
    dischargeDate,
    ...rest
  }: HospitalEntryValues) => {
    void createNewEntry(
      {
        ...rest,
        type: "Hospital",
        discharge: { date: dischargeDate, criteria: dischargeCriteria },
        diagnosisCodes: field,
      },
      id
    ).then((res) => dispatch(updateEntryForPatient(id, res)));
    closeModal();
  };

  if (patients[id]?.ssn === undefined) return null;
  const patient = patients[id];

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient list</h3>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Property</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row key={patient.name}>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>{patient.name}</Table.Cell>
          </Table.Row>

          <Table.Row key={patient.occupation}>
            <Table.Cell>Occupation</Table.Cell>
            <Table.Cell>{patient.occupation}</Table.Cell>
          </Table.Row>

          <Table.Row key={patient.gender}>
            <Table.Cell>Gender</Table.Cell>
            <Table.Cell>{patient.gender}</Table.Cell>
          </Table.Row>

          <Table.Row key={patient.ssn}>
            <Table.Cell>SSN</Table.Cell>
            <Table.Cell>{patient.ssn}</Table.Cell>
          </Table.Row>

          <Table.Row key={patient.dateOfBirth}>
            <Table.Cell>Date of birth</Table.Cell>
            <Table.Cell>{patient.dateOfBirth}</Table.Cell>
          </Table.Row>

          <Table.Row key={patient.id}>
            <Table.Cell>Health</Table.Cell>

            <Table.Cell>
              <HealthRatingBar showText={false} rating={1} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <h2>Entries:</h2>

      {patient?.entries?.map((entry) => (
        <PatientEntry key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={Object.values(diagnoses)}
        setFieldValue={(_key, value) => setFieldValue(value)}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;

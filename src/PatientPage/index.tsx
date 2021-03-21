import React from "react";
import { Container, Table } from "semantic-ui-react";
import HealthRatingBar from "../components/HealthRatingBar";
import { useParams } from "react-router";
import { addPatient, patientFromApi, useStateValue } from "../state";
import { Diagnose, DiagnoseState, Entry } from "../types";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();

    const [{ patients, diagnoses }, dispatch] = useStateValue();
    console.log('diagnoses: ', diagnoses);
    React.useEffect(() => {
        if (patients[id]?.ssn === undefined) {
            void patientFromApi(id).then((patient) => dispatch(addPatient(patient)));
        }
    }, [dispatch]);

    if (patients[id]?.ssn === undefined) return null;

    const patient = patients[id];
    console.log('patient: ', patient);

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

            {patient?.entries?.map((entry) => (
                <PatientEntry key={entry.id} entry={entry} diagnoses={diagnoses} />
            ))}
        </div>
    );
};

const PatientEntry = ({ entry, diagnoses }: { entry: Entry, diagnoses: DiagnoseState }) => {
    switch (entry.type) {
        case "Hospital": {
            return (
                <div>
                    <b>{entry.date}</b> <p>{entry.description}</p>{" "}
                    <ul>
                        {entry?.diagnosisCodes?.map((diagnosisCode) => (
                            <li key={diagnosisCode}>{diagnoses[(diagnosisCode as keyof Diagnose)]?.code}: {diagnoses[(diagnosisCode as keyof Diagnose)]?.name}</li>
                        ))}
                    </ul>
                </div>
            );
        }
        case "OccupationalHealthcare": {
            return (
                <div>
                    <b>{entry.date}</b> <p>{entry.description}</p>{" "}
                    <ul>
                        {entry?.diagnosisCodes?.map((diagnosisCode) => (
                            <li key={diagnosisCode}>{diagnoses[(diagnosisCode as keyof Diagnose)]?.code}: {diagnoses[(diagnosisCode as keyof Diagnose)]?.name}</li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
};
export default PatientPage;

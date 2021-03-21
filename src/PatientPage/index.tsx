import React from "react";
import axios from "axios";
import { Container, Table } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useParams } from "react-router";
import { useStateValue } from "../state";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();

    const [{ patients }, dispatch] = useStateValue();
    React.useEffect(() => {

        if (patients[id]?.ssn === undefined) {

            const fetchPatient = async () => {
                try {
                    const { data } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`);
                    dispatch({ type: "ADD_PATIENT", payload: data });
                } catch (e) {
                    console.error(e);
                }
            };
            void fetchPatient();
        }
    }, [dispatch]);

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
        </div >
    );
};

export default PatientPage;

import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { diagnosesFromApi, patientListFromApi, setDiagnoseList, setPatientList, useStateValue } from "./state";

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    void patientListFromApi().then(patients => dispatch(setPatientList(patients)));
    void diagnosesFromApi().then(diagnoses => dispatch(setDiagnoseList(diagnoses)));
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary >
            Home
          </Button>

          <Divider hidden />
          <Switch>
            <Route path="/" exact >
              <PatientListPage />
            </Route>

            <Route path="/patients/:id">
              <PatientPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;

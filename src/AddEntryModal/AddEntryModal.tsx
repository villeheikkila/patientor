import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form, FormikProps } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { BaseEntry, Diagnosis } from "../types";

export type HospitalEntryValues = Omit<BaseEntry, "id" | "diagnosisCodes"> & {
  dischargeCriteria: string;
  dischargeDate: string;
};

interface Props {
  onSubmit: (values: HospitalEntryValues) => void;
  onCancel: () => void;
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: () => void;
}

export const AddEntryForm = ({
  onSubmit,
  onCancel,
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: Props) => {
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        dischargeDate: "",
        dischargeCriteria: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.dischargeDate) {
          errors.dischargeDate = requiredError;
        }
        if (!values.dischargeCriteria) {
          errors.dischargeCriteria = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Discharge criteria"
              name="dischargeCriteria"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;

import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { Diagnose } from "../types";
import AddEntryForm, { HospitalEntryValues } from "./AddEntryModal";
import { FormikProps } from "formik";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalEntryValues) => void;
  error?: string;
  diagnoses: Diagnose[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  diagnoses,
  setFieldValue,
}: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm
        onSubmit={onSubmit}
        onCancel={onClose}
        diagnoses={diagnoses}
        setFieldValue={setFieldValue}
        setFieldTouched={() => false}
      />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;

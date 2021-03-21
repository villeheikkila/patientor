import { State } from "./state";
import { Diagnose, HospitalEntry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnose[];
    }
  | {
      type: "UPDATE_ENTRY_FOR_PATIENT";
      payload: { entry: HospitalEntry; id: string };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "UPDATE_ENTRY_FOR_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            entries: [
              ...(state.patients[action.payload.id].entries || []),
              action.payload.entry,
            ],
          },
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]) => ({
  type: "SET_PATIENT_LIST" as const,
  payload: patientListFromApi,
});

export const setDiagnoseList = (diagnoses: Diagnose[]) => ({
  type: "SET_DIAGNOSES_LIST" as const,
  payload: diagnoses,
});

export const addPatient = (patient: Patient) => ({
  type: "ADD_PATIENT" as const,
  payload: patient,
});

export const updateEntryForPatient = (id: string, entry: HospitalEntry) => ({
  type: "UPDATE_ENTRY_FOR_PATIENT" as const,
  payload: { entry, id },
});

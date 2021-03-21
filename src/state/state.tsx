import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import { apiBaseUrl } from "../constants";
import { DiagnoseState, Diagnosis, HospitalEntry, Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnoses: DiagnoseState;
};

const initialState: State = {
  patients: {},
  diagnoses: {},
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children,
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

export const patientListFromApi = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

export const diagnosesFromApi = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);
  return data;
};

export const patientFromApi = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

export const createPatient = async (values: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, values);

  return data;
};

export const createNewEntry = async (
  values: Omit<HospitalEntry, "id">,
  id: string
) => {
  const { data } = await axios.post<HospitalEntry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    values
  );

  return data;
};

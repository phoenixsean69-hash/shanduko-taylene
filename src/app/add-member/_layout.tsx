import { Slot } from 'expo-router';
import { createContext, useContext, useState } from 'react';

type MemberForm = {
  fullName: string;
  idNumber: string;
  stand: string;
  spouseName?: string;
  spouseId?: string;
  nextOfKin?: string;
  householdSize?: string;
  address?: string;
  documents?: { [k: string]: string };
};

const DEFAULT: MemberForm = {
  fullName: '',
  idNumber: '',
  stand: '',
  spouseName: '',
  spouseId: '',
  nextOfKin: '',
  householdSize: '',
  address: '',
  documents: {},
};

const AddMemberContext = createContext<{
  form: MemberForm;
  setForm: (u: Partial<MemberForm>) => void;
  reset: () => void;
}>({
  form: DEFAULT,
  setForm: () => {},
  reset: () => {},
});

export function useAddMember() {
  return useContext(AddMemberContext);
}

export default function AddMemberLayout() {
  const [form, setState] = useState<MemberForm>(DEFAULT);

  function setForm(u: Partial<MemberForm>) {
    setState((s) => ({ ...s, ...u }));
  }

  function reset() {
    setState(DEFAULT);
  }

  return (
    <AddMemberContext.Provider value={{ form, setForm, reset }}>
      <Slot />
    </AddMemberContext.Provider>
  );
}

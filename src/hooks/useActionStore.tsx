import { create } from 'zustand';

type ActionState = {
  action: string;
  setAction: (value: string) => void;
};

const useActionStore = create<ActionState>()((set) => ({
  action: '',
  setAction: (value) => set(() => ({ action: value })),
}));

export default useActionStore;

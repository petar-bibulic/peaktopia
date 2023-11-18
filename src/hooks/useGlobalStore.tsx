import { create } from 'zustand';
import { DocType } from '@components/data/DataTypes';

type ActionState = {
  action: string;
  setAction: (value: string) => void;
  charts: Array<DocType>;
  setCharts: (array: Array<DocType>) => void;
  activeCharts: Array<string>;
  setActiveCharts: (array: Array<string>) => void;
  userInstruction: string;
  setUserInstruction: (value: string) => void;
  theme: string;
  setTheme: (value: string) => void;
};

const useGlobalStore = create<ActionState>()((set) => ({
  action: '',
  setAction: (value) => set(() => ({ action: value })),
  charts: [],
  setCharts: (array) => set(() => ({ charts: array })),
  activeCharts: [],
  setActiveCharts: (array) => set(() => ({ activeCharts: array })),
  userInstruction: '',
  setUserInstruction: (value) => set(() => ({ userInstruction: value })),
  theme: 'dark',
  setTheme: (value) => set(() => ({ theme: value })),
}));

export default useGlobalStore;

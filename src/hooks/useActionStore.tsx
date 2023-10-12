import { create } from 'zustand';
import { DocType } from '@components/data/DataTypes';

type ActionState = {
  action: string;
  setAction: (value: string) => void;
  charts: Array<DocType>;
  setCharts: (array: Array<DocType>) => void;
  activeCharts: Array<string>;
  setActiveCharts: (array: Array<string>) => void;
};

const useActionStore = create<ActionState>()((set) => ({
  action: '',
  setAction: (value) => set(() => ({ action: value })),
  charts: [],
  setCharts: (array) => set(() => ({ charts: array })),
  activeCharts: [],
  setActiveCharts: (array) => set(() => ({ activeCharts: array })),
}));

export default useActionStore;

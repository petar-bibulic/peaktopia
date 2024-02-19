'use client';

import TablePreview from '@components/data/table/TablePreview';
import { mockCharts, mockData } from '@mocks/mockPeaks';
import { db } from '@firebaseApp/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import useGlobalStore from '@hooks/useGlobalStore';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { ChartDataset, PeakType } from '@components/data/DataTypes';

type Props = {};

const TableView = (props: Props) => {
  const peaks = useGlobalStore((state) => state.data);
  const setPeaks = useGlobalStore((state) => state.setData);
  const setCharts = useGlobalStore((state) => state.setCharts);
  const setActiveCharts = useGlobalStore((state) => state.setActiveCharts);
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const userObj = user ? JSON.parse(user) : null;

  useEffect(() => {
    fetchPeaks();

    return () => {
      setCharts([]);
      setActiveCharts([]);
    };
  }, []);

  const fetchPeaks = async () => {
    try {
      if (userObj) {
        const q = query(collection(db, 'peaks'), where('userId', '==', userObj?.uid));
        const qSnapshot = await getDocs(q);
        let peakData: Array<PeakType> = [];
        qSnapshot.forEach((doc) => {
          peakData.push({ ...doc.data(), id: doc.id } as PeakType);
        });
        setActiveCharts(peakData.map((obj) => obj.name));
        setCharts(peakData.map((obj) => ({ ...obj, url: 'Fake url' })));
        setPeaks(Object.fromEntries(peakData.map(({ name, peaks }) => [name, peaks])));
      }
      return [];
    } catch (e) {
      console.error(`Error while fetching from Firestore Database: ${e}`);
      return [];
    }
  };

  return (
    <div>
      <TablePreview peaks={peaks} setPeaks={setPeaks}></TablePreview>
    </div>
  );
};

export default TableView;

'use client';

import _ from 'lodash';
import { useEffect, useState, useReducer, useRef, MutableRefObject } from 'react';
import { useRouter } from 'next/navigation';
import useGlobalStore from '@hooks/useGlobalStore';

import { db } from '@firebaseApp/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { DocType, AxesNames, ChartDataPoint } from '@components/data/DataTypes';

import TableDisplay from '@components/data/TableDisplay';
import AxesForm from '@components/data/image/AxesForm';
import ImageProcess from '@components/data/image/ImageProcess';
import ContinueButton from '@components/data/image/ContinueButton';
import SubmitPeaksButton from '@components/data/image/SubmitPeaksButton';
import Steps from '@components/misc/Steps';

type Props = {
  children: React.ReactNode;
  fileId: string;
};

const ImagePreview = (props: Props, ref: MutableRefObject<HTMLDivElement | null>) => {
  function stepReducer(state: { step: number }, action: { type: string }) {
    switch (action.type) {
      case 'increment':
        return { step: state.step + 1 };
      case 'decrement':
        return { step: state.step > 0 ? state.step - 1 : state.step };
    }
    throw Error('Unknown action.');
  }

  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const userObj = user ? JSON.parse(user) : null;
  const router = useRouter();
  const [state, dispatch] = useReducer(stepReducer, { step: 1 });
  const [continueBool, setContinueBool] = useState(false);
  const axesRange = useRef<{ [key in AxesNames]: number } | null>(null);
  const axesFormRef = useRef<HTMLDivElement | null>(null);
  const chartDivRef = useRef<HTMLDivElement | null>(null);
  const [peaks, setPeaks] = useState<ChartDataPoint[]>([]); // peaks in { position, intensity } format
  const [onlyPeaks, setOnlyPeaks] = useState(true);

  const action = useGlobalStore((state) => state.action);
  const setAction = useGlobalStore((state) => state.setAction);
  const userInstruction = useGlobalStore((state) => state.userInstruction);
  const setCharts = useGlobalStore((state) => state.setCharts);
  const setActiveCharts = useGlobalStore((state) => state.setActiveCharts);
  const setUserInstruction = useGlobalStore((state) => state.setUserInstruction);

  useEffect(() => {
    // fetch file from the firebase storage
    const fetchFile = async () => {
      try {
        const docRef = doc(db, 'images', props.fileId as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setActiveCharts([docSnap.data().name]);
        } else {
          setActiveCharts([]);
          console.warn('File not found');
        }
      } catch (e) {
        console.error(e);
      }
    };
    if (props.fileId) {
      if (props.fileId === 'test') {
        setCharts([{ name: 'Example', url: '', userId: '', id: 'test' }]);
        setActiveCharts(['Example']);
        return;
      } else {
        fetchFile();
      }
    }
    fetchData();

    return () => {};
  }, []);

  // fetch available image data from the firestore DB
  const fetchData = async () => {
    try {
      if (userObj) {
        const q = query(collection(db, 'images'), where('userId', '==', userObj?.uid));
        const qSnapshot = await getDocs(q);
        let docs: Array<DocType> = [];
        qSnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id } as DocType);
        });
        setCharts(docs);
      } else {
        setCharts([{ name: 'Example', url: '', userId: '', id: 'test' }]);
        setActiveCharts(['Example']);
        router.push('/data/image?fileId=test');
      }
    } catch (e) {
      console.error(`Error while fetching from Firestore Database: ${e}`);
    }
  };

  // handle select sidebar actions
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // if (state.step !== 3) return;
    if (e.key === 'Escape') {
      setAction('');
    } else {
      if (action === e.key) {
        setAction('');
      } else {
        setAction(e.key);
      }
    }
  };

  // control continue button state
  const continueClickHandler = () => {
    if (state.step === 1) {
      setTimeout(() => {
        axesFormRef.current && axesFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    } else if (state.step === 2) {
      console.log('Axes range: ', axesRange.current);
      setTimeout(() => {
        chartDivRef.current && chartDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
    dispatch({ type: 'increment' });
    // setContinueBool(false);

    // on step 4 (Done) upload peak data to firestore DB and show button to redirect to peaks page
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 outline-none" onKeyDown={handleKeyPress}>
      <div className="xl:col-span-2">
        <div className="alert mb-2 bg-base-200">
          <AiOutlineInfoCircle className="stroke-info shrink-0 w-6 h-6 text-primary" />
          <span>{userInstruction || 'Process image'}</span>
        </div>
        <div className="w-full min-h-0 max-h-screen relative" ref={chartDivRef}>
          {props.children}
          {props.fileId && (
            <ImageProcess
              setContinue={setContinueBool}
              step={state.step}
              peaks={peaks}
              setPeaks={setPeaks}
              onlyPeaks={onlyPeaks}
            />
          )}
        </div>
      </div>
      {state.step === 3 && (
        <div className="mt-4 inline-flex gap-5">
          <div className="text-base-content">Only select peaks</div>
          <input
            name="only-peaks"
            type="checkbox"
            checked={onlyPeaks}
            onChange={() => {
              setOnlyPeaks(onlyPeaks ? false : true);
            }}
            className="checkbox checkbox-primary"
          />
        </div>
      )}
      {props.fileId && (
        <AxesForm
          ref={axesFormRef}
          setContinue={setContinueBool}
          axes={axesRange}
          step={state.step}
          className={state.step === 2 ? '' : 'hidden'}
        />
      )}
      {props.fileId && <TableDisplay peaks={peaks} className={state.step === 3 ? 'hidden xl:block' : 'hidden'} />}
      <div className="xl:col-span-2">
        <div className="flex flex-wrap justify-center items-center mt-6 md:flex-nowrap ">
          <Steps
            className="w-full text-base-content"
            step={state.step}
            steps={['Align axes', 'Adjust range values', 'Select peaks', 'Done 🎉']}
          />
          {state.step < 4 ? (
            <ContinueButton continue={continueBool} continueClickHandler={continueClickHandler} />
          ) : (
            <SubmitPeaksButton data={peaks} />
          )}
          {/* <button
            className="btn btn-primary w-full max-w-[50vw] md:w-fit mt-6 md:mt-0"
            onClick={() => dispatch({ type: 'decrement' })}
          >
            Step -1
          </button> */}
        </div>
      </div>
      {props.fileId && <TableDisplay peaks={peaks} className={state.step === 3 ? 'block xl:hidden' : 'hidden'} />}
    </div>
  );
};

export default ImagePreview;

'use client';

import _ from 'lodash';
import { useEffect, useState, useReducer, useRef, MutableRefObject, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import useGlobalStore from '@hooks/useGlobalStore';

import { db, auth } from '@firebaseApp/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { DocType, PointName } from '@components/data/DataTypes';

import TableDisplay from '@components/data/TableDisplay';
import AxesForm from '@components/data/image/AxesForm';
import ImageProcess from '@components/data/image/ImageProcess';
import Steps from '@components/misc/Steps';

type Props = {
  children: React.ReactNode;
  fileId: string;
};

const ImagePreview = (props: Props, ref: MutableRefObject<HTMLDivElement | null>) => {
  function stepReducer(state: { step: number }, action: { type: string }) {
    if (action.type === 'increment') {
      return {
        step: state.step + 1,
      };
    }
    throw Error('Unknown action.');
  }

  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const userObj = user ? JSON.parse(user) : null;
  const router = useRouter();
  const [state, dispatch] = useReducer(stepReducer, { step: 1 });
  const [continueBool, setContinueBool] = useState(false);
  const [axesRange, setAxesRange] = useState<{ [key: string]: number } | null>(null);
  const axesFormRef = useRef<HTMLDivElement | null>(null);
  const action = useGlobalStore((state) => state.action);
  const setAction = useGlobalStore((state) => state.setAction);
  const userInstruction = useGlobalStore((state) => state.userInstruction);
  const setCharts = useGlobalStore((state) => state.setCharts);
  const setActiveCharts = useGlobalStore((state) => state.setActiveCharts);
  const setUserInstruction = useGlobalStore((state) => state.setUserInstruction);

  useEffect(() => {
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
      } else {
        fetchFile();
      }
    }
    fetchData();

    return () => {};
  }, []);

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
        router.push('/data/image?fileId=test');
      }
    } catch (e) {
      console.error(`Error while fetching from Firestore Database: ${e}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
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

  const continueClickHandler = () => {
    if (state.step === 1) {
      setTimeout(() => {
        axesFormRef.current && axesFormRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    dispatch({ type: 'increment' });
    // setContinueBool(false);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 outline-none" tabIndex={-1} onKeyDown={handleKeyPress}>
      <div className="xl:col-span-2">
        <div className="alert mb-2 bg-base-200">
          <AiOutlineInfoCircle className="stroke-info shrink-0 w-6 h-6 text-primary" />
          <span>{userInstruction || 'Process image'}</span>
        </div>
        <div className="w-full min-h-0 max-h-screen relative">
          {props.children}
          {props.fileId && <ImageProcess setContinue={setContinueBool} step={state.step} />}
        </div>
      </div>
      {props.fileId && (
        <AxesForm
          ref={axesFormRef}
          setContinue={setContinueBool}
          setAxes={setAxesRange}
          className={state.step === 2 ? '' : 'hidden'}
        />
      )}
      {props.fileId && <TableDisplay peaks={[]} className={state.step === 3 ? '' : 'hidden'} />}
      <div className="xl:col-span-2">
        <div className="flex flex-wrap justify-center items-center mt-6 md:flex-nowrap ">
          <Steps
            className="w-full text-black dark:text-white"
            step={state.step}
            steps={['Align axes', 'Adjust range values', 'Select peaks', 'Done 🎉']}
          />
          <button
            className="btn btn-primary w-full max-w-sm md:w-fit mt-6 md:mt-0"
            disabled={!continueBool}
            onClick={continueClickHandler}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;

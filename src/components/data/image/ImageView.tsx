'use client';

import { useEffect, useState } from 'react';
import { db, auth } from '@firebaseApp/config';
import _ from 'lodash';

import { ref, getDownloadURL, getBlob } from 'firebase/storage';
import { storage } from '@firebaseApp/config';
import { doc, getDoc } from 'firebase/firestore';
import TableDisplay from '@components/data/TableDisplay';

type Props = {
  children: React.ReactNode;
  fileId: string;
};

const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === 'Escape') {
    // setAction('');
  } else {
    // setAction(e.key);
  }
};

const ImagePreview = (props: Props) => {
  // TODO: This component should be used to select axes limits and detect peaks
  const [data, setData] = useState();
  const userToken = auth.currentUser?.getIdToken;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'files', props.fileId as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Got'em");
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();

    return () => {};
  });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 outline-none" tabIndex={-1} onKeyDown={handleKeyPress}>
      <div className="xl:col-span-2">
        <div className="alert mb-2 bg-base-200">
          {/* <AiOutlineInfoCircle className="stroke-info shrink-0 w-6 h-6 text-primary" /> */}
          <span>Click & drag to zoom, double-click to zoom out</span>
        </div>
        {props.children}
        {/* <PeakWidthSelector peakWidth={peakWidth} setPeakWidth={setPeakWidth} /> */}
      </div>
      <TableDisplay peaks={[]} />
    </div>
  );
};

export default ImagePreview;

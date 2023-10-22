'use client';

import { useEffect, useState } from 'react';
import { db, auth } from '@firebaseAuth/config';
import _ from 'lodash';

import { ref, getDownloadURL, getBlob } from 'firebase/storage';
import { storage } from '@firebaseAuth/config';
import { doc, getDoc } from 'firebase/firestore';

type Props = {
  children: React.ReactNode;
  fileId: string;
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
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {};
  });

  return (
    <>
      {props.children}
      <div className="overflow-x-auto">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th></th>
              <th>Position [° 2&Theta;]</th>
              <th>Intensity [rel]</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
              <th>1</th>
              <td>15.6</td>
              <td>75</td>
            </tr>
            <tr className="hover">
              <th>2</th>
              <td>18.23</td>
              <td>15.32</td>
            </tr>
            <tr className="hover">
              <th>3</th>
              <td>23.14</td>
              <td>3.28</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ImagePreview;

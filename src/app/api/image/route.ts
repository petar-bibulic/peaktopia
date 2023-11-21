import { db } from '@firebaseApp/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import firebaseAdminApp from '@firebaseApp/configAdmin';
import { getAuth, DecodedIdToken } from 'firebase-admin/auth';
import { App } from 'firebase-admin/app';

import { ChartDataPoint } from '@components/data/DataTypes';
import { randomUUID } from 'crypto';

type RequestBody = {
  authToken: string;
  uid?: string;
  fileId: string;
  fileName: string;
  data: ChartDataPoint[];
};

export async function POST(request: Request) {
  const data: RequestBody = await request.json();
  const { authToken } = data;

  let userToken: DecodedIdToken | null = null;
  try {
    userToken = await getAuth(firebaseAdminApp as App).verifyIdToken(authToken);
  } catch (e) {
    console.error(`User token is not valid: ${e}`);
    return new Response(JSON.stringify({ message: 'Invalid user token' }), {
      status: 401,
    });
  }

  const imageRef = doc(db, 'images', data.fileId);
  const imageSnap = await getDoc(imageRef);
  const fileName = imageSnap.data()?.name;
  const fileId = randomUUID();
  const docRef = doc(db, 'data', fileId);
  setDoc(docRef, {
    data: data.data,
    imageId: data.fileId,
    name: fileName,
    userId: userToken.uid,
  });

  return new Response(JSON.stringify({ message: 'Data saved successfully', fileId: fileId }), { status: 201 });
}

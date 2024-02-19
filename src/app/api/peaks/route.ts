import { randomUUID } from 'crypto';
import { db } from '@firebaseApp/config';
import { doc, setDoc, getDocs, query, collection, where, updateDoc } from 'firebase/firestore';
import firebaseAdminApp from '@firebaseApp/configAdmin';
import { getAuth, DecodedIdToken } from 'firebase-admin/auth';
import { App } from 'firebase-admin/app';
import { ChartDataPoint } from '@components/data/DataTypes';

type PostRequestBody = {
  authToken: string;
  uid?: string;
  data: Array<{ name: string; objectId: string; peaks: Array<ChartDataPoint> }>;
};

type GetRequestBody = {
  authToken: string;
  uid?: string;
  data: Array<{ name: string; objectId: string; peaks: Array<ChartDataPoint> }>;
};

export async function GET(request: Request) {
  // TODO
}

export async function POST(request: Request) {
  const data: PostRequestBody = await request.json();
  const { authToken } = data;

  let userToken: DecodedIdToken | null = null;
  try {
    userToken = await getAuth(firebaseAdminApp as App).verifyIdToken(authToken);
    if (!userToken) {
      return new Response(JSON.stringify({ message: 'Invalid user token' }), {
        status: 401,
      });
    }
  } catch (e) {
    console.error(`Error on token validation: ${e}`);
    return new Response(JSON.stringify({ message: 'Invalid user token' }), {
      status: 401,
    });
  }

  if (data.data.length == 0) {
    return new Response(JSON.stringify({ message: 'Empty peaks list' }), { status: 406 });
  }

  try {
    for (let chart of data.data) {
      const q = query(collection(db, 'peaks'), where('userId', '==', userToken.uid), where('name', '==', chart.name));
      const qSnapshot = await getDocs(q);

      if (!qSnapshot.empty) {
        qSnapshot.forEach((document) => {
          const docRef = doc(db, 'peaks', document.id);
          updateDoc(docRef, {
            peaks: chart.peaks,
          });
        });
      } else {
        const fileId = randomUUID();
        const docRef = doc(db, 'peaks', fileId);
        setDoc(docRef, {
          name: chart.name,
          id: chart.objectId,
          userId: userToken.uid,
          peaks: chart.peaks,
        });
      }
    }
    return new Response(JSON.stringify({ message: 'Data saved successfully' }), { status: 201 });
  } catch (e: any) {
    return new Response(JSON.stringify({ message: `Error uploading data foo: ${e}` }));
  }
}

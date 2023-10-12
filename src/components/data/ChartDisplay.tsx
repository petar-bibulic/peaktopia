import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@firebase/config';
import { getAuth } from 'firebase-admin/auth';
import { App } from 'firebase-admin/app';
import { cookies } from 'next/headers';
import Image from 'next/image';
import firebaseAdminApp from '@firebase/configAdmin';
import { redirect } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@firebase/config';

type Props = {
  fileId?: string;
};

const ChartDisplay = async (props: Props) => {
  try {
    const userCookie = cookies().get('userToken');
    const userToken = await getAuth(firebaseAdminApp as App).verifyIdToken(userCookie?.value as string);
  } catch (err) {
    console.error(err);
    redirect('/auth/login');
  }

  try {
    const docRef = doc(db, 'files', props.fileId as string);
    const docSnap = await getDoc(docRef);
    let item;
    if (docSnap.exists()) {
      const storageRef = ref(storage, docSnap.data().url);
      item = await getDownloadURL(storageRef);
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }

    return item ? (
      <Image src={item} width={500} height={500} alt="Data image" priority></Image>
    ) : (
      <div>File not found</div>
    );
  } catch (err) {
    console.log(err);
    return <div>File not found</div>;
  }
};

export default ChartDisplay;

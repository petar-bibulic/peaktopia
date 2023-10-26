import { ref, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import { db, storage } from '@firebaseApp/config';
import { getAuth } from 'firebase-admin/auth';
import { App } from 'firebase-admin/app';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import firebaseAdminApp from '@firebaseApp/configAdmin';
import ImageProcess from '@components/data/image/ImageProcess';

type Props = {
  fileId?: string;
};

const ImageDisplay = async (props: Props) => {
  let item;
  try {
    const userCookie = cookies().get('userToken');
    const userToken = await getAuth(firebaseAdminApp as App).verifyIdToken(userCookie?.value as string);
  } catch (e) {
    console.error(e);
    redirect('/auth/login');
  }

  try {
    const docRef = doc(db, 'files', props.fileId as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const storageRef = ref(storage, docSnap.data().url);
      item = await getDownloadURL(storageRef);
    } else {
      // docSnap.data() will be undefined in this case
      item = null;
      console.log('No such document!');
    }
  } catch (e) {
    item = null;
    console.error(e);
  }

  return item ? (
    <div className="w-full max-h-screen overflow-hidden relative">
      <Image
        className="w-full h-full object-scale-down brightness-50" // add slider for brigthness or something?
        src={item}
        width={500}
        height={500}
        alt="Data image"
        priority
      />
      <ImageProcess className="absolute top-0" />
    </div>
  ) : (
    <div>
      File not found, try{' '}
      <Link className="link link-primary" href="/">
        uploading it
      </Link>{' '}
      again.
    </div>
  );
};

export default ImageDisplay;

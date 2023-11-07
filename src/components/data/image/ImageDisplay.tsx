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

type Props = {
  fileId?: string;
};

const NoItemComponent = (props: { fileId?: string; className?: string }) => {
  return props.fileId ? (
    <div className={props.className}>
      File not found, try&nbsp;
      <Link className="link link-primary" href="/">
        Uploading it again
      </Link>
      <br /> or select a different file from the sidebar Images menu
    </div>
  ) : (
    <div className={props.className}>
      Select one of the images from the sidebar Images menu
      <br /> or <br />
      <Link className="link link-primary" href="/">
        Upload a new image
      </Link>{' '}
    </div>
  );
};

const ImageDisplay = async (props: Props) => {
  let item;
  let userToken;
  try {
    const userCookie = cookies().get('userToken');
    userToken = await getAuth(firebaseAdminApp as App).verifyIdToken(userCookie?.value as string);
  } catch (e) {
    // console.error(`User token not available: ${e}`);
    props.fileId && props.fileId !== 'test' && redirect(`/auth/login?next=/data/image?fileId=${props.fileId}`);
  }

  try {
    if (props.fileId && props.fileId !== 'test') {
      const docRef = doc(db, 'images', props.fileId as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const storageRef = ref(storage, docSnap.data().url);
        item = await getDownloadURL(storageRef);
      } else {
        // docSnap.data() will be undefined in this case
        item = null;
        console.log('No such document!');
      }
    } else if (!userToken) {
      const storageRef = ref(storage, 'images/XRPDtest.png');
      item = await getDownloadURL(storageRef);
    }
  } catch (e) {
    item = null;
    console.error(e);
  }

  return item ? (
    <Image
      className="object-fill object-left-bottom brightness-90"
      src={item}
      alt="Data image"
      priority={true}
      fill={true}
    />
  ) : (
    <NoItemComponent fileId={props.fileId} className="my-8" />
  );
};

export default ImageDisplay;

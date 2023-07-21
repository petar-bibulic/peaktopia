import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@firebase/config';
import { getAuth } from 'firebase-admin/auth';
import { App } from 'firebase-admin/app';
import { cookies } from 'next/headers';
import Image from 'next/image';
import firebaseAdminApp from '@firebase/configAdmin';
import { redirect } from 'next/navigation';

type Props = {
  slug: string;
};

const GraphDisplay = async (props: Props) => {
  try {
    const userCookie = cookies().get('userToken');
    const userToken = await getAuth(firebaseAdminApp as App).verifyIdToken(userCookie?.value as string);
  } catch (err) {
    redirect('/auth/login');
  }

  try {
    const fileCookie = cookies().get(props.slug);
    const storageRef = ref(storage, fileCookie?.value);
    const item = await getDownloadURL(storageRef);
    return item ? (
      <Image src={item} width={100} height={100} alt="Data image" priority></Image>
    ) : (
      <div>GraphDisplay</div>
    );
  } catch (err) {
    console.log(err);
    return <div>File not found</div>;
  }
};

export default GraphDisplay;

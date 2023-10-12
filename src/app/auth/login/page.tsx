import LoginForm from '@components/auth/LoginForm';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';
import { App } from 'firebase-admin/app';
import firebaseAdminApp from '@firebase/configAdmin';

type Props = {};

const Login = async (props: Props) => {
  const userCookie = cookies().get('userToken');

  if (userCookie?.value) {
    try {
      const userToken = await getAuth(firebaseAdminApp as App).verifyIdToken(userCookie?.value as string);
    } catch (err) {
      console.log(err);
      console.log('User not logged in');
    }
  }

  return (
    <>
      <div className="mb-3 w-1/2 absolute top-40 z-0 opacity-10 md:relative md:top-0 md:opacity-100">
        <Image
          src="/assets/images/login_image.svg"
          width={100}
          height={100}
          className="w-full overflow-hidden"
          alt="Login image"
          priority={true}
        />
      </div>
      <LoginForm />
    </>
  );
};

export default Login;

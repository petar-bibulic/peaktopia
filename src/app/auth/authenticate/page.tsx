import Image from 'next/image';
import { cookies } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';
import { App } from 'firebase-admin/app';
import firebaseAdminApp from '@firebaseAuth/configAdmin';
import AuthenticateWithProvider from '@components/auth/AuthenticateWithProvider';

type Props = {};

const LinkAccounts = async (props: Props) => {
  return (
    <>
      <div className="mb-3 w-1/2 absolute top-40 z-0 opacity-10 md:relative md:top-0 md:opacity-100">
        <Image
          src="/assets/images/authenticate.svg"
          width={100}
          height={100}
          className="w-full overflow-hidden"
          alt="Login image"
          priority={true}
        />
      </div>
      <AuthenticateWithProvider />
    </>
  );
};

export default LinkAccounts;

import Image from 'next/image';
import { AuthProvider } from 'firebase/auth';
import { oauthSignIn } from '@firebase/firebaseAuth';
import useIsMobile from '@hooks/useIsMobile';

type Props = {
  provider: AuthProvider;
};

const GoogleLoginButton = (props: Props) => {
  const isWidthSmall = useIsMobile();

  return (
    <button
      className="btn border-none text-black bg-white hover:bg-stone-100 w-full mb-2 justify-center"
      type="button"
      onClick={() => {
        oauthSignIn(props.provider, isWidthSmall);
      }}
    >
      <Image src="/assets/images/google_logo.png" width={100} height={100} className="w-6 mx-2" alt="Google logo" />
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;

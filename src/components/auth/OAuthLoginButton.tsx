import Image from 'next/image';
import { AuthProvider } from 'firebase/auth';
import { oauthSignIn } from '@firebaseAuth/authUtils';
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import useIsMobile from '@hooks/useIsMobile';

type Props = {
  clickHandler: (widthSmall: boolean) => Promise<{ result: any; error: any }>;
};

const GoogleLoginButton = (props: Props) => {
  const isWidthSmall = useIsMobile();

  return (
    <button
      className="btn border-none text-black bg-white hover:bg-stone-100 w-full mb-2 justify-center"
      type="button"
      onClick={() => {
        props.clickHandler(isWidthSmall);
      }}
    >
      <Image src="/assets/images/google_logo.png" width={100} height={100} className="w-6 mx-2" alt="Google logo" />
      Sign in with Google
    </button>
  );
};

const FacebookLoginButton = (props: Props) => {
  const isWidthSmall = useIsMobile();

  return (
    <button
      className="btn border-none text-white bg-blue-800 hover:bg-blue-900 w-full mb-2 justify-center"
      type="button"
      onClick={() => {
        props.clickHandler(isWidthSmall);
      }}
    >
      <AiFillFacebook className="mx-2 text-2xl" />
      Continue with Facebook
    </button>
  );
};

const GithubLoginButton = (props: Props) => {
  const isWidthSmall = useIsMobile();

  return (
    <button
      className="btn border-none text-white bg-neutral hover:bg-gray-950 w-full"
      type="button"
      onClick={() => {
        props.clickHandler(isWidthSmall);
      }}
    >
      <AiFillGithub className="mx-2 text-2xl" />
      Continue with Github
    </button>
  );
};

export { GoogleLoginButton, FacebookLoginButton, GithubLoginButton };

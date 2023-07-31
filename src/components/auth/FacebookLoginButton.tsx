import { AuthProvider } from 'firebase/auth';
import { oauthSignIn } from '@firebase/firebaseAuth';
import { AiFillFacebook } from 'react-icons/ai';
import useIsMobile from '@hooks/useIsMobile';

type Props = {
  provider: AuthProvider;
};

const FacebookLoginButton = (props: Props) => {
  const width = useIsMobile();

  return (
    <button
      className="btn border-none text-white bg-blue-800 hover:bg-blue-900 w-full mb-2 justify-center"
      type="button"
      onClick={(event) => {
        let result = oauthSignIn(props.provider, width);
      }}
    >
      <AiFillFacebook className="mx-2 text-2xl" />
      Continue with Facebook
    </button>
  );
};

export default FacebookLoginButton;

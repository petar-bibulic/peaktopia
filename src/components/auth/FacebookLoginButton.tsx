import { AuthProvider } from 'firebase/auth';
import { oauthSignIn } from '@firebase/firebaseAuth';
import { AiFillFacebook } from 'react-icons/ai';

type Props = {
  provider: AuthProvider;
};

const FacebookLoginButton = (props: Props) => {
  return (
    <button
      className="btn border-none text-white bg-blue-800 hover:bg-blue-900 w-full mb-2 justify-center"
      type="button"
      onClick={(event) => {
        let result = oauthSignIn(props.provider);
      }}
    >
      <AiFillFacebook className="mx-2 text-2xl" />
      Continue with Facebook
    </button>
  );
};

export default FacebookLoginButton;

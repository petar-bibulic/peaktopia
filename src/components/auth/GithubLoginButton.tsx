import { AuthProvider } from 'firebase/auth';
import { oauthSignIn } from '@firebase/firebaseAuth';
import { AiFillGithub } from 'react-icons/ai';

type Props = {
  provider: AuthProvider;
};

const GithubLoginButton = (props: Props) => {
  return (
    <button
      className="btn border-none text-white bg-gray-900 hover:bg-gray-950 w-full"
      type="button"
      onClick={(event) => {
        let result = oauthSignIn(props.provider);
      }}
    >
      <AiFillGithub className="mx-2 text-2xl" />
      Continue with Github
    </button>
  );
};

export default GithubLoginButton;

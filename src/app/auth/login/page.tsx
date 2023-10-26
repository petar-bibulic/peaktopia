import LoginForm from '@components/auth/LoginForm';
import Image from 'next/image';

type Props = {};

const Login = async (props: Props) => {
  return (
    <>
      <div className="mb-3 w-1/2 absolute top-40 z-0 opacity-10 md:relative md:top-0 md:opacity-100">
        <Image
          src="/assets/images/login.svg"
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

import LoginForm from '@components/LoginForm';
import Image from 'next/image';

type Props = {};

const Login = (props: Props) => {
  return (
    <>
      <div className="mb-3 sm:w-1/2 lg:w-6/12 flex items-center">
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

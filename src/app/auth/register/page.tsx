import LoginForm from '@components/LoginForm';
import Image from 'next/image';

type Props = {};

const Register = (props: Props) => {
  return (
    <>
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
        <Image
          src="/assets/images/login_image.svg"
          width={200}
          height={200}
          className="w-full mr-40"
          alt="Login image"
          priority={true}
        />
      </div>
      <LoginForm />
    </>
  );
};

export default Register;

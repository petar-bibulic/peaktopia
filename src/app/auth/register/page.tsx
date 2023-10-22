import RegisterForm from '@components/auth/RegisterForm';
import Image from 'next/image';

type Props = {};

const Register = (props: Props) => {
  return (
    <>
      <div className="mb-3 w-1/2 absolute top-40 z-0 opacity-10 md:relative md:top-0 md:opacity-100">
        <Image
          src="/assets/images/register.svg"
          width={100}
          height={100}
          className="w-full overflow-hidden"
          alt="Register image"
          priority={true}
        />
      </div>
      <RegisterForm />
    </>
  );
};

export default Register;

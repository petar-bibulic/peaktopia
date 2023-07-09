import RegisterForm from '@components/auth/RegisterForm';
import Image from 'next/image';

type Props = {};

const Register = (props: Props) => {
  return (
    <>
      <div className="mb-3 sm:w-1/2 lg:w-6/12 flex items-center">
        <Image
          src="/assets/images/register_image.svg"
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

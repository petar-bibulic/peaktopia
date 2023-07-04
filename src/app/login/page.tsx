import LoginForm from '@components/LoginForm';
import Image from 'next/image';

type Props = {};

const login = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="h-screen">
        <div className="container h-full px-6 py-24">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default login;

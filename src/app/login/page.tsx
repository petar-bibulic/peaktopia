import LoginForm from '@components/LoginForm';

type Props = {};

const login = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div
        className={`relative flex place-items-center before:-translate-x-1/2
      after:translate-x-1/3 before:lg:h-[360px]`}
      >
        <h1 className="text-3xl  font-bold">Welcome to Login page</h1>
      </div>
      <LoginForm />
    </main>
  );
};

export default login;

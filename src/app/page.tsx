import Image from 'next/image'
import LoginForm from '@components/Form'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <p className={`fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static 2xl:w-auto lg:p-4`}>
          Get started by logging in <br/>
          or just upload your graphs and start selecting peaks 🚩
        </p>
      </div>

      <div className={`relative flex place-items-center before:-translate-x-1/2
        after:translate-x-1/3 before:lg:h-[360px]`}>
        <h1 className="text-3xl  font-bold">Welcome to Peaktopia</h1>
      </div>

      <LoginForm />
    </main>
  )
}

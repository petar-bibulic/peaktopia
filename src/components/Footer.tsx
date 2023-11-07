import { AiFillFacebook, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import Link from 'next/link';

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="grid p-10 footer-center py-4 bg-base-100 text-base-content rounded w-full">
      <div className="bg-base-content/10 mx-1 my-4 h-px w-full"></div>
      <div className="grid grid-flow-col gap-4 mb-4">
        <Link href="" className="link link-hover hover:text-primary">
          About us
        </Link>
        <Link href="" className="link link-hover hover:text-primary">
          Contact
        </Link>
      </div>
      <div className="grid grid-flow-col gap-4 mb-4">
        <Link href="" target="_blank">
          <AiFillFacebook className="text-2xl hover:text-primary" />
        </Link>
        <Link href="https://github.com/petar-bibulic/peaktopia" target="_blank">
          <AiFillGithub className="text-2xl hover:text-primary" />
        </Link>
        <Link href="https://www.linkedin.com/in/petar-bibulic/" target="_blank">
          <AiFillLinkedin className="text-2xl hover:text-primary" />
        </Link>
      </div>
      <div className="grid grid-flow-col gap-4 mb-4">
        <Link href="https://storyset.com/user" className="hover:text-primary" target="_blank">
          Illustrations by Storyset
        </Link>
      </div>
      {/* <div>
        <p>Copyright © 2023 - All right reserved by Peaktopia</p>
      </div> */}
    </footer>
  );
};

export default Footer;

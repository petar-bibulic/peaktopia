import { AiFillFacebook, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import Link from 'next/link';

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="grid p-10 footer-center py-4 bg-base-200 text-base-content rounded">
      <div className="grid grid-flow-col gap-4 mb-4">
        <Link href="" className="link link-hover hover:text-primary">
          About us
        </Link>
        <Link href="" className="link link-hover hover:text-primary">
          Contact
        </Link>
      </div>
      <div className="grid grid-flow-col gap-4 mb-4">
        <Link href="">
          <AiFillFacebook className="text-2xl hover:text-primary" />
        </Link>
        <Link href="">
          <AiFillGithub className="text-2xl hover:text-primary" />
        </Link>
        <Link href="">
          <AiFillLinkedin className="text-2xl hover:text-primary" />
        </Link>
      </div>
      <div className="grid grid-flow-col gap-4 mb-4">
        <Link href="https://storyset.com/business" className="hover:text-primary">
          Business illustrations by Storyset
        </Link>
      </div>
      {/* <div>
        <p>Copyright © 2023 - All right reserved by Peaktopia</p>
      </div> */}
    </footer>
  );
};

export default Footer;

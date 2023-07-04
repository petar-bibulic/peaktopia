import React from 'react';
import { AiFillFacebook, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="footer p-10 footer-center py-4 bg-base-200 text-base-content rounded">
      <div className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a>
            <AiFillFacebook className="text-2xl" />
          </a>
          <a>
            <AiFillGithub className="text-2xl" />
          </a>
          <a>
            <AiFillLinkedin className="text-2xl" />
          </a>
        </div>
      </div>
      {/* <div>
        <p>Copyright © 2023 - All right reserved by Peaktopia</p>
      </div> */}
    </footer>
  );
};

export default Footer;

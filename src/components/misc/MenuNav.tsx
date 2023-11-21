import Link from 'next/link';

import { NAV_LINKS } from '@utils/constants';

type Props = {};

const MenuNav = (props: Props) => {
  return (
    <ul className="menu menu-md px-4 py-0 mt-4 text-base-content">
      <li></li>
      <li>
        {NAV_LINKS.map((item, index) => (
          <Link href={item.url} key={index}>
            <span>{item.image}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </li>
    </ul>
  );
};

export default MenuNav;

import MenuNav from '@components/misc/MenuNav';
import SidebarTop from '@components/misc/SidebarTop';

type Props = { children: React.ReactNode };

const MinimalSidebar = (props: Props) => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{props.children}</div>
      <div className="drawer-side z-50 scroll-smooth scroll-p-2 fixed">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <aside className="bg-base-100 w-80 h-screen sticky border-r-2 border-base-content/10">
          <SidebarTop />
          <MenuNav />
        </aside>
      </div>
    </div>
  );
};

export default MinimalSidebar;

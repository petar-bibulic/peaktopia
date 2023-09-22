import GraphDisplay from '@components/data/GraphDisplay';
import XRDPreview from '@components/data/XRDPreview';

type Params = { userId: string };
type SearchParams = { fileId: string };

const Data = ({ params, searchParams }: { params: Params; searchParams: SearchParams }) => {
  const Graph = GraphDisplay as any;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center">
          {/* Page content */}
          <section className="w-full px-6 pb-20 pt-4">
            <XRDPreview />
          </section>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-100 text-base-content">
            {/* Sidebar content */}
            <li>
              <a>Select peaks</a>
            </li>
            <li>
              <a>Annotate peaks</a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Data;

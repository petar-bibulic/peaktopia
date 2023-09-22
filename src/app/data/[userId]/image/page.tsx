import ImagePreview from '@components/data/ImagePreview';
import GraphDisplay from '@components/data/GraphDisplay';

type Params = { userId: string };
type SearchParams = { fileId: string };

const Data = ({ params, searchParams }: { params: Params; searchParams: SearchParams }) => {
  const Graph = GraphDisplay as any;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content */}
          <section className="h-screen">
            <div className="container h-full px-6 py-20">
              <div className="g-6 flex h-full flex-wrap justify-center lg:justify-between">
                <div className="grid grid-cols-2 gap-4">
                  <ImagePreview fileId={searchParams?.fileId}>
                    <Graph userId={params.userId} fileId={searchParams?.fileId} />
                  </ImagePreview>
                </div>
              </div>
            </div>
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

import GraphDisplay from '@components/GraphDisplay';

const Data = ({ params }: { params: { slug: string } }) => {
  const Graph = GraphDisplay as any;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content */}
          <section className="h-screen">
            <div className="container h-full px-6 py-10">
              <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                <Graph slug={params.slug} />
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
            {/* do I even need this now? */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Data;

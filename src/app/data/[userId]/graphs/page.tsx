import GraphDisplay from '@components/data/GraphDisplay';
import XRDPreview from '@components/data/XRDPreview';

type Params = { userId: string };
type SearchParams = { fileId: string };

const Data = ({ params, searchParams }: { params: Params; searchParams: SearchParams }) => {
  const Graph = GraphDisplay as any;

  return (
    <section className="w-full px-6 pb-20 pt-4">
      <XRDPreview />
    </section>
  );
};

export default Data;

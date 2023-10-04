import ImagePreview from '@components/data/ImagePreview';
import GraphDisplay from '@components/data/GraphDisplay';

type Params = { userId: string };
type SearchParams = { fileId: string };

const Data = ({ params, searchParams }: { params: Params; searchParams: SearchParams }) => {
  const Graph = GraphDisplay as any;

  return (
    <section className="w-full px-6 pb-20 pt-4">
      <ImagePreview fileId={searchParams?.fileId}>
        <Graph userId={params.userId} fileId={searchParams?.fileId} />
      </ImagePreview>
    </section>
  );
};

export default Data;

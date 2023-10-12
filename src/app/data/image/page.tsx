import ImagePreview from '@components/data/ImagePreview';
import ChartDisplay from '@components/data/ChartDisplay';

type SearchParams = { fileId: string };

const Data = ({ searchParams }: { searchParams: SearchParams }) => {
  const Graph = ChartDisplay as any;

  return (
    <section className="w-full px-6 pb-20 pt-4">
      <ImagePreview fileId={searchParams?.fileId}>
        <Graph fileId={searchParams?.fileId} />
      </ImagePreview>
    </section>
  );
};

export default Data;

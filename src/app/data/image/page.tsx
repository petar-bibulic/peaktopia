import ImageView from '@components/data/image/ImageView';
import ImageDisplay from '@components/data/image/ImageDisplay';

type SearchParams = { fileId: string };

const Data = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <section className="w-full min-h-screen px-6 pb-20 pt-4">
      <ImageView fileId={searchParams?.fileId}>
        <ImageDisplay fileId={searchParams?.fileId} />
      </ImageView>
    </section>
  );
};

export default Data;

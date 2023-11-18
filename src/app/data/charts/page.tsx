import XRDView from '@components/data/chart/XRDView';

type SearchParams = { fileId: string };

const Data = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <section className="w-full px-6 pb-20 pt-4">
      <XRDView fileId={searchParams?.fileId} />
    </section>
  );
};

export default Data;

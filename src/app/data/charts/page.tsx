import XRDPreview from '@components/data/XRDPreview';

type Params = { userId: string };
type SearchParams = { fileId: string };

const Data = ({ params, searchParams }: { params: Params; searchParams: SearchParams }) => {
  return (
    <section className="w-full px-6 pb-20 pt-4">
      <XRDPreview fileId={searchParams?.fileId} />
    </section>
  );
};

export default Data;

type SearchParams = { fileId: string };

const Data = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <section className="w-full min-h-screen px-6 pb-20 pt-4">
      <div className="text-base-content">Hello tables</div>
    </section>
  );
};

export default Data;

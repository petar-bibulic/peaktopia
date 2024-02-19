'use client';

import TableView from '@components/data/table/TableView';

type SearchParams = { fileId: string };

const Data = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <section className="w-full min-h-screen px-6 pb-20 pt-4">
      <TableView />
    </section>
  );
};

export default Data;

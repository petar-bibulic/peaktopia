import { HiOutlineCursorClick } from 'react-icons/hi';
import useGlobalStore from '@hooks/useGlobalStore';
import { useEffect, useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
import _ from 'lodash';
import { toast, Theme } from 'react-toastify';
import { or } from 'firebase/firestore';

type Props = {};

const TableMenuActions = (props: Props) => {
  const [originalData, setOriginalData] = useState({});
  const data = useGlobalStore((state) => state.data);
  const setData = useGlobalStore((state) => state.setData);
  const activeCharts = useGlobalStore((state) => state.activeCharts);
  const theme = useGlobalStore((state) => state.theme);

  useEffect(() => {
    if (Object.entries(originalData).length) return;
    setOriginalData(data);

    return () => {};
  }, [data]);

  const activeData = useMemo(() => {
    const active = Object.fromEntries(Object.entries(data).filter(([key, value]) => activeCharts.includes(key)));
    return _.sortBy(
      _.flatMap(active, (values, key) => {
        return values.map(({ position, intensity }) => ({ position, [key]: intensity }));
      }),
      'position'
    );
  }, [data, activeCharts]);

  return (
    <ul className="menu menu-sm lg:menu-md px-4 py-0 text-base-content">
      {/* Sidebar content */}
      <li></li>
      <li className="menu-title flex flex-row gap-4 mt-4">
        <span className="text-base-content">
          <HiOutlineCursorClick className="text-2xl text-accent" />
        </span>
        <span>Actions</span>
      </li>
      <li>
        <div
          className="flex ml-1"
          onClick={() => {
            if (!activeCharts.length) {
              toast.error('Select charts for export before proceeding', { theme: theme as Theme });
              return;
            }
            navigator.clipboard.writeText(JSON.stringify(activeData));
            toast.success('Data copied successfully', { theme: theme as Theme });
          }}
        >
          Copy to clipboard
        </div>
        {activeCharts.length > 0 ? (
          <CSVLink data={activeData} separator={','} filename="my_data.csv" className="flex ml-1">
            Download CSV
          </CSVLink>
        ) : (
          <div
            className="flex ml-1"
            onClick={() => toast.error('Select charts for export before proceeding', { theme: theme as Theme })}
          >
            Download CSV
          </div>
        )}
        <div
          className="flex ml-1"
          onClick={() => {
            setData(originalData);
            toast.info('Data refreshed from the database', { theme: theme as Theme });
          }}
        >
          Refresh data
        </div>
      </li>
      <li></li>
    </ul>
  );
};

export default TableMenuActions;

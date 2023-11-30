import { ChartDataset } from '@components/data/DataTypes';
import useGlobalStore from '@hooks/useGlobalStore';
import { useEffect, useMemo, memo } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';

type Props = {
  peaks: ChartDataset;
  className?: string;
};

const TableDisplay = memo(function TableDisplay(props: Props) {
  const { peaks, className } = props;
  const activeImages = useGlobalStore((state) => state.activeImages); // active images for display
  const activeCharts = useGlobalStore((state) => state.activeCharts); // active charts for display
  const sortedPeaks: ChartDataset = { ...peaks };
  const allDatasets = useMemo(() => {
    return [...activeCharts, ...activeImages];
  }, [activeCharts, activeImages]);
  const positions = useMemo(() => {
    let allPositions: number[] = [];
    for (let key in sortedPeaks) {
      sortedPeaks[key].sort((a, b) => a.position - b.position);
      allPositions = [...allPositions, ...sortedPeaks[key].map((item) => item.position)];
    }
    allPositions = allPositions.filter((value, index, array) => array.indexOf(value) === index);

    return allPositions.sort((a, b) => a - b);
  }, [sortedPeaks]);
  const activeDatasets = useGlobalStore((state) => state.activeDatasets);
  const setActiveDatasets = useGlobalStore((state) => state.setActiveDatasets);
  const action = useGlobalStore((state) => state.action);
  const activeAction = () => {
    switch (action) {
      case 'S':
        return 'Select peaks';
      case 'D':
        return 'Deselect peaks';
      case 'A':
        return 'Annotate peaks';
      default:
        return 'No active action';
    }
  };

  useEffect(() => {
    setActiveDatasets([...activeCharts, ...activeImages]);
  }, [activeCharts, activeImages]);

  const selectDataset = (item: string) => {
    activeDatasets.includes(item)
      ? setActiveDatasets(activeDatasets.filter((value) => value !== item))
      : setActiveDatasets([...activeDatasets, item]);
  };

  return (
    <div className={`${className}`}>
      <div className="inline-flex items-center gap-2">
        <p className="text-base-content text-lg font-semibold">Intensities [rel]</p>
        <div
          className="text-left tooltip tooltip-bottom before:z-50 before:content-[attr(data-tip)]"
          data-tip={`Check each table column to select charts for current action: ${activeAction()}`}
        >
          <AiFillInfoCircle className="text-primary hover:text-sky-500 text-lg" />
        </div>
      </div>
      <div className="overflow-auto min-h-[10vh] max-h-[70vh]">
        <table className="table table-pin-rows text-base-content">
          <thead>
            <tr>
              <th></th>
              <th>Position [° 2&Theta;]</th>
              {allDatasets.map((item, index) => (
                <th key={index}>
                  <div className="inline-flex items-center gap-x-2">
                    {item}
                    <input
                      type="checkbox"
                      checked={activeDatasets.includes(item)}
                      onChange={() => selectDataset(item)}
                      className="checkbox checkbox-xs checkbox-primary"
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {positions.map((position, index) => (
              <tr className="hover" key={`rowIndex-${index}`}>
                <th>{index + 1}</th>
                <td>{position.toFixed(4)}</td>
                {Object.keys(sortedPeaks).map((key, i) => {
                  const peakIndex = sortedPeaks[key].map((item) => item.position).indexOf(position);
                  if (peakIndex >= 0) {
                    return (
                      <td key={`columnIndex-${index}-${i}`}>{sortedPeaks[key][peakIndex].intensity.toFixed(0)}</td>
                    );
                  } else {
                    return <td key={`columnIndex-${index}-${i}`}></td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default TableDisplay;

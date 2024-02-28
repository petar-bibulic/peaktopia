'use client';

import { ChartDataset } from '@components/data/DataTypes';
import useGlobalStore from '@hooks/useGlobalStore';
import { useEffect, useMemo, memo } from 'react';
import { BiTrash } from 'react-icons/bi';

type Props = {
  peaks: ChartDataset;
  setPeaks: (value: ChartDataset) => void;
  className?: string;
};

const TablePreview = memo(function TableDisplay(props: Props) {
  const { peaks, setPeaks, className } = props;
  const activeCharts = useGlobalStore((state) => state.activeCharts);
  const activeDatasets = useGlobalStore((state) => state.activeDatasets);
  const setActiveDatasets = useGlobalStore((state) => state.setActiveDatasets);

  const allPositions = useMemo(() => {
    let positions: number[] = [];
    if (Object.entries(peaks).length) {
      for (let key of activeCharts) {
        peaks[key].sort((a, b) => a.position - b.position);
        positions = [...positions, ...peaks[key].map((item) => item.position)];
      }
    }
    positions = positions.filter((value, index, array) => array.indexOf(value) === index);

    return positions.sort((a, b) => a - b);
  }, [peaks, activeCharts]);

  useEffect(() => {
    setActiveDatasets(activeCharts);

    return () => {};
  }, [activeCharts]);

  const selectDataset = (item: string) => {
    activeDatasets.includes(item)
      ? setActiveDatasets(activeDatasets.filter((value) => value !== item))
      : setActiveDatasets([...activeDatasets, item]);
  };

  const deleteDataset = (index: number) => {
    setPeaks && setPeaks({ ...peaks, ...Object.fromEntries([[activeCharts[index], []]]) });
  };

  const deletePeak = (index: number) => {
    const position = allPositions[index];
    const newPeaks = Object.keys(peaks).map((dataset) =>
      activeDatasets.includes(dataset)
        ? [dataset, peaks[dataset].filter((item) => item.position !== position)]
        : [dataset, peaks[dataset]]
    );
    setPeaks && setPeaks(Object.fromEntries(newPeaks));
  };

  return (
    <div className={`${className}`}>
      <div className="inline-flex items-center gap-2">
        <p className="text-base-content text-lg font-semibold">Intensities [rel]</p>
      </div>
      <div className="overflow-auto min-h-[10vh]">
        <table className="table table-pin-rows text-base-content">
          <thead>
            <tr>
              <th></th>
              <th>Position [° 2&Theta;]</th>
              {Object.keys(peaks).map((item, index) => {
                if (activeCharts.includes(item)) {
                  return (
                    <th key={index} className="group">
                      <div className="inline-flex items-center gap-2">
                        <label className="label cursor-pointer">
                          <span className="mr-2">{item}</span>
                          <input
                            type="checkbox"
                            checked={activeDatasets.includes(item)}
                            onChange={() => selectDataset(item)}
                            className="checkbox checkbox-xs checkbox-primary"
                          />
                        </label>
                        <button
                          className="btn btn-ghost btn-sm invisible group-hover:visible hover:bg-transparent px-1 text-warning hover:text-error"
                          onClick={() => deleteDataset(index)}
                        >
                          <BiTrash className="text-lg" />
                        </button>
                      </div>
                    </th>
                  );
                }
              })}
              <th className="w-1"></th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((position, i) => (
              <tr className="hover group" key={`rowIndex-${i}`}>
                <th>{i + 1}</th>
                <td>{position.toFixed(4)}</td>
                {Object.keys(peaks).map((key, j) => {
                  if (activeCharts.includes(key)) {
                    const peakForChart = peaks[key].find((item) => item.position === position);
                    if (peakForChart) {
                      return <td key={`columnIndex-${i}-${j}`}>{peakForChart.intensity.toFixed(0)}</td>;
                    } else {
                      return <td key={`columnIndex-${i}-${j}`}></td>;
                    }
                  }
                })}
                <td className="w-1">
                  <button
                    className="btn btn-ghost btn-sm invisible group-hover:visible hover:bg-transparent px-1 text-warning hover:text-error"
                    onClick={() => deletePeak(i)}
                  >
                    <BiTrash className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default TablePreview;

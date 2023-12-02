import { ChartDataset } from '@components/data/DataTypes';
import useGlobalStore from '@hooks/useGlobalStore';
import { useEffect, useMemo, memo } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';

type Props = {
  peaks: ChartDataset;
  setPeaks: (value: ChartDataset) => void;
  className?: string;
};

const TableDisplay = memo(function TableDisplay(props: Props) {
  const { peaks, setPeaks, className } = props;
  const activeImages = useGlobalStore((state) => state.activeImages); // active images for display
  const activeCharts = useGlobalStore((state) => state.activeCharts); // active charts for display

  const allDatasets = useMemo(() => {
    return [...activeCharts, ...activeImages];
  }, [activeCharts, activeImages]);

  const allPositions = useMemo(() => {
    let positions: number[] = [];
    for (let key in peaks) {
      peaks[key].sort((a, b) => a.position - b.position);
      positions = [...positions, ...peaks[key].map((item) => item.position)];
    }
    positions = positions.filter((value, index, array) => array.indexOf(value) === index);

    return positions.sort((a, b) => a - b);
  }, [peaks]);

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

  const deleteDataset = (index: number) => {
    const datasetName = allDatasets[index];
    setPeaks({ ...peaks, ...Object.fromEntries([[datasetName, []]]) });
  };

  const deletePeak = (index: number) => {
    const position = allPositions[index];
    const newPeaks = Object.keys(peaks).map((dataset) => [
      dataset,
      peaks[dataset].filter((item) => item.position !== position),
    ]);

    setPeaks(Object.fromEntries(newPeaks));
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
              {Object.keys(peaks).map((item, index) => {
                if (allDatasets.includes(item)) {
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
                  if (allDatasets.includes(key)) {
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

export default TableDisplay;

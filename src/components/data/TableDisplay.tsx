import { ChartDataPoint } from '@components/data/DataTypes';

type Props = {
  peaks: Array<ChartDataPoint>;
  className?: string;
};

const TableDisplay = (props: Props) => {
  const { peaks, className } = props;
  const sortedPeaks = [...peaks].sort((a, b) => a.position - b.position);

  return (
    <div className={`overflow-x-auto max-h-[70vh] ${className}`}>
      <table className="table table-pin-rows text-base-content">
        <thead>
          <tr>
            <th></th>
            <th>Position [° 2&Theta;]</th>
            <th>Intensity [rel]</th>
          </tr>
        </thead>
        <tbody>
          {sortedPeaks.map((item, index) => (
            <tr className="hover" key={`peakTable-${index}`}>
              <th>{index + 1}</th>
              <td>{item.position.toFixed(4)}</td>
              <td>{item.intensity.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDisplay;

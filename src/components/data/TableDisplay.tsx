import { ChartDataPoint } from './DataTypes';

type Props = {
  peaks: Array<ChartDataPoint>;
};

const TableDisplay = (props: Props) => {
  const { peaks } = props;
  const sortedPeaks = [...peaks].sort((a, b) => a.position - b.position);

  return (
    <div className="overflow-x-auto h-96">
      <table className="table table-pin-rows">
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
              <td>{item.intensity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDisplay;

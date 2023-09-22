import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts';
import { GraphStateFormat, Peak } from './DataTypes';
import { useMemo } from 'react';

type Props = {
  state: GraphStateFormat;
  peaks: Array<Peak>;
  peakWidth: number;
  setState: any;
  zoom: any;
  handleClick: any;
};

const calcPeakColors = (peaks: Peak[], width: number): Array<string> => {
  return peaks.map((item, index, list) => {
    return item.position - list[index - 1]?.position < 2 * width ||
      list[index + 1]?.position - item.position < 2 * width
      ? 'yellow'
      : 'green';
  });
};

const CustomTooltip = ({ active, payload, label }: { active: any; payload: any; label: number }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`2Θ: ${label.toFixed(4)} °`}</p>
        <p className="intro">{`Intensity: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const XRDGraph = (props: Props) => {
  const { state, peaks, peakWidth, setState, zoom, handleClick } = props;
  const sortedPeaks = useMemo(() => {
    return [...peaks].sort((a, b) => a.position - b.position);
  }, [peaks]);
  const peakColors = useMemo(() => calcPeakColors(sortedPeaks, peakWidth), [peaks, peakWidth]);

  return (
    <ResponsiveContainer aspect={1.7} width="100%" className="bg-neutral-focus select-none">
      <LineChart
        data={state.data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
        onMouseDown={(e) => {
          e &&
            setState((prevState: GraphStateFormat) => ({
              ...prevState,
              positionLeft: String(e.activeLabel),
              indexLeft: Number(e.activeTooltipIndex),
            }));
        }}
        onMouseMove={(e) => {
          if (state.positionLeft && state.positionLeft !== 'undefined') {
            e &&
              setState((prevState: GraphStateFormat) => ({
                ...prevState,
                positionRight: String(e.activeLabel),
                indexRight: Number(e.activeTooltipIndex),
              }));
          }
        }}
        onMouseUp={zoom}
        onClick={(e) => handleClick(e)}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="position"
          type="number"
          allowDataOverflow={true}
          domain={[Number(state.left), Number(state.right)]}
          ticks={state.ticks}
        />
        <YAxis allowDataOverflow={true} domain={[Number(state.bottom), Number(state.top)]} />
        <Tooltip position={{ x: 80, y: 20 }} content={<CustomTooltip />} />
        <Legend />
        <Line
          dataKey="intensity"
          stroke="#3abff8"
          isAnimationActive={false}
          strokeWidth={3}
          dot={false}
          activeDot={{ stroke: 'red', r: 8 }}
        />
        {state.positionLeft && state.positionRight ? (
          <ReferenceArea x1={state.positionLeft} x2={state.positionRight} strokeOpacity={1} />
        ) : null}
        {sortedPeaks.map((item, index) => (
          <>
            <ReferenceArea
              x1={item.position - 0.01}
              x2={item.position + 0.01}
              strokeOpacity={1}
              fill={peakColors[index]}
              fillOpacity={0.8}
              ifOverflow="visible"
              key={`peak-${index}`}
              id={`peak-${index}`}
            />
            <ReferenceArea
              x1={item.position - peakWidth}
              x2={item.position + peakWidth}
              strokeOpacity={1}
              fill={peakColors[index]}
              fillOpacity={0.4}
              ifOverflow="visible"
              key={`peakArea-${index}`}
              id={`peakArea-${index}`}
            />
          </>
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default XRDGraph;

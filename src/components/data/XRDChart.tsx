'use client';

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
  TooltipProps,
  Brush,
} from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { ChartDataType, ChartStateType, PointType } from '@components/data/DataTypes';
import React, { useMemo, Dispatch, SetStateAction, Fragment } from 'react';
import { divide } from 'lodash';

type Props = {
  data: Array<ChartDataType>;
  chartState: ChartStateType;
  peaks: Array<PointType>;
  peakWidth: number;
  setState: Dispatch<SetStateAction<ChartStateType>>;
  zoom: () => void;
  handleClick: (event: CategoricalChartState) => void;
};

const chartColorList = ['#38bdf8', '#818CF8', '#F471B5', '#1E293B', '#1E293B', '#2DD4BF', '#F4BF50', '#FB7085'];

const getPeakColor = (peaks: PointType[], width: number): Array<string> => {
  return peaks.map((item, index, list) => {
    return item.position - list[index - 1]?.position < 2 * width ||
      list[index + 1]?.position - item.position < 2 * width
      ? 'yellow'
      : 'green';
  });
};

const getChartColor = (index: number) => {
  return chartColorList[index % chartColorList.length];
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`2Θ: ${label?.toFixed(4)} °`}</p>
        <p className="intro">{`Intensity: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const XRDChart = (props: Props) => {
  const { data, chartState, peaks, peakWidth, setState, zoom, handleClick } = props;
  const sortedPeaks = useMemo(() => {
    return [...peaks].sort((a, b) => a.position - b.position);
  }, [peaks]);
  const peakColors = useMemo(() => getPeakColor(sortedPeaks, peakWidth), [sortedPeaks, peakWidth]);
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  return (
    <ResponsiveContainer aspect={1.7} width="100%" className="bg-slate-800 rounded-md select-none">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
        onMouseDown={(e) => {
          e &&
            setState((prevState: ChartStateType) => ({
              ...prevState,
              zoomLeft: Number(e.activeLabel),
            }));
        }}
        onMouseMove={(e) => {
          if (chartState.zoomLeft) {
            e &&
              setState((prevState: ChartStateType) => ({
                ...prevState,
                zoomRight: Number(e.activeLabel),
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
          domain={[chartState.left, chartState.right]}
          // ticks={chartState.ticks}
          interval="equidistantPreserveStart"
          tickCount={20}
          name="2Theta"
        />
        <YAxis allowDataOverflow={true} domain={[chartState.bottom, chartState.top]} />
        <Tooltip position={{ x: 80, y: 20 }} content={<CustomTooltip />} />
        <Legend />
        {data.map((line, index) => (
          <Line
            dataKey="intensity"
            data={line?.data}
            name={line?.name}
            key={line?.name}
            stroke={getChartColor(index)}
            isAnimationActive={false}
            strokeWidth={3}
            dot={false}
            activeDot={{ stroke: 'orange' }}
          />
        ))}
        {/* <Brush dataKey="position" data={data[0]?.data} /> */}
        {chartState.zoomLeft && chartState.zoomRight ? (
          <ReferenceArea x1={chartState.zoomLeft} x2={chartState.zoomRight} strokeOpacity={1} />
        ) : null}
        {sortedPeaks.map((item, index) => (
          <Fragment key={`fragment-${index}`}>
            <ReferenceArea
              x1={item.position - 0.01}
              x2={item.position + 0.01}
              strokeOpacity={1}
              fill={peakColors[index]}
              fillOpacity={0.8}
              ifOverflow="visible"
              id={`peak-${index}`}
              key={Math.random()}
            />
            ,
            <ReferenceArea
              x1={item.position - peakWidth}
              x2={item.position + peakWidth}
              strokeOpacity={1}
              fill={peakColors[index]}
              fillOpacity={0.4}
              ifOverflow="visible"
              id={`peakArea-${index}`}
              key={Math.random()}
            />
          </Fragment>
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default XRDChart;

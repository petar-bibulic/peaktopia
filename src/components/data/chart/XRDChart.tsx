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
import { ChartDataType, ChartStateType, ChartDataset, ChartDataPoint } from '@components/data/DataTypes';
import React, { useMemo, Dispatch, SetStateAction, Fragment } from 'react';
import { getPeakColor, getChartColor } from '@utils/helperFunctions';

type Props = {
  data: Array<ChartDataType>;
  chartState: ChartStateType;
  peaks: ChartDataset;
  peakWidth: number;
  setState: Dispatch<SetStateAction<ChartStateType>>;
  zoom: () => void;
  handleClick: (event: CategoricalChartState) => void;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label text-sm text-base-content">{`2Θ: ${label?.toFixed(4)} °`}</p>
        <p className="intro text-sm text-base-content">{`Intensity: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const XRDChart = (props: Props) => {
  const { data, chartState, peaks, peakWidth, setState, zoom, handleClick } = props;
  const sortedPeaks = useMemo(() => {
    const sortedPeaks: ChartDataset = { ...peaks };
    for (let key in sortedPeaks) {
      sortedPeaks[key].sort((a, b) => a.position - b.position);
    }
    return sortedPeaks;
  }, [peaks]);
  const allPeaks = useMemo(() => {
    let allPositions: ChartDataPoint[] = [];
    for (let key in sortedPeaks) {
      allPositions = [...allPositions, ...sortedPeaks[key]];
    }
    return allPositions.filter((value, index, array) => array.indexOf(value) === index);
  }, [sortedPeaks]);
  const peakColors = useMemo(() => getPeakColor(allPeaks, peakWidth), [sortedPeaks, peakWidth]);

  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  return (
    <ResponsiveContainer aspect={1.78} width="100%" className="bg-slate-100 dark:bg-slate-800 rounded-md select-none">
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
          name="2Theta"
          scale="auto"
        />
        <YAxis allowDataOverflow={true} domain={[chartState.bottom, chartState.top]} scale="linear" />
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
        {allPeaks.map((item, index) => (
          <Fragment key={`fragment-${index}`}>
            <ReferenceArea
              x1={item.position - 0.01}
              x2={item.position + 0.01}
              strokeOpacity={1}
              fill={peakColors[index]}
              fillOpacity={0.8}
              ifOverflow="visible"
              id={`peak-${index}`}
              key={`peak-${index}`}
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
              key={`peakArea-${index}`}
            />
          </Fragment>
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default XRDChart;

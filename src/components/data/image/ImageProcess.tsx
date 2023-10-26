'use client';

import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

type Props = {
  className: string;
};

const ImageProcess = (props: Props) => {
  return (
    <ResponsiveContainer
      height="100%"
      width="100%"
      className={`w-full h-full rounded-md select-none ${props.className}`}
    >
      <LineChart
        data={[]}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
        // onMouseDown={(e) => {
        //   e &&
        //     setState((prevState: ChartStateType) => ({
        //       ...prevState,
        //       zoomLeft: Number(e.activeLabel),
        //     }));
        // }}
        // onMouseMove={(e) => {
        //   if (chartState.zoomLeft) {
        //     e &&
        //       setState((prevState: ChartStateType) => ({
        //         ...prevState,
        //         zoomRight: Number(e.activeLabel),
        //       }));
        //   }
        // }}
        // onMouseUp={zoom}
        // onClick={(e) => handleClick(e)}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="position"
          type="number"
          allowDataOverflow={true}
          domain={[0, 40]}
          // ticks={chartState.ticks}
          interval="equidistantPreserveStart"
          tickCount={20}
          name="2Theta"
        />
        <YAxis allowDataOverflow={true} domain={[0, 10000]} />
        <Tooltip />
        <Legend />
        {/* {sortedPeaks.map((item, index) => (
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
      ))} */}
      </LineChart>
    </ResponsiveContainer>
  );
  return <div className={`w-full h-full ${props.className}`}>ImageProcess</div>;
};

export default ImageProcess;

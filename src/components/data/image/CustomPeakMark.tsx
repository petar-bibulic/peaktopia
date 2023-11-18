import { Fragment } from 'react';
import { Cross, Dot } from 'recharts';
import { XDOMAIN_RANGE, YDOMAIN_RANGE } from '@utils/constants';
import { Point } from '@components/data/DataTypes';

const CustomPeakMark = (props: any) => {
  const { styling, peaks, width, height } = props;
  const strokeStyle = styling.stroke;

  const nativePeaks = peaks.map((peak: Point) => ({
    x: (peak.x / XDOMAIN_RANGE[1]) * width,
    y: (1 - peak.y / YDOMAIN_RANGE[1]) * height,
  }));

  return (
    <>
      {nativePeaks.map((point: Point, index: number) => (
        <Fragment key={`div-${index}`}>
          <Cross
            x={point.x}
            y={point.y}
            width={20}
            height={20}
            top={point.y - 10}
            left={point.x - 10}
            stroke={strokeStyle}
          />
          <Dot
            cx={point.x}
            cy={point.y}
            r={10}
            fillOpacity={0}
            stroke={strokeStyle}
            onClick={(e) => console.log('Peak clicked: ', e)}
          />
        </Fragment>
      ))}
    </>
  );
};

export default CustomPeakMark;

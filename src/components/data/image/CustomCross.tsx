import { Fragment } from 'react';
import { Cross, Rectangle } from 'recharts';
import { taxicabDist, getClosestPoint } from '@utils/helperFunctions';

type PointPayloadType = {
  x: number;
  y: number;
  payload: { name: string; x: number; y: number };
};

const CustomCross = (props: any) => {
  const { formattedGraphicalItems, styling, active, mouseDownHandler, mouseUpHandler } = props;
  const strokeStyle = styling.stroke;
  const strokeStyleActive = styling.activeStroke;
  const points = formattedGraphicalItems
    .map((series: any) => series.props.points.map((point: any) => ({ x: point.x, y: point.y, payload: point.payload })))
    .flat();

  return (
    <>
      {points.map((point: PointPayloadType, index: number) => (
        <Fragment key={`div-${index}`}>
          <Cross
            x={point.x}
            y={point.y}
            width={20}
            height={20}
            top={point.y - 10}
            left={point.x - 10}
            stroke={point.payload.name.toLowerCase() === active?.name ? strokeStyleActive : strokeStyle}
            key={index}
          />
          <Rectangle
            x={point.x - 10}
            y={point.y - 10}
            width={20}
            height={20}
            fillOpacity={0}
            stroke={point.payload.name.toLowerCase() === active?.name ? strokeStyleActive : strokeStyle}
            style={{ cursor: 'pointer' }}
          />
        </Fragment>
      ))}
    </>
  );
};

export default CustomCross;

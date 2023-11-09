'use client';

import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, Customized, Label, LabelList } from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { useEffect, useState, useRef, PureComponent } from 'react';
import useGlobalStore from '@hooks/useGlobalStore';
import { getChartColor, taxicabDist, getClosestPoint } from '@utils/helperFunctions';

import CustomCross from '@components/data/image/CustomCross';
import { Point, Points, PointName } from '@components/data/DataTypes';
import { FAST_SHIFT, SLOW_SHIFT, XDOMAIN_RANGE, YDOMAIN_RANGE, SELECT_RANGE_CUTOFF } from '@utils/constants';

type Props = {
  setContinue: (value: boolean) => void;
  className?: string;
  step: number;
};

const ImageProcess = (props: Props) => {
  const [range, setRange] = useState<Points>({});
  const [currentPosition, setCurrentPosition] = useState<Point | null>(null);
  const [activePoint, setActivePoint] = useState<PointName | null>(null);
  const [activeDragPoint, setActiveDragPoint] = useState<PointName | null>(null);
  const setUserInstruction = useGlobalStore((state) => state.setUserInstruction);
  const action = useGlobalStore((state) => state.action);
  const chartRef = useRef<any>(null);

  const { setContinue, step, className } = props;

  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  let dataX = [
    { name: 'X1', ...range?.x1 },
    range?.x2 ? { name: 'X2', ...range?.x2 } : { name: 'X2', ...currentPosition },
  ];

  let dataY = [
    { name: 'Y1', ...range?.y1 },
    range?.y2 ? { name: 'Y2', ...range?.y2 } : { name: 'Y2', ...currentPosition },
  ];

  useEffect(() => {
    switch (step) {
      case 1:
        setUserInstruction('Click to select 1st point for X-axis');
        break;
      case 2:
        setUserInstruction('Adjust values for X and Y axes');
        //TODO: open modal or allow user to input values inside a table
        break;
      case 3:
        setUserInstruction('Click to select all peaks on chart');
        break;
    }
    return () => {
      setUserInstruction('');
    };
  }, [step]);

  const getChartDimensions = () => {
    if (chartRef.current) {
      const offset = chartRef.current.state.offset;
      return [offset.width, offset.height];
    } else {
      return [null, null];
    }
  };

  const getPosition = (e: CategoricalChartState): Point | null => {
    if (e?.chartX && e?.chartY) {
      const [width, height] = getChartDimensions();
      if (width && height) {
        const xpos = Math.floor((e.chartX / width) * 1000);
        const ypos = Math.floor((1 - e.chartY / height) * 1000);
        return { x: xpos, y: ypos };
      }
    }
    return null;
  };

  const handleClick = (e: CategoricalChartState) => {
    const clickPosition = getPosition(e);
    switch (step) {
      case 1:
        if (!range?.x1) {
          setUserInstruction('Click to select 2nd point for X-axis');
          clickPosition && setRange((prev) => ({ ...prev, x1: clickPosition }));
        } else if (!range?.x2) {
          setUserInstruction('Click to select 1st point for Y-axis');
          clickPosition && setRange((prev) => ({ ...prev, x2: clickPosition }));
        } else if (!range?.y1) {
          setUserInstruction('Click to select 2nd point for Y-axis');
          clickPosition && setRange((prev) => ({ ...prev, y1: clickPosition }));
        } else if (!range?.y2) {
          setUserInstruction('Click or drag to adjust points, or continue to next step');
          clickPosition && setRange((prev) => ({ ...prev, y2: clickPosition }));
          setContinue(true);
        } else {
          const clickPosition = getPosition(e);
          const closest = clickPosition && getClosestPoint(clickPosition, range);

          if (closest && closest.point && taxicabDist(clickPosition, closest.point) < SELECT_RANGE_CUTOFF) {
            setActivePoint(closest);
            setUserInstruction('Use arrow (or shift + arrow) keys to move selected point');
          } else {
            setActivePoint(null);
            setUserInstruction('Click or drag to adjust points, or continue to next step');
          }
        }
        break;
      case 2:
        break;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (activePoint) {
      e.preventDefault();
      let newPosition: Point | null = null;
      let shiftValue = SLOW_SHIFT;

      if (e.shiftKey) {
        shiftValue = FAST_SHIFT;
      }

      switch (e.key) {
        case 'ArrowUp':
          newPosition = { x: range[activePoint.name].x, y: range[activePoint.name].y + shiftValue };
          break;
        case 'ArrowDown':
          newPosition = { x: range[activePoint.name].x, y: range[activePoint.name].y - shiftValue };
          break;
        case 'ArrowLeft':
          newPosition = { x: range[activePoint.name].x - shiftValue, y: range[activePoint.name].y };
          break;
        case 'ArrowRight':
          newPosition = { x: range[activePoint.name].x + shiftValue, y: range[activePoint.name].y };
          break;
      }

      if (newPosition) {
        setRange((prev) => ({ ...prev, [activePoint.name]: newPosition as Point }));
        setActivePoint({ name: activePoint.name, point: newPosition });
      }
    }
  };

  const handleMouseDown = (e: CategoricalChartState) => {
    const position = getPosition(e);
    const closest = position && getClosestPoint(position, range);
    if (closest && taxicabDist(closest.point, position) < SELECT_RANGE_CUTOFF) {
      if (range?.y2) {
        setActivePoint(closest);
        setActiveDragPoint(closest);
        setUserInstruction('Drop point to a desired location to adjust');
      }
    }
  };

  return (
    <div tabIndex={-1} onKeyDown={handleKeyPress}>
      <ResponsiveContainer
        aspect={1.78}
        width="100%"
        className={`w-full h-full rounded-md select-none ${props.className}`}
      >
        <LineChart
          ref={chartRef}
          data={[]}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          onMouseMove={(e) => {
            const newPosition = getPosition(e);
            setCurrentPosition(newPosition);
            if (activeDragPoint && newPosition) {
              setRange((prev) => ({ ...prev, [activeDragPoint.name]: newPosition }));
              setActiveDragPoint({ name: activeDragPoint.name, point: newPosition });
              setActivePoint({ name: activeDragPoint.name, point: newPosition });
            }
          }}
          onClick={(e) => handleClick(e)}
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseUp={(e) => setActiveDragPoint(null)}
        >
          <XAxis
            dataKey="x"
            type="number"
            allowDataOverflow={true}
            domain={XDOMAIN_RANGE}
            name="2Theta"
            axisLine={false}
            tick={false}
            width={0}
            height={0}
          />
          <YAxis
            dataKey="y"
            allowDataOverflow={true}
            domain={YDOMAIN_RANGE}
            axisLine={false}
            tick={false}
            width={0}
            height={0}
          />
          {step < 3 && (
            <>
              {range?.x1 && (
                <Line
                  data={dataX}
                  tooltipType="none"
                  stroke={getChartColor(0)}
                  strokeWidth={3}
                  dataKey="y"
                  name="xAxis"
                  key="xAxis"
                  dot={false}
                  isAnimationActive={false}
                >
                  <LabelList dataKey="name" position="top" offset={10} />
                </Line>
              )}
              {range?.y1 && (
                <Line
                  data={dataY}
                  tooltipType="none"
                  stroke={getChartColor(0)}
                  strokeWidth={3}
                  dataKey="y"
                  name="yAxis"
                  key="yAxis"
                  dot={false}
                  isAnimationActive={false}
                >
                  <LabelList dataKey="name" position="right" offset={10} />
                </Line>
              )}
              <Customized
                component={
                  <CustomCross styling={{ stroke: '#1E293B', activeStroke: '#FB7085' }} active={activePoint} />
                }
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ImageProcess;

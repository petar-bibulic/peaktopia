'use client';

import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, Customized, LabelList } from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { useEffect, useState, useRef } from 'react';
import useGlobalStore from '@hooks/useGlobalStore';
import { getChartColor, taxicabDist, getClosestPoint, getNearestPeak } from '@utils/helperFunctions';

import CustomCross from '@components/data/image/CustomCross';
import CustomPeakMark from '@components/data/image/CustomPeakMark';
import { Point, NamedPoints, PointName, ChartDataPoint } from '@components/data/DataTypes';
import {
  FAST_SHIFT,
  SLOW_SHIFT,
  XDOMAIN_RANGE,
  YDOMAIN_RANGE,
  SELECT_RANGE_CUTOFF,
  ANIMATION_DURATION,
} from '@utils/constants';

type Props = {
  setContinue: (value: boolean) => void;
  className?: string;
  step: number;
  peaks: ChartDataPoint[];
  setPeaks: (value: ChartDataPoint[]) => void;
  onlyPeaks: boolean;
};
const ImageProcess = (props: Props) => {
  const [range, setRange] = useState<NamedPoints>({}); // axes range
  const [currentPosition, setCurrentPosition] = useState<Point | null>(null);
  const [activeAnchor, setactiveAnchor] = useState<PointName | null>(null);
  const [activeDragPoint, setActiveDragPoint] = useState<PointName | null>(null);
  const [peakPoints, setPeakPoints] = useState<Point[]>([]); // peaks in { X, Y } format, used for charts
  const setUserInstruction = useGlobalStore((state) => state.setUserInstruction);
  const action = useGlobalStore((state) => state.action);
  const chartRef = useRef<any>(null);
  const { setContinue, step, peaks, setPeaks } = props;

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

  // add y-0 points left and right from every peak to get a decent looking chart
  // works if only peaks are selected (how to check this?)
  let showDataPoints: Point[] = [];
  if (step === 4) {
    const slope = (range.x2.y - range.x1.y) / (range.x2.x - range.x1.x);
    const intercept = range.x1.y + 20;
    const sortedPoints = peakPoints.sort((a, b) => a.x - b.x);
    if (props.onlyPeaks) {
      for (let i = 0; i < sortedPoints.length; i++) {
        let point = sortedPoints[i];
        showDataPoints.push({ x: point.x - 10, y: slope * (point.x - range.x1.x - 10) + intercept });
        showDataPoints.push(point);
        showDataPoints.push({ x: point.x + 10, y: slope * (point.x - range.x1.x + 10) + intercept });
      }
      showDataPoints.splice(0, 0, { x: range.x1.x, y: intercept });
      showDataPoints.push({ x: range.x2.x, y: slope * (range.x2.x - range.x1.x) + intercept });
    }
  }

  useEffect(() => {
    switch (step) {
      case 1:
        setUserInstruction('Click to select 1st point for X-axis');
        break;
      case 2:
        setUserInstruction('Adjust values for X and Y axes');
        break;
      case 3:
        setUserInstruction('Select all peaks on chart, use sidebard controls to chose action');
        break;
      case 4:
        setTimeout(() => {
          setUserInstruction('Done, continue to Charts page');
        }, ANIMATION_DURATION);
        break;
    }
    return () => {};
  }, [step]);

  // calculate chart width and height
  const getChartDimensions = (): [number | null, number | null] => {
    if (chartRef.current) {
      const offset = chartRef.current.state.offset;
      return [offset.width, offset.height];
    } else {
      return [null, null];
    }
  };

  // calculate relative click position based on chart width and height
  // scaled to XDOMAIN_RANGE and YDOMAIN_RANGE [default: 0-1000]
  const getPosition = (e: CategoricalChartState): Point | null => {
    if (e?.chartX && e?.chartY) {
      const [width, height] = getChartDimensions();
      if (width && height) {
        const xpos = Math.floor((e.chartX / width) * XDOMAIN_RANGE[1]);
        const ypos = Math.floor((1 - e.chartY / height) * YDOMAIN_RANGE[1]);
        return { x: xpos, y: ypos };
      }
    }
    return null;
  };

  // add new peak based on click position
  // orthogonal projection based to previously defined X and Y axes
  const addPeak = (point: Point) => {
    //TODO: make orthogonal projection of position onto X and Y axes
    const newPeak: ChartDataPoint = { position: point.x, intensity: point.y };
    setPeaks([...peaks, newPeak]);
    setPeakPoints([...peakPoints, point]);
    setContinue(true);
  };

  // remove closesd peak based on click position
  const removePeak = (position: Point) => {
    const nearest = getNearestPeak(position, peakPoints);
    if (nearest && taxicabDist(position, nearest.point) < SELECT_RANGE_CUTOFF) {
      setPeakPoints(peakPoints.filter((peak, i) => i !== nearest.index));
      setPeaks(peaks.filter((peak, index) => peak.position !== nearest.point.x && peak.intensity !== nearest.point.y));
      if (peaks.length <= 1) setContinue(false);
    }
  };

  // control drag-and-drop axes anchors
  const allowDragAndDrop = (position: Point) => {
    const closest = position && getClosestPoint(position, range);
    if (closest && taxicabDist(position, closest.point) < SELECT_RANGE_CUTOFF) {
      setactiveAnchor(closest);
      setUserInstruction('Use arrow (or shift + arrow) keys to move selected point');
    } else {
      setactiveAnchor(null);
      setUserInstruction('Click or drag to adjust points, or continue to next step');
    }
  };

  // control click based on step state
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
          clickPosition && allowDragAndDrop(clickPosition);
        }
        break;
      case 2:
        clickPosition && allowDragAndDrop(clickPosition);
        break;
      case 3:
        // adds a new peak (based on cursor position) to the peak list
        if (clickPosition) {
          switch (action.toUpperCase()) {
            case 'S':
              addPeak(clickPosition);
              break;
            case 'D':
              removePeak(clickPosition);
              break;
          }
        }
        break;
      case 4:
        break;
    }
  };

  // control key press based on active axis anchor
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (activeAnchor) {
      e.preventDefault();
      let newPosition: Point | null = null;
      let shiftValue = SLOW_SHIFT;

      let newX: number = range[activeAnchor.name].x;
      let newY: number = range[activeAnchor.name].y;

      if (e.shiftKey) {
        shiftValue = FAST_SHIFT;
      }

      switch (e.key) {
        case 'ArrowUp':
          newY = newY + shiftValue;
          newY = newY > YDOMAIN_RANGE[1] ? YDOMAIN_RANGE[1] : newY;
          newPosition = { x: newX, y: newY };
          break;
        case 'ArrowDown':
          newY = newY - shiftValue;
          newY = newY < YDOMAIN_RANGE[0] ? YDOMAIN_RANGE[0] : newY;
          newPosition = { x: newX, y: newY };
          break;
        case 'ArrowLeft':
          newX = newX - shiftValue;
          newX = newX < XDOMAIN_RANGE[0] ? XDOMAIN_RANGE[0] : newX;
          newPosition = { x: newX, y: newY };
          break;
        case 'ArrowRight':
          newX = newX + shiftValue;
          newX = newX > XDOMAIN_RANGE[1] ? XDOMAIN_RANGE[1] : newX;
          newPosition = { x: newX, y: newY };
          break;
      }

      if (newPosition) {
        setRange((prev) => ({ ...prev, [activeAnchor.name]: newPosition as Point }));
        setactiveAnchor({ name: activeAnchor.name, point: newPosition });
      }
    }
  };

  // control mouse down event based on step state
  const handleMouseDown = (e: CategoricalChartState) => {
    if (step > 2) return;

    const position = getPosition(e);
    const closest = position && getClosestPoint(position, range);
    if (closest && taxicabDist(closest.point, position) < SELECT_RANGE_CUTOFF) {
      if (range?.y2) {
        setactiveAnchor(closest);
        setActiveDragPoint(closest);
        setUserInstruction('Drop point to a desired location to adjust');
      }
    }
  };

  // handle mose move, ignore once the range is set
  const handleMouseMove = (e: CategoricalChartState) => {
    const newPosition = getPosition(e);
    if (Object.keys(range).length < 4) setCurrentPosition(newPosition);

    if (activeDragPoint && newPosition) {
      setRange((prev) => ({ ...prev, [activeDragPoint.name]: newPosition }));
      setActiveDragPoint({ name: activeDragPoint.name, point: newPosition });
      setactiveAnchor({ name: activeDragPoint.name, point: newPosition });
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
          onMouseMove={(e) => handleMouseMove(e)}
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
                <LabelList dataKey="name" position="top" offset={12} />
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
                <LabelList dataKey="name" position="right" offset={12} />
              </Line>
            )}
            {step === 4 && peakPoints.length > 0 && (
              <Line
                data={showDataPoints}
                type="linear"
                tooltipType="none"
                stroke="#FB7085"
                strokeWidth={3}
                dataKey="y"
                name="peakData"
                key="peakData"
                dot={false}
                animationDuration={ANIMATION_DURATION}
                animationEasing="ease-in-out"
                isAnimationActive={true}
              />
            )}
            <Customized
              component={
                <CustomCross
                  styling={{ stroke: '#1E293B', activeStroke: '#FB7085' }}
                  active={step < 3 ? activeAnchor : null}
                  rangeData={[dataX, dataY].flat()}
                  width={getChartDimensions()[0]}
                  height={getChartDimensions()[1]}
                  step={step}
                />
              }
            />
            <Customized
              component={
                <CustomPeakMark
                  styling={{ stroke: '#FB7085' }}
                  peaks={peakPoints}
                  width={getChartDimensions()[0]}
                  height={getChartDimensions()[1]}
                />
              }
            />
          </>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ImageProcess;

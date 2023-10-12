'use client';

import { useEffect, useState } from 'react';
import { db } from '@firebase/config';
import _, { result } from 'lodash';
import parser from 'xml2js';
import { ref, getBlob } from 'firebase/storage';
import { storage } from '@firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { XRDDataType, ChartDataType, ChartStateType, DocType, PointType } from '@components/data/DataTypes';
import TableDisplay from './TableDisplay';
import XRDChart from './XRDChart';
import useActionStore from '@hooks/useActionStore';
import { AiOutlineInfoCircle } from 'react-icons/ai';

type Props = {
  fileId: string;
};

const OFFSET = 1.2;

const XRDView = (props: Props) => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const userObj = user ? JSON.parse(user) : null;
  const [lastClickTime, setLastClickTime] = useState(0);
  const [peaks, setPeaks] = useState<PointType[]>([]);
  const [peakWidth, setPeakWidth] = useState(0.1);
  const [chartData, setChartData] = useState<Array<ChartDataType>>([]);
  const [chartState, setChartState] = useState<ChartStateType>({
    zoomLeft: null,
    zoomRight: null,
    left: 0,
    right: 40,
    bottom: 0,
    top: 100000,
    animation: true,
    ticks: _.range(0, 41, 5).map((val) => val.toString()),
  });
  const action = useActionStore((state) => state.action);
  const setAction = useActionStore((state) => state.setAction);
  const charts = useActionStore((state) => state.charts);
  const setCharts = useActionStore((state) => state.setCharts);
  const activeCharts = useActionStore((state) => state.activeCharts);
  const setActiveCharts = useActionStore((state) => state.setActiveCharts);

  useEffect(() => {
    const loadActive = async () => {
      await fetchData();
    };

    loadActive();
    return () => {};
  }, []);

  useEffect(() => {
    const getData = async () => {
      const fileData = await fetchStore();
      const resultObject = fileData ? Object.entries(fileData).map(([key, val]) => ({ name: key, data: val })) : [];

      setChartData((prev) => [
        ...prev
          .filter((val) => activeCharts.includes(val.name))
          .filter((val) => !resultObject.map((val) => val.name).includes(val.name)),
        ...resultObject,
      ]);
    };

    getData();
    return () => {};
  }, [activeCharts]);

  const fetchData = async () => {
    try {
      if (userObj) {
        const q = query(collection(db, 'files'), where('userId', '==', userObj?.uid));
        const qSnapshot = await getDocs(q);
        let docs: Array<DocType> = [];
        qSnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id } as DocType);
        });
        setCharts(docs);

        if (props.fileId) {
          setActiveCharts([docs.filter((val) => val.id === props.fileId)[0].name]);
        } else {
          setActiveCharts([docs[0].name]);
        }
      } else {
        setCharts([
          { name: 'Example', url: 'datafiles/Caffeine.xrdml', userId: '', id: '' },
          { name: 'Example 2', url: 'datafiles/4,4-Bipyridine.xrdml', userId: '', id: '' },
        ]);
      }
    } catch (err) {
      console.error(`Error while fetching from Firestore Database: ${err}`);
    }
  };

  const fetchStore = async () => {
    const parsedChartData: { [key: string]: PointType[] } = {};
    try {
      for (let ac of activeCharts) {
        if (chartData.map((val) => val.name).includes(ac)) continue;

        const storageRef = ref(storage, charts.filter((val) => val.name === ac)[0]?.url);
        const file = await getBlob(storageRef);
        const rawData = await file.text();
        const xmlParser = new parser.Parser();

        xmlParser.parseString(rawData, function (err: Error | null, result: XRDDataType) {
          parsedChartData[ac] = getParsedData(ac, result);
        });
      }
      return parsedChartData;
    } catch (err) {
      console.error(`Error while fetching from Firebase Storage: ${err}`);
    }
  };

  const getParsedData = (name: string, data: XRDDataType) => {
    const common = data?.xrdMeasurements.xrdMeasurement[0].scan[0].dataPoints[0];
    const intensities = _.map(common?.intensities[0]._.split(' '), Number);
    const start = Number(common?.positions[0].startPosition[0]) || 0;
    const end = Number(common?.positions[0].endPosition[0]);
    const range = intensities?.length || 0;
    const step = (Number(end) - Number(start)) / (range - 1);
    const parsedData = _.map(intensities, (i: number, j: number) => ({ position: j * step + start, intensity: i }));

    return parsedData;
  };

  const findClosestIndex = (val: number, data: number[]) => {
    return data.reduce((prevIndex, currentNumber, currentIndex) => {
      const prevDifference = Math.abs(data[prevIndex] - val);
      const currentDifference = Math.abs(currentNumber - val);
      return currentDifference < prevDifference ? currentIndex : prevIndex;
    }, 0);
  };

  const getRange = (a: number, b: number): string[] => {
    const step = ((b - a) / 10).toExponential(1);
    const exp = Math.abs(Number(step.split('e')[1]));
    const start = Number(a.toExponential(exp));
    const end = Number(b.toExponential(exp));
    const range = _.range(start, end + Number(step), Number(step));
    if (exp > 1) {
      return range.map((val) => val.toExponential(exp));
    } else {
      return range.map((val) => val.toFixed(exp));
    }
  };

  const getChartDomain = (
    fromZoom?: number,
    toZoom?: number,
    newData?: ChartDataType[]
  ): [number, number, string[]] => {
    const allChartData =
      newData && newData?.length > 0
        ? [...chartData.filter((val) => activeCharts.includes(val.name)), ...newData]
        : chartData.filter((val) => activeCharts.includes(val.name));

    if (!allChartData?.length) return [0, 100, _.range(0, 41, 5).map((val) => val.toString())];

    let counts = allChartData[0]?.data.map((val) => val.position);

    // X-domain
    // find index of closest values to zoom
    let indexZoomLeft = fromZoom ? findClosestIndex(fromZoom, counts) : 0;
    let indexZoomRight = toZoom ? findClosestIndex(toZoom, counts) : counts.length - 1;

    const left = counts[indexZoomLeft];
    const right = counts[indexZoomRight];
    const range = getRange(left, right);

    // Y-domain
    let [bottom, top] = [0, 0];

    for (const chart of allChartData) {
      const counts = chart.data.slice(indexZoomLeft, indexZoomRight).map((val) => val.intensity);
      const tempMin = Math.min(...counts); // find max in zoom range
      const tempMax = Math.max(...counts); // find min in zoom range
      bottom = !bottom || tempMin < bottom ? tempMin : bottom;
      top = tempMax > top ? tempMax : top;
    }

    return [bottom, top, range];
  };

  function zoom() {
    let { zoomLeft, zoomRight, left, right } = chartState;
    const span = right - left;
    if (!zoomLeft || !zoomRight || Math.abs(zoomLeft - zoomRight) < 0.01 * span) {
      setChartState((prev) => ({
        ...prev,
        zoomLeft: null,
        zoomRight: null,
      }));
      return;
    }
    if (zoomLeft > zoomRight) [zoomLeft, zoomRight] = [zoomRight, zoomLeft];
    const [bottom, top, rangeX] = getChartDomain(zoomLeft, zoomRight);

    setChartState((prev) => ({
      ...prev,
      zoomLeft: null,
      zoomRight: null,
      left: Number(rangeX[0]),
      right: Number(rangeX.slice(-1)[0]),
      top: top,
      bottom: bottom,
      ticks: rangeX,
    }));
  }

  function zoomOut() {
    const [bottom, top, rangeX] = getChartDomain();
    setChartState((prev) => ({
      ...prev,
      zoomLeft: null,
      zoomRight: null,
      left: Number(rangeX[0]),
      right: Number(rangeX.slice(-1)[0]),
      top: top,
      bottom: bottom,
      ticks: rangeX,
    }));
  }

  const addPeak = (position: number) => {
    const data = chartData[0].data;
    const closest = findClosestIndex(
      position,
      data.map((val) => val.position)
    );
    setPeaks([...peaks, { position: data[closest].position, intensity: data[closest].intensity }]);
  };

  const removePeak = (position: number) => {
    const closest = peaks.reduce((prev, curr) => {
      return Math.abs(curr.position - position) < Math.abs(prev.position - position) ? curr : prev;
    });

    if (Math.abs(closest.position - position) > 1) {
      return;
    }
    setPeaks([...peaks].filter((peak) => peak !== closest));
  };

  const handleClick = (e: CategoricalChartState) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 300) {
      zoomOut();
    } else {
      switch (action.toUpperCase()) {
        case 'S':
          addPeak(Number(e.activeLabel));
          break;
        case 'D':
          removePeak(Number(e.activeLabel));
          break;
        case 'A':
          // TODO: add annotation logic
          // not sure what I had in mind here
          break;
      }
    }
    setLastClickTime(currentTime);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setAction('');
    } else {
      setAction(e.key);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 outline-none" tabIndex={-1} onKeyDown={handleKeyPress}>
      <div className="xl:col-span-2">
        <div className="alert mb-2 bg-base-200">
          <AiOutlineInfoCircle className="stroke-info shrink-0 w-6 h-6 text-primary" />
          <span>Click & drag to zoom, double-click to zoom out</span>
        </div>
        <div>
          <XRDChart
            data={chartData}
            chartState={chartState}
            setState={setChartState}
            peaks={peaks}
            handleClick={handleClick}
            zoom={zoom}
            peakWidth={peakWidth}
          />
        </div>
        <div className="mt-2 inline-flex w-full gap-5 items-center">
          <div className="whitespace-nowrap text-base-content">Peak width</div>
          <input
            type="text"
            value={peakWidth}
            className="input input-bordered input-sm input-primary"
            readOnly={true}
          />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={peakWidth}
            onChange={(e) => {
              e.preventDefault();
              setPeakWidth(Number(e.target.value));
            }}
            className="range range-primary range-xs"
          />
        </div>
      </div>
      <TableDisplay peaks={peaks} />
    </div>
  );
};

export default XRDView;

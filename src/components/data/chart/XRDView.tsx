'use client';

import { useEffect, useState } from 'react';
import { db } from '@firebaseApp/config';
import _ from 'lodash';
import parser from 'xml2js';
import { ref, getBlob } from 'firebase/storage';
import { storage } from '@firebaseApp/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { XRDDataType, ChartDataType, ChartStateType, DocType, ChartDataPoint } from '@components/data/DataTypes';
import TableDisplay from '@components/data/TableDisplay';
import XRDChart from '@components/data/chart/XRDChart';
import PeakWidthSelector from '@components/data/PeakWidthSelector';
import useGlobalStore from '@hooks/useGlobalStore';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { OFFSET, SEARCH_MAX_WIDTH } from '@utils/constants';

type Props = {
  fileId: string;
};

const XRDView = (props: Props) => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const userObj = user ? JSON.parse(user) : null;
  const [isLoading, setIsLoading] = useState(true);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [peaks, setPeaks] = useState<ChartDataPoint[]>([]);
  const [peakWidth, setPeakWidth] = useState(0.1);
  const [chartData, setChartData] = useState<Array<ChartDataType>>([]);
  const [detectMax, setDetectMax] = useState(false);
  const [scaleCharts, setScaleCharts] = useState(false);
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
  const action = useGlobalStore((state) => state.action);
  const setAction = useGlobalStore((state) => state.setAction);
  const charts = useGlobalStore((state) => state.charts);
  const setCharts = useGlobalStore((state) => state.setCharts);
  const activeCharts = useGlobalStore((state) => state.activeCharts);
  const setActiveCharts = useGlobalStore((state) => state.setActiveCharts);
  const processedImages = useGlobalStore((state) => state.processedImages);
  const setProcessedImages = useGlobalStore((state) => state.setProcessedImages);
  const activeImages = useGlobalStore((state) => state.activeImages);
  const setActiveImages = useGlobalStore((state) => state.setActiveImages);

  useEffect(() => {
    const loadActive = async () => {
      await fetchChartData();
      await fetchImageData();
    };

    loadActive();
    setIsLoading(false);
    return () => {};
  }, []);

  useEffect(() => {
    const getData = async () => {
      const fileData = await fetchStore();
      const resultObject = fileData ? Object.entries(fileData).map(([key, val]) => ({ name: key, data: val })) : [];

      setChartData((prev) => [
        ...prev
          .filter((val) => activeCharts.includes(val.name) || activeImages.includes(val.name))
          .filter((val) => !resultObject.map((val) => val.name).includes(val.name)),
        ...resultObject,
      ]);
    };

    !isLoading && getData();
  }, [activeCharts, isLoading]);

  useEffect(() => {
    console.log(processedImages);
    const newProcessedImages = processedImages
      .filter((val) => activeImages.includes(val.name))
      .map((val) => ({ name: val.name, data: val.data as Array<ChartDataPoint> }));

    setChartData((prev) => [
      ...prev
        .filter((val) => activeCharts.includes(val.name) || activeImages.includes(val.name))
        .filter((val) => !newProcessedImages.map((val) => val.name).includes(val.name)),
      ...newProcessedImages,
    ]);
  }, [activeImages]);

  // fetch all available charts from DB
  const fetchChartData = async () => {
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
          docs.length > 0 && setActiveCharts([docs[0].name]);
        }
      } else {
        setCharts([
          { name: 'Example', url: 'datafiles/Caffeine.xrdml', userId: '', id: '' },
          { name: 'Example 2', url: 'datafiles/4,4-Bipyridine.xrdml', userId: '', id: '' },
        ]);
        setActiveCharts(['Example']);
      }
    } catch (e) {
      console.error(`Error while fetching from Firestore Database: ${e}`);
    }
  };

  // fetch all available processed images from DB
  const fetchImageData = async () => {
    try {
      if (userObj) {
        const q = query(collection(db, 'data'), where('userId', '==', userObj?.uid));
        const qSnapshot = await getDocs(q);
        let docs: Array<DocType> = [];
        qSnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id } as DocType);
        });
        setProcessedImages(docs);

        if (props.fileId) {
          setActiveImages([docs.filter((val) => val.id === props.fileId)[0].name]);
        }
      }
    } catch (e) {
      console.error(`Error while fetching from Firestore Database: ${e}`);
    }
  };

  // fetch data for selected charts from storage
  const fetchStore = async () => {
    const parsedChartData: { [key: string]: ChartDataPoint[] } = {};
    try {
      for (let ac of activeCharts) {
        if (chartData.map((val) => val.name).includes(ac)) {
          continue;
        }
        const storageRef = ref(storage, charts.filter((val) => val.name === ac)[0]?.url);
        const file = await getBlob(storageRef);
        const rawData = await file.text();
        const xmlParser = new parser.Parser();

        xmlParser.parseString(rawData, function (err: Error | null, result: XRDDataType) {
          parsedChartData[ac] = getParsedData(ac, result);
        });
      }
      return parsedChartData;
    } catch (e) {
      console.error(`Error while fetching from Firebase Storage: ${e}`);
    }
  };

  // parse fetched data
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

  // find the closest index of a provided value in a list of 2Th positions
  const findClosestIndex = (val: number, data: number[]) => {
    return data.reduce((prevIndex, currentNumber, currentIndex) => {
      const prevDifference = Math.abs(data[prevIndex] - val);
      const currentDifference = Math.abs(currentNumber - val);
      return currentDifference < prevDifference ? currentIndex : prevIndex;
    }, 0);
  };

  // adds a new peak (based on cursor position) to the peak list
  const addPeak = (position: number) => {
    // TODO: add option to find peaks per chart or option to choose chart
    const data = chartData[0].data;
    const dataValues = data.map((val) => val.position);
    const positionIndex = findClosestIndex(position, dataValues);

    if (!detectMax) {
      const newPeak = { position: data[positionIndex].position, intensity: data[positionIndex].intensity };
      setPeaks([...peaks, newPeak]);
      return;
    }

    const low = findClosestIndex(position - SEARCH_MAX_WIDTH, dataValues);
    const high = findClosestIndex(position + SEARCH_MAX_WIDTH, dataValues);

    const newPeak = data.slice(low, high + 1).reduce((maxVal, current) => {
      return current.intensity > maxVal.intensity ? current : maxVal;
    }, data[0]);
    setPeaks([...peaks, newPeak]);
  };

  // removes peak closes to the cursor position from the peak list
  const removePeak = (position: number) => {
    // TODO: add option to find peaks per chart or option to choose chart
    const closest =
      peaks.length > 0
        ? peaks.reduce((prev, curr) => {
            return Math.abs(curr.position - position) < Math.abs(prev.position - position) ? curr : prev;
          })
        : null;
    if (closest && Math.abs(closest.position - position) > 1) {
      return;
    }
    setPeaks([...peaks].filter((peak) => peak !== closest));
  };

  // calculate data range for X-axis, given lower and higher bounds
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

  // calculate data range for both X and Y axes
  const getChartDomain = (
    fromZoom?: number,
    toZoom?: number,
    newData?: ChartDataType[]
  ): [number, number, Array<string>] => {
    const allChartData =
      newData && newData?.length > 0
        ? [...chartData.filter((val) => activeCharts.includes(val.name)), ...newData]
        : chartData.filter((val) => activeCharts.includes(val.name));

    if (!allChartData?.length) return [0, 10000, _.range(0, 41, 5).map((val) => val.toString())];

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

    const offset = top * OFFSET;

    return [bottom - offset, top + offset, range];
  };

  // zoom in function, gets called onMouseUp
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

  // zoom out function, gets called on double-click
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

  // click handler function
  const handleClick = (e: CategoricalChartState) => {
    // TODO: add support to set timeout on mouse down and clear it on mouse up, preventing add peaks on zoom
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

  // handle action state on key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setAction('');
    } else {
      if (action === e.key) {
        setAction('');
      } else {
        setAction(e.key);
      }
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
        <PeakWidthSelector peakWidth={peakWidth} setPeakWidth={setPeakWidth} />
        <div className="mt-4 flex flex-wrap gap-x-10 gap-y-2">
          <div className="inline-flex gap-5">
            <div className="text-base-content">Detect peak maximum</div>
            <input
              name="detect-max-checkbox"
              type="checkbox"
              checked={detectMax}
              onChange={() => {
                setDetectMax(detectMax ? false : true);
              }}
              className="checkbox checkbox-primary"
            />
          </div>
          <div className="inline-flex gap-5">
            <div className="text-base-content">Scale all charts</div>
            <input
              name="detect-max-checkbox"
              type="checkbox"
              checked={scaleCharts}
              onChange={() => {
                setScaleCharts(scaleCharts ? false : true);
              }}
              className="checkbox checkbox-primary"
            />
          </div>
        </div>
      </div>
      <TableDisplay peaks={peaks} />
    </div>
  );
};

export default XRDView;

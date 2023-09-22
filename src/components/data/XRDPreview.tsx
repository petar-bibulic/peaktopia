'use client';

import { useEffect, useState } from 'react';
import { db, auth } from '@firebase/config';

import _ from 'lodash';
import parser from 'xml2js';
import { ref, getBlob } from 'firebase/storage';
import { storage } from '@firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { Peak, XRDFormat, GraphStateFormat } from '@components/data/DataTypes';
import XRDTable from './XRDTable';
import XRDGraph from './XRDGraph';

type Props = {
  // children: React.ReactNode;
  // fileId: string;
};

const OFFSET = 1.2;

const XRDPreview = (props: Props) => {
  const userToken = auth.currentUser?.getIdToken;
  const [singleClick, setSingleClick] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [activeKey, setActiveKey] = useState<string>('');
  const [peaks, setPeaks] = useState<Peak[]>([]);
  const [peakWidth, setPeakWidth] = useState(0.1);
  const [graphState, setGraphState] = useState<GraphStateFormat>({
    data: [],
    left: '',
    right: '',
    positionLeft: '',
    positionRight: '',
    indexLeft: null,
    indexRight: null,
    top: '',
    bottom: '',
    animation: true,
    ticks: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const docRef = doc(db, 'files', props.fileId as string);
        // const docSnap = await getDoc(docRef);
        // if (docSnap.exists()) {
        //   console.log("Got'em");
        // }
        const storageRef = ref(storage, 'datafiles/Caffeine.xrdml'); // replace with fetched file
        const file = await getBlob(storageRef);
        const rawData = await file.text();
        const xmlParser = new parser.Parser();

        xmlParser.parseString(rawData, function (err: Error | null, result: XRDFormat) {
          parseData(result);
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const parseData = (data: XRDFormat) => {
    const common = data?.xrdMeasurements.xrdMeasurement[0].scan[0].dataPoints[0];
    const intensities = _.map(common?.intensities[0]._.split(' '), Number);
    const start = Number(common?.positions[0].startPosition[0]) || 0;
    const end = Number(common?.positions[0].endPosition[0]);
    const range = intensities?.length || 0;
    const step = (Number(end) - Number(start)) / (range - 1);
    const graphData = _.map(intensities, (i: number, j: number) => ({ position: j * step + start, intensity: i }));
    const dataRange = _.range(
      Math.floor(graphData[0]?.position / 5) * 5,
      Math.ceil(graphData.slice(-1)[0]?.position / 5 + 1) * 5,
      5
    );
    setGraphState({
      data: graphData,
      left: 'dataMin',
      right: 'dataMax',
      positionLeft: '',
      positionRight: '',
      indexLeft: null,
      indexRight: null,
      top: 'dataMax+1',
      bottom: 'dataMin-1',
      animation: true,
      ticks: dataRange,
    });
  };

  const getAxisYDomain = (from: number, to: number) => {
    const refData = graphState.data.slice(from, to);
    let [bottom, top] = [refData[0].intensity, refData[0].intensity];
    refData.forEach((d) => {
      if (d.intensity > top) top = d.intensity;
      if (d.intensity < bottom) bottom = d.intensity;
    });

    return [0, (top | 0) * OFFSET];
  };

  function zoom() {
    let { positionLeft, positionRight, indexLeft, indexRight } = graphState;
    const { data } = graphState;
    if (positionLeft === positionRight || positionRight === '' || indexLeft === null || indexRight === null) {
      setGraphState((prevState) => ({
        ...prevState,
        positionLeft: '',
        positionRight: '',
        indexLeft: null,
        indexRight: null,
      }));
      return;
    }
    let leftEdge = indexLeft;
    let rightEdge = indexRight;
    if (leftEdge > rightEdge) [leftEdge, rightEdge] = [rightEdge, leftEdge];
    const [bottom, top] = getAxisYDomain(leftEdge, rightEdge);

    setGraphState((prevState) => ({
      ...prevState,
      positionLeft: '',
      positionRight: '',
      indexLeft: null,
      indexRight: null,
      left: String(positionLeft),
      right: String(positionRight),
      top: String(top),
      bottom: String(bottom),
    }));
  }

  function zoomOut() {
    setGraphState((prevState) => ({
      ...prevState,
      positionLeft: '',
      positionRight: '',
      indexLeft: null,
      indexRight: null,
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin',
    }));
  }

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
      setSingleClick(true);
      setTimeout(() => {
        setSingleClick(false);
      }, 300);

      if (activeKey === 's') {
        setPeaks([
          ...peaks,
          { position: Number(e.activeLabel), intensity: graphState.data[Number(e.activeTooltipIndex)].intensity },
        ]);
      } else if (activeKey === 'd') {
        removePeak(Number(e.activeLabel));
      } else if (activeKey === 'a') {
        // TODO: add annotation logic
        // not sure what I had in mind here
      }
    }
    setLastClickTime(currentTime);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setActiveKey('');
    } else {
      console.log(e.key);
      setActiveKey(e.key);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 outline-none" tabIndex={-1} onKeyDown={handleKeyPress}>
      <div className="xl:col-span-2">
        <p className="text-base-content">Press &quotS&quot key to activate selecting peaks</p>
        <p className="text-base-content">Press &quotD&quot to activate deleting peaks</p>
        <p className="text-base-content">Press &quotEsc&quot to deactivate peak annotations</p>
        <div>
          <XRDGraph
            state={graphState}
            peaks={peaks}
            setState={setGraphState}
            handleClick={handleClick}
            zoom={zoom}
            peakWidth={peakWidth}
          />
        </div>
        <div className="mt-2 inline-flex w-full">
          <span className="w-3/5 sm:w-1/5 text-base-content">Peak width</span>
          <input
            type="range"
            min={0}
            max={100}
            value={peakWidth * 100}
            onChange={(e) => {
              setPeakWidth(Number(e.target.value) / 100);
            }}
            className="range range-primary range-xs"
          />
        </div>
      </div>
      <XRDTable peaks={peaks} />
    </div>
  );
};

export default XRDPreview;

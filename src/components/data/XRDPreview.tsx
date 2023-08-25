'use client';

import { useEffect, useState } from 'react';
import { db, auth } from '@firebase/config';
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
} from 'recharts';
import _ from 'lodash';
import parser from 'xml2js';
import { ref, getBlob } from 'firebase/storage';
import { storage } from '@firebase/config';
import { doc, getDoc } from 'firebase/firestore';

type Props = {
  // children: React.ReactNode;
  // fileId: string;
};

type XRDFormat = {
  xrdMeasurements: {
    xrdMeasurement: [
      {
        scan: [
          {
            dataPoints: [
              {
                positions: [
                  {
                    startPosition: [string];
                    endPosition: [string];
                  }
                ];
                intensities: [
                  {
                    _: string;
                  }
                ];
              }
            ];
          }
        ];
      }
    ];
  };
};

type graphStateFormat = {
  data: Array<{ name: number; data: number }>;
  left: string;
  right: string;
  refAreaLeft: string;
  refAreaRight: string;
  top: string;
  bottom: string;
  animation: boolean;
  ticks: number[];
};

const XRDPreview = (props: Props) => {
  const userToken = auth.currentUser?.getIdToken;
  const [singleClick, setSingleClick] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [graphState, setGraphState] = useState<graphStateFormat>({
    data: [],
    left: '',
    right: '',
    refAreaLeft: '',
    refAreaRight: '',
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
        const storageRef = ref(storage, 'datafiles/Caffeine.xrdml');
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

    const parseData = (data: XRDFormat) => {
      const common = data?.xrdMeasurements.xrdMeasurement[0].scan[0].dataPoints[0];
      const intensities = _.map(common?.intensities[0]._.split(' '), Number);
      const start = Number(common?.positions[0].startPosition[0]) || 0;
      const end = Number(common?.positions[0].endPosition[0]);
      const range = intensities?.length || 0;
      const step = (Number(end) - Number(start)) / (range - 1);
      const graphData = _.map(intensities, (i: number, j: number) => ({ name: j * step + start, data: i }));
      const dataRange = _.range(
        Math.floor(graphData[0]?.name / 5) * 5,
        Math.ceil(graphData.slice(-1)[0]?.name / 5 + 1) * 5,
        5
      );
      setGraphState({
        data: graphData,
        left: 'dataMin',
        right: 'dataMax',
        refAreaLeft: '',
        refAreaRight: '',
        top: 'dataMax+1',
        bottom: 'dataMin-1',
        animation: true,
        ticks: dataRange,
      });
    };

    fetchData();

    return () => {};
  }, []);

  const getAxisYDomain = (from: number, to: number, offset: number) => {
    const lowerLimit = graphState.data.findIndex((i) => i.name === from);
    const upperLimit = graphState.data.findIndex((i) => i.name === to);
    const refData = graphState.data.slice(lowerLimit, upperLimit);
    let [bottom, top] = [refData[0].data, refData[0].data];
    refData.forEach((d) => {
      if (d.data > top) top = d.data;
      if (d.data < bottom) bottom = d.data;
    });

    return [(bottom | 0) - offset, (top | 0) + offset];
  };

  function zoom() {
    let { refAreaLeft, refAreaRight } = graphState;
    let [leftEdge, rightEdge] = [Number(refAreaLeft), Number(refAreaRight)];
    const { data } = graphState;
    if (leftEdge === rightEdge || refAreaRight === '') {
      setGraphState((prevState) => ({
        ...prevState,
        refAreaLeft: '',
        refAreaRight: '',
      }));
      return;
    }

    if (leftEdge > rightEdge) [leftEdge, rightEdge] = [rightEdge, leftEdge];
    const [bottom, top] = getAxisYDomain(leftEdge, rightEdge, 1000);

    setGraphState((prevState) => ({
      ...prevState,
      refAreaLeft: '',
      refAreaRight: '',
      left: String(leftEdge),
      right: String(rightEdge),
      top: String(top),
      bottom: String(bottom),
    }));
  }

  function zoomOut() {
    const { data } = graphState;
    setGraphState((prevState) => ({
      ...prevState,
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin',
    }));
  }

  const handleDoubleClick = () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 300) {
      zoomOut();
    } else {
      setSingleClick(true);
      setTimeout(() => {
        setSingleClick(false);
      }, 300);
    }
    setLastClickTime(currentTime);
  };

  return (
    <>
      <ResponsiveContainer aspect={2} width="100%" className="lg:col-span-2 bg-neutral-focus select-none">
        <LineChart
          data={graphState.data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
          onMouseDown={(e) => {
            e && setGraphState((prevState) => ({ ...prevState, refAreaLeft: String(e.activeLabel) }));
          }}
          onMouseMove={(e) => {
            // TODO: change activeLabel to activeTooltipIndex -> avoid using findIndex
            if (graphState.refAreaLeft && graphState.refAreaLeft !== 'undefined') {
              e && setGraphState((prevState) => ({ ...prevState, refAreaRight: String(e.activeLabel) }));
            }
          }}
          onMouseUp={zoom}
          onClick={handleDoubleClick}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            type="number"
            allowDataOverflow={true}
            domain={[Number(graphState.left), Number(graphState.right)]}
            ticks={graphState.ticks}
          />
          <YAxis allowDataOverflow={true} domain={[Number(graphState.bottom), Number(graphState.top)]} />
          <Tooltip />
          <Legend />
          <Line
            dataKey="data"
            stroke="#3abff8"
            isAnimationActive={false}
            strokeWidth={3}
            dot={false}
            activeDot={{ stroke: 'red', r: 8 }}
          />
          {graphState.refAreaLeft && graphState.refAreaRight ? (
            <ReferenceArea x1={graphState.refAreaLeft} x2={graphState.refAreaRight} strokeOpacity={1} />
          ) : null}
        </LineChart>
      </ResponsiveContainer>

      <div className="overflow-x-auto">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th></th>
              <th>Position [° 2&Theta;]</th>
              <th>Intensity [rel]</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
              <th>1</th>
              <td>15.6</td>
              <td>75</td>
            </tr>
            <tr className="hover">
              <th>2</th>
              <td>18.23</td>
              <td>15.32</td>
            </tr>
            <tr className="hover">
              <th>3</th>
              <td>23.14</td>
              <td>3.28</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default XRDPreview;

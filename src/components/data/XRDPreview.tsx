'use client';

import { useEffect, useState } from 'react';
import { db, auth } from '@firebase/config';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';
import parser from 'xml2js';

import { ref, getDownloadURL, getBlob } from 'firebase/storage';
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

const XRDPreview = (props: Props) => {
  const [data, setData] = useState<XRDFormat>();
  const userToken = auth.currentUser?.getIdToken;

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
          setData(result);
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const common = data?.xrdMeasurements.xrdMeasurement[0].scan[0].dataPoints[0];
  const intensities = _.map(common?.intensities[0]._.split(' '), Number);
  const start = Number(common?.positions[0].startPosition[0]) || 0;
  const end = Number(common?.positions[0].endPosition[0]);
  const range = intensities?.length || 0;
  const step = (Number(end) - Number(start)) / (range - 1);
  const graphData = _.map(intensities, (i: number, j: number) => ({ name: j * step + start, data: i }));

  return (
    <>
      <ResponsiveContainer aspect={1} width="101%">
        <LineChart
          data={graphData}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            dataKey="data"
            stroke="#8884d8"
            isAnimationActive={false}
            strokeWidth={3}
            activeDot={{ stroke: 'red', r: 8 }}
          />
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

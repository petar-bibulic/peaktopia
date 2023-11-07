type XRDDataType = {
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

type ChartDataPoint = {
  position: number;
  intensity: number;
};

type ChartDataType = {
  name: string;
  data: Array<ChartDataPoint>;
};

type ChartStateType = {
  left: number;
  right: number;
  zoomLeft: number | null;
  zoomRight: number | null;
  top: number | string;
  bottom: number | string;
  animation: boolean;
  ticks: Array<string>;
};

type DocType = {
  name: string;
  url: string;
  userId: string;
  id: string;
};

type Point = {
  x: number;
  y: number;
};

type Points = {
  [key: string]: Point;
};

type PointName = { name: string; point: Point };

export type { XRDDataType, ChartDataPoint, ChartDataType, ChartStateType, DocType, Point, Points, PointName };

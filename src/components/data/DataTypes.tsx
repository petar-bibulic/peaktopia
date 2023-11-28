export type XRDDataType = {
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

export type ChartDataPoint = {
  position: number;
  intensity: number;
};

export type ChartDataType = {
  name: string;
  data: Array<ChartDataPoint>;
};

export type ChartStateType = {
  left: number;
  right: number;
  zoomLeft: number | null;
  zoomRight: number | null;
  top: number | string;
  bottom: number | string;
  animation: boolean;
  ticks: Array<string>;
};

export type DocType = {
  name: string;
  url: string;
  userId: string;
  id: string;
  data?: Array<ChartDataPoint>;
};

export type Point = {
  x: number;
  y: number;
};

export type NamedPoints = {
  [key: string]: Point;
};

export type ChartDataset = { [key: string]: Array<ChartDataPoint> };

export type PointName = { name: string; point: Point };

export type PointIndex = { index: number; point: Point };

export type AxesNames = 'X1' | 'X2' | 'Y1' | 'Y2';

export type SideEffectsType = { [key: string]: (...params: Array<any>) => void };

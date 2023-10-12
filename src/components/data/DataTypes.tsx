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

type PointType = {
  position: number;
  intensity: number;
};

type ChartDataType = {
  name: string;
  data: Array<PointType>;
};

type ChartStateType = {
  left: number;
  right: number;
  zoomLeft: number | null;
  zoomRight: number | null;
  top: number | string;
  bottom: number | string;
  animation: boolean;
  ticks: string[];
};

type DocType = {
  name: string;
  url: string;
  userId: string;
  id: string;
};

export type { XRDDataType, PointType, ChartDataType, ChartStateType, DocType };

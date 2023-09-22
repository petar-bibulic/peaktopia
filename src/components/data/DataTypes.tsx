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

type Peak = {
  position: number;
  intensity: number;
};

type GraphStateFormat = {
  data: Array<Peak>;
  left: string;
  right: string;
  positionLeft: string;
  positionRight: string;
  indexLeft: number | null;
  indexRight: number | null;
  top: string;
  bottom: string;
  animation: boolean;
  ticks: number[];
};

export type { Peak, XRDFormat, GraphStateFormat };

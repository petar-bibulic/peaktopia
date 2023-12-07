import React from 'react';

type Props = {
  detectMax: boolean;
  setDetectMax: (detectMax: boolean) => void;
  scaleCharts: boolean;
  setScaleCharts: (scaleCharts: boolean) => void;
  clickHandler: () => void;
};

const ChartControls = (props: Props) => {
  const { detectMax, setDetectMax, scaleCharts, setScaleCharts, clickHandler } = props;

  return (
    <div className="mt-4 flex flex-wrap gap-x-10 gap-y-2 items-center">
      <div className="inline-flex gap-5">
        <div
          className="text-left text-base-content tooltip tooltip-right before:z-50 before:content-[attr(data-tip)]"
          data-tip="Try to detect peak maximum when selecting peaks"
        >
          Detect peak maximum
        </div>
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
        <div
          className="text-left text-base-content tooltip tooltip-right before:z-50 before:content-[attr(data-tip)]"
          data-tip="Scale all charts to common maximum height"
        >
          Scale all charts
        </div>
        <input
          type="checkbox"
          name="detect-max-checkbox"
          className="toggle toggle-primary"
          checked={scaleCharts}
          onChange={() => {
            setScaleCharts(scaleCharts ? false : true);
          }}
          disabled
        />
      </div>
      <button className="btn btn-primary w-fit" onClick={clickHandler}>
        Save peaks
      </button>
    </div>
  );
};

export default ChartControls;

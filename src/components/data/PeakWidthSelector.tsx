import { useState } from 'react';

type Props = {
  peakWidth: number;
  setPeakWidth: (value: number) => void;
};

const PeakWidthSelector = (props: Props) => {
  const { peakWidth, setPeakWidth } = props;
  const [tempValue, setTempValue] = useState(String(peakWidth));

  const peakWidthHandler = (value: string) => {
    const numberVal = Number(value);
    if (isNaN(numberVal)) {
      setTempValue(String(peakWidth));
    } else {
      const nearestVal = Math.min(Math.max(Math.round(numberVal * 20) / 20, 0), 1);
      setTempValue(String(nearestVal));
      setPeakWidth(nearestVal);
    }
  };

  return (
    <div className="mt-2 flex flex-wrap sm:inline-flex w-full gap-5 items-center">
      <div className="whitespace-nowrap text-base-content">Peak width [° 2&Theta;]</div>
      <input
        name="peak-width-text"
        className="grow sm:flex-none sm:block input input-bordered input-sm input-primary text-base-content"
        type="text"
        value={tempValue}
        onBlur={(e) => peakWidthHandler(e.target.value)}
        onChange={(e) => setTempValue(e.target.value)}
        onKeyDown={(e) => e.stopPropagation()}
      />
      <input
        name="peak-width-slider"
        className="w-full sm:w-1 sm:grow range range-primary range-xs sm:range-sm"
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={peakWidth}
        onChange={(e) => {
          e.preventDefault();
          setPeakWidth(Number(e.target.value));
          setTempValue(e.target.value);
        }}
      />
    </div>
  );
};

export default PeakWidthSelector;

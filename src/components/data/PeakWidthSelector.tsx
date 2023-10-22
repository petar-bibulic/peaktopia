type Props = {
  peakWidth: number;
  setPeakWidth: (value: number) => void;
};

const PeakWidthSelector = (props: Props) => {
  const { peakWidth, setPeakWidth } = props;

  return (
    <div className="mt-2 inline-flex w-full gap-5 items-center">
      <div className="whitespace-nowrap text-base-content">Peak width</div>
      <input type="text" value={peakWidth} className="input input-bordered input-sm input-primary" readOnly={true} />
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={peakWidth}
        onChange={(e) => {
          e.preventDefault();
          setPeakWidth(Number(e.target.value));
        }}
        className="range range-primary range-xs"
      />
    </div>
  );
};

export default PeakWidthSelector;

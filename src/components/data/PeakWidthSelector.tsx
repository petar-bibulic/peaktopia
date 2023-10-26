type Props = {
  peakWidth: number;
  setPeakWidth: (value: number) => void;
};

const PeakWidthSelector = (props: Props) => {
  const { peakWidth, setPeakWidth } = props;

  return (
    <div className="mt-2 flex flex-wrap sm:inline-flex w-full gap-5 items-center">
      <div className="whitespace-nowrap text-base-content">Peak width</div>
      <input
        className="grow sm:flex-none sm:block input input-bordered input-sm input-primary"
        type="text"
        value={peakWidth}
        readOnly={true}
      />
      <input
        className="w-full sm:w-1 sm:grow range range-primary range-xs sm:range-sm"
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={peakWidth}
        onChange={(e) => {
          e.preventDefault();
          setPeakWidth(Number(e.target.value));
        }}
      />
    </div>
  );
};

export default PeakWidthSelector;

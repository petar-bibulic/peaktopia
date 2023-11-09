import { forwardRef, Fragment } from 'react';

type Props = {
  className?: string;
  setContinue: (value: boolean) => void;
  setAxes: (value: { [key: string]: number }) => void;
};

const AxesForm = forwardRef<HTMLDivElement | null, Props>((props, ref) => {
  const { setContinue, setAxes, className } = props;

  const axesRangeNames = [
    ['X1', 'X2'],
    ['Y1', 'Y2'],
  ];

  return (
    <div ref={ref} className={`mt-6 mb-4 ${className}`}>
      <h1 className="text-lg mb-4 text-black dark:text-white">Set axes range values</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {axesRangeNames.map((axis, index) => (
          <div key={index} className="mb-2 grid grid-cols-6 ">
            {axis.map((label) => {
              return (
                <Fragment key={label}>
                  <label htmlFor={label} className="flex justify-center items-center text-black dark:text-white">
                    {label}
                  </label>
                  <input
                    id={label}
                    className="col-span-2 input input-bordered w-full max-w-xs"
                    required
                    onChange={(e) => console.log(e)}
                  />
                </Fragment>
              );
            })}
          </div>
        ))}
      </form>
    </div>
  );
});

export default AxesForm;

'use client';

import { forwardRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AxesNames } from '@components/data/DataTypes';

type Props = {
  className?: string;
  step: number;
  setContinue: (value: boolean) => void;
  axes: { current: { [key in AxesNames]: number } | null };
};

const axesRangeNames: AxesNames[][] = [
  ['X1', 'X2'],
  ['Y1', 'Y2'],
];

const AxesForm = forwardRef<HTMLDivElement | null, Props>((props, ref) => {
  const { setContinue, step, axes, className } = props;
  const { register, watch, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues: { X1: '', X2: '', Y1: '', Y2: '' },
  });

  useEffect(() => {
    if (step !== 2) return;

    if (formState.dirtyFields) {
      if (formState.isValid) {
        setContinue(true);
        let numberValues: { [key in AxesNames]: number } = { X1: 0, X2: 0, Y1: 0, Y2: 0 };
        for (const [key, value] of Object.entries(getValues())) {
          numberValues[key as AxesNames] = Number(value);
        }
        axes.current = numberValues;
      } else {
        setContinue(false);
      }
    }
  }, [formState, watch]);

  return (
    <div ref={ref} className={`mt-6 mb-4 ${className}`}>
      <h1 className="text-lg mb-4 text-base-content">Set axes range values</h1>
      <form>
        {axesRangeNames.map((axis, index) => (
          <div key={index} className="mb-2 grid grid-cols-2">
            {axis.map((label) => {
              return (
                <div key={label}>
                  <div className="inline-flex items-center w-full">
                    <label htmlFor={label} className="text-base-content mx-6">
                      {label}
                    </label>
                    <input
                      id={label}
                      className="input input-bordered w-full text-base-content"
                      autoComplete="off"
                      onKeyDown={(e) => {
                        e.stopPropagation();
                      }}
                      {...register(label, {
                        required: { value: true, message: 'This field is required' },
                        validate: (value) => {
                          if (value) {
                            if (isNaN(Number(value))) {
                              return 'Plese enter a valid number';
                            } else {
                              return undefined;
                            }
                          } else {
                            return undefined;
                          }
                        },
                      })}
                    />
                  </div>
                  <p className="pt-1 ml-6 text-error">{formState.errors[label]?.message}</p>
                </div>
              );
            })}
          </div>
        ))}
      </form>
    </div>
  );
});

AxesForm.displayName = 'AxesForm';

export default AxesForm;

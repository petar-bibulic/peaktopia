type Props = {
  step: number;
  steps: Array<string>;
  className?: string;
};

const Steps = (props: Props) => {
  const { step, steps, className } = props;

  return (
    <ul className={`steps ${className}`}>
      {steps.map((stepString, index) =>
        step >= index + 1 ? (
          <li className="step step-primary" key={index}>
            {stepString}
          </li>
        ) : (
          <li className="step" key={index}>
            {stepString}
          </li>
        )
      )}
    </ul>
  );
};

export default Steps;

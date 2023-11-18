type Props = {
  continue: boolean;
  continueClickHandler: () => void;
};

const ContinueButton = (props: Props) => {
  return (
    <button
      className="btn btn-primary w-full max-w-[50vw] md:w-fit mt-6 md:mt-0"
      disabled={!props.continue}
      onClick={props.continueClickHandler}
    >
      Continue
    </button>
  );
};

export default ContinueButton;

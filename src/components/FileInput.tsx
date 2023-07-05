import { ChangeEvent } from 'react';

type Props = {
  fileTypes: string[];
  selected: boolean;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FileInput = (props: Props) => {
  return (
    <>
      <input
        type="file"
        className="file-input file-input-bordered, file-input-primary w-full max-w-sm"
        accept={props.fileTypes.join(', ')}
        onChange={props.changeHandler}
        // multiple
      />
      {props.selected ? (
        <button className="btn btn-primary mx-4" type="submit">
          Submit
        </button>
      ) : (
        <button className="btn btn-disabled mx-4">Submit</button>
      )}
    </>
  );
};

export default FileInput;

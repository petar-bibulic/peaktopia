import React from 'react';

type Props = {
  accept: string[];
};

const Upload = (props: Props) => {
  return (
    <input
      type="file"
      className="file-input file-input-bordered file-input-info w-full max-w-xs"
      accept={props.accept.join(', ')}
    />
  );
};

export default Upload;

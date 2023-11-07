import { ChangeEvent } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

type Props = {
  fileTypes: string[];
  selected: boolean;
  files: File[] | undefined;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FileInput = (props: Props) => {
  return (
    <div className="flex flex-wrap justify-center md:flex-nowrap w-full items-center">
      <div className="flex items-center justify-center w-full max-w-sm mb-2">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-neutral hover:bg-gray-100 dark:hover:bg-neutral-focus">
          <div className="flex flex-col items-center justify-center py-5 px-2">
            <FaCloudUploadAlt className="text-4xl pb-2" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload or drop files</span>
            </p>
            {props.files?.length ? (
              <p className="text-md text-gray-200 dark:text-primary">
                [ {props.files.map((file) => file.name).join(', ')} ]
              </p>
            ) : (
              <p className="text-md text-gray-200 dark:text-gray-400">(MAX. 1024x1024px)</p>
            )}
          </div>
          <div className="text-md text-gray-500 dark:text-gray-400">{props.fileTypes.join(' | ')}</div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept={props.fileTypes.join(',')}
            onChange={props.changeHandler}
            // multiple
          />
        </label>
      </div>
      <button className="btn btn-primary mx-4 w-full max-w-sm md:w-fit" disabled={!props.selected} type="submit">
        Submit
      </button>
    </div>
  );
};

export default FileInput;

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
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center py-5 px-2">
            <FaCloudUploadAlt className="text-4xl pb-2" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            {props.files?.length ? (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {props.files.map((file) => file.name).join(', ')}
              </p>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {props.fileTypes.join(' | ')} (MAX. 1024x1024px)
              </p>
            )}
          </div>
          <div>{props.fileTypes.join(' | ')}</div>
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
      {props.selected ? (
        <button className="btn btn-primary mx-4 w-full max-w-sm md:w-fit" type="submit">
          Submit
        </button>
      ) : (
        <button className="btn btn-disabled mx-4 w-full max-w-sm md:w-fit">Submit</button>
      )}
    </div>
  );
};

export default FileInput;

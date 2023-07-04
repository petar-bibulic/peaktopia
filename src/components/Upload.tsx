'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { redirect } from 'next/navigation';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage, auth } from '@firebase/config';
// import { onAuthStateChanged } from 'firebase/auth';

type Props = {
  accept: string[];
};

const Upload = (props: Props) => {
  const [isSelected, setIsSelected] = useState(false);
  const [files, setFiles] = useState<File[]>();
  // const user = auth.currentUser;
  const user = { token: '12345' };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...e.target.files]);
      setIsSelected(true);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!files) {
      console.error('No file selected');
      return;
    }
    const user = auth.currentUser;
    if (!user) {
      console.error('User not logged in');
      return;
    }
    const headers = {
      contentType: files[0].type,
      Authorization: `Bearer ${user.getIdToken()}`,
    };
    const storageRef = ref(storage, 'images/' + files[0].name);
    const uploadTask = uploadBytesResumable(storageRef, files[0], headers);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // TODO: display progress in place of a upload file, maybe move this logic up to a parent component
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log('Yo, shit got fucked');
        // list of all error codes: https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // TODO: successful upload, show check and redirect after timeout
        redirect('/login');
      }
    );
  };

  return (
    <form action="post" onSubmit={handleSubmit} className="flex justify-between">
      <input
        type="file"
        className="file-input file-input-bordered, file-input-primary w-full max-w-sm"
        accept={props.accept.join(', ')}
        onChange={onFileChange}
        // multiple
      />
      {isSelected ? (
        <button className="btn btn-primary mx-4" type="submit">
          Submit
        </button>
      ) : (
        <button className="btn btn-disabled mx-4">Submit</button>
      )}
    </form>
  );
};

export default Upload;

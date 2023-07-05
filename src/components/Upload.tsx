'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { redirect } from 'next/navigation';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage, auth } from '@firebase/config';
import { useRouter } from 'next/navigation';
import FileInput from './FileInput';
// import { onAuthStateChanged } from 'firebase/auth';

type Props = {
  accept: string[];
};

const Upload = (props: Props) => {
  const [selected, setSelected] = useState(false);
  const [files, setFiles] = useState<File[]>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...e.target.files]);
      setSelected(true);
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
        setLoading(true);
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
        setLoading(false);
        console.error("Shit's on fire, yo");
        switch (error.code) {
          case 'storage/unauthorized':
            console.warn('Permission denied');
            break;
          case 'storage/canceled':
            console.warn('Upload canceled');
            break;
          case 'storage/unknown':
            console.warn('Unknown upload error');
            break;
        }
      },
      () => {
        // TODO: successful upload, show check and redirect after timeout
        setLoading(false);
        setTimeout(() => router.push('/data'), 1500);
      }
    );
  };

  return (
    <form action="post" onSubmit={handleSubmit} className="flex justify-between">
      {loading ? (
        <span className="loading loading-spinner loading-lg" />
      ) : (
        <FileInput fileTypes={props.accept} selected={selected} changeHandler={onFileChange} />
      )}
    </form>
  );
};

export default Upload;

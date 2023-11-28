'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { StorageReference, ref, uploadBytesResumable } from 'firebase/storage';
import { storage, db } from '@firebaseApp/config';
import { useRouter } from 'next/navigation';
import FileInput from '@components/misc/FileInput';
import CheckMark from '@components/Checkmark';
import { motion, useMotionValue } from 'framer-motion';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthContext } from '@store/AuthContext';
import { anonSignIn } from '@firebaseApp/authUtils';
import { toast, Theme } from 'react-toastify';
import useGlobalStore from '@hooks/useGlobalStore';

type Props = {};

const UploadFileComponent = (props: Props) => {
  const [selected, setSelected] = useState(false);
  const [files, setFiles] = useState<File[]>();
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useGlobalStore((state) => state.theme);
  let user = useAuthContext();
  const router = useRouter();
  const progress = useMotionValue(90);

  let acceptedFileFormats;
  if (!user || user.isAnonymous) {
    acceptedFileFormats = ['image/*'];
  } else {
    acceptedFileFormats = ['image/*', '.xrdml'];
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles([...e.target.files]);
      setSelected(true);
    } else {
      setFiles([]);
      setSelected(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!files) {
      toast.warn('No file selected', { theme: theme as Theme });
      return;
    }

    if (!user) {
      await anonSignIn();
    }

    const token = await user?.getIdToken();

    const headers = {
      contentType: files[0].type,
      Authorization: `Bearer ${token}`,
    };

    const storagePath = files[0].type.startsWith('image/') ? 'images/' : 'datafiles/';
    const fileName = files[0].name.replace(/ /g, '_');
    const filePath = storagePath + fileName;
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, files[0], headers);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setLoading(true);
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // TODO: display progress in place of a upload file,add fill meter component
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
      (e) => {
        setLoading(false);
        console.error(`Error while uploading file: ${e}`);
        switch (e.code) {
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
      async () => {
        const fileUUID = crypto.randomUUID();
        const docRef = storagePath === 'images/' ? doc(db, 'images', fileUUID) : doc(db, 'files', fileUUID);
        setDoc(docRef, {
          url: filePath,
          userId: user?.uid,
          name: fileName.split('.')[0],
        });
        setLoading(false);
        setUploaded(true);
        const path = storagePath === 'images/' ? 'image' : 'charts';
        setTimeout(() => router.push(`/data/${path}?fileId=${fileUUID}`), 1000);
      }
    );
  };

  return (
    <form action="post" onSubmit={handleSubmit} className="flex justify-center w-full">
      {loading ? (
        <span className="loading loading-spinner loading-lg" />
      ) : uploaded ? (
        <div>
          <motion.div initial={{ x: 0 }} animate={{ x: 100 }} style={{ x: progress }} transition={{ duration: 0.8 }} />
          <CheckMark progress={progress} />
        </div>
      ) : (
        <FileInput fileTypes={acceptedFileFormats} selected={selected} files={files} changeHandler={onFileChange} />
      )}
    </form>
  );
};

export default UploadFileComponent;

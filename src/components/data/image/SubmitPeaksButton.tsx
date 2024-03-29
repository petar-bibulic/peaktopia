'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast, Theme } from 'react-toastify';
import useGlobalStore from '@hooks/useGlobalStore';

import { ChartDataPoint, AxesNames } from '@components/data/DataTypes';
import { useAuthContext } from '@store/AuthContext';

type Props = {
  data: ChartDataPoint[];
  onlyPeaks: boolean;
  axesRange: { [key in AxesNames]: number } | null;
};

const postData = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
};

const SubmitPeaksButton = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAuthContext();
  const theme = useGlobalStore((state) => state.theme);
  const [cookies] = useCookies(['userToken']);
  const [isDisabled, setIsDisabled] = useState(false);

  const clickHandler = async () => {
    const data = {
      uid: user?.uid,
      authToken: cookies.userToken,
      fileId: searchParams.get('fileId'),
      data: props.data,
    };

    if (props.onlyPeaks) {
      const len = data.data.length;
      const xRange = props.axesRange ? props.axesRange.X2 - props.axesRange.X1 : 40;
      for (let i = 0; i < len; i++) {
        let point = data.data[3 * i];
        data.data.splice(3 * i, 0, { position: point.position - xRange / 100, intensity: 0 });
        data.data.splice(3 * i + 2, 0, { position: point.position + xRange / 100, intensity: 0 });
      }
    }

    setIsDisabled(true);
    const toastId = toast.loading('Uploading data...', { theme: theme as Theme });
    const response = await postData('/api/image', data);
    const payload = await response.json();
    if (response.status === 201) {
      toast.update(toastId, {
        render: 'Sign in successful',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme as Theme,
      });
      setTimeout(() => router.push(`/data/charts?fileId=${payload.fileId}`), 1000);
    } else {
      toast.update(toastId, {
        render: `Error uploading data: ${payload.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme as Theme,
      });
    }
  };

  return (
    <button
      onClick={clickHandler}
      disabled={false}
      className="btn btn-primary w-full max-w-[50vw] md:w-fit mt-6 md:mt-0"
    >
      Submit Peaks
    </button>
  );
};

export default SubmitPeaksButton;

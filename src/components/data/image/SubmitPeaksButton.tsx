'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

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

    console.log('POST-ing data and redirecting shortly');
    setIsDisabled(true);
    const response = await postData('/api/image', data);
    const payload = await response.json();
    if (response.status === 201) {
      router.push(`/data/charts?fileId=${payload.fileId}`);
    }
  };

  return (
    <button
      onClick={clickHandler}
      disabled={false}
      className="btn btn-primary w-full max-w-[50vw] md:w-fit mt-6 md:mt-0"
    >
      Continue
    </button>
  );
};

export default SubmitPeaksButton;

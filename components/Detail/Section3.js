import MultipleDoughnut from '@components/Graph/MultipleDoughnut';
import Pie from '@components/Graph/Pie';
import Bar1 from '@components/Graph/Bar1';
import Bar2 from '@components/Graph/Bar2';
import { useEffect, useRef, useState } from 'react';
import Doughnut1 from '@components/Graph/Doughnut1';
import Image from 'next/image';
import { filterPriceFluctuationFactorImage } from 'libs/utils';

export default function Section3({
  tradeVolumesSector,
  marketShareSector,
  averageAnnualSales,
  secondaryMarketShareByValue,
  secondaryMarketShareByVolume,
  priceFluctuationFactor,
}) {
  const box4Ref = useRef(null);

  const useScroll = () => {
    const [scroll, setScroll] = useState({
      x: 0,
    });
    const onScroll = () => {
      setScroll({
        x: box4Ref.current.scrollLeft,
      });
    };
    useEffect(() => {
      // box4Ref.current.addEventListener('scroll', onScroll);
      // return () => box4Ref.current.removeEventListener('scroll', onScroll);
    });
    return scroll;
  };

  const { x } = useScroll();

  return (
    <div className='col-center-center bg-[#032d43] space-y-28 pt-28 pb-52 lg:pt-12 lg:pb-24'>
      {/* Box 1 & Box 2 */}
      <div className='flex-between-center w-[91rem] lg:flex-col'>
        {/* Box 1 */}
        {tradeVolumesSector.length > 0 && (
          <div className='md:w-screen md:overflow-x-scroll md:ml-10'>
            <h1 className='text-white font-bold font-[Helvetica] mb-4 lg:text-xl lg:font-normal'>
              Trade Volume : Post-War and Contemporary Sector
            </h1>
            <div className='flex-center-center bg-navy-400 border-y-[0.3rem] border-[#042639] w-[42.5rem] h-[25.625rem] lg:w-[42rem] md:flex-start-center'>
              <Bar1 tradeVolumes={tradeVolumesSector} />
            </div>
          </div>
        )}

        {/* Box2 */}
        {marketShareSector.length > 0 && (
          <div className='md:mt-12 md:w-screen md:overflow-x-scroll md:ml-10'>
            <h1 className='text-white font-bold font-[Helvetica] mb-4 lg:text-xl lg:font-normal'>
              Market Share by Sector of the Fine Art Auction Market in 2019
            </h1>
            <div className='flex-center-center bg-navy-400 border-y-[0.3rem] border-[#042639] w-[42.5rem] h-[25.625rem] px-[3.7rem] lg:w-[42rem]'>
              <MultipleDoughnut marketShare={marketShareSector} />
            </div>
          </div>
        )}
      </div>

      {/* Box 3 */}
      {(secondaryMarketShareByValue.length > 0 ||
        secondaryMarketShareByVolume.length > 0) && (
        <div className='relative lg:my-12 md:w-screen md:overflow-x-scroll md:ml-10'>
          <h1 className='text-white font-bold font-[Helvetica] mb-4 lg:text-xl lg:font-normal'>
            Secondary Market Share of the Post-War and Contemporary Sector in
            2019
          </h1>
          <div className='flex-center-center bg-navy-400 border-y-[0.3rem] border-[#042639] w-[91rem] h-[25.625rem] px-20 lg:w-[42rem] lg:h-[52rem] lg:px-0'>
            {/* <Pie /> */}
            <Doughnut1
              marketShareByValue={secondaryMarketShareByValue}
              marketShareByVolume={secondaryMarketShareByVolume}
            />
          </div>

          <div className='absolute -top-40 -right-[34rem] w-[30rem] h-80'>
            <Image src='/icons/frame-1.png' alt='Frame Image' layout='fill' />
          </div>

          <div className='absolute -bottom-10 -left-[34rem] w-[30rem] h-80'>
            <Image src='/icons/frame-2.png' alt='Frame Image' layout='fill' />
          </div>
        </div>
      )}

      {/* Box4 */}
      {averageAnnualSales.length > 0 && (
        <div
          ref={box4Ref}
          className='lg:w-full lg:pl-[calc((100vw-42rem)/2)] lg:overflow-x-scroll md:w-screen md:overflow-x-scroll md:ml-10'
        >
          <h1 className='text-white font-bold font-[Helvetica] mb-4 lg:text-xl lg:font-normal'>
            Reference: Average Annual Sales by Sector, 2018 and 2019
          </h1>
          <div className='flex-center-center bg-navy-400 border-y-[0.3rem] border-[#042639] w-[91rem] h-[28rem]'>
            <Bar2 scrollX={x} averageAnnualSales={averageAnnualSales} />
          </div>
        </div>
      )}

      {/* Box5 */}
      <div className='relative pt-24 lg:mt-14 md:w-full md:px-4'>
        <h1 className='text-white font-bold font-[Helvetica] mb-2.5 lg:text-xl lg:font-normal'>
          Price Fluctuation Factors
        </h1>
        <div className='grid grid-cols-5 gap-x-5 gap-y-10 border-y-[0.3rem] border-[#042639] w-[91rem] px-4 py-8 lg:grid-cols-2 lg:gap-y-10 lg:w-[42rem] lg:px-10 md:w-full md:px-0 md:gap-x-0'>
          {priceFluctuationFactor.map((factor) => (
            <div
              key={factor.seq}
              className='flex-center-center w-[1/5] lg:flex-start-center lg:w-auto'
            >
              <div className='relative rounded-full w-[8.75rem] aspect-square mr-[0.81rem] lg:w-[10rem] lg:h-[10rem] md:w-[5.8rem] md:h-[5.8rem] md:mr-0'>
                <Image
                  src={`/icons/price-fluctuation-factors/${filterPriceFluctuationFactorImage(
                    factor.title
                  )}.png`}
                  alt='Price Fluctuation Factor Image'
                  layout='fill'
                />
              </div>
              <div className='w-[calc(100%-8.75rem)] text-white font-[Helvetica] lg:text-lg md:w-[calc(50%-6rem)] md:text-xs'>
                {factor.title}
              </div>
            </div>
          ))}
        </div>

        <div className='absolute -top-60 -right-[34rem] w-[30rem] h-80'>
          <Image src='/icons/frame-3.png' alt='Frame Image' layout='fill' />
        </div>
      </div>
    </div>
  );
}

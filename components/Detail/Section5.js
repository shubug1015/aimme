import Bar3 from '@components/Graph/Bar3';
import Bar4 from '@components/Graph/Bar4';
import { IoCloseOutline } from 'react-icons/io5';
import { RiShareBoxFill } from 'react-icons/ri';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import Doughnut2 from '@components/Graph/Doughnut2';
import { cls, filterMajorDealImage } from 'libs/utils';
import { AnimatePresence, motion } from 'framer-motion';

export default function Section5({
  lotArtistName,
  artistInfo,
  artworkCategory,
  topMediums,
  averageSize,
  relatedArtists,
  mostPopularAuction,
  mostPopularRegion,
  unsoldInAuction,
  soldInAuction,
  priceBidding,
  lotArtistBirth,
  lastDecadeAuctionInfo,
  biddingLastDecade,
  distributionBymaterial,
  mostRecentSoldLotList,
  highestPriceSoldLotList,
  recentIssueList,
}) {
  const [reportOpen, setReportOpen] = useState(false);

  const openReport = () => {
    setReportOpen(true);
  };

  const [realScaleOpen, setRealScaleOpen] = useState(false);

  const reportVar = {
    invisible: {
      opacity: 0,
      height: 0,
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.7,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  const realScaleVar = {
    invisible: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <div
      className='col-center-center bg-beige-200 w-screen px-[14.75rem] lg:px-10 lg:pb-28 md:px-4'
      style={{
        paddingBottom: reportOpen ? '16rem' : '6rem',
      }}
    >
      <div className='w-[91rem] mt-24 lg:w-full md:w-full'>
        <h1 className='flex justify-start items-center w-full text-black-900 text-[2.5rem] font-semibold border-b border-black-900 pb-14 lg:justify-between lg:pb-2 lg:text-[2.688rem] md:flex-col-reverse md:text-[2rem] md:pb-4'>
          <div>Artist Analytics Report</div>
          <div
            className={cls(
              reportOpen
                ? 'text-[#444444] cursor-default'
                : 'text-pink cursor-pointer hover:opacity-75',
              'ml-[1.625rem]  text-[2.063rem] font-[600] underline transition-opacity lg:text-[1.75rem] md:text-[1.375rem] md:ml-0 md:mb-[1.125rem]'
            )}
            onClick={openReport}
          >
            Check the Report Now!
          </div>
        </h1>
      </div>

      <AnimatePresence>
        {reportOpen && (
          <motion.div
            variants={reportVar}
            initial='invisible'
            animate='visible'
            exit='exit'
            className='w-[91rem] lg:w-full'
          >
            {/* Title */}
            <div className='w-[91rem] lg:w-full md:w-full'>
              <div className='flex-between-center mt-12 lg:col-center-center'>
                <div className='flex-center-center lg:flex-col lg:w-full'>
                  <div className='flex-center-center w-36 h-36 bg-navy-400 text-white text-[6.25rem] font-bold mr-7 lg:w-full lg:h-48 lg:mr-0 md:mr-0'>
                    {lotArtistName?.substring(0, 1)}
                  </div>
                  <div>
                    <div className='text-[2.19rem] font-bold text-black-900 lg:text-[2.875rem] lg: mt-5'>
                      {lotArtistName}
                    </div>
                    <div className='font-[Helvetica] text-black-900 lg:text-xl lg:text-center lg:mt-2'>
                      {artistInfo}
                    </div>
                  </div>
                </div>

                <div className='flex lg:mt-10'>
                  <div className='col-center-center mr-16'>
                    <div className='flex-center-center w-24 h-24 border border-black-900 rounded-full'>
                      <div className='flex-center-center w-20 h-20 border border-dotted border-black-900 rounded-full text-5xl font-bold'>
                        A
                      </div>
                    </div>
                    <div className='text-sm text-center mt-2 font-[Helvetica]'>
                      Market
                      <br />
                      Stability Level
                    </div>
                  </div>

                  <div className='col-center-center mr-16 lg:mr-0'>
                    <div className='flex-center-center w-24 h-24 border border-black-900 rounded-full'>
                      <div className='flex-center-center w-20 h-20 border border-dotted border-black-900 rounded-full text-2xl font-bold text-center'>
                        Top
                        <br />
                        10
                      </div>
                    </div>
                    <div className='text-sm text-center mt-2 font-[Helvetica]'>
                      Auction Geurantee
                      <br />
                      Value
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Title */}

            {/* Section 1 */}
            <div className='w-[91rem] mt-24 lg:w-full'>
              <h1 className='text-black-900 text-xl font-bold font-[Helvetica] border-b-[0.3rem] border-[#eee4d6] pb-1.5 lg:text-2xl'>
                Artist overview
              </h1>
              <div className='flex mt-5 lg:col-center-center'>
                {/* 1 & 2 */}
                <div>
                  {/* 1 */}
                  <div>
                    <h2 className='text-black-900 font-medium font-[Helvetica] mb-2 lg:text-[1.188rem] lg:text-center'>
                      Artwork Category
                    </h2>
                    <div className='text-navy-400 text-lg font-bold font-[Helvetica] lg:text-[1.375rem] lg:text-center'>
                      {artworkCategory?.map((cate, index) => (
                        <div key={index}>{cate.category}</div>
                      ))}
                    </div>
                  </div>
                  {/* 1 */}

                  {/* 2 */}
                  <div className='mt-7 lg:mt-9'>
                    <h2 className='text-black-900 font-medium font-[Helvetica] mb-2 lg:text-[1.188rem] lg:text-center'>
                      Top Two Mediums of Major Deals
                    </h2>
                    <div>
                      <div className='flex-between-center w-96'>
                        {/* 2-1 */}
                        <div className='col-center-center w-1/2'>
                          <div className='flex-center-center w-full border-b-[0.19rem] border-[#eee4d6] pb-[0.8rem]'>
                            <div className='relative w-20 h-28'>
                              <Image
                                src={`/icons/major-deals/${filterMajorDealImage(
                                  topMediums[0]?.medium
                                )}.png`}
                                alt='Major Deal Image'
                                layout='fill'
                              />
                            </div>
                          </div>
                          <div className='font-[Helvetica] text-black-900 mt-2 lg:text-[1.188rem]'>
                            {topMediums[0]?.medium}
                          </div>
                          <div className='text-3xl font-bold'>
                            {topMediums[0]?.ratio}
                          </div>
                        </div>
                        {/* 2-1 */}

                        {/* 2-2 */}
                        <div className='col-center-center w-1/2'>
                          <div className='flex-center-center w-full border-b-[0.19rem] border-[#eee4d6] pb-[0.8rem]'>
                            <div className='relative w-20 h-28'>
                              <Image
                                src={`/icons/major-deals/${filterMajorDealImage(
                                  topMediums[1]?.medium
                                )}.png`}
                                alt='Major Deal Image'
                                layout='fill'
                              />
                            </div>
                          </div>
                          <div className='font-[Helvetica] text-black-900 mt-2 lg:text-[1.188rem]'>
                            {topMediums[1]?.medium}
                          </div>
                          <div className='text-3xl font-bold'>
                            {topMediums[1]?.ratio}
                          </div>
                        </div>
                        {/* 2-2 */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 */}
                <div className='ml-20 mr-32 lg:mt-18 lg:ml-0 lg:mr-0 md:ml-0 md:mr-0'>
                  <h2 className='text-black-900 font-medium font-[Helvetica] mb-2 lg:text-[1.188rem] lg:text-center'>
                    Average Size of Major Deals
                  </h2>
                  <div className='flex-center-center w-[18.6rem] h-[16rem] bg-[#eee4d6] font-[Helvetica] text-black-900 lg:w-[29rem] lg:h-[25rem] md:w-[20.5rem] md:h-[17.625rem]'>
                    {averageSize}
                  </div>
                  <div className='flex-between-center mt-4 md:col-start-center md:w-full'>
                    <div className='relative w-16 h-5'>
                      <Image
                        src='/icons/brownArrow.png'
                        alt='Check the Real Scale Arrow Image'
                        layout='fill'
                      />
                    </div>
                    <div
                      onClick={() =>
                        averageSize !== '0 x 0' && setRealScaleOpen(true)
                      }
                      className={cls(
                        averageSize === '0 x 0'
                          ? 'bg-[#e0e0e0]'
                          : 'bg-black-900 hover:opacity-80 transition-opacity cursor-pointer',
                        'flex-center-center w-56 h-12 rounded-full text-white font-bold font-[Helvetica] lg:text-2xl lg:w-[21.875rem] lg:h-[4.625rem] md:w-[18.375rem] md:h-[3.875rem] md:mx-auto md:mt-[1.3rem]'
                      )}
                    >
                      Check the Real Scale
                    </div>

                    <AnimatePresence>
                      {realScaleOpen && (
                        <motion.div
                          className='fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-white z-[9999]'
                          variants={realScaleVar}
                          initial='invisible'
                          animate='visible'
                          exit='exit'
                        >
                          <div className='relative bg-white w-[50.625rem] h-[47.812rem] px-10 pt-16 pb-32 lg:w-[40rem] lg:h-[37.78rem] md:w-[20rem] md:h-[18.89rem]'>
                            <Image
                              src='/icons/scale-frame.png'
                              alt='Real Scale Frame'
                              layout='fill'
                            />
                            {console.log(+averageSize.split('x')[0])}
                            <div
                              className='absolute top-[7.6rem] left-[50.4%] -translate-x-1/2 flex justify-center items-center bg-[#cecece] font-[Helvetica] text-black-900 text-sm lg:top-24 md:hidden'
                              style={{
                                height: +averageSize.split('x')[0] * 1.9,
                                width: +averageSize.split('x')[1] * 1.9,
                              }}
                            >
                              {averageSize}
                            </div>

                            <div
                              className='text-center absolute top-10 left-[50.4%] -translate-x-1/2 justify-center items-center bg-[#cecece] font-[Helvetica] text-black-900 text-xs hidden md:flex'
                              style={{
                                height: +averageSize.split('x')[0] * 0.7,
                                width: +averageSize.split('x')[1] * 0.7,
                              }}
                            >
                              {averageSize}
                            </div>

                            <div className='absolute left-1/2 -translate-x-1/2 bottom-[6.101rem] lg:bottom-18 md:bottom-9'>
                              <div className='relative w-[26.72rem] h-[9.801rem] lg:w-80 lg:h-[7.5rem] md:w-40 md:h-[3.75rem]'>
                                <Image
                                  src='/icons/scale-fence.png'
                                  alt='Real Scale Fence'
                                  layout='fill'
                                  objectFit='cover'
                                />
                              </div>
                            </div>

                            <div className='absolute right-[5.312rem] bottom-[5.375rem] lg:right-14 lg:bottom-16 md:right-8 md:bottom-8'>
                              <div className='relative w-[5.25rem] h-[18.75rem] md:h-[7.5rem] md:w-8'>
                                <Image
                                  src='/icons/scale-person.png'
                                  alt='Real Scale Person'
                                  layout='fill'
                                  objectFit='cover'
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            onClick={() => setRealScaleOpen(false)}
                            className='absolute top-10 right-10 text-5xl text-black-900 cursor-pointer'
                          >
                            <IoCloseOutline />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                {/* 3 */}

                {/* 4 */}
                <div className='lg:mt-20 lg:flex-center-center lg:w-full lg:px-10 md:px-4'>
                  <div>
                    <h2 className='text-black-900 font-medium font-[Helvetica] mb-2 lg:text-[1.188rem] lg:text-center'>
                      Related Artists
                    </h2>

                    <div className='grid grid-cols-3 gap-x-12 gap-y-7 flex-wrap md:grid-cols-2 md:mt-6'>
                      {relatedArtists?.map((artist) => (
                        <div
                          key={artist.order}
                          className='col-center-center group'
                        >
                          <div className='flex-center-center w-18 aspect-square bg-white border border-navy-400 text-navy-400 text-5xl font-bold lg:w-[7.8rem] lg:h-[7.8rem] md:w-[5.5rem] md:h-[5.5rem] group-hover:bg-pink group-hover:text-white'>
                            {artist.artistName.substring(0, 1)}
                          </div>
                          <div className='text-xl font-bold mt-1 lg:text-[1.375rem] md:text-lg'>
                            {artist.artistName}
                          </div>
                          <div className='text-xs text-[#5a5a5a] font-[Helvetica] lg:text-[0.94rem] md:text-xs'>
                            {artist.artistInfo}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* 4 */}
              </div>
            </div>
            {/* Section 1 */}

            {/* Section 2 */}
            <div className='w-[91rem] mt-24 lg:w-full'>
              <h1 className='text-black-900 text-xl font-bold font-[Helvetica] border-b-[0.3rem] border-[#eee4d6] pb-1.5 lg:text-2xl'>
                Present Condition of Artist in Auction Sales
              </h1>
              <div className='flex mt-5 lg:flex-col'>
                <div className='relative flex lg:flex-between-center lg:px-10 md:flex-col'>
                  {/* 1 */}
                  <div className='lg:col-center-center'>
                    <h2 className='text-black-900 font-medium font-[Helvetica] mb-2 lg:text-[1.188rem] lg:text-center'>
                      Most Participated Auction and Region
                    </h2>
                    <div className='col-center-center w-[13.625rem] h-[15.3rem] bg-white shadow-[3px_6px_10px_0_#ebe4d9] text-black-900'>
                      <span className='text-lg font-bold mb-4'>
                        {mostPopularAuction}
                      </span>
                      <div className='relative flex-center-center w-full border-b-[0.063rem] border-[#c1c1c1] pb-[0.8rem]'>
                        <div className='relative w-28 h-28 z-[1]'>
                          <Image
                            src={`/icons/region/${mostPopularRegion}.png`}
                            alt='Map Image'
                            layout='fill'
                          />
                        </div>

                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full'>
                          <div className='relative w-full h-28'>
                            <Image
                              src='/icons/region/map.png'
                              alt='Map Image'
                              layout='fill'
                            />
                          </div>
                        </div>
                      </div>
                      <span className='text-lg font-bold mt-4'>
                        {mostPopularRegion}
                      </span>
                    </div>
                  </div>
                  {/* 1 */}

                  {/* 2 */}
                  <div className='ml-16 mr-[9.75rem] lg:col-center-center lg:ml-0 lg:mr-0 md:mt-12'>
                    <h2 className='text-black-900 font-medium font-[Helvetica] mb-2 lg:text-[1.188rem] lg:text-center'>
                      Sold and Unsold in Auction
                    </h2>
                    <div className='col-end-center w-[13.625rem] h-[15.3rem] bg-white shadow-[3px_6px_10px_0_#ebe4d9] text-black-900'>
                      <div className='flex-between-end w-full h-full border-b-[0.063rem] border-[#c1c1c1] px-8'>
                        <div
                          className='flex-center-start w-12 border-t-4 border-r border-[#dc604d] group hover:border-t-[7px] hover:border-r-2'
                          style={{ height: `${unsoldInAuction}%` }}
                        >
                          <span className='text-[0.81rem] text-[#dc604d] -translate-y-5 group-hover:text-base group-hover:-translate-y-7'>
                            {unsoldInAuction}%
                          </span>
                        </div>
                        <div
                          className='flex-center-start w-12 border-t-4 border-r border-[#45a391] group hover:border-t-[7px] hover:border-r-2'
                          style={{ height: `${soldInAuction}%` }}
                        >
                          <span className='text-[0.81rem] text-[#45a391] -translate-y-5 group-hover:text-base group-hover:-translate-y-7'>
                            {soldInAuction}%
                          </span>
                        </div>
                      </div>
                      <div className='flex-between-end w-full border-b-[0.063rem] border-[#c1c1c1] px-8'>
                        <div className='w-12 text-lg font-bold mt-4 mb-4'>
                          Unsold
                        </div>
                        <div className='w-12 text-lg font-bold mt-4 mb-4'>
                          Sold
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='absolute bottom-0 left-0 lg:hidden md:hidden'>
                    <div className='relative w-[38rem] h-28'>
                      <Image
                        src='/icons/fence.png'
                        alt='Fence Image'
                        layout='fill'
                      />
                    </div>
                  </div>
                  {/* 2 */}
                </div>

                <div className='flex lg:flex-between-center lg:mt-52 md:flex-col'>
                  {/* 3 */}
                  <div className='mr-[4.635rem] lg:w-1/2 lg:mr-3.5 md:mr-0 md:w-full'>
                    <h2 className='text-black-900 font-medium font-[Helvetica] mb-2 lg:text-[1.188rem] lg:text-center'>
                      Highest Price in Bidding
                    </h2>
                    <Link href={`/detail/${priceBidding[0].lotUuid}`}>
                      <a>
                        <div className='w-[18.25rem] hover:opacity-40 transition-opacity lg:w-full'>
                          <div className='relative w-full aspect-square'>
                            <Image
                              src={priceBidding[0].lotImage}
                              alt='Bidding Image'
                              layout='fill'
                            />
                          </div>
                          <div className='relative bg-white w-11/12 -mt-16 px-6 py-7'>
                            <div className='text-black-200 text-2xl font-bold'>
                              $ {priceBidding[0].lotPrice}
                            </div>
                            <div className='text-black-200'>
                              {lotArtistName}
                            </div>
                            <div className='text-black-200 text-xs font-[Helvetica]'>
                              {lotArtistBirth}
                            </div>
                            <div className='text-black-100 text-base font-[Helvetica]'>
                              {priceBidding[0].lotAuction}
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                  {/* 3*/}

                  {/* 4 */}
                  <div className='mr-[4.635rem] lg:w-1/2 lg:mr-0 md:w-full md:mt-6'>
                    <h2 className='text-black-900 font-medium font-[Helvetica] mb-2 lg:text-[1.188rem] lg:text-center'>
                      Lowest Price in Bidding
                    </h2>
                    <Link href={`/detail/${priceBidding[1].lotUuid}`}>
                      <a>
                        <div className='w-[18.25rem] hover:opacity-40 transition-opacity lg:w-full'>
                          <div className='relative w-full aspect-square'>
                            <Image
                              src={priceBidding[1].lotImage}
                              alt='Bidding Image'
                              layout='fill'
                            />
                          </div>
                          <div className='relative bg-white w-11/12 -mt-16 px-6 py-7'>
                            <div className='text-black-200 text-2xl font-bold'>
                              $ {priceBidding[1].lotPrice}
                            </div>
                            <div className='text-black-200'>
                              {lotArtistName}
                            </div>
                            <div className='text-black-200 text-xs font-[Helvetica]'>
                              {lotArtistBirth}
                            </div>
                            <div className='text-black-100 text-base font-[Helvetica]'>
                              {priceBidding[1].lotAuction}
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>

                  {/* 4*/}
                </div>
              </div>
            </div>
            {/* Section 2 */}

            {/* Section 3 */}
            {lastDecadeAuctionInfo.length > 0 && (
              <div className='w-[91rem] mt-24 lg:w-full'>
                <h1 className='text-black-900 text-xl font-bold font-[Helvetica] border-b-[0.3rem] border-[#eee4d6] pb-1.5 lg:text-2xl'>
                  This Artist’s work’s number of the auctions and regions in the
                  last decade
                </h1>
                <div className='flex mt-5 lg:mt-0'>
                  <Bar3 lastDecadeAuctions={lastDecadeAuctionInfo} />
                </div>
              </div>
            )}
            {/* Section 3 */}

            {/* Section 4 */}
            {biddingLastDecade.length > 0 && (
              <div className='w-[91rem] mt-24 lg:w-full lg:overflow-x-scroll'>
                <h1 className='text-black-900 text-xl font-bold font-[Helvetica] border-b-[0.3rem] border-[#eee4d6] pb-1.5'>
                  The successful and unsuccessful works in bidding in the last
                  decade
                </h1>
                <div className='flex mt-5'>
                  <Bar4 biddingLastDecade={biddingLastDecade} />
                </div>
              </div>
            )}
            {/* Section 4 */}

            {/* Section 5 */}
            {distributionBymaterial.lotsSold.length > 0 &&
              distributionBymaterial.turnover.length > 0 && (
                <div className='w-[91rem] mt-24 lg:w-full lg:overflow-x-scroll'>
                  <h1 className='text-black-900 text-xl font-bold font-[Helvetica] border-b-[0.3rem] border-[#eee4d6] pb-1.5 lg:text-2xl'>
                    The successful and unsuccessful works in bidding in the last
                    decade
                  </h1>
                  <div className='relative flex mt-5'>
                    {/* <Pie2 /> */}
                    <Doughnut2
                      distributionBymaterial={distributionBymaterial}
                    />

                    <div className='absolute bottom-0 right-0 lg:hidden md:hidden'>
                      <div className='relative w-[40rem] h-96'>
                        <Image
                          src='/icons/frame.png'
                          alt='Frame Image'
                          layout='fill'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            {/* Section 5 */}

            {/* Section 6 */}
            <div className='w-[91rem] mt-24 lg:w-full'>
              <h1 className='text-black-900 text-xl font-bold font-[Helvetica] border-b-[0.3rem] border-[#eee4d6] pb-1.5 lg:text-2xl'>
                This artist’s most recent sold lots
              </h1>
              <div className='grid grid-cols-4 flex-wrap mt-5 lg:grid-cols-2 lg:justify-between lg:gap-x-3.5 lg:gap-y-8 md:grid-cols-1'>
                {mostRecentSoldLotList?.map((lot) => (
                  <Link key={lot.seq} href={`/detail/${lot.lotUuid}`}>
                    <a>
                      <div className='w-[18.25rem] mr-[4.635rem] hover:opacity-40 transition-opacity lg:w-full lg:mr-0'>
                        <div className='relative w-full aspect-square'>
                          <Image
                            src={lot.lotImgSrc}
                            alt='Most Recent Sold Lot Image'
                            layout='fill'
                          />
                        </div>
                        <div className='relative bg-white w-11/12 -mt-16 px-6 py-7'>
                          <div className='text-black-200 text-2xl font-bold'>
                            {lot.currentcy} {lot.price}
                          </div>
                          <div className='text-black-200'>LOT 56A</div>
                          <div className='text-black-200 text-xs font-[Helvetica]'>
                            {lot.sale.length > 30
                              ? `${lot.sale.substring(0, 30)}...`
                              : lot.sale}
                          </div>
                          <div className='text-black-100 text-base font-[Helvetica]'>
                            {lot.auction.length > 25
                              ? `${lot.auction.substring(0, 25)}...`
                              : lot.auction}
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            {/* Section 6 */}

            {/* Section 7 */}
            <div className='w-[91rem] mt-24 lg:w-full'>
              <h1 className='text-black-900 text-xl font-bold font-[Helvetica] border-b-[0.3rem] border-[#eee4d6] pb-1.5 lg:text-2xl'>
                The highest price in this artist’s sold lots history
              </h1>
              <div className='grid grid-cols-4 flex-wrap mt-5 lg:grid-cols-2 lg:justify-between lg:gap-x-3.5 lg:gap-y-8 md:grid-cols-1'>
                {highestPriceSoldLotList?.map((lot) => (
                  <Link key={lot.seq} href={`/detail/${lot.lotUuid}`}>
                    <a>
                      <div className='w-[18.25rem] mr-[4.635rem] hover:opacity-40 transition-opacity lg:w-full lg:mr-0'>
                        <div className='relative w-full aspect-square'>
                          <Image
                            src={lot.lotImgSrc}
                            alt='Most Recent Sold Lot Image'
                            layout='fill'
                          />
                        </div>
                        <div className='relative bg-white w-11/12 -mt-16 px-6 py-7'>
                          <div className='text-black-200 text-2xl font-bold'>
                            $ {lot.price}
                          </div>
                          <div className='text-black-200'>LOT 56A</div>
                          <div className='text-black-200 text-xs font-[Helvetica]'>
                            {lot.sale.length > 25
                              ? `${lot.sale.substring(0, 25)}...`
                              : lot.sale}
                          </div>
                          <div className='text-black-100 text-base font-[Helvetica]'>
                            {lot.auction.length > 24
                              ? `${lot.auction.substring(0, 24)}...`
                              : lot.auction}
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            {/* Section 7 */}

            {/* Section 8 */}
            <div className='w-[91rem] mt-24 lg:w-full'>
              <h1 className='text-black-900 text-xl font-bold font-[Helvetica] border-b-[0.3rem] border-[#eee4d6] pb-1.5 lg:text-2xl'>
                Recent Issues
              </h1>
              <div className='col-start-start mt-5'>
                {recentIssueList?.map((issue) => (
                  <div
                    key={issue.seq}
                    onClick={() => window.open(issue.pressurl)}
                    className='flex-start-center w-full py-10 border-b border-[#eee4d6] cursor-pointer'
                  >
                    <div className='relative w-[15%] font-[Helvetica] text-black-900 md:w-[20%] md:text-center'>
                      {issue.date}
                      <div className='absolute top-20 hidden flex-center-center font-[Helvetica] whitespace-pre-line text-sm font-normal md:block'>
                        {issue.pressname}
                      </div>
                    </div>
                    <div className='w-[60%] text-[1.65rem] font-medium text-black-900 md:w-[75%]'>
                      {issue.content}
                    </div>
                    <div className='flex-center-center w-[20%] font-[Helvetica] font-bold whitespace-pre-line md:hidden'>
                      {issue.pressname}
                    </div>
                    <div className='w-[5%] text-xl'>
                      <RiShareBoxFill />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Section 8 */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

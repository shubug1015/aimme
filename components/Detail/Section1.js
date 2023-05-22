import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from 'react-share';
import { AnimatePresence, motion } from 'framer-motion';

export default function Section1({
  lotImages,
  lotTitle,
  lotArtistName,
  lotArtistBirth,
  hammerPrice,
  currentPrice,
  auctionCurrency,
  auctionEstimatedLow,
  auctionEstimatedHigh,
  lotNumber,
  auctionTitle,
  brushStroke,
  provenance,
  artworkCategory,
  artworkTimeline,
  artworkTimelineText,
}) {
  //
  // Image 5개
  const [focusedImg, setFocusedImg] = useState(1);
  const [sliceImg, setSliceImg] = useState(1);

  const clickImg = (imgSeq) => {
    setFocusedImg(imgSeq);
  };

  const prevImg = () => {
    if (focusedImg > 1) {
      setFocusedImg((prev) => prev - 1);

      if (focusedImg % 5 === 1) {
        setSliceImg((prev) => prev - 5);
      }
    } else {
      const quo = Math.floor(lotImages.length / 5);

      setFocusedImg(lotImages.length);
      setSliceImg(lotImages.length % 5 === 0 ? (quo - 1) * 5 + 1 : quo * 5 + 1);
    }
  };

  const nextImg = () => {
    if (focusedImg < lotImages.length) {
      setFocusedImg((prev) => prev + 1);

      if (focusedImg % 5 === 0) {
        setSliceImg((prev) => prev + 5);
      }
    } else {
      setFocusedImg(1);
      setSliceImg(1);
    }
  };

  //
  // Hammer Price 팝업
  const hammerPricePopupRef = useRef(null);
  const [hammerPricePopup, setHammerPricePopup] = useState(false);

  const openHammerPricePopup = () => {
    setHammerPricePopup(true);
  };

  useEffect(() => {
    if (!hammerPricePopup) {
      return;
    }
    const closeHammerPricePopup = (e) => {
      if (
        hammerPricePopupRef.current &&
        !hammerPricePopupRef.current.contains(e.target)
      ) {
        setHammerPricePopup(false);
      }
    };
    window.addEventListener('click', closeHammerPricePopup);
    return () => window.removeEventListener('click', closeHammerPricePopup);
  }, [hammerPricePopup]);

  //
  // Current Price 팝업
  const currentPricePopupRef = useRef(null);
  const [currentPricePopup, setCurrentPricePopup] = useState(false);

  const openCurrentPricePopup = () => {
    setCurrentPricePopup(true);
  };

  useEffect(() => {
    if (!currentPricePopup) {
      return;
    }
    const closeCurrentPricePopup = (e) => {
      if (
        currentPricePopupRef.current &&
        !currentPricePopupRef.current.contains(e.target)
      ) {
        setCurrentPricePopup(false);
      }
    };
    window.addEventListener('click', closeCurrentPricePopup);
    return () => window.removeEventListener('click', closeCurrentPricePopup);
  }, [currentPricePopup]);

  // Share 팝업 관리
  const sharePopupRef = useRef(null);
  const [sharePopup, setSharePopup] = useState(false);

  const openSharePopup = () => {
    setSharePopup(true);
  };

  useEffect(() => {
    if (!sharePopup) {
      return;
    }
    const closeSharePopup = (e) => {
      if (sharePopupRef.current && !sharePopupRef.current.contains(e.target)) {
        setSharePopup(false);
      }
    };
    window.addEventListener('click', closeSharePopup);
    return () => window.removeEventListener('click', closeSharePopup);
  }, [sharePopup]);

  //
  // Auction House 팝업
  const auctionHousePopupRef = useRef(null);
  const [auctionHousePopup, setAuctionHousePopup] = useState(false);

  const openAuctionHousePopup = () => {
    setAuctionHousePopup(true);
  };

  useEffect(() => {
    if (!auctionHousePopup) {
      return;
    }
    const closeAuctionHousePopup = (e) => {
      if (
        auctionHousePopupRef.current &&
        !auctionHousePopupRef.current.contains(e.target)
      ) {
        setAuctionHousePopup(false);
      }
    };
    window.addEventListener('click', closeAuctionHousePopup);
    return () => window.removeEventListener('click', closeAuctionHousePopup);
  }, [auctionHousePopup]);

  //
  // LOT Number 팝업
  const lotPopupRef = useRef(null);
  const [lotPopup, setLotPopup] = useState(false);

  const openLotPopup = () => {
    setLotPopup(true);
  };

  useEffect(() => {
    if (!lotPopup) {
      return;
    }
    const closeLotPopup = (e) => {
      if (lotPopupRef.current && !lotPopupRef.current.contains(e.target)) {
        setLotPopup(false);
      }
    };
    window.addEventListener('click', closeLotPopup);
    return () => window.removeEventListener('click', closeLotPopup);
  }, [lotPopup]);

  const popupVar = {
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

  // console.log(
  //   lotImages,
  //   focusedImg,
  //   lotImages?.filter(
  //     (img) => +img.imgSeq >= focusedImg && +img.imgSeq < focusedImg + 5
  //   )
  // );

  return (
    <div className='bg-beige-200 w-screen pt-20 pb-16 lg:px-10 lg:pt-0 md:px-0 md:pb-0'>
      <div className='relative flex-start-center bg-white w-368 pt-14 pb-16 pl-64 pr-24 lg:w-full lg:px-[2.375rem] lg:col-center-center md:px-4 md:pt-4 md:bg-beige-200'>
        {/* pc 공유하기 버튼 */}
        <div className='absolute top-4 right-14 w-6 h-5 lg:hidden md:hidden'>
          <div
            onClick={openSharePopup}
            className='relative w-6 h-6 mr-4 cursor-pointer'
          >
            <Image src='/icons/share.png' alt='Share Image' layout='fill' />
            {sharePopup && (
              <div
                ref={sharePopupRef}
                className='absolute top-8 right-0 w-80 p-4 bg-white z-[1] font-[Helvetica] rounded-[4px] shadow-md cursor-default'
              >
                <div className='text-xl'>Share</div>
                <div className='grid grid-cols-2 gap-y-4 mt-7'>
                  <FacebookShareButton url={'https://naver.com'}>
                    <div className='flex-start-center'>
                      <div className='relative w-10 h-10'>
                        <Image
                          src={`/icons/share/Facebook.png`}
                          alt='Share Icon Image'
                          layout='fill'
                        />
                      </div>
                      <div>Facebook</div>
                    </div>
                  </FacebookShareButton>

                  <LinkedinShareButton url={'https://naver.com'}>
                    <div className='flex-start-center'>
                      <div className='relative w-10 h-10'>
                        <Image
                          src={`/icons/share/Linked in.png`}
                          alt='Share Icon Image'
                          layout='fill'
                        />
                      </div>
                      <div>Linked in</div>
                    </div>
                  </LinkedinShareButton>

                  <TwitterShareButton url={'https://naver.com'}>
                    <div className='flex-start-center'>
                      <div className='relative w-10 h-10'>
                        <Image
                          src={`/icons/share/Twitter.png`}
                          alt='Share Icon Image'
                          layout='fill'
                        />
                      </div>
                      <div>Twitter</div>
                    </div>
                  </TwitterShareButton>

                  <PinterestShareButton
                    url={'https://naver.com'}
                    media={lotImages[0].imgSrc}
                  >
                    <div className='flex-start-center'>
                      <div className='relative w-10 h-10'>
                        <Image
                          src={`/icons/share/Pinterest.png`}
                          alt='Share Icon Image'
                          layout='fill'
                        />
                      </div>
                      <div>Pinterest</div>
                    </div>
                  </PinterestShareButton>

                  <EmailShareButton url={'https://naver.com'}>
                    <div className='flex-start-center'>
                      <div className='relative w-10 h-10'>
                        <Image
                          src={`/icons/share/Mail.png`}
                          alt='Share Icon Image'
                          layout='fill'
                        />
                      </div>
                      <div>Mail</div>
                    </div>
                  </EmailShareButton>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Images Start*/}
        <div className='lg:w-full'>
          <div className='relative flex-center-center bg-beige-300 w-144 aspect-square lg:w-full'>
            {lotImages && (
              <Image
                src={lotImages[focusedImg - 1]?.imgSrc}
                alt='Detail Image'
                layout='fill'
                objectFit='cover'
              />
            )}
          </div>
          <div className='flex-center-center mt-2 text-sm md:hidden'>
            <MdOutlineArrowBackIosNew
              onClick={() => prevImg()}
              className='text-black-50 mr-4 cursor-pointer'
            />
            <div className='flex space-x-2'>
              {lotImages
                ?.filter(
                  (img) => +img.imgSeq >= sliceImg && +img.imgSeq < sliceImg + 5
                )
                .map((img) => (
                  <div
                    key={img.imgSeq}
                    onClick={() => clickImg(+img.imgSeq)}
                    className={`relative flex-center-center bg-beige-300 w-12 h-12 cursor-pointer ${
                      +img.imgSeq === focusedImg && 'border-2 border-brown'
                    }`}
                  >
                    <Image
                      src={img.imgSrc}
                      alt='Detail Image'
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                ))}
            </div>
            <MdOutlineArrowForwardIos
              onClick={() => nextImg()}
              className='text-black-50 ml-4 text-sm cursor-pointer'
            />
          </div>
        </div>
        {/* Images End */}

        {/* Infos Start */}
        <div className='ml-24 lg:ml-[2.375rem] lg:w-full lg:mt-9 lg:relative md:ml-0'>
          {/* mobile 공유하기 버튼 */}
          <div className='hidden absolute top-0 right-0 w-6 h-5 lg:block md:-top-5'>
            <div
              onClick={openSharePopup}
              className='relative w-5 h-5 mr-4 cursor-pointer'
            >
              <Image src='/icons/share.png' alt='Share Image' layout='fill' />

              {sharePopup && (
                <div
                  ref={sharePopupRef}
                  className='absolute top-8 right-0 w-80 p-4 bg-white z-[1] font-[Helvetica] rounded-[4px] shadow-md cursor-default'
                >
                  <div className='text-xl'>Share</div>
                  <div className='grid grid-cols-2 gap-y-4 mt-7'>
                    <FacebookShareButton url={'https://naver.com'}>
                      <div className='flex-start-center'>
                        <div className='relative w-10 h-10'>
                          <Image
                            src={`/icons/share/Facebook.png`}
                            alt='Share Icon Image'
                            layout='fill'
                          />
                        </div>
                        <div>Facebook</div>
                      </div>
                    </FacebookShareButton>

                    <LinkedinShareButton url={'https://naver.com'}>
                      <div className='flex-start-center'>
                        <div className='relative w-10 h-10'>
                          <Image
                            src={`/icons/share/Linked in.png`}
                            alt='Share Icon Image'
                            layout='fill'
                          />
                        </div>
                        <div>Linked in</div>
                      </div>
                    </LinkedinShareButton>

                    <TwitterShareButton url={'https://naver.com'}>
                      <div className='flex-start-center'>
                        <div className='relative w-10 h-10'>
                          <Image
                            src={`/icons/share/Twitter.png`}
                            alt='Share Icon Image'
                            layout='fill'
                          />
                        </div>
                        <div>Twitter</div>
                      </div>
                    </TwitterShareButton>

                    <PinterestShareButton
                      url={'https://naver.com'}
                      media={lotImages[0].imgSrc}
                    >
                      <div className='flex-start-center'>
                        <div className='relative w-10 h-10'>
                          <Image
                            src={`/icons/share/Pinterest.png`}
                            alt='Share Icon Image'
                            layout='fill'
                          />
                        </div>
                        <div>Pinterest</div>
                      </div>
                    </PinterestShareButton>

                    <EmailShareButton url={'https://naver.com'}>
                      <div className='flex-start-center'>
                        <div className='relative w-10 h-10'>
                          <Image
                            src={`/icons/share/Mail.png`}
                            alt='Share Icon Image'
                            layout='fill'
                          />
                        </div>
                        <div>Mail</div>
                      </div>
                    </EmailShareButton>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => window.print()}
            className='hidden absolute top-4 right-2 w-6 h-5 lg:block md:top-0 cursor-pointer md:hidden'
          >
            <Image src='/icons/print.png' alt='Print Image' layout='fill' />
          </div>

          {/* 1 */}
          <div className='border-b border-[#00000080] lg:w-[30rem] md:w-full'>
            <h1 className='text-4xl font-bold md:text-[2rem]'>{lotTitle}</h1>
            <div className='text-black-200 font-medium font-[Helvetica] mt-2 mb-0.5'>
              {lotArtistName}
            </div>
            <div className='text-xs text-black-200 font-medium font-[Helvetica] mb-4'>
              {lotArtistBirth}
            </div>
          </div>

          {/* 2 */}
          <div className='flex-start-center text-black-400 border-b border-[#00000033] pt-5 pb-2 lg:w-[30rem] md:w-full'>
            {/*  */}
            <div className='mr-8'>
              <div className='flex-start-center mb-3'>
                <span className='mr-2 font-[Helvetica] md:text-sm'>
                  Hammer Price
                </span>
                <div
                  onClick={openHammerPricePopup}
                  className='relative flex-center-center'
                >
                  <AiOutlineQuestionCircle
                    className='text-xl cursor-pointer hover:opacity-40 transition-opacity'
                    style={{
                      opacity: currentPricePopup && 0.4,
                    }}
                  />

                  <AnimatePresence>
                    {hammerPricePopup && (
                      <motion.div
                        ref={hammerPricePopupRef}
                        className='absolute top-8 w-80 p-4 bg-white z-[1] font-[Helvetica] rounded-[4px] shadow-md'
                        variants={popupVar}
                        initial='invisible'
                        animate='visible'
                        exit='exit'
                      >
                        <AiOutlineQuestionCircle className='text-lg ' />
                        Hammer price is auction house's result price and not
                        sure including buyer's premium, any applicable taxes or
                        artist's resale right. Please check the auction house's
                        website for the correct information.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className='text-4xl font-bold md:text-2xl'>
                {auctionCurrency} {hammerPrice}
              </div>
            </div>
            {/*  */}

            {/*  */}
            <div>
              <div className='flex-start-center mb-3'>
                <span className='mr-2 font-[Helvetica] md:text-sm'>
                  Current Price
                </span>
                <div
                  onClick={openCurrentPricePopup}
                  className='relative flex-center-center'
                >
                  <AiOutlineQuestionCircle
                    className='text-xl cursor-pointer hover:opacity-40 transition-opacity'
                    style={{
                      opacity: currentPricePopup && 0.4,
                    }}
                  />

                  <AnimatePresence>
                    {currentPricePopup && (
                      <motion.div
                        ref={currentPricePopupRef}
                        className='absolute top-8 w-80 p-4 bg-white z-[1] font-[Helvetica] rounded-[4px] shadow-md'
                        variants={popupVar}
                        initial='invisible'
                        animate='visible'
                        exit='exit'
                      >
                        <AiOutlineQuestionCircle className='text-lg ' />
                        What is this price? This is NOT a value of the art
                        market. It reflected inflation and the exchage rate
                        value of the US dollars. Aimme wish this price will be
                        useful to your decision of buy or sell an artwork.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className='text-4xl font-bold md:text-2xl'>
                ${currentPrice}
              </div>
            </div>
            {/*  */}
          </div>

          {/* 3 */}
          <div className='pt-5 mb-5'>
            <div className='flex-start-center mb-2'>
              <span className='mr-2 font-medium font-[Helvetica]'>
                Auction House’s Estimate
              </span>
              <div
                onClick={openAuctionHousePopup}
                className='relative flex-center-center'
              >
                <AiOutlineQuestionCircle
                  className='text-xl cursor-pointer hover:opacity-40 transition-opacity'
                  style={{
                    opacity: currentPricePopup && 0.4,
                  }}
                />

                <AnimatePresence>
                  {auctionHousePopup && (
                    <motion.div
                      ref={auctionHousePopupRef}
                      className='absolute -top-4 left-10 w-80 p-4 bg-white z-[1] font-[Helvetica] rounded-[4px] shadow-md'
                      variants={popupVar}
                      initial='invisible'
                      animate='visible'
                      exit='exit'
                    >
                      <AiOutlineQuestionCircle className='text-lg ' />
                      This price is auction house's estimate price. Estimates do
                      not reflect the final hammer price and do not include
                      buyer's premium, any applicable taxes or artist's resale
                      right. Please check the auction house's catalogue for more
                      information. Aimme will estimate the price through Market
                      Analysis Soon!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className='font-bold'>
              {auctionCurrency} {auctionEstimatedLow} ~ {auctionEstimatedHigh}
            </div>
          </div>

          {/* 4 */}
          <div>
            <div className='flex-start-center mb-2.5'>
              <span className='mr-2 font-medium font-[Helvetica]'>
                LOT {lotNumber}
              </span>
              {/* <div
                onClick={openLotPopup}
                className='relative flex-center-center'
              >
                <AiOutlineQuestionCircle
                  className='text-xl cursor-pointer hover:opacity-40 transition-opacity'
                  style={{
                    opacity: currentPricePopup && 0.4,
                  }}
                />

                {lotPopup && (
                  <div
                    ref={lotPopupRef}
                    className='absolute top-8 w-80 p-4 bg-white z-[1] font-[Helvetica] rounded-[4px] shadow-md'
                  >
                    <AiOutlineQuestionCircle className='text-lg ' />n its What
                    is this price? This is NOT a value of the art market. It
                    reflected inflation and the exchage rate value of the US
                    dollars. Aimme wish this price will be useful to your
                    decision of buy or sell an artwork.
                  </div>
                )}
              </div> */}
            </div>
            <div className='font-medium font-[Helvetica]'>{auctionTitle}</div>
          </div>

          {/* 5 */}
          <div className='col-start-center bg-beige-200 mt-9 px-8 py-5 lg:w-[30rem] md:w-full md:bg-white'>
            <div className='text-3xl font-medium mb-2 md:text-2xl'>
              Become Aimme’s Early-Bird
            </div>
            <div className='font-medium'>
              We aime to officially release our website next year. Register
              early-bird now to try our service and even get a 50% discount!
            </div>
            <div
              onClick={() =>
                window.open('https://kvn062bilo5.typeform.com/to/L1Ij7dSu')
              }
              className='flex-center-center w-full bg-white border-solid border border-black-400 rounded mt-3.5 py-4 font-bold font-[Helvetica] hover:bg-[#ff7979] hover:border-[#ff7979] hover:text-white cursor-pointer transition-all'
            >
              Sign up now
            </div>
          </div>
        </div>
        {/* Infos End */}
      </div>

      <div className='pl-[58rem] pt-16 pb-16 lg:pl-0 md:px-4 md:pb-7'>
        <h1 className='border-b border-black-400 w-[38rem] text-2xl pb-2 md:w-full'>
          Artwork Overview and Analytics
        </h1>
        {/*  */}
        <h2 className='mt-6 font-[Helvetica] w-[38rem] lg:text-2xl lg:font-medium md:text-base md:w-full md:pr-12'>
          {lotTitle}
        </h2>
        <div className='text-[#aaaaaa] w-[38rem] font-[Helvetica] lg:text-xl lg:mt-3 md:text-base md:w-full md:pr-12'>
          {brushStroke}
        </div>
        {/*  */}

        {/*  */}
        <h2 className='mt-7 font-[Helvetica] w-[38rem] lg:text-2xl lg:font-medium md:text-base md:w-full md:pr-12'>
          Provenance
        </h2>
        <div className='text-[#aaaaaa] font-[Helvetica] w-[38rem] lg:text-xl lg:mt-3 md:text-base md:w-full md:pr-12'>
          {provenance}
        </div>
        {/*  */}

        {/*  */}
        <h2 className='mt-8 text-black-900 font-bold font-[Helvetica] lg:text-2xl md:text-base'>
          Artwork Category
        </h2>
        <div className='text-navy-400 text-lg font-bold font-[Helvetica] lg:text-2xl md:text-base'>
          {artworkCategory?.map((cate, index) => (
            <div key={index}>{cate.category}</div>
          ))}
        </div>
        {/*  */}

        {/*  */}
        <div className='mt-7'>
          <h2 className='text-black-900 font-bold font-[Helvetica] lg:text-2xl md:text-base'>
            Artwork Timeline
          </h2>
          {/* Graph Start */}
          <div className='flex-start-center text-white font-bold font-[Helvetica] ml-10 md:ml-0'>
            <div className='relative flex-center-center w-22 h-22 border border-navy-400 rounded-full md:w-18 md:h-18'>
              <div className='col-center-center w-20 h-20 bg-navy-400 rounded-full md:w-16 md:h-16 md:text-xs'>
                <div>{artworkTimeline && artworkTimeline[0].currency}</div>
                <div>{artworkTimeline && artworkTimeline[0].price}</div>
                <div className='absolute top-1/2 -right-0.88 -translate-y-1/2 w-1.5 h-1.5 bg-white border border-navy-400 rounded-full' />
              </div>
            </div>

            <div className='w-16 h-px bg-navy-400 -rotate-18 mb-5' />

            <div className='relative flex-center-center w-22 h-22 border border-navy-400 rounded-full mb-10 md:w-18 md:h-18'>
              <div className='col-center-center w-20 h-20 bg-navy-400 rounded-full text-white md:w-16 md:h-16 md:text-xs'>
                <div>{artworkTimeline && artworkTimeline[1].currency}</div>
                <div>{artworkTimeline && artworkTimeline[1].price}</div>
                <div className='absolute top-1/2 -left-0.88 -translate-y-1/2 w-1.5 h-1.5 bg-white border border-navy-400 rounded-full' />
                <div className='absolute top-1/2 -right-0.88 -translate-y-1/2 w-1.5 h-1.5 bg-white border border-navy-400 rounded-full' />
              </div>
            </div>

            <div className='w-16 h-px bg-navy-400 -rotate-18 mb-16' />

            <div className='relative flex-center-center w-22 h-22 border border-navy-400 rounded-full mb-20 md:w-18 md:h-18'>
              <div className='col-center-center w-20 h-20 bg-navy-400 rounded-full text-white md:w-16 md:h-16 md:text-xs'>
                <div>{artworkTimeline && artworkTimeline[2].currency}</div>
                <div>{artworkTimeline && artworkTimeline[2].price}</div>
                <div className='absolute top-1/2 -left-0.88 -translate-y-1/2 w-1.5 h-1.5 bg-white border border-navy-400 rounded-full' />
              </div>
            </div>
          </div>

          <div className='flex-start-center text-navy-400 font-bold font-[Helvetica] -mt-8'>
            <div className='w-14 h-[1px] bg-[#bbcbd5] md:w-2' />
            <div className='flex-center-center mx-2.5'>
              {artworkTimeline && artworkTimeline[0].year}
            </div>
            <div className='w-24 h-[1px] bg-[#bbcbd5] md:w-20' />
            <div className='flex-center-center mx-2.5'>
              {artworkTimeline && artworkTimeline[1].year}
            </div>
            <div className='w-24 h-[1px] bg-[#bbcbd5] md:w-20' />
            <div className='flex-center-center mx-2.5'>
              {artworkTimeline && artworkTimeline[2].year}
            </div>
            <div className='w-14 h-[1px] bg-[#bbcbd5] md:w-2' />
          </div>
          {/* Graph End */}
          <div className='font-[Helvetica] mt-5 lg:text-xl md:text-base'>
            {artworkTimelineText?.map((timeline, index) => (
              <div key={index}>{timeline.text}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import Slider from 'react-slick';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { mainApi } from 'api';
import Image from 'next/image';
import { random } from 'libs/utils';

export default function Section3() {
  const { isLoading: loading1, data: analyzedArtworks } = useQuery(
    'analyzedArtworks',
    () =>
      mainApi.listData({
        pageNo: 1,
        perPage: 20,
        sortType: random(1, 6),
      })
  );

  const { isLoading: loading2, data: auctionResult } = useQuery(
    'auctionResult',
    () =>
      mainApi.listData({
        pageNo: 1,
        perPage: 20,
        sortType: 1,
        artistSeq: 139,
      })
  );

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className + ' !left-[17%] lg:!left-[23%] md:!hidden group'}
        style={{
          ...style,
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '50%',
          width: 55,
          height: 55,
          color: 'rgba(154, 154, 154, 0.8)',
          fontSize: 30,
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <div className='relative w-full h-full'>
          <Image
            src='/icons/PrevArrow.png'
            alt='Prev Arrow Icon'
            layout='fill'
            className='group-hover:!hidden'
          />
          <Image
            src='/icons/PrevArrowHover.png'
            alt='Prev Arrow Icon'
            layout='fill'
            className='!hidden group-hover:!block'
          />
        </div>
      </div>
    );
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className + ' !right-[17%] lg:!right-[23%] md:!hidden group'}
        style={{
          ...style,
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          width: 55,
          height: 55,
          color: 'rgba(154, 154, 154, 0.8)',
          fontSize: 30,
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <div className='relative w-full h-full'>
          <Image
            src='/icons/NextArrow.png'
            alt='Next Arrow Icon'
            layout='fill'
            className='group-hover:!hidden'
          />
          <Image
            src='/icons/NextArrowHover.png'
            alt='Next Arrow Icon'
            layout='fill'
            className='!hidden group-hover:!block'
          />
        </div>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const tabletSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const mobileSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className='x-screen py-24 bg-[#f6f1eb] lg:py-12'>
      {/* Slider 1  Start */}
      <div className='md:px-4'>
        <h1 className='ml-24 mb-7 text-4xl font-bold lg:ml-10 lg:text-3xl md:text-[2rem] md:ml-[0.5rem]'>
          Find out Analyzed artwork of Aimme
        </h1>

        {/* 슬라이더 */}
        {loading1 ? (
          <Slider {...settings} className='relative -mx-64 md:mx-0'>
            {[0, 1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className='px-2 animate-twinkle'>
                <div className='relative w-full aspect-square bg-beige-400'></div>
                <div className='relative bg-beige-300 w-11/12 -mt-16 px-6 py-7 space-y-0.5'>
                  <div className='w-fit bg-beige-400 text-beige-400 text-xs font-bold'>
                    USD 999999999999999
                  </div>
                  <div className='w-fit bg-beige-400 text-beige-400 text-xs'>
                    AAAAAAAAAA
                  </div>
                  <div className='w-fit bg-beige-400 text-beige-400 text-xs font-[Helvetica]'>
                    b.1957
                  </div>
                  <div className='w-fit bg-beige-400 text-beige-400 text-xs font-[Helvetica]'>
                    2019 Sotheby's New york New york
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <Slider {...settings} className='relative -mx-64 md:mx-0'>
            {analyzedArtworks?.resultList?.map((artwork, index) => (
              <Link key={index} href={`/detail/${artwork.lotUuid}`}>
                <a>
                  <div className='px-2 hover:opacity-40 transition-opacity'>
                    <div className='relative w-full aspect-square'>
                      <Image
                        src={artwork.repImageUrl}
                        alt='Alalyzed Artworks Image'
                        layout='fill'
                      />
                    </div>
                    <div className='relative bg-white w-11/12 -mt-16 px-6 py-7'>
                      <div className='text-black-200 text-2xl font-bold'>
                        {artwork.currency} {artwork.price}
                      </div>
                      <div className='text-black-200 text-base'>
                        {artwork.artistName.length > 30
                          ? `${artwork.artistName.substring(0, 30)}...`
                          : artwork.artistName}
                      </div>
                      <div className='text-black-200 text-xs font-[Helvetica]'>
                        {artwork.birth}
                      </div>
                      <div className='text-black-100 text-base font-[Helvetica]'>
                        {artwork.saleInfo.length > 30
                          ? `${artwork.saleInfo.substring(0, 30)}...`
                          : artwork.saleInfo}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </Slider>
        )}
      </div>
      {/* Slider 1  End */}

      {/* Slider 2  Start */}
      <div className='mt-16 md:mx-4'>
        <h1 className='ml-24  mb-7 text-4xl font-bold lg:ml-10 lg:text-3xl md:text-[2rem] md:ml-[0.5rem]'>
          Auction Result: {auctionResult?.resultList[0].artistName}
        </h1>

        {/* 슬라이더 */}
        {loading2 ? (
          <Slider {...settings} className='relative -mx-64 md:mx-0'>
            {[0, 1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className='px-2 animate-twinkle'>
                <div className='relative w-full aspect-square bg-beige-400'></div>
                <div className='relative bg-beige-300 w-11/12 -mt-16 px-6 py-7 space-y-0.5'>
                  <div className='w-fit bg-beige-400 text-beige-400 text-xs font-bold'>
                    USD 999999999999999
                  </div>
                  <div className='w-fit bg-beige-400 text-beige-400 text-xs'>
                    AAAAAAAAAA
                  </div>
                  <div className='w-fit bg-beige-400 text-beige-400 text-xs font-[Helvetica]'>
                    b.1957
                  </div>
                  <div className='w-fit bg-beige-400 text-beige-400 text-xs font-[Helvetica]'>
                    2019 Sotheby's New york New york
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <Slider {...settings} className='relative -mx-64 md:mx-0'>
            {auctionResult?.resultList?.map((artwork, index) => (
              <Link key={index} href={`/detail/${artwork.lotUuid}`}>
                <a>
                  <div className='px-2 hover:opacity-40 transition-opacity'>
                    <div className='relative w-full aspect-square'>
                      <Image
                        src={artwork.repImageUrl}
                        alt='Alalyzed Artworks Image'
                        layout='fill'
                      />
                    </div>
                    <div className='relative bg-white w-11/12 -mt-16 px-6 py-7'>
                      <div className='text-black-200 text-2xl font-bold'>
                        {artwork.currency} {artwork.price}
                      </div>
                      <div className='text-black-200 text-base'>
                        {artwork.artistName.length > 30
                          ? `${artwork.artistName.substring(0, 30)}...`
                          : artwork.artistName}
                      </div>
                      <div className='text-black-200 text-xs font-[Helvetica]'>
                        {artwork.birth}
                      </div>
                      <div className='text-black-100 text-base font-[Helvetica]'>
                        {artwork.saleInfo.length > 30
                          ? `${artwork.saleInfo.substring(0, 30)}...`
                          : artwork.saleInfo}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </Slider>
        )}
      </div>
      {/* Slider 2  End */}
    </div>
  );
}

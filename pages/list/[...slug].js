import Seo from '@components/Seo';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiOutlineQuestionCircle,
} from 'react-icons/ai';
import { IoIosCloseCircle } from 'react-icons/io';
import { Fragment, useEffect, useRef, useState } from 'react';
import { listApi } from 'api';
import { useQuery } from 'react-query';
import Image from 'next/image';
import { cls, comma, conditionalStyle } from 'libs/utils';
import PageBar from '@components/PageBar';
import Link from 'next/link';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from 'react-share';
import { AnimatePresence, motion } from 'framer-motion';

export default function List({ params }) {
  // Top Artists api
  const { isLoading, data: topArtists } = useQuery('topArtists', () =>
    listApi.topArtists()
  );
  const [artistSeqParam, pageNum] = params;
  const [selectedTopArtists, setSelectedTopArtists] = useState([
    artistSeqParam,
  ]);

  // Search Autocomplete api
  const [autocompletedArtists, setAutocompletedArtists] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchAlert, setSearchAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtists, setSelectedArtists] = useState([]);

  const removeDuplicateSeq = (arr) => {
    return arr.filter((seq, index) => arr.indexOf(seq) === index);
  };

  const selectedAllArtists = [
    ...selectedTopArtists,
    ...selectedArtists.map((artist) => JSON.stringify(artist.seq)),
  ];

  const artistSeq = removeDuplicateSeq(selectedAllArtists).join(',');

  // 1900부터 현재년도까지의 year, month array
  const nowDate = new Date();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth();
  const startYear = 1900;
  const yearList = [...Array(nowYear - startYear + 1)].map((_, index) => ({
    id: index,
    value: index + startYear,
  }));
  const monthList = Array.from({ length: 12 }, (e, i) => {
    const month = new Date(null, i + 1, null).toLocaleDateString('en', {
      month: 'long',
    });
    return { id: i, value: month };
  });

  // From Filter
  const [fromOpen, setFromOpen] = useState(false);
  const [fromYearOpen, setFromYearOpen] = useState(false);
  const [fromYear, setFromYear] = useState({ id: 0, value: 1900 });
  const [fromMonth, setFromMonth] = useState({ id: 0, value: 'January' });
  const startDate = `${fromYear.value}${fromMonth.id < 10 && '0'}${
    fromMonth.id + 1
  }`;

  // To Filter
  const [toOpen, setToOpen] = useState(false);
  const [toYearOpen, setToYearOpen] = useState(false);
  const [toYear, setToYear] = useState({
    id: nowYear - startYear,
    value: nowYear,
  });
  const [toMonth, setToMonth] = useState(monthList[nowMonth]);
  const endDate = `${toYear.value}${toMonth.id < 10 && '0'}${toMonth.id + 1}`;

  // Price Filter
  const [priceOpen, setPriceOpen] = useState(false);
  const [minPriceTmp, setMinPriceTmp] = useState('');
  const [maxPriceTmp, setMaxPriceTmp] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Auction House Filter
  const auctionList = [
    { id: 0, name: 'Christie’s' },
    { id: 1, name: 'Sotheby’s' },
  ];
  const [auctionOpen, setAuctionOpen] = useState(false);
  const [checkedAuctionList, setCheckedAuctionList] = useState(auctionList);
  const auctionType = checkedAuctionList
    .map((auction) => JSON.stringify(auction.id + 1))
    .join(',');
  const [auctionAlert, setAuctionAlert] = useState(false);

  // Location House Filter
  const locationList = [
    { id: 0, order: 0, name: 'New York' },
    { id: 1, order: 1, name: 'London' },
    { id: 2, order: 2, name: 'Hong Kong' },
    { id: 3, order: 4, name: 'Paris' },
    { id: 4, order: 8, name: 'Amsterdam' },
    { id: 5, order: 5, name: 'Milan' },
    { id: 6, order: 7, name: 'Geneva' },
    { id: 7, order: 6, name: 'Zurich' },
    { id: 8, order: 9, name: 'Shanghi' },
    { id: 9, order: 10, name: 'Dubai' },
    { id: 10, order: 11, name: 'Doha' },
    { id: 11, order: 3, name: 'Online' },
  ];
  const [locationOpen, setLocationOpen] = useState(false);
  const [checkedLocationList, setCheckedLocationList] = useState(locationList);
  const locationType = checkedLocationList
    .map((location) => JSON.stringify(location.id + 1))
    .join(',');
  const [locationAlert, setLocationAlert] = useState(false);

  // Include Unsold Works
  const [includeUnsold, setIncludeUnsold] = useState(false);
  const isIncludeUnsold = includeUnsold ? 'Y' : 'N';

  // View by Current Price
  const [currentPrice, setCurrentPrice] = useState(false);
  const isViewCurrentCurrency = currentPrice ? 'Y' : 'N';

  // Sort by
  const sortTypeList = [
    {
      id: 0,
      type: 'Price : Highest First',
    },
    {
      id: 1,
      type: 'Price : Lowest First',
    },
    {
      id: 2,
      type: 'Date : Latest First',
    },
    {
      id: 3,
      type: 'Date : Oldest First',
    },
    {
      id: 4,
      type: 'Scale : Biggest First',
    },
    {
      id: 5,
      type: 'Scale : Smallest First',
    },
  ];
  const [sortOpen, setSortOpen] = useState(false);
  const [sortType, setSortType] = useState({
    id: 0,
    type: 'Price : Highest First',
  });

  // Search Items api
  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState([]);

  //
  //

  const avgPricePopupRef = useRef(null);
  const [avgPricePopup, setAvgPricePopup] = useState(false);

  const currentPricePopupRef = useRef(null);
  const [currentPricePopup, setCurrentPricePopup] = useState(false);

  const sharePopupRef = useRef(null);
  const [sharePopup, setSharePopup] = useState(false);

  //
  //

  // Top Artists 선택
  const selectAllTopArtists = () => {
    if (selectedTopArtists.length === topArtists.length) {
      setSelectedTopArtists([]);
    } else {
      setSelectedTopArtists(
        topArtists.map((artist) => JSON.stringify(artist.artistSeq))
      );
    }
  };

  const selectTopArtists = (num) => {
    if (selectedTopArtists.includes(num)) {
      setSelectedTopArtists(
        selectedTopArtists.filter((artist) => artist !== num)
      );
    } else {
      setSelectedTopArtists([...selectedTopArtists, num]);
    }
  };

  // 검색어 setstate
  const handleSearchTerm = (e) => {
    const {
      target: { value },
    } = e;

    getAutocompletedArtists(value);
    setSearchTerm(value);
  };

  // 자동완성 api 호출
  const getAutocompletedArtists = async (value) => {
    const data = await listApi.autocompletedArtists(value);

    setAutocompletedArtists(data);
  };

  // 자동완성 artist 선택
  const selectArtist = (seq, name) => {
    if (!selectedArtists.map((artist) => artist.seq).includes(seq)) {
      setSelectedArtists([...selectedArtists, { seq, name }]);
    }
  };

  // 자동완성 artist 삭제
  const deleteArtist = (seq) => {
    setSelectedArtists(selectedArtists.filter((artist) => artist.seq !== seq));
  };

  const searchRef = useRef(null);

  useEffect(() => {
    if (!searchOpen) {
      return;
    }
    const closeSearch = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('click', closeSearch);
    return () => window.removeEventListener('click', closeSearch);
  }, [searchOpen]);

  //
  //

  // From 달력 toggle
  const toggleFromCalendar = () => {
    setFromOpen((prev) => !prev);
    setToOpen((prev) => !prev);

    if (!fromOpen) {
      setPriceOpen(false);
      setAuctionOpen(false);
      setLocationOpen(false);
    }
  };

  const fromRef = useRef(null);

  useEffect(() => {
    if (!fromOpen) {
      return;
    }
    const closeFrom = (e) => {
      if (
        fromRef.current &&
        !fromRef.current.contains(e.target) &&
        !fromYearOpen &&
        !toYearOpen
      ) {
        setFromOpen(false);
        setToOpen(false);
      }
    };
    window.addEventListener('click', closeFrom);
    return () => window.removeEventListener('click', closeFrom);
  }, [fromOpen, toOpen, fromYearOpen, toYearOpen]);

  // From 달력의 연도 toggle
  const toggleFromYearCalendar = () => {
    setFromYearOpen((prev) => !prev);
  };

  // From 연도 지정
  const selectFromYear = (id, value) => {
    setFromYear({ id, value });
  };

  // From 달 지정
  const selectFromMonth = (id, value) => {
    setFromMonth({ id, value });
  };

  // To 달력 toggle
  const toggleToCalendar = () => {
    setFromOpen((prev) => !prev);
    setToOpen((prev) => !prev);

    if (!toOpen) {
      setPriceOpen(false);
      setAuctionOpen(false);
      setLocationOpen(false);
    }
  };

  // To 달력의 연도 toggle
  const toggleToYearCalendar = () => {
    setToYearOpen((prev) => !prev);
  };

  // To 연도 지정
  const selectToYear = (id, value) => {
    setToYear({ id, value });
  };

  // To 달 지정
  const selectToMonth = (id, value) => {
    setToMonth({ id, value });
  };

  // Price toggle
  const togglePrice = () => {
    setPriceOpen((prev) => !prev);

    if (!priceOpen) {
      setFromOpen(false);
      setToOpen(false);
      setAuctionOpen(false);
      setLocationOpen(false);
    }
  };

  const priceRef = useRef(null);

  useEffect(() => {
    if (!priceOpen) {
      return;
    }
    const closePrice = (e) => {
      if (priceRef.current && !priceRef.current.contains(e.target)) {
        setPriceOpen(false);
      }
    };
    window.addEventListener('click', closePrice);
    return () => window.removeEventListener('click', closePrice);
  }, [priceOpen]);

  // Min Price 임시 저장
  const handleMinPrice = (e) => {
    const {
      target: { value },
    } = e;

    const valueNum = +value.replaceAll(',', '');

    if (!isNaN(valueNum)) {
      const localeString = valueNum.toLocaleString();

      setMinPriceTmp(localeString);
    }
  };

  // Max Price 임시 저장
  const handleMaxPrice = (e) => {
    const {
      target: { value },
    } = e;

    const valueNum = +value.replaceAll(',', '');

    if (!isNaN(valueNum)) {
      const localeString = valueNum.toLocaleString();

      setMaxPriceTmp(localeString);
    }
  };

  // Min, Max Price 저장
  const savePrice = () => {
    setMinPrice(minPriceTmp);
    setMaxPrice(maxPriceTmp);
    setPriceOpen(false);
  };

  // Auction House Toggle
  const toggleAuction = () => {
    setAuctionOpen((prev) => !prev);

    if (!auctionOpen) {
      setFromOpen(false);
      setToOpen(false);
      setPriceOpen(false);
      setLocationOpen(false);
    }
  };

  const auctionRef = useRef(null);

  useEffect(() => {
    if (!auctionOpen) {
      return;
    }
    const closeAuction = (e) => {
      if (auctionRef.current && !auctionRef.current.contains(e.target)) {
        setAuctionOpen(false);
      }
    };
    window.addEventListener('click', closeAuction);
    return () => window.removeEventListener('click', closeAuction);
  }, [auctionOpen]);

  const checkAllAuctions = (e) => {
    if (e.target.checked) {
      setCheckedAuctionList(auctionList);
    } else {
      setAuctionAlert(true);
      setTimeout(() => {
        setAuctionAlert(false);
      }, 3000);
    }
  };

  const checkAuction = (e, id, name) => {
    if (e.target.checked) {
      setCheckedAuctionList([...checkedAuctionList, { id, name }]);
    } else {
      if (checkedAuctionList.length > 1) {
        setCheckedAuctionList(
          checkedAuctionList.filter((auction) => auction.id !== id)
        );
      } else {
        setAuctionAlert(true);
        setTimeout(() => {
          setAuctionAlert(false);
        }, 3000);
      }
    }
  };

  // Location Toggle
  const toggleLocation = () => {
    setLocationOpen((prev) => !prev);

    if (!locationOpen) {
      setFromOpen(false);
      setToOpen(false);
      setPriceOpen(false);
      setAuctionOpen(false);
    }
  };

  const locationRef = useRef(null);

  useEffect(() => {
    if (!locationOpen) {
      return;
    }
    const closeLocation = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setLocationOpen(false);
      }
    };
    window.addEventListener('click', closeLocation);
    return () => window.removeEventListener('click', closeLocation);
  }, [locationOpen]);

  const checkAllLocations = (e) => {
    if (e.target.checked) {
      setCheckedLocationList(locationList.sort((a, b) => a.order - b.order));
    } else {
      setLocationAlert(true);
      setTimeout(() => {
        setLocationAlert(false);
      }, 3000);
    }
  };

  const checkLocation = (e, id, order, name) => {
    if (e.target.checked) {
      setCheckedLocationList(
        [...checkedLocationList, { id, order, name }].sort(
          (a, b) => a.order - b.order
        )
      );
    } else {
      if (checkedLocationList.length > 1) {
        setCheckedLocationList(
          checkedLocationList
            .filter((location) => location.id !== id)
            .sort((a, b) => a.order - b.order)
        );
      } else {
        setLocationAlert(true);
        setTimeout(() => {
          setLocationAlert(false);
        }, 3000);
      }
    }
  };

  // Include Unsold Work Toggle
  const toggleIncludeUnsold = () => {
    setIncludeUnsold((prev) => !prev);
  };

  // View by Current Price Toggle
  const toggleCurrentPrice = () => {
    setCurrentPrice((prev) => !prev);
  };

  // View by Current Price Toggle
  const toggleSort = () => {
    setSortOpen((prev) => !prev);
  };

  const selectSortType = (id, type) => {
    setSortType({ id, type });
  };

  //
  //

  // list items api 호출
  const getListData = async () => {
    setLoading(true);
    try {
      const data = await listApi.listData({
        pageNo: pageNum,
        perPage: 40,
        sortType: sortType.id + 1,
        ...(artistSeq.length > 0 && { artistSeq }),
        ...(auctionType.length > 0 && { auctionType }),
        ...(locationType.length > 0 && { locationType }),
        ...(artistSeq.length > 0 && { startDate }),
        ...(artistSeq.length > 0 && { endDate }),
        ...(minPrice.length > 0 && {
          minPrice: +minPrice.replaceAll(',', ''),
        }),
        ...(maxPrice.length > 0 && {
          maxPrice: +maxPrice.replaceAll(',', ''),
        }),
        ...(isIncludeUnsold.length > 0 && { isIncludeUnsold }),
        ...(isViewCurrentCurrency.length > 0 && {
          isViewCurrentCurrency,
        }),
      });
      setListData(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListData();
  }, [
    pageNum,
    sortType,
    artistSeq,
    auctionType,
    locationType,
    startDate,
    endDate,
    minPrice,
    maxPrice,
    minPrice,
    isIncludeUnsold,
    isViewCurrentCurrency,
  ]);

  //
  //

  // Avg Price 팝업 관리
  const openAvgPricePopup = () => {
    setAvgPricePopup(true);
  };

  useEffect(() => {
    if (!avgPricePopup) {
      return;
    }
    const closeAvgPricePopup = (e) => {
      if (
        avgPricePopupRef.current &&
        !avgPricePopupRef.current.contains(e.target)
      ) {
        setAvgPricePopup(false);
      }
    };
    window.addEventListener('click', closeAvgPricePopup);
    return () => window.removeEventListener('click', closeAvgPricePopup);
  }, [avgPricePopup]);

  // View by Current Price 팝업 관리
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

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <>
        <div
          className={className + ' !left-7 lg:!left-0 group'}
          style={{
            ...style,
            position: 'absolute',
            width: 55,
            height: 55,
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
      </>
    );
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <>
        <div
          className={className + ' !right-7 lg:!right-0 group'}
          style={{
            ...style,
            position: 'absolute',
            width: 55,
            height: 55,
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
      </>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const searchVar = {
    invisible: {
      x: -500,
      opacity: 0,
      scale: 0,
      width: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      width: '100vw',
      transition: {
        duration: 0.7,
      },
    },
    exit: {
      x: -500,
      opacity: 0,
      scale: 0,
      width: 0,
      transition: { duration: 0.7 },
    },
  };

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

  return (
    <>
      <Seo title='List' />
      <div className='col-start-center bg-beige-200'>
        {/* Artists Filter Start */}
        <div className='w-full px-28 lg:px-10 md:px-0'>
          <h1 className='text-5xl font-bold my-10 md:hidden'>Select Artist</h1>
          {/* <div className='flex-center-center bg-beige-100 w-full h-64 mb-7 px-14'> */}

          {/* Slider */}
          {isLoading ? (
            <Slider
              {...settings}
              className='relative !flex !items-center bg-beige-100 h-64 mb-7 px-14 lg:px-0 md:px-0 md:!mt-8 md:!pt-8 animate-twinkle'
            >
              <div className='!flex !justify-center items-center bg-beige-400 rounded-full !w-28 !h-28 text-2xl font-medium !m-auto !ml-18 !mt-10 hover:bg-[#9a9a9ab3] cursor-pointer transition-all'></div>
              {[0, 1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className='!flex !flex-col !justify-center !items-center !m-auto cursor-pointer hover:!opacity-50 transition-all'
                >
                  <div className='relative rounded-full bg-beige-400 w-40 h-40'></div>
                  <div className='bg-beige-400 text-beige-400 text-xs font-[Helvetica] font-medium mt-3'>
                    AAAAAAAAAA
                  </div>
                  <div className='bg-beige-400 text-beige-400 mt-0.5 text-xs font-[Helvetica]'>
                    b.1957
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <Slider
              {...settings}
              className='relative !flex !items-center bg-beige-100 h-64 mb-7 px-14 lg:px-0 md:px-0 md:!mt-8 md:!pt-8'
            >
              <div
                onClick={selectAllTopArtists}
                className={cls(
                  conditionalStyle(
                    selectedTopArtists?.length === topArtists?.length,
                    'bg-[#333333] text-white',
                    'bg-beige-300'
                  ),
                  '!flex !justify-center items-center bg-beige-300 rounded-full !w-28 !h-28 text-2xl font-medium !m-auto !ml-18 !mt-10 hover:bg-[#9a9a9ab3] cursor-pointer transition-all'
                )}
              >
                All
              </div>
              {topArtists &&
                topArtists.length > 0 &&
                topArtists.map((artist, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      selectTopArtists(JSON.stringify(artist.artistSeq))
                    }
                    className='!flex !flex-col !justify-center !items-center !m-auto cursor-pointer hover:!opacity-50 transition-all'
                  >
                    <div className='relative rounded-full w-40 h-40'>
                      {artist.imageSrc ? (
                        <Image
                          src={artist.imageSrc}
                          alt='Top Artists Image'
                          layout='fill'
                          className='rounded-full'
                        />
                      ) : (
                        <div className='bg-brown w-full h-full rounded-full' />
                      )}
                      {selectedTopArtists.includes(
                        JSON.stringify(artist.artistSeq)
                      ) && (
                        <div className='absolute top-0 left-0 flex-center-center w-full h-full rounded-full bg-[#ab7b6d8f]'>
                          <div className='relative w-12 h-10'>
                            <Image
                              src='/icons/check-white.png'
                              alt='Check Image'
                              layout='fill'
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className='text-black-200 text-base font-[Helvetica] font-medium mt-3'>
                      {artist.artistName}
                    </div>
                    <div className='text-black-200 text-xs font-[Helvetica]'>
                      {artist.bornBirthYear}
                    </div>
                  </div>
                ))}
            </Slider>
          )}
        </div>
        {/* Artists Filter End */}

        {/* First Filter Start */}
        <div className='relative flex w-full border-b border-filterBorder pb-3 pl-28 lg:pl-10 md:pl-4'>
          <div className='h-14 flex items-center whitespace-nowrap mr-10 md:h-[2.25rem] md:w-[4.1rem] md:mr-4 md:flex-[0_0_auto]'>
            Result For
          </div>

          <div
            onClick={() => {
              if (selectedArtists.length < 20) {
                setSearchOpen(true);
              } else {
                setSearchAlert(true);
                setTimeout(() => {
                  setSearchAlert(false);
                }, 3000);
              }
            }}
            className='relative flex-center-center bg-white shadow-sm rounded-[4px] w-18 h-14 mr-2 cursor-pointer transition-opacity md:w-[2.875rem] md:h-[2.25rem] md:mr-2 md:flex-[0_0_auto] group'
          >
            {searchOpen ? (
              <AiFillMinusCircle className='flex justify-center items-center rounded-full w-6 h-6 text-black-400 text-2xl group-hover:text-[#979797]' />
            ) : (
              <AiFillPlusCircle className='flex justify-center items-cwenter rounded-full w-6 h-6 text-black-400 text-5xl group-hover:text-[#979797]' />
            )}

            {searchAlert && (
              <div className='absolute top-18 left-0 z-[1] whitespace-nowrap bg-pink rounded-[1px] p-2 shadow-md text-white font-[Helvetica] after:content-[""] after:absolute after:border-b-pink after:border-t-transparent after:border-x-transparent after:border-[10px] after:-top-[15px] after:left-5 md:flex-col md:-translate-y-1/2 md:-left-6 md:after:left-9'>
                Search up to 20 artists at the same time.
              </div>
            )}
          </div>

          <AnimatePresence>
            {searchOpen && (
              <motion.div
                ref={searchRef}
                className='absolute -top-1 left-0 md:mr-4'
                variants={searchVar}
                initial='invisible'
                animate='visible'
                exit='exit'
              >
                <input
                  type='text'
                  placeholder='Artist Name'
                  value={searchTerm}
                  onChange={handleSearchTerm}
                  className='w-screen h-18 pl-10 rounded-[4px] shadow-sm outline-none font-[Helvetica]'
                />
                {autocompletedArtists && autocompletedArtists.length > 0 && (
                  <div className='absolute top-16 left-0 bg-white border border-[#9d9b9b66] rounded-[4px] shadow-sm z-10 w-full h-[8.75rem] overflow-y-scroll'>
                    {autocompletedArtists &&
                      autocompletedArtists.length > 0 &&
                      autocompletedArtists.map((artist, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            selectArtist(artist.seq, artist.artistName);
                            setSearchOpen(false);
                          }}
                          className='hover:bg-beige-200 pl-10 py-2 cursor-pointer font-[Helvetica]'
                        >
                          {artist.artistName}
                        </div>
                      ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className='w-screen overflow-x-auto'>
            <div className='flex w-full space-x-2'>
              {selectedArtists &&
                selectedArtists.length > 0 &&
                selectedArtists.map(
                  (artist, index) =>
                    index < 10 && (
                      <div
                        key={index}
                        className='flex justify-center items-center px-6 h-14 rounded-[4px] bg-white shadow-sm'
                      >
                        <div className='whitespace-nowrap'>{artist.name}</div>
                        <IoIosCloseCircle
                          onClick={() => deleteArtist(artist.seq)}
                          className='text-[#979797] w-6 h-6 ml-2 cursor-pointer'
                        />
                      </div>
                    )
                )}
            </div>

            <div className='flex w-full space-x-2 mt-4'>
              {selectedArtists &&
                selectedArtists.length > 0 &&
                selectedArtists.map(
                  (artist, index) =>
                    index >= 10 && (
                      <div
                        key={index}
                        className='flex justify-center items-center px-6 h-14 rounded-[4px] bg-white shadow-sm'
                      >
                        <div className='whitespace-nowrap'>{artist.name}</div>
                        <IoIosCloseCircle
                          onClick={() => deleteArtist(artist.seq)}
                          className='text-[#979797] w-6 h-6 ml-2 cursor-pointer'
                        />
                      </div>
                    )
                )}
            </div>
          </div>
        </div>

        {/* First Filter End */}

        {/* Second Filter Start */}
        <div className='flex-start-center w-full border-b border-filterBorder pt-3 pb-6 pl-28 lg:pl-10 lg:py-6 md:px-4 md:flex-wrap'>
          {/* From */}
          <div className='relative w-40 md:w-1/2'>
            <div
              onClick={toggleFromCalendar}
              className='col-start-center cursor-pointer'
            >
              <div className='flex-start-center mb-4 md:mb-2'>
                <div className='flex-center-center'>
                  <div className='font-[Helvetica] text-black-900 mr-1'>
                    From
                  </div>
                  {fromOpen ? (
                    <div className='relative w-4 h-4'>
                      <Image
                        src='/icons/up-arrow.png'
                        alt='Up Arrow Image'
                        layout='fill'
                      />
                    </div>
                  ) : (
                    <div className='relative w-4 h-4'>
                      <Image
                        src='/icons/down-arrow.png'
                        alt='Down Arrow Image'
                        layout='fill'
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className='text-xl text-black-200 lg:text-base'>
                {fromMonth.value.substring(0, 3)} {fromYear.value}
              </div>
            </div>

            <AnimatePresence>
              {fromOpen && toOpen && (
                <motion.div
                  ref={fromRef}
                  className='absolute top-22 z-[1] flex bg-white rounded-[4px] shadow-md after:content-[""] after:absolute after:border-b-[#fff] after:border-t-transparent after:border-x-transparent after:border-[20px] after:-top-[35px] after:left-4 md:flex-col md:-translate-y-1/2'
                  variants={popupVar}
                  initial='invisible'
                  animate='visible'
                  exit='exit'
                >
                  <div className='col-center-center w-80 h-72 px-3 md:w-[calc(100vw-2rem)]'>
                    <div className='relative flex-between-center w-full h-10 bg-beige-200 border border-[#9d9b9b66] rounded-[4px] pl-5 pr-2 font-[Helvetica]'>
                      <div
                        onClick={toggleFromYearCalendar}
                        className='flex-between-center w-full cursor-pointer'
                      >
                        {fromYear.value}
                        {fromYearOpen ? (
                          <div className='relative w-4 h-4'>
                            <Image
                              src='/icons/up-arrow.png'
                              alt='Up Arrow Image'
                              layout='fill'
                            />
                          </div>
                        ) : (
                          <div className='relative w-4 h-4'>
                            <Image
                              src='/icons/down-arrow.png'
                              alt='Down Arrow Image'
                              layout='fill'
                            />
                          </div>
                        )}
                      </div>

                      {fromYearOpen && (
                        <div className='absolute top-10 left-0 bg-white border border-[#9d9b9b66] rounded-[4px] shadow-md z-10 w-full h-60 overflow-y-scroll'>
                          {yearList.map((year) => (
                            <div
                              key={year.id}
                              onClick={() => {
                                selectFromYear(year.id, year.value);
                                setFromYearOpen(false);
                              }}
                              className='hover:bg-beige-200 pl-2 py-2 cursor-pointer font-[Helvetica]'
                            >
                              {year.value}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className='flex-start-center flex-wrap mt-2'>
                      {monthList.map((month) => (
                        <div
                          key={month.id}
                          onClick={() => {
                            selectFromMonth(month.id, month.value);
                          }}
                          className='flex-center-center border border-black-400 rounded-sm px-3 py-2 mr-1 mt-1 font-[Helvetica] cursor-pointer'
                          style={{
                            backgroundColor:
                              month.value === fromMonth.value && '#333333',
                            color: month.value === fromMonth.value && '#ffffff',
                          }}
                        >
                          {month.value}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='col-center-center w-80 h-72 px-3 md:w-[calc(100vw-2rem)]'>
                    <div className='relative flex-between-center w-full h-10 bg-beige-200 border border-[#9d9b9b66] rounded-[4px] pl-5 pr-2 font-[Helvetica]'>
                      <div
                        onClick={toggleToYearCalendar}
                        className='flex-between-center w-full cursor-pointer'
                      >
                        {toYear.value}
                        {toYearOpen ? (
                          <div className='relative w-4 h-4'>
                            <Image
                              src='/icons/up-arrow.png'
                              alt='Up Arrow Image'
                              layout='fill'
                            />
                          </div>
                        ) : (
                          <div className='relative w-4 h-4'>
                            <Image
                              src='/icons/down-arrow.png'
                              alt='Down Arrow Image'
                              layout='fill'
                            />
                          </div>
                        )}
                      </div>

                      {toYearOpen && (
                        <div className='absolute top-10 left-0 bg-white border border-[#9d9b9b66] rounded-[4px] shadow-md z-10 w-full h-60 overflow-y-scroll'>
                          {yearList.map((year) => (
                            <div
                              key={year.id}
                              onClick={() => {
                                if (year.id >= fromYear.id) {
                                  selectToYear(year.id, year.value);
                                  setToYearOpen(false);
                                }
                              }}
                              className='hover:bg-beige-200 pl-2 py-2 cursor-pointer font-[Helvetica]'
                              style={{
                                backgroundColor:
                                  year.id < fromYear.id && '#e2e0e0',
                              }}
                            >
                              {year.value}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className='flex-start-center flex-wrap mt-2'>
                      {monthList.map((month) => (
                        <div
                          key={month.id}
                          onClick={() => {
                            selectToMonth(month.id, month.value);
                          }}
                          className='flex-center-center border border-black-400 rounded-sm px-3 py-2 mr-1 mt-1 font-[Helvetica] cursor-pointer'
                          style={{
                            color: month.value === toMonth.value && '#ffffff',
                            backgroundColor:
                              month.value === toMonth.value
                                ? '#333333'
                                : toYear.id === fromYear.id &&
                                  month.id < fromMonth.id &&
                                  '#e2e0e0',
                          }}
                        >
                          {month.value}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* To */}
          <div className='w-40 md:w-1/2'>
            <div
              onClick={toggleToCalendar}
              className='col-start-center cursor-pointer'
            >
              <div className='flex-start-center mb-4 md:mb-2'>
                <div className='flex-center-center'>
                  <div className='font-[Helvetica] text-black-900 mr-1'>To</div>
                  {toOpen ? (
                    <div className='relative w-4 h-4'>
                      <Image
                        src='/icons/up-arrow.png'
                        alt='Up Arrow Image'
                        layout='fill'
                      />
                    </div>
                  ) : (
                    <div className='relative w-4 h-4'>
                      <Image
                        src='/icons/down-arrow.png'
                        alt='Down Arrow Image'
                        layout='fill'
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className='text-xl text-black-200 lg:text-base'>
                {toMonth.value.substring(0, 3)} {toYear.value}
              </div>
            </div>
          </div>

          {/* Price */}
          <div className='relative w-80 md:w-full md:mt-6'>
            <div
              onClick={togglePrice}
              className='col-start-center cursor-pointer'
            >
              <div className='mb-4 md:mb-2'>
                <div className='flex-between-center'>
                  <div className='font-[Helvetica] text-black-900 mr-1'>
                    Price
                  </div>
                  {priceOpen ? (
                    <div className='relative w-4 h-4'>
                      <Image
                        src='/icons/up-arrow.png'
                        alt='Up Arrow Image'
                        layout='fill'
                      />
                    </div>
                  ) : (
                    <div className='relative w-4 h-4'>
                      <Image
                        src='/icons/down-arrow.png'
                        alt='Down Arrow Image'
                        layout='fill'
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className='text-xl text-black-200 h-7 lg:text-base'>
                {minPrice.length > 0 || maxPrice.length > 0
                  ? `$${minPrice} ~ $${maxPrice}`
                  : '$0 ~ 0'}
              </div>
            </div>

            <AnimatePresence>
              {priceOpen && (
                <motion.div
                  ref={priceRef}
                  className='absolute top-22 col-center-center bg-white rounded-[4px] shadow-md w-[28rem] h-48 px-3 z-[1] after:content-[""] after:absolute after:border-b-[#fff] after:border-t-transparent after:border-x-transparent after:border-[20px] after:-top-[35px] after:left-4 md:w-[calc(100vw-2rem)] md:h-60'
                  variants={popupVar}
                  initial='invisible'
                  animate='visible'
                  exit='exit'
                >
                  <div className='flex-between-center w-full'>
                    <div className='text-xl font-[Helvetica]'>Hammer Price</div>
                    <IoIosCloseCircle
                      onClick={() => setPriceOpen(false)}
                      className='text-[#979797] w-6 h-6 mb-6 cursor-pointer'
                    />
                  </div>
                  <div className='flex-between-center w-full mt-5 md:flex-col md:items-start'>
                    <div className='flex w-1/2 mr-2 md:w-full md:mr-0'>
                      <input
                        type='text'
                        placeholder='Min'
                        value={minPriceTmp}
                        onChange={handleMinPrice}
                        className='border border-[#9d9b9b66] border-r-0 rounded-r-none rounded-l-[4px] w-2/3 h-10 font-[Helvetica] pl-4 outline-none shadow-none'
                      />
                      <div className='flex justify-end items-center font-[Helvetica] pr-5 text-[#aaaaaa] border border-[#9d9b9b66] border-l-0 rounded-l-none rounded-r-[4px] w-1/3 h-[40px]'>
                        USD
                      </div>
                    </div>
                    <div className='flex w-1/2 md:w-full md:mt-4'>
                      <input
                        type='text'
                        placeholder='Max'
                        value={maxPriceTmp}
                        onChange={handleMaxPrice}
                        className='border border-[#9d9b9b66] border-r-0 rounded-r-none rounded-l-[4px] w-2/3 h-10 font-[Helvetica] pl-4 outline-none shadow-none'
                      />
                      <div className='flex justify-end items-center font-[Helvetica] pr-5 text-[#aaaaaa] border border-[#9d9b9b66] border-l-0 rounded-l-none rounded-r-[4px] w-1/3 h-[40px]'>
                        USD
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-end mt-6 w-full'>
                    <div
                      onClick={savePrice}
                      className='flex-center-center bg-brown text-white rounded-sm w-16 h-8 font-[Helvetica] cursor-pointer'
                    >
                      Save
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Auction House */}
          <div className='relative w-80 md:w-1/2 md:mt-6'>
            <div
              onClick={toggleAuction}
              className='col-start-center cursor-pointer'
            >
              <div className='mb-4 md:mb-2'>
                <div className='flex-between-center '>
                  <div className='font-[Helvetica] text-black-900 mr-1'>
                    Auction House
                  </div>
                  {auctionOpen ? (
                    <div className='relative w-4 h-4'>
                      <Image
                        src='/icons/up-arrow.png'
                        alt='Up Arrow Image'
                        layout='fill'
                      />
                    </div>
                  ) : (
                    <div className='relative w-4 h-4'>
                      <Image
                        src='/icons/down-arrow.png'
                        alt='Down Arrow Image'
                        layout='fill'
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className='text-xl text-black-200 lg:text-base h-7'>
                {checkedAuctionList.length === auctionList.length
                  ? "Christie's, Sotheby's"
                  : comma(checkedAuctionList.map((auction) => auction.name))}
              </div>
            </div>

            <AnimatePresence>
              {auctionOpen && (
                <motion.div
                  ref={auctionRef}
                  className='absolute top-22 col-center-center bg-white rounded-[4px] shadow-md w-[20rem] px-3 z-[1] pt-2 pb-7 after:content-[""] after:absolute after:border-b-[#fff] after:border-t-transparent after:border-x-transparent after:border-[20px] after:-top-[35px] after:left-4 md:w-[calc(100vw-2rem)]'
                  variants={popupVar}
                  initial='invisible'
                  animate='visible'
                  exit='exit'
                >
                  <div className='flex-between-center w-full'>
                    <div className='text-xl font-[Helvetica]'>
                      Auction Houses
                    </div>
                    <IoIosCloseCircle
                      onClick={() => setAuctionOpen(false)}
                      className='text-[#979797] w-6 h-6 mb-6 cursor-pointer'
                    />
                  </div>
                  <div className='w-full col-start-center mt-6'>
                    <div className='flex font-[Helvetica]'>
                      <input
                        id={'auctionCheckBox1'}
                        type='checkbox'
                        onClick={checkAllAuctions}
                        checked={
                          checkedAuctionList.length === auctionList.length
                        }
                        onChange={() => null}
                        className='hidden'
                      />
                      <label
                        htmlFor={'auctionCheckBox1'}
                        className={cls(
                          checkedAuctionList.length === auctionList.length
                            ? 'bg-black-400 border-none'
                            : 'bg-white border border-[#959595]',
                          'flex-center-center w-5 h-5 text-white cursor-pointer mr-2 rounded-[1px]'
                        )}
                      >
                        <div className='relative w-2.5 h-2'>
                          <Image
                            src='/icons/check-white.png'
                            alt='Check Image'
                            layout='fill'
                          />
                        </div>
                      </label>
                      All
                    </div>
                    {auctionList.map((auction) => (
                      <div
                        key={auction.id}
                        className='flex font-[Helvetica] mt-5'
                      >
                        <input
                          id={`auctionCheckBox${auction.id + 2}`}
                          type='checkbox'
                          onClick={(e) =>
                            checkAuction(e, auction.id, auction.name)
                          }
                          checked={checkedAuctionList
                            .map((auction) => auction.id)
                            .includes(auction.id)}
                          onChange={() => null}
                          className='hidden'
                        />
                        <label
                          htmlFor={`auctionCheckBox${auction.id + 2}`}
                          className={cls(
                            checkedAuctionList
                              .map((auction) => auction.id)
                              .includes(auction.id)
                              ? 'bg-black-400 border-none'
                              : 'bg-white border border-[#959595]',
                            'flex-center-center w-5 h-5 text-white cursor-pointer mr-2 rounded-[1px]'
                          )}
                        >
                          <div className='relative w-2.5 h-2'>
                            <Image
                              src='/icons/check-white.png'
                              alt='Check Image'
                              layout='fill'
                            />
                          </div>
                        </label>
                        {auction.name}
                      </div>
                    ))}
                  </div>

                  {auctionAlert && (
                    <div className='absolute top-[14.5rem] left-0 z-[1] whitespace-nowrap bg-pink rounded-[1px] p-2 shadow-md text-white font-[Helvetica] after:content-[""] after:absolute after:border-b-pink after:border-t-transparent after:border-x-transparent after:border-[10px] after:-top-[15px] after:left-5 md:flex-col md:-translate-y-1/2 md:-left-6 md:after:left-9'>
                      You must select at least one of Auction Houses.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Location */}
          <div className='relative w-80 md:w-1/2 md:mt-6'>
            <div className='col-start-center cursor-pointer'>
              <div className='mb-4 md:mb-2'>
                <div onClick={toggleLocation} className='flex-between-center'>
                  <div className='font-[Helvetica] text-black-900 mr-1'>
                    Location
                  </div>
                  {locationOpen ? (
                    <div className='relative w-4 h-4'>
                      <Image
                        src='/icons/up-arrow.png'
                        alt='Up Arrow Image'
                        layout='fill'
                      />
                    </div>
                  ) : (
                    <div className='relative w-4 h-4'>
                      <Image
                        src='/icons/down-arrow.png'
                        alt='Down Arrow Image'
                        layout='fill'
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className='text-xl text-black-200 lg:text-base h-7'>
                {checkedLocationList.length > 2
                  ? `${comma([
                      checkedLocationList[0].name,
                      checkedLocationList[1].name,
                    ])} +${checkedLocationList.length - 2}`
                  : comma(checkedLocationList.map((location) => location.name))}
              </div>
            </div>

            <AnimatePresence>
              {locationOpen && (
                <motion.div
                  ref={locationRef}
                  className='absolute top-22 col-center-center bg-white rounded-[4px] shadow-md w-[30rem] px-3 z-[1] pt-2 pb-7 after:content-[""] after:absolute after:border-b-[#fff] after:border-t-transparent after:border-x-transparent after:border-[20px] after:-top-[35px] after:left-4 md:right-0 md:w-[calc(100vw-2rem)] md:after:left-auto md:after:right-24'
                  variants={popupVar}
                  initial='invisible'
                  animate='visible'
                  exit='exit'
                >
                  <div className='flex-between-center w-full'>
                    <div className='text-xl font-[Helvetica]'>Locations</div>
                    <IoIosCloseCircle
                      onClick={() => setLocationOpen(false)}
                      className='text-[#979797] w-6 h-6 mb-6 cursor-pointer'
                    />
                  </div>
                  <div className='w-full grid grid-cols-3 gap-y-5 mt-6 md:grid-cols-2'>
                    <div className='flex font-[Helvetica]'>
                      <input
                        id={'locationCheckBox1'}
                        type='checkbox'
                        onClick={checkAllLocations}
                        checked={
                          checkedLocationList.length === locationList.length
                        }
                        onChange={() => null}
                        className='hidden'
                      />
                      <label
                        htmlFor={'locationCheckBox1'}
                        className={cls(
                          checkedLocationList.length === locationList.length
                            ? 'bg-black-400 border-none'
                            : 'bg-white border border-[#959595]',
                          'flex-center-center w-5 h-5 text-white cursor-pointer mr-2 rounded-[1px]'
                        )}
                      >
                        <div className='relative w-2.5 h-2'>
                          <Image
                            src='/icons/check-white.png'
                            alt='Check Image'
                            layout='fill'
                          />
                        </div>
                      </label>
                      All
                    </div>
                    {locationList.map((location) => (
                      <div key={location.id} className='flex font-[Helvetica]'>
                        <input
                          id={`locationCheckBox${location.id + 2}`}
                          type='checkbox'
                          onClick={(e) =>
                            checkLocation(
                              e,
                              location.id,
                              location.order,
                              location.name
                            )
                          }
                          checked={checkedLocationList
                            .map((location) => location.id)
                            .includes(location.id)}
                          onChange={() => null}
                          className='hidden'
                        />
                        <label
                          htmlFor={`locationCheckBox${location.id + 2}`}
                          className={cls(
                            checkedLocationList
                              .map((location) => location.id)
                              .includes(location.id)
                              ? 'bg-black-400 border-none'
                              : 'bg-white border border-[#959595]',
                            'flex-center-center w-5 h-5 text-white cursor-pointer mr-2 rounded-[1px]'
                          )}
                        >
                          <div className='relative w-2.5 h-2'>
                            <Image
                              src='/icons/check-white.png'
                              alt='Check Image'
                              layout='fill'
                            />
                          </div>
                        </label>
                        {location.name}
                      </div>
                    ))}
                  </div>

                  {locationAlert && (
                    <div className='absolute top-80 left-0 z-[1] whitespace-nowrap bg-pink rounded-[1px] p-2 shadow-md text-white font-[Helvetica] after:content-[""] after:absolute after:border-b-pink after:border-t-transparent after:border-x-transparent after:border-[10px] after:-top-[15px] after:left-5 md:flex-col md:-translate-y-1/2 md:-left-6 md:after:left-9'>
                      You must select at least one of Locations.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* Second Filter End */}

        {/* Third Filter Start */}
        <div className='w-full px-28 lg:px-10 md:px-4'>
          <div className='relative flex-start-center w-full border-b border-filterBorder pt-3 pb-6 md:col-start-center'>
            {/* Total */}
            <div className='w-48'>
              <div className='font-[Helvetica] text-black-50 mb-4 lg:text-2xl md:text-base md:mb-2'>
                Total
              </div>
              <div className='text-5xl font-bold text-black-200 lg:text-[2.5rem] md:text-[2rem]'>
                {listData.totalResultCnt}
              </div>
            </div>

            {/* Avg Price */}
            <div className='md:mt-4'>
              <div className='flex-start-center mb-4'>
                <div className='font-[Helvetica] text-black-50 mr-1 lg:text-2xl md:text-base md:mb-2'>
                  Avg price
                </div>
                <div
                  onClick={openAvgPricePopup}
                  className='relative flex-center-center'
                >
                  <AiOutlineQuestionCircle
                    className='text-lg text-black-50 hover:text-black-400 cursor-pointer'
                    style={{
                      color: avgPricePopup && '#333333',
                    }}
                  />

                  <AnimatePresence>
                    {avgPricePopup && (
                      <motion.div
                        ref={avgPricePopupRef}
                        className='absolute -top-8 left-12 w-96 p-4 bg-white z-[1] font-[Helvetica] rounded-[4px] shadow-md after:content-[""] after:absolute after:border-r-[#fff] after:border-l-transparent after:border-y-transparent after:border-[20px] after:top-[20px] after:-left-8'
                        variants={popupVar}
                        initial='invisible'
                        animate='visible'
                        exit='exit'
                      >
                        <AiOutlineQuestionCircle className='text-lg ' />
                        This price is the average value of the winning bids for
                        the search results. Using the exchange rate at the time
                        of the auction, the price converted to US was calculated
                        as the average price. If you checked [View by Current
                        Price], you can see the average value calculated by
                        applying the rate of inflation to each winning price
                        converted into USD.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className='text-5xl font-bold text-black-200 lg:text-[2.5rem] md:text-[2rem]'>
                $ {listData.averagePrice}
              </div>
            </div>

            {/* Icons */}
            <div className='absolute top-12 right-0 flex-center-center'>
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
                      <FacebookShareButton url={window.location.href}>
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

                      <LinkedinShareButton url={window.location.href}>
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

                      <TwitterShareButton url={window.location.href}>
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
                        url={window.location.href}
                        media={listData.resultList[0].repImageUrl}
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

                      <EmailShareButton url={window.location.href}>
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

                    {/* <div className='flex-between-center mt-5'>
                      <div
                        onClick={() => setSharePopup(false)}
                        className='text-[#9a9a9a] cursor-pointer'
                      >
                        Cancel
                      </div>
                      <div className='flex-center-center bg-brown text-white rounded-sm w-16 h-8 cursor-pointer'>
                        Save
                      </div>
                    </div> */}
                  </div>
                )}
              </div>

              <div
                onClick={() => window.print()}
                className='relative w-6 h-5 cursor-pointer'
              >
                <Image src='/icons/print.png' alt='Print Image' layout='fill' />
              </div>
            </div>
          </div>
        </div>
        {/* Third Filter Start */}

        {/* List Filter Start */}
        <div className='flex-between-center w-full py-6 px-28 lg:px-10 md:col-start-center md:px-4'>
          <div className='flex-start-center md:col-start-center'>
            <div className='flex-start-center mr-7 lg:mr-3'>
              <input
                id={'unsoldCheckBox'}
                type='checkbox'
                onClick={toggleIncludeUnsold}
                checked={includeUnsold}
                onChange={() => null}
                className='hidden'
              />
              <label
                htmlFor={'unsoldCheckBox'}
                className={cls(
                  includeUnsold
                    ? 'bg-black-400 border-none'
                    : 'bg-white border border-[#959595]',
                  'flex-center-center w-5 h-5 text-white cursor-pointer mr-2 rounded-[1px]'
                )}
              >
                <div className='relative w-2.5 h-2'>
                  <Image
                    src='/icons/check-white.png'
                    alt='Check Image'
                    layout='fill'
                  />
                </div>
              </label>
              <div className='font-[Helvetica] text-black-900'>
                Include Unsold Works
              </div>
            </div>
            <div className='flex-start-center md:mt-2'>
              <input
                id={'currentPriceCheckBox'}
                type='checkbox'
                onClick={toggleCurrentPrice}
                checked={currentPrice}
                onChange={() => null}
                className='hidden'
              />
              <label
                htmlFor={'currentPriceCheckBox'}
                className={cls(
                  currentPrice
                    ? 'bg-black-400 border-none'
                    : 'bg-white border border-[#959595]',
                  'flex-center-center w-5 h-5 text-white cursor-pointer mr-2 rounded-[1px]'
                )}
              >
                <div className='relative w-2.5 h-2'>
                  <Image
                    src='/icons/check-white.png'
                    alt='Check Image'
                    layout='fill'
                  />
                </div>
              </label>
              <div className='font-[Helvetica] text-black-900 mr-2'>
                View by Current Price
              </div>
              <div
                onClick={openCurrentPricePopup}
                className='relative flex-center-center'
              >
                <AiOutlineQuestionCircle
                  className='text-lg cursor-pointer hover:opacity-40 transition-opacity'
                  style={{
                    opacity: currentPricePopup && 0.4,
                  }}
                />

                <AnimatePresence>
                  {currentPricePopup && (
                    <motion.div
                      ref={currentPricePopupRef}
                      className='absolute -top-12 w-96 left-12 p-4 bg-white z-[1] font-[Helvetica] rounded-[4px] shadow-md after:content-[""] after:absolute after:border-r-[#fff] after:border-l-transparent after:border-y-transparent after:border-[20px] after:top-[35px] after:-left-8'
                      variants={popupVar}
                      initial='invisible'
                      animate='visible'
                      exit='exit'
                    >
                      <AiOutlineQuestionCircle className='text-lg ' />
                      What is this price? This is NOT a value of the art market.
                      It reflected inflation and the exchage rate value of the
                      US dollars. Aimme wish this price will be useful to your
                      decision of buy or sell an artwork.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className='flex-start-center md:w-full md:mt-4'>
            <div className='font-[Helvetica] text-black-900 mr-6 lg:mr-2 md:hidden'>
              Sort by
            </div>
            <div
              onClick={toggleSort}
              className='relative flex-center-center bg-white shadow-sm w-52 h-10 font-[Helvetica] cursor-pointer lg:text-sm lg:w-48 md:w-full'
            >
              {sortType.type}
              {sortOpen ? (
                <div className='relative w-4 h-4 ml-2'>
                  <Image
                    src='/icons/up-arrow.png'
                    alt='Up Arrow Image'
                    layout='fill'
                  />
                </div>
              ) : (
                <div className='relative w-4 h-4 ml-2'>
                  <Image
                    src='/icons/down-arrow.png'
                    alt='Down Arrow Image'
                    layout='fill'
                  />
                </div>
              )}
              {sortOpen && (
                <div className='absolute top-12 col-center-center bg-white rounded-[4px] shadow-md w-52 z-[1]'>
                  {sortTypeList.map((sort) => (
                    <div
                      key={sort.id}
                      onClick={() => selectSortType(sort.id, sort.type)}
                      className='w-full hover:bg-beige-200 pl-6 py-2 cursor-pointer font-[Helvetica]'
                    >
                      {sort.type}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* List Filter End */}

        {/* Product List Start */}
        <div className='grid grid-cols-4 gap-x-5 gap-y-16 flex-wrap w-full px-28 lg:px-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-18 md:grid-cols-1 md:gap-y-8 md:px-4'>
          {loading
            ? [...Array(20).keys()].map((_, index) => (
                <div key={index} className='animate-twinkle'>
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
              ))
            : listData.resultList &&
              listData.resultList.length > 0 &&
              listData.resultList.map((item, index) => (
                <Link key={index} href={`/detail/${item.lotUuid}`}>
                  <a className='hover:opacity-40 transition-opacity'>
                    <div className='relative w-full aspect-square'>
                      {item.repImageUrl && item.repImageUrl.length > 0 && (
                        <Image
                          src={item.repImageUrl}
                          alt='List Image'
                          layout='fill'
                        />
                      )}
                    </div>

                    <div className='relative bg-white w-11/12 -mt-16 px-6 py-7'>
                      {item.currentPrice === '0' &&
                        item.estimatedPrice &&
                        item.currency && (
                          <div className='text-brown text-sm font-bold'>
                            Estimate Price
                          </div>
                        )}
                      <div
                        className={cls(
                          item.currentPrice === '0' &&
                            item.estimatedPrice &&
                            item.currency
                            ? 'text-base'
                            : isViewCurrentCurrency === 'Y'
                            ? 'text-2xl bg-[#fff3cc]'
                            : 'text-2xl',
                          'inline-block text-black-200  font-bold'
                        )}
                      >
                        {item.currentPrice === '0' &&
                        item.estimatedPrice &&
                        item.currency
                          ? `${item.currency} ${item.estimatedPrice}`
                          : isViewCurrentCurrency === 'Y'
                          ? `$ ${item.currentPrice}`
                          : `${item.currency} ${item.price}`}
                      </div>
                      <div className='text-black-200 text-base'>
                        {item.artistName.length > 30
                          ? `${item.artistName.substring(0, 30)}...`
                          : item.artistName}
                      </div>
                      <div className='text-black-200 text-xs font-[Helvetica]'>
                        {item.birth}
                      </div>
                      <div className='text-black-100 text-base font-[Helvetica]'>
                        {item.saleInfo.length > 30
                          ? `${item.saleInfo.substring(0, 30)}...`
                          : item.saleInfo}
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
        </div>
        {/* Product List End */}

        <div>
          <PageBar
            maxPage={listData.lastPageNo}
            nowPage={pageNum}
            artistSeq={artistSeq}
          />
        </div>

        <div className='flex justify-center w-full'>
          <div className='my-40 lg:px-10 lg:w-full md:px-4'>
            <h1 className='text-[2.5rem] leading-[1.23] font-bold lg:text-[2.5rem] md:text-[2rem]'>
              Be the first to try Aimme Analytics <br className='md:hidden' />
              Resgister now
            </h1>
            <div className='flex mt-11 md:block'>
              <div
                onClick={() =>
                  window.open('https://kvn062bilo5.typeform.com/to/L1Ij7dSu')
                }
                className='flex justify-center items-center bg-white border border-solid  border-black-400 rounded w-[18.375rem] h-[5.688rem] mr-16 text-center text-xl font-bold font-[Helvetica] lg:w-[18.275rem] lg:mr-5 md:hidden hover:bg-[#ff7979] hover:border-[#ff7979] hover:text-white cursor-pointer transition-all'
              >
                Become Aimme's
                <br />
                Early-bird
              </div>

              <div className='text-black-300 text-[1.563rem] font-[Helvetica] lg:w-1/2 md:w-full'>
                We offer up to 50% discount to those who join now for <br />
                their first year’s subscription. Become an Aimme’s
                <br />
                member and don’t miss the worldwide art market flow.
              </div>

              <div
                onClick={() =>
                  window.open('https://kvn062bilo5.typeform.com/to/L1Ij7dSu')
                }
                className='hidden md:flex justify-center items-center bg-white border border-solid  border-black-400 rounded w-96 h-20 mr-16 text-center text-xl font-bold font-[Helvetica] lg:w-[18.275rem] lg:mr-5 md:w-full md:text-[1.188rem] md:mt-8 md:y-[3.75rem]'
              >
                Become Aimme's Early-bird
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className='fixed right-12 bottom-12 w-[3.44rem] h-[3.44rem] group cursor-pointer'
      >
        <Image
          src='/icons/scrollTop1.png'
          alt='Scroll Top Button Image'
          layout='fill'
          className='group-hover:!hidden'
        />
        <Image
          src='/icons/scrollTopHover.png'
          alt='Scroll Top Button Hover Image'
          layout='fill'
          className='!hidden group-hover:!block'
        />
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const {
    params: { slug: params },
  } = ctx;

  return {
    props: { params },
  };
}

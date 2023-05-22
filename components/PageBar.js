import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const PageBar = ({ maxPage, nowPage, artistSeq }) => {
  const router = useRouter();

  const quo = Math.floor(nowPage / 5);
  const rem = nowPage % 5;

  const pageArray =
    rem === 0
      ? [...Array(5)]
          .map((_, index) => 5 * (quo - 1) + index + 1)
          .filter((i) => i <= maxPage)
      : [...Array(5)]
          .map((_, index) => 5 * quo + index + 1)
          .filter((i) => i <= maxPage);

  const [pages, setPages] = useState([]);

  const setPage = (pageNum) => {
    router.push(`/list/${artistSeq}/${pageNum}`);
  };

  const nextPage = () => {
    if (pages[pages.length - 1] < maxPage && maxPage > 5) {
      let tmp = pages.map((page) => page + 5);
      setPages(tmp.filter((page) => page <= maxPage));
    }
  };

  const prevPage = () => {
    let tmp = pages[0] - 5;
    if (pages[0] === 1) {
      setPages(pages);
    } else {
      setPages([...Array(5)].map((_, index) => index + tmp));
    }
  };

  const firstPage = () => {
    if (maxPage >= 5) {
      setPages([...Array(5)].map((_, index) => index + 1));
    } else {
      setPages([...Array(JSON.parse(maxPage))].map((_, index) => index + 1));
    }
    setPage(1);
  };

  const lastPage = () => {
    if (pages[pages.length - 1] < maxPage && maxPage > 5) {
      let tmp = pages.map((page) => page + 5);
      setPages(tmp.filter((page) => page <= maxPage));
    }
    setPage(maxPage);
  };

  useEffect(() => {
    setPages(pageArray);
  }, [maxPage]);

  return (
    <div className='flex-center-center w-screen text-[#454545] font-[Helvetica] pt-16 space-x-2'>
      <div
        onClick={firstPage}
        className='bg-white rounded-[1px] px-2.5 py-px cursor-pointer'
      >
        First
      </div>
      <div
        onClick={prevPage}
        className='bg-white rounded-[1px] px-2.5 py-px cursor-pointer'
      >
        Previous
      </div>
      {pages.map((page) => (
        <div
          key={page}
          onClick={() => setPage(page)}
          className='bg-white rounded-[1px] px-2.5 py-px cursor-pointer'
          style={{
            backgroundColor: page === JSON.parse(nowPage) && '#ab7b6d',
            color: page === JSON.parse(nowPage) && '#ffffff',
          }}
        >
          {page}
        </div>
      ))}
      {!pages.includes(+maxPage) && (
        <>
          <div className='bg-white rounded-[1px] px-2.5 py-px cursor-pointer'>
            ...
          </div>
          <div
            onClick={lastPage}
            className='bg-white rounded-[1px] px-2.5 py-px cursor-pointer'
          >
            {maxPage}
          </div>
        </>
      )}
      <div
        onClick={nextPage}
        className='bg-white rounded-[1px] px-2.5 py-px cursor-pointer'
      >
        Next
      </div>
      <div
        onClick={lastPage}
        className='bg-white rounded-[1px] px-2.5 py-px cursor-pointer'
      >
        Last
      </div>
    </div>
  );
};

export default PageBar;

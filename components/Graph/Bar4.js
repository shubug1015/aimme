import { useState } from 'react';

export default function Bar4({ biddingLastDecade }) {
  const maxValue = [
    Math.max(
      ...biddingLastDecade?.map((bidding) => JSON.parse(bidding.turnOver))
    ),
    Math.max(
      ...biddingLastDecade?.map((bidding) => JSON.parse(bidding.soldNumber))
    ),
    Math.max(
      ...biddingLastDecade?.map((bidding) => JSON.parse(bidding.unsold))
    ),
  ];

  const [type, setType] = useState(0);

  const selectType = (id) => {
    setType(id);
  };

  return (
    <div className='col-start-center'>
      <div className='flex space-x-[0.3rem]'>
        <div
          onClick={() => selectType(0)}
          className='flex-center-center w-[14.25rem] bg-white font-bold cursor-pointer'
          style={{
            height: type === 0 ? '3.5rem' : '3.125rem',
            borderRadius: type === 0 ? 0 : '10px',
          }}
        >
          Turnover
        </div>
        <div
          onClick={() => selectType(1)}
          className='flex-center-center w-[14.25rem] bg-white font-bold cursor-pointer'
          style={{
            height: type === 1 ? '3.5rem' : '3.125rem',
            borderRadius: type === 1 ? 0 : '10px',
          }}
        >
          Number of lots sold
        </div>
        <div
          onClick={() => selectType(2)}
          className='flex-center-center w-[14.25rem] bg-white font-bold cursor-pointer'
          style={{
            height: type === 2 ? '3.5rem' : '3.125rem',
            borderRadius: type === 2 ? 0 : '10px',
          }}
        >
          % of lots unsold
        </div>
      </div>

      <div className='relative flex-start-end w-[68.625rem] h-80 bg-white pl-28'>
        <div className='flex-start-center w-[61.5rem] h-72 mt-12 z-[1]'>
          {biddingLastDecade.map((bidding) => (
            <div key={bidding.seq} className='col-end-center w-[9.09%] h-full'>
              <div className='col-end-center w-full h-[13.2rem] group'>
                <div
                  className='relative w-8 bg-[#ab7b6d] h-full text-[0.8rem] font-medium group-hover:bg-pink'
                  style={{
                    height: `${
                      type === 0
                        ? (bidding.turnOver / maxValue[0]) * 100
                        : type === 1
                        ? (bidding.soldNumber / maxValue[1]) * 100
                        : (bidding.unsold / maxValue[2]) * 100
                    }%`,
                  }}
                >
                  <div className='absolute text-base -top-7 left-1/2 -translate-x-1/2 opacity-0 invisible font-[Helvetica] font-medium group-hover:opacity-100 group-hover:visible'>
                    {type === 0
                      ? bidding.turnOver
                      : type === 1
                      ? bidding.soldNumber
                      : bidding.unsold}
                  </div>
                </div>
              </div>
              <span className='font-semibold'>{bidding.year}</span>
            </div>
          ))}
        </div>

        <div className='absolute left-28 bottom-0 flex flex-col justify-between items-end w-[60rem] h-72 pb-6 font-[Helvetica]'>
          <div className='relative w-full h-[0.1188rem]'>
            <div className='absolute -left-24 -top-3 flex justify-end w-20 text-sm'>
              Millions of $
            </div>
          </div>
          <div className='relative w-full h-[0.1188rem] bg-[#fcf7f1]'>
            <div className='absolute -left-24 -top-3 flex justify-end w-20'>
              {maxValue[type]}
            </div>
          </div>
          <div className='relative w-full h-[0.1188rem] bg-[#fcf7f1]'>
            <div className='absolute -left-24 -top-3 flex justify-end w-20'>
              {(maxValue[type] * 3) / 4}
            </div>
          </div>
          <div className='relative w-full h-[0.1188rem] bg-[#fcf7f1]'>
            <div className='absolute -left-24 -top-3 flex justify-end w-20'>
              {(maxValue[type] * 2) / 4}
            </div>
          </div>
          <div className='relative w-full h-[0.1188rem] bg-[#fcf7f1]'>
            <div className='absolute -left-24 -top-3 flex justify-end w-20'>
              {maxValue[type] / 4}
            </div>
          </div>
          <div className='relative w-full h-[0.1188rem] bg-[#fcf7f1]'>
            <div className='absolute -left-24 -top-3 flex justify-end w-20'>
              0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from 'next/image';

export default function Bar3({ lastDecadeAuctions }) {
  const maxValue = Math.round(
    Math.max(
      ...lastDecadeAuctions.map((auction) =>
        JSON.parse(auction.price.slice(0, -1))
      )
    )
  );

  const maxCnt = Math.round(
    Math.max(...lastDecadeAuctions.map((auction) => JSON.parse(auction.cnt)))
  );

  return (
    <div className='col-center-center lg:w-full md:col-start-center md:overflow-x-scroll'>
      <div className='relative flex-between-center w-[58rem] mt-12 lg:mt-4 lg:w-full md:w-[50rem]'>
        {lastDecadeAuctions.map((auction) => (
          <div key={auction.seq} className='w-1/5'>
            <div className='relative col-between-center w-full h-[26rem] border-b-[0.188rem] border-[#eee4d6]'>
              <div className='col-center-center'>
                <div className='flex-center-center w-[8.75rem] h-[8.75rem] bg-white border-[5px] border-[#eee4d6] rounded-full lg:w-[6.3rem] lg:h-[6.3rem] hover:shadow-[4px_3px_9px_0_rgba(0,0,0,0.45)]'>
                  <div className='relative w-20 h-20 lg:w-16 lg:h-16 md:w-16 md:h-16'>
                    <Image
                      src={`/icons/region/${auction.region}.png`}
                      alt='Region Image'
                      layout='fill'
                    />
                  </div>
                </div>
                <div
                  className='w-1 bg-[#eee4d6]'
                  style={{
                    height:
                      JSON.parse(auction.price.slice(0, -1)) / maxValue >
                      JSON.parse(auction.cnt) / maxCnt
                        ? `calc(17.25rem * ${
                            (100 -
                              (JSON.parse(auction.price.slice(0, -1)) /
                                maxValue) *
                                100 -
                              5) /
                            100
                          })`
                        : `calc(17.25rem * ${
                            (100 - (JSON.parse(auction.cnt) / maxCnt) * 100) /
                            100
                          })`,
                  }}
                />
              </div>
              <div className='flex-center-end w-full'>
                <div className='col-end-center w-8 group'>
                  <span className='text-[0.8rem] text-[#ab7b6d] font-extrabold group-hover:text-[#0c435b] group-hover:text-base'>
                    ${auction.price}
                  </span>
                  <div
                    className='flex-center-start w-full bg-[#ab7b6d] text-[0.8rem] font-medium border border-[#ab7b6d] group-hover:bg-[#ede8e1] group-hover:border-[#0c435b] group-hover:border-b-0'
                    style={{
                      height: `calc(17.25rem * ${
                        JSON.parse(auction.price.slice(0, -1)) / maxValue
                      } - 20px)`,
                    }}
                  />
                </div>

                <div className='col-end-center w-8 h-full group'>
                  <span className='text-[0.8rem] text-[#dcb8ae] font-extrabold group-hover:text-[#0c435b] group-hover:text-base'>
                    {auction.cnt}
                  </span>
                  <div
                    className='flex-center-start w-full bg-[#dcb8ae] text-[0.8rem] font-medium border border-[#dcb8ae] group-hover:bg-[#ede8e1] group-hover:border-[#0c435b] group-hover:border-b-0'
                    style={{
                      height: `calc(13.25rem * ${
                        JSON.parse(auction.cnt) / maxCnt
                      }  - 20px)`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='flex-center-center w-full font-semibold text-lg mt-2'>
              {auction.auction}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

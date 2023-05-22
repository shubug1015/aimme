import Link from 'next/link';
import { useQuery } from 'react-query';
import { mainApi } from 'api';
import Image from 'next/image';

export default function Section4() {
  const { isLoading, data } = useQuery('topArtists', () =>
    mainApi.topArtists()
  );

  return (
    <div className='flex flex-col w-screen bg-beige-200 md:bg-beige-100'>
      {/* Beige Box Start */}
      <div className='flex justify-start w-full -mt-12 lg:mt-0 md:mt-14'>
        <div className=' bg-beige-100 w-10/12 pl-40 pr-36 pt-24 pb-32 lg:w-full lg:pt-[4.75rem] lg:pb-[7.375rem] lg:px-10 md:px-4 md:py-10'>
          <h1 className='text-4xl font-bold lg:text-[2rem] md:text-[2rem]'>
            Try out Beta Aimme for top {data?.length} artists
          </h1>
          <h2 className='text-2xl mt-4 mb-12 lg:text-[1.375rem] md:text-[1.375rem]'>
            We aime to officially release our website next year.{' '}
            <span
              className='text-pink underline cursor-pointer'
              onClick={() =>
                window.open('https://kvn062bilo5.typeform.com/to/L1Ij7dSu')
              }
            >
              Register early-bird
            </span>{' '}
            now to try our
            <br className='md:hidden' /> service and even get a 50% discount!
          </h2>
          <div className='grid grid-cols-3 gap-x-20 w-full md:grid-cols-2'>
            {isLoading
              ? [0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                  <div
                    key={index}
                    className='col-center-center px-9 hover:opacity-80 transition-opacity lg:px-0 animate-twinkle'
                  >
                    <div className='relative bg-beige-400 w-60 h-60 rounded-full lg:w-[12.375rem] lg:h-[12.375rem] md:w-[9.75rem] md:h-[9.75rem]'></div>
                    <div className='flex flex-col items-center w-full mt-6 md:mt-2'>
                      <div className='w-fit bg-beige-400 text-beige-400 text-xs font-[Helvetica] md:text-base'>
                        AAAAAAAAAA
                      </div>
                      <div className='w-fit bg-beige-400 text-beige-400 mt-0.5 text-xs mb-2.5 font-[Helvetica] lg:mb-1 md:text-xs md:mb-2'>
                        b.1957
                      </div>
                      <div className='w-fit bg-beige-400 text-beige-400 text-xs font-[Helvetica] md:text-xs'>
                        AAAAAAAA
                      </div>
                      <div className='w-fit bg-beige-400 text-beige-400 mt-0.5 text-xs font-bold mb-10 md:text-base'>
                        $ 99999999999
                      </div>
                    </div>
                  </div>
                ))
              : data &&
                data.length > 0 &&
                data.map((artist, index) => (
                  <Link href={`/list/${artist.artistSeq}/1`} key={index}>
                    <a className='col-center-center px-9 hover:opacity-80 transition-opacity lg:px-0'>
                      <div className='relative w-60 h-60 lg:w-[12.375rem] lg:h-[12.375rem] md:w-[9.75rem] md:h-[9.75rem]'>
                        {artist.imageSrc ? (
                          <Image
                            src={artist.imageSrc}
                            alt='Top 9 artists images'
                            layout='fill'
                            objectFit='cover'
                            className='rounded-full'
                            // priority
                          />
                        ) : (
                          <div className='bg-brown w-full h-full rounded-full' />
                        )}
                      </div>
                      <div className='w-full mt-6 md:mt-2'>
                        <div className='text-center text-black-200 text-2xl font-[Helvetica] md:text-base'>
                          {artist.artistName}
                        </div>
                        <div className='text-center text-black-200 text-base mb-2.5 font-[Helvetica] lg:mb-1 md:text-xs md:mb-2'>
                          {artist.bornBirthYear}
                        </div>
                        <div className='text-center text-black-100 text-base font-[Helvetica] md:text-xs'>
                          Avg.price
                        </div>
                        <div className='text-center text-black-200 text-2xl font-bold mb-10 md:text-base'>
                          $ {artist.averagePrice}
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
          </div>
        </div>
      </div>
      {/* Beige Box End */}
      <div className='w-10/12 mt-24 pl-56 lg:mt-[5.75rem] lg:px-[2.75rem] lg:w-full'>
        <h1 className='text-5xl font-bold lg:text-[2.5rem] md:text-[2rem]'>
          Be the first to try Aimme Analytics
          <br />
          Resgister now
        </h1>
        <div className='flex mt-11 lg:flex-center-center md:block md:mt-6'>
          {/* pc, tablet 버튼 */}
          <div
            onClick={() =>
              window.open('https://kvn062bilo5.typeform.com/to/L1Ij7dSu')
            }
            className='flex justify-center items-center bg-white border border-solid  border-black-400 rounded w-96 h-20 mr-16 text-center text-xl font-bold font-[Helvetica] lg:w-[50rem] lg:h-20 lg:mr-5 md:hidden hover:bg-[#ff7979] hover:border-[#ff7979] hover:text-white cursor-pointer transition-all'
          >
            Become Aimme's
            <br />
            Early-bird
          </div>

          <div className='text-black-300 text-xl font-[Helvetica] lg:text-lg md:text-xl'>
            We offer up to 50% discount to those who join now for their first
            year’s subscription. Become an Aimme’s member and don’t miss the
            worldwide art market flow.
          </div>

          {/* mobile 버튼 */}
          <div
            onClick={() =>
              window.open('https://kvn062bilo5.typeform.com/to/L1Ij7dSu')
            }
            className='bg-white border border-solid  border-black-400 rounded w-96 h-20 text-center font-bold font-[Helvetica] hidden md:flex-center-center md:w-[18.6rem] md:h-[3.75rem] md:text-base md:mt-8'
          >
            Become Aimme's Early-bird
          </div>
        </div>
      </div>
    </div>
  );
}

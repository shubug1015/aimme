import Section1 from '@components/Detail/Section1';
import Section2 from '@components/Detail/Section2';
import Section3 from '@components/Detail/Section3';
import Section4 from '@components/Detail/Section4';
import Section5 from '@components/Detail/Section5';
import { detailApi } from 'api';
import { useQuery } from 'react-query';

export default function Detail({ params }) {
  const [lotUuid] = params;

  const { isLoading, data } = useQuery('detail', () =>
    detailApi.detailData(lotUuid)
  );

  return isLoading ? (
    <div className='bg-beige-200 w-screen pt-20 pb-16 lg:px-10 lg:pt-0 md:px-0 md:pb-0 animate-twinkle'>
      <div className='relative flex-start-center bg-white w-368 pt-14 pb-16 pl-64 pr-24 lg:w-full lg:px-[2.375rem] lg:col-center-center md:px-4 md:pt-4 md:bg-beige-200'>
        <div className='lg:w-full'>
          <div className='relative flex-center-center bg-beige-400 w-144 aspect-square lg:w-full'></div>
          <div className='flex-center-center mt-2 text-sm md:hidden'>
            {[0, 1, 2, 3, 4]?.map((i) => (
              <div
                key={i}
                className={`relative flex-center-center bg-beige-400 w-12 h-12 cursor-pointer ${
                  i !== 4 + '' && 'mr-2'
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className='ml-24 lg:ml-[2.375rem] lg:w-full lg:mt-9 lg:relative md:ml-0'>
          {/* 1 */}
          <div className='border-b border-beige-400 lg:w-[30rem] md:w-full'>
            <h1 className='w-fit bg-beige-400 text-beige-400 text-4xl font-bold md:text-[2rem]'>
              AAAAAAAAAAAAAAAA
            </h1>
            <div className='w-fit bg-beige-300 text-beige-300 font-medium font-[Helvetica] mt-2 mb-0.5'>
              AAAAAAAAAAAAAA
            </div>
            <div className='text-xs w-fit bg-beige-300 text-beige-300 font-medium font-[Helvetica] mb-4'>
              b.1659
            </div>
          </div>

          {/* 2 */}
          <div className='flex-start-center text-black-400 border-b border-[#00000033] pt-5 pb-2 lg:w-[30rem] md:w-full'>
            {/*  */}
            <div className='mr-8'>
              <div className='flex-start-center mb-3'>
                <span className='w-fit bg-beige-400 text-beige-400 mr-2 font-[Helvetica] md:text-sm'>
                  Hammer Price
                </span>
              </div>
              <div className='w-fit bg-beige-300 text-beige-300 text-4xl font-bold md:text-2xl'>
                $9999
              </div>
            </div>
            {/*  */}

            {/*  */}
            <div>
              <div className='flex-start-center mb-3'>
                <span className='w-fit bg-beige-400 text-beige-400 mr-2 font-[Helvetica] md:text-sm'>
                  Current Price
                </span>
              </div>
              <div className='w-fit bg-beige-300 text-beige-300 text-4xl font-bold md:text-2xl'>
                $9999
              </div>
            </div>
            {/*  */}
          </div>

          {/* 3 */}
          <div className='pt-5 mb-5'>
            <div className='flex-start-center mb-2'>
              <span className='w-fit bg-beige-400 text-beige-400 mr-2 font-medium font-[Helvetica]'>
                Auction House’s Estimate
              </span>
            </div>
            <div className='font-bold w-fit bg-beige-300 text-beige-300'>
              $9999 ~ $9999
            </div>
          </div>

          {/* 4 */}
          <div>
            <div className='flex-start-center mb-2.5'>
              <span className='w-fit bg-beige-300 text-beige-300 mr-2 font-medium font-[Helvetica]'>
                LOT 999
              </span>
            </div>
            <div className='w-fit bg-beige-300 text-beige-300 sfont-medium font-[Helvetica]'>
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            </div>
          </div>

          {/* 5 */}
          <div className='col-start-center bg-beige-200 mt-9 px-8 py-5 lg:w-[30rem] md:w-full md:bg-white'>
            <div className='text-beige-200 text-3xl font-medium mb-2 md:text-2xl'>
              Become Aimme’s Early-Bird
            </div>
            <div className='text-beige-200 font-medium'>
              We aime to officially release our website next year. Register
              early-bird now to try our service and even get a 50% discount!
            </div>
            <div className='flex-center-center w-full bg-white text-white rounded mt-3.5 py-4 font-bold font-[Helvetica]'>
              Sign up now
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='relative'>
      <Section1 {...data} />
      {data.historycalPerfomanceWorks.length > 0 && <Section2 {...data} />}
      <Section3 {...data} />
      <Section4 {...data} />
      <Section5 {...data} />
    </div>
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

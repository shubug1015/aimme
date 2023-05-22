import { BiCheck } from 'react-icons/bi';

export default function Section2() {
  const list1 = [
    { id: 0, content: 'Keep updated on the lasted changes of the art market' },
    {
      id: 1,
      content: 'View the flow of market value by artwork you registered',
    },
    {
      id: 2,
      content:
        'Use insights to learn more about overall trends across global art market',
    },
    { id: 3, content: 'Search freely for auction results unlimited' },
  ];

  const list2 = [
    {
      id: 0,
      title: 'Auctioneer or Gallery',
      content: 'Who would like to raise sales using the art index and analysis',
    },
    {
      id: 1,
      title: 'Collector',
      content:
        'Who would like to conti-nuously follow up on the everchanging art market',
    },
    {
      id: 2,
      title: 'Art Enterprise',
      content: 'Who would like to work more up to date',
    },
  ];

  return (
    <div className='relative flex justify-center items-end w-screen pt-144 pb-24 bg-beige-200'>
      {/* White Box Start */}
      <div className='absolute -top-32 right-0 flex justify-center items-start flex-col bg-white w-288 pl-36 pr-28 py-16 lg:w-[44.375rem] lg:px-8 lg:pb-7 md:w-[21.5rem] md:-top-20'>
        {list1.map((l) => (
          <div
            key={l.id}
            className='flex justify-start items-start mb-16 last:mb-20 lg:mb-10 lg:last:mb-9'
          >
            <div className='flex justify-center items-center w-7 h-7 bg-black-400 text-white text-xl mr-11 lg:mr-4 md:w-[1.375rem] md:h-[1.25rem]'>
              <BiCheck className='text-white lg:ml-1 lg:mr-1' />
            </div>
            <div className='text-3xl font-semibold lg:text-[1.688rem] md:font-[1.563rem] md:-mt-2'>
              {l.content}
            </div>
          </div>
        ))}
        <div
          onClick={() =>
            window.open('https://kvn062bilo5.typeform.com/to/L1Ij7dSu')
          }
          className='border-solid border border-black-400 rounded px-12 py-6 ml-24 text-xl font-bold font-[Helvetica] lg:ml-[8.75rem] md:ml-[0.875rem] md:text-base md:px-6 md:py-5 hover:bg-[#ff7979] hover:border-[#ff7979] hover:text-white cursor-pointer transition-all'
        >
          Become Aimme's Early-bird
        </div>
      </div>
      {/* White Box End */}

      <div className='px-32 lg:px-0 md:mt-52 md:px-4'>
        <div className='ml-16 mb-16 text-6xl font-bold lg:text-[2.5rem] lg:ml-10 md:text-[2rem] md:ml-0'>
          If you are …
        </div>
        <div className='flex lg:flex-col md:space-y-8'>
          {list2.map((l) => (
            <div
              key={l.id}
              className='flex mr-20 last:mr-0 lg:ml-24 lg:mr-72 md:mr-0 md:ml-0'
            >
              <div className='text-6xl font-bold md:text-[2.8rem]'>
                {l.id + 1}
              </div>
              <div className='ml-5'>
                <div className='mt-11 mb-2 font-bold text-3xl md:text-[1.56rem]'>
                  {l.title}
                </div>
                <div className='font-[Helvetica] text-2xl md:text-[1.188rem]'>
                  {l.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

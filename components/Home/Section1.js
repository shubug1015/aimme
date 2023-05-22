import Image from 'next/image';
import MainBg from '@public/Home/1.png';

export default function Section1() {
  return (
    <div className='relative w-screen h-144 md:h-[20.8rem]'>
      <Image
        src={MainBg}
        alt='Home 01'
        placeholder='blur'
        layout='fill'
        objectFit='cover'
        // priority
      />
      <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-full text-center text-7xl font-bold md:text-[2.375rem]'>
        Get on board
        <br />
        the ever-changing art market
      </div>
    </div>
  );
}

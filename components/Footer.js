import Image from 'next/image';
import Link from 'next/link';
import Logo from '@public/Footer/Logo.png';
import Facebook from '@public/Footer/Facebook.png';
import Instagram from '@public/Footer/Instagram.png';

export default function Section2() {
  const openNewTab = (url) => {
    window.open(url);
  };

  return (
    <div className='w-screen bg-white px-56 pt-14 pb-10 font-[Helvetica] lg:px-10 md:px-4 md:py-[8.625rem] md:pb-[4.25rem]'>
      {/* Top Start */}
      <div className='flex justify-between items-center md:flex-col md:items-start'>
        <div
          className='relative w-20 h-10 cursor-pointer md:hidden'
          onClick={() => openNewTab('https://liittya.com')}
        >
          <Image
            src={Logo}
            alt='Footer Logo'
            // placeholder='blur'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='flex items-center'>
          <div
            className='relative w-6 h-6 mr-3.5 cursor-pointer'
            onClick={() =>
              openNewTab(
                'https://www.facebook.com/Aimme-113271170092535/?view_public_for=113271170092535'
              )
            }
          >
            <Image
              src={Facebook}
              alt='Footer Facebook'
              // placeholder='blur'
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div
            className='relative w-6 h-6 cursor-pointer'
            onClick={() => openNewTab('https://www.instagram.com/aimme.art/')}
          >
            <Image
              src={Instagram}
              alt='Footer Instagram'
              // placeholder='blur'
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
      </div>
      {/* Top End */}

      {/* Bottom Start */}
      <div className='flex justify-between items-center mt-10 md:col-start-center md:flex-col-reverse md:mt-8'>
        <div
          className='text-base text-black-50 cursor-pointer md:mt-4'
          onClick={() => openNewTab('https://liittya.com')}
        >
          © Liittya Inc.
        </div>
        <div
          className='relative w-20 h-10 cursor-pointer hidden mt-8 md:block'
          onClick={() => openNewTab('https://liittya.com')}
        >
          <Image
            src={Logo}
            alt='Footer Logo'
            // placeholder='blur'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='flex items-center md:grid md:grid-cols-2 md:w-screen'>
          <Link href='/about/about-us'>
            <a className='mr-8 text-base text-black-900'>About</a>
          </Link>
          <Link href='/about/contact-us'>
            <a className='mr-8 text-base text-black-900'>Contact</a>
          </Link>
          <div className='mr-8 text-base text-black-900'>Cookie policy</div>
          <div className='text-base text-black-900'>Privacy policy</div>
        </div>
      </div>
      {/* Bottom End */}
    </div>
  );
}

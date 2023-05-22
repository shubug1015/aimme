import { cls, useScrollDir } from 'libs/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import Logo from '@public/Header/logo.png';

export default function Header() {
  // Route 이동시 Mobile Hamburger Menu 닫기
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    router.events.on('routeChangeStart', () => setOpen(false));
  }, []);

  // Scroll Direction 함수
  const { scrollDir } = useScrollDir();

  return (
    <>
      <div
        className={cls(
          scrollDir === 'scroll down' ? 'py-4 shadow-sm' : 'py-6',
          'fixed top-0 left-0 w-screen bg-white flex justify-between items-center px-20 md:px-4 md:py-4 z-[100] transition-all'
        )}
      >
        <Link href='/'>
          <a className='relative w-[5.688rem] h-6 md:w-[3.812rem] md:h-4'>
            <Image
              src={Logo}
              alt='Logo'
              // placeholder='blur'
              layout='fill'
              objectFit='cover'
              priority
            />
          </a>
        </Link>

        <div className='flex items-center space-x-9 lg:space-x-5'>
          <div
            onClick={() =>
              window.open('https://kvn062bilo5.typeform.com/to/L1Ij7dSu')
            }
            className='text-sm border-solid border border-black-400 rounded px-4 py-2 font-[Helvetica] md:text-[0.625rem] md:px-3 md:py-1 hover:bg-[#ff7979] hover:border-[#ff7979] hover:text-white cursor-pointer transition-all'
          >
            Register Early-bird
          </div>
          <Link href='/about/contact-us'>
            <a>
              <div className='text-base font-[Helvetica] md:hidden'>
                Contact
              </div>
            </a>
          </Link>

          <Link href='/about/about-us'>
            <a>
              <div className='text-base font-[Helvetica] md:hidden'>About</div>
            </a>
          </Link>
          <div className='hidden text-2xl md:block group'>
            <IoIosMenu onClick={toggleOpen} />
          </div>
        </div>
      </div>

      <div
        className='fixed top-16 right-0 w-full h-[calc(100vh-4rem)] transition-transform z-[99]'
        style={{
          transform: open ? 'translateY(0)' : 'translateY(calc(-100vh + 4rem)',
        }}
      >
        <div className='font-[Helvetica] h-full'>
          <Link href='/about/about-us'>
            <a className='flex-start-center h-12 pl-4 border-t border-b border-[#f1f1f1] bg-white'>
              About
            </a>
          </Link>
          <Link href='/about/contact-us'>
            <a className='flex-start-center h-12 pl-4 border-b border-[#f1f1f1] bg-white'>
              Contact
            </a>
          </Link>
          {open && (
            <div className='h-[calc(100%-6rem)] bg-black-900 opacity-60' />
          )}
        </div>
      </div>
    </>
  );
}

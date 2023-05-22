import Seo from '@components/Seo';
import { contactApi } from 'api';
import { cls } from 'libs/utils';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function About({ params }) {
  const [type] = params;

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [nav, setNav] = useState(0);

  const clickNav = (num, ref, top) => {
    scrollToNav(ref, top);
    setNav(num);
  };

  const scrollToNav = (ref, top) =>
    window.scrollTo({
      behavior: 'smooth',
      top: ref.current.offsetTop - top,
    });

  useEffect(() => {
    if (type === 'about-us') {
      setNav(0);
      clickNav(0, ref1, 100);
    } else if (type === 'littya-inc') {
      setNav(1);
      clickNav(1, ref2, 85);
    } else if (type === 'contact-us') {
      setNav(2);
      clickNav(2, ref3, 68);
    }
  }, [type]);

  const handleName = (e) => {
    const {
      target: { value },
    } = e;

    setName(value);
  };

  const handleContent = (e) => {
    const {
      target: { value },
    } = e;

    setContent(value);
  };

  const handleEmail = (e) => {
    const {
      target: { value },
    } = e;

    setEmail(value);
  };

  const submitContact = async () => {
    await contactApi.contact({ name, content, email });
    window.location.reload();
  };

  return (
    <>
      <Seo title='About' />
      <div className='relative flex bg-beige-200 pt-18 pb-44 px-20 md:px-4'>
        {/* 네비게이션 Bar */}
        <div className='fixed top-44 text-xl font-[Helvetica] w-36 z-[97] md:flex md:top-24 md:w-screen md:left-0 md:flex-between-center md:px-4'>
          <div
            onClick={() => clickNav(0, ref1, 100)}
            className={cls(
              nav === 0
                ? 'border-l-4 border-[#ff7979] text-[#ff7979] font-bold'
                : 'border-0 ml-1',
              'pl-3 cursor-pointer'
            )}
          >
            About us
          </div>
          <div
            onClick={() => clickNav(1, ref2, 85)}
            className={cls(
              nav === 1
                ? 'border-l-4 border-[#ff7979] text-[#ff7979] font-bold'
                : 'border-0 ml-1',
              'pl-3 cursor-pointer mt-6 md:mt-0'
            )}
          >
            Liittya Inc.
          </div>
          <div
            onClick={() => clickNav(2, ref3, 68)}
            className={cls(
              nav === 2
                ? 'border-l-4 border-[#ff7979] text-[#ff7979] font-bold'
                : 'border-0 ml-1',
              'pl-3 cursor-pointer mt-6 md:mt-0'
            )}
          >
            Contact
          </div>
        </div>

        <div
          ref={ref1}
          className='w-[40rem] ml-64 lg:ml-44 md:ml-0 md:w-screen md:mt-10'
        >
          <div>
            <h1 className='text-[2rem] font-bold'>
              What makes art so difficult for us?
            </h1>
            <div className='text-[1.3rem] mt-6 font-[Helvetica]'>
              Why is it impossible to search an artwork’s price, no matter how
              hard we try? Aimme is here to answer all of your questions.
              <br />
              <br />
              Say goodbye to gatekeepers. With Aimme, anyone can access the art
              market database.
            </div>
          </div>

          <div className='mt-16'>
            <h1 className='text-[2rem] font-bold'>Aimme is everywhere.</h1>
            <div className='text-[1.3rem] mt-6 font-[Helvetica]'>
              Aimme is designed for all devices. Desktop or mobile, you can
              always rely on Aimme.
              <br />
              <br />
              And even if you don’t know anything about the work, there’s no
              need to worry. Aimme’s reverse image search can always look up the
              price for you.
            </div>
          </div>

          <div className='mt-16'>
            <h1 className='text-[2rem] font-bold'>
              Is there a work you’d like to buy? Aimme is here to help.
            </h1>
            <div className='text-[1.3rem] mt-6 font-[Helvetica]'>
              Using the price database from auction houses like Sotheby’s and
              Christie’s, Aimme predicts how much it will cost.
              <br />
              <br />
              Even if the work has never been traded before, Aimee can still
              predict the price by studying the artist, medium, size, period,
              and subject matter. And of course, all analyses and predictions
              are in real-time!
            </div>
          </div>

          <div
            ref={ref2}
            className='relative w-full h-80 mt-36 lg:h-[17rem] md:h-[13.5rem]'
          >
            <Image src='/Littya.png' alt='Liittya Inc Image' layout='fill' />
          </div>

          <div className='mt-16'>
            <h1 className='text-[2rem] font-bold'>Liittya Inc.</h1>
            <div className='text-[1.438rem] mt-6'>
              In January, Aimme will encounter mankind for the first time. Art
              is a collective heritage shared by humanity. Liittya inc. closely
              collaborates with Aimme to pass this legacy on to the next
              generations.
            </div>
          </div>

          <div ref={ref3} className='mt-16'>
            <h1 className='text-[2rem] font-bold'>Contact us</h1>
            <div className='text-[1.062rem] mt-6 font-[Helvetica] mb-10'>
              Business Hour: 9 AM to 6 PM
              <br />
              General support:{' '}
              <span className='text-[#ff7979]'>
                <a href='mailto:team.aimme@liittya.com'>
                  team.aimme@liittya.com
                </a>
              </span>
            </div>

            <form>
              <div className='text-sm font-[Helvetica] mb-2'>Name</div>
              <input
                type='text'
                placeholder='Please enter your name'
                value={name}
                onChange={handleName}
                className='w-full h-10 font-[Helvetica] pl-5 shadow-sm outline-none'
                required
              />

              <div className='text-sm font-[Helvetica] mb-2 mt-11'>Content</div>
              <textarea
                type='text'
                placeholder='Please enter the contents'
                value={content}
                onChange={handleContent}
                className='w-full h-18 font-[Helvetica] pl-5 pt-1.5 shadow-sm outline-none'
                required
              />

              <div className='text-sm font-[Helvetica] mb-2 mt-11'>Email</div>
              <input
                type='text'
                placeholder='Please enter your email address'
                value={email}
                onChange={handleEmail}
                className='w-full h-10 font-[Helvetica] pl-5 shadow-sm outline-none'
                required
              />

              <div className='flex-end-center w-full mt-11'>
                <div
                  onClick={submitContact}
                  className='flex-center-center w-28 h-[3.25rem] border border-[#333333] font-[Helvetica] text-xl rounded-[4px] bg-white hover:bg-[#ff7979] hover:border-[#ff7979] hover:text-white cursor-pointer transition-all'
                >
                  Submit
                </div>
              </div>
            </form>
          </div>

          <div className='mt-14'>
            <h1 className='text-[1.3rem] font-[Helvetica]'>
              Investments, Collaboration
            </h1>
            <div className='text-[1.3rem] font-medium mt-6'>Taylor Son</div>
            <div className='mt-2'>
              CEO, Founder
              <br />
              <a href='mailto:taylor@liittya.com'>taylor@liittya.com</a>
            </div>
          </div>

          <div className='mt-16'>
            <h1 className='text-[1.3rem] font-[Helvetica]'>Technology</h1>
            <div className='text-[1.3rem] font-medium mt-6'>Jason Park</div>
            <div className='mt-2'>
              CTO
              <br />
              <a href='mailto:jason@liittya.com'>jason@liittya.com</a>
            </div>
          </div>
        </div>
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

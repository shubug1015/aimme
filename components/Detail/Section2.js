import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Section2({ historycalPerfomanceWorks }) {
  const maxValue = Math.max(
    ...historycalPerfomanceWorks?.map((work) => JSON.parse(work.price))
  );

  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const [dottedLines, setDottedLines] = useState([]);
  let dottedLinesValue = [];

  useEffect(() => {
    const getOffset = (el) => {
      const rect = el.getBoundingClientRect();

      return {
        left: rect.left,
        top: rect.top - containerRef.current.getBoundingClientRect().top,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight,
      };
    };

    const connect = (el1, el2, num) => {
      const off1 = getOffset(el1);
      const off2 = getOffset(el2);

      const x1 = off1.left + off1.width;
      const y1 = off1.top + off1.height / 2;
      const x2 = off2.left;
      const y2 = off2.top + off2.height / 2;

      const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      const x = (x1 + x2) / 2 - length / 2;
      const y = (y1 + y2) / 2;
      const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);

      dottedLinesValue = [
        ...dottedLinesValue,
        { id: num, x, y, length, angle },
      ];
    };

    for (let i = 0; i < historycalPerfomanceWorks.length - 1; i++) {
      connect(dotsRef.current[i], dotsRef.current[i + 1], i);
    }

    setDottedLines(dottedLinesValue);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className='relative col-center-start bg-[#062233] py-28 lg:pt-12 lg:pb-8 md:col-start-center md:w-screen md:overflow-x-scroll'
      >
        <h1 className='w-[91rem] text-white font-bold font-[Helvetica] mb-32 lg:w-full lg:ml-10 lg:text-xl lg:font-normal'>
          Historical Performance of Similar Works
        </h1>
        <div className='relative flex-center-end w-[91rem] h-[33rem] lg:w-full lg:h-[19rem] md:w-[50rem]'>
          {/* Graph's Dots */}
          <div className='reltaive bg-navy-400 w-36 h-[1.95rem] lg:w-[calc(100%/24)]'>
            <div className='absolute bottom-10 -left-7 lg:-left-10'>
              <div className='relative w-36 h-[35rem] lg:w-20 lg:h-80'>
                <Image
                  src='/icons/column.png'
                  alt='Column Image'
                  layout='fill'
                />
              </div>
            </div>
          </div>
          {historycalPerfomanceWorks?.map((work) => (
            <div
              key={work.seq}
              className='col-end-center w-[6.636rem] h-full z-[1] lg:w-1/12'
            >
              <div className='relative col-end-center w-full h-[25rem] lg:h-52'>
                <div
                  className='absolute col-center-center group'
                  style={{
                    bottom: `${(work.price / maxValue) * 98}%`,
                  }}
                >
                  <div className='text-[#ffeac9] font-medium font-[Helvetica] group-hover:text-pink'>
                    ${work.price}
                  </div>
                  <div
                    ref={(el) => (dotsRef.current = [...dotsRef.current, el])}
                    className='bottom-4 flex-center-center bg-[#ffebcc] rounded-full w-5 aspect-square text-sm font-[Helvetica] lg:w-2.5 lg:h-2.5 lg:text-[0.438rem] group-hover:bg-pink'
                  >
                    <span>{work.unit}</span>
                  </div>
                </div>
              </div>

              {/* Photos */}
              <div className='flex-center-center bg-navy-400 w-20 aspect-square mt-4 mb-2 lg:w-14'>
                <div className='relative bg-white w-16 aspect-square lg:w-10'>
                  <Image
                    src={work.img}
                    alt='Historical Performance of Similar Work Image'
                    layout='fill'
                  />
                </div>
              </div>

              {/* Dates */}
              <div className='flex-center-center bg-navy-400 w-full h-8 text-white font-bold'>
                {work.date}
              </div>
            </div>
          ))}
          <div className='relative bg-navy-400 w-36 h-[1.85rem] lg:w-[calc(100%/24)]'>
            <div className='absolute bottom-10 -right-7 lg:-right-10'>
              <div className='relative w-36 h-[35rem] lg:w-20 lg:h-80'>
                <Image
                  src='/icons/column.png'
                  alt='Column Image'
                  layout='fill'
                />
              </div>
            </div>
          </div>

          {/* Background Lines */}
          <div className='absolute top-0 flex-center-center w-[72rem] h-[25rem] lg:w-full lg:h-52'>
            <div className='col-between-center w-full h-full lg:w-11/12 '>
              {[0, 1, 2, 3, 4].map((line, index) => (
                <div
                  key={index}
                  className='relative bg-[#245c74] w-full h-[0.3rem] mr-2'
                >
                  <div className='absolute -top-[0.5rem] -right-12 text-[#31728e] text-sm font-bold'>
                    {line === 0
                      ? ''
                      : line === 4
                      ? '$0.0M'
                      : `$${
                          (Math.round((maxValue / 4) * 10) / 10) * (4 - line)
                        }M`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dotted Lines */}
        {dottedLines.map((l) => (
          <div
            key={l.id}
            className='absolute h-1 border-t-2 border-[#ffebcc] border-dashed'
            style={{
              top: l.y,
              left: l.x,
              width: l.length,
              transform: `rotate(${l.angle}deg)`,
            }}
          />
        ))}
      </div>
    </>
  );
}

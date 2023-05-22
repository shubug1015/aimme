import { useEffect, useRef, useState } from 'react';

export default function Bar2({ averageAnnualSales }) {
  const maxValue = averageAnnualSales
    ? Math.round(
        Math.max(
          ...averageAnnualSales.map((sale) => JSON.parse(sale[2018])),
          ...averageAnnualSales.map((sale) => JSON.parse(sale[2019]))
        )
      )
    : 0;

  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const [dottedLines, setDottedLines] = useState([]);
  let dottedLinesValue = [];

  useEffect(() => {
    if (averageAnnualSales) {
      const getOffset = (el) => {
        const rect = el.getBoundingClientRect();

        return {
          left: rect.left - containerRef.current.getBoundingClientRect().left,
          top: rect.top - containerRef.current.getBoundingClientRect().top,
          width: rect.width || el.offsetWidth,
          height: rect.height || el.offsetHeight,
        };
      };

      const connectDots = (el1, el2, num) => {
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

      for (let i = 0; i < averageAnnualSales.length - 1; i++) {
        connectDots(dotsRef.current[i], dotsRef.current[i + 1], i);
      }

      setDottedLines(dottedLinesValue);
    }
  }, []);

  return (
    <div ref={containerRef} className='relative col-center-center'>
      <div className='flex-end-center w-full mr-1'>
        <div className='flex-center-center text-white font-semibold mr-4'>
          <div className='w-3 h-3 bg-[#ffebcc] mr-1.5' />
          2018
        </div>
        <div className='flex-center-center text-white font-semibold mr-6'>
          <div className='w-3 h-3 bg-[#c79b8f] mr-1.5' />
          2019
        </div>
        <div className='flex-center-center text-white font-semibold'>
          <div className='relative bg-white rounded-full border border-black-900 w-2 h-2 mr-5 after:content-[""] after:absolute after:top-1/2 after:left-1/2 after:border-t after:border-dotted after:border-white after:w-8 after:-translate-y-1/2 after:-translate-x-1/2' />
          Median 2019
        </div>
      </div>
      <div className='flex-center-start w-full'>
        <div className='flex flex-col justify-between items-end h-[19.5rem] text-[#639db7] mr-5 font-[Helvetica] text-[0.9rem]'>
          <div className='font-serif font-semibold text-base'>Million $</div>
        </div>

        <div className='relative flex-between-center w-[78rem] mt-12'>
          {averageAnnualSales?.map((sale) => (
            <div key={sale.seq} className='w-1/5 z-[1]'>
              <div className='relative flex-center-end w-full h-64'>
                <div className='col-end-center w-8 h-full group'>
                  <span className='text-[0.8rem] text-[#ffebcc] font-extrabold group-hover:text-[17px] group-hover:text-pink'>
                    ${sale[2018]}
                  </span>
                  <div
                    className='flex-center-start w-full bg-[#ffebcc] text-[0.8rem] border border-[#ffebcc] font-medium group-hover:bg-[#ede8e1] group-hover:border-pink group-hover:border-b-0'
                    style={{ height: `${(sale[2018] / maxValue) * 100}%` }}
                  />
                </div>

                <div className='col-end-center w-8 h-full group'>
                  <span className='text-[0.8rem] text-[#c79b8f] font-extrabold group-hover:text-[17px] group-hover:text-pink'>
                    ${sale[2019]}
                  </span>
                  <div
                    className='flex-center-start w-full bg-[#c79b8f] text-[0.8rem] border border-[#c79b8f] font-medium group-hover:bg-[#ede8e1] group-hover:border-pink group-hover:border-b-0'
                    style={{ height: `${(sale[2019] / maxValue) * 100}%` }}
                  />
                </div>

                {/* Dots */}
                <div
                  ref={(el) => (dotsRef.current = [...dotsRef.current, el])}
                  className='absolute bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-full border border-black-900 w-2 h-2'
                  style={{
                    bottom: `${(sale.medium / maxValue) * 100}%`,
                  }}
                />
              </div>
              <div className='flex-center-center w-full text-white font-bold mt-2'>
                {sale.title}
              </div>
            </div>
          ))}

          {/* Background Lines */}
          <div className='absolute top-0 w-full h-[16.1rem]'>
            <div className='col-between-center h-full'>
              <div className='relative bg-[#245c74] w-full h-[0.093rem]  mr-2'>
                <div className='absolute -top-2.5 -left-14 text-[#31728e] text-sm font-bold font-[Helvetica]'>
                  ${maxValue}
                </div>
              </div>
              <div className='relative bg-[#245c74] w-full h-[0.093rem]  mr-2'>
                <div className='absolute -top-2.5 -left-14 text-[#31728e] text-sm font-bold font-[Helvetica]'>
                  ${maxValue - maxValue / 5}
                </div>
              </div>
              <div className='relative bg-[#245c74] w-full h-[0.093rem]  mr-2'>
                <div className='absolute -top-2.5 -left-14 text-[#31728e] text-sm font-bold font-[Helvetica]'>
                  ${maxValue - (maxValue / 5) * 2}
                </div>
              </div>
              <div className='relative bg-[#245c74] w-full h-[0.093rem]  mr-2'>
                <div className='absolute -top-2.5 -left-14 text-[#31728e] text-sm font-bold font-[Helvetica]'>
                  ${maxValue - (maxValue / 5) * 3}
                </div>
              </div>
              <div className='relative bg-[#245c74] w-full h-[0.093rem]  mr-2'>
                <div className='absolute -top-2.5 -left-14 text-[#31728e] text-sm font-bold font-[Helvetica]'>
                  ${maxValue - (maxValue / 5) * 4}
                </div>
              </div>
              <div className='relative bg-white w-full h-[0.125rem]  mr-2'>
                <div className='absolute -top-2.5 -left-14 text-[#31728e] text-sm font-bold font-[Helvetica]'>
                  $0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='text-[#639db7] text-sm font-[Helvetica] mt-6'>
        *source: art basel and UBS art report 2019
      </div>

      {/* Dotted Lines */}
      {dottedLines.map((d) => (
        <div
          key={d.id}
          className='absolute h-1 z-[1] border-t-2 border-[#ffebcc] border-dashed'
          style={{
            top: d.y,
            left: d.x,
            width: d.length,
            transform: `rotate(${d.angle}deg)`,
          }}
        />
      ))}
    </div>
  );
}

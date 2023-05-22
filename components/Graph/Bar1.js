import { useEffect, useRef, useState } from 'react';

export default function Bar1({ tradeVolumes }) {
  const maxValue = Math.max(
    ...tradeVolumes.map((volume) => JSON.parse(volume.value))
  );

  const maxVolume = Math.max(
    ...tradeVolumes.map((volume) => JSON.parse(volume.volume))
  );

  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const [dottedLines, setDottedLines] = useState([]);
  let dottedLinesValue = [];

  useEffect(() => {
    const getOffset = (el) => {
      const rect = el.getBoundingClientRect();

      return {
        left: rect.left - containerRef.current.getBoundingClientRect().left,
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

    for (let i = 0; i < tradeVolumes.length - 1; i++) {
      connect(dotsRef.current[i], dotsRef.current[i + 1], i);
    }

    setDottedLines(dottedLinesValue);
  }, []);

  return (
    <div ref={containerRef} className='relative col-center-center'>
      <div className='flex-end-center w-full mr-1'>
        <div className='flex-center-center text-white font-semibold mr-4'>
          <div className='w-3 h-3 bg-[#ffebcc] mr-1.5' />
          Value
        </div>
        <div className='flex-center-center text-white font-semibold'>
          <div className='relative w-3 h-3 mr-1.5 after:content-[""] after:absolute after:top-1/2 after:left-0 after:border-t after:border-dotted after:border-white after:w-full after:-translate-y-1/2' />
          Volume
        </div>
      </div>
      <div className='flex-center-start w-full'>
        <div className='flex flex-col justify-between items-end h-[19.5rem] text-[#639db7] mr-5 font-[Helvetica] text-[0.9rem]'>
          <div className='font-serif font-semibold text-base'>Billion $</div>
          {[8, 7, 6, 5, 4, 3, 2, 1].map((value) => (
            <div key={value}>${((maxValue / 8) * value).toFixed(1)}</div>
          ))}
          <div>$0</div>
        </div>
        <div className='flex-between-center w-[32rem] mt-12'>
          {tradeVolumes?.map((volume) => (
            <div key={volume.seq} className='relative group'>
              <div className='col-center-center w-8 h-64'>
                <div
                  className='w-full bg-gradient-to-t from-[rgba(0,0,0,0)] to-[#ffffff1f]'
                  style={{
                    height: `${100 - (volume.value / maxValue) * 100}%`,
                  }}
                />
                <div
                  className='flex-center-start w-full bg-[#ffebcc] text-[0.8rem] font-medium group-hover:bg-[#ede8e1] group-hover:shadow-[1px_2px_6px_0_rgba(95,152,178,0.85)] group-hover:text-[15px] group-hover:font-semibold'
                  style={{ height: `${(volume.value / maxValue) * 100}%` }}
                >
                  ${volume.value}
                </div>
              </div>
              <span className='text-white font-bold group-hover:underline'>
                {volume.year}
              </span>
              <div
                ref={(el) => (dotsRef.current = [...dotsRef.current, el])}
                className='absolute left-1/2 -translate-x-1/2'
                style={{
                  bottom: `${(JSON.parse(volume.volume) / maxVolume) * 98}%`,
                }}
              />
            </div>
          ))}
        </div>
        <div className='flex flex-col justify-between items-start h-[19.5rem] text-[#639db7] ml-5 font-[Helvetica] text-[0.9rem]'>
          <div className='font-serif font-semibold text-base invisible'>$</div>
          {[7, 6, 5, 4, 3, 2, 1].map((volume) => (
            <div key={volume}>
              ${Math.round(((maxVolume / 7) * volume) / 10000) * 10000}
            </div>
          ))}
          <div>0</div>
        </div>
      </div>

      {/* Dotted Lines */}
      {dottedLines.map((l) => (
        <div
          key={l.id}
          className='absolute h-1 z-10'
          style={{
            top: l.y,
            left: l.x,
            width: l.length,
            transform: `rotate(${l.angle}deg)`,
            backgroundImage:
              'linear-gradient(to right, #ffffff 70%, rgba(255,255,255,0) 0%)',
            backgroundPosition: 'bottom',
            backgroundSize: '5px 1px',
            backgroundRepeat: 'repeat-x',
          }}
        />
      ))}
    </div>
  );
}

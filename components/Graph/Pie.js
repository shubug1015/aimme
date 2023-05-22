import { useEffect, useRef } from 'react';

export default function Pie() {
  const chart1 = useRef(null),
    chart2 = useRef(null),
    chart3 = useRef(null),
    chart4 = useRef(null),
    chart5 = useRef(null),
    chart6 = useRef(null),
    chart7 = useRef(null);

  const chart8 = useRef(null),
    chart9 = useRef(null),
    chart10 = useRef(null),
    chart11 = useRef(null),
    chart12 = useRef(null),
    chart13 = useRef(null),
    chart14 = useRef(null);

  const chartData1 = [
    {
      chartNo: chart1,
      percent: 42,
      bgColor: '#ffffff',
    },
    {
      chartNo: chart2,
      percent: 38,
      bgColor: '#6c4c43',
    },
    {
      chartNo: chart3,
      percent: 7,
      bgColor: '#9f6656',
    },
    {
      chartNo: chart4,
      percent: 6,
      bgColor: '#ab7b6e',
    },
    {
      chartNo: chart5,
      percent: 1,
      bgColor: '#d3b08e',
    },
    {
      chartNo: chart6,
      percent: 1,
      bgColor: '#dcc19c',
    },
    {
      chartNo: chart7,
      percent: 5,
      bgColor: '#ffebcc',
    },
  ];

  const chartData2 = [
    {
      chartNo: chart8,
      percent: 42,
      bgColor: '#ffffff',
    },
    {
      chartNo: chart9,
      percent: 38,
      bgColor: '#6c4c43',
    },
    {
      chartNo: chart10,
      percent: 7,
      bgColor: '#9f6656',
    },
    {
      chartNo: chart11,
      percent: 6,
      bgColor: '#ab7b6e',
    },
    {
      chartNo: chart12,
      percent: 1,
      bgColor: '#d3b08e',
    },
    {
      chartNo: chart13,
      percent: 1,
      bgColor: '#dcc19c',
    },
    {
      chartNo: chart14,
      percent: 5,
      bgColor: '#ffebcc',
    },
  ];

  const colorFn = (percent, ref, color) => {
    ref.current.style.background = `conic-gradient(${color} 0% ${
      percent - 0.4
    }%, #0c435b ${
      percent - 0.4
    }% ${percent}%, rgba(0, 0, 0, 0) ${percent}% 100%)`;
  };

  const makeChart = (percent, ref, color) => {
    let i = 0;

    let func1 = setInterval(function () {
      if (i <= percent) {
        if (ref.current) {
          colorFn(i, ref, color);
          i++;
        } else {
          return;
        }
      } else {
        clearInterval(func1);
      }
    }, 10);
  };

  useEffect(() => {
    let sum1 = 0,
      sum2 = 0;

    chartData1.map((c) => {
      sum1 += c.percent;
      makeChart(sum1, c.chartNo, c.bgColor);
    });

    chartData2.map((c) => {
      sum2 += c.percent;
      makeChart(sum2, c.chartNo, c.bgColor);
    });
  }, []);

  useEffect(() => {
    // const getOffset = (el) => {
    //   const rect = el.getBoundingClientRect();
    //   return {
    //     top: rect.top + window.pageYOffset + 152,
    //     left: rect.left + window.pageXOffset + 152,
    //   };
    // };
  }, []);

  return (
    <div className='col-center-center w-full bg-navy-400'>
      <div className='flex-between-center w-full lg:flex-col'>
        {/* Pie 1 */}
        <div className='relative col-center-center'>
          <div className='relative pie -scale-x-100' ref={chart7}>
            {/* <div
              className='absolute -translate-y-1/2 -translate-x-1/2 w-4 aspect-square bg-pink z-10'
              style={{
                top: getOffset(chart7.current)?.top,
                right: getOffset(chart7.current)?.left,
              }}
            /> */}
            <div className='pie' ref={chart6}>
              {/* <div className='pie' ref={chart5}>
                <div className='pie' ref={chart4}>
                  <div className='pie' ref={chart3}>
                    <div className='pie' ref={chart2}>
                      <div className='pie' ref={chart1}>
                        <div className='center flex-col w-48 h-48 text-white font-bold text-xl -scale-x-100'>
                          <div>Market share</div>
                          <div>by Volume</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Pie 2 */}
        <div className='relative col-center-center lg:mt-14'>
          <div className='pie -scale-x-100' ref={chart14}>
            <div className='pie' ref={chart13}>
              <div className='pie' ref={chart12}>
                <div className='pie' ref={chart11}>
                  <div className='pie' ref={chart10}>
                    <div className='pie' ref={chart9}>
                      <div className='pie' ref={chart8}>
                        <div className='center flex-col w-48 h-48 text-white font-bold text-xl -scale-x-100'>
                          <div>Market share</div>
                          <div>by Volume</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className='text-[#639db7] text-sm font-[Helvetica] mt-6'>
        *source: art basel and UBS art report 2019
      </div>
    </div>
  );
}

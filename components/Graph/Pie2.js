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
      percent: 75,
      bgColor: '#0c435b',
    },
    {
      chartNo: chart2,
      percent: 9,
      bgColor: '#d9af89',
    },
    {
      chartNo: chart3,
      percent: 16,
      bgColor: '#b3796b',
    },
  ];

  const colorFn = (percent, ref, color) => {
    ref.current.style.background = `conic-gradient(${color} 0% ${
      percent - 0.4
    }%, white ${
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
    let sum1 = 0;

    chartData1.map((c) => {
      sum1 += c.percent;
      makeChart(sum1, c.chartNo, c.bgColor);
    });
  }, []);

  return (
    <div className='lg:w-full'>
      <div className='flex'>
        <div className='flex-center-center w-[14.25rem] h-[3.5rem] bg-white font-bold'>
          Turnover
        </div>
        <div className='flex-center-center w-[14.25rem] h-[3.125rem] bg-white rounded-[10px] mx-[0.3rem] font-bold'>
          Number of lots sold
        </div>
      </div>

      <div className='col-center-center w-[41.4rem] h-[26.44rem] bg-white lg:w-full'>
        <div className='flex-center-center w-full'>
          {/* Pie 1 */}
          <div className='relative col-center-center'>
            <div className='pie' ref={chart3}>
              <div className='pie' ref={chart2}>
                <div className='pie' ref={chart1}>
                  <div className='center flex-col w-48 h-48 bg-white'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

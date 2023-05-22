import { useEffect, useRef } from 'react';

export default function Test2({ marketShare }) {
  const chart1 = useRef(null),
    chart2 = useRef(null),
    chart3 = useRef(null),
    chart4 = useRef(null),
    chart5 = useRef(null),
    chart6 = useRef(null),
    chart7 = useRef(null),
    chart8 = useRef(null),
    chart9 = useRef(null),
    chart10 = useRef(null);

  const chartRef1 = [
      {
        chartNo: chart1,
        bgColor: '#ffffff',
      },
      {
        chartNo: chart2,
        bgColor: '#ab7b6e',
      },
      {
        chartNo: chart3,
        bgColor: '#d3b08e',
      },
      {
        chartNo: chart4,
        bgColor: '#dcc19c',
      },
      {
        chartNo: chart5,
        bgColor: '#ffebcc',
      },
    ],
    chartRef2 = [
      {
        chartNo: chart6,
        bgColor: '#ffffff',
      },
      {
        chartNo: chart7,
        bgColor: '#ab7b6e',
      },
      {
        chartNo: chart8,
        bgColor: '#d3b08e',
      },
      {
        chartNo: chart9,
        bgColor: '#dcc19c',
      },
      {
        chartNo: chart10,
        bgColor: '#ffebcc',
      },
    ];

  const chartData1 = marketShare?.map((share, index) => ({
    chartNo: chartRef1[index].chartNo,
    percent: share.value,
    bgColor: chartRef1[index].bgColor,
    title: share.title,
  }));

  const chartData2 = marketShare?.map((share, index) => ({
    chartNo: chartRef2[index].chartNo,
    percent: share.volume,
    bgColor: chartRef2[index].bgColor,
    title: share.title,
  }));

  const colorFn = (i, className, color) => {
    className.current.style.background = `conic-gradient(${color} 0% ${i}%, rgba(255, 255, 255, 0.1) ${i}% 100%)`;
  };

  const makeChart = (percent, className, color) => {
    let i = 0;

    let func1 = setInterval(function () {
      if (i < percent) {
        if (className.current) {
          colorFn(i, className, color);
          i++;
        } else {
          //cannot read property 'style' of null
          return;
        }
      } else {
        clearInterval(func1);
      }
    }, 10);
  };

  useEffect(() => {
    chartData1?.map((row) => {
      makeChart(row.percent, row.chartNo, row.bgColor);
    });

    chartData2?.map((row) => {
      makeChart(row.percent, row.chartNo, row.bgColor);
    });
  }, [marketShare]);

  return (
    <div className='relative flex-between-center w-full'>
      {/* Multipe Doughnut 1 */}
      <div className='relative col-center-center'>
        <div className='doughnut w-60 h-60 -scale-x-100' ref={chart1}>
          <div className='center w-56 h-56'>
            <div className='doughnut w-54 h-54' ref={chart2}>
              <div className='center w-50 h-50'>
                <div className='doughnut w-48 h-48' ref={chart3}>
                  <div className='center w-44 h-44'>
                    <div className='doughnut w-42 h-42' ref={chart4}>
                      <div className='center w-38 h-38'>
                        <div className='doughnut w-36 h-36' ref={chart5}>
                          <div className='center w-32 h-32'></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className='text-white font-bold mt-5'>a. By Value of Sales</span>

        {/* Percentage */}
        <div className='absolute top-0 left-[calc(50%+0.3rem)] col-center-center text-white text-xs font-extrabold leading-[0.73rem]'>
          {chartData1?.map((data, index) => (
            <div key={index}>{data.percent}%</div>
          ))}
        </div>
      </div>

      {/* Center Text */}
      {chartData1 && (
        <div className='absolute top-0 left-1/2 -translate-x-1/2 col-center-center text-xs font-extrabold leading-[0.73rem]'>
          <div className='text-white'>{chartData1[0].title}</div>
          <div className='text-[#a8796c]'>{chartData1[1].title}</div>
          <div className='text-[#d2af8d]'>{chartData1[2].title}</div>
          <div className='text-[#ebcea6]'>{chartData1[3].title}</div>
          <div className='text-[#ffebcc]'>{chartData1[4].title}</div>
        </div>
      )}

      {/* Multipe Doughnut 2 */}
      <div className='relative col-center-center'>
        <div className='doughnut w-60 h-60' ref={chart6}>
          <div className='center w-56 h-56'>
            <div className='doughnut w-54 h-54' ref={chart7}>
              <div className='center w-50 h-50'>
                <div className='doughnut w-48 h-48' ref={chart8}>
                  <div className='center w-44 h-44'>
                    <div className='doughnut w-42 h-42' ref={chart9}>
                      <div className='center w-38 h-38'>
                        <div className='doughnut w-36 h-36' ref={chart10}>
                          <div className='center w-32 h-32'></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className='text-white font-bold mt-5'>a. By Value of Sales</span>

        {/* Percentage */}
        <div className='absolute top-0 left-[calc(50%-1.7rem)]  col-center-center text-white text-xs font-extrabold leading-[0.73rem]'>
          {chartData2?.map((data, index) => (
            <div key={index}>{data.percent}%</div>
          ))}
        </div>
      </div>
    </div>
  );
}

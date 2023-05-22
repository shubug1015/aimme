import dynamic from 'next/dynamic';
import { useState } from 'react';

const Doughnut = dynamic(
  () => import('@nivo/pie').then((mod) => mod.ResponsivePieCanvas),
  { ssr: false }
);

export default function Doughnut2({ distributionBymaterial }) {
  const data1 = distributionBymaterial?.turnover?.map((material, index) => ({
    id: index,
    label: `${material.percent}% ${material.material} ${
      material.price ? material.price : ''
    }`,
    value: JSON.parse(material.percent),
  }));

  const data2 = distributionBymaterial?.lotsSold?.map((material, index) => ({
    id: index,
    label: `${material.percent}% ${material.material} ${
      material.price ? material.price : ''
    }`,
    value: JSON.parse(material.percent),
  }));

  const theme = {
    fontSize: 14,
    fontFamily: 'EB Garamond',
  };

  const [type, setType] = useState(0);

  const selectType = (id) => {
    setType(id);
  };

  return (
    <div className='lg:w-full'>
      <div className='flex'>
        <div
          onClick={() => selectType(0)}
          className='flex-center-center w-[14.25rem] h-[3.5rem] bg-white font-bold cursor-pointer'
          style={{
            height: type === 0 ? '3.5rem' : '3.125rem',
            borderRadius: type === 0 ? 0 : '10px',
          }}
        >
          Turnover
        </div>
        <div
          onClick={() => selectType(1)}
          className='flex-center-center w-[14.25rem] h-[3.125rem] bg-white rounded-[10px] mx-[0.3rem] font-bold cursor-pointer'
          style={{
            height: type === 1 ? '3.5rem' : '3.125rem',
            borderRadius: type === 1 ? 0 : '10px',
          }}
        >
          Number of lots sold
        </div>
      </div>
      <div className='w-[42rem] h-96 bg-white'>
        <Doughnut
          data={type === 0 ? data1 : data2}
          margin={{ top: 50, right: 20, bottom: 50, left: 20 }}
          innerRadius={0.65}
          padAngle={1}
          activeOuterRadiusOffset={50}
          colors={['#0c435b', '#d9af89', '#b3796b']}
          borderColor='black'
          arcLinkLabel='label'
          arcLinkLabelsTextOffset={5}
          arcLinkLabelsTextColor='#333333'
          arcLinkLabelsDiagonalLength={20}
          arcLinkLabelsStraightLength={20}
          arcLinkLabelsThickness={0}
          arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
          enableArcLabels={false}
          arcLabel='value'
          arcLabelsRadiusOffset={0.95}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor='#ffffff'
          isInteractive={false}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          legends={[]}
          theme={theme}
        />
      </div>
    </div>
  );
}

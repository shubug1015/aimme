import dynamic from 'next/dynamic';

const Doughnut = dynamic(
  () => import('@nivo/pie').then((mod) => mod.ResponsivePieCanvas),
  { ssr: false }
);

export default function Doughnut1({ marketShareByValue, marketShareByVolume }) {
  const data1 = marketShareByValue.map((value, index) => ({
    id: index,
    label: `${value.value}% ${value.title}`,
    value: JSON.parse(value.value),
  }));

  const data2 = marketShareByVolume.map((value, index) => ({
    id: index,
    label: `${value.title} ${value.value}%`,
    value: JSON.parse(value.value),
  }));

  const theme = {
    fontSize: 14,
    fontFamily: 'EB Garamond',
  };

  return (
    <div className='flex justify-between w-full md:flex-col'>
      <div className='relative w-[36rem] h-80'>
        <Doughnut
          data={data1}
          margin={{ top: 25, right: 20, bottom: 25, left: 20 }}
          innerRadius={0.65}
          padAngle={1}
          activeOuterRadiusOffset={50}
          colors={[
            '#ffffff',
            '#6c4c43',
            '#9f6656',
            '#ab7b6e',
            '#d3b08e',
            '#dcc19c',
            '#ffebcc',
          ]}
          borderColor='black'
          arcLinkLabel='label'
          arcLinkLabelsTextOffset={5}
          arcLinkLabelsTextColor='#ffffff'
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
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold text-xl text-white'>
          a. Market share
          <br />
          by Value
        </div>
      </div>

      <div className='relative w-[36rem] h-80'>
        <Doughnut
          data={data2}
          margin={{ top: 25, right: 20, bottom: 25, left: 20 }}
          innerRadius={0.65}
          padAngle={1}
          activeOuterRadiusOffset={50}
          colors={[
            '#ffffff',
            '#6c4c43',
            '#9f6656',
            '#ab7b6e',
            '#d3b08e',
            '#dcc19c',
            '#ffebcc',
          ]}
          borderColor='black'
          arcLinkLabel='label'
          arcLinkLabelsTextOffset={5}
          arcLinkLabelsTextColor='#ffffff'
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
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold text-xl text-white'>
          b. Market share
          <br />
          by Volume
        </div>
      </div>
    </div>
  );
}

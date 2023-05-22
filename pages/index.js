import Seo from '@components/Seo';
import Section1 from '@components/Home/Section1';
import Section2 from '@components/Home/Section2';
import Section3 from '@components/Home/Section3';
import Section4 from '@components/Home/Section4';
import Section5 from '@components/Home/Section5';

export default function Home() {
  return (
    <>
      <Seo title='Home' />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </>
  );
}

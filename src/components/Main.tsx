import IntroSection from './IntroSection';
import AboutSection from './AboutSection';

export default function Main({ screenWidth }: { screenWidth: any }) {
  return (
    <main>
      <IntroSection />
      <AboutSection screenWidth={screenWidth} />
      <section id='languages' className=''>
        <h2>Languages I Know</h2>
      </section>
      <section id='projects' className='min-h-[50vh]'>
        Projects
      </section>
      <section id='contact' className='min-h-[50vh]'>
        Contact
      </section>
    </main>
  );
}
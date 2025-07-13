import IntroSection from './IntroSection';
import AboutSection from './AboutSection';
import LanguagesSection from './LanguagesSection';

export default function Main({ screenWidth }: { screenWidth: any }) {
  return (
    <main>
      <IntroSection />
      <AboutSection screenWidth={screenWidth} />
      <LanguagesSection />
      <section id='projects' className='min-h-[50vh]'>
        Projects
      </section>
      <section id='contact' className='min-h-[50vh]'>
        Contact
      </section>
    </main>
  );
}
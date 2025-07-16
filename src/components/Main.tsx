import IntroSection from './IntroSection';
import AboutSection from './AboutSection';
import LanguagesSection from './LanguagesSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

export default function Main({ screenWidth }: { screenWidth: any }) {
  return (
    <main>
      <IntroSection />
      <AboutSection screenWidth={screenWidth} />
      <LanguagesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
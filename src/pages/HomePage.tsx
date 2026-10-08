import AboutSection from '../components/home/AboutSection';
import ClientsSection from '../components/home/ClientsSection';
import ContactCta from '../components/home/ContactCta';
import HeroSection from '../components/home/HeroSection';
import HighlightsStrip from '../components/home/HighlightsStrip';
import ProjectsSection from '../components/home/ProjectsSection';
import PurposeSection from '../components/home/PurposeSection';
import QualitySafetySection from '../components/home/QualitySafetySection';
import ServicesSection from '../components/home/ServicesSection';
import WhyChooseSection from '../components/home/WhyChooseSection';
import { pageMeta } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

export default function HomePage() {
  usePageMeta(pageMeta.home);

  return (
    <>
      <HeroSection />
      <HighlightsStrip />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ClientsSection />
      <WhyChooseSection />
      <QualitySafetySection />
      <PurposeSection />
      <ContactCta />
    </>
  );
}

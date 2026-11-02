import AboutSection from '../components/home/AboutSection';
import ClientsSection from '../components/home/ClientsSection';
import HeroSection from '../components/home/HeroSection';
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
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ClientsSection />
      <WhyChooseSection />
      <QualitySafetySection />
      <PurposeSection />
    </>
  );
}

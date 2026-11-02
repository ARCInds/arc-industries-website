import ArcRings from '../components/common/ArcRings';
import DotGrid from '../components/common/DotGrid';
import NumberedList from '../components/common/NumberedList';
import PageHero from '../components/common/PageHero';
import Section from '../components/common/Section';
import SectionHeading from '../components/common/SectionHeading';
import { pageHeroImages } from '../data/images';
import { pageMeta } from '../data/seo';
import { services } from '../data/services';
import { usePageMeta } from '../hooks/usePageMeta';

export default function ServicesPage() {
  usePageMeta(pageMeta.services);

  return (
    <>
      <PageHero
        breadcrumb="Services"
        background={pageHeroImages.services}
        eyebrow="Our Services"
        title="Construction capabilities built for diverse project requirements."
        subtitle="ARC Industries undertakes civil, structural and infrastructure works for Government, PSU and Private sector projects."
      />

      <Section
        labelledBy="services-list-heading"
        fill
        tone="muted"
        decoration={
          <>
            <ArcRings size={560} animate sx={{ right: -240, top: -200, opacity: 0.35 }} />
            <DotGrid sx={{ left: -60, bottom: 40 }} />
          </>
        }
      >
        <SectionHeading
          id="services-list-heading"
          eyebrow="Capabilities"
          title="What We Do"
          subtitle="Seven areas of construction work across Government, PSU and Private sector projects."
        />
        <NumberedList items={services} collapsible />
      </Section>
    </>
  );
}

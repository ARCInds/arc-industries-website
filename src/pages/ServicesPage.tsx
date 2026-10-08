import NumberedList from '../components/common/NumberedList';
import PageHero from '../components/common/PageHero';
import Section from '../components/common/Section';
import SectionHeading from '../components/common/SectionHeading';
import ContactCta from '../components/home/ContactCta';
import { pageMeta } from '../data/seo';
import { services } from '../data/services';
import { usePageMeta } from '../hooks/usePageMeta';

export default function ServicesPage() {
  usePageMeta(pageMeta.services);

  return (
    <>
      <PageHero
        breadcrumb="Services"
        eyebrow="Our Services"
        title="Construction capabilities built for diverse project requirements."
        subtitle="ARC Industries undertakes civil, structural and infrastructure works for Government, PSU and Private sector projects."
      />

      <Section labelledBy="services-list-heading">
        <SectionHeading
          id="services-list-heading"
          eyebrow="Capabilities"
          title="What We Do"
          subtitle="Seven areas of construction work across Government, PSU and Private sector projects."
        />
        <NumberedList items={services} />
      </Section>

      <ContactCta subtitle="Share your requirement with ARC Industries and let us understand how we can support your project." />
    </>
  );
}

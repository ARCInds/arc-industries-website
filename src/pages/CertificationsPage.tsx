import ArcRings from '../components/common/ArcRings';
import DotGrid from '../components/common/DotGrid';
import NumberedList from '../components/common/NumberedList';
import PageHero from '../components/common/PageHero';
import Section from '../components/common/Section';
import SectionHeading from '../components/common/SectionHeading';
import { certifications } from '../data/certifications';
import { pageHeroImages } from '../data/images';
import { pageMeta } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

export default function CertificationsPage() {
  usePageMeta(pageMeta.certifications);

  return (
    <>
      <PageHero
        breadcrumb="Certifications"
        background={pageHeroImages.certifications}
        eyebrow="Certifications"
        title="Registrations & Credentials"
        subtitle="Statutory registrations, licences and supporting documents held by ARC Industries."
      />

      <Section
        labelledBy="credentials-heading"
        tone="muted"
        decoration={
          <>
            <ArcRings size={560} animate sx={{ left: -260, bottom: -260, opacity: 0.35 }} />
            <DotGrid sx={{ right: -40, top: 40 }} />
          </>
        }
      >
        <SectionHeading
          id="credentials-heading"
          eyebrow="Credentials"
          title="Registrations, licences and documents"
          subtitle="Registration numbers and document copies are not displayed on this website."
        />
        <NumberedList
          items={certifications.map(({ name, description }) => ({ title: name, description }))}
        />
      </Section>
    </>
  );
}

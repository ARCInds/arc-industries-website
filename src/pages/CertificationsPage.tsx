import NumberedList from '../components/common/NumberedList';
import PageHero from '../components/common/PageHero';
import Section from '../components/common/Section';
import SectionHeading from '../components/common/SectionHeading';
import ContactCta from '../components/home/ContactCta';
import { certifications } from '../data/certifications';
import { pageMeta } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

export default function CertificationsPage() {
  usePageMeta(pageMeta.certifications);

  return (
    <>
      <PageHero
        breadcrumb="Certifications"
        eyebrow="Certifications"
        title="Registrations & Credentials"
        subtitle="Statutory registrations, licences and supporting documents held by ARC Industries."
      />

      <Section labelledBy="credentials-heading">
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

      <ContactCta />
    </>
  );
}

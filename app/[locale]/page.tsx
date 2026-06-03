import Hero from '../../components/Hero';
import ServicesList from '../../components/ServicesList';
import Contact from '../../components/Contact';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Если вам нужен locale в будущем
  const { locale } = await params;
  
  return (
    <>
      <Hero />
      <ServicesList />
      <Contact />
    </>
  );
}
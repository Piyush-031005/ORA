import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/hero/Hero';
import ToothAnatomy from '@/components/sections/ToothAnatomy';
import TreatmentJourney from '@/components/sections/TreatmentJourney';
import Services from '@/components/sections/Services';
import Doctors from '@/components/sections/Doctors';
import QueueBooking from '@/components/queue/QueueBooking';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div id="doctors">
          <Doctors />
        </div>
        <div id="journey">
          <TreatmentJourney />
        </div>
        <div id="treatments">
          <Services />
        </div>
        <div id="queue">
          <QueueBooking />
        </div>
      </main>
      <Footer />
    </>
  );
}

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/hero/Hero';
import ToothAnatomy from '@/components/sections/ToothAnatomy';
import TreatmentJourney from '@/components/sections/TreatmentJourney';
import Doctors from '@/components/sections/Doctors';
import Reviews from '@/components/sections/Reviews';
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
        <div id="treatments-interactive">
          <ToothAnatomy />
        </div>
        <div id="journey">
          <TreatmentJourney />
        </div>
        <div id="reviews">
          <Reviews />
        </div>
        <div id="queue">
          <QueueBooking />
        </div>
      </main>
      <Footer />
    </>
  );
}

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import Bestsellers from '@/components/Bestsellers';
import IngredientStory from '@/components/IngredientStory';
import Testimonials from '@/components/Testimonials';
import SubscriptionCTA from '@/components/SubscriptionCTA';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Bestsellers />
        <IngredientStory />
        <Testimonials />
        <SubscriptionCTA />
      </main>
      <Footer />
      <CartDrawer />
      <Chatbot />
    </>
  );
}

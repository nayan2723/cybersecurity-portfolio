import { motion } from 'framer-motion';
import FullscreenNav from '@/components/FullscreenNav';
import CuratedHero from '@/components/CuratedHero';
import CuratedProjects from '@/components/CuratedProjects';
import QuirkyAbout from '@/components/QuirkyAbout';
import MiniGames from '@/components/MiniGames';
import EasterEggs from '@/components/EasterEggs';
import AnimatedMascot from '@/components/AnimatedMascot';
import BlogSection from '@/components/BlogSection';
import Contact from '@/components/Contact';
import EnhancedFooter from '@/components/EnhancedFooter';
import ThemeSwitch from '@/components/ThemeSwitch';

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <FullscreenNav />
      <ThemeSwitch />
      
      <main className="relative">
        <section id="home">
          <CuratedHero />
        </section>
        
        <section id="curated-projects">
          <CuratedProjects />
        </section>
        
        <section id="about">
          <QuirkyAbout />
        </section>
        
        <section id="games">
          <MiniGames />
        </section>
        
        <section id="easter-eggs">
          <EasterEggs />
        </section>
        
        <section id="blog">
          <BlogSection />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
        
        <EnhancedFooter />
        <AnimatedMascot />
      </main>
    </motion.div>
  );
};

export default Index;
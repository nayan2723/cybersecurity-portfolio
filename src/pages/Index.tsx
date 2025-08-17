import { motion } from 'framer-motion';
import FullscreenNav from '@/components/FullscreenNav';
import CuratedHero from '@/components/CuratedHero';
import CuratedProjects from '@/components/CuratedProjects';
import SkillsChart from '@/components/SkillsChart';
import BlogSection from '@/components/BlogSection';
import ComponentShowcase from '@/components/ComponentShowcase';
import Contact from '@/components/Contact';
import EnhancedFooter from '@/components/EnhancedFooter';

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <FullscreenNav />
      
      <main className="relative">
        <section id="home">
          <CuratedHero />
        </section>
        
        <section id="curated-projects">
          <CuratedProjects />
        </section>
        
        <section id="skills-chart">
          <SkillsChart />
        </section>
        
        <section id="blog">
          <BlogSection />
        </section>
        
        <section id="showcase">
          <ComponentShowcase />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
        
        <EnhancedFooter />
      </main>
    </motion.div>
  );
};

export default Index;
import { motion } from 'framer-motion';
import { Suspense, lazy, ComponentType } from 'react';
import FullscreenNav from '@/components/FullscreenNav';
import CuratedHero from '@/components/CuratedHero';
import CuratedProjects from '@/components/CuratedProjects';
import QuirkyAbout from '@/components/QuirkyAbout';
import MiniGames from '@/components/MiniGames';
import EasterEggs from '@/components/EasterEggs';
import AnimatedMascot from '@/components/AnimatedMascot';
import EnhancedSkills from '@/components/EnhancedSkills';
import BlogSection from '@/components/BlogSection';
import ComponentShowcase from '@/components/ComponentShowcase';
import Contact from '@/components/Contact';
import EnhancedFooter from '@/components/EnhancedFooter';
import ThemeSwitch from '@/components/ThemeSwitch';
import SmoothScroll from '@/components/SmoothScroll';
import SEOHead from '@/components/SEOHead';
import FloatingResumeButton from '@/components/FloatingResumeButton';
import ResumeButton from '@/components/ui/resume-button';
import { GradientButton } from '@/components/ui/gradient-button';
import { Briefcase } from 'lucide-react';

const DotScreenShader = lazy<ComponentType>(async () => {
  try {
    const module = await import('@/components/ui/dot-shader-background');
    return { default: module.DotScreenShader };
  } catch (error) {
    console.error('Failed to load DotScreenShader:', error);
    return { default: () => null as any };
  }
});

const Index = () => {
  return (
    <SEOHead>
      {/* Animated Dot Shader Background */}
      <div className="fixed inset-0 -z-10">
        <Suspense fallback={null}>
          <DotScreenShader />
        </Suspense>
      </div>
      
      <motion.div 
        className="min-h-screen text-foreground relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
      <SmoothScroll />
      <FullscreenNav />
      <ThemeSwitch />
      
      <main className="relative">
        <section id="home">
          <CuratedHero />
        </section>
        
        <section id="journey">
          <div className="py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                  Want to know more about my <span className="text-primary">journey</span>?
                </h2>
                <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
                  Check out my detailed resume with all my projects, achievements, and that one time I actually fixed a bug on the first try.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ResumeButton 
                    variant="primary" 
                    size="lg"
                    text="Download My Resume"
                    className="cyber-button"
                  />
                  <GradientButton 
                    variant="variant"
                    size="lg"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Let's Work Together
                  </GradientButton>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section id="skills">
          <EnhancedSkills />
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
        
        <section id="contact">
          <Contact />
        </section>
        
        <EnhancedFooter />
        <AnimatedMascot />
        <FloatingResumeButton />
      </main>
      </motion.div>
    </SEOHead>
  );
};

export default Index;
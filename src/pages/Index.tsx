import { motion } from 'framer-motion';
import { Suspense, lazy, ComponentType } from 'react';
import CuratedHero from '@/components/CuratedHero';
import SmoothScroll from '@/components/SmoothScroll';
import SEOHead from '@/components/SEOHead';
import { Briefcase } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

// Lazy load components to reduce initial bundle size
const FullscreenNav = lazy(() => import('@/components/FullscreenNav'));
const ThemeSwitch = lazy(() => import('@/components/ThemeSwitch'));
const ResumeButton = lazy(() => import('@/components/ui/resume-button'));
const GradientButton = lazy(() => import('@/components/ui/gradient-button').then(m => ({ default: m.GradientButton })));
const EnhancedSkills = lazy(() => import('@/components/EnhancedSkills'));
const CuratedProjects = lazy(() => import('@/components/CuratedProjects'));
const QuirkyAbout = lazy(() => import('@/components/QuirkyAbout'));
const MiniGames = lazy(() => import('@/components/MiniGames'));
const EasterEggs = lazy(() => import('@/components/EasterEggs'));
const Contact = lazy(() => import('@/components/Contact'));
const EnhancedFooter = lazy(() => import('@/components/EnhancedFooter'));
const AnimatedMascot = lazy(() => import('@/components/AnimatedMascot'));
const FloatingResumeButton = lazy(() => import('@/components/FloatingResumeButton'));

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
      <motion.div 
        className="min-h-screen bg-background text-foreground relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
      <SmoothScroll />
      <Suspense fallback={null}>
        <FullscreenNav />
        <ThemeSwitch />
      </Suspense>
      
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
                <Suspense fallback={<div className="flex flex-col sm:flex-row gap-4 justify-center h-14" />}>
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
                </Suspense>
              </motion.div>
            </div>
          </div>
        </section>
        
        <Suspense fallback={<div className="py-20 flex justify-center"><LoadingSpinner /></div>}>
          <section id="skills">
            <EnhancedSkills />
          </section>
        </Suspense>
        
        <Suspense fallback={<div className="py-20 flex justify-center"><LoadingSpinner /></div>}>
          <section id="curated-projects">
            <CuratedProjects />
          </section>
        </Suspense>
        
        <Suspense fallback={<div className="py-20 flex justify-center"><LoadingSpinner /></div>}>
          <section id="about">
            <QuirkyAbout />
          </section>
        </Suspense>
        
        <Suspense fallback={<div className="py-20 flex justify-center"><LoadingSpinner /></div>}>
          <section id="games">
            <MiniGames />
          </section>
        </Suspense>
        
        <Suspense fallback={<div className="py-20 flex justify-center"><LoadingSpinner /></div>}>
          <section id="easter-eggs">
            <EasterEggs />
          </section>
        </Suspense>
        
        <Suspense fallback={<div className="py-20 flex justify-center"><LoadingSpinner /></div>}>
          <section id="contact">
            <Contact />
          </section>
        </Suspense>
        
        <Suspense fallback={null}>
          <EnhancedFooter />
        </Suspense>
        <Suspense fallback={null}>
          <AnimatedMascot />
        </Suspense>
        <Suspense fallback={null}>
          <FloatingResumeButton />
        </Suspense>
      </main>
      </motion.div>
    </SEOHead>
  );
};

export default Index;
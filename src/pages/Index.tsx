import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import AnimatedNav from '@/components/AnimatedNav';
import EnhancedHero from '@/components/EnhancedHero';
import About from '@/components/About';
import EnhancedSkills from '@/components/EnhancedSkills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <ThreeBackground />
      <AnimatedNav />
      
      <main className="relative z-10">
        <section id="home">
          <EnhancedHero />
        </section>
        
        <motion.section 
          id="about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <About />
        </motion.section>
        
        <motion.section 
          id="skills"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <EnhancedSkills />
        </motion.section>
        
        <motion.section 
          id="projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Projects />
        </motion.section>
        
        <motion.section 
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Contact />
        </motion.section>
        
        <Footer />
      </main>
    </motion.div>
  );
};

export default Index;
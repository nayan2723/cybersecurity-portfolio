import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, ExternalLink, BookOpen, Shield, Brain, Wifi } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Publication {
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  status: string;
}

const ResearchPublications = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const publications: Publication[] = [
    {
      title: "Detecting and Mitigating Hallucinations in LLM-Generated Cybersecurity Explanations: A Hybrid Rule-LLM Pipeline for Intrusion Detection Systems",
      description: "Co-authored research on building a hybrid NLP + rule engine to improve reliability of large language model outputs in security contexts. Proposes a combined pipeline for reliable AI-driven intrusion detection systems.",
      tags: ["LLM", "NLP", "Intrusion Detection", "Cybersecurity", "Rule Engine"],
      icon: <Shield className="w-6 h-6" />,
      status: "Co-authored"
    },
    {
      title: "Zero Trust Authentication Using Behavioral Biometrics",
      description: "Co-authored research applying machine learning to design a continuous, behavior-driven identity verification framework. Proposes eliminating implicit trust in network access through behavioral-based authentication.",
      tags: ["Zero Trust", "Behavioral Biometrics", "Machine Learning", "Authentication"],
      icon: <Brain className="w-6 h-6" />,
      status: "Co-authored"
    },
    {
      title: "A Survey on Routing Attacks in Wireless Sensor Networks",
      description: "Co-authored survey on routing attack vectors (sinkhole, wormhole, Sybil) and defence mechanisms across WSN routing protocols. Comprehensive analysis of security challenges in wireless sensor network architectures.",
      tags: ["WSN", "Routing Attacks", "Network Security", "Sinkhole", "Sybil"],
      icon: <Wifi className="w-6 h-6" />,
      status: "Co-authored"
    }
  ];

  return (
    <section className="py-20 px-6 bg-muted/10 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-cyber-blue/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            RESEARCH & <span className="text-primary">PUBLICATIONS</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Contributing to the cybersecurity research community through co-authored papers 
            on LLM security, zero trust architecture, and wireless network defence.
          </p>
          <div className="w-24 h-1 bg-cyber-gradient mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              className="cyber-card p-6 md:p-8 group hover:scale-[1.02] transition-all duration-300 border-l-4 border-l-primary"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex p-3 rounded-lg bg-primary/10 text-primary mt-1 group-hover:bg-primary/20 transition-colors">
                  {pub.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="neon" size="sm">
                      <FileText className="w-3 h-3 mr-1" />
                      {pub.status}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors">
                    {pub.title}
                  </h3>
                  
                  <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                    {pub.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchPublications;

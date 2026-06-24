import { useMemo, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmojiReactor } from '@/components/EmojiReactor';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack/ScrollStack.jsx';
import AnimatedList from '@/components/AnimatedList/AnimatedList.jsx';
import { 
  ExternalLink, 
  Github, 
  Shield, 
  Code, 
  Database, 
  Brain,
  Eye
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  image: string;
  technologies: string[];
  achievements: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudy?: boolean;
}

const isUsableUrl = (url?: string) =>
  Boolean(url && url.trim() !== '' && url !== '#');

const projects: Project[] = [
    {
      id: 1,
      title: "Windows Threat Detection Engine",
      description: "Production-grade CLI tool that parses Windows Security EVTX logs and detects threats mapped to MITRE ATT&CK techniques. Implements correlation-based detection for brute-force logins (Event ID 4625), privilege escalation (4728/4732), and encoded PowerShell execution (4688). Generates dual outputs: machine-readable alerts.json (SIEM-ingestible) and human-readable incident_report.txt following SOC triage with severity-based response recommendations.",
      category: "security",
      featured: true,
      image: "🔍",
      technologies: ["Python", "MITRE ATT&CK", "EVTX Log Analysis", "SIEM", "SOC Triage"],
      achievements: ["MITRE ATT&CK threat mapping", "Dual SIEM-ingestible + human-readable output", "Brute-force & privilege escalation detection"],
      liveUrl: "#",
      githubUrl: "https://github.com/nayan2723/win-threat-detector",
      caseStudy: true
    },
    {
      id: 2,
      title: "PhishNot – Phishing Email Detection System",
      description: "Engineered a phishing detection engine using a hybrid ML + rule-based classification pipeline with NLP-based feature extraction — analysing entropy, URL patterns, spoofed headers, and social-engineering signals to detect phishing attempts. Designed a modular pipeline with separate components for feature engineering, model training, and threshold tuning; optimised precision-recall balance for real-world deployment in email security workflows.",
      category: "security",
      featured: true,
      image: "🎣",
      technologies: ["Python", "Scikit-learn", "NLP", "ML Pipeline", "Threat Intelligence"],
      achievements: ["Hybrid ML + rule-based detection", "NLP feature extraction (entropy, URL, headers)", "Production-tuned precision-recall thresholds"],
      liveUrl: "#",
      githubUrl: "https://github.com/nayan2723/phishnot",
      caseStudy: true
    },
    {
      id: 3,
      title: "NoxxShell – Custom Linux Shell",
      description: "Developed a functional Linux shell in C++ supporting command execution, piping, I/O redirection, background processes, and built-ins using low-level system calls (fork, exec, dup2, wait). Deepened understanding of process lifecycle, file descriptors, and signal handling — directly applicable to privilege escalation analysis and shell injection vulnerability research.",
      category: "systems",
      featured: true,
      image: "💻",
      technologies: ["C++", "Linux", "Systems Programming", "Process Management", "Signal Handling"],
      achievements: ["Piping & I/O redirection support", "Process lifecycle management (fork/exec/dup2)", "Signal handling & background processes"],
      liveUrl: "#",
      githubUrl: "https://github.com/nayan2723/noxx-shell",
      caseStudy: true
    },
    {
      id: 4,
      title: "Mailer3000 – Fake Email Generator Telegram Bot",
      description: "Designed and built a full-featured Telegram bot in Python that generates disposable email addresses and monitors inboxes in real time via command-based interaction (/new, /check, /help). Implemented async polling and scheduling using asyncio, integrated external email provider APIs via the requests library, and managed secrets securely through dotenv configuration. Followed modular design principles to allow plug-and-play swapping of email providers.",
      category: "security",
      featured: false,
      image: "📧",
      technologies: ["Python", "Telegram Bot API", "asyncio", "REST APIs", "dotenv"],
      achievements: ["Async email polling & scheduling", "Plug-and-play email provider architecture", "Secure secrets management via dotenv"],
      liveUrl: "#",
      githubUrl: "#",
      caseStudy: true
    },
    {
      id: 5,
      title: "Sentiment Analysis – Fine-Tuned Transformer Model",
      description: "Fine-tuned a pre-trained BERT/DistilBERT model for binary text sentiment classification using the HuggingFace Trainer API and Datasets library, evaluating performance across accuracy, precision, recall, and F1 metrics. Built a complete end-to-end ML pipeline: raw data ingestion → tokenization (AutoTokenizer) → model fine-tuning (TrainingArguments, Trainer) → checkpointing → inference via HuggingFace pipeline abstraction.",
      category: "ai",
      featured: false,
      image: "🧠",
      technologies: ["Python", "PyTorch", "HuggingFace", "BERT/DistilBERT", "NLP"],
      achievements: ["BERT/DistilBERT fine-tuning pipeline", "HuggingFace Trainer API integration", "Accuracy, precision, recall & F1 evaluation"],
      liveUrl: "#",
      githubUrl: "#",
      caseStudy: true
    },
    {
      id: 6,
      title: "Real-Time Scene Description System",
      description: "Built an end-to-end computer vision pipeline that captures live video frames using OpenCV, runs YOLOv8 for real-time multi-object detection, and generates human-readable natural language scene descriptions using an NLP module. Engineered efficient frame buffering and inference scheduling to maintain low-latency, real-time throughput — integrating vision + language into a single seamless full-stack AI application.",
      category: "ai",
      featured: false,
      image: "👁️",
      technologies: ["Python", "OpenCV", "YOLOv8", "NLP", "Real-time Processing"],
      achievements: ["Real-time multi-object detection", "NLP scene description generation", "Frame buffering & inference optimization"],
      liveUrl: "#",
      githubUrl: "#",
      caseStudy: true
    },
    {
      id: 7,
      title: "Fharma – Bridging Rural & Urban Healthcare",
      description: "Full-stack web app with AI-powered medicine recommendation system and doctor-patient live chat functionality. User-friendly UI/UX designed and implemented.",
      category: "ai",
      featured: false,
      image: "🏥",
      technologies: ["React", "Backend", "AI Models", "Real-time Chat", "TailwindCSS"],
      achievements: ["AI medicine recommendations", "Live chat system", "Rural healthcare bridge"],
      liveUrl: "https://fharma-health-bridge-ui-nayan2723s-projects.vercel.app/",
      githubUrl: "https://github.com/nayan2723/fharma-health-bridge-ui",
      caseStudy: true
    },
    {
      id: 8,
      title: "Cyber Threat Visualization",
      description: "Real-time cyber threat intelligence visualization with geographical attack maps, live updates, severity classification and trend analysis for cybersecurity professionals.",
      category: "security",
      featured: false,
      image: "📊",
      technologies: ["Python", "Flask/Django", "D3.js", "Chart.js", "Threat Intelligence APIs"],
      achievements: ["Real-time visualization", "Geographical mapping", "Trend analysis"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 9,
      title: "Portfolio Website",
      description: "Personal portfolio website built with React and TailwindCSS. Fully responsive custom-built design showcasing skills, resume, and live projects. Optimized for performance and accessibility.",
      category: "web",
      featured: false,
      image: "💼",
      technologies: ["React", "TailwindCSS", "Vercel", "TypeScript", "Framer Motion"],
      achievements: ["Fully responsive design", "Performance optimized", "Accessibility compliant"],
      liveUrl: "https://nayan-cyber-folio.vercel.app/",
      githubUrl: "https://github.com/nayan2723/cybersecurity-portfolio"
    },
    {
      id: 10,
      title: "LinkedIn Clone (UI Prototype)",
      description: "Frontend UI prototype replicating LinkedIn's layout and core UI components. Responsive design across devices built as practice project to mimic real-world complexity.",
      category: "web",
      featured: false,
      image: "👥",
      technologies: ["React", "TailwindCSS", "Responsive Design", "Component Libraries"],
      achievements: ["Pixel-perfect UI replica", "Cross-device responsive", "Complex component structure"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 11,
      title: "TravelTactix – Gamified AI Travel Companion",
      description: "AI-powered travel companion app with multi-day itineraries, cultural lessons, gamified missions, AR landmark scanning, and real-time crowd monitoring. Built for interactive, immersive travel experiences across India.",
      category: "ai",
      featured: false,
      image: "🗺️",
      technologies: ["AI/ML", "AR Technology", "React", "Geolocation APIs", "Real-time Data"],
      achievements: ["AI-powered itineraries", "AR landmark detection", "Gamified missions & rewards"],
      liveUrl: "#",
      githubUrl: "#",
      caseStudy: true
    },
    {
      id: 12,
      title: "Emoji Reactor – Real-Time Emotion Detection",
      description: "Real-time facial expression and pose detection application using computer vision. Detects emotions and body language, then displays matching emojis instantly in a separate window.",
      category: "ai",
      featured: false,
      image: "😊",
      technologies: ["Python", "MediaPipe", "OpenCV", "Computer Vision", "Real-time Processing"],
      achievements: ["Real-time face detection", "Pose estimation", "Instant emoji mapping"],
      liveUrl: "#",
      githubUrl: "#"
    }
];

const categories = [
  { id: 'all', label: 'All Projects', icon: Eye },
  { id: 'ai', label: 'AI/ML', icon: Brain },
  { id: 'security', label: 'Cybersecurity', icon: Shield },
  { id: 'web', label: 'Web Development', icon: Code },
  { id: 'systems', label: 'Systems Programming', icon: Database },
];

const ProjectCardContent = ({ project }: { project: Project }) => (
  <div className="flex h-full min-h-0 flex-col gap-8 lg:flex-row lg:items-stretch w-full">
    <div className="flex min-w-0 flex-[1.5] flex-col lg:max-w-[60%] lg:flex-[3]">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {project.featured && (
          <Badge variant="success">
            Featured
          </Badge>
        )}
        <Badge variant="outline" size="sm" className="border-border text-muted-foreground">
          {project.category}
        </Badge>
        {project.caseStudy && (
          <Badge variant="neon" size="sm">
            Case study
          </Badge>
        )}
      </div>

      <h3 className="text-2xl font-bold leading-tight text-foreground md:text-3xl">
        {project.title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-5 space-y-1.5">
        <p className="text-sm font-semibold text-primary">Key achievements</p>
        <ul className="space-y-1.5">
          {project.achievements.map((achievement, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-green" aria-hidden />
              {achievement}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {isUsableUrl(project.liveUrl) && (
          <Button variant="primary" size="sm" asChild>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              View Project
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
        {isUsableUrl(project.githubUrl) && (
          <Button variant="outline" size="sm" asChild>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        )}
      </div>

      <EmojiReactor projectId={project.id} className="mt-6" />
    </div>

    <div className="relative flex min-h-[12rem] w-full flex-1 items-center justify-center rounded-2xl border border-border/40 bg-gradient-to-br from-primary/10 to-cyber-blue/10 lg:max-w-[40%] lg:flex-[2]">
      <div className="pointer-events-none absolute inset-0 opacity-90" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-muted/25 to-cyber-blue/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,hsl(var(--primary)/0.22),transparent_55%)]" />
      </div>
      <span className="relative z-10 text-7xl drop-shadow-sm" aria-hidden>
        {project.image}
      </span>
    </div>
  </div>
);

const CuratedProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setTimeout(() => {
      if (sectionRef.current) {
        const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 50);
  };

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const stackedProjects = filteredProjects.slice(0, 3);
  const remainingProjects = filteredProjects.slice(3);

  const itemDistance = useMemo(() => {
    const n = stackedProjects.length;
    return Math.max(120, Math.round(120 * (n / 4)));
  }, [stackedProjects.length]);

  const scrollStackKey = useMemo(() => {
    const ids = projects
      .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
      .map((p) => p.id)
      .join('-');
    return `${selectedCategory}-${ids}`;
  }, [selectedCategory]);

  return (
    <div ref={sectionRef} className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Featured <span className="text-primary">Work</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
            A curated selection of projects showcasing expertise in AI/ML, cybersecurity, 
            web development, and systems programming.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "primary" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category.id)}
                className="transition-all duration-300"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {stackedProjects.length > 0 && (
          <ScrollStack
            className="curated-projects-scroll-stack"
            useWindowScroll={true}
            itemDistance={itemDistance}
            itemScale={0.035}
            itemStackDistance={35}
            stackPosition="20%"
            scaleEndPosition="10%"
            baseScale={0.9}
            rotationAmount={0}
            blurAmount={0}
          >
            {stackedProjects.map((project) => (
              <ScrollStackItem
                key={project.id}
                itemClassName="portfolio-card w-full"
              >
                <ProjectCardContent project={project} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        )}

        {remainingProjects.length > 0 && (
          <div className="mt-16 w-full flex justify-center max-w-5xl mx-auto">
            <AnimatedList
              items={remainingProjects}
              className="w-full"
              itemClassName="portfolio-card w-full"
              showGradients={false}
              renderItem={(project) => <ProjectCardContent project={project} />}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CuratedProjects;

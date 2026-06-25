import { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  image: string;
  images?: { src: string; alt: string }[];
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
      id: 0,
      title: "F1 Insights 2026 – Real-Time Telemetry & ML Predictions",
      description: "Full-stack multi-page application providing unprecedented telemetric and strategic intelligence for the Formula 1 World Championship. Engineered a resilient backend using Express.js with a multi-layered caching system (memory → disk → API → static fallback) to ensure zero downtime. Features a custom ML Prediction Engine utilizing Bayesian Elo ratings and Monte Carlo simulations (1,000 iterations) for race forecasting. Frontend built with Vite, React Islands, and Tailwind CSS for dynamic UI updates without full page reloads.",
      category: "ai",
      featured: true,
      image: "/projects/f1-insights/thumbnail.jpg",
      images: [
        { src: "/projects/f1-insights/thumbnail.jpg", alt: "F1 Insights 2026 Poster" },
        { src: "/projects/f1-insights/main.png", alt: "F1 Insights Dashboard — 2026 Season Overview and Next Race Countdown" },
        { src: "/projects/f1-insights/stats.png", alt: "Driver Head-to-Head Comparison — Lewis Hamilton vs Lando Norris Radar Chart" },
        { src: "/projects/f1-insights/chart.png", alt: "Championship Points Progression Chart — Tracking driver performance across the season" }
      ],
      technologies: ["Node.js", "Express", "React", "Machine Learning", "Vite"],
      achievements: ["Bayesian Elo + Monte Carlo ML prediction engine", "Resilient 4-layer caching architecture", "React Islands pattern for performance"],
      liveUrl: "#",
      githubUrl: "https://github.com/nayan2723/f1-insight-2026",
      caseStudy: true
    },
    {
      id: 1,
      title: "Windows Threat Detection Engine",
      description: "Production-grade CLI tool that parses Windows Security EVTX logs and detects threats mapped to MITRE ATT&CK techniques. Implements correlation-based detection for brute-force logins (Event ID 4625), privilege escalation (4728/4732), and encoded PowerShell execution (4688). Generates dual outputs: machine-readable alerts.json (SIEM-ingestible) and human-readable incident_report.txt following SOC triage with severity-based response recommendations.",
      category: "security",
      featured: true,
      image: "/projects/win-threat-detector/thumbnail.jpg",
      images: [
        { src: "/projects/win-threat-detector/thumbnail.jpg", alt: "Windows Threat Detection Engine — Detect. Analyze. Respond." },
        { src: "/projects/win-threat-detector/dashboard.png", alt: "Windows Threat Detection Dashboard — severity charts, MITRE techniques, and recent alerts" },
        { src: "/projects/win-threat-detector/cli-scan.png", alt: "CLI scan output — threat detection engine running with severity summary table" },
        { src: "/projects/win-threat-detector/streamlit-launch.png", alt: "Streamlit dashboard server launching" }
      ],
      technologies: ["Python", "MITRE ATT&CK", "EVTX Log Analysis", "SIEM", "SOC Triage"],
      achievements: ["MITRE ATT&CK threat mapping", "Dual SIEM-ingestible + human-readable output", "Brute-force & privilege escalation detection"],
      liveUrl: "#",
      githubUrl: "https://github.com/nayan2723/windows-threat-detection-engine",
      caseStudy: true
    },
    {
      id: 2,
      title: "PhishNot – Phishing Email Detection System",
      description: "Engineered a phishing detection engine using a hybrid ML + rule-based classification pipeline with NLP-based feature extraction — analysing entropy, URL patterns, spoofed headers, and social-engineering signals to detect phishing attempts. Designed a modular pipeline with separate components for feature engineering, model training, and threshold tuning; optimised precision-recall balance for real-world deployment in email security workflows.",
      category: "security",
      featured: true,
      image: "/projects/phishnot/thumbnail.jpg",
      images: [
        { src: "/projects/phishnot/thumbnail.jpg", alt: "PhishNot — AI-Powered Phishing Email Detection System" },
        { src: "/projects/phishnot/landing.png", alt: "Landing page — dark theme hero with AI-Powered, Real-time, Secure badges" },
        { src: "/projects/phishnot/analyzer.png", alt: "AI-Powered Email Scanner — form with mock PayPal phishing email" },
        { src: "/projects/phishnot/features.png", alt: "Advanced Security Features — AI Detection, Real-time Analysis, Global Threat DB" },
        { src: "/projects/phishnot/about.png", alt: "Enterprise-Grade Protection for Everyone + Mission Statement" },
        { src: "/projects/phishnot/stats.png", alt: "96.2% accuracy, 18,631 training emails, <1s analysis time, 24/7 protection" }
      ],
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
      image: "/projects/noxx-shell/thumbnail.jpg",
      images: [
        { src: "/projects/noxx-shell/thumbnail.jpg", alt: "NoxxShell Custom Linux Shell — Powerful. Flexible. Low-Level. Built for Control." },
        { src: "/projects/noxx-shell/terminal.png", alt: "NoxxShell interactive terminal showing uptime, weather, and safe mode commands" }
      ],
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
      image: "/projects/mailer3000/thumbnail.jpg",
      images: [
        { src: "/projects/mailer3000/thumbnail.jpg", alt: "Mailer3000 Fake Email Generator Telegram Bot poster" },
        { src: "/projects/mailer3000/telegram.png", alt: "Mailer3000 Telegram Bot interface showing disposable email generation and inbox monitoring" }
      ],
      technologies: ["Python", "AsyncIO", "Telegram API", "REST APIs", "Bot Development"],
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
      image: "/projects/sentiment-analysis/thumbnail.jpg",
      images: [
        { src: "/projects/sentiment-analysis/thumbnail.jpg", alt: "Sentiment Analysis Fine-Tuned Transformer Model poster" },
        { src: "/projects/sentiment-analysis/training.png", alt: "Jupyter Notebook showing training loop and accuracy/F1 metrics table" },
        { src: "/projects/sentiment-analysis/inference.png", alt: "Jupyter Notebook showing inference pipeline and text classification outputs" }
      ],
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
      image: "/projects/scene-description/thumbnail.jpg",
      images: [
        { src: "/projects/scene-description/thumbnail.jpg", alt: "Real-Time Scene Description System poster" },
        { src: "/projects/scene-description/dashboard.png", alt: "Computer vision dashboard showing live object detection feed with YOLOv8 bounding boxes" },
        { src: "/projects/scene-description/nlp_metrics.png", alt: "Generated natural language scene descriptions and real-time inference metrics" }
      ],
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
      image: "/projects/fharma/thumbnail.jpg",
      images: [
        { src: "/projects/fharma/thumbnail.jpg", alt: "Fharma – Bridging Rural & Urban Healthcare poster" },
        { src: "/projects/fharma/hero.png", alt: "Fharma landing page highlighting the mission to connect rural India to urban healthcare" },
        { src: "/projects/fharma/app.png", alt: "Fharma virtual doctor consultation interface with text-based medical AI" }
      ],
      technologies: ["React", "Backend", "AI Models", "Real-time Chat", "TailwindCSS"],
      achievements: ["AI medicine recommendations", "Live chat system", "Rural healthcare bridge"],
      liveUrl: "https://fharma-health-bridge-ui-nayan2723s-projects.vercel.app/",
      githubUrl: "https://github.com/nayan2723/fharma-health-bridge-ui",
      caseStudy: true
    },



    {
      id: 11,
      title: "TravelTactix – Gamified AI Travel Companion",
      description: "AI-powered travel companion app with multi-day itineraries, cultural lessons, gamified missions, AR landmark scanning, and real-time crowd monitoring. Built for interactive, immersive travel experiences across India.",
      category: "ai",
      featured: false,
      image: "/projects/traveltactix/thumbnail.jpg",
      images: [
        { src: "/projects/traveltactix/thumbnail.jpg", alt: "TravelTactix – Gamified AI Travel Companion poster" },
        { src: "/projects/traveltactix/home.png", alt: "TravelTactix Discovery dashboard interface" },
        { src: "/projects/traveltactix/missions.png", alt: "TravelTactix Quest Missions and Cultural Challenges page" }
      ],
      technologies: ["AI/ML", "AR Technology", "React", "Geolocation APIs", "Real-time Data"],
      achievements: ["AI-powered itineraries", "AR landmark detection", "Gamified missions & rewards"],
      liveUrl: "#",
      githubUrl: "#",
      caseStudy: true
    },

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

    <div
      className="relative flex min-h-[12rem] w-full flex-1 items-center justify-center rounded-2xl border border-border/40 bg-gradient-to-br from-primary/10 to-cyber-blue/10 lg:max-w-[40%] lg:flex-[2] overflow-hidden cursor-pointer group/img"
      onClick={() => {
        if (project.images && project.images.length > 0) {
          const event = new CustomEvent('openProjectModal', { detail: project });
          window.dispatchEvent(event);
        }
      }}
    >
      {project.images && project.images.length > 0 ? (
        <>
          <img
            src={project.images[0].src}
            alt={project.images[0].alt}
            className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-500 group-hover/img:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm border border-border/50">
            <Maximize2 className="h-3 w-3" />
            {project.images.length} screenshots
          </div>
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 opacity-90" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-muted/25 to-cyber-blue/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,hsl(var(--primary)/0.22),transparent_55%)]" />
          </div>
          <span className="relative z-10 text-7xl drop-shadow-sm" aria-hidden>
            {project.image}
          </span>
        </>
      )}
    </div>
  </div>
);

/* ─── Project Detail Modal ─── */
const ProjectDetailModal = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
  const [activeImg, setActiveImg] = useState(0);
  const images = project?.images || [];

  // Keyboard navigation
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveImg((p) => (p + 1) % images.length);
      if (e.key === 'ArrowLeft') setActiveImg((p) => (p - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [project, images.length, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal content */}
        <motion.div
          className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border/60 bg-card shadow-2xl"
          initial={{ scale: 0.92, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.92, y: 30, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 rounded-full bg-background/80 p-2 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Image gallery */}
          {images.length > 0 && (
            <div className="relative">
              <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-muted">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={images[activeImg].src}
                    alt={images[activeImg].alt}
                    className="absolute inset-0 h-full w-full object-contain p-2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-transparent" />
              </div>

              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((p) => (p - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setActiveImg((p) => (p + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex gap-2 p-4 justify-center">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className={`relative h-14 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                        idx === activeImg
                          ? 'border-primary ring-2 ring-primary/30 scale-105'
                          : 'border-border/40 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Image caption */}
              <p className="px-6 pb-2 text-xs text-muted-foreground italic text-center">
                {images[activeImg].alt}
              </p>
            </div>
          )}

          {/* Project details */}
          <div className="p-6 pt-4 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              {project.featured && <Badge variant="success">Featured</Badge>}
              <Badge variant="outline" size="sm" className="border-border text-muted-foreground">
                {project.category}
              </Badge>
              {project.caseStudy && <Badge variant="neon" size="sm">Case study</Badge>}
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {project.title}
            </h3>

            <p className="text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-primary">Key achievements</p>
              <ul className="space-y-1.5">
                {project.achievements.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-green" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {isUsableUrl(project.liveUrl) && (
                <Button variant="primary" size="sm" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    View Project <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {isUsableUrl(project.githubUrl) && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                </Button>
              )}
            </div>

            <EmojiReactor projectId={project.id} className="pt-2" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CuratedProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Listen for custom event from card image click
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as Project;
      setModalProject(detail);
    };
    window.addEventListener('openProjectModal', handler);
    return () => window.removeEventListener('openProjectModal', handler);
  }, []);

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

  const stackedProjects = filteredProjects.filter(project => project.featured);
  const remainingProjects = filteredProjects.filter(project => !project.featured);

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

      {/* Project Detail Modal */}
      <ProjectDetailModal project={modalProject} onClose={() => setModalProject(null)} />
    </div>
  );
};

export default CuratedProjects;

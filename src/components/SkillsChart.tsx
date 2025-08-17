import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Radar, Doughnut } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Code, Database, Network, Lock, Brain } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SkillsChart = () => {
  const radarData = {
    labels: [
      'Penetration Testing',
      'Web Security',
      'Network Security',
      'Cryptography',
      'Incident Response',
      'Threat Intelligence'
    ],
    datasets: [
      {
        label: 'Current Skills',
        data: [95, 90, 85, 80, 88, 92],
        backgroundColor: 'rgba(0, 255, 65, 0.1)',
        borderColor: 'rgba(0, 255, 65, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(0, 255, 65, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(0, 255, 65, 1)',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Target Goals',
        data: [98, 95, 92, 90, 95, 96],
        backgroundColor: 'rgba(0, 191, 255, 0.1)',
        borderColor: 'rgba(0, 191, 255, 0.6)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: 'rgba(0, 191, 255, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(0, 191, 255, 1)',
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ],
  };

  const doughnutData = {
    labels: ['Frontend', 'Backend', 'Security', 'DevOps', 'AI/ML'],
    datasets: [
      {
        data: [25, 30, 35, 20, 15],
        backgroundColor: [
          'rgba(0, 255, 65, 0.8)',
          'rgba(0, 191, 255, 0.8)',
          'rgba(255, 20, 147, 0.8)',
          'rgba(255, 215, 0, 0.8)',
          'rgba(138, 43, 226, 0.8)',
        ],
        borderColor: [
          'rgba(0, 255, 65, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(255, 20, 147, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(138, 43, 226, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgba(0, 255, 65, 1)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(0, 255, 65, 0.5)',
        borderWidth: 1,
      },
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 11,
          },
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          backdropColor: 'transparent',
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgba(0, 255, 65, 1)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(0, 255, 65, 0.5)',
        borderWidth: 1,
      },
    },
    cutout: '60%',
  };

  const skillCategories = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Testing",
      skills: ["OWASP Top 10", "Burp Suite", "Metasploit", "Nmap"],
      color: "text-cyber-green"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Development",
      skills: ["React", "Node.js", "Python", "TypeScript"],
      color: "text-cyber-blue"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Security",
      skills: ["SQL Injection", "NoSQL", "PostgreSQL", "MongoDB"],
      color: "text-neon-pink"
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Network Security",
      skills: ["Wireshark", "Nessus", "pfSense", "IDS/IPS"],
      color: "text-neon-yellow"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Cryptography",
      skills: ["AES", "RSA", "PKI", "TLS/SSL"],
      color: "text-purple-400"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Security",
      skills: ["Adversarial ML", "Privacy", "Federated Learning", "Bias Detection"],
      color: "text-orange-400"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className="text-center mb-16"
          data-aos="fade-down"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            TECHNICAL <span className="text-primary">EXPERTISE</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Comprehensive cybersecurity skillset with data-driven proficiency visualization.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-aos="fade-right"
          >
            <Card className="cyber-card p-6">
              <CardHeader>
                <CardTitle className="text-center text-xl">
                  Security Skills Radar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <Radar data={radarData} options={radarOptions} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Doughnut Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-aos="fade-left"
          >
            <Card className="cyber-card p-6">
              <CardHeader>
                <CardTitle className="text-center text-xl">
                  Skill Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="cyber-card p-6 h-full hover:scale-105 transition-transform">
                <div className={`mb-4 ${category.color}`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{category.title}</h3>
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className="flex items-center gap-2 text-sm text-foreground/70"
                    >
                      <div className="w-1 h-1 bg-current rounded-full"></div>
                      {skill}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsChart;
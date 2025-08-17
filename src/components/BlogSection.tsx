import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  TrendingUp,
  Shield,
  Code,
  Brain,
  ExternalLink
} from 'lucide-react';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Zero-Day Vulnerability Discovery: A Methodical Approach",
      excerpt: "Walk through the complete process of discovering and responsibly disclosing a critical vulnerability in a popular web framework.",
      category: "Security Research",
      readTime: "8 min read",
      date: "Dec 15, 2024",
      featured: true,
      tags: ["Zero-Day", "Vulnerability Research", "Responsible Disclosure"],
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 2,
      title: "Building AI-Powered Security Tools: Lessons Learned",
      excerpt: "Key insights from developing machine learning models for cybersecurity applications, including common pitfalls and best practices.",
      category: "AI & Security",
      readTime: "12 min read",
      date: "Dec 10, 2024",
      featured: true,
      tags: ["Machine Learning", "Security Tools", "Python"],
      icon: <Brain className="w-5 h-5" />
    },
    {
      id: 3,
      title: "The Evolution of Web Application Security",
      excerpt: "A deep dive into how web security has evolved over the past decade and what developers need to know today.",
      category: "Web Security",
      readTime: "15 min read",
      date: "Dec 5, 2024",
      featured: false,
      tags: ["Web Security", "OWASP", "Best Practices"],
      icon: <Code className="w-5 h-5" />
    },
    {
      id: 4,
      title: "Pentesting with Python: Advanced Techniques",
      excerpt: "Advanced Python scripts and techniques for penetration testing, including custom exploit development.",
      category: "Penetration Testing",
      readTime: "10 min read", 
      date: "Nov 28, 2024",
      featured: false,
      tags: ["Python", "Pentesting", "Automation"],
      icon: <Code className="w-5 h-5" />
    },
    {
      id: 5,
      title: "Incident Response: My First Major Breach",
      excerpt: "A detailed case study of responding to a sophisticated APT attack and the lessons learned from the experience.",
      category: "Incident Response",
      readTime: "20 min read",
      date: "Nov 20, 2024",
      featured: false,
      tags: ["Incident Response", "APT", "Case Study"],
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 6,
      title: "Building a Home Security Lab on a Budget",
      excerpt: "Complete guide to setting up a comprehensive cybersecurity lab for learning and testing purposes.",
      category: "Lab Setup",
      readTime: "6 min read",
      date: "Nov 15, 2024",
      featured: false,
      tags: ["Home Lab", "VirtualBox", "Networking"],
      icon: <BookOpen className="w-5 h-5" />
    }
  ];

  const categories = [
    { name: "Security Research", count: 12, color: "text-cyber-green" },
    { name: "AI & Security", count: 8, color: "text-cyber-blue" },
    { name: "Web Security", count: 15, color: "text-neon-pink" },
    { name: "Penetration Testing", count: 10, color: "text-neon-yellow" }
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured);

  return (
    <section id="blog" className="py-20 px-6 bg-muted/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Security <span className="text-primary">Journal</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
            Insights, tutorials, and experiences from the frontlines of cybersecurity. 
            Sharing knowledge to build a more secure digital world.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Featured Posts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">Featured Articles</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/30">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="text-primary">{post.icon}</div>
                          <Badge variant="neon" size="sm">Featured</Badge>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors leading-tight">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-foreground/70 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" size="sm">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-4 text-xs text-foreground/60">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {post.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className="group/btn">
                            Read More
                            <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Posts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">Recent Posts</h3>
              </div>

              <div className="space-y-6">
                {recentPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            {post.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" size="sm">{post.category}</Badge>
                            </div>
                            <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h4>
                            <p className="text-sm text-foreground/70 mb-3">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-foreground/60">
                                <span>{post.date}</span>
                                <span>{post.readTime}</span>
                              </div>
                              <Button size="sm" variant="ghost">
                                Read More
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer">
                      <span className={`text-sm ${category.color}`}>{category.name}</span>
                      <Badge variant="outline" size="sm">{category.count}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Stay Updated</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground/70">
                    Get notified when I publish new security insights and tutorials.
                  </p>
                  <div className="space-y-3">
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Button variant="primary" size="sm" className="w-full">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* External Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">External Writing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: "Security Weekly Podcast", platform: "Guest Interview" },
                    { title: "OWASP Foundation", platform: "Contributing Author" },
                    { title: "InfoSec Magazine", platform: "Regular Contributor" }
                  ].map((link, index) => (
                    <div key={index} className="p-2 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">{link.title}</div>
                          <div className="text-xs text-foreground/60">{link.platform}</div>
                        </div>
                        <ExternalLink className="w-3 h-3 text-foreground/40" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
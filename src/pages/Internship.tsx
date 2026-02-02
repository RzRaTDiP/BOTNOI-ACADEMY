import { useState, useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check, Bot, Sparkles, Users, Lightbulb, Code } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface PositionDetail {
  title: string;
  scope: string[];
  requirements: string[];
}

const INTERNSHIP_POSITIONS: PositionDetail[] = [
  {
    title: "AI Researcher & Development",
    scope: [
      "Improve, train, validate, and optimize AI models (e.g., AI Avatar models)",
      "Design and develop workflows for Computer Vision systems",
      "Research and implement new techniques to enhance video summarization tasks",
      "Experiment with model architectures, datasets, and evaluation methods",
      "Collaborate with AI researchers and engineers to deploy CV solutions"
    ],
    requirements: [
      "Basic knowledge of Computer Vision and ML/Deep Learning concepts",
      "Experience with or interest in Python and AI/ML frameworks (PyTorch, TensorFlow)",
      "Understanding of model training, validation, and optimization processes",
      "Analytical mindset with an interest in research and experimentation",
      "Ability to work collaboratively in a team"
    ]
  },
  {
    title: "AI NLP",
    scope: [
      "Work closely with the Botnoi AI development team on AI products",
      "Collaborate with the research team to study and implement new algorithms",
      "Work alongside the product team to optimize AI-driven solutions",
      "Participate in development of products like Botnoi Voice, Voicebot, Avatar",
      "Support the end-to-end AI solution development process"
    ],
    requirements: [
      "Basic knowledge of or strong interest in Python programming",
      "Familiarity with deep learning frameworks (PyTorch, TensorFlow, or ONNX)",
      "Ability to use development tools (Google Colab, VS Code)",
      "Strong interest in AI, NLP, and emerging technologies",
      "Ability to work well in a team and collaborate effectively"
    ]
  },
  {
    title: "Data Science",
    scope: [
      "Perform data cleaning and pre-processing to ensure data quality",
      "Conduct data analytics to extract insights and support decision-making",
      "Design and deploy dashboards using BI tools",
      "Develop machine learning models for data-driven solutions",
      "Evaluate and improve model performance through testing and iteration"
    ],
    requirements: [
      "Basic knowledge of Python",
      "Fundamental understanding of statistics",
      "Familiarity with Google Colab or similar environments",
      "Basic knowledge of Machine Learning (assessed through a technical test)",
      "Ability to design and deploy dashboards"
    ]
  },
  {
    title: "AI Agent Builder",
    scope: [
      "Learn how to build chatbots for SMEs using ready-to-use platforms",
      "Learn Prompt Engineering and write instructions for AI systems",
      "Understand principles of effective prompt design and AI interaction",
      "Build real, deployable chatbots on platforms such as LINE and Facebook",
      "Support the core chatbot team delivering enterprise-level solutions"
    ],
    requirements: [
      "Basic understanding of coding concepts (high level)",
      "Understanding of APIs and UX/UI principles",
      "Basic knowledge of AI models and how they are used in applications",
      "Ability to use tools such as Canva, Figma/Miro, and Google Sheets",
      "Willingness to learn, experiment, and collaborate"
    ]
  },
  {
    title: "TTS / ASR",
    scope: [
      "Research and develop Text-to-Speech (TTS) and Automatic Speech Recognition (ASR) systems to continuously improve performance and quality",
      "Experiment with and optimize models related to speech synthesis and speech recognition",
      "Collaborate with AI researchers and product teams to apply TTS/ASR technologies to real-world products",
      "Analyze model performance and contribute to enhancements in accuracy, naturalness, and efficiency"
    ],
    requirements: [
      "Solid Python programming skills",
      "Fundamental knowledge of Machine Learning",
      "Understanding of Deep Learning concepts and workflows",
      "Experience with PyTorch is a plus (nice to have)",
      "Knowledge of Object-Oriented Programming (OOP) is a plus (nice to have)"
    ]
  },
  {
    title: "UX/UI Designer",
    scope: [
      "Receive requirements to conduct research and goal analysis for design projects",
      "Conduct stakeholder interviews and present research insights (Journey Maps, Personas)",
      "Synthesize research into mid-fidelity wireframes and perform design testing",
      "Focus on interface design with strong awareness of visual composition and layout",
      "Apply Design Thinking and prototyping techniques using the team’s UI system",
      "Iterate and refine designs based on testing feedback"
    ],
    requirements: [
      "Ability to analyze user/business needs and translate them into actionable insights",
      "Strong problem-solving mindset and ability to design solutions",
      "Familiarity with design tools such as Sketch, Figma, or Adobe XD",
      "Skills in usability testing and data analysis",
      "Passion for design and eagerness to explore new design trends",
      "Good communication skills and ability to collaborate effectively"
    ]
  },
  {
    title: "Graphic Design",
    scope: [
      "Design online media including both static visuals and video content",
      "Create visual materials for digital platforms in alignment with brand guidelines",
      "Edit and produce graphic and video assets for marketing and communication purposes",
      "Collaborate with the creative and marketing teams to deliver engaging visual content"
    ],
    requirements: [
      "Proficiency in Adobe Photoshop and Adobe Illustrator",
      "Experience with Adobe Premiere Pro for video editing",
      "Basic understanding of visual design principles and digital media",
      "Ability to manage multiple design tasks and meet deadlines",
      "Good teamwork and communication skills"
    ]
  },
  {
    title: "AI Creator (Graphic)",
    scope: [
      "Learn how to use AI tools to create graphic designs and creative media",
      "Develop UX/UI design skills by working closely with professional designers",
      "Support the core graphic team on various projects (online media, videos, articles)",
      "Assist in producing visual content using both AI-assisted and traditional workflows",
      "Collaborate with cross-functional teams to ensure visual consistency"
    ],
    requirements: [
      "Understanding of AI fundamentals and workflow of AI-based generation",
      "Experience with or interest in design tools (Canva, CapCut, Midjourney)",
      "Basic knowledge of UX/UI principles is a plus",
      "Creative mindset with attention to detail",
      "Ability to work well in a team and adapt to new tools"
    ]
  },
  {
    title: "Sales",
    scope: [
      "Learn and develop a strong understanding of the company’s AI/tech solutions",
      "Build and maintain relationships with existing and new clients",
      "Present AI/Tech products to business clients (B2B) and individual customers",
      "Support sales strategy planning and generate new business opportunities",
      "Collaborate with marketing to analyze customer data"
    ],
    requirements: [
      "Strong communication and presentation skills",
      "Interest in or basic understanding of AI and technology",
      "Ability to use business tools (Google Sheets, CRM software)",
      "Good negotiation skills with a creative problem-solving mindset",
      "Ability to work well in a team"
    ]
  },
  {
    title: "Content / Marketing",
    scope: [
      "Plan and execute marketing strategies with hands-on implementation",
      "Create and manage content across relevant platforms",
      "Analyze campaign performance and prepare reports with actionable insights",
      "Collaborate with internal teams to align content with marketing objectives"
    ],
    requirements: [
      "Skills in content writing and storytelling",
      "Ability to develop content plans aligned with marketing goals",
      "Strong critical thinking and analytical skills",
      "Good communication skills in both English and Thai",
      "Experience as an influencer or page ownership is a plus"
    ]
  },
  {
    title: "Digital Marketing",
    scope: [
      "Increase website traffic through effective digital marketing strategies",
      "Plan, execute, and monitor campaign performance",
      "Optimize and improve website quality for better user experience",
      "Conduct research and analyze data to support marketing decisions"
    ],
    requirements: [
      "Knowledge of SEO principles",
      "Basic experience with Google Analytics and Google Search Console",
      "Skills in content writing",
      "Ability to conduct research and prepare reports",
      "Analytical mindset with attention to detail"
    ]
  },
  {
    title: "DevOps",
    scope: [
      "Develop systems and applications based on requirements from internal teams",
      "Troubleshoot, fix, and improve existing system issues",
      "Test and verify system functionality to ensure accuracy and reliability",
      "Collaborate with cross-functional teams to deliver stable and scalable solutions"
    ],
    requirements: [
      "Basic knowledge of Linux systems",
      "Familiarity with Docker",
      "Basic scripting skills in Python",
      "Open to learning new knowledge and emerging technologies",
      "Able to work on-site at the office throughout the internship period"
    ]
  },
  {
    title: "Frontend Developer",
    scope: [
      "Develop systems and applications based on requirements from internal teams",
      "Troubleshoot, fix, and improve existing system issues",
      "Test and verify system functionality to ensure accuracy and reliability",
      "Collaborate with cross-functional teams to deliver stable and scalable solutions"
    ],
    requirements: [
      "Knowledge of HTML, CSS, JavaScript / TypeScript",
      "Familiarity with frontend frameworks such as Angular or Vue.js",
      "Open to learning new knowledge and emerging technologies",
      "Strong sense of responsibility and commitment to continuous skill development",
      "Able to work on-site at the office throughout the internship period"
    ]
  },
  {
    title: "Backend Developer",
    scope: [
      "Learn the fundamentals and architecture of backend systems",
      "Support the development of backend features for the Botnoi Voice website",
      "Assist in building, testing, and maintaining backend services and APIs",
      "Work closely with frontend, AI, and product teams to support system functionality"
    ],
    requirements: [
      "Basic knowledge of Python",
      "Experience with or interest in Golang (nice to have)",
      "Understanding of basic backend concepts (APIs, databases, server-side logic)",
      "Willingness to learn backend development best practices",
      "Ability to work collaboratively in a team environment"
    ]
  },
  {
    title: "Mobile Developer",
    scope: [
      "Develop mobile applications for iOS and Android platforms",
      "Implement native features and high-quality UI components",
      "Ensure app performance, quality, and responsiveness",
      "Collaborate with the team to define, design, and ship new features"
    ],
    requirements: [
      "Experience with cross-platform frameworks like Flutter or React Native",
      "Knowledge of mobile app deployment processes (App Store & Play Store)",
      "Familiarity with mobile UI/UX guidelines and best practices",
      "Understanding of REST APIs and offline storage",
      "Proficient in code versioning tools like Git"
    ]
  },
  {
    title: "Tester",
    scope: [
      "Perform manual testing for web applications",
      "Learn proper testing methodologies and explore automated testing practices",
      "Test websites and applications to identify bugs, defects, and functional issues",
      "Create and execute tests based on defined Test Cases and Test Plans",
      "Report issues clearly and collaborate with developers"
    ],
    requirements: [
      "Basic knowledge of Python",
      "Fundamental understanding of software testing concepts (manual/automated)",
      "Strong analytical and problem-solving skills with a systematic mindset",
      "Attention to detail and ability to follow testing processes accurately",
      "Ability to communicate findings clearly and work well in a team"
    ]
  },
  {
    title: "3D Developer",
    scope: [
      "Create 3D models including characters, clothing, hairstyles, and related assets",
      "Develop animations for 3D models, focusing on movement and expression",
      "Develop cross-platform applications using Unity (Desktop, Mobile)",
      "Implement interactive features and optimize performance",
      "Develop desktop-based applications using Unreal Engine (Blueprint and C++)"
    ],
    requirements: [
      "3D Modeling skills (Sculpting, Retopology) and Rigging knowledge",
      "Understanding of UV mapping and 3D Animation skills",
      "Programming skills in C# and basic knowledge of Python",
      "Familiarity with Unity Engine tools and workflows",
      "Strong familiarity with Blueprint system in Unreal Engine",
      "Programming skills in C++"
    ]
  },
  {
    title: "Admin Assistant",
    scope: [
      "Support daily administrative operations",
      "Manage schedules and coordinate meetings",
      "Handle documentation and correspondence"
    ],
    requirements: [
      "Strong organizational and multitasking skills",
      "Proficiency in Microsoft Office / Google Workspace",
      "Excellent written and verbal communication"
    ]
  },
  {
    title: "Accounting",
    scope: [
      "Working with real accounting documents used in daily operations",
      "Checking and verifying the accuracy of accounting documents",
      "Organizing documents in a systematic and structured manner",
      "Collaborating and working effectively with the accounting team"
    ],
    requirements: [
      "Currently studying Accounting or Finance",
      "Basic understanding of accounting documents and processes",
      "Detail-oriented with a strong sense of organization and accuracy",
      "Basic ability to use Excel, Google Sheets, and Google Docs",
      "Willingness to learn and open to feedback and guidance"
    ]
  }
];

const Internship = () => {
  const [positions] = useState<PositionDetail[]>(INTERNSHIP_POSITIONS);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
  });
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.lastName) {
      toast.error("Please enter your surname");
      return;
    }
    if (!formData.email) {
      toast.error("Please enter your email");
      return;
    }
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.position) {
      toast.error("Please select a position");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSuccessOpen(true);
      setFormData({ firstName: "", lastName: "", email: "", position: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Error submitting application:', error);
      toast.error(`Failed to submit application: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Section with Gradient */}
      <div className="relative bg-gradient-to-br from-soft-pink via-background to-[#BBDEFB] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-soft-pink rounded-full blur-[100px] opacity-30" />
        </div>
        
        <Navbar />
        
        <div className="container mx-auto px-4 pt-28 pb-20 md:pt-40 md:pb-40">
          {/* Animated Mascot Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mb-8 mx-auto w-32 h-32 md:w-40 md:h-40"
          >
            {/* Main Icon */}
            <div className="w-full h-full bg-gradient-to-br from-white via-soft-pink/20 to-sky-blue/20 rounded-[2rem] flex items-center justify-center shadow-lg border border-white/50 animate-float backdrop-blur-sm">
              <Bot className="w-16 h-16 md:w-20 md:h-20 text-primary" strokeWidth={1.5} />
            </div>

            {/* Floating Icons */}
            <motion.div
              className="absolute -top-4 -left-4 w-10 h-10 bg-soft-pink rounded-full flex items-center justify-center shadow-md animate-float-delayed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Users className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4 w-10 h-10 bg-sky-blue rounded-full flex items-center justify-center shadow-md animate-float-slow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Sparkles className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 w-10 h-10 bg-sky-blue rounded-full flex items-center justify-center shadow-md animate-float"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Lightbulb className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 w-10 h-10 bg-soft-pink rounded-full flex items-center justify-center shadow-md animate-float-delayed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Code className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          {/* Page Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-primary text-center mb-12"
          >
            BOTNOI Internship
          </motion.h1>

          {/* Position Category Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {positions.map((category, index) => (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <div 
                    className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-full px-6 py-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group focus:outline-none"
                  >
                    <span className={`font-medium ${index % 2 === 0 ? 'text-[#F06292]' : 'text-primary'}`}>
                      {category.title}
                    </span>
                    <ChevronDown className="w-5 h-5 text-[#F06292] group-data-[state=open]:rotate-180 transition-transform duration-500" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white/90 backdrop-blur-sm border-white/50 rounded-2xl p-4 shadow-xl data-[state=open]:duration-500 data-[state=closed]:duration-300 data-[side=bottom]:slide-in-from-top-4 data-[state=open]:ease-out">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-wider">Scope of work</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {category.scope.map((item, i) => (
                          <li key={i} className="text-sm text-gray-700">{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-wider">Requirement</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {category.requirements.map((item, i) => (
                          <li key={i} className="text-sm text-gray-700">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Application Form Section - On White Background */}
      <div className="relative bg-white flex-1 z-10">
        <div className="container mx-auto px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="max-w-2xl mx-auto bg-white border-[3px] border-[#BBDEFB] rounded-[2.5rem] p-8 md:p-12 shadow-sm"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">
              Application Now Open!
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="space-y-4">
                {/* Name */}
                <div className="relative">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold z-10">Name</div>
                   <Input 
                    placeholder="...Type..." 
                    className="bg-white border-[3px] border-[#BBDEFB] rounded-full pl-24 h-14 text-primary placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#F06292] focus-visible:border-transparent transition-all duration-300"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Surname */}
                <div className="relative">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold z-10">Surname</div>
                   <Input 
                    placeholder="...Type..." 
                    className="bg-white border-[3px] border-[#BBDEFB] rounded-full pl-24 h-14 text-primary placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#F06292] focus-visible:border-transparent transition-all duration-300"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Gmail */}
                <div className="relative">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold z-10">Gmail</div>
                   <Input 
                    type="email"
                    placeholder="...Type..." 
                    className="bg-white border-[3px] border-[#BBDEFB] rounded-full pl-24 h-14 text-primary placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#F06292] focus-visible:border-transparent transition-all duration-300"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Position Dropdown */}
                <div className="relative">
                  <Select 
                    value={formData.position} 
                    onValueChange={(value) => handleInputChange("position", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="w-full bg-white border-[3px] border-[#BBDEFB] rounded-full h-12 md:h-14 text-primary font-bold focus:ring-2 focus:ring-[#F06292] focus:ring-offset-0">
                      <SelectValue placeholder="Position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((category) => (
                        <SelectItem key={category.title} value={category.title}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#F06292] hover:bg-[#D81B60] text-white font-bold rounded-full px-12 py-6 text-lg shadow-md transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      
      <Footer />

      {/* Success Modal */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-[#FFF0F5] via-white to-[#E3F2FD] border-none rounded-[2.5rem] p-12 [&>button]:hidden shadow-xl overflow-hidden">
          <DialogTitle className="sr-only">Application Submit</DialogTitle>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.2, 
                type: "spring", 
                stiffness: 260, 
                damping: 20 
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#66B1FF]/20 blur-xl rounded-full" />
              <Check className="w-24 h-24 text-[#66B1FF] mb-2 relative z-10" strokeWidth={5} />
            </motion.div>
            
            <div className="space-y-2">
              <motion.h3 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-4xl font-bold text-[#2D3E72]"
              >
                Application Submit
              </motion.h3>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-[#2D3E72] text-lg font-medium"
              >
                Your application has been submitted successfully. Good luck !
              </motion.p>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Internship;

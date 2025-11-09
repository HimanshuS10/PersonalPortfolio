import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Menu, X } from 'lucide-react';
import GolfPic from './assets/GolfPic.jpeg'
import Profile from './assets/Profile.png'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Software Developer',
    'Full Stack Developer',
    'University Student',
    'Entrepreneur'
  ];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 2000;

    const handleTyping = () => {
      const currentFullText = roles[currentRole];

      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentFullText.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Azure Depths */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      />

      <div className="relative z-10">
        <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md border-b border-blue-900/30 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Himanshu Seervi
            </div>

            <div className="hidden md:flex gap-8">
              {['About', 'Experience', 'Projects', 'Resume', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-slate-300 hover:text-blue-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="md:hidden text-slate-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden bg-black/80 border-t border-blue-900/30">
              <div className="flex flex-col gap-4 px-6 py-4">
                {['About', 'Experience', 'Projects', 'Resume', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-slate-300 hover:text-blue-400 transition-colors text-left"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Himanshu Seervi</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 h-8">
              {displayText}<span className="animate-pulse">|</span>
            </p>
            <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
              Passionate about building real-world projects that actually help solve problems using various technologies.
              Currently seeking Software Engineering Internship opportunities for Summer 2025.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Get In Touch
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors"
              >
                View Projects
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">About Me</h2>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-8 border border-blue-900/30 flex flex-col items-center gap-8">

              {/* Image on top */}
              <div className="w-64 h-64 relative flex flex-row items-center justify-center gap-3">
                <img
                  src={Profile}
                  alt="Himanshu Seervi"
                  className="rounded-lg shadow-lg w-full h-full object-cover"
                />
                <img
                  src={GolfPic}
                  alt="Himanshu Seervi"
                  className="rounded-lg shadow-lg w-full h-full object-cover max-md:hidden"
                />
                {/* <img
                  src={Profile}
                  alt="Himanshu Seervi"
                  className="rounded-lg shadow-lg w-full h-full object-cover"
                /> */}
              </div>

              {/* Text content */}
              <div className="w-full text-center space-y-6">
                <p className="text-slate-300 text-lg leading-relaxed">
                  Hey there! I'm Himanshu Seervi, a <b className='text-blue-500'>third-year Software Engineering</b> student at the <b className='text-blue-500'>University of Guelph</b>.
                  When I first took Software Engineering in my first year, I wasn’t sure if it was the right path for me.
                  Now, it has become more than just a major, it’s my passion. I love identifying real-world problems and
                  developing software solutions to solve them.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Beyond academics and work, I am an aspiring techpreneur and the founder of ExcelMate, an AI-powered software that can analyze and clean long, messy Excel data in seconds.
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

                  {/* Languages & Frameworks */}
                  <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-white mb-4">Languages & Frameworks</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md">
                      {['C', 'Java', 'Python/Flask', 'JavaScript', 'React', 'Node.js', 'VBA'].map(skill => (
                        <div key={skill} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 text-center text-blue-300 text-sm md:text-base">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools & Platforms */}
                  <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-white mb-4">Tools & Platforms</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md">
                      {['PostgreSQL', 'Supabase', 'Docker', 'Git', 'Postman', 'MongoDB', 'Figma', 'Jira', 'APIs'].map(tool => (
                        <div key={tool} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 text-center text-blue-300 text-sm md:text-base">
                          {tool}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>



        <section id="experience" className="py-20 px-6 bg-black/20 relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Experience</h2>

            <div className="relative space-y-12">
              {[
                {
                  title: "Industrial Software Developer Intern",
                  company: "Algoma Steel Inc.",
                  link: "https://www.algoma.com/",
                  date: "May 2024 - August 2024",
                  points: [
                    "• Developed a Data Interface Application using AVEVA PI Process and PI Vision. ",
                    "• Utilized VBA to manipulate and process system data effectively.  ",
                    "• Dynamically controlled the interface visuals based on equipment and system states.",]
                },
                {
                  title: "Quality Assurance Tester Handler",
                  company: "Algoma Steel Inc.",
                  link: "https://www.algoma.com/",
                  date: "May 2025 - August 2025",
                  points: [
                    "• Cut and prepared steel samples according to sample requests, and recorded all finished samples in tracking software.",
                    "• Troubleshot missing or misplaced samples by investigating and updating the tracking system to ensure accurate sample management."
                  ],
                },
                {
                  title: "Director of Finance",
                  company: "Google Developer Groups",
                  link: "https://www.gdgguelph.com/",
                  date: "September 2025 - Present",
                  points: [
                    "• Leading a team of 4 finance members to manage budgeting and financial strategy for the GDG Hackathon 2026.",
                    "• Conducting outreach to 100+ companies to negotiate sponsorships and build partnerships that support event logistics and prizes.",
                    "• Securing sponsorship funding and coordinating ongoing support to ensure successful planning and execution of the event."
                  ],
                },

              ]
                // reverse order for bottom-to-top stacking
                .slice()
                .reverse()
                .map((exp, i, arr) => (
                  <div
                    key={i}
                    className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-blue-900/30 top-24 transition-transform duration-500"
                    style={{
                      zIndex: 10 + i, // higher zIndex for later (bottom) items
                    }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline hover:text-blue-500"
                        >
                          {exp.company}
                        </a>
                      </div>
                      <span className="text-slate-400">{exp.date}</span>
                    </div>
                    <ul className="text-slate-300 space-y-2">
                      {exp.points.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </div>
                ))
              }
            </div>
          </div>
        </section>


        <section id="projects" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-8">Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Intelligent Tutoring System",
                  description: "Full-stack tutoring application with AI-powered personalized learning. Features include a Machine Learning model for assessing mastery levels, an admin dashboard, and responsive UI/UX designed in Figma.",
                  tech: ["React.js", "Tailwind CSS", "Django", "Scikit-Learn", "OpenAI API", "Supabase"],
                  link: "#",
                },
                {
                  title: "ExcelGPT",
                  description: "Collaborative task management tool with real-time updates, drag-and-drop interface, and team features.",
                  tech: ["React.js", "Tailwind CSS", "Python Flask", "Google Gemini API"],
                  link: "#"
                },
              ].map((project, idx) => (
                <div key={idx} className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-blue-900/30 hover:border-blue-500/50 transition-colors">
                  <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-slate-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                    View Project <ExternalLink size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="py-20 px-6 bg-black/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Resume</h2>
            <p className="text-slate-300 mb-8 text-lg">
              Interested in learning more about my experience and qualifications?
            </p>
            <a
              href="./doc/HimanshuResume.pdf"
              download="Himanshu_Seervi_Resume.pdf"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity inline-block text-center"
            >
              Download Resume
            </a>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Get In Touch</h2>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-8 border border-blue-900/30">
              <p className="text-slate-300 text-lg text-center mb-8">
                I'm currently looking for software engineering internship opportunities.
                Let's connect and discuss how I can contribute to your team!
              </p>
              <div className="flex justify-center gap-6">
                <a href="mailto:himseervi@gmail.com" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                  <Mail size={24} />
                  <span>Email</span>
                </a>
                <a href="https://github.com/HimanshuS10" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                  <Github size={24} />
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/himanshu-seervi/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                  <Linkedin size={24} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-blue-900/30">
          <div className="max-w-6xl mx-auto text-center text-slate-400">
            <p>© 2026 Himanshu Seervi.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import TextType from './TextType.jsx';
// Make sure you have installed 'lucide-react' if you want to use Lucide icons, 
// otherwise the code below uses the Devicon classes you provided.

// Import your assets here
import Profile from './assets/Profile.png';
import ExcelGPT from './assets/ExcelGPT.png';
import GryphTutoring from './assets/GryphTutoring.png';
import BizReviewAI from './assets/BizReviewAI.png';

const App = () => {

  const experiences = [
    {
      role: "Director of Finance",
      company: "Google Developer Groups",
      period: "Sep 2025 - Present",
      description: "Led a team of four to manage budgeting and financial strategy for a upcoming GDG Hackathon 2026. Secured corporate sponsorships and coordinated fiscal partnerships.",
      skills: ["Leadership", "Budgeting", "Partnerships", "Event Planning"],
    },
    {
      role: "Quality Assurance Tester Handler",
      company: "Algoma Steel Inc.",
      period: "May 2025 - Aug 2025",
      description: "Cut and prepared steel samples per specifications and accurately recorded them in the tracking system. Investigated and resolved discrepancies to maintain reliable sample management.",
      skills: ["Quality Assurance", "Data Entry", "Process Analysis", "Safety Compliance"],
    },
    {
      role: "Industrial Software Developer",
      company: "Algoma Steel Inc.",
      period: "May 2024 – Aug 2024",
      description: "Developed and optimized mobile-accessible data interfaces using AVEVA PI Vision. Built custom dashboards and resolved data migration issues through VBA scripting.",
      skills: ["VBA", "AVEVA PI Vision", "Data Visualization", "SQL", "Industrial IoT", "PLC"],
    },
  ];

  const row1 = [
    { icon: "devicon-python-plain", name: "Python" },
    { icon: "devicon-java-plain", name: "Java" },
    { icon: "devicon-typescript-plain", name: "TypeScript" },
    { icon: "devicon-javascript-plain", name: "JavaScript" },
    { icon: "devicon-react-original", name: "React" },
    { icon: "devicon-nextjs-plain", name: "Next.js" },
    { icon: "devicon-html5-plain", name: "HTML5" },
    { icon: "devicon-css3-plain", name: "CSS3" },
  ];

  const row2 = [
    { icon: "devicon-nodejs-plain", name: "Node.js" },
    { icon: "devicon-postgresql-plain", name: "PostgreSQL" },
    { icon: "devicon-supabase-plain", name: "Supabase" },
    { icon: "devicon-docker-plain", name: "Docker" },
    { icon: "devicon-git-plain", name: "Git" },
    { icon: "devicon-tailwindcss-plain", name: "Tailwind" },
    { icon: "devicon-amazonwebservices-plain-wordmark", name: "AWS" },
    { icon: "devicon-linux-plain", name: "Linux" },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-sans text-slate-300 selection:bg-blue-500/30 overflow-x-hidden">

      <div className="relative w-full min-w-7xl bg-[#08090F] overflow-hidden border border-white/5 shadow-2xl min-h-[900px] flex flex-col">

        <div
          className="absolute top-0 left-0 w-full h-[650px] pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] min-h-[500px] bg-slate-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent opacity-30 pointer-events-none"
          style={{ clipPath: 'polygon(20% 0%, 80% 0%, 50% 100%)' }}
        />
        <div className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
          <nav className="flex items-center justify-between w-full max-w-3xl px-3 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl pointer-events-auto">
            <div className="pl-4 pr-2">
              <div className="text-white font-semibold text-lg tracking-tight cursor-pointer hover:text-slate-200 transition-colors">
                Himanshu.
              </div>
            </div>
            <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1.5 border border-white/5">
              <NavLink text="About" />
              <NavLink text="Experience" />
              <NavLink text="Projects" />
              <NavLink text="Contact" />
            </div>
            <div className="pl-2">
              <a href="doc/Himanshu Seervi Resume 2025-26.pdf" download className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-slate-200 transition-all active:scale-95">
                Resume
              </a>
            </div>
          </nav>
        </div>


        <main className="relative z-10 flex flex-col items-center mt-36 flex-grow">
          <div className="flex items-center gap-4 mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-slate-600" />
            <span className="text-slate-400 text-sm uppercase tracking-widest font-medium">Software Engineer</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-slate-600" />
          </div>

          <div className="relative mb-6 text-center px-4">
            <span className="absolute -left-12 -top-8 text-slate-700 font-mono text-xl opacity-50 hidden md:block">×</span>
            <span className="absolute -right-12 -top-8 text-slate-700 font-mono text-xl opacity-50 hidden md:block">×</span>

            <h1 className="text-7xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-blue-200/50 drop-shadow-2xl pb-4 leading-tight">
              Hi, I'm Himanshu Seervi
            </h1>
          </div>

          <p className="text-4xl md:text-4xl text-slate-300 text-center max-w-2xl mb-20 leading-relaxed px-4">
            <TextType
              text={["University Student", "Software Developer", "Tech Enthusiast"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </p>

          <div
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 px-4 w-full animate-fade-in-up"
            style={{
              animationDelay: "0.3s",
              animationFillMode: "forwards",
              opacity: 0,
            }}
          >
            {/* Primary CTA */}
            <a
              href="#contact"
              className="group relative w-full sm:w-auto max-w-xs px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm text-center transition-all hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get in touch
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </a>
            <a
              href="#projects"
              className="w-full sm:w-auto max-w-xs px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-semibold text-sm text-center backdrop-blur-md transition-all hover:bg-white/10 hover:text-white active:scale-95"
            >
              View my projects
            </a>
          </div>

        </main>


        <section id="about" className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 py-28">
          <div className="flex items-center gap-4 mb-20">
            <span className="text-blue-400 font-mono text-lg">01.</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-200 tracking-tight">About</h2>
            <div className="h-[1px] flex-grow max-w-sm bg-gradient-to-r from-slate-700 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-16 items-start">
            <div className="sticky top-32 group">
              <div className="relative bg-slate-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-md transition-all hover:border-blue-500/30 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)]">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                  <img src={Profile} alt="Himanshu Seervi" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Himanshu Seervi</h3>
                <p className="text-blue-400 text-sm font-medium mt-1">Software Engineer</p>
                <p className="text-slate-500 text-sm mt-3 flex items-center gap-2">
                  <span>🎓</span> University of Guelph '27
                </p>

                <div className="mt-6 w-full py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold flex items-center justify-center gap-2 animate-pulse-slow">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Open to Summer 2026 Internships
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6 text-xl text-slate-100 leading-relaxed font-light">
                <p>
                  Hey there! I'm Himanshu Seervi, a <span className='underline decoration-blue-400 '>third-year Software Engineering</span> student at the <span className='underline decoration-blue-400 '>University of Guelph</span>. When I first took Software Engineering in my first year, I wasn’t sure if it was the right path for me. Now, it has become more than just a major; it’s my passion. I love identifying real-world problems and developing software solutions to solve them.
                </p>
                <p>
                  I enjoy working on <span className='underline decoration-blue-400 '>Full-Stack Development and exploring AI Integration.</span> My goal is simple: to build accessible, high-performance software that makes an impact. Beyond my academics, I'm also the <span className='underline decoration-blue-400 '>Director of Finance for GDG (Google Developer Groups)</span>, where I blend technical knowledge with strategic planning to organize large-scale hackathons. My role also involves technical contributions, such as presenting to large groups and helping other students.
                </p>
                <p>
                  When I’m not coding, you'll find me playing soccer. <span className='underline decoration-blue-400 '>I'm always eager to connect with fellow tech enthusiasts, so feel free to reach out!</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="" className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 mb-20 mt-[-50px]">
          <div className="pt-4">
            <h3 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-6">Technologies I work with</h3>

            <div className="relative flex flex-col gap-4 w-full overflow-hidden mask-gradient">
              <div className="flex gap-4 animate-scroll-left w-max hover:[animation-play-state:paused]">
                {[...row1, ...row1, ...row1, ...row1, ...row1, ...row1].map((tech, i) => (
                  <TechPill key={i} icon={tech.icon} name={tech.name} />
                ))}
              </div>

              <div className="flex gap-4 animate-scroll-right w-max hover:[animation-play-state:paused]">
                {[...row2, ...row2, ...row2, ...row2, ...row2, ...row2].map((tech, i) => (
                  <TechPill key={i} icon={tech.icon} name={tech.name} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex items-center gap-4 mb-20">
            <span className="text-blue-400 font-mono text-lg">02.</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-200 tracking-tight">Experience</h2>
            <div className="h-[1px] flex-grow max-w-sm bg-gradient-to-r from-slate-700 to-transparent" />
          </div>

          <div className="relative space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="sticky top-28" style={{ zIndex: experiences.length - index }}>

                {/* Experience Card */}
                {/* Changed hover border and shadow to blue */}
                <div className="group relative bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.15)] overflow-hidden">

                  {/* Vertical Accent Line - Changed to Blue */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-700 group-hover:w-1.5 transition-all duration-300" />

                  {/* Inner Gradient Blob - Changed to Blue */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10 transition-opacity opacity-0 group-hover:opacity-100" />

                  <span className="absolute -top-4 -right-2 text-[5rem] font-bold text-white/5 select-none pointer-events-none transition-colors group-hover:text-white/10">
                    0{index + 1}
                  </span>

                  <div className="flex flex-col gap-6 relative z-10">

                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        {/* Changed title hover to blue */}
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-100 transition-colors">
                          {exp.role}
                        </h3>
                        {/* Changed company text to blue */}
                        <p className="text-blue-400 font-medium text-sm mt-1 flex items-center gap-2">
                          {exp.company}
                        </p>
                      </div>

                      {/* Changed date badge to blue on hover */}
                      <span className="text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full group-hover:border-blue-500/20 group-hover:bg-blue-500/5 transition-colors">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-slate-400 leading-relaxed max-w-3xl text-base">
                      {exp.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.skills.map((skill, i) => (
                        // Changed skills to blue style
                        <span key={i} className="text-xs font-medium text-slate-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md transition-colors group-hover:text-blue-300 group-hover:border-blue-500/20">
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 py-20">
          <div className="flex items-center gap-4 mb-24">
            {/* Changed number color to blue */}
            <span className="text-blue-400 font-mono text-lg">03.</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-200 tracking-tight">Projects</h2>
            <div className="h-[1px] flex-grow max-w-sm bg-gradient-to-r from-slate-700 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProjectCard
              title="Intelligent Tutoring System"
              description="Full-stack tutoring application with AI-powered personalized learning. Features include a Machine Learning model for assessing mastery levels."
              image={GryphTutoring}
              website="https://its-gryph-tutoring-yk1l.vercel.app/"
              tech={["React", "Django", "Scikit-Learn", "Supabase"]}
            />
            <ProjectCard
              title="ExcelGPT"
              description="Full-stack AI-powered application that analyzes Excel spreadsheets to quickly extract insights, reducing manual data analysis time."
              image={ExcelGPT}
              website="https://excelgpt.vercel.app/"
              github="https://github.com/HimanshuS10/ExcelGPT"
              tech={["React", "Flask", "Gemini API"]}
              />
            <ProjectCard
              title="Business Review Analyzer"
              description="Web app to analyze Google Maps reviews, providing actionable insights. Leveraged Apify for scraping and Gemini API for analysis."
              image={BizReviewAI}
              github="https://github.com/HimanshuS10/BizReviewAI"
              tech={["React", "Express.js", "Apify", "Gemini API"]}
            />
          </div>
        </section>


        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 py-24">
          {/* Changed background glow to blue */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-blue-500/20 blur-[100px] -z-10 rounded-full pointer-events-none" />

          <div className="flex items-center gap-4 mb-16">
            <span className="text-blue-400 font-mono text-lg">04.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-200 tracking-tight">Get In Touch</h2>
            <div className="h-[1px] flex-grow max-w-xs bg-slate-800" />
          </div>

          <div className="group relative bg-slate-900/50 border border-slate-800 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-4xl mx-auto overflow-hidden transition-all duration-300 hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-900/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">

              <div className="text-center md:text-left flex-1 space-y-4">
                <h3 className="text-2xl font-bold text-slate-100">Let's Build Something Together</h3>
                <p className="text-slate-400 leading-relaxed max-w-md mx-auto md:mx-0">
                  {/* Changed text highlight to blue */}
                  I’m actively seeking <span className="text-blue-400 font-medium">Summer 2026 Internships</span>.
                  Whether you have a question or just want to say hi, my inbox is always open!
                </p>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="mailto:himseervi@gmail.com"
                  className="flex items-center gap-3 px-6 py-3 bg-white hover:bg-slate-200 text-black rounded-lg font-bold transition-all hover:-translate-y-1 shadow-lg shadow-white/10"
                >
                  <i className="devicon-mail-plain text-xl"></i>
                  <span>Say Hello</span>
                </a>

                <div className="flex items-center gap-3 border-l border-slate-700 pl-4 ml-2">
                  <a href="https://www.linkedin.com/in/himanshu-seervi/" className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-all hover:-translate-y-1">
                    <i className="devicon-linkedin-plain text-xl"></i>
                  </a>
                  <a href="https://github.com/HimanshuS10" className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-all hover:-translate-y-1">
                    <i className="devicon-github-original text-xl"></i>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>

      <style>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;

// --- SUB COMPONENTS ---

const NavLink = ({ text }) => (
  <button onClick={() => document.getElementById(text.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })} className="px-4 py-1.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all hover:cursor-pointer">
    {text}
  </button>
);

const TechPill = ({ icon, name }) => (
  <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all cursor-default whitespace-nowrap">
    <i className={`${icon} text-lg`} />
    <span className="text-sm font-medium">{name}</span>
  </div>
);

const ProjectCard = ({ title, description, image, website, github, tech }) => (
  // Updated Project Card with Hover Effects matching new Blue theme
  // Changed border hover, shadow and background to blue variants
  <div className="group relative bg-slate-900/40 border border-white/10 rounded-2xl p-4 backdrop-blur-sm transition-all duration-300 flex flex-col hover:border-blue-500/50 hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] hover:-translate-y-2 hover:bg-slate-900/60">
    <div className="relative overflow-hidden rounded-xl mb-4 h-48">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Changed overlay to blue */}
      <div className="absolute inset-0 bg-blue-900/0 transition-colors group-hover:bg-blue-900/20 pointer-events-none" />
    </div>

    <div className="flex-1 space-y-2">
      {/* Changed title hover to blue */}
      <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {tech.map((t, i) => (
          // Changed tech pills to blue theme
          <span
            key={i}
            className="bg-blue-950/50 border border-blue-800/50 text-blue-300 px-2.5 py-1 text-[11px] rounded-full font-mono uppercase tracking-wider"
          >
            {t}
          </span>
        ))}
      </div>
    </div>

    <div className="mt-6 flex items-center gap-6 border-t border-white/5 pt-4">
      {website && (
        <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors text-sm font-medium group/link">
          <span className="group-hover/link:underline">Live Demo</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
        </a>
      )}
      <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-medium group/link">
        <i className="devicon-github-original text-base"></i>
        <span className="group-hover/link:underline">Source</span>
      </a>
    </div>
  </div>
);
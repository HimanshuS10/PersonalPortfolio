import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Profile from './assets/Profile.png';
import ExcelGPT from './assets/ExcelGPT.png';
import BizReviewAI from './assets/BizReviewAI.png';
import Archr from './assets/Archr.png';
import MintApp from './assets/MintApp.png';
import RepoLens from './assets/RepoLen.png';
import MintPage from './MintPage';
import PixelGame from './PixelGame';

// ─── PALETTE: black / grey / white ──────────────────────────────────────
const C = {
  bg: '#0B0B0B',
  bgAlt: '#111111',
  panel: '#161616',
  panel2: '#1E1E1E',
  line: '#2A2A2A',
  border: '#3A3A3A',
  borderHi: '#555555',
  ink: '#F4F4F4',
  white: '#FFFFFF',
  sub: '#A0A0A0',
  dim: '#6E6E6E',
  faint: '#3C3C3C',
};

const DISPLAY = "'Pixelify Sans', system-ui, sans-serif";
const MONO = "'Space Mono', 'Courier New', monospace";

const RESUME = "doc/Himanshu Seervi's Resume.pdf";

const NAV = [
  ['profile', 'PROFILE'],
  ['work', 'WORK'],
  ['projects', 'PROJECTS'],
  ['events', 'EVENTS'],
  ['contact', 'CONTACT'],
];

// ─── ROOT ────────────────────────────────────────────────────────────────
function Portfolio() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div style={{ fontFamily: MONO, background: C.bg, color: C.ink, overflowX: 'hidden' }}>
      <PixelNav scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <main style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 20px 100px' }}>
        <ProfileSection />
        <WorkSection />
        <ProjectsSection />
        <EventsSection />
        <ContactSection />
        <ResumeSection />
      </main>
      <Footer />
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes cursor { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes floatX { 0%{transform:translateX(0)} 100%{transform:translateX(60px)} }
        @keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .pulse-dot { animation: blink 1.6s steps(2) infinite; }
        .cursor-blink { animation: cursor 1s step-end infinite; }
        .cloud { animation: floatX 9s ease-in-out infinite alternate; }
        .bob { animation: bob 2.4s steps(3) infinite; }
        * { box-sizing: border-box; }
        html, body { overflow-x: hidden; max-width: 100%; margin: 0; background: ${C.bg}; }
        ::selection { background: ${C.white}; color: ${C.bg}; }
        a { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/project/mint" element={<MintPage />} />
    </Routes>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────
function PixelNav({ scrollTo }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(11,11,11,0.9)', backdropFilter: 'blur(6px)',
      borderBottom: `2px solid ${C.line}`,
    }}>
      <div style={{
        maxWidth: '1040px', margin: '0 auto', padding: '12px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: DISPLAY, fontSize: '22px', fontWeight: 700,
            color: C.white, cursor: 'pointer', letterSpacing: '0.06em',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
        >
          Himanshu Seervi
        </div>

        {/* desktop nav */}
        <div style={{ display: 'flex', gap: '26px' }} className="nav-links">
          {NAV.map(([id, label]) => (
            <NavItem key={id} label={label} onClick={() => scrollTo(id)} />
          ))}
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          className="nav-toggle"
          style={{
            display: 'none', background: 'transparent', border: `2px solid ${C.border}`,
            color: C.ink, fontFamily: DISPLAY, fontSize: '18px', padding: '4px 12px',
            cursor: 'pointer',
          }}
        >
          {open ? 'X' : '≡'}
        </button>
      </div>

      {open && (
        <div className="nav-mobile" style={{
          display: 'none', flexDirection: 'column', borderTop: `2px solid ${C.line}`,
          background: C.bgAlt,
        }}>
          {NAV.map(([id, label]) => (
            <button key={id}
              onClick={() => { scrollTo(id); setOpen(false); }}
              style={{
                background: 'transparent', border: 'none', textAlign: 'left',
                padding: '14px 20px', color: C.ink, fontFamily: MONO, fontSize: '14px',
                borderBottom: `1px solid ${C.line}`, cursor: 'pointer',
              }}>{label}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 720px) {
          .nav-links { display: none !important; }
          .nav-toggle { display: block !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

function NavItem({ label, onClick }) {
  const [h, setH] = useState(false);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontFamily: MONO, fontSize: '13px', fontWeight: 700,
        letterSpacing: '0.08em', cursor: 'pointer',
        color: h ? C.white : C.dim,
        borderBottom: `2px solid ${h ? C.white : 'transparent'}`,
        paddingBottom: '3px', transition: 'color .15s',
      }}
    >
      {label}
    </span>
  );
}

function PixelBlock({ size = 16, color = C.white }) {
  // a tiny 8-bit "?" block
  return (
    <span style={{
      width: size, height: size, background: color, display: 'inline-block',
      boxShadow: `inset 0 0 0 2px ${C.bg}, inset 0 0 0 4px ${color}`,
    }} />
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────
function Hero({ scrollTo }) {
  const isDesktop = useIsDesktop();
  return (
    <header style={{
      position: 'relative', minHeight: '100vh', paddingTop: '60px',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      background: `radial-gradient(circle at 50% 0%, ${C.bgAlt} 0%, ${C.bg} 70%)`,
    }}>
      {/* pixel grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(circle at 50% 40%, #000 0%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 40%, #000 0%, transparent 75%)',
      }} />

      {/* clouds */}
      <Cloud style={{ top: '16%', left: '10%' }} />
      <Cloud style={{ top: '26%', right: '12%' }} scale={0.7} />

      {/* center content */}
      <div style={{
        flex: 1, position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: '40px 20px 20px',
      }}>
        <div style={{
          fontFamily: MONO, fontSize: '12px', color: C.dim, letterSpacing: '0.3em',
          border: `2px solid ${C.line}`, padding: '6px 14px', marginBottom: '26px',
        }}>
          ● PLAYER 1 — HIMANSHU SEERVI
        </div>

        <h1 style={{
          fontFamily: DISPLAY, fontWeight: 700, margin: 0,
          fontSize: 'clamp(44px, 11vw, 128px)', lineHeight: 0.92,
          color: C.white, letterSpacing: '0.02em',
          textShadow: `4px 4px 0 ${C.panel2}, 8px 8px 0 ${C.bgAlt}`,
        }}>
          SOFTWARE<br />ENGINEER
        </h1>

        <div style={{ marginTop: '22px', minHeight: '30px' }}>
          <TypingHero />
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '34px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <PixelButton primary onClick={() => scrollTo('projects')}>▶ VIEW WORK</PixelButton>
          <PixelButton href={RESUME} download>↓ RESUME</PixelButton>
        </div>
      </div>

      {/* stats bar */}
      <div style={{
        position: 'relative', zIndex: 2, maxWidth: '1040px', width: '100%',
        margin: '0 auto', padding: '0 20px 30px',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '2px',
      }}>
        {[
          ['06+', 'PROJECTS SHIPPED'],
          ['2', 'INTERNSHIPS'],
          ['400+', 'CLIENTS SERVED'],
          ['$7.2K', 'FUNDS RAISED'],
        ].map(([n, l]) => <Stat key={l} n={n} l={l} />)}
      </div>

      {/* playable pixel platformer — desktop/laptop only */}
      {isDesktop ? <PixelGame /> : <StaticGround />}
    </header>
  );
}

// desktop/laptop only: needs a fine pointer, hover, and enough width
function useIsDesktop() {
  const query = '(hover: hover) and (pointer: fine) and (min-width: 900px)';
  const [ok, setOk] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setOk(m.matches);
    m.addEventListener?.('change', onChange);
    window.addEventListener('resize', onChange);
    return () => {
      m.removeEventListener?.('change', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, []);
  return ok;
}

// non-interactive pixel ground shown on tablet/phone in place of the game
function StaticGround() {
  const cols = 34;
  return (
    <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
      <div style={{
        textAlign: 'center', marginBottom: '14px',
        fontFamily: MONO, fontSize: '11px', color: C.dim, letterSpacing: '0.1em',
      }}>
        <span style={{ color: C.white, fontFamily: DISPLAY, fontSize: '15px', marginRight: '8px' }}>★</span>
        MINI-GAME PLAYABLE ON DESKTOP
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`,
        borderTop: `3px solid ${C.borderHi}`,
      }}>
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} style={{
            height: '46px',
            background: i % 2 === 0 ? C.panel2 : C.panel,
            borderRight: `1px solid ${C.bg}`,
          }} />
        ))}
      </div>
    </div>
  );
}

function Stat({ n, l }) {
  return (
    <div style={{
      background: C.panel, border: `2px solid ${C.line}`, padding: '16px 14px',
      textAlign: 'center',
    }}>
      <div style={{ fontFamily: DISPLAY, fontSize: '30px', color: C.white, lineHeight: 1 }}>{n}</div>
      <div style={{ fontFamily: MONO, fontSize: '10px', color: C.dim, letterSpacing: '0.14em', marginTop: '8px' }}>{l}</div>
    </div>
  );
}

function Cloud({ style, scale = 1 }) {
  const px = 10 * scale;
  const c = C.sub; // lighter clouds for visibility
  return (
    <div className="cloud" style={{ position: 'absolute', zIndex: 1, opacity: 0.75, ...style }}>
      <div style={{
        width: px * 5, height: px * 2, background: c, position: 'relative',
        boxShadow: `${px}px ${-px}px 0 ${c}, ${px * 2}px ${-px}px 0 ${c}, ${px * 3}px 0 0 ${c}, ${-px}px 0 0 ${c}`,
      }} />
    </div>
  );
}

function QBlock() {
  return (
    <div style={{
      width: 40, height: 40, background: C.panel, border: `2px solid ${C.borderHi}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: `inset 2px 2px 0 ${C.line}`,
    }}>
      <span style={{
        fontFamily: DISPLAY, fontSize: '24px', color: C.white,
        lineHeight: 1, display: 'block', marginTop: '2px',
      }}>?</span>
    </div>
  );
}

// ─── TYPING HERO ────────────────────────────────────────────────────────
function TypingHero() {
  const words = [
    'Full-Stack Developer',
    'B.Comp Software Engineering',
    'AI-Integrated Builder',
    'React · Spring Boot · FastAPI',
    'Based in Toronto, ON',
  ];
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  const [txt, setTxt] = useState('');

  useEffect(() => {
    const w = words[i];
    let t;
    if (!del && n < w.length) t = setTimeout(() => { setTxt(w.slice(0, n + 1)); setN(n + 1); }, 70);
    else if (!del && n === w.length) t = setTimeout(() => setDel(true), 1600);
    else if (del && n > 0) t = setTimeout(() => { setTxt(w.slice(0, n - 1)); setN(n - 1); }, 34);
    else { setDel(false); setI((i + 1) % words.length); }
    return () => clearTimeout(t);
  }, [n, del, i]);

  return (
    <span style={{ fontFamily: MONO, fontSize: 'clamp(14px, 2.6vw, 20px)', color: C.sub }}>
      <span style={{ color: C.dim }}>&gt; </span>
      {txt}
      <span className="cursor-blink" style={{
        display: 'inline-block', width: '0.55em', height: '1em', background: C.white,
        marginLeft: '2px', verticalAlign: 'text-bottom',
      }} />
    </span>
  );
}

function PixelButton({ children, onClick, href, download, primary }) {
  const [h, setH] = useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    fontFamily: DISPLAY, fontSize: '18px', letterSpacing: '0.04em',
    padding: '13px 24px', cursor: 'pointer', textDecoration: 'none',
    border: `2px solid ${primary ? C.white : C.border}`,
    color: primary ? (h ? C.white : C.bg) : (h ? C.white : C.ink),
    background: primary ? (h ? C.bg : C.white) : (h ? C.panel2 : 'transparent'),
    boxShadow: h ? `5px 5px 0 ${C.line}` : `3px 3px 0 ${C.line}`,
    transform: h ? 'translate(-2px,-2px)' : 'none',
    transition: 'transform .12s steps(2), box-shadow .12s',
  };
  const p = {
    onMouseEnter: () => setH(true), onMouseLeave: () => setH(false), style: base,
  };
  return href
    ? <a href={href} download={download || undefined} {...p}>{children}</a>
    : <button onClick={onClick} {...p}>{children}</button>;
}

// ─── SECTION FRAME ────────────────────────────────────────────────────────
function Section({ id, title, tag, children }) {
  return (
    <section id={id} style={{ margin: '90px 0 0', scrollMarginTop: '80px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px', flexWrap: 'wrap' }}>
        <PixelBlock size={18} />
        <h2 style={{
          fontFamily: DISPLAY, fontWeight: 700, margin: 0,
          fontSize: 'clamp(30px, 6vw, 54px)', color: C.white,
          textShadow: `3px 3px 0 ${C.panel2}`,
        }}>{title}</h2>
        <span style={{
          fontFamily: MONO, fontSize: '11px', color: C.dim, letterSpacing: '0.2em',
          border: `2px solid ${C.line}`, padding: '4px 10px', marginLeft: 'auto',
        }}>{tag}</span>
      </div>
      <div style={{
        border: `2px solid ${C.line}`, background: C.bgAlt,
        boxShadow: `6px 6px 0 ${C.panel}`, padding: 'clamp(20px, 4vw, 40px)',
      }}>
        {children}
      </div>
    </section>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────
function ProfileSection() {
  const skillGroups = [
    ['LANGUAGES', ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'C#', 'C']],
    ['FRONTEND', ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS']],
    ['BACKEND & DATABASES', ['Spring Boot', 'Node.js', 'FastAPI', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQL Server']],
    ['AI & EMERGING TECH', ['LLM Integration', 'Generative AI', 'RAG', 'Vector Search (pgvector)', 'Gemini API']],
    ['TOOLS & PRACTICES', ['Git', 'Docker', 'CI/CD', 'AWS', 'Azure', 'Agile/Scrum', 'JUnit', 'Jest', 'Jira', 'Postman']],
  ];
  return (
    <Section id="profile" title="PROFILE" tag="profile.txt">
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: 190, height: 190, border: `3px solid ${C.border}`,
            boxShadow: `6px 6px 0 ${C.panel}`, overflow: 'hidden',
            imageRendering: 'pixelated', background: C.panel,
          }}>
            <img src={Profile} alt="Himanshu Seervi" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 260 }}>
          <h3 style={{ fontFamily: DISPLAY, fontSize: '34px', color: C.white, margin: '0 0 4px' }}>
            Himanshu Seervi
          </h3>
          <p style={{ fontFamily: MONO, fontSize: '13px', color: C.sub, margin: '0 0 18px' }}>
            Software Engineer · Toronto, ON
          </p>
          <div style={{ lineHeight: 1.8, color: C.sub, fontSize: '14px', borderTop: `2px dashed ${C.line}`, paddingTop: '16px' }}>
            <p style={{ margin: '0 0 12px' }}>
              Hey! I'm a <b style={{ color: C.ink }}>final-year Software Engineering</b> student at the{' '}
              <b style={{ color: C.ink }}>University of Guelph</b> (graduating May 2027), minoring in
              Entrepreneurship and on the <b style={{ color: C.ink }}>Dean's List</b>. I love finding
              real-world problems and building software that solves them.
            </p>
            <p style={{ margin: '0 0 16px' }}>
              I most recently interned as a <b style={{ color: C.ink }}>Software Engineer at The Simple Knot Inc.</b>,
              shipping features on a production iOS & Android app. I specialize in{' '}
              <b style={{ color: C.ink }}>Full-Stack & AI-integrated development</b> — REST APIs, RAG pipelines,
              and cloud-native backends.
            </p>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '9px',
              border: `2px solid ${C.border}`, padding: '7px 14px',
              fontFamily: MONO, fontSize: '12px', color: C.ink,
            }}>
              <span className="pulse-dot" style={{ width: 9, height: 9, background: C.white, display: 'inline-block' }} />
              STATUS: OPEN TO 2027 NEW GRAD & INTERN ROLES
            </span>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `2px dashed ${C.line}`, marginTop: '28px', paddingTop: '24px' }}>
        <SubHead>TECHNOLOGIES</SubHead>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {skillGroups.map(([label, items]) => (
            <div key={label} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'baseline' }}>
              <span style={{
                fontFamily: MONO, fontSize: '10px', color: C.dim, letterSpacing: '0.14em',
                minWidth: 150, flexShrink: 0,
              }}>{label}</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', flex: 1 }}>
                {items.map(s => <Chip key={s}>{s}</Chip>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function SubHead({ children }) {
  return (
    <h4 style={{
      fontFamily: MONO, fontSize: '12px', color: C.dim, letterSpacing: '0.2em',
      margin: '0 0 16px', textTransform: 'uppercase',
    }}>
      <span style={{ color: C.white }}>// </span>{children}
    </h4>
  );
}

function Chip({ children }) {
  return (
    <span style={{
      fontFamily: MONO, fontSize: '12px', color: C.sub,
      background: C.panel, border: `2px solid ${C.line}`, padding: '4px 10px',
    }}>{children}</span>
  );
}

// ─── WORK EXPERIENCE ──────────────────────────────────────────────────────
function WorkSection() {
  const jobs = [
    {
      role: 'Software Engineer Intern',
      company: 'The Simple Knot Inc. · Guelph, ON',
      period: 'APR 2026 – AUG 2026',
      desc: 'Developed and integrated REST APIs connecting Instagram and Pinterest into the platform — handling authentication, error states, and data mapping between services. Owned end-to-end delivery of features on a production iOS & Android app serving 400+ clients, using AI-assisted tooling for refactoring and test scaffolding while validating all output through code reviews and CI/CD.',
      skills: ['REST APIs', 'iOS', 'Android', 'OAuth', 'CI/CD', 'AI Tooling'],
    },
    {
      role: 'Software Developer Intern',
      company: 'Algoma Steel Inc. · Sault Ste. Marie, ON',
      period: 'MAY 2024 – AUG 2024',
      desc: 'Built Python and MySQL backend workflows and relational data models aggregating real-time production KPIs into PI Vision dashboards serving 400+ engineers with 4,000+ views. Optimized SQL queries against large operational datasets, cutting dashboard load times by 40%, and debugged data-pipeline inconsistencies end-to-end in a zero-downtime-tolerance environment.',
      skills: ['Python', 'MySQL', 'SQL', 'PI Vision', 'Data Pipelines', 'KPIs'],
    },
  ];
  return (
    <Section id="work" title="WORK EXP" tag="career.log">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {jobs.map((j, i) => <JobRow key={i} j={j} last={i === jobs.length - 1} />)}
      </div>
    </Section>
  );
}

function JobRow({ j, last }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'flex', gap: '18px',
        padding: '20px', paddingLeft: '18px',
        borderLeft: `4px solid ${h ? C.white : C.border}`,
        background: h ? C.panel : 'transparent',
        marginBottom: last ? 0 : '4px', transition: 'background .15s, border-color .15s',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
          <div>
            <div style={{ fontFamily: DISPLAY, fontSize: '22px', color: C.white }}>{j.role}</div>
            <div style={{ fontFamily: MONO, fontSize: '13px', color: C.sub }}>{j.company}</div>
          </div>
          <span style={{
            fontFamily: MONO, fontSize: '11px', color: C.dim, letterSpacing: '0.1em',
            border: `2px solid ${C.line}`, padding: '4px 10px', alignSelf: 'flex-start', whiteSpace: 'nowrap',
          }}>{j.period}</span>
        </div>
        <p style={{ margin: '8px 0 12px', color: C.sub, fontSize: '13px', lineHeight: 1.7 }}>{j.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {j.skills.map(s => <Chip key={s}>{s}</Chip>)}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────
function ProjectsSection() {
  const projects = [
    {
      title: 'RepoLens',
      desc: 'AI codebase Q&A tool. An async FastAPI pipeline clones GitHub repos and chunks them by function with tree-sitter, using Redis workers to keep latency independent of repo size. Hybrid retrieval over pgvector fuses semantic and full-text rankings to feed the Gemini API, returning answers cited to exact file and line ranges.',
      tech: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'RAG', 'pgvector', 'Gemini API', 'Next.js'],
      image: RepoLens, demo: 'https://repo-lens-ochre.vercel.app/', github: 'https://github.com/HimanshuS10/repo-lens',
    },
    {
      title: 'NYC Complaint Heatmap',
      desc: 'Spring Boot REST API querying large-scale NYC Open Data and returning GeoJSON for real-time heatmap rendering with Leaflet.js and Mapbox. Object-oriented service/controller layers with JUnit coverage across every complaint category.',
      tech: ['Spring Boot', 'Java', 'Leaflet.js', 'Mapbox', 'JUnit', 'PostgreSQL'],
      image: MintApp, route: '/project/mint',
    },
    {
      title: 'Archr',
      desc: 'AI course-outline parser that extracts assignment deadlines into Google Calendar. Smart subtask scheduling + bi-directional sync with automated conflict recovery.',
      tech: ['Next.js', 'TypeScript', 'Tailwind', 'Gemini API', 'Google Calendar', 'Supabase'],
      image: Archr, demo: 'https://tryarchr.com/', github: 'https://github.com/HimanshuS10/Archr',
    },
    {
      title: 'ExcelGPT',
      desc: 'Full-stack AI web app to query spreadsheet data in plain English via Gemini API, with sub-second response on a Flask + Vercel stack.',
      tech: ['React.js', 'Python Flask', 'Pandas', 'Gemini API'],
      image: ExcelGPT, demo: 'https://excelgpt.vercel.app/', github: 'https://github.com/HimanshuS10/ExcelGPT',
    },
    {
      title: 'Business Review Analyzer',
      desc: 'Scrapes and analyzes Google Maps reviews with Apify and surfaces actionable business insights powered by Gemini API.',
      tech: ['React', 'Express.js', 'Apify', 'Gemini API'],
      image: BizReviewAI, github: 'https://github.com/HimanshuS10/BizReviewAI',
    },
  ];
  return (
    <Section id="projects" title="PROJECTS" tag="~/projects">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
        {projects.map((p, i) => <ProjCard key={i} p={p} />)}
      </div>
    </Section>
  );
}

function ProjCard({ p }) {
  const [h, setH] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      onClick={p.route ? () => navigate(p.route) : undefined}
      style={{
        border: `2px solid ${h ? C.white : C.border}`, background: C.panel,
        boxShadow: h ? `6px 6px 0 ${C.line}` : `3px 3px 0 ${C.line}`,
        transform: h ? 'translate(-3px,-3px)' : 'none',
        transition: 'transform .12s steps(2), box-shadow .12s, border-color .15s',
        cursor: p.route ? 'pointer' : 'default', display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ height: 156, overflow: 'hidden', borderBottom: `2px solid ${C.border}`, position: 'relative' }}>
        {p.image ? (
          <img src={p.image} alt={p.title} style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: h ? 'none' : 'grayscale(0.4) contrast(1.05)', transition: 'filter .2s',
          }} />
        ) : (
          <div style={{
            width: '100%', height: '100%', background: C.panel2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}>
            <span style={{
              fontFamily: DISPLAY, fontSize: '72px', color: C.borderHi,
              textShadow: `3px 3px 0 ${C.bg}`,
            }}>{p.title.charAt(0)}</span>
          </div>
        )}
        {(p.badge || p.restricted) && (
          <span style={{
            position: 'absolute', top: 8, right: 8, background: 'rgba(11,11,11,0.9)',
            border: `2px solid ${C.border}`, padding: '2px 8px',
            fontFamily: MONO, fontSize: '10px', color: C.sub,
          }}>{p.badge || 'PRIVATE'}</span>
        )}
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontFamily: DISPLAY, fontSize: '22px', color: C.white, margin: '0 0 8px' }}>{p.title}</h3>
        <p style={{ margin: '0 0 12px', fontSize: '12px', color: C.sub, lineHeight: 1.6, flex: 1 }}>{p.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
          {p.tech.map(t => (
            <span key={t} style={{
              fontFamily: MONO, fontSize: '10px', color: C.dim,
              background: C.panel2, border: `1px solid ${C.line}`, padding: '2px 6px',
            }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '16px', borderTop: `2px dashed ${C.line}`, paddingTop: '12px' }}>
          {p.demo && <CardLink href={p.demo}>▶ DEMO</CardLink>}
          {p.github && <CardLink href={p.github} dim>◈ SOURCE</CardLink>}
          {p.route && <span style={{ fontFamily: MONO, fontSize: '12px', color: C.white, fontWeight: 700 }}>▶ VIEW</span>}
          {p.status && !p.demo && !p.github && !p.route && (
            <span style={{ fontFamily: MONO, fontSize: '12px', color: C.dim, fontWeight: 700 }}>{p.status}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function CardLink({ href, children, dim }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: MONO, fontSize: '12px', fontWeight: 700, textDecoration: 'none',
        color: h ? C.white : (dim ? C.dim : C.sub),
        borderBottom: `2px solid ${h ? C.white : 'transparent'}`,
      }}>{children}</a>
  );
}

// ─── EVENTS ───────────────────────────────────────────────────────────────
function EventsSection() {
  const events = [
    {
      name: 'Google Developer Groups',
      role: 'DIRECTOR OF FINANCE',
      date: 'SEP 2025 – MAY 2026 · Guelph, ON',
      desc: 'Secured $7,200+ in sponsorships through outreach to 100+ companies, fully funding a 250-person hackathon delivered on time and within budget.',
      badge: '$7.2K RAISED',
    },
    {
      name: 'GDGHacks 2026 Organizer',
      role: 'CORE ORGANIZER',
      date: 'May 2026 · University of Guelph',
      desc: 'Coordinated with a 10-person organizing team across logistics, marketing, and judging — managing budget allocation and vendor payments end-to-end.',
      badge: '250 GUESTS',
    },
    // {
    //   name: 'Hackathon Builds',
    //   role: 'BUILDER',
    //   date: 'ONGOING',
    //   desc: 'Shipped AI-integrated projects like Archr and ExcelGPT during weekend hackathons, from idea to working demo.',
    //   badge: 'SHIP FAST',
    // },
  ];
  return (
    <Section id="events" title="EVENTS" tag="events.dat">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
        {events.map((e, i) => <EventCard key={i} e={e} />)}
      </div>
    </Section>
  );
}

function EventCard({ e }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        border: `2px solid ${h ? C.borderHi : C.border}`, background: C.panel,
        padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px',
        boxShadow: h ? `5px 5px 0 ${C.line}` : `3px 3px 0 ${C.line}`,
        transform: h ? 'translate(-2px,-2px)' : 'none',
        transition: 'transform .12s steps(2), box-shadow .12s, border-color .15s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
        <QBlock />
        <span style={{
          fontFamily: MONO, fontSize: '10px', color: C.ink, letterSpacing: '0.1em',
          border: `2px solid ${C.line}`, padding: '3px 8px',
        }}>{e.badge}</span>
      </div>
      <h3 style={{ fontFamily: DISPLAY, fontSize: '22px', color: C.white, margin: '4px 0 0' }}>{e.name}</h3>
      <div style={{ fontFamily: MONO, fontSize: '11px', color: C.white, letterSpacing: '0.08em' }}>{e.role}</div>
      <div style={{ fontFamily: MONO, fontSize: '11px', color: C.dim }}>{e.date}</div>
      <p style={{ margin: '4px 0 0', fontSize: '13px', color: C.sub, lineHeight: 1.65 }}>{e.desc}</p>
    </div>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────
function ContactSection() {
  const links = [
    ['EMAIL', 'himseervi@gmail.com', 'mailto:himseervi@gmail.com', false, false],
    ['PHONE', '+1 705-975-3686', 'tel:+17059753686', false, true],
    ['LINKEDIN', '/himanshu-seervi', 'https://www.linkedin.com/in/himanshu-seervi/', true, false],
    ['GITHUB', '/HimanshuS10', 'https://github.com/HimanshuS10', true, false],
  ];
  return (
    <Section id="contact" title="CONTACT" tag="contact.exe">
      <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
        <QBlock />
        <h3 style={{ fontFamily: DISPLAY, fontSize: '30px', color: C.white, margin: '18px 0 10px' }}>
          Let's Build Something
        </h3>
        <p style={{ color: C.sub, fontSize: '14px', lineHeight: 1.75, margin: '0 0 26px' }}>
          I'm actively seeking <b style={{ color: C.ink }}>2027 new grad & internship roles</b>.
          Got a question or just want to say hi? My inbox is always open.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        {links.map(([label, val, href, ext, mono]) => (
          <ContactRow key={label} label={label} val={val} href={href} ext={ext} mono={mono} />
        ))}
      </div>
    </Section>
  );
}

function BrandIcon({ name }) {
  const paths = {
    EMAIL: { c: '#EA4335', d: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z' },
    PHONE: { c: '#34A853', d: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.18z' },
    LINKEDIN: { c: '#0A66C2', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    GITHUB: { c: '#FFFFFF', d: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
    WEBSITE: { c: '#4AA3DF', d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14A7.9 7.9 0 0 1 4 12c0-.69.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.81 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.99 7.99 0 0 1 5.07 16zm2.95-8H5.07a7.99 7.99 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.02 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2 0 .69-.1 1.36-.26 2h-3.38z' },
  };
  const ic = paths[name];
  if (!ic) return null;
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={ic.c} style={{ flexShrink: 0 }} aria-hidden="true">
      <path d={ic.d} />
    </svg>
  );
}

function ContactRow({ label, val, href, ext, mono }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'block', textDecoration: 'none', padding: '16px',
        border: `2px solid ${h ? C.white : C.border}`,
        background: h ? C.panel2 : C.panel,
        boxShadow: h ? `5px 5px 0 ${C.line}` : `3px 3px 0 ${C.line}`,
        transform: h ? 'translate(-2px,-2px)' : 'none',
        transition: 'transform .12s steps(2), box-shadow .12s, border-color .15s',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <BrandIcon name={label} />
        <span style={{ fontFamily: MONO, fontSize: '10px', color: C.dim, letterSpacing: '0.2em' }}>{label}</span>
      </div>
      <div style={{
        fontFamily: mono ? MONO : DISPLAY,
        fontSize: mono ? '16px' : '18px',
        fontWeight: mono ? 700 : 400,
        letterSpacing: mono ? '0.03em' : 0,
        color: C.white,
      }}>{val}</div>
    </a>
  );
}

// ─── RESUME ───────────────────────────────────────────────────────────────
function ResumeSection() {
  return (
    <Section id="resume" title="RESUME" tag="resume.pdf">
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '24px', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: 66, height: 66, border: `3px solid ${C.border}`, background: C.panel,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: DISPLAY, fontSize: '28px', color: C.white,
            boxShadow: `4px 4px 0 ${C.line}`,
          }}>PDF</div>
          <div>
            <h3 style={{ fontFamily: DISPLAY, fontSize: '24px', color: C.white, margin: '0 0 4px' }}>
              Himanshu Seervi — Resume
            </h3>
            <p style={{ fontFamily: MONO, fontSize: '12px', color: C.dim, margin: 0 }}>
              Software Engineering · Updated Summer 2026
            </p>
          </div>
        </div>
        <PixelButton href={RESUME} download primary>↓ DOWNLOAD</PixelButton>
      </div>
    </Section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      borderTop: `2px solid ${C.line}`, background: C.bgAlt,
      padding: '30px 20px', textAlign: 'center',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}>
        {[0, 1, 2, 3, 4].map(i => (
          <span key={i} style={{ width: 12, height: 12, background: i % 2 ? C.line : C.border, display: 'inline-block' }} />
        ))}
      </div>
      <p style={{ fontFamily: MONO, fontSize: '11px', color: C.dim, margin: 0, letterSpacing: '0.1em' }}>
        © {new Date().getFullYear()} HIMANSHU SEERVI · BUILT WITH REACT · INSERT COIN TO CONTINUE
      </p>
    </footer>
  );
}

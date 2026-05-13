import React, { useState, useEffect } from 'react';
import Profile from './assets/Profile.png';
import ExcelGPT from './assets/ExcelGPT.png';
import BizReviewAI from './assets/BizReviewAI.png';
import Archr from './assets/Archr.png';
import DotField from './DotField';

const C = {
  bg: '#0A0A0A',
  grid: '#181818',
  watermark: '#272727',
  folder: '#484848',
  folderBorder: '#606060',
  bar: '#060606',
  barBorder: '#222222',
  ink: '#EBEBEB',
  label: '#C0C0C0',
  accent: '#4A9EFF',
  paper: '#0F0F0F',
  wBorder: '#2A2A2A',
  wTitleA: '#1C1C1C',
  wTitleB: '#111111',
};

export default function App() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', background: C.bg, overflowX: 'hidden' }}>
      <Hero scrollTo={scrollTo} />
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px 80px', background: C.bg }}>
        <ProfileSection />
        <WorksSection />
        <ContactSection />
        <ResumeSection />
      </main>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes cursor { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        .pulse-dot { animation: blink 2.2s ease-in-out infinite; }
        .cursor-blink { animation: cursor 1s step-end infinite; }
        * { box-sizing: border-box; }
        html, body { overflow-x: hidden; max-width: 100%; }
      `}</style>
    </div>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────
function Hero({ scrollTo }) {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: C.bg,
    }}>
      {/* Dot field background */}
      <DotField
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        dotRadius={3.5}
        dotSpacing={40}
        bulgeStrength={60}
        glowRadius={220}
        sparkle={false}
        waveAmplitude={0}
        cursorRadius={450}
        cursorForce={0.1}
        bulgeOnly
        gradientFrom="rgba(180, 151, 207, 0.25)"
        gradientTo="rgba(180, 151, 207, 0.25)"
        glowColor="#000000"
      />
      <TypingHero />

      {/* profile icon – top left */}
      <DeskIcon style={{ top: '14%', left: '8%' }} onClick={() => scrollTo('profile')}>
        <AppIco />
        <IcoLabel>profile</IcoLabel>
      </DeskIcon>

      {/* works folder – mid left */}
      <DeskIcon style={{ top: '48%', left: '8%' }} onClick={() => scrollTo('works')}>
        <FolderIco />
        <IcoLabel>works</IcoLabel>
      </DeskIcon>

      {/* contact folder – upper right */}
      <DeskIcon style={{ top: '28%', right: '9%' }} onClick={() => scrollTo('contact')}>
        <FolderIco />
        <IcoLabel>contact</IcoLabel>
      </DeskIcon>

      {/* resume folder – lower right */}
      <DeskIcon style={{ top: '52%', right: '9%' }} onClick={() => scrollTo('resume')}>
        <FolderIco />
        <IcoLabel>resume</IcoLabel>
      </DeskIcon>

      {/* Taskbar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '72px',
        background: 'rgba(6, 6, 6, 0.92)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid #1E1E1E',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '32px',
      }}>
        <SBtn href="https://www.linkedin.com/in/himanshu-seervi/" label="LinkedIn">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </SBtn>
        <SBtn href="https://github.com/HimanshuS10" label="GitHub">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </SBtn>
        <SBtn href="mailto:hseervi@uoguelph.ca" label="Mail">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
          </svg>
        </SBtn>
        <SBtn href="doc/Himanshu Seervi's Resume - Summer 2026.pdf" label="Resume" isDownload>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2 5 5h-5V4zM8 13h8v1H8v-1zm0 3h8v1H8v-1zm0-6h3v1H8v-1z" />
          </svg>
        </SBtn>
      </div>
    </div>
  );
}

// ─── TYPING HERO ────────────────────────────────────────────────────────
function TypingHero() {
  const lines = [
    { prefix: '> ', text: 'Himanshu Seervi' },
    { prefix: '$ ', text: 'Software Engineer' },
    { prefix: '> ', text: 'University Student' },
    { prefix: '~ ', text: 'const ai = true;' },
    { prefix: '$ ', text: 'git push origin main' },
    { prefix: '> ', text: 'Full Stack Developer' },
  ];

  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    const { text } = lines[phraseIdx];
    let t;
    if (!deleting && charIdx < text.length) {
      t = setTimeout(() => { setDisplayed(text.slice(0, charIdx + 1)); setCharIdx(i => i + 1); }, 80);
    } else if (!deleting && charIdx === text.length) {
      t = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      t = setTimeout(() => { setDisplayed(text.slice(0, charIdx - 1)); setCharIdx(i => i - 1); }, 40);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % lines.length);
    }
    return () => clearTimeout(t);
  }, [charIdx, deleting, phraseIdx]);

  const { prefix } = lines[phraseIdx];

  return (
    <div style={{
      position: 'absolute',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      pointerEvents: 'none',
      width: '90%',
    }}>
      {/* dim watermark behind */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(36px, 7vw, 96px)',
        fontWeight: '900', letterSpacing: '0.22em',
        color: C.watermark, userSelect: 'none', whiteSpace: 'nowrap',
        zIndex: 0,
      }}>PORTFOLIO</div>

      {/* typing line */}
      <div style={{
        position: 'relative', zIndex: 1,
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: 'clamp(18px, 3.5vw, 48px)',
        fontWeight: '700',
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.1em',
      }}>
        <span style={{ color: C.accent }}>{prefix}</span>
        <span style={{ color: C.ink }}>{displayed}</span>
        <span className="cursor-blink" style={{
          display: 'inline-block',
          width: '0.55em', height: '1.1em',
          background: C.accent,
          verticalAlign: 'middle',
          borderRadius: '2px',
        }} />
      </div>
    </div>
  );
}

function DeskIcon({ children, style, onClick }) {
  const [h, setH] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position: 'absolute',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '6px', cursor: 'pointer',
        transform: h ? 'scale(1.1) translateY(-3px)' : 'scale(1)',
        transition: 'transform 0.18s ease',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function AppIco() {
  return (
    <div style={{
      width: 64, height: 64, borderRadius: 14,
      background: 'linear-gradient(145deg, #141C2A, #080C14)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 14px rgba(0,0,0,0.7), 0 0 0 1px #4A9EFF22',
      border: '1.5px solid #1E3A5A',
    }}>
      <span style={{ color: '#4A9EFF', fontSize: 30, fontWeight: '900' }}>H</span>
    </div>
  );
}

function FolderIco() {
  return (
    <div style={{ width: 64, height: 54, position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 2,
        width: 25, height: 12,
        background: '#404040',
        borderRadius: '5px 8px 0 0',
        border: `1.5px solid ${C.folderBorder}`, borderBottom: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 9, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(165deg, #525252 0%, #343434 100%)',
        borderRadius: '2px 6px 6px 6px',
        border: `1.5px solid ${C.folderBorder}`,
        boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
      }}>
        <div style={{
          position: 'absolute', top: 5, left: 7, right: 7, height: 3,
          background: 'rgba(255,255,255,0.08)', borderRadius: 2,
        }} />
      </div>
    </div>
  );
}

function IcoLabel({ children }) {
  return (
    <span style={{
      fontSize: 11, fontFamily: '"Courier New", Courier, monospace',
      fontWeight: '700', color: C.label,
      background: 'rgba(10, 10, 10, 0.88)',
      padding: '2px 7px', borderRadius: 3,
      letterSpacing: '0.07em',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>{children}</span>
  );
}

function SBtn({ href, children, label, isDownload }) {
  const [h, setH] = useState(false);
  const isExternal = href.startsWith('http');
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={{
        position: 'absolute', bottom: 'calc(100% + 10px)',
        fontSize: '11px', fontFamily: '"Courier New", monospace',
        color: '#707070', whiteSpace: 'nowrap',
        opacity: h ? 1 : 0,
        transform: h ? 'translateY(0)' : 'translateY(4px)',
        transition: 'opacity 0.15s ease, transform 0.15s ease',
        pointerEvents: 'none',
      }}>{label}</span>
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        download={isDownload || undefined}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 40, height: 40, textDecoration: 'none',
          color: h ? '#FFFFFF' : '#4A4A4A',
          transform: h ? 'translateY(-5px) scale(1.2)' : 'translateY(0) scale(1)',
          transition: 'color 0.15s ease, transform 0.18s ease, filter 0.15s ease',
          filter: h ? `drop-shadow(0 0 8px ${C.accent}90)` : 'none',
        }}
      >
        {children}
      </a>
    </div>
  );
}

function Win({ id, title, children }) {
  return (
    <div id={id} style={{
      margin: '50px 0',
      border: `2px solid ${C.wBorder}`,
      borderRadius: '8px', overflow: 'hidden',
      boxShadow: `5px 5px 0 ${C.wBorder}`,
    }}>
      <div style={{
        background: `linear-gradient(to bottom, ${C.wTitleA}, ${C.wTitleB})`,
        padding: '9px 14px', display: 'flex', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: '6px', marginRight: '14px' }}>
          {['#FF5F57', '#FFBD2E', '#28C840'].map((c, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <span style={{
          flex: 1, textAlign: 'center',
          color: '#909090', fontSize: '13px', fontWeight: '700',
          fontFamily: '"Courier New", monospace', letterSpacing: '0.1em',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
        }}>{title}</span>
        <div style={{ width: 54 }} />
      </div>
      <div style={{ background: C.paper, padding: '32px 36px' }}>
        {children}
      </div>
    </div>
  );
}

function ProfileSection() {
  const experiences = [
    {
      role: 'Software Engineer Intern',
      company: 'The Simple Knot Inc.',
      period: 'Apr 2026 – Present',
      desc: 'Building a cross-platform iOS & Android app from scratch using React Native (Expo) and NeonDB. Integrated Instagram and Pinterest share extensions. Conducted user testing with 300+ users to validate product-market fit.',
      skills: ['React Native', 'Expo', 'NeonDB', 'iOS', 'Android', 'UX Research'],
    },
    {
      role: 'Software Developer Intern',
      company: 'Algoma Steel Inc.',
      period: 'May 2024 – Aug 2024',
      desc: 'Developed mobile-responsive data visualization using AVEVA PI Vision, improving workflow efficiency by 40%. Resolved legacy VBA data discrepancies, boosting data accuracy by 70%.',
      skills: ['AVEVA PI Vision', 'VBA', 'SQL', 'Data Visualization', 'Industrial IoT'],
    },
    {
      role: 'Director of Finance',
      company: 'Google Developer Groups',
      period: 'Sep 2025 – May 2026',
      desc: 'Led a team of 4 to raise $7,200+ in sponsorship funding. Initiated outreach to 100+ companies and hosted a 250-person hackathon at the University of Guelph.',
      skills: ['Leadership', 'Sponsorship', 'Event Planning', 'Budgeting'],
    },
  ];

  const skills = [
    'Python', 'Java', 'TypeScript', 'JavaScript', 'C++', 'SQL', 'Bash', 'VBA',
    'React.js', 'Next.js', 'Node.js', 'Angular', 'Spring Boot', 'React Native', 'Tailwind', 'Flask',
    'Docker', 'Git', 'Supabase', 'Firebase', 'Azure', 'MongoDB', 'Postman', 'Linux',
    'Claude AI', 'OpenAI', 'Google Cloud', 'REST API', 'Jira', 'Agile',
  ];

  return (
    <Win id="profile" title="profile.txt">
      {/* About */}
      <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <img src={Profile} alt="Himanshu Seervi" style={{
          width: 170, height: 170, objectFit: 'cover', borderRadius: '4px',
          border: `3px solid ${C.wBorder}`, flexShrink: 0,
        }} />
        <div style={{ flex: 1, minWidth: 220 }}>
          <h2 style={{ margin: '0 0 4px', fontSize: '26px', color: C.ink, fontWeight: '900' }}>
            Himanshu Seervi
          </h2>
          <p style={{ margin: '0 0 14px', color: '#606060', fontFamily: '"Courier New", monospace', fontSize: '13px' }}>
            Software Engineer · University of Guelph '27
          </p>
          <div style={{ borderTop: `1px dashed ${C.grid}`, paddingTop: '14px', lineHeight: '1.75', color: '#A8A8A8', fontSize: '14px' }}>
            <p style={{ margin: '0 0 10px' }}>
              Hey! I'm a <strong style={{ color: C.ink }}>third-year Software Engineering</strong> student at the <strong style={{ color: C.ink }}>University of Guelph</strong>, minoring in Entrepreneurship.
              I love identifying real-world problems and building software solutions for them.
            </p>
            <p style={{ margin: '0 0 14px' }}>
              Currently interning as a <strong style={{ color: C.ink }}>Software Engineer at The Simple Knot Inc.</strong>, building cross-platform mobile apps. I specialize in <strong style={{ color: C.ink }}>Full-Stack & AI-integrated development</strong> and previously served as <strong style={{ color: C.ink }}>Director of Finance for GDG</strong>, hosting a 250-person hackathon.
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#0A1A0A', border: `1px solid ${C.accent}33`,
              borderRadius: '4px', padding: '7px 14px',
              color: C.accent, fontFamily: '"Courier New", monospace', fontSize: '12px',
            }}>
              <span className="pulse-dot" style={{
                display: 'inline-block', width: 8, height: 8,
                borderRadius: '50%', background: '#28C840',
              }} />
              Currently @ The Simple Knot Inc.
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div style={{ borderTop: `1px dashed ${C.grid}`, paddingTop: '24px', marginBottom: '28px' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '13px', fontFamily: '"Courier New", monospace', color: C.accent, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Technologies
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {skills.map((t) => (
            <span key={t} style={{
              fontSize: '12px', fontFamily: '"Courier New", monospace',
              background: '#161616', border: '1px solid #303030',
              color: '#909090', borderRadius: '3px', padding: '3px 10px',
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div style={{ borderTop: `1px dashed ${C.grid}`, paddingTop: '24px' }}>
        <h3 style={{ margin: '0 0 18px', fontSize: '13px', fontFamily: '"Courier New", monospace', color: C.accent, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Experience
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {experiences.map((e, i) => (
            <div key={i} style={{ paddingLeft: '16px', borderLeft: `3px solid ${C.accent}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '4px' }}>
                <div>
                  <div style={{ fontWeight: '900', fontSize: '16px', color: C.ink }}>{e.role}</div>
                  <div style={{ color: C.accent, fontFamily: '"Courier New", monospace', fontSize: '12px' }}>{e.company}</div>
                </div>
                <div style={{
                  fontFamily: '"Courier New", monospace', fontSize: '11px', color: '#808080',
                  background: '#161616', border: '1px solid #303030',
                  borderRadius: '3px', padding: '3px 8px', alignSelf: 'flex-start',
                }}>{e.period}</div>
              </div>
              <p style={{ margin: '6px 0 10px', color: '#909090', fontSize: '13px', lineHeight: '1.65' }}>{e.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {e.skills.map((s, j) => (
                  <span key={j} style={{
                    fontSize: '11px', fontFamily: '"Courier New", monospace',
                    background: '#161616', border: '1px solid #303030',
                    color: '#888888', borderRadius: '3px', padding: '2px 7px',
                  }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Win>
  );
}

// ─── WORKS SECTION ───────────────────────────────────────────────────────
function WorksSection() {
  const projects = [
    {
      title: 'Archr',
      desc: 'AI-powered course outline parser that extracts assignment deadlines into Google Calendar. Includes smart subtask scheduling and bi-directional sync with automated conflict recovery.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Gemini API', 'Google Calendar API', 'Supabase'],
      image: Archr,
      demo: 'https://tryarchr.com/',
      github: 'https://github.com/HimanshuS10/Archr',
    },
    {
      title: 'ExcelGPT',
      desc: 'Full-stack AI web app enabling users to query spreadsheet data in plain English via Gemini API, with sub-second response times on a Flask + Vercel stack.',
      tech: ['React.js', 'Python Flask', 'Pandas', 'Gemini API'],
      image: ExcelGPT,
      demo: 'https://excelgpt.vercel.app/',
      github: 'https://github.com/HimanshuS10/ExcelGPT',
    },
    {
      title: 'Business Review Analyzer',
      desc: 'Web app that scrapes and analyzes Google Maps reviews using Apify and surfaces actionable business insights powered by Gemini API.',
      tech: ['React', 'Express.js', 'Apify', 'Gemini API'],
      image: BizReviewAI,
      github: 'https://github.com/HimanshuS10/BizReviewAI',
    },
  ];

  return (
    <Win id="works" title="works/">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '22px' }}>
        {projects.map((p, i) => <ProjCard key={i} p={p} />)}
      </div>
    </Win>
  );
}

function ProjCard({ p }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        border: `2px solid ${h ? C.accent : C.wBorder}`,
        borderRadius: '6px', overflow: 'hidden', background: '#111111',
        transition: 'border-color .2s, transform .2s, box-shadow .2s',
        transform: h ? 'translateY(-5px)' : 'none',
        boxShadow: h ? `4px 4px 0 ${C.accent}55` : `2px 2px 0 ${C.wBorder}`,
      }}
    >
      <div style={{ height: 150, overflow: 'hidden', borderBottom: `2px solid ${C.wBorder}`, position: 'relative' }}>
        {p.image ? (
          <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #0D1A2E 0%, #0A0A14 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontSize: '48px', fontWeight: '900', fontFamily: 'Georgia, serif',
              color: `${C.accent}33`, letterSpacing: '-2px', userSelect: 'none',
            }}>{p.title.charAt(0)}</span>
          </div>
        )}
      </div>
      <div style={{ padding: '14px 16px' }}>
        <h3 style={{ margin: '0 0 6px', fontSize: '15px', color: C.ink, fontWeight: '900' }}>{p.title}</h3>
        <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#909090', lineHeight: '1.55' }}>{p.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
          {p.tech.map((t, i) => (
            <span key={i} style={{
              fontSize: '10px', fontFamily: '"Courier New", monospace',
              background: '#161616', border: '1px solid #303030',
              color: '#808080', borderRadius: '2px', padding: '2px 6px',
            }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '14px', borderTop: `1px dashed ${C.grid}`, paddingTop: '10px' }}>
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{
              fontSize: '12px', fontFamily: '"Courier New", monospace',
              color: C.accent, textDecoration: 'underline', fontWeight: '700',
            }}>→ demo</a>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" style={{
              fontSize: '12px', fontFamily: '"Courier New", monospace',
              color: '#707070', textDecoration: 'underline',
            }}>⌘ source</a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT SECTION ────────────────────────────────────────────────────
function ContactSection() {
  return (
    <Win id="contact" title="contact.txt">
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <h2 style={{ fontSize: '28px', color: C.ink, margin: '0 0 10px', fontWeight: '900' }}>Let's Connect</h2>
        <p style={{ color: '#909090', lineHeight: '1.75', maxWidth: '460px', margin: '0 auto 28px', fontSize: '14px' }}>
          I'm actively seeking <strong style={{ color: C.accent }}>Fall 2026 internships</strong>. Whether you have
          a question or just want to say hi, my inbox is always open!
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <CLink href="mailto:hseervi@uoguelph.ca" label="hseervi@uoguelph.ca" />
          <CLink href="https://www.linkedin.com/in/himanshu-seervi/" label="LinkedIn" ext />
          <CLink href="https://github.com/HimanshuS10" label="GitHub" ext />
        </div>
      </div>
    </Win>
  );
}

function CLink({ href, label, ext }) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      target={ext ? '_blank' : undefined}
      rel={ext ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-block', padding: '10px 20px',
        fontFamily: '"Courier New", monospace', fontSize: '13px',
        color: h ? '#0A0A0A' : C.accent,
        background: h ? C.accent : 'transparent',
        border: `2px solid ${C.accent}`,
        borderRadius: '4px', textDecoration: 'none', fontWeight: '700',
        transition: 'all .15s ease',
        boxShadow: h ? `3px 3px 0 ${C.accent}88` : `2px 2px 0 ${C.accent}44`,
      }}
    >
      {label}
    </a>
  );
}

// ─── RESUME SECTION ──────────────────────────────────────────────────────
function ResumeSection() {
  return (
    <Win id="resume" title="resume.pdf">
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <div style={{ fontSize: '52px', marginBottom: '14px', lineHeight: 1 }}>📄</div>
        <h2 style={{ fontSize: '22px', color: C.ink, margin: '0 0 8px', fontWeight: '900' }}>
          Himanshu Seervi — Resume
        </h2>
        <p style={{ color: '#707070', marginBottom: '24px', fontFamily: '"Courier New", monospace', fontSize: '12px' }}>
          Software Engineering · University of Guelph
        </p>
        <a
          href="doc/Himanshu Seervi's Resume.pdf"
          download
          style={{
            display: 'inline-block', padding: '12px 30px',
            background: C.accent, color: '#0A0A0A',
            border: `2px solid #2A7ADF`,
            borderRadius: '4px', fontFamily: '"Courier New", monospace',
            fontWeight: '900', fontSize: '14px', textDecoration: 'none',
            boxShadow: '3px 3px 0 #1A5AB0', letterSpacing: '0.05em',
          }}
        >
          ↓ Download Resume
        </a>
      </div>
    </Win>
  );
}

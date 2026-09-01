import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MintApp from './assets/MintApp.png';
import MintTests from './assets/MintTests.png';
import MintCode from './assets/MintCode.png';

// ─── PALETTE: black / grey / white (matches App.jsx) ─────────────────────
const C = {
  bg: '#0B0B0B', bgAlt: '#111111', panel: '#161616', panel2: '#1E1E1E',
  line: '#2A2A2A', border: '#3A3A3A', borderHi: '#555555',
  ink: '#F4F4F4', white: '#FFFFFF', sub: '#A0A0A0', dim: '#6E6E6E',
};
const DISPLAY = "'Pixelify Sans', system-ui, sans-serif";
const MONO = "'Space Mono', 'Courier New', monospace";

function PixelDots() {
  return (
    <div style={{ display: 'flex', gap: '6px', marginRight: '12px' }}>
      {[C.border, C.dim, C.borderHi].map((c, i) => (
        <div key={i} style={{ width: 11, height: 11, background: c }} />
      ))}
    </div>
  );
}

function Win({ title, children }) {
  return (
    <div style={{
      margin: '32px 0',
      border: `2px solid ${C.line}`,
      background: C.bgAlt,
      boxShadow: `6px 6px 0 ${C.panel}`,
      overflow: 'hidden',
    }}>
      <div style={{
        background: C.panel2,
        borderBottom: `2px solid ${C.line}`,
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <PixelDots />
        <span style={{
          flex: 1, textAlign: 'center',
          color: C.sub, fontSize: '12px', fontWeight: 700,
          fontFamily: MONO, letterSpacing: '0.12em',
        }}>{title}</span>
        <div style={{ width: 40 }} />
      </div>
      <div style={{ background: C.bgAlt, padding: 'clamp(20px, 4vw, 36px)' }}>
        {children}
      </div>
    </div>
  );
}

function Tag({ children, solid }) {
  return (
    <span style={{
      fontSize: '11px', fontFamily: MONO,
      background: solid ? C.panel2 : C.panel,
      border: `2px solid ${solid ? C.borderHi : C.line}`,
      color: solid ? C.white : C.sub,
      padding: '3px 9px',
    }}>{children}</span>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ borderTop: `2px dashed ${C.line}`, paddingTop: '24px', marginTop: '24px' }}>
      <h3 style={{
        margin: '0 0 16px', fontSize: '12px', fontFamily: MONO,
        color: C.dim, textTransform: 'uppercase', letterSpacing: '0.14em',
      }}>
        <span style={{ color: C.white }}>// </span>{title}
      </h3>
      {children}
    </div>
  );
}

export default function MintPage() {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(null);

  const tech = [
    'Spring Boot', 'Java', 'React', 'TypeScript', 'PostgreSQL',
    'Leaflet.js', 'Mapbox', 'JUnit 5', 'Gradle', 'Docker', 'REST API',
  ];

  const myContributions = [
    {
      title: 'RESTful API Design & Implementation',
      body: 'Designed and built the core backend REST endpoints in Java Spring Boot — including complaint count aggregation by type, monthly complaint volumes, most frequent complaint per month, and status breakdowns by zip code. These endpoints powered the analytics dashboard.',
    },
    {
      title: 'complaintCount() — Business Logic',
      body: 'Implemented the complaintCount() method in RequestsServiceImpl.java that queries the JPA layer, buckets low-volume complaint categories into an "Other" group (threshold: 5,000), and returns a HashMap<String, Long> consumed by the frontend chart.',
    },
    {
      title: 'JUnit 5 Backend Testing',
      body: 'Wrote the full JUnit test suite for RequestsServiceImpl, covering edge cases like empty inputs, non-existent IDs, and successful CRUD paths. All 7 tests passed with BUILD SUCCESSFUL.',
    },
    {
      title: 'Frontend Testing',
      body: 'Contributed to the frontend test suite (npm test) verifying React component behavior alongside the backend test coverage.',
    },
  ];

  const features = [
    'Interactive bar chart of total civic complaints by type across NYC',
    'Monthly seasonal forecast with donut chart visualization',
    'Map view of geo-tagged 311 service requests across five boroughs',
    'Filter by request type, location, and resolution status',
    'Monthly summary: complaint volumes, top complaint type, ticket statuses',
    'Automated conflict recovery and bi-directional data sync',
  ];

  return (
    <div style={{
      fontFamily: MONO, background: C.bg, color: C.ink,
      minHeight: '100vh', overflowX: 'hidden',
    }}>
      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(11,11,11,0.92)', backdropFilter: 'blur(8px)',
        borderBottom: `2px solid ${C.line}`,
        padding: '12px 22px',
        display: 'flex', alignItems: 'center', gap: '16px',
      }}>
        <BackBtn onClick={() => navigate('/')} />
        <span style={{ fontFamily: MONO, fontSize: '12px', color: C.dim }}>
          ~/projects/<span style={{ color: C.white }}>nyc-heatmap</span>
        </span>
        <div style={{ marginLeft: 'auto' }}>
          <span style={{
            fontSize: '11px', fontFamily: MONO, color: C.sub,
            background: C.panel, border: `2px solid ${C.line}`,
            padding: '3px 10px', display: 'inline-flex', alignItems: 'center', gap: '7px',
          }}>
            <span style={{ width: 8, height: 8, background: C.borderHi, display: 'inline-block' }} />
            repo restricted — university policy
          </span>
        </div>
      </div>

      <main style={{ maxWidth: '880px', margin: '0 auto', padding: '20px 22px 90px' }}>

        {/* Hero */}
        <Win title="project.md">
          <div style={{ marginBottom: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Tag solid>CIS*3760 · University of Guelph</Tag>
            <Tag>Team Project · 5 members</Tag>
            <Tag>Winter 2026</Tag>
          </div>

          <h1 style={{
            margin: '18px 0 6px', fontFamily: DISPLAY,
            fontSize: 'clamp(34px, 6vw, 60px)', color: C.white, fontWeight: 700,
            textShadow: `3px 3px 0 ${C.panel2}`,
          }}>NYC Complaint Heatmap</h1>
          <p style={{ margin: '0 0 20px', fontFamily: MONO, fontSize: '13px', color: C.sub }}>
            NYC 311 Civic Complaint Analytics Platform · codename <span style={{ color: C.white }}>Mint</span>
          </p>

          <p style={{ margin: '0 0 14px', color: C.sub, lineHeight: 1.8, fontSize: '14px' }}>
            Mint transforms New York City's massive 311 service request dataset into an interactive analytics
            dashboard used by civic operations analysts. With hundreds of thousands of complaints spanning
            noise, sanitation, infrastructure, and safety across all five boroughs, the system surfaces
            patterns, seasonal trends, and resolution metrics that would otherwise be buried in spreadsheets.
          </p>
          <p style={{ margin: 0, color: C.dim, lineHeight: 1.8, fontSize: '14px' }}>
            The platform lets analysts filter requests by type, location, and status — and quickly identify
            areas with high complaint concentrations or delayed responses, directly improving how the city
            allocates department resources.
          </p>

          <div style={{ marginTop: '22px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {tech.map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </Win>

        {/* App screenshot */}
        <Shot
          src={MintApp}
          alt="Mint app — NYC Service Requests dashboard"
          url="mint-site.socs.uoguelph.ca"
          onClick={() => setActiveImg(MintApp)}
        />

        {/* My role */}
        <Win title="my_contributions.txt">
          <p style={{ margin: '0 0 22px', color: C.dim, fontFamily: MONO, fontSize: '12px' }}>
            role: <span style={{ color: C.white }}>Backend Developer</span>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {myContributions.map((c, i) => (
              <div key={i} style={{ paddingLeft: '16px', borderLeft: `4px solid ${C.border}` }}>
                <div style={{ fontFamily: DISPLAY, fontSize: '19px', color: C.white, marginBottom: '6px' }}>{c.title}</div>
                <p style={{ margin: 0, color: C.sub, fontSize: '13px', lineHeight: 1.7 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </Win>

        {/* Features */}
        <Win title="features.txt">
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {features.map((f, i) => (
              <li key={i} style={{
                display: 'flex', gap: '10px', alignItems: 'flex-start',
                color: C.sub, fontSize: '13px', lineHeight: 1.6,
              }}>
                <span style={{ color: C.white, fontFamily: MONO, flexShrink: 0 }}>▸</span>
                {f}
              </li>
            ))}
          </ul>
        </Win>

        {/* Evidence — tests + code */}
        <Win title="evidence/">
          <Section title="JUnit 5 Backend Test Results">
            <p style={{ margin: '0 0 14px', color: C.dim, fontSize: '13px', lineHeight: 1.65 }}>
              Full test suite for <code style={{ color: C.white, fontSize: '12px' }}>RequestsServiceImpl</code> — 7 passing tests
              covering edge cases, CRUD paths, and empty-input guards. Built with Gradle + JUnit 5.
            </p>
            <EvidenceImg src={MintTests} alt="JUnit test results — BUILD SUCCESSFUL" onClick={() => setActiveImg(MintTests)} />
            <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[
                'getMostCommonComplaintByMonthReturnsNoComplaintsWhenListEmpty',
                'allRequestsEmptyReturnsEmptyList',
                'statusByZipcodeReturnsCount',
                'getRequestNonExistingIdThrowsException',
                'allRequestsReturnsAllRequests',
                'complaintCountEmptyInputReturnsEmptyMap',
                'deleteRequestSuccessReturnsDeleted',
              ].map(name => (
                <span key={name} style={{
                  fontSize: '10px', fontFamily: MONO,
                  background: C.panel, border: `2px solid ${C.line}`,
                  color: C.sub, padding: '2px 7px',
                }}>✓ {name}()</span>
              ))}
            </div>
          </Section>

          <Section title="Backend Code — complaintCount()">
            <p style={{ margin: '0 0 14px', color: C.dim, fontSize: '13px', lineHeight: 1.65 }}>
              The core aggregation method in <code style={{ color: C.white, fontSize: '12px' }}>RequestsServiceImpl.java</code>.
              Queries the JPA layer, buckets low-volume categories (&lt;5,000) into "Other", and returns a
              <code style={{ color: C.white, fontSize: '12px' }}> HashMap&lt;String, Long&gt;</code> for the frontend chart.
            </p>
            <EvidenceImg src={MintCode} alt="complaintCount() method source code" onClick={() => setActiveImg(MintCode)} />
          </Section>
        </Win>

        {/* Restricted notice */}
        <div style={{
          border: `2px solid ${C.border}`, background: C.panel,
          boxShadow: `4px 4px 0 ${C.panel2}`,
          padding: '18px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start',
        }}>
          <span style={{ color: C.white, fontFamily: DISPLAY, fontSize: '22px', flexShrink: 0, lineHeight: 1 }}>!</span>
          <div>
            <div style={{
              fontFamily: MONO, fontSize: '12px', color: C.white,
              marginBottom: '5px', fontWeight: 700, letterSpacing: '0.08em',
            }}>REPOSITORY RESTRICTED</div>
            <p style={{ margin: 0, color: C.sub, fontSize: '13px', lineHeight: 1.65 }}>
              This project was developed for <strong style={{ color: C.ink }}>CIS*3760 (Software Engineering)</strong> at
              the University of Guelph. Under university academic integrity policy, the source code
              repository cannot be shared publicly. The screenshots and evidence above represent my personal
              contributions to the project.
            </p>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {activeImg && (
        <div
          onClick={() => setActiveImg(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: '24px',
          }}
        >
          <img src={activeImg} alt="enlarged" style={{
            maxWidth: '90vw', maxHeight: '90vh',
            border: `2px solid ${C.borderHi}`,
            boxShadow: `8px 8px 0 ${C.panel2}`,
          }} />
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; }
        html, body { overflow-x: hidden; max-width: 100%; margin: 0; background: ${C.bg}; }
        ::selection { background: ${C.white}; color: ${C.bg}; }
      `}</style>
    </div>
  );
}

function BackBtn({ onClick }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: h ? C.panel2 : 'transparent',
        border: `2px solid ${h ? C.borderHi : C.border}`,
        color: h ? C.white : C.sub,
        fontFamily: MONO, fontSize: '12px', fontWeight: 700,
        padding: '5px 14px', cursor: 'pointer',
        boxShadow: `2px 2px 0 ${C.line}`,
        transition: 'color .15s, border-color .15s, background .15s',
      }}
    >← back</button>
  );
}

function Shot({ src, alt, url, onClick }) {
  const [h, setH] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        border: `2px solid ${h ? C.borderHi : C.line}`,
        boxShadow: `6px 6px 0 ${C.panel}`,
        overflow: 'hidden', cursor: 'zoom-in',
        transition: 'border-color .2s',
      }}
    >
      <div style={{
        background: C.panel2, borderBottom: `2px solid ${C.line}`,
        padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <PixelDots />
        <span style={{ fontFamily: MONO, fontSize: '12px', color: C.dim }}>{url}</span>
        <span style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: '11px', color: C.dim }}>
          click to enlarge
        </span>
      </div>
      <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
    </div>
  );
}

function EvidenceImg({ src, alt, onClick }) {
  const [h, setH] = useState(false);
  return (
    <img
      src={src} alt={alt} onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: '100%', display: 'block',
        border: `2px solid ${h ? C.borderHi : C.line}`,
        boxShadow: `4px 4px 0 ${C.panel}`,
        cursor: 'zoom-in', transition: 'border-color .2s',
      }}
    />
  );
}

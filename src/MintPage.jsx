import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MintApp from './assets/MintApp.png';
import MintTests from './assets/MintTests.png';
import MintCode from './assets/MintCode.png';

const C = {
  bg: '#0A0A0A',
  grid: '#181818',
  ink: '#EBEBEB',
  label: '#C0C0C0',
  accent: '#4A9EFF',
  paper: '#0F0F0F',
  wBorder: '#2A2A2A',
  wTitleA: '#1C1C1C',
  wTitleB: '#111111',
};

function Win({ title, children }) {
  return (
    <div style={{
      margin: '40px 0',
      border: `2px solid ${C.wBorder}`,
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: `5px 5px 0 ${C.wBorder}`,
    }}>
      <div style={{
        background: `linear-gradient(to bottom, ${C.wTitleA}, ${C.wTitleB})`,
        padding: '9px 14px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: '6px', marginRight: '14px' }}>
          {['#FF5F57', '#FFBD2E', '#28C840'].map((c, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <span style={{
          flex: 1,
          textAlign: 'center',
          color: '#909090',
          fontSize: '13px',
          fontWeight: '700',
          fontFamily: '"Courier New", monospace',
          letterSpacing: '0.1em',
        }}>{title}</span>
        <div style={{ width: 54 }} />
      </div>
      <div style={{ background: C.paper, padding: '32px 36px' }}>
        {children}
      </div>
    </div>
  );
}

function Tag({ children, accent }) {
  return (
    <span style={{
      fontSize: '11px',
      fontFamily: '"Courier New", monospace',
      background: accent ? `${C.accent}18` : '#161616',
      border: `1px solid ${accent ? C.accent + '44' : '#303030'}`,
      color: accent ? C.accent : '#808080',
      borderRadius: '3px',
      padding: '3px 9px',
    }}>{children}</span>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ borderTop: `1px dashed ${C.grid}`, paddingTop: '24px', marginTop: '24px' }}>
      <h3 style={{
        margin: '0 0 16px',
        fontSize: '12px',
        fontFamily: '"Courier New", monospace',
        color: C.accent,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
      }}>{title}</h3>
      {children}
    </div>
  );
}

export default function MintPage() {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(null);

  const tech = [
    'React', 'TypeScript', 'Spring Boot', 'Java', 'PostgreSQL',
    'Docker', 'Recharts', 'JUnit 5', 'Gradle', 'REST API',
  ];

  const myContributions = [
    {
      title: 'RESTful API Design & Implementation',
      body: 'Designed and built the core backend REST endpoints in Java Spring Boot — including complaint count aggregation by type, monthly complaint volumes, most frequent complaint per month, and status breakdowns by zip code. These endpoints powered the analytics dashboard.',
    },
    {
      title: 'complaintCount() — Business Logic',
      body: 'Implemented the complaintCount() method in RequestsServiceImpl.java that queries the JPA layer, buckets low-volume complaint categories into an "Other" group (threshold: 5,000), and returns a HashMap<String, Long> consumed by the frontend Recharts donut chart.',
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
      fontFamily: 'Georgia, "Times New Roman", serif',
      background: C.bg,
      minHeight: '100vh',
      overflowX: 'hidden',
    }}>
      {/* Top bar */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(6,6,6,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${C.wBorder}`,
        padding: '12px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: `1px solid #303030`,
            color: '#707070',
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            padding: '5px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'color .15s, border-color .15s',
          }}
          onMouseEnter={e => { e.target.style.color = C.ink; e.target.style.borderColor = '#606060'; }}
          onMouseLeave={e => { e.target.style.color = '#707070'; e.target.style.borderColor = '#303030'; }}
        >
          ← back
        </button>
        <span style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '12px',
          color: '#444',
        }}>
          ~/works/<span style={{ color: C.accent }}>mint</span>
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px', alignItems: 'center' }}>
          <div style={{
            fontSize: '11px',
            fontFamily: '"Courier New", monospace',
            color: '#606060',
            background: '#161616',
            border: '1px solid #2A2A2A',
            borderRadius: '3px',
            padding: '3px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#FF5F57' }}>
              <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm-.5 5h1v7h-1V6zm.5 10.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"/>
            </svg>
            repo restricted — university policy
          </div>
        </div>
      </div>

      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '20px 24px 80px' }}>

        {/* Hero */}
        <Win title="mint — project.md">
          <div style={{ marginBottom: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Tag accent>CIS*3760 · University of Guelph</Tag>
            <Tag>Team Project · 5 members</Tag>
            <Tag>Winter 2026</Tag>
          </div>

          <h1 style={{
            margin: '18px 0 6px',
            fontSize: 'clamp(28px, 5vw, 42px)',
            color: C.ink,
            fontWeight: '900',
            letterSpacing: '-0.01em',
          }}>Mint</h1>
          <p style={{
            margin: '0 0 20px',
            fontFamily: '"Courier New", monospace',
            fontSize: '13px',
            color: C.accent,
          }}>NYC 311 Civic Complaint Analytics Platform</p>

          <p style={{ margin: '0 0 14px', color: '#A8A8A8', lineHeight: '1.8', fontSize: '14px' }}>
            Mint transforms New York City's massive 311 service request dataset into an interactive analytics
            dashboard used by civic operations analysts. With hundreds of thousands of complaints spanning
            noise, sanitation, infrastructure, and safety across all five boroughs, the system surfaces
            patterns, seasonal trends, and resolution metrics that would otherwise be buried in spreadsheets.
          </p>
          <p style={{ margin: '0', color: '#808080', lineHeight: '1.8', fontSize: '14px' }}>
            The platform lets analysts filter requests by type, location, and status — and quickly identify
            areas with high complaint concentrations or delayed responses, directly improving how the city
            allocates department resources.
          </p>

          <div style={{ marginTop: '22px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {tech.map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </Win>

        {/* App screenshot */}
        <div
          onClick={() => setActiveImg(MintApp)}
          style={{
            border: `2px solid ${C.wBorder}`,
            borderRadius: '8px',
            overflow: 'hidden',
            cursor: 'zoom-in',
            boxShadow: `5px 5px 0 ${C.wBorder}`,
            marginBottom: '0',
            transition: 'border-color .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
          onMouseLeave={e => e.currentTarget.style.borderColor = C.wBorder}
        >
          <div style={{
            background: `linear-gradient(to bottom, ${C.wTitleA}, ${C.wTitleB})`,
            padding: '9px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#FF5F57', '#FFBD2E', '#28C840'].map((c, i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <span style={{ fontFamily: '"Courier New", monospace', fontSize: '12px', color: '#606060', marginLeft: '6px' }}>
              mint-site.socs.uoguelph.ca
            </span>
            <span style={{ marginLeft: 'auto', fontFamily: '"Courier New", monospace', fontSize: '11px', color: '#404040' }}>
              click to enlarge
            </span>
          </div>
          <img
            src={MintApp}
            alt="Mint app — NYC Service Requests dashboard"
            style={{ width: '100%', display: 'block' }}
          />
        </div>

        {/* My role */}
        <Win title="my_contributions.txt">
          <p style={{ margin: '0 0 22px', color: '#707070', fontFamily: '"Courier New", monospace', fontSize: '12px' }}>
            role: <span style={{ color: C.accent }}>Backend Developer</span>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {myContributions.map((c, i) => (
              <div key={i} style={{ paddingLeft: '16px', borderLeft: `3px solid ${C.accent}` }}>
                <div style={{ fontWeight: '900', fontSize: '15px', color: C.ink, marginBottom: '6px' }}>{c.title}</div>
                <p style={{ margin: 0, color: '#909090', fontSize: '13px', lineHeight: '1.7' }}>{c.body}</p>
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
                color: '#A0A0A0', fontSize: '13px', lineHeight: '1.6',
              }}>
                <span style={{ color: C.accent, fontFamily: '"Courier New", monospace', flexShrink: 0 }}>→</span>
                {f}
              </li>
            ))}
          </ul>
        </Win>

        {/* Evidence — tests + code */}
        <Win title="evidence/">
          <Section title="JUnit 5 Backend Test Results">
            <p style={{ margin: '0 0 14px', color: '#707070', fontSize: '13px', lineHeight: '1.65' }}>
              Full test suite for <code style={{ color: C.accent, fontSize: '12px' }}>RequestsServiceImpl</code> — 7 passing tests
              covering edge cases, CRUD paths, and empty-input guards. Built with Gradle + JUnit 5.
            </p>
            <img
              src={MintTests}
              alt="JUnit test results — BUILD SUCCESSFUL"
              onClick={() => setActiveImg(MintTests)}
              style={{
                width: '100%', borderRadius: '6px',
                border: `1px solid ${C.wBorder}`,
                cursor: 'zoom-in',
                display: 'block',
              }}
              onMouseEnter={e => e.target.style.borderColor = C.accent}
              onMouseLeave={e => e.target.style.borderColor = C.wBorder}
            />
            <div style={{
              marginTop: '12px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
            }}>
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
                  fontSize: '10px',
                  fontFamily: '"Courier New", monospace',
                  background: '#0A1A0A',
                  border: '1px solid #28C84033',
                  color: '#28C840',
                  borderRadius: '3px',
                  padding: '2px 7px',
                }}>{name}()</span>
              ))}
            </div>
          </Section>

          <Section title="Backend Code — complaintCount()">
            <p style={{ margin: '0 0 14px', color: '#707070', fontSize: '13px', lineHeight: '1.65' }}>
              The core aggregation method in <code style={{ color: C.accent, fontSize: '12px' }}>RequestsServiceImpl.java</code>.
              Queries the JPA layer, buckets low-volume categories (&lt;5,000) into "Other", and returns a
              <code style={{ color: C.accent, fontSize: '12px' }}> HashMap&lt;String, Long&gt;</code> for the frontend chart.
            </p>
            <img
              src={MintCode}
              alt="complaintCount() method source code"
              onClick={() => setActiveImg(MintCode)}
              style={{
                width: '100%', borderRadius: '6px',
                border: `1px solid ${C.wBorder}`,
                cursor: 'zoom-in',
                display: 'block',
              }}
              onMouseEnter={e => e.target.style.borderColor = C.accent}
              onMouseLeave={e => e.target.style.borderColor = C.wBorder}
            />
          </Section>
        </Win>

        {/* Restricted notice */}
        <div style={{
          border: `1px solid #FF5F5722`,
          background: '#1A0A0A',
          borderRadius: '6px',
          padding: '16px 20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          marginTop: '-10px',
        }}>
          <span style={{ color: '#FF5F57', fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>⚠</span>
          <div>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '12px',
              color: '#FF5F57',
              marginBottom: '4px',
              fontWeight: '700',
            }}>Repository Restricted</div>
            <p style={{ margin: 0, color: '#707070', fontSize: '13px', lineHeight: '1.65' }}>
              This project was developed for <strong style={{ color: '#909090' }}>CIS*3760 (Software Engineering)</strong> at
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
            cursor: 'zoom-out',
            padding: '24px',
          }}
        >
          <img
            src={activeImg}
            alt="enlarged"
            style={{
              maxWidth: '90vw', maxHeight: '90vh',
              borderRadius: '6px',
              border: `2px solid ${C.wBorder}`,
              boxShadow: '0 0 60px rgba(0,0,0,0.8)',
            }}
          />
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; }
        html, body { overflow-x: hidden; max-width: 100%; }
      `}</style>
    </div>
  );
}

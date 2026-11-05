import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROMPTS, RESOURCES } from './btgPrompts';

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

function Win({ id, title, action, children }) {
  return (
    <div id={id} style={{
      margin: '32px 0',
      border: `2px solid ${C.line}`,
      background: C.bgAlt,
      boxShadow: `6px 6px 0 ${C.panel}`,
      overflow: 'hidden',
      scrollMarginTop: '80px',
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
        <div style={{ minWidth: 40, display: 'flex', justifyContent: 'flex-end' }}>{action}</div>
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

export default function BtgPage() {
  const navigate = useNavigate();

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
        display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
      }}>
        <SmallBtn onClick={() => navigate('/')}>← back</SmallBtn>
        <span style={{ fontFamily: MONO, fontSize: '12px', color: C.dim }}>
          ~/workshops/<span style={{ color: C.white }}>btg</span>
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <SmallBtn onClick={() => document.getElementById('files')?.scrollIntoView({ behavior: 'smooth' })}>
            files
          </SmallBtn>
          {PROMPTS.map((p, i) => (
            <SmallBtn key={p.id}
              onClick={() => document.getElementById(p.id)?.scrollIntoView({ behavior: 'smooth' })}
            >P{i + 1}</SmallBtn>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: '880px', margin: '0 auto', padding: '20px 22px 90px' }}>

        {/* Hero */}
        <Win title="workshop.md">
          <div style={{ marginBottom: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Tag solid>Business Technology Guelph</Tag>
            <Tag>Google AI Studio</Tag>
            <Tag>Test run</Tag>
          </div>

          <h1 style={{
            margin: '18px 0 6px', fontFamily: DISPLAY,
            fontSize: 'clamp(34px, 6vw, 60px)', color: C.white, fontWeight: 700,
            textShadow: `3px 3px 0 ${C.panel2}`,
          }}>Build GryphCafe</h1>
          <p style={{ margin: '0 0 20px', fontFamily: MONO, fontSize: '13px', color: C.sub }}>
            A café management app, built in three prompts with <span style={{ color: C.white }}>Google AI Studio</span>
          </p>

          <p style={{ margin: '0 0 14px', color: C.sub, lineHeight: 1.8, fontSize: '14px' }}>
            Paste each prompt into AI Studio in order. Wait for each one to finish building
            before you paste the next, since every prompt adds a page on top of the last one.
          </p>

          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {PROMPTS.map((p, i) => (
              <li key={p.id} style={{ display: 'flex', gap: '10px', color: C.sub, fontSize: '13px', lineHeight: 1.6 }}>
                <span style={{ color: C.white, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')} ▸</span>
                <span><span style={{ color: C.white }}>{p.title}</span> — {p.blurb}</span>
              </li>
            ))}
          </ol>
        </Win>

        {/* Files */}
        <Win id="files" title="files/">
          <p style={{ margin: '0 0 20px', color: C.sub, lineHeight: 1.8, fontSize: '14px' }}>
            Grab these before you start. You'll need them during the prompts.
          </p>
          <div style={{
            display: 'grid', gap: '16px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          }}>
            {RESOURCES.map(r => <ResourceCard key={r.name} r={r} />)}
          </div>
        </Win>

        {PROMPTS.map((p, i) => (
          <Win key={p.id} id={p.id} title={p.file} action={<CopyBtn text={p.text} />}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
              <span style={{ fontFamily: MONO, fontSize: '12px', color: C.dim, letterSpacing: '0.14em' }}>
                PROMPT {i + 1} / {PROMPTS.length}
              </span>
            </div>
            <h2 style={{
              margin: '0 0 8px', fontFamily: DISPLAY, fontSize: 'clamp(26px, 4vw, 36px)',
              color: C.white, fontWeight: 700,
            }}>{p.title}</h2>
            <p style={{ margin: '0 0 18px', color: C.sub, fontSize: '13px', lineHeight: 1.7 }}>{p.blurb}</p>

            <pre style={{
              margin: 0, padding: '18px',
              background: C.bg, border: `2px solid ${C.line}`,
              color: C.ink, fontFamily: MONO, fontSize: '12.5px', lineHeight: 1.7,
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              maxHeight: '520px', overflowY: 'auto',
            }}>{p.text}</pre>

            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
              <CopyBtn text={p.text} big />
            </div>
          </Win>
        ))}
      </main>

      <style>{`
        * { box-sizing: border-box; }
        html, body { overflow-x: hidden; max-width: 100%; margin: 0; background: ${C.bg}; }
        ::selection { background: ${C.white}; color: ${C.bg}; }
      `}</style>
    </div>
  );
}

function SmallBtn({ onClick, children }) {
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
    >{children}</button>
  );
}

function ResourceCard({ r }) {
  return (
    <div style={{
      border: `2px solid ${C.line}`, background: C.panel,
      boxShadow: `4px 4px 0 ${C.panel2}`,
      display: 'flex', flexDirection: 'column',
    }}>
      {r.img && (
        <a href={r.img} target="_blank" rel="noreferrer" style={{
          display: 'block', background: C.white, borderBottom: `2px solid ${C.line}`,
          height: '150px', overflow: 'hidden',
        }}>
          <img src={r.img} alt={r.name} style={{
            width: '100%', height: '100%', objectFit: 'contain', display: 'block',
          }} />
        </a>
      )}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'baseline' }}>
          <span style={{ fontFamily: DISPLAY, fontSize: '19px', color: C.white }}>{r.name}</span>
          <span style={{ fontSize: '10px', color: C.dim, whiteSpace: 'nowrap' }}>{r.usedIn}</span>
        </div>
        <p style={{ margin: 0, color: C.sub, fontSize: '12px', lineHeight: 1.65, flex: 1 }}>{r.note}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {r.links.map(l => l.copy
            ? <CopyBtn key={l.label} text={l.copy} label={l.label} />
            : <LinkBtn key={l.label} {...l} />)}
        </div>
      </div>
    </div>
  );
}

function LinkBtn({ label, href, download }) {
  const [h, setH] = useState(false);
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      download={download}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: h ? C.white : 'transparent',
        border: `2px solid ${h ? C.white : C.border}`,
        color: h ? C.bg : C.sub,
        fontFamily: MONO, fontSize: '11px', fontWeight: 700,
        padding: '3px 10px', textDecoration: 'none',
        boxShadow: `2px 2px 0 ${C.line}`,
        transition: 'color .15s, border-color .15s, background .15s',
        whiteSpace: 'nowrap',
      }}
    >{label}</a>
  );
}

function CopyBtn({ text, big, label = 'copy' }) {
  const [h, setH] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for browsers that block the clipboard API
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const on = h || copied;
  return (
    <button
      onClick={copy}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: on ? C.white : 'transparent',
        border: `2px solid ${on ? C.white : C.border}`,
        color: on ? C.bg : C.sub,
        fontFamily: MONO, fontSize: big ? '13px' : '11px', fontWeight: 700,
        padding: big ? '8px 18px' : '3px 10px', cursor: 'pointer',
        boxShadow: `2px 2px 0 ${C.line}`,
        transition: 'color .15s, border-color .15s, background .15s',
        whiteSpace: 'nowrap',
      }}
    >{copied ? '✓ copied' : big ? 'copy prompt' : label}</button>
  );
}

import React, { useEffect, useRef, useState } from 'react';

// palette (matches App.jsx black/grey/white theme)
const P = {
  bg: '#0B0B0B', panel: '#161616', panel2: '#1E1E1E', line: '#2A2A2A',
  border: '#3A3A3A', borderHi: '#555555', ink: '#F4F4F4', white: '#FFFFFF',
  sub: '#A0A0A0', dim: '#6E6E6E', faint: '#3C3C3C',
};

const DISPLAY = "'Pixelify Sans', system-ui, sans-serif";
const MONO = "'Space Mono', 'Courier New', monospace";

const GRAV = 0.8;
const MOVE = 3.6;
const JUMP = -14;
const H = 300; // logical canvas height (css px)

export default function PixelGame() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [coins, setCoins] = useState(0);
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState(false);
  const [won, setWon] = useState(false);

  const keys = useRef({ left: false, right: false, jump: false });
  const activeRef = useRef(false);
  const wonRef = useRef(false);
  const api = useRef(null);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas.getContext('2d');

    let W = wrap.clientWidth;
    let raf;
    let t = 0; // frame counter (for bobbing)

    const start = { x: 40, y: H - 46 - 26 };
    const player = { x: start.x, y: start.y, w: 22, h: 26, vx: 0, vy: 0, onGround: false, face: 1, squash: 0 };

    let ledges = [];      // one-way platforms
    let pickups = [];     // collectible stars
    let particles = [];
    let goal = null;      // { x, y, w, h }
    const groundY = () => H - 46;

    function buildLevel() {
      const gy = groundY();
      ledges = [];
      pickups = [];

      // course spans from startX to just before the goal on the right
      const startX = 80;
      const endX = W - Math.max(150, W * 0.16);
      const N = 7; // number of parkour ledges
      const stepX = (endX - startX) / N;
      const lw = Math.max(48, Math.min(stepX * 0.62, 120)); // ledge width < step → no overlap

      // ascending zig-zag heights (px above ground) — capped so ledges +
      // hovering stars stay inside the canvas (max ~170)
      const ups = [];
      for (let i = 1; i <= N; i++) {
        let up = 66 + (i / N) * 104;       // rise 66 → 170
        if (i % 2 === 0) up -= 26;          // dips for challenge
        ups.push(up);
      }

      for (let i = 1; i <= N; i++) {
        const x = startX + stepX * (i - 0.5);
        const y = gy - ups[i - 1];
        ledges.push({ x, y, w: lw, h: 18 });
        // collectible star hovering above every other ledge
        if (i % 2 === 1) pickups.push({ x: x + lw / 2, y: y - 28, taken: false });
      }

      // final goal platform (long, top-right) + goal star on top.
      // gpY kept low enough that the star + glow + "GOAL" label clear the top.
      const gpW = Math.max(150, W * 0.14);
      const gpX = Math.min(endX + stepX * 0.4, W - gpW - 12);
      const gpY = gy - 190;
      ledges.push({ x: gpX, y: gpY, w: gpW, h: 18, goalPlat: true });
      goal = { x: gpX + gpW / 2 - 15, y: gpY - 40, w: 30, h: 34, cx: gpX + gpW / 2, cy: gpY - 22 };

      setTotal(pickups.length);
    }

    function resize() {
      W = wrap.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      buildLevel();
      if (player.x > W - 40) player.x = W - 40;
    }

    function reset() {
      player.x = start.x; player.y = start.y; player.vx = 0; player.vy = 0;
      particles = [];
      pickups.forEach(p => (p.taken = false));
      wonRef.current = false; setWon(false); setCoins(0);
    }
    api.current = { reset };

    function overlaps(a, b) {
      return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }

    function burst(x, y) {
      for (let i = 0; i < 22; i++) {
        particles.push({
          x, y, vx: (Math.random() - 0.5) * 7, vy: -Math.random() * 8 - 1,
          life: 46, kind: 'star',
        });
      }
    }

    function step() {
      t++;
      const { left, right, jump } = keys.current;
      player.vx = (right ? MOVE : 0) - (left ? MOVE : 0);
      if (right) player.face = 1; if (left) player.face = -1;
      if (jump && player.onGround) { player.vy = JUMP; player.onGround = false; player.squash = -6; }

      player.x += player.vx;
      player.x = Math.max(2, Math.min(W - player.w - 2, player.x));

      const prevBottom = player.y + player.h;
      player.vy += GRAV;
      if (player.vy > 16) player.vy = 16;
      player.y += player.vy;
      player.onGround = false;
      const newBottom = player.y + player.h;

      // one-way ledges — land only when falling onto the top edge
      for (const l of ledges) {
        if (player.vy >= 0 &&
            player.x + player.w > l.x + 3 && player.x < l.x + l.w - 3 &&
            prevBottom <= l.y + 4 && newBottom >= l.y) {
          player.y = l.y - player.h;
          if (player.vy > 6) player.squash = Math.min(player.vy, 10);
          player.vy = 0; player.onGround = true;
        }
      }
      // solid ground
      if (player.y + player.h >= groundY()) {
        player.y = groundY() - player.h;
        if (player.vy > 6) player.squash = Math.min(player.vy, 10);
        player.vy = 0; player.onGround = true;
      }

      if (player.squash > 0) player.squash -= 0.8;
      if (player.squash < 0) player.squash += 0.8;

      // collect pickups
      for (const pk of pickups) {
        if (pk.taken) continue;
        if (Math.abs((player.x + player.w / 2) - pk.x) < 18 && Math.abs((player.y + player.h / 2) - pk.y) < 20) {
          pk.taken = true;
          setCoins(c => c + 1);
          for (let i = 0; i < 6; i++) particles.push({ x: pk.x, y: pk.y, vx: (Math.random() - 0.5) * 4, vy: -Math.random() * 4 - 1, life: 26, kind: 'star' });
        }
      }

      // reach the goal
      if (goal && !wonRef.current && overlaps(player, goal)) {
        wonRef.current = true; setWon(true);
        burst(goal.cx, goal.cy);
      }

      particles = particles.filter(p => p.life > 0);
      for (const p of particles) { p.x += p.vx || 0; p.y += p.vy; p.vy += 0.32; p.life -= 1; }
    }

    // ── drawing ─────────────────────────────────────────
    function drawGround(gy) {
      const s = 46, cols = Math.ceil(W / s);
      for (let i = 0; i < cols; i++) {
        ctx.fillStyle = i % 2 === 0 ? P.panel2 : P.panel;
        ctx.fillRect(i * s, gy, s, s);
        ctx.strokeStyle = P.bg; ctx.lineWidth = 1; ctx.strokeRect(i * s + 0.5, gy, s, s);
      }
      ctx.fillStyle = P.borderHi; ctx.fillRect(0, gy, W, 3);
    }

    function drawLedge(l) {
      ctx.fillStyle = l.goalPlat ? P.panel : P.panel2;
      ctx.fillRect(l.x, l.y, l.w, l.h);
      ctx.strokeStyle = l.goalPlat ? P.borderHi : P.border;
      ctx.lineWidth = 2; ctx.strokeRect(l.x + 1, l.y + 1, l.w - 2, l.h - 2);
      // brick seams
      ctx.strokeStyle = P.line; ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = l.x + 17; x < l.x + l.w; x += 17) { ctx.moveTo(x, l.y); ctx.lineTo(x, l.y + l.h); }
      ctx.moveTo(l.x, l.y + l.h / 2); ctx.lineTo(l.x + l.w, l.y + l.h / 2);
      ctx.stroke();
      // top highlight
      ctx.fillStyle = l.goalPlat ? P.borderHi : P.line;
      ctx.fillRect(l.x, l.y, l.w, 2);
    }

    function starPath(cx, cy, spikes, outer, inner) {
      ctx.beginPath();
      let rot = -Math.PI / 2;
      const step = Math.PI / spikes;
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer); rot += step;
        ctx.lineTo(cx + Math.cos(rot) * inner, cy + Math.sin(rot) * inner); rot += step;
      }
      ctx.closePath();
    }

    function drawGoal() {
      if (!goal) return;
      const bob = Math.sin(t * 0.08) * 4;
      const cx = goal.cx, cy = goal.cy + bob;
      // glow
      ctx.globalAlpha = 0.18 + Math.abs(Math.sin(t * 0.08)) * 0.12;
      ctx.fillStyle = P.white;
      starPath(cx, cy, 5, 26, 11); ctx.fill();
      ctx.globalAlpha = 1;
      // star
      ctx.fillStyle = P.white;
      starPath(cx, cy, 5, 16, 7); ctx.fill();
      ctx.strokeStyle = P.bg; ctx.lineWidth = 1.5;
      starPath(cx, cy, 5, 16, 7); ctx.stroke();
      // "GOAL" label
      ctx.fillStyle = P.sub; ctx.font = `700 10px ${MONO}`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('GOAL', cx, cy - 30);
    }

    function drawPickups() {
      for (const pk of pickups) {
        if (pk.taken) continue;
        const bob = Math.sin(t * 0.1 + pk.x) * 3;
        ctx.fillStyle = P.sub;
        starPath(pk.x, pk.y + bob, 5, 8, 3.4); ctx.fill();
        ctx.strokeStyle = P.bg; ctx.lineWidth = 1;
        starPath(pk.x, pk.y + bob, 5, 8, 3.4); ctx.stroke();
      }
    }

    function drawPlayer() {
      const sq = player.squash * 0.6;
      const w = player.w + sq, h = player.h - sq;
      const x = player.x - sq / 2, y = player.y + (player.h - h);
      ctx.fillStyle = P.white; ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = P.bg; ctx.lineWidth = 2; ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
      ctx.fillStyle = P.dim;
      ctx.fillRect(x + 2, y + h - 4, 6, 4);
      ctx.fillRect(x + w - 8, y + h - 4, 6, 4);
      ctx.fillStyle = P.bg;
      const ex = player.face > 0 ? x + w - 12 : x + 4;
      ctx.fillRect(ex, y + 6, 4, 6);
      ctx.fillRect(ex + 6, y + 6, 4, 6);
      ctx.fillStyle = P.borderHi; ctx.fillRect(x + w / 2 - 1, y - 6, 2, 6);
      ctx.fillStyle = P.white; ctx.fillRect(x + w / 2 - 2, y - 9, 4, 4);
    }

    function drawParticles() {
      for (const p of particles) {
        ctx.globalAlpha = Math.max(0, p.life / 46);
        ctx.fillStyle = P.white;
        starPath(p.x, p.y, 5, 6, 2.6); ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function render() {
      ctx.clearRect(0, 0, W, H);
      drawGround(groundY());
      for (const l of ledges) drawLedge(l);
      drawPickups();
      drawGoal();
      drawParticles();
      drawPlayer();
    }

    function loop() { step(); render(); raf = requestAnimationFrame(loop); }

    resize();
    window.addEventListener('resize', resize);
    loop();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  // keyboard — only captures game keys while hovering/active (won't hijack scroll otherwise)
  useEffect(() => {
    const isGameKey = (k) => ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'a', 'd', 'w', 'A', 'D', 'W', ' '].includes(k);
    const down = (e) => {
      if (!activeRef.current || !isGameKey(e.key)) return;
      e.preventDefault();
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.current.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.current.right = true;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') keys.current.jump = true;
    };
    const up = (e) => {
      if (!isGameKey(e.key)) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.current.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') keys.current.jump = false;
    };
    window.addEventListener('keydown', down, { passive: false });
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, []);

  const hold = (k, v) => (e) => { e.preventDefault(); keys.current[k] = v; };

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => { setActive(false); keys.current.left = keys.current.right = keys.current.jump = false; }}
      style={{ position: 'relative', width: '100%', zIndex: 2, userSelect: 'none', touchAction: 'none' }}
    >
      {/* HUD */}
      <div style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 3,
        display: 'flex', gap: '16px', alignItems: 'center',
        fontFamily: MONO, fontSize: '11px', color: active ? P.sub : P.dim,
        letterSpacing: '0.1em', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        <span style={{ color: P.white, fontFamily: DISPLAY, fontSize: '16px' }}>★ {coins}/{total}</span>
        <span>{active ? '← → MOVE · SPACE JUMP · REACH THE ★' : 'HOVER TO PLAY'}</span>
      </div>

      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: H }} />

      {/* win overlay */}
      {won && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 4,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '14px', background: 'rgba(11,11,11,0.72)', backdropFilter: 'blur(2px)',
        }}>
          <div style={{ fontFamily: DISPLAY, fontSize: '40px', color: P.white, textShadow: `3px 3px 0 ${P.panel2}` }}>
            ★ LEVEL CLEAR ★
          </div>
          <div style={{ fontFamily: MONO, fontSize: '12px', color: P.sub, letterSpacing: '0.1em' }}>
            STARS COLLECTED: {coins}/{total}
          </div>
          <button
            onClick={() => api.current?.reset()}
            style={{
              fontFamily: DISPLAY, fontSize: '18px', color: P.bg, background: P.white,
              border: `2px solid ${P.white}`, padding: '10px 22px', cursor: 'pointer',
              boxShadow: `4px 4px 0 ${P.line}`,
            }}
          >▶ PLAY AGAIN</button>
        </div>
      )}

      {/* touch controls */}
      <div className="game-touch" style={{
        display: 'none', position: 'absolute', bottom: 12, left: 0, right: 0, zIndex: 3,
        justifyContent: 'space-between', padding: '0 14px', pointerEvents: 'none',
      }}>
        <div style={{ display: 'flex', gap: '10px', pointerEvents: 'auto' }}>
          <TouchBtn onDown={hold('left', true)} onUp={hold('left', false)}>◀</TouchBtn>
          <TouchBtn onDown={hold('right', true)} onUp={hold('right', false)}>▶</TouchBtn>
        </div>
        <div style={{ pointerEvents: 'auto' }}>
          <TouchBtn onDown={hold('jump', true)} onUp={hold('jump', false)}>⤒</TouchBtn>
        </div>
      </div>

      <style>{`
        @media (hover: none), (max-width: 720px) {
          .game-touch { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

function TouchBtn({ children, onDown, onUp }) {
  return (
    <button
      onTouchStart={onDown} onTouchEnd={onUp}
      onMouseDown={onDown} onMouseUp={onUp} onMouseLeave={onUp}
      style={{
        width: 54, height: 54, fontFamily: DISPLAY, fontSize: '22px',
        color: P.white, background: 'rgba(22,22,22,0.85)',
        border: `2px solid ${P.border}`, boxShadow: `3px 3px 0 ${P.line}`,
        cursor: 'pointer',
      }}
    >{children}</button>
  );
}

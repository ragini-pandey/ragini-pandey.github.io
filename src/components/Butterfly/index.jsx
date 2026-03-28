import { useEffect, useRef } from "react";

export default function Butterfly() {
  const butterflyRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const velRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: -100, y: -100 });
  const frameRef = useRef(null);
  const idleRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const pos = posRef.current;
      const vel = velRef.current;
      const target = targetRef.current;

      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 60) {
        idleRef.current = 0;
        const accel = Math.min(dist * 0.0008, 0.4);
        vel.x += dx * accel;
        vel.y += dy * accel;
      } else {
        idleRef.current += 1;
        vel.x *= 0.92;
        vel.y *= 0.92;
        if (idleRef.current > 30) {
          const t = Date.now() * 0.002;
          vel.x += Math.sin(t) * 0.15;
          vel.y += Math.cos(t * 0.7) * 0.15;
        }
      }

      vel.x *= 0.94;
      vel.y *= 0.94;

      const maxSpeed = 12;
      const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
      if (speed > maxSpeed) {
        vel.x = (vel.x / speed) * maxSpeed;
        vel.y = (vel.y / speed) * maxSpeed;
      }

      pos.x += vel.x;
      pos.y += vel.y;

      const el = butterflyRef.current;
      if (el) {
        el.style.left = `${pos.x - 12}px`;
        el.style.top = `${pos.y - 12}px`;

        const angle = Math.max(-25, Math.min(25, vel.x * 2));
        el.style.transform = `rotate(${angle}deg)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={butterflyRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 99999,
        left: -100,
        top: -100,
        width: 24,
        height: 24,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="wgL" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#fce4ec" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#f48fb1" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#e91e63" stopOpacity="0.6" />
          </radialGradient>
          <radialGradient id="wgR" cx="60%" cy="40%">
            <stop offset="0%" stopColor="#fce4ec" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#f48fb1" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#e91e63" stopOpacity="0.6" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="bfly-l" filter="url(#glow)">
          <path
            d="M50 50 Q20 15 10 30 Q0 45 20 55 Q35 62 45 55 Z"
            fill="url(#wgL)"
            stroke="#e91e63"
            strokeWidth="0.5"
            opacity="0.8"
          />
          <path
            d="M50 50 Q30 55 22 68 Q18 78 32 75 Q42 72 48 58 Z"
            fill="url(#wgL)"
            stroke="#e91e63"
            strokeWidth="0.5"
            opacity="0.7"
          />
        </g>

        <g className="bfly-r" filter="url(#glow)">
          <path
            d="M50 50 Q80 15 90 30 Q100 45 80 55 Q65 62 55 55 Z"
            fill="url(#wgR)"
            stroke="#e91e63"
            strokeWidth="0.5"
            opacity="0.8"
          />
          <path
            d="M50 50 Q70 55 78 68 Q82 78 68 75 Q58 72 52 58 Z"
            fill="url(#wgR)"
            stroke="#e91e63"
            strokeWidth="0.5"
            opacity="0.7"
          />
        </g>

        <ellipse cx="50" cy="52" rx="1.8" ry="10" fill="#880e4f" opacity="0.9" />

        <path d="M50 42 Q46 28 40 22" stroke="#880e4f" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        <path d="M50 42 Q54 28 60 22" stroke="#880e4f" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        <circle cx="40" cy="22" r="1.2" fill="#e91e63" opacity="0.7" />
        <circle cx="60" cy="22" r="1.2" fill="#e91e63" opacity="0.7" />
      </svg>

      <style>{`
        .bfly-l {
          transform-origin: 50px 50px;
          animation: flapL 0.35s ease-in-out infinite alternate;
        }
        .bfly-r {
          transform-origin: 50px 50px;
          animation: flapR 0.35s ease-in-out infinite alternate;
        }
        @keyframes flapL {
          0%   { transform: perspective(200px) rotateY(0deg); }
          100% { transform: perspective(200px) rotateY(55deg); }
        }
        @keyframes flapR {
          0%   { transform: perspective(200px) rotateY(0deg); }
          100% { transform: perspective(200px) rotateY(-55deg); }
        }
      `}</style>
    </div>
  );
}

import type { CSSProperties } from "react";

// These Ingredients will drift up on the screen ! They all Fixed values not random onesso the server and browser render the same thing // 
const ITEMS = [
  { icon: "🍅", left: 4,  size: 38, dur: 30, delay: 0,  sway: 40 },
  { icon: "🧄", left: 14, size: 30, dur: 36, delay: 12, sway: -35 },
  { icon: "🍝", left: 24, size: 44, dur: 32, delay: 22, sway: 30 },
  { icon: "🌿", left: 34, size: 32, dur: 38, delay: 6,  sway: -45 },
  { icon: "🧀", left: 45, size: 36, dur: 28, delay: 17, sway: 35 },
  { icon: "🍋", left: 55, size: 34, dur: 34, delay: 3,  sway: -30 },
  { icon: "🥕", left: 64, size: 40, dur: 31, delay: 26, sway: 45 },
  { icon: "🍳", left: 74, size: 42, dur: 37, delay: 9,  sway: -40 },
  { icon: "🌶️", left: 83, size: 30, dur: 29, delay: 20, sway: 30 },
  { icon: "🥖", left: 92, size: 44, dur: 35, delay: 14, sway: -35 },
  { icon: "🍄", left: 19, size: 28, dur: 40, delay: 30, sway: 25 },
  { icon: "🫒", left: 69, size: 26, dur: 33, delay: 1,  sway: -25 },
];

export default function AnimatedBackground() {
  return (
    <div className="bg-anim" aria-hidden="true">
      <div className="cloth" />
      <span className="glow glow-1" />
      <span className="glow glow-2" />
      {ITEMS.map((it, i) => (
        <span
          key={i}
          className="float-item"
          style={
            {
              left: `${it.left}%`,
              fontSize: `${it.size}px`,
              animationDuration: `${it.dur}s`,
              animationDelay: `-${it.delay}s`, 
              "--sway": `${it.sway}px`,
            } as CSSProperties
          }
        >
          {it.icon}
        </span>
      ))}
    </div>
  );
}
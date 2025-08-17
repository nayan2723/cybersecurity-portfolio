import Lottie from "lottie-react";

// Simple cyberpunk-style animations using basic shapes
const cyberpunkData = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 400,
  h: 400,
  nm: "Cyberpunk Glow",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 1,
      nm: "Glow Circle",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
            { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 45, s: [100] },
            { t: 90, s: [0] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [50, 50, 100] },
            { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 45, s: [150, 150, 100] },
            { t: 90, s: [50, 50, 100] }
          ]
        }
      },
      ao: 0,
      sw: 400,
      sh: 400,
      sc: "#00ff41",
      ip: 0,
      op: 90,
      st: 0,
      bm: 0
    }
  ]
};

interface LottieGlowProps {
  className?: string;
  size?: number;
}

export const LottieGlow = ({ className = "", size = 100 }: LottieGlowProps) => {
  return (
    <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
      <Lottie
        animationData={cyberpunkData}
        loop={true}
        autoplay={true}
      />
    </div>
  );
};

// Simple pulsing dot animation
const pulsingDotData = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: "Pulsing Dot",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 1,
      nm: "Pulse",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [100] },
            { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 30, s: [30] },
            { t: 60, s: [100] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [100, 100, 100] },
            { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 30, s: [120, 120, 100] },
            { t: 60, s: [100, 100, 100] }
          ]
        }
      },
      ao: 0,
      sw: 100,
      sh: 100,
      sc: "#00bfff",
      ip: 0,
      op: 60,
      st: 0,
      bm: 0
    }
  ]
};

export const LottiePulse = ({ className = "", size = 20 }: LottieGlowProps) => {
  return (
    <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
      <Lottie
        animationData={pulsingDotData}
        loop={true}
        autoplay={true}
      />
    </div>
  );
};
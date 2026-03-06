import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Brain,
  ChevronDown,
  Crown,
  Gamepad2,
  Gift,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Shield,
  Swords,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import {
  AnimatePresence,
  type Variants,
  motion,
  useInView,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─── Nav Links ───────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "Prizes", href: "#prizes" },
  { label: "Rules", href: "#rules" },
  { label: "Register", href: "#register" },
  { label: "Contact", href: "#contact" },
];

/* ─── Technical Events ────────────────────────────────────────────────────── */
const TECH_EVENTS = [
  {
    icon: BookOpen,
    title: "Paper Presentation",
    tagline: "Research Showcase",
    description:
      "Present cutting-edge research with your team. 5-minute presentation followed by a Q&A session with expert judges.",
    detail: "Team of 3 | 5 min + 3 min Q&A",
    color: "gold",
  },
  {
    icon: Zap,
    title: "Digitronix",
    tagline: "Circuit Challenge",
    description:
      "Test your electronics mastery. Design, analyze, and troubleshoot circuits under competitive pressure.",
    detail: "Individual / Team",
    color: "cyan",
  },
  {
    icon: Shield,
    title: "Electric Escape Challenge",
    tagline: "Electrical Puzzles",
    description:
      "Solve a series of high-voltage electrical puzzles against the clock. Think fast, wire smart.",
    detail: "Race against time",
    color: "gold",
  },
  {
    icon: Brain,
    title: "Technical Quiz",
    tagline: "Knowledge Battle",
    description:
      "A rapid-fire quiz spanning electrical engineering, electronics, and emerging technologies.",
    detail: "Individual / Team",
    color: "cyan",
  },
];

/* ─── Non-Technical Events ────────────────────────────────────────────────── */
const NON_TECH_EVENTS = [
  {
    icon: Gamepad2,
    title: "Free Fire Tournament",
    tagline: "Battle Royale",
    description:
      "Gear up for an intense mobile battle royale. Survive the island, outlast opponents, claim victory.",
    detail: "Squad format",
    color: "cyan",
  },
  {
    icon: Crown,
    title: "Mobile Chess",
    tagline: "Strategy Duel",
    description:
      "Classic chess reimagined for mobile. Sharpen your mind and outmaneuver opponents on the digital board.",
    detail: "1v1 Tournament",
    color: "gold",
  },
  {
    icon: Trophy,
    title: "IPL Auction",
    tagline: "Dream Team",
    description:
      "Bid smart, build your dream IPL squad. Balance your budget, pick star players, and dominate the auction room.",
    detail: "Team event",
    color: "cyan",
  },
  {
    icon: Swords,
    title: "Connection",
    tagline: "Team Challenge",
    description:
      "A team-bonding challenge that tests communication, coordination, and creative thinking under pressure.",
    detail: "Team format",
    color: "gold",
  },
];

/* ─── Prizes ──────────────────────────────────────────────────────────────── */
const PRIZES = [
  {
    icon: "🏅",
    title: "Participation Certificates",
    description:
      "All participants receive certificates of participation for every event and workshop attended.",
    borderColor: "#FACC15",
  },
  {
    icon: "🥇",
    title: "Certificates of Merit",
    description:
      "Winners receive certificates of merit mentioning their specific achievement.",
    borderColor: "#EC4899",
  },
  {
    icon: "💰",
    title: "Cash Prizes",
    description:
      "Cash prizes awarded to winners in selected competitive events.",
    borderColor: "#F97316",
  },
  {
    icon: "🎁",
    title: "Take-Away Kits",
    description:
      "Every participant walks away with an exclusive take-away kit.",
    borderColor: "#FACC15",
  },
  {
    icon: "✨",
    title: "Exciting Prizes",
    description:
      "Exciting prizes for the most enthusiastic and outstanding participants.",
    borderColor: "#EC4899",
  },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function calc() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/* ─── Animation Variants ──────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.1 },
  }),
};

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-xs font-[900] tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full"
      style={{
        background: "#FACC15",
        color: "#1e003e",
        border: "2px solid #000",
        boxShadow: "2px 2px 0 #000",
      }}
    >
      {children}
    </span>
  );
}

/* ─── Scroll Progress Bar ─────────────────────────────────────────────────── */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className="scroll-progress-bar"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}

/* ─── CartoonCanvas — lightning, speech bubbles, stars, gears, circuits ────── */
interface CartoonStar {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
}

interface SpeechBubble {
  x: number;
  y: number;
  text: string;
  alpha: number;
  life: number;
  maxLife: number;
  scale: number;
}

interface CartoonBolt {
  x: number;
  y: number;
  alpha: number;
  life: number;
  maxLife: number;
  points: { x: number; y: number }[];
  color: string;
}

interface CartoonGear {
  x: number;
  y: number;
  r: number;
  teeth: number;
  angle: number;
  speed: number;
  color: string;
}

interface CircuitLine {
  points: { x: number; y: number }[];
  color: string;
  pulseOffset: number;
  pulseSpeed: number;
  totalLength: number;
}

function CartoonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef<{
    stars: CartoonStar[];
    bubbles: SpeechBubble[];
    bolts: CartoonBolt[];
    gears: CartoonGear[];
    circuits: CircuitLine[];
    t: number;
    nextBubble: number;
    nextBolt: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const starColors = ["#FACC15", "#EC4899", "#F97316", "#a855f7", "#22d3ee"];
    const bubbleTexts = [
      "ZAP!",
      "POW!",
      "BOOM!",
      "WOW!",
      "ZAPP!",
      "BAM!",
      "KAPOW!",
    ];
    const boltColors = ["#FACC15", "#F97316", "#EC4899"];
    const gearColors = [
      "rgba(250,204,21,0.25)",
      "rgba(236,72,153,0.25)",
      "rgba(249,115,22,0.25)",
    ];
    const circuitColors = [
      "rgba(250,204,21,0.3)",
      "rgba(236,72,153,0.3)",
      "rgba(249,115,22,0.3)",
      "rgba(168,85,247,0.3)",
    ];

    function makeBolt(W: number, H: number): CartoonBolt {
      const x = Math.random() * W;
      const y = Math.random() * H * 0.8;
      const len = 40 + Math.random() * 60;
      const pts: { x: number; y: number }[] = [{ x: 0, y: 0 }];
      let cx = 0;
      let cy = 0;
      const steps = 4 + Math.floor(Math.random() * 3);
      for (let i = 1; i <= steps; i++) {
        cx += (Math.random() - 0.3) * 20;
        cy += (len / steps) * (0.7 + Math.random() * 0.6);
        pts.push({ x: cx, y: cy });
      }
      return {
        x,
        y,
        alpha: 0.7 + Math.random() * 0.3,
        life: 0,
        maxLife: 60 + Math.random() * 40,
        points: pts,
        color: boltColors[Math.floor(Math.random() * boltColors.length)],
      };
    }

    function makeBubble(W: number, H: number): SpeechBubble {
      const maxLife = 90 + Math.random() * 60;
      return {
        x: 60 + Math.random() * (W - 120),
        y: 60 + Math.random() * (H - 120),
        text: bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)],
        alpha: 0,
        life: 0,
        maxLife,
        scale: 0,
      };
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initScene();
    };

    function initScene() {
      if (!canvas) return;
      const W = canvas.width;
      const H = canvas.height;

      // Stars
      const stars: CartoonStar[] = Array.from({ length: 18 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: 8 + Math.random() * 14,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.04,
      }));

      // Gears
      const gears: CartoonGear[] = [
        {
          x: W * 0.07,
          y: H * 0.15,
          r: 35,
          teeth: 8,
          angle: 0,
          speed: 0.006,
          color: gearColors[0],
        },
        {
          x: W * 0.93,
          y: H * 0.25,
          r: 28,
          teeth: 7,
          angle: 0,
          speed: -0.008,
          color: gearColors[1],
        },
        {
          x: W * 0.05,
          y: H * 0.75,
          r: 22,
          teeth: 6,
          angle: 0,
          speed: 0.01,
          color: gearColors[2],
        },
        {
          x: W * 0.92,
          y: H * 0.7,
          r: 32,
          teeth: 8,
          angle: 0,
          speed: -0.007,
          color: gearColors[0],
        },
        {
          x: W * 0.5,
          y: H * 0.95,
          r: 20,
          teeth: 6,
          angle: 0,
          speed: 0.009,
          color: gearColors[1],
        },
      ];

      // Circuit lines
      const circuits: CircuitLine[] = [];
      const numCircuits = 12;
      for (let i = 0; i < numCircuits; i++) {
        const startX = Math.random() * W;
        const startY = Math.random() * H;
        const pts: { x: number; y: number }[] = [{ x: startX, y: startY }];
        let cx2 = startX;
        let cy2 = startY;
        const segs = 3 + Math.floor(Math.random() * 3);
        for (let s = 0; s < segs; s++) {
          if (Math.random() > 0.5) {
            cx2 += (Math.random() > 0.5 ? 1 : -1) * (40 + Math.random() * 80);
          } else {
            cy2 += (Math.random() > 0.5 ? 1 : -1) * (40 + Math.random() * 80);
          }
          pts.push({ x: cx2, y: cy2 });
        }
        let totalLength = 0;
        for (let j = 1; j < pts.length; j++) {
          const dx = pts[j].x - pts[j - 1].x;
          const dy = pts[j].y - pts[j - 1].y;
          totalLength += Math.sqrt(dx * dx + dy * dy);
        }
        circuits.push({
          points: pts,
          color:
            circuitColors[Math.floor(Math.random() * circuitColors.length)],
          pulseOffset: Math.random() * totalLength,
          pulseSpeed: 50 + Math.random() * 80,
          totalLength,
        });
      }

      stateRef.current = {
        stars,
        bubbles: [],
        bolts: [],
        gears,
        circuits,
        t: 0,
        nextBubble: 120,
        nextBolt: 40,
      };
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Draw 5-pointed star
    function drawStar(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      color: string,
      angle: number,
    ) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const outerAngle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const innerAngle = outerAngle + (2 * Math.PI) / 10;
        if (i === 0)
          ctx.moveTo(Math.cos(outerAngle) * r, Math.sin(outerAngle) * r);
        else ctx.lineTo(Math.cos(outerAngle) * r, Math.sin(outerAngle) * r);
        ctx.lineTo(
          Math.cos(innerAngle) * (r * 0.4),
          Math.sin(innerAngle) * (r * 0.4),
        );
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // Draw cartoon gear
    function drawGear(ctx: CanvasRenderingContext2D, gear: CartoonGear) {
      const { x, y, r, teeth, angle, color } = gear;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const a1 = (i / teeth) * Math.PI * 2;
        const a2 = ((i + 0.4) / teeth) * Math.PI * 2;
        const a3 = ((i + 0.6) / teeth) * Math.PI * 2;
        const a4 = ((i + 1) / teeth) * Math.PI * 2;
        ctx.lineTo(Math.cos(a1) * r, Math.sin(a1) * r);
        ctx.lineTo(Math.cos(a2) * (r + r * 0.3), Math.sin(a2) * (r + r * 0.3));
        ctx.lineTo(Math.cos(a3) * (r + r * 0.3), Math.sin(a3) * (r + r * 0.3));
        ctx.lineTo(Math.cos(a4) * r, Math.sin(a4) * r);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.strokeStyle = "rgba(0,0,0,0.35)";
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();
      // Center hole
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }

    // Draw cartoon lightning bolt
    function drawBolt(ctx: CanvasRenderingContext2D, bolt: CartoonBolt) {
      const t = bolt.life / bolt.maxLife;
      const alpha = bolt.alpha * (t < 0.2 ? t / 0.2 : 1 - (t - 0.2) / 0.8);
      ctx.save();
      ctx.translate(bolt.x, bolt.y);
      // Outer thick black stroke
      ctx.beginPath();
      ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
      for (const p of bolt.points.slice(1)) ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = `rgba(0,0,0,${alpha * 0.9})`;
      ctx.lineWidth = 8;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.stroke();
      // Inner colored stroke
      ctx.beginPath();
      ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
      for (const p of bolt.points.slice(1)) ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = bolt.color
        .replace(")", `,${alpha})`)
        .replace("rgb", "rgba");
      // Handle hex color
      ctx.strokeStyle = bolt.color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    // Draw speech bubble
    function drawBubble(ctx: CanvasRenderingContext2D, bubble: SpeechBubble) {
      const t = bubble.life / bubble.maxLife;
      const alpha = t < 0.15 ? t / 0.15 : t > 0.75 ? (1 - t) / 0.25 : 1;
      const scale =
        t < 0.15
          ? (t / 0.15) * 1.2
          : t < 0.2
            ? 1.2 - ((t - 0.15) / 0.05) * 0.2
            : 1;

      ctx.save();
      ctx.translate(bubble.x, bubble.y);
      ctx.scale(scale, scale);
      ctx.globalAlpha = alpha * 0.75;

      // Bubble body
      const w = 70;
      const h = 36;
      ctx.beginPath();
      ctx.roundRect(-w / 2, -h / 2, w, h, 12);
      ctx.fillStyle = "#FACC15";
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 3;
      ctx.fill();
      ctx.stroke();

      // Tail
      ctx.beginPath();
      ctx.moveTo(-8, h / 2);
      ctx.lineTo(0, h / 2 + 14);
      ctx.lineTo(10, h / 2);
      ctx.fillStyle = "#FACC15";
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Text
      ctx.globalAlpha = 1;
      ctx.font = "bold 14px 'Bricolage Grotesque', sans-serif";
      ctx.fillStyle = "#1e003e";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(bubble.text, 0, 0);

      ctx.restore();
      ctx.globalAlpha = 1;
    }

    // Point along polyline at distance d
    function pointAtDist(
      points: { x: number; y: number }[],
      dist: number,
    ): { x: number; y: number } | null {
      let remaining = dist;
      for (let i = 1; i < points.length; i++) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;
        const segLen = Math.sqrt(dx * dx + dy * dy);
        if (remaining <= segLen) {
          const t2 = remaining / segLen;
          return {
            x: points[i - 1].x + dx * t2,
            y: points[i - 1].y + dy * t2,
          };
        }
        remaining -= segLen;
      }
      return null;
    }

    let lastTime = 0;
    let _frame = 0;

    const draw = (timestamp: number) => {
      if (!canvas || !stateRef.current) return;
      const dt = Math.min(timestamp - lastTime, 50);
      lastTime = timestamp;
      _frame++;

      const state = stateRef.current;
      state.t += dt * 0.001;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // ── Gears ─────────────────────────────────────────────────────────────
      for (const gear of state.gears) {
        gear.angle += gear.speed;
        drawGear(ctx, gear);
      }

      // ── Circuit lines ──────────────────────────────────────────────────────
      for (const circuit of state.circuits) {
        ctx.beginPath();
        ctx.moveTo(circuit.points[0].x, circuit.points[0].y);
        for (let i = 1; i < circuit.points.length; i++) {
          ctx.lineTo(circuit.points[i].x, circuit.points[i].y);
        }
        ctx.strokeStyle = circuit.color;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.setLineDash([]);
        ctx.stroke();

        // Junction dots
        for (const pt of circuit.points) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = circuit.color;
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 1.5;
          ctx.fill();
          ctx.stroke();
        }

        // Traveling pulse
        circuit.pulseOffset =
          (circuit.pulseOffset + circuit.pulseSpeed * 0.016) %
          circuit.totalLength;
        const pPos = pointAtDist(circuit.points, circuit.pulseOffset);
        if (pPos) {
          ctx.beginPath();
          ctx.arc(pPos.x, pPos.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#FACC15";
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 2;
          ctx.fill();
          ctx.stroke();
        }
      }

      // ── Stars ─────────────────────────────────────────────────────────────
      for (const star of state.stars) {
        star.x += star.vx;
        star.y += star.vy;
        star.angle += star.spin;
        if (star.x < -20) star.x = W + 20;
        if (star.x > W + 20) star.x = -20;
        if (star.y < -20) star.y = H + 20;
        if (star.y > H + 20) star.y = -20;
        drawStar(ctx, star.x, star.y, star.size, star.color, star.angle);
      }

      // ── Bolts ─────────────────────────────────────────────────────────────
      state.nextBolt -= 1;
      if (state.nextBolt <= 0) {
        state.bolts.push(makeBolt(W, H));
        state.nextBolt = 50 + Math.random() * 80;
      }
      state.bolts = state.bolts.filter((b) => b.life < b.maxLife);
      for (const bolt of state.bolts) {
        drawBolt(ctx, bolt);
        bolt.life += 1;
      }

      // ── Speech Bubbles ────────────────────────────────────────────────────
      state.nextBubble -= 1;
      if (state.nextBubble <= 0) {
        state.bubbles.push(makeBubble(W, H));
        state.nextBubble = 200 + Math.random() * 200;
      }
      state.bubbles = state.bubbles.filter((b) => b.life < b.maxLife);
      for (const bubble of state.bubbles) {
        drawBubble(ctx, bubble);
        bubble.life += 1;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}

/* ─── Glitch Title ────────────────────────────────────────────────────────── */
function GlitchTitle({ children }: { children: React.ReactNode }) {
  const [isGlitching, setIsGlitching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const scheduleGlitch = () => {
      const delay = 4000 + Math.random() * 2000;
      timerRef.current = setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => {
          setIsGlitching(false);
          scheduleGlitch();
        }, 450);
      }, delay);
    };
    scheduleGlitch();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <span
      className={cn("glitch-title", isGlitching && "glitching")}
      data-text="ELZIA"
    >
      {children}
    </span>
  );
}

/* ─── Digit Flip ──────────────────────────────────────────────────────────── */
function FlipDigit({ value, label }: { value: number; label: string }) {
  const paddedVal = pad(value);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 rounded-xl flex items-center justify-center overflow-hidden"
        style={{
          background: "#FACC15",
          border: "3px solid #000",
          boxShadow: "4px 4px 0 #000",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={paddedVal}
            initial={{ y: -30, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="timer-digit font-display text-2xl sm:text-3xl lg:text-4xl font-[900] absolute"
            style={{ color: "#1e003e" }}
            aria-live="polite"
          >
            {paddedVal}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className="text-xs font-[700] mt-2 tracking-widest uppercase"
        style={{ color: "#FACC15" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Section Header with Char Reveal ────────────────────────────────────── */
function RevealHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const text = typeof children === "string" ? children : null;

  if (!text) {
    return (
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.h2>
    );
  }

  const chars = Array.from(text, (char, pos) => ({
    key: `c${pos}`,
    char,
    delay: pos * 0.03,
  }));

  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {chars.map(({ key, char, delay }) => (
        <motion.span
          key={key}
          className="char-reveal-char"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
}

/* ─── Ripple Button ───────────────────────────────────────────────────────── */
function RippleButton({
  children,
  className,
  onClick,
  size,
  variant,
  style,
  "data-ocid": dataOcid,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  size?: "lg" | "sm" | "default";
  variant?: "outline" | "default";
  style?: React.CSSProperties;
  "data-ocid"?: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number; size: number }[]
  >([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = btnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const sz = Math.max(rect.width, rect.height) * 2;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y, size: sz }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
      onClick?.();
    },
    [onClick],
  );

  return (
    <Button
      ref={btnRef}
      size={size}
      variant={variant}
      data-ocid={dataOcid}
      className={cn("btn-ripple cartoon-btn", className)}
      style={style}
      onClick={handleClick}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-wave"
          style={{
            width: r.size,
            height: r.size,
            left: r.x - r.size / 2,
            top: r.y - r.size / 2,
          }}
        />
      ))}
    </Button>
  );
}

/* ─── Energy Event Card ───────────────────────────────────────────────────── */
function EnergyEventCard({
  icon: Icon,
  title,
  tagline,
  description,
  detail,
  color,
  index,
}: {
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  detail: string;
  color: "gold" | "cyan";
  index: number;
}) {
  const isGold = color === "gold";
  const accentColor = isGold ? "#FACC15" : "#EC4899";
  const iconBg = isGold ? "rgba(250,204,21,0.15)" : "rgba(236,72,153,0.15)";

  return (
    <motion.article
      data-ocid={`events.item.${index}`}
      whileHover={{ y: -6, scale: 1.05, rotate: 0.8 }}
      transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
      className={cn(
        "energy-card cartoon-card relative group p-6 lg:p-8 rounded-xl bg-card overflow-hidden",
        isGold ? "card-glow-gold" : "card-glow-cyan",
      )}
      style={{
        borderColor: accentColor,
        borderWidth: "3px",
        borderStyle: "solid",
        boxShadow: "4px 4px 0 #000",
      }}
    >
      <div className="relative z-10">
        {/* Ambient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
          style={{
            background: isGold
              ? "radial-gradient(ellipse at 30% 0%, rgba(250,204,21,0.1) 0%, transparent 60%)"
              : "radial-gradient(ellipse at 30% 0%, rgba(236,72,153,0.1) 0%, transparent 60%)",
          }}
        />

        {/* Icon */}
        <div
          className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl"
          style={{
            background: iconBg,
            border: `2px solid ${accentColor}`,
            boxShadow: "2px 2px 0 #000",
          }}
        >
          <Icon className="h-5 w-5" style={{ color: accentColor }} />
        </div>

        {/* Tagline */}
        <p
          className="text-xs font-[700] tracking-[0.18em] uppercase mb-1"
          style={{ color: accentColor }}
        >
          {tagline}
        </p>

        {/* Title */}
        <h3
          className="font-display text-xl font-[800] tracking-tight mb-3 text-foreground"
          style={{
            textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
          }}
        >
          {title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Detail badge */}
        <span
          className="inline-block text-xs font-[700] px-3 py-1 rounded-full"
          style={{
            background: accentColor,
            color: "#1e003e",
            border: "2px solid #000",
            boxShadow: "1px 1px 0 #000",
          }}
        >
          {detail}
        </span>
      </div>
    </motion.article>
  );
}

/* ─── Navbar ──────────────────────────────────────────────────────────────── */
function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b-2 border-primary/50"
          : "bg-transparent",
      )}
      style={{
        height: "var(--nav-height)",
        paddingTop: "3px",
      }}
    >
      <nav className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 lg:px-8">
        {/* Brand */}
        <button
          type="button"
          data-ocid="nav.link"
          className="flex items-center gap-3 group"
          onClick={() => scrollTo("#home")}
        >
          <img
            src="/assets/generated/elzia-cartoon-logo-transparent.dim_400x400.png"
            alt="ELZIA 2K26 Logo"
            className="h-10 w-10 rounded-full object-cover"
            style={{
              border: "2px solid #FACC15",
              boxShadow: "2px 2px 0 #000",
            }}
          />
          <span
            className="font-display text-xl font-[900] tracking-tight"
            style={{
              color: "#FACC15",
              textShadow: "2px 2px 0 #000",
            }}
          >
            ELZIA 2K26
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-ocid="nav.link"
                className="text-sm font-[700] text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          type="button"
          data-ocid="nav.primary_button"
          className="hidden lg:flex items-center gap-2 px-5 py-2 text-sm font-[900] tracking-wide cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #FACC15, #F97316)",
            border: "3px solid #000",
            boxShadow: "3px 3px 0 #000",
            borderRadius: "50px",
            color: "#1e003e",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
          }}
          onClick={() => scrollTo("#register")}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform =
              "translate(-2px, -2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "5px 5px 0 #000";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform =
              "translate(0, 0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0 #000";
          }}
        >
          Register ₹150
        </button>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden p-2 -mr-2 text-foreground"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          data-ocid="nav.toggle"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-background/98 backdrop-blur-md border-b-2 border-primary/50"
          >
            <ul className="px-6 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid="nav.link"
                    className="block text-base font-[700] text-muted-foreground hover:text-primary transition-colors py-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      scrollTo(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  data-ocid="nav.primary_button"
                  className="w-full py-3 font-[900] text-sm cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #FACC15, #F97316)",
                    border: "3px solid #000",
                    boxShadow: "3px 3px 0 #000",
                    borderRadius: "50px",
                    color: "#1e003e",
                  }}
                  onClick={() => {
                    setOpen(false);
                    scrollTo("#register");
                  }}
                >
                  Register — ₹150
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Hero Section ────────────────────────────────────────────────────────── */
function HeroSection() {
  const TARGET_DATE = new Date("2026-03-16T09:00:00");
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-background"
          style={{ zIndex: -1 }}
        />
        <div className="absolute inset-0 scanlines opacity-20" />
        <div className="absolute inset-0 comic-halftone" />
        {/* Radial glow from center — warm yellow/pink */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(250,204,21,0.06) 0%, rgba(236,72,153,0.04) 40%, transparent 70%)",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Corner accents — comic style */}
      <div
        className="absolute top-24 left-8 w-16 h-16 pointer-events-none"
        style={{
          borderLeft: "3px solid rgba(250,204,21,0.5)",
          borderTop: "3px solid rgba(250,204,21,0.5)",
        }}
      />
      <div
        className="absolute top-24 right-8 w-16 h-16 pointer-events-none"
        style={{
          borderRight: "3px solid rgba(250,204,21,0.5)",
          borderTop: "3px solid rgba(250,204,21,0.5)",
        }}
      />
      <div
        className="absolute bottom-16 left-8 w-12 h-12 pointer-events-none"
        style={{
          borderLeft: "2px solid rgba(236,72,153,0.4)",
          borderBottom: "2px solid rgba(236,72,153,0.4)",
        }}
      />
      <div
        className="absolute bottom-16 right-8 w-12 h-12 pointer-events-none"
        style={{
          borderRight: "2px solid rgba(236,72,153,0.4)",
          borderBottom: "2px solid rgba(236,72,153,0.4)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Logo — cartoon bouncy float */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-4 flex justify-center"
          style={{ overflow: "visible" }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{ width: "300px", height: "300px" }}
          >
            {/* Pulsing yellow aura */}
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.65, 0.35] }}
              transition={{
                duration: 2.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(250,204,21,0.4) 0%, rgba(249,115,22,0.2) 50%, transparent 75%)",
                filter: "blur(18px)",
              }}
            />

            {/* Pink secondary aura */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
              transition={{
                duration: 1.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: "20px",
                background:
                  "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
                filter: "blur(10px)",
              }}
            />

            {/* The actual cartoon logo — bouncy float */}
            <motion.div
              animate={{ y: [0, -16, 0], rotate: [-2, 2, -2] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative cartoon-glow"
              style={{
                width: "280px",
                height: "280px",
                zIndex: 10,
              }}
            >
              <img
                src="/assets/generated/elzia-cartoon-logo-transparent.dim_400x400.png"
                alt="ELZIA 2K26 Logo"
                className="w-full h-full object-contain"
                style={{
                  borderRadius: "50%",
                  border: "6px solid #FACC15",
                  boxShadow:
                    "4px 4px 0 #000, 0 0 30px 10px rgba(250,204,21,0.3)",
                  background: "rgba(30,0,62,0.6)",
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-3"
        >
          <Badge
            variant="outline"
            className="text-xs tracking-[0.2em] uppercase px-4 py-1 font-[700]"
            style={{
              border: "2px solid #FACC15",
              color: "#FACC15",
              boxShadow: "2px 2px 0 #000",
              background: "rgba(250,204,21,0.1)",
            }}
          >
            National Level Technical Symposium
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-display font-[900] leading-none tracking-tight mb-2"
          style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
        >
          <GlitchTitle>
            <span
              className="gold-shimmer"
              style={{
                color: "#FACC15",
                textShadow:
                  "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 4px 4px 0 rgba(0,0,0,0.5)",
              }}
            >
              ELZIA-2K26
            </span>
          </GlitchTitle>
        </motion.h1>

        {/* EEE SYMPOSIUM subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.5}
          className="font-display font-[700] tracking-[0.35em] uppercase mb-3"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
            color: "#EC4899",
            letterSpacing: "0.35em",
            textShadow: "1px 1px 0 #000",
          }}
        >
          EEE SYMPOSIUM
        </motion.p>

        {/* Dept */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-muted-foreground text-xs sm:text-sm tracking-widest uppercase mb-2"
        >
          Department of Electrical &amp; Electronics Engineering
        </motion.p>

        {/* HOD */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2.5}
          className="text-muted-foreground/70 text-xs tracking-wide mb-2"
        >
          HOD/EEE — Dr. NP Ananthamoorthy
        </motion.p>

        {/* Date / Time */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-wrap items-center justify-center gap-4 mb-10 text-sm font-[700]"
        >
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{
              background: "rgba(250,204,21,0.15)",
              border: "2px solid #FACC15",
              color: "#FACC15",
              boxShadow: "2px 2px 0 #000",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
            March 16, 2026
          </span>
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{
              background: "rgba(236,72,153,0.15)",
              border: "2px solid #EC4899",
              color: "#EC4899",
              boxShadow: "2px 2px 0 #000",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 inline-block" />
            9:00 AM – 3:00 PM
          </span>
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{
              background: "rgba(249,115,22,0.15)",
              border: "2px solid #F97316",
              color: "#F97316",
              boxShadow: "2px 2px 0 #000",
            }}
          >
            🍽️ Food Provided
          </span>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mb-10"
        >
          <p
            className="text-xs tracking-[0.2em] uppercase font-[700] mb-4"
            style={{ color: "#EC4899" }}
          >
            Event Starts In
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {[
              { value: days, label: "Days" },
              { value: hours, label: "Hours" },
              { value: minutes, label: "Mins" },
              { value: seconds, label: "Secs" },
            ].map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-2 sm:gap-3">
                <FlipDigit value={value} label={label} />
                {i < 3 && (
                  <span
                    className="text-2xl sm:text-3xl font-[900] mb-4 leading-none select-none"
                    style={{
                      color: "#EC4899",
                      textShadow: "1px 1px 0 #000",
                    }}
                  >
                    •
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <RippleButton
            size="lg"
            data-ocid="hero.primary_button"
            className="font-[900] tracking-wide text-base px-8 py-6 h-auto font-display"
            style={
              {
                background: "linear-gradient(135deg, #FACC15, #F97316)",
                border: "3px solid #000",
                boxShadow: "4px 4px 0 #000",
                color: "#1e003e",
                borderRadius: "50px",
              } as React.CSSProperties
            }
            onClick={() => {
              document
                .querySelector("#register")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Register Now — ₹150
          </RippleButton>
          <RippleButton
            size="lg"
            variant="outline"
            data-ocid="hero.secondary_button"
            className="font-[700] tracking-wide text-base px-8 py-6 h-auto"
            style={
              {
                border: "3px solid #EC4899",
                boxShadow: "4px 4px 0 #000",
                color: "#EC4899",
                borderRadius: "50px",
                background: "rgba(236,72,153,0.1)",
              } as React.CSSProperties
            }
            onClick={() => {
              document
                .querySelector("#events")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Events
          </RippleButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() =>
          document
            .querySelector("#events")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 font-[700]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Events Section ──────────────────────────────────────────────────────── */
function EventsSection() {
  return (
    <section id="events" className="py-24 lg:py-36 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Technical Events */}
        <FadeUp className="text-center mb-16">
          <SectionLabel>Technical Events</SectionLabel>
          <RevealHeading className="font-display text-4xl sm:text-5xl lg:text-6xl font-[800] tracking-tight text-balance">
            <span className="text-gradient-gold">Ignite</span> Your
            <br />
            Technical Edge
          </RevealHeading>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base">
            Four high-stakes technical challenges designed to push the
            boundaries of EEE knowledge.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {TECH_EVENTS.map((event, i) => (
            <FadeUp key={event.title} delay={i * 1.5}>
              <EnergyEventCard
                {...event}
                color={event.color as "gold" | "cyan"}
                index={i + 1}
              />
            </FadeUp>
          ))}
        </div>

        {/* Non-Technical Events */}
        <FadeUp className="text-center mb-16">
          <SectionLabel>Non-Technical Events</SectionLabel>
          <RevealHeading className="font-display text-4xl sm:text-5xl lg:text-6xl font-[800] tracking-tight text-balance">
            Play Hard, <span className="text-gradient-cyan">Win Harder</span>
          </RevealHeading>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base">
            Take a break from circuits and code — compete in gaming, strategy,
            and team challenges.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {NON_TECH_EVENTS.map((event, i) => (
            <FadeUp key={event.title} delay={i * 1.5}>
              <EnergyEventCard
                {...event}
                color={event.color as "gold" | "cyan"}
                index={i + 5}
              />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Prizes Section ──────────────────────────────────────────────────────── */
function PrizesSection() {
  return (
    <section
      id="prizes"
      className="py-24 lg:py-36 px-6 lg:px-8 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(250,204,21,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Rewards</SectionLabel>
          <RevealHeading className="font-display text-4xl sm:text-5xl lg:text-6xl font-[800] tracking-tight text-balance">
            Certificates, Prizes &amp; Take-Away Kits
          </RevealHeading>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Every participant wins. The best ones win even bigger.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRIZES.map((prize, i) => (
            <FadeUp key={prize.title} delay={i * 1.5}>
              <motion.div
                data-ocid={`prizes.item.${i + 1}`}
                whileHover={{ y: -4, scale: 1.03, rotate: 0.5 }}
                transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                className="group p-6 rounded-xl bg-card transition-colors duration-300"
                style={{
                  border: `3px solid ${prize.borderColor}`,
                  boxShadow: "4px 4px 0 #000",
                }}
              >
                <motion.div
                  className="text-3xl mb-4"
                  whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {prize.icon}
                </motion.div>
                <h3
                  className="font-display text-lg font-[800] mb-2 text-foreground"
                  style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.5)" }}
                >
                  {prize.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {prize.description}
                </p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Rules Section ───────────────────────────────────────────────────────── */
function RulesSection() {
  const paperRules = [
    "Team of exactly 3 members (compulsory).",
    "5-minute presentation + 3-minute Q&A session.",
    "Abstract must be mailed to elzia2k26@gmail.com or sent via WhatsApp to 8807502350.",
    "Use minimal text with clear visuals and properly labeled graphs.",
    "All team members must actively participate in the presentation.",
    "Judges' decision is final.",
  ];

  const generalRules = [
    "Registration fee: ₹150 per head.",
    "Maximum 2 events per student.",
    "Participants must carry a valid college ID card.",
    "Unethical behavior leads to immediate disqualification.",
    "The organizing committee reserves the right to modify rules.",
    "Judges' decision is final in all events.",
  ];

  return (
    <section
      id="rules"
      className="py-24 lg:py-36 px-6 lg:px-8"
      style={{ borderTop: "2px solid oklch(var(--border))" }}
    >
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Guidelines</SectionLabel>
          <RevealHeading className="font-display text-4xl sm:text-5xl font-[800] tracking-tight">
            Rules &amp; Regulations
          </RevealHeading>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Paper Presentation Rules */}
          <FadeUp delay={0}>
            <div
              data-ocid="rules.panel"
              className="p-6 lg:p-8 rounded-xl bg-card"
              style={{
                border: "3px solid #FACC15",
                boxShadow: "4px 4px 0 #000",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(250,204,21,0.15)",
                    border: "2px solid #FACC15",
                    boxShadow: "2px 2px 0 #000",
                  }}
                >
                  <BookOpen className="h-4 w-4" style={{ color: "#FACC15" }} />
                </div>
                <h3 className="font-display text-xl font-[800] text-gradient-gold">
                  Paper Presentation Rules
                </h3>
              </div>
              <ul className="space-y-3">
                {paperRules.map((rule, idx) => (
                  <li
                    key={rule}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span
                      className="mt-0.5 w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-xs font-[900]"
                      style={{
                        background: "#FACC15",
                        color: "#1e003e",
                        border: "2px solid #000",
                        boxShadow: "1px 1px 0 #000",
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* General Rules */}
          <FadeUp delay={1.5}>
            <div
              data-ocid="rules.card"
              className="p-6 lg:p-8 rounded-xl bg-card"
              style={{
                border: "3px solid #EC4899",
                boxShadow: "4px 4px 0 #000",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(236,72,153,0.15)",
                    border: "2px solid #EC4899",
                    boxShadow: "2px 2px 0 #000",
                  }}
                >
                  <Shield className="h-4 w-4" style={{ color: "#EC4899" }} />
                </div>
                <h3 className="font-display text-xl font-[800] text-gradient-cyan">
                  General Rules
                </h3>
              </div>
              <ul className="space-y-3">
                {generalRules.map((rule, idx) => (
                  <li
                    key={rule}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span
                      className="mt-0.5 w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-xs font-[900]"
                      style={{
                        background: "#EC4899",
                        color: "#fff",
                        border: "2px solid #000",
                        boxShadow: "1px 1px 0 #000",
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── Registration Section ────────────────────────────────────────────────── */
function RegisterSection() {
  return (
    <section
      id="register"
      className="py-24 lg:py-36 px-6 lg:px-8 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(236,72,153,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Registration</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-[800] tracking-tight">
            Secure Your <span className="text-gradient-gold">Spot</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Register now for just ₹150 per head. Limited seats available.
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* QR Code */}
          <FadeUp delay={0}>
            <div className="flex flex-col items-center">
              <div
                data-ocid="register.card"
                className="w-full max-w-sm mx-auto p-8 rounded-2xl flex flex-col items-center gap-6"
                style={{
                  border: "3px solid #FACC15",
                  background: "oklch(0.14 0.040 280)",
                  boxShadow: "6px 6px 0 #000",
                }}
              >
                {/* QR Code */}
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/assets/uploads/WhatsApp-Image-2026-03-02-at-9.18.34-AM-2.jpeg"
                    alt="UPI Payment QR Code"
                    className="w-48 h-48 rounded-xl object-contain bg-white p-2"
                    style={{
                      border: "3px solid #000",
                      boxShadow: "3px 3px 0 #000",
                    }}
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    UPI ID: karthikapichandi2003@okhdfcbank
                  </p>
                </div>

                <div className="text-center">
                  <p
                    className="font-display text-2xl font-[900] mb-1"
                    style={{
                      color: "#FACC15",
                      textShadow: "2px 2px 0 #000",
                    }}
                  >
                    ₹150
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Per Head · All Events Eligible
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Details */}
          <FadeUp delay={1.5}>
            <div className="space-y-5">
              {/* Food highlight */}
              <div
                className="p-5 rounded-xl flex items-start gap-4"
                style={{
                  background: "rgba(250,204,21,0.1)",
                  border: "2px solid #FACC15",
                  boxShadow: "3px 3px 0 #000",
                }}
              >
                <span className="text-2xl flex-shrink-0">🍽️</span>
                <div>
                  <p
                    className="font-display font-[800] text-base mb-1"
                    style={{ color: "#FACC15" }}
                  >
                    Food Provided
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Lunch and refreshments will be provided to all registered
                    participants throughout the event.
                  </p>
                </div>
              </div>

              {/* What you get */}
              <div
                className="p-5 rounded-xl"
                style={{
                  background: "oklch(0.14 0.040 280)",
                  border: "2px solid oklch(var(--border))",
                  boxShadow: "3px 3px 0 #000",
                }}
              >
                <h4 className="font-display font-[800] text-foreground mb-3 text-base">
                  What's Included
                </h4>
                <ul className="space-y-2">
                  {[
                    "Access to up to 2 events",
                    "Participation certificate",
                    "Take-away kit",
                    "Lunch & refreshments",
                    "Chance to win cash prizes",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span style={{ color: "#FACC15", fontWeight: 900 }}>
                        ✦
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key notes */}
              <div
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(236,72,153,0.08)",
                  border: "2px solid #EC4899",
                  boxShadow: "3px 3px 0 #000",
                }}
              >
                <h4
                  className="font-display font-[800] mb-3 text-base"
                  style={{ color: "#EC4899" }}
                >
                  Important Notes
                </h4>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>⚡ Maximum 2 events per student</li>
                  <li>⚡ Bring valid college ID card</li>
                  <li>⚡ Time: 9:00 AM – 3:00 PM</li>
                  <li>⚡ March 16, 2026</li>
                </ul>
              </div>

              <button
                type="button"
                data-ocid="register.primary_button"
                className="w-full py-4 font-[900] text-base cursor-pointer flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #FACC15, #F97316)",
                  border: "3px solid #000",
                  boxShadow: "4px 4px 0 #000",
                  color: "#1e003e",
                  borderRadius: "50px",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSeKVC5JVXBknHq2GGhBA4Wosnx_-tjmI64G_fuN4T6HHO9_sQ/viewform?usp=publish-editor",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translate(-2px, -2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "6px 6px 0 #000";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translate(0, 0)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "4px 4px 0 #000";
                }}
              >
                <Gift className="h-5 w-5" />
                Fill Registration Form
              </button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Section ─────────────────────────────────────────────────────── */
function ContactSection() {
  const STUDENT_COORDINATORS = [
    { name: "Kanis Prasana", phone: "9585850745", role: "Pre Final Year EEE" },
    { name: "Aarif S", phone: "6369551918", role: "Pre Final Year EEE" },
    { name: "Merphin", phone: "9677150885", role: "Student Coordinator" },
  ];

  const coordinatorColors = ["#FACC15", "#EC4899", "#F97316"];

  return (
    <section
      id="contact"
      className="py-24 lg:py-36 px-6 lg:px-8"
      style={{ borderTop: "2px solid oklch(var(--border))" }}
    >
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Get In Touch</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl font-[800] tracking-tight">
            Contact <span className="text-gradient-gold">Us</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Reach out to our coordinators or faculty for registrations and
            queries.
          </p>
        </FadeUp>

        {/* Student Coordinators */}
        <FadeUp className="mb-6">
          <p
            className="text-xs font-[800] tracking-[0.2em] uppercase mb-4 text-center"
            style={{ color: "#FACC15" }}
          >
            Student Coordinators
          </p>
        </FadeUp>
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          {STUDENT_COORDINATORS.map((coordinator, i) => {
            const color = coordinatorColors[i];
            return (
              <FadeUp key={coordinator.name} delay={i * 1}>
                <div
                  data-ocid={`contact.card.${i + 1}`}
                  className="p-5 rounded-xl bg-card flex flex-col gap-4"
                  style={{
                    border: `3px solid ${color}`,
                    boxShadow: "4px 4px 0 #000",
                  }}
                >
                  <div>
                    <Badge
                      variant="outline"
                      className="text-xs tracking-widest uppercase mb-2 font-[700]"
                      style={{
                        border: `2px solid ${color}`,
                        color,
                        boxShadow: "1px 1px 0 #000",
                      }}
                    >
                      Coordinator
                    </Badge>
                    <h3
                      className="font-display text-lg font-[800] mb-0.5"
                      style={{
                        color,
                        textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
                      }}
                    >
                      {coordinator.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {coordinator.role}
                    </p>
                  </div>
                  <a
                    href={`tel:${coordinator.phone}`}
                    data-ocid="contact.link"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{
                        background: `${color}22`,
                        border: `2px solid ${color}`,
                      }}
                    >
                      <Phone className="h-3.5 w-3.5" style={{ color }} />
                    </div>
                    <span className="text-sm font-[700]">
                      {coordinator.phone}
                    </span>
                  </a>
                  <a
                    href={`tel:${coordinator.phone}`}
                    data-ocid="contact.primary_button"
                  >
                    <button
                      type="button"
                      className="w-full py-2 font-[900] text-sm cursor-pointer flex items-center justify-center gap-1.5"
                      style={{
                        background: color,
                        border: "2px solid #000",
                        boxShadow: "2px 2px 0 #000",
                        color: "#1e003e",
                        borderRadius: "50px",
                      }}
                    >
                      <Phone className="h-3.5 w-3.5" />
                      Call
                    </button>
                  </a>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Faculty, HOD, Venue & Event Info */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* HOD Card */}
          <FadeUp delay={0}>
            <div
              data-ocid="contact.panel"
              className="p-6 rounded-xl bg-card h-full"
              style={{
                border: "3px solid #EC4899",
                boxShadow: "4px 4px 0 #000",
              }}
            >
              <Badge
                variant="outline"
                className="text-xs tracking-widest uppercase mb-3 font-[700]"
                style={{
                  border: "2px solid #EC4899",
                  color: "#EC4899",
                  boxShadow: "1px 1px 0 #000",
                }}
              >
                HOD / EEE
              </Badge>
              <h3 className="font-display text-xl font-[800] text-gradient-cyan mb-1">
                Dr. NP Ananthamoorthy
              </h3>
              <p className="text-sm text-muted-foreground">
                Head of Department — Electrical &amp; Electronics Engineering
              </p>
            </div>
          </FadeUp>

          {/* Faculty Coordinator Card */}
          <FadeUp delay={1}>
            <div
              data-ocid="contact.card"
              className="p-6 rounded-xl bg-card h-full"
              style={{
                border: "3px solid #FACC15",
                boxShadow: "4px 4px 0 #000",
              }}
            >
              <Badge
                variant="outline"
                className="text-xs tracking-widest uppercase mb-3 font-[700]"
                style={{
                  border: "2px solid #FACC15",
                  color: "#FACC15",
                  boxShadow: "1px 1px 0 #000",
                }}
              >
                Faculty Coordinator
              </Badge>
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: "rgba(250,204,21,0.15)",
                    border: "2px solid #FACC15",
                    boxShadow: "2px 2px 0 #000",
                  }}
                >
                  <GraduationCap
                    className="h-5 w-5"
                    style={{ color: "#FACC15" }}
                  />
                </div>
                <div>
                  <h3 className="font-display text-xl font-[800] text-gradient-gold mb-1">
                    Dr. Joshua Daniel
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Dept of Electrical and Electronics Engineering
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Venue Card */}
          <FadeUp delay={2}>
            <div
              data-ocid="contact.card"
              className="p-6 rounded-xl bg-card h-full"
              style={{
                border: "3px solid #F97316",
                boxShadow: "4px 4px 0 #000",
              }}
            >
              <Badge
                variant="outline"
                className="text-xs tracking-widest uppercase mb-3 font-[700]"
                style={{
                  border: "2px solid #F97316",
                  color: "#F97316",
                  boxShadow: "1px 1px 0 #000",
                }}
              >
                Venue
              </Badge>
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: "rgba(249,115,22,0.15)",
                    border: "2px solid #F97316",
                    boxShadow: "2px 2px 0 #000",
                  }}
                >
                  <MapPin className="h-5 w-5" style={{ color: "#F97316" }} />
                </div>
                <div>
                  <h3
                    className="font-display text-lg font-[800] mb-1"
                    style={{
                      color: "#F97316",
                      textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
                    }}
                  >
                    Hindusthan College of Engineering and Technology
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Department of EEE
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Event Quick Info */}
          <FadeUp delay={1.5} className="md:col-span-2 lg:col-span-2">
            <div
              className="p-6 rounded-xl h-full"
              style={{
                background: "oklch(0.14 0.040 280)",
                border: "2px solid oklch(var(--border))",
                boxShadow: "3px 3px 0 #000",
              }}
            >
              <h4 className="font-display font-[800] text-foreground mb-4">
                Event Details
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Date", value: "March 16, 2026", color: "#FACC15" },
                  {
                    label: "Time",
                    value: "9:00 AM – 3:00 PM",
                    color: "#EC4899",
                  },
                  { label: "Fee", value: "₹150 / head", color: "#F97316" },
                  {
                    label: "Events",
                    value: "Max 2 / student",
                    color: "#a855f7",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    <p
                      className="font-display font-[800] text-sm"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Email CTA */}
          <FadeUp delay={2}>
            <a
              href="mailto:elzia2k26@gmail.com"
              data-ocid="contact.link"
              className="block h-full"
            >
              <div
                className="p-5 rounded-xl flex items-center gap-3 group cursor-pointer transition-all h-full"
                style={{
                  background: "rgba(250,204,21,0.08)",
                  border: "2px solid #FACC15",
                  boxShadow: "3px 3px 0 #000",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                <Mail
                  className="h-5 w-5 flex-shrink-0"
                  style={{ color: "#FACC15" }}
                />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Send Abstract / Queries
                  </p>
                  <p
                    className="text-sm font-[700] group-hover:underline"
                    style={{ color: "#FACC15" }}
                  >
                    elzia2k26@gmail.com
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    WhatsApp: 8807502350
                  </p>
                </div>
              </div>
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-10 px-6 lg:px-8"
      style={{ borderTop: "3px solid #FACC15", boxShadow: "0 -2px 0 0 #000" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/elzia-cartoon-logo-transparent.dim_400x400.png"
              alt="ELZIA Logo"
              className="h-8 w-8 rounded-full object-cover"
              style={{
                border: "2px solid #FACC15",
                boxShadow: "2px 2px 0 #000",
              }}
            />
            <div>
              <p
                className="font-display font-[900] text-base leading-none"
                style={{
                  color: "#FACC15",
                  textShadow: "1px 1px 0 #000",
                }}
              >
                ELZIA 2K26
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Dept. of EEE
              </p>
            </div>
          </div>

          {/* Nav */}
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid="nav.link"
                  className="text-xs font-[700] text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector(link.href)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Contact */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a
              href="mailto:elzia2k26@gmail.com"
              data-ocid="footer.link"
              className="hover:text-primary transition-colors font-[700]"
            >
              elzia2k26@gmail.com
            </a>
            <a
              href="tel:9585850745"
              data-ocid="footer.link"
              className="hover:text-primary transition-colors font-[700]"
            >
              9585850745
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-5"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(250,204,21,0.4), transparent)",
          }}
        />

        {/* Copyright */}
        <p className="text-xs text-muted-foreground/50 text-center">
          © {year} ELZIA 2K26 — Department of EEE. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted-foreground transition-colors underline underline-offset-2"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

/* ─── App ─────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Full-page cartoon canvas animation fixed behind all content */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <CartoonCanvas />
      </div>

      {/* Scroll progress bar — fixed at very top */}
      <ScrollProgressBar />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <EventsSection />
        <PrizesSection />
        <RulesSection />
        <RegisterSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

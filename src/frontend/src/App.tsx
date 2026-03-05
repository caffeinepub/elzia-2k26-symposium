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
import { useEffect, useRef, useState } from "react";

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
  },
  {
    icon: "🥇",
    title: "Certificates of Merit",
    description:
      "Winners receive certificates of merit mentioning their specific achievement.",
  },
  {
    icon: "💰",
    title: "Cash Prizes",
    description:
      "Cash prizes awarded to winners in selected competitive events.",
  },
  {
    icon: "🎁",
    title: "Take-Away Kits",
    description:
      "Every participant walks away with an exclusive take-away kit.",
  },
  {
    icon: "✨",
    title: "Exciting Prizes",
    description:
      "Exciting prizes for the most enthusiastic and outstanding participants.",
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
    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
      <span className="w-6 h-px bg-primary inline-block" />
      {children}
      <span className="w-6 h-px bg-primary inline-block" />
    </span>
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
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      )}
      style={{ height: "var(--nav-height)" }}
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
            src="/assets/uploads/WhatsApp-Image-2026-03-05-at-12.17.43-PM-1.jpeg"
            alt="ELZIA 2K26 Logo"
            className="h-10 w-10 rounded-full object-cover border border-primary/30 group-hover:border-primary/70 transition-colors"
          />
          <span className="font-display text-xl font-[800] tracking-tight text-gradient-gold">
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
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide"
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
        <Button
          size="sm"
          data-ocid="nav.primary_button"
          className="hidden lg:flex bg-primary text-primary-foreground hover:bg-primary/85 glow-gold font-semibold tracking-wide text-sm px-5"
          onClick={() => scrollTo("#register")}
        >
          Register ₹150
        </Button>

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
            className="lg:hidden overflow-hidden bg-background/98 backdrop-blur-md border-b border-border"
          >
            <ul className="px-6 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid="nav.link"
                    className="block text-base font-medium text-muted-foreground hover:text-primary transition-colors py-1"
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
                <Button
                  data-ocid="nav.primary_button"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/85 glow-gold font-semibold"
                  onClick={() => {
                    setOpen(false);
                    scrollTo("#register");
                  }}
                >
                  Register — ₹150
                </Button>
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
  const TARGET_DATE = new Date("2026-03-17T09:00:00");
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 scanlines opacity-30" />
        {/* Radial glow from center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.62 0.22 255 / 0.08) 0%, oklch(0.72 0.20 215 / 0.05) 40%, transparent 70%)",
          }}
        />
        {/* Geometric grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.62 0.22 255) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.22 255) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Corner accents */}
      <div className="absolute top-24 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/30 pointer-events-none" />
      <div className="absolute top-24 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/30 pointer-events-none" />
      <div className="absolute bottom-16 left-8 w-12 h-12 border-l border-b border-accent/20 pointer-events-none" />
      <div className="absolute bottom-16 right-8 w-12 h-12 border-r border-b border-accent/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Logo — half-emerging dragon with sparks */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="mb-2 flex justify-center"
          style={{ overflow: "visible" }}
        >
          <div
            className="relative flex justify-center"
            style={{ height: "160px", width: "320px" }}
          >
            {/* Dragon spark particles */}
            {(
              [
                "p0",
                "p1",
                "p2",
                "p3",
                "p4",
                "p5",
                "p6",
                "p7",
                "p8",
                "p9",
                "p10",
                "p11",
                "p12",
                "p13",
                "p14",
                "p15",
              ] as const
            ).map((pid, i) => {
              const angle = (i / 16) * 360;
              const radius = 90 + ((i * 7) % 60);
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius * 0.5;
              const size = 2 + (i % 3) * 2;
              const colors = [
                "oklch(0.62 0.22 255)",
                "oklch(0.72 0.20 215)",
                "oklch(0.95 0.20 85)",
                "oklch(1 0.15 100)",
              ];
              const color = colors[i % colors.length];
              return (
                <motion.div
                  key={pid}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: size,
                    height: size,
                    background: color,
                    left: "50%",
                    top: "50%",
                    boxShadow: `0 0 6px 2px ${color}`,
                  }}
                  animate={{
                    x: [0, x * 0.4, x, x * 1.3],
                    y: [0, y * 0.4 - 20, y - 40, y - 80],
                    opacity: [0, 1, 0.8, 0],
                    scale: [0.5, 1.2, 0.8, 0],
                  }}
                  transition={{
                    duration: 1.8 + (i % 5) * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: (i / 16) * 2.2,
                    ease: "easeOut",
                  }}
                />
              );
            })}

            {/* Extra bright spark streaks */}
            {(["s0", "s1", "s2", "s3", "s4", "s5", "s6", "s7"] as const).map(
              (sid, i) => {
                const spread = [-120, -80, -50, -20, 20, 50, 80, 120][i];
                return (
                  <motion.div
                    key={sid}
                    className="absolute pointer-events-none"
                    style={{
                      width: "2px",
                      height: "30px",
                      background:
                        i % 2 === 0
                          ? "linear-gradient(to top, oklch(0.62 0.22 255), transparent)"
                          : "linear-gradient(to top, oklch(0.95 0.20 85), transparent)",
                      left: `calc(50% + ${spread}px)`,
                      bottom: "55%",
                      borderRadius: "2px",
                      transformOrigin: "bottom center",
                    }}
                    animate={{
                      y: [0, -60, -120],
                      opacity: [0, 1, 0],
                      scaleY: [0.5, 1, 0.3],
                      rotate: [spread * 0.15, spread * 0.1, spread * 0.2],
                    }}
                    transition={{
                      duration: 1.4 + (i % 3) * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.28,
                      ease: "easeOut",
                    }}
                  />
                );
              },
            )}

            {/* Deep glow pool at the cut (bottom) */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "340px",
                height: "80px",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                background:
                  "radial-gradient(ellipse 80% 100% at 50% 100%, oklch(0.62 0.22 255 / 0.55) 0%, oklch(0.72 0.20 215 / 0.2) 40%, transparent 70%)",
                filter: "blur(8px)",
              }}
            />

            {/* Outer rotating conic spark ring */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute pointer-events-none"
              style={{
                width: "280px",
                height: "280px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background:
                  "conic-gradient(from 0deg, transparent 0%, oklch(0.62 0.22 255 / 0.7) 18%, oklch(0.95 0.20 85 / 0.5) 22%, transparent 40%, oklch(0.72 0.20 215 / 0.5) 70%, oklch(0.95 0.20 85 / 0.3) 75%, transparent 90%)",
                borderRadius: "50%",
                filter: "blur(2px)",
              }}
            />

            {/* Pulsing blue aura behind logo */}
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{
                duration: 2.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute pointer-events-none rounded-full"
              style={{
                width: "240px",
                height: "240px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "oklch(0.62 0.22 255 / 0.35)",
                filter: "blur(30px)",
              }}
            />

            {/* The logo itself — clipped to show only top half emerging */}
            <div
              className="absolute"
              style={{
                width: "220px",
                height: "220px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                overflow: "hidden",
                clipPath: "inset(0 0 45% 0)",
                zIndex: 10,
              }}
            >
              {/* Shining border ring */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, oklch(0.95 0.20 85) 15%, oklch(0.62 0.22 255) 30%, transparent 50%, oklch(0.72 0.20 215) 80%, transparent 100%)",
                  padding: "3px",
                  borderRadius: "50%",
                  zIndex: 12,
                }}
              />
              <img
                src="/assets/uploads/WhatsApp-Image-2026-03-05-at-12.17.43-PM-1.jpeg"
                alt="ELZIA 2K26 Logo"
                className="w-full h-full rounded-full object-cover relative"
                style={{
                  borderWidth: "3px",
                  borderStyle: "solid",
                  borderColor: "oklch(0.62 0.22 255 / 0.9)",
                  boxShadow:
                    "0 0 40px 12px oklch(0.62 0.22 255 / 0.6), 0 0 80px 30px oklch(0.62 0.22 255 / 0.2), inset 0 0 20px oklch(0.72 0.20 215 / 0.2)",
                  zIndex: 11,
                }}
              />
            </div>

            {/* Bottom cut glowing edge line */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6], scaleX: [0.9, 1.05, 0.9] }}
              transition={{
                duration: 1.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute pointer-events-none"
              style={{
                width: "200px",
                height: "3px",
                bottom: "57px",
                left: "50%",
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(90deg, transparent, oklch(0.62 0.22 255) 20%, oklch(0.95 0.20 85) 50%, oklch(0.62 0.22 255) 80%, transparent)",
                boxShadow: "0 0 12px 4px oklch(0.62 0.22 255 / 0.8)",
                borderRadius: "2px",
                zIndex: 15,
              }}
            />
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
            className="text-xs tracking-[0.2em] uppercase border-primary/40 text-primary px-4 py-1 font-semibold"
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
          className="font-display text-6xl sm:text-8xl lg:text-9xl font-[800] leading-none tracking-tight mb-3"
        >
          <span className="text-gradient-gold">ELZIA</span>
          <span className="text-foreground/90"> 2K26</span>
        </motion.h1>

        {/* Dept */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-muted-foreground text-sm sm:text-base tracking-widest uppercase mb-2"
        >
          Department of Electrical &amp; Electronics Engineering
        </motion.p>

        {/* HOD */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2.5}
          className="text-muted-foreground/70 text-xs sm:text-sm tracking-wide mb-2"
        >
          HOD/EEE — Dr. NP Ananthamoorthy
        </motion.p>

        {/* Date / Time */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-wrap items-center justify-center gap-4 mb-10 text-sm font-medium"
        >
          <span className="flex items-center gap-1.5 text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            March 17, 2026
          </span>
          <span className="text-border">|</span>
          <span className="text-accent flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            9:00 AM – 3:00 PM
          </span>
          <span className="text-border">|</span>
          <span className="text-muted-foreground flex items-center gap-1.5">
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
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Event Starts In
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            {[
              { value: days, label: "Days" },
              { value: hours, label: "Hours" },
              { value: minutes, label: "Min" },
              { value: seconds, label: "Sec" },
            ].map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-3 sm:gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className="relative w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 rounded-lg flex items-center justify-center"
                    style={{
                      background: "oklch(0.08 0.025 260)",
                      border: "1px solid oklch(0.62 0.22 255 / 0.3)",
                      boxShadow: "0 0 20px 0 oklch(0.62 0.22 255 / 0.1)",
                    }}
                  >
                    <span
                      className="timer-digit font-display text-2xl sm:text-3xl lg:text-4xl font-[800] text-gradient-gold"
                      aria-live="polite"
                    >
                      {pad(value)}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-2 tracking-widest uppercase">
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <span className="text-2xl sm:text-3xl font-[800] text-primary mb-4 leading-none">
                    :
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
          <Button
            size="lg"
            data-ocid="hero.primary_button"
            className="bg-primary text-primary-foreground hover:bg-primary/85 glow-gold font-bold tracking-wide text-base px-8 py-6 h-auto font-display"
            onClick={() => {
              document
                .querySelector("#register")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Register Now — ₹150
          </Button>
          <Button
            size="lg"
            variant="outline"
            data-ocid="hero.secondary_button"
            className="border-accent/40 text-accent hover:bg-accent/10 hover:border-accent/70 font-semibold tracking-wide text-base px-8 py-6 h-auto glow-cyan"
            onClick={() => {
              document
                .querySelector("#events")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Events
          </Button>
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
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">
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

/* ─── Event Card ──────────────────────────────────────────────────────────── */
function EventCard({
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
  return (
    <motion.article
      data-ocid={`events.item.${index}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "relative group p-6 lg:p-8 rounded-xl border bg-card overflow-hidden",
        isGold
          ? "card-glow-gold border-border"
          : "card-glow-cyan border-border",
      )}
    >
      {/* Ambient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isGold
            ? "radial-gradient(ellipse at 30% 0%, oklch(0.62 0.22 255 / 0.07) 0%, transparent 60%)"
            : "radial-gradient(ellipse at 30% 0%, oklch(0.72 0.20 215 / 0.07) 0%, transparent 60%)",
        }}
      />

      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-all duration-500"
        style={{
          background: isGold
            ? "linear-gradient(90deg, transparent, oklch(0.62 0.22 255 / 0.5), transparent)"
            : "linear-gradient(90deg, transparent, oklch(0.72 0.20 215 / 0.5), transparent)",
          opacity: 0,
        }}
      />

      {/* Icon */}
      <div
        className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-lg"
        style={{
          background: isGold
            ? "oklch(0.62 0.22 255 / 0.12)"
            : "oklch(0.72 0.20 215 / 0.12)",
          border: isGold
            ? "1px solid oklch(0.62 0.22 255 / 0.25)"
            : "1px solid oklch(0.72 0.20 215 / 0.25)",
        }}
      >
        <Icon
          className="h-5 w-5"
          style={{
            color: isGold ? "oklch(0.62 0.22 255)" : "oklch(0.72 0.20 215)",
          }}
        />
      </div>

      {/* Tagline */}
      <p
        className="text-xs font-semibold tracking-[0.18em] uppercase mb-1"
        style={{
          color: isGold
            ? "oklch(0.62 0.22 255 / 0.8)"
            : "oklch(0.72 0.20 215 / 0.8)",
        }}
      >
        {tagline}
      </p>

      {/* Title */}
      <h3 className="font-display text-xl font-[700] tracking-tight mb-3 text-foreground">
        {title}
      </h3>

      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* Detail badge */}
      <span
        className="inline-block text-xs font-medium px-3 py-1 rounded-full"
        style={{
          background: isGold
            ? "oklch(0.62 0.22 255 / 0.1)"
            : "oklch(0.72 0.20 215 / 0.1)",
          color: isGold ? "oklch(0.62 0.22 255)" : "oklch(0.72 0.20 215)",
          border: isGold
            ? "1px solid oklch(0.62 0.22 255 / 0.2)"
            : "1px solid oklch(0.72 0.20 215 / 0.2)",
        }}
      >
        {detail}
      </span>
    </motion.article>
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
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-[800] tracking-tight text-balance">
            <span className="text-gradient-gold">Ignite</span> Your
            <br />
            Technical Edge
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base">
            Four high-stakes technical challenges designed to push the
            boundaries of EEE knowledge.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {TECH_EVENTS.map((event, i) => (
            <FadeUp key={event.title} delay={i * 1.5}>
              <EventCard
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
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-[800] tracking-tight text-balance">
            Play Hard, <span className="text-gradient-cyan">Win Harder</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base">
            Take a break from circuits and code — compete in gaming, strategy,
            and team challenges.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {NON_TECH_EVENTS.map((event, i) => (
            <FadeUp key={event.title} delay={i * 1.5}>
              <EventCard
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
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.62 0.22 255 / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Rewards</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-[800] tracking-tight text-balance">
            Certificates, Prizes &amp;
            <br />
            <span className="text-gradient-gold">Take-Away Kits</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Every participant wins. The best ones win even bigger.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRIZES.map((prize, i) => (
            <FadeUp key={prize.title} delay={i * 1.5}>
              <div
                data-ocid={`prizes.item.${i + 1}`}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_24px_0_oklch(0.78_0.18_80_/_0.12)]"
              >
                <div className="text-3xl mb-4">{prize.icon}</div>
                <h3 className="font-display text-lg font-[700] mb-2 text-foreground">
                  {prize.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {prize.description}
                </p>
              </div>
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
      className="py-24 lg:py-36 px-6 lg:px-8 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Guidelines</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl font-[800] tracking-tight">
            Rules &amp; <span className="text-gradient-cyan">Regulations</span>
          </h2>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Paper Presentation Rules */}
          <FadeUp delay={0}>
            <div
              data-ocid="rules.panel"
              className="p-6 lg:p-8 rounded-xl border bg-card"
              style={{ borderColor: "oklch(0.62 0.22 255 / 0.3)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: "oklch(0.62 0.22 255 / 0.12)",
                    border: "1px solid oklch(0.62 0.22 255 / 0.25)",
                  }}
                >
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-display text-xl font-[700] text-gradient-gold">
                  Paper Presentation Rules
                </h3>
              </div>
              <ul className="space-y-3">
                {paperRules.map((rule) => (
                  <li
                    key={rule}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span
                      className="mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{
                        background: "oklch(0.62 0.22 255 / 0.12)",
                        color: "oklch(0.62 0.22 255)",
                      }}
                    >
                      {paperRules.indexOf(rule) + 1}
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
              className="p-6 lg:p-8 rounded-xl border bg-card"
              style={{ borderColor: "oklch(0.72 0.20 215 / 0.3)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: "oklch(0.72 0.20 215 / 0.12)",
                    border: "1px solid oklch(0.72 0.20 215 / 0.25)",
                  }}
                >
                  <Shield
                    className="h-4 w-4"
                    style={{ color: "oklch(0.72 0.20 215)" }}
                  />
                </div>
                <h3 className="font-display text-xl font-[700] text-gradient-cyan">
                  General Rules
                </h3>
              </div>
              <ul className="space-y-3">
                {generalRules.map((rule) => (
                  <li
                    key={rule}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span
                      className="mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{
                        background: "oklch(0.72 0.20 215 / 0.12)",
                        color: "oklch(0.72 0.20 215)",
                      }}
                    >
                      {generalRules.indexOf(rule) + 1}
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
      {/* Glow bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.72 0.20 215 / 0.05) 0%, transparent 70%)",
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
                className="w-full max-w-sm mx-auto p-8 rounded-2xl border flex flex-col items-center gap-6"
                style={{
                  border: "1px solid oklch(0.62 0.22 255 / 0.4)",
                  background: "oklch(0.08 0.025 260)",
                  boxShadow: "0 0 40px 0 oklch(0.62 0.22 255 / 0.1)",
                }}
              >
                {/* QR Code */}
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/assets/uploads/WhatsApp-Image-2026-03-02-at-9.18.34-AM-2.jpeg"
                    alt="UPI Payment QR Code"
                    className="w-48 h-48 rounded-xl object-contain bg-white p-2"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    UPI ID: karthikapichandi2003@okhdfcbank
                  </p>
                </div>

                <div className="text-center">
                  <p className="font-display text-2xl font-[800] text-gradient-gold mb-1">
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
                  background: "oklch(0.62 0.22 255 / 0.08)",
                  border: "1px solid oklch(0.62 0.22 255 / 0.2)",
                }}
              >
                <span className="text-2xl flex-shrink-0">🍽️</span>
                <div>
                  <p className="font-display font-[700] text-primary text-base mb-1">
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
                  background: "oklch(0.08 0.025 260)",
                  border: "1px solid oklch(0.18 0.025 260)",
                }}
              >
                <h4 className="font-display font-[700] text-foreground mb-3 text-base">
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
                      <span className="text-primary">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key notes */}
              <div
                className="p-5 rounded-xl"
                style={{
                  background: "oklch(0.72 0.20 215 / 0.06)",
                  border: "1px solid oklch(0.72 0.20 215 / 0.2)",
                }}
              >
                <h4
                  className="font-display font-[700] mb-3 text-base"
                  style={{ color: "oklch(0.72 0.20 215)" }}
                >
                  Important Notes
                </h4>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>⚡ Maximum 2 events per student</li>
                  <li>⚡ Bring valid college ID card</li>
                  <li>⚡ Time: 9:00 AM – 3:00 PM</li>
                  <li>⚡ March 17, 2026</li>
                </ul>
              </div>

              <Button
                size="lg"
                data-ocid="register.primary_button"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/85 glow-gold font-bold text-base py-6 h-auto font-display"
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSeKVC5JVXBknHq2GGhBA4Wosnx_-tjmI64G_fuN4T6HHO9_sQ/viewform?usp=publish-editor",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                <Gift className="mr-2 h-5 w-5" />
                Fill Registration Form
              </Button>
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

  return (
    <section
      id="contact"
      className="py-24 lg:py-36 px-6 lg:px-8 border-t border-border"
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
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 text-center">
            Student Coordinators
          </p>
        </FadeUp>
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          {STUDENT_COORDINATORS.map((coordinator, i) => (
            <FadeUp key={coordinator.name} delay={i * 1}>
              <div
                data-ocid={`contact.card.${i + 1}`}
                className="p-5 rounded-xl border bg-card flex flex-col gap-4"
                style={{ borderColor: "oklch(0.62 0.22 255 / 0.3)" }}
              >
                <div>
                  <Badge
                    variant="outline"
                    className="text-xs tracking-widest uppercase border-primary/40 text-primary mb-2"
                  >
                    Coordinator
                  </Badge>
                  <h3 className="font-display text-lg font-[700] text-gradient-gold mb-0.5">
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
                      background: "oklch(0.62 0.22 255 / 0.12)",
                      border: "1px solid oklch(0.62 0.22 255 / 0.2)",
                    }}
                  >
                    <Phone className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">
                    {coordinator.phone}
                  </span>
                </a>
                <a
                  href={`tel:${coordinator.phone}`}
                  data-ocid="contact.primary_button"
                >
                  <Button
                    size="sm"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/85 glow-gold font-semibold"
                  >
                    <Phone className="mr-1.5 h-3.5 w-3.5" />
                    Call
                  </Button>
                </a>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Faculty, HOD, Venue & Event Info */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* HOD Card */}
          <FadeUp delay={0}>
            <div
              data-ocid="contact.panel"
              className="p-6 rounded-xl border bg-card h-full"
              style={{ borderColor: "oklch(0.72 0.20 215 / 0.3)" }}
            >
              <Badge
                variant="outline"
                className="text-xs tracking-widest uppercase mb-3"
                style={{
                  borderColor: "oklch(0.72 0.20 215 / 0.4)",
                  color: "oklch(0.72 0.20 215)",
                }}
              >
                HOD / EEE
              </Badge>
              <h3 className="font-display text-xl font-[700] text-gradient-cyan mb-1">
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
              className="p-6 rounded-xl border bg-card h-full"
              style={{ borderColor: "oklch(0.62 0.22 255 / 0.3)" }}
            >
              <Badge
                variant="outline"
                className="text-xs tracking-widest uppercase border-primary/40 text-primary mb-3"
              >
                Faculty Coordinator
              </Badge>
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: "oklch(0.62 0.22 255 / 0.12)",
                    border: "1px solid oklch(0.62 0.22 255 / 0.25)",
                  }}
                >
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-[700] text-gradient-gold mb-1">
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
              className="p-6 rounded-xl border bg-card h-full"
              style={{ borderColor: "oklch(0.72 0.20 215 / 0.3)" }}
            >
              <Badge
                variant="outline"
                className="text-xs tracking-widest uppercase mb-3"
                style={{
                  borderColor: "oklch(0.72 0.20 215 / 0.4)",
                  color: "oklch(0.72 0.20 215)",
                }}
              >
                Venue
              </Badge>
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: "oklch(0.72 0.20 215 / 0.12)",
                    border: "1px solid oklch(0.72 0.20 215 / 0.25)",
                  }}
                >
                  <MapPin
                    className="h-5 w-5"
                    style={{ color: "oklch(0.72 0.20 215)" }}
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg font-[700] text-gradient-cyan mb-1">
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
                background: "oklch(0.08 0.025 260)",
                border: "1px solid oklch(0.18 0.025 260)",
              }}
            >
              <h4 className="font-display font-[700] text-foreground mb-4">
                Event Details
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Date", value: "March 17, 2026" },
                  { label: "Time", value: "9:00 AM – 3:00 PM" },
                  { label: "Fee", value: "₹150 / head" },
                  { label: "Events", value: "Max 2 / student" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-display font-[700] text-sm text-foreground">
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
                  background: "oklch(0.62 0.22 255 / 0.06)",
                  border: "1px solid oklch(0.62 0.22 255 / 0.2)",
                }}
              >
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Send Abstract / Queries
                  </p>
                  <p className="text-sm font-medium text-primary group-hover:underline">
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
    <footer className="border-t border-border py-10 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/uploads/WhatsApp-Image-2026-03-05-at-12.17.43-PM-1.jpeg"
              alt="ELZIA Logo"
              className="h-8 w-8 rounded-full object-cover border border-primary/30"
            />
            <div>
              <p className="font-display font-[800] text-base text-gradient-gold leading-none">
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
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
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
              className="hover:text-primary transition-colors"
            >
              elzia2k26@gmail.com
            </a>
            <a
              href="tel:9585850745"
              data-ocid="footer.link"
              className="hover:text-primary transition-colors"
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
              "linear-gradient(90deg, transparent, oklch(0.62 0.22 255 / 0.3), transparent)",
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
      <Navbar />
      <main>
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

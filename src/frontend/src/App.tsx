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
  Phone,
  Shield,
  Swords,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

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
    detail: "Team of 3 · 5 min + 3 min Q&A",
    color: "gold",
  },
  {
    icon: Zap,
    title: "Digitronix",
    tagline: "Circuit Challenge",
    description:
      "Test your electronics mastery. Design, analyze, and troubleshoot circuits under competitive pressure.",
    detail: "Individual / Team",
    color: "silver",
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
    color: "silver",
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
    color: "silver",
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
    color: "silver",
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
    variant: "gold" as const,
  },
  {
    icon: "🥇",
    title: "Certificates of Merit",
    description:
      "Winners receive certificates of merit mentioning their specific achievement.",
    variant: "silver" as const,
  },
  {
    icon: "💰",
    title: "Cash Prizes",
    description:
      "Cash prizes awarded to winners in selected competitive events.",
    variant: "gold" as const,
  },
  {
    icon: "🎁",
    title: "Take-Away Kits",
    description:
      "Every participant walks away with an exclusive take-away kit.",
    variant: "silver" as const,
  },
  {
    icon: "✨",
    title: "Exciting Prizes",
    description:
      "Exciting prizes for the most enthusiastic and outstanding participants.",
    variant: "gold" as const,
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

/* ─── Section Label ───────────────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex flex-col items-center gap-1.5 mb-5">
      <span
        className="text-xs font-semibold tracking-[0.25em] uppercase"
        style={{ color: "oklch(var(--gold))" }}
      >
        {children}
      </span>
      <div
        className="h-px w-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(var(--gold) / 0.7), transparent)",
        }}
      />
    </div>
  );
}

/* ─── Countdown Digit ─────────────────────────────────────────────────────── */
function CountdownDigit({ value, label }: { value: number; label: string }) {
  const paddedVal = pad(value);
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 rounded-lg flex items-center justify-center"
        style={{
          background: "oklch(var(--card))",
          border: "1px solid oklch(var(--gold) / 0.25)",
          boxShadow:
            "0 2px 12px rgba(0,0,0,0.4), inset 0 1px 0 oklch(var(--gold) / 0.08)",
        }}
      >
        <span
          className="timer-digit font-display text-2xl sm:text-3xl lg:text-4xl font-bold"
          style={{ color: "oklch(var(--gold))" }}
          aria-live="polite"
        >
          {paddedVal}
        </span>
      </div>
      <span
        className="text-[10px] font-medium tracking-[0.2em] uppercase"
        style={{ color: "oklch(var(--muted-foreground))" }}
      >
        {label}
      </span>
    </div>
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
  color: "gold" | "silver";
  index: number;
}) {
  const isGold = color === "gold";
  const accentOklch = isGold ? "oklch(var(--gold))" : "oklch(0.72 0.04 220)";
  const accentBg = isGold
    ? "oklch(var(--gold) / 0.06)"
    : "oklch(0.72 0.04 220 / 0.06)";
  const borderColor = isGold
    ? "oklch(var(--gold) / 0.20)"
    : "oklch(0.72 0.04 220 / 0.20)";

  return (
    <article
      data-ocid={`events.item.${index}`}
      className={cn(
        "group relative p-6 lg:p-7 rounded-lg bg-card card-elevated cursor-default",
        isGold ? "card-glow-gold" : "card-glow-cyan",
      )}
      style={{
        border: `1px solid ${borderColor}`,
      }}
    >
      {/* Icon */}
      <div
        className="mb-5 inline-flex items-center justify-center w-10 h-10 rounded-md"
        style={{
          background: accentBg,
          border: `1px solid ${accentOklch.replace(")", " / 0.3)")}`,
        }}
      >
        <Icon className="h-4.5 w-4.5" style={{ color: accentOklch }} />
      </div>

      {/* Tagline */}
      <p
        className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-1.5"
        style={{ color: accentOklch }}
      >
        {tagline}
      </p>

      {/* Title */}
      <h3 className="font-display text-lg font-semibold tracking-tight mb-3 text-foreground">
        {title}
      </h3>

      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
        {description}
      </p>

      {/* Detail badge */}
      <span
        className="inline-block text-[11px] font-medium px-3 py-1 rounded-full"
        style={{
          background: accentBg,
          color: accentOklch,
          border: `1px solid ${accentOklch.replace(")", " / 0.25)")}`,
        }}
      >
        {detail}
      </span>
    </article>
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
        scrolled ? "bg-background/96 backdrop-blur-md" : "bg-transparent",
      )}
      style={{
        height: "var(--nav-height)",
        borderBottom: scrolled
          ? "1px solid oklch(var(--border))"
          : "1px solid transparent",
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
            src="/assets/uploads/WhatsApp-Image-2026-03-05-at-12.17.43-PM-1.jpeg"
            alt="ELZIA 2K26 Logo"
            className="h-8 w-8 object-cover"
            style={{
              borderRadius: "6px",
              border: "1px solid oklch(var(--gold) / 0.45)",
              boxShadow: "0 0 10px oklch(var(--gold) / 0.15)",
            }}
          />
          <span
            className="font-display text-lg font-semibold tracking-wide"
            style={{ color: "oklch(var(--gold))" }}
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
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide"
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
          className="hidden lg:flex items-center gap-2 px-5 py-2 text-sm font-semibold tracking-wide cursor-pointer rounded-sm transition-all duration-200"
          style={{
            background: "oklch(var(--gold))",
            color: "oklch(var(--primary-foreground))",
            border: "1px solid transparent",
            boxShadow: "0 0 0 0 oklch(var(--gold) / 0)",
          }}
          onClick={() => scrollTo("#register")}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 20px oklch(var(--gold) / 0.35)";
            (e.currentTarget as HTMLElement).style.filter = "brightness(1.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
            (e.currentTarget as HTMLElement).style.filter = "none";
          }}
        >
          Register · ₹150
        </button>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          data-ocid="nav.toggle"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="lg:hidden bg-background/98 backdrop-blur-md"
          style={{ borderBottom: "1px solid oklch(var(--border))" }}
        >
          <ul className="px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid="nav.link"
                  className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
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
                className="w-full py-3 font-semibold text-sm cursor-pointer rounded-sm transition-all duration-200"
                style={{
                  background: "oklch(var(--gold))",
                  color: "oklch(var(--primary-foreground))",
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
        </div>
      )}
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
        {/* Subtle radial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 35%, oklch(var(--gold) / 0.04) 0%, transparent 65%)",
          }}
        />
        {/* Fine grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(var(--foreground) / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--foreground) / 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Elegant corner accents */}
      <div
        className="absolute top-24 left-8 w-14 h-14 pointer-events-none opacity-30"
        style={{
          borderLeft: "1px solid oklch(var(--gold))",
          borderTop: "1px solid oklch(var(--gold))",
        }}
      />
      <div
        className="absolute top-24 right-8 w-14 h-14 pointer-events-none opacity-30"
        style={{
          borderRight: "1px solid oklch(var(--gold))",
          borderTop: "1px solid oklch(var(--gold))",
        }}
      />
      <div
        className="absolute bottom-16 left-8 w-10 h-10 pointer-events-none opacity-20"
        style={{
          borderLeft: "1px solid oklch(var(--gold))",
          borderBottom: "1px solid oklch(var(--gold))",
        }}
      />
      <div
        className="absolute bottom-16 right-8 w-10 h-10 pointer-events-none opacity-20"
        style={{
          borderRight: "1px solid oklch(var(--gold))",
          borderBottom: "1px solid oklch(var(--gold))",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Logo — clean, static, elegant */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img
              src="/assets/uploads/WhatsApp-Image-2026-03-05-at-12.17.43-PM-1.jpeg"
              alt="ELZIA 2K26 Logo"
              className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
              style={{
                borderRadius: "12px",
                border: "1px solid oklch(var(--gold) / 0.45)",
                boxShadow:
                  "0 0 0 1px oklch(var(--gold) / 0.08), 0 0 40px oklch(var(--gold) / 0.15), 0 8px 32px rgba(0,0,0,0.4)",
                background: "oklch(var(--card))",
              }}
            />
          </div>
        </div>

        {/* Eyebrow */}
        <div className="mb-5">
          <Badge
            variant="outline"
            className="text-[10px] tracking-[0.25em] uppercase px-4 py-1.5 font-medium"
            style={{
              border: "1px solid oklch(var(--gold) / 0.35)",
              color: "oklch(var(--gold))",
              background: "oklch(var(--gold) / 0.06)",
            }}
          >
            National Level Technical Symposium
          </Badge>
        </div>

        {/* Title */}
        <h1
          className="font-display font-bold leading-none tracking-tight mb-3"
          style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)" }}
        >
          <span
            className="gold-shimmer"
            style={{ color: "oklch(var(--gold))" }}
          >
            ELZIA-2K26
          </span>
        </h1>

        {/* EEE SYMPOSIUM subtitle */}
        <p
          className="font-sans font-semibold tracking-[0.3em] uppercase mb-4"
          style={{
            fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
            color: "oklch(var(--muted-foreground))",
            letterSpacing: "0.3em",
          }}
        >
          EEE Symposium
        </p>

        {/* Dept */}
        <p
          className="text-sm tracking-wide mb-1.5"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          Department of Electrical &amp; Electronics Engineering
        </p>

        {/* HOD */}
        <p
          className="text-xs tracking-wide mb-8"
          style={{ color: "oklch(var(--muted-foreground) / 0.6)" }}
        >
          HOD/EEE — Dr. NP Ananthamoorthy
        </p>

        {/* Date / Time */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-sm">
          <span
            className="flex items-center gap-2 px-4 py-1.5 rounded-sm text-xs font-medium tracking-wide"
            style={{
              background: "oklch(var(--card))",
              border: "1px solid oklch(var(--gold) / 0.20)",
              color: "oklch(var(--gold))",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: "oklch(var(--gold))" }}
            />
            March 16, 2026
          </span>
          <span
            className="flex items-center gap-2 px-4 py-1.5 rounded-sm text-xs font-medium tracking-wide"
            style={{
              background: "oklch(var(--card))",
              border: "1px solid oklch(var(--border))",
              color: "oklch(var(--foreground))",
            }}
          >
            9:00 AM – 3:00 PM
          </span>
          <span
            className="flex items-center gap-2 px-4 py-1.5 rounded-sm text-xs font-medium tracking-wide"
            style={{
              background: "oklch(var(--card))",
              border: "1px solid oklch(var(--border))",
              color: "oklch(var(--muted-foreground))",
            }}
          >
            🍽️ Food Provided
          </span>
        </div>

        {/* Countdown Timer */}
        <div className="mb-10">
          <p
            className="text-[10px] tracking-[0.25em] uppercase font-medium mb-5"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Event Starts In
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {[
              { value: days, label: "Days" },
              { value: hours, label: "Hours" },
              { value: minutes, label: "Mins" },
              { value: seconds, label: "Secs" },
            ].map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-3 sm:gap-4">
                <CountdownDigit value={value} label={label} />
                {i < 3 && (
                  <span
                    className="text-xl font-light mb-5 select-none leading-none"
                    style={{
                      color: "oklch(var(--gold) / 0.4)",
                    }}
                  >
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            data-ocid="hero.primary_button"
            className="font-semibold tracking-wide text-sm px-8 py-5 h-auto rounded-sm transition-all duration-200"
            style={{
              background: "oklch(var(--gold))",
              color: "oklch(var(--primary-foreground))",
              border: "none",
              boxShadow: "0 0 0 0 transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 24px oklch(var(--gold) / 0.35)";
              (e.currentTarget as HTMLElement).style.filter =
                "brightness(1.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.filter = "none";
            }}
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
            className="font-medium tracking-wide text-sm px-8 py-5 h-auto rounded-sm transition-all duration-200"
            style={{
              border: "1px solid oklch(var(--border))",
              color: "oklch(var(--foreground))",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "oklch(var(--gold) / 0.4)";
              (e.currentTarget as HTMLElement).style.color =
                "oklch(var(--gold))";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "oklch(var(--border))";
              (e.currentTarget as HTMLElement).style.color =
                "oklch(var(--foreground))";
            }}
            onClick={() => {
              document
                .querySelector("#events")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Events
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0 p-0 opacity-50 hover:opacity-100 transition-opacity"
        onClick={() =>
          document
            .querySelector("#events")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span
          className="text-[9px] tracking-[0.2em] uppercase font-medium"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          Scroll
        </span>
        <ChevronDown
          className="h-3.5 w-3.5"
          style={{ color: "oklch(var(--muted-foreground))" }}
        />
      </button>
    </section>
  );
}

/* ─── Events Section ──────────────────────────────────────────────────────── */
function EventsSection() {
  return (
    <section id="events" className="py-24 lg:py-36 px-6 lg:px-8">
      <div
        className="absolute inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(var(--border)), transparent)",
        }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Technical Events */}
        <div className="text-center mb-14">
          <SectionLabel>Technical Events</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            <span className="text-gradient-gold">Ignite</span> Your
            <br />
            Technical Edge
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto text-sm leading-relaxed"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Four high-stakes technical challenges designed to push the
            boundaries of EEE knowledge.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {TECH_EVENTS.map((event, i) => (
            <EventCard
              key={event.title}
              {...event}
              color={event.color as "gold" | "silver"}
              index={i + 1}
            />
          ))}
        </div>

        {/* Non-Technical Events */}
        <div className="text-center mb-14">
          <SectionLabel>Non-Technical Events</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Play Hard, <span className="text-gradient-cyan">Win Harder</span>
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto text-sm leading-relaxed"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Take a break from circuits and code — compete in gaming, strategy,
            and team challenges.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NON_TECH_EVENTS.map((event, i) => (
            <EventCard
              key={event.title}
              {...event}
              color={event.color as "gold" | "silver"}
              index={i + 5}
            />
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
      style={{ borderTop: "1px solid oklch(var(--border))" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(var(--gold) / 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-14">
          <SectionLabel>Rewards</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Certificates, Prizes &amp; Take-Away Kits
          </h2>
          <p
            className="mt-4 max-w-lg mx-auto text-sm"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Every participant wins. The best ones win even bigger.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRIZES.map((prize, i) => {
            const isGold = prize.variant === "gold";
            return (
              <div
                key={prize.title}
                data-ocid={`prizes.item.${i + 1}`}
                className="group p-6 rounded-lg bg-card card-elevated cursor-default"
                style={{
                  border: isGold
                    ? "1px solid oklch(var(--gold) / 0.18)"
                    : "1px solid oklch(var(--border))",
                }}
              >
                <div className="text-2xl mb-4">{prize.icon}</div>
                <h3 className="font-display text-lg font-semibold mb-2 text-foreground">
                  {prize.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  {prize.description}
                </p>
              </div>
            );
          })}
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
    "Technical event participants must carry their bank passbook front sheet.",
    "Unethical behavior leads to immediate disqualification.",
    "The organizing committee reserves the right to modify rules.",
    "Judges' decision is final in all events.",
  ];

  return (
    <section
      id="rules"
      className="py-24 lg:py-36 px-6 lg:px-8"
      style={{ borderTop: "1px solid oklch(var(--border))" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Guidelines</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Rules &amp; Regulations
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Paper Presentation Rules */}
          <div
            data-ocid="rules.panel"
            className="p-6 lg:p-8 rounded-lg bg-card card-elevated"
            style={{
              border: "1px solid oklch(var(--gold) / 0.20)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center"
                style={{
                  background: "oklch(var(--gold) / 0.08)",
                  border: "1px solid oklch(var(--gold) / 0.25)",
                }}
              >
                <BookOpen
                  className="h-4 w-4"
                  style={{ color: "oklch(var(--gold))" }}
                />
              </div>
              <h3 className="font-display text-xl font-semibold text-gradient-gold">
                Paper Presentation Rules
              </h3>
            </div>
            <ul className="space-y-3.5">
              {paperRules.map((rule, idx) => (
                <li
                  key={rule}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  <span
                    className="mt-0.5 w-5 h-5 rounded-sm flex-shrink-0 flex items-center justify-center text-[10px] font-semibold"
                    style={{
                      background: "oklch(var(--gold) / 0.12)",
                      color: "oklch(var(--gold))",
                      border: "1px solid oklch(var(--gold) / 0.3)",
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* General Rules */}
          <div
            data-ocid="rules.card"
            className="p-6 lg:p-8 rounded-lg bg-card card-elevated"
            style={{
              border: "1px solid oklch(var(--border))",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center"
                style={{
                  background: "oklch(0.72 0.04 220 / 0.08)",
                  border: "1px solid oklch(0.72 0.04 220 / 0.25)",
                }}
              >
                <Shield
                  className="h-4 w-4"
                  style={{ color: "oklch(0.72 0.04 220)" }}
                />
              </div>
              <h3 className="font-display text-xl font-semibold text-gradient-cyan">
                General Rules
              </h3>
            </div>
            <ul className="space-y-3.5">
              {generalRules.map((rule, idx) => (
                <li
                  key={rule}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  <span
                    className="mt-0.5 w-5 h-5 rounded-sm flex-shrink-0 flex items-center justify-center text-[10px] font-semibold"
                    style={{
                      background: "oklch(0.72 0.04 220 / 0.10)",
                      color: "oklch(0.72 0.04 220)",
                      border: "1px solid oklch(0.72 0.04 220 / 0.3)",
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
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
      style={{ borderTop: "1px solid oklch(var(--border))" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(var(--gold) / 0.025) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-14">
          <SectionLabel>Registration</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Secure Your <span className="text-gradient-gold">Spot</span>
          </h2>
          <p
            className="mt-4 max-w-lg mx-auto text-sm"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Register now for just ₹150 per head. Limited seats available.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* QR Code */}
          <div className="flex flex-col items-center">
            <div
              data-ocid="register.card"
              className="w-full max-w-sm mx-auto p-8 rounded-lg flex flex-col items-center gap-6 bg-card"
              style={{
                border: "1px solid oklch(var(--gold) / 0.25)",
                boxShadow:
                  "0 2px 12px rgba(0,0,0,0.4), 0 0 40px oklch(var(--gold) / 0.04)",
              }}
            >
              <div className="flex flex-col items-center gap-3">
                <img
                  src="/assets/uploads/WhatsApp-Image-2026-03-02-at-9.18.34-AM-2.jpeg"
                  alt="UPI Payment QR Code"
                  className="w-48 h-48 rounded-md object-contain bg-white p-2"
                  style={{
                    border: "1px solid oklch(var(--border))",
                  }}
                />
                <p
                  className="text-xs text-center"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  UPI ID: karthikapichandi2003@okhdfcbank
                </p>
              </div>

              <div className="text-center">
                <p
                  className="font-display text-3xl font-bold mb-1"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  ₹150
                </p>
                <p
                  className="text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Per Head · All Events Eligible
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            {/* Food highlight */}
            <div
              className="p-5 rounded-lg flex items-start gap-4"
              style={{
                background: "oklch(var(--gold) / 0.05)",
                border: "1px solid oklch(var(--gold) / 0.18)",
              }}
            >
              <span className="text-2xl flex-shrink-0">🍽️</span>
              <div>
                <p
                  className="font-semibold text-sm mb-1"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  Food Provided
                </p>
                <p
                  className="text-sm"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Lunch and refreshments will be provided to all registered
                  participants throughout the event.
                </p>
              </div>
            </div>

            {/* What you get */}
            <div
              className="p-5 rounded-lg"
              style={{
                background: "oklch(var(--card))",
                border: "1px solid oklch(var(--border))",
              }}
            >
              <h4 className="font-semibold text-foreground mb-3 text-sm">
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
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    <span
                      style={{ color: "oklch(var(--gold))", fontWeight: 700 }}
                    >
                      ✦
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key notes */}
            <div
              className="p-5 rounded-lg"
              style={{
                background: "oklch(var(--card))",
                border: "1px solid oklch(var(--border))",
              }}
            >
              <h4 className="font-semibold mb-3 text-sm text-foreground">
                Important Notes
              </h4>
              <ul
                className="space-y-1.5 text-sm"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                <li className="flex items-center gap-2">
                  <span style={{ color: "oklch(var(--gold))" }}>·</span>
                  Maximum 2 events per student
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: "oklch(var(--gold))" }}>·</span>
                  Bring valid college ID card
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: "oklch(var(--gold))" }}>·</span>
                  Time: 9:00 AM – 3:00 PM
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: "oklch(var(--gold))" }}>·</span>
                  March 16, 2026
                </li>
              </ul>
            </div>

            <button
              type="button"
              data-ocid="register.primary_button"
              className="w-full py-4 font-semibold text-sm cursor-pointer flex items-center justify-center gap-2 rounded-sm transition-all duration-200"
              style={{
                background: "oklch(var(--gold))",
                color: "oklch(var(--primary-foreground))",
                border: "none",
              }}
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSeKVC5JVXBknHq2GGhBA4Wosnx_-tjmI64G_fuN4T6HHO9_sQ/viewform?usp=publish-editor",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.filter =
                  "brightness(1.08)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 24px oklch(var(--gold) / 0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.filter = "none";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <Gift className="h-4 w-4" />
              Fill Registration Form
            </button>
          </div>
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
      className="py-24 lg:py-36 px-6 lg:px-8"
      style={{ borderTop: "1px solid oklch(var(--border))" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Get In Touch</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Contact <span className="text-gradient-gold">Us</span>
          </h2>
          <p
            className="mt-4 max-w-md mx-auto text-sm"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Reach out to our coordinators or faculty for registrations and
            queries.
          </p>
        </div>

        {/* Student Coordinators */}
        <p
          className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-5 text-center"
          style={{ color: "oklch(var(--gold))" }}
        >
          Student Coordinators
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {STUDENT_COORDINATORS.map((coordinator, i) => (
            <div
              key={coordinator.name}
              data-ocid={`contact.card.${i + 1}`}
              className="p-5 rounded-lg bg-card card-elevated flex flex-col gap-4"
              style={{
                border: "1px solid oklch(var(--gold) / 0.18)",
              }}
            >
              <div>
                <Badge
                  variant="outline"
                  className="text-[10px] tracking-widest uppercase mb-2 font-medium"
                  style={{
                    border: "1px solid oklch(var(--gold) / 0.25)",
                    color: "oklch(var(--gold))",
                    background: "oklch(var(--gold) / 0.06)",
                  }}
                >
                  Coordinator
                </Badge>
                <h3
                  className="font-display text-lg font-semibold mb-0.5"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {coordinator.name}
                </h3>
                <p
                  className="text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  {coordinator.role}
                </p>
              </div>
              <a
                href={`tel:${coordinator.phone}`}
                data-ocid="contact.link"
                className="flex items-center gap-3 transition-colors group"
                style={{ color: "oklch(var(--muted-foreground))" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "oklch(var(--foreground))";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "oklch(var(--muted-foreground))";
                }}
              >
                <div
                  className="w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "oklch(var(--gold) / 0.08)",
                    border: "1px solid oklch(var(--gold) / 0.20)",
                  }}
                >
                  <Phone
                    className="h-3 w-3"
                    style={{ color: "oklch(var(--gold))" }}
                  />
                </div>
                <span className="text-sm font-medium">{coordinator.phone}</span>
              </a>
              <a
                href={`tel:${coordinator.phone}`}
                data-ocid="contact.primary_button"
              >
                <button
                  type="button"
                  className="w-full py-2 font-medium text-sm cursor-pointer flex items-center justify-center gap-1.5 rounded-sm transition-all duration-200"
                  style={{
                    background: "oklch(var(--gold))",
                    color: "oklch(var(--primary-foreground))",
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.filter =
                      "brightness(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.filter = "none";
                  }}
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call
                </button>
              </a>
            </div>
          ))}
        </div>

        {/* Faculty, HOD, Venue & Event Info */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* HOD Card */}
          <div
            data-ocid="contact.panel"
            className="p-6 rounded-lg bg-card card-elevated h-full"
            style={{ border: "1px solid oklch(var(--border))" }}
          >
            <Badge
              variant="outline"
              className="text-[10px] tracking-widest uppercase mb-3 font-medium"
              style={{
                border: "1px solid oklch(var(--border))",
                color: "oklch(var(--muted-foreground))",
              }}
            >
              HOD / EEE
            </Badge>
            <h3 className="font-display text-xl font-semibold text-gradient-cyan mb-1">
              Dr. NP Ananthamoorthy
            </h3>
            <p
              className="text-sm"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Head of Department — Electrical &amp; Electronics Engineering
            </p>
          </div>

          {/* Faculty Coordinator Card */}
          <div
            data-ocid="contact.card"
            className="p-6 rounded-lg bg-card card-elevated h-full"
            style={{ border: "1px solid oklch(var(--gold) / 0.18)" }}
          >
            <Badge
              variant="outline"
              className="text-[10px] tracking-widest uppercase mb-3 font-medium"
              style={{
                border: "1px solid oklch(var(--gold) / 0.25)",
                color: "oklch(var(--gold))",
                background: "oklch(var(--gold) / 0.06)",
              }}
            >
              Faculty Coordinator
            </Badge>
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: "oklch(var(--gold) / 0.08)",
                  border: "1px solid oklch(var(--gold) / 0.25)",
                }}
              >
                <GraduationCap
                  className="h-4 w-4"
                  style={{ color: "oklch(var(--gold))" }}
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-gradient-gold mb-1">
                  Dr. Joshua Daniel
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Dept of Electrical and Electronics Engineering
                </p>
              </div>
            </div>
          </div>

          {/* Venue Card */}
          <div
            data-ocid="contact.card"
            className="p-6 rounded-lg bg-card card-elevated h-full"
            style={{ border: "1px solid oklch(var(--border))" }}
          >
            <Badge
              variant="outline"
              className="text-[10px] tracking-widest uppercase mb-3 font-medium"
              style={{
                border: "1px solid oklch(var(--border))",
                color: "oklch(var(--muted-foreground))",
              }}
            >
              Venue
            </Badge>
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: "oklch(0.72 0.04 220 / 0.08)",
                  border: "1px solid oklch(0.72 0.04 220 / 0.25)",
                }}
              >
                <MapPin
                  className="h-4 w-4"
                  style={{ color: "oklch(0.72 0.04 220)" }}
                />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold mb-1 text-foreground">
                  Hindusthan College of Engineering and Technology
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Department of EEE
                </p>
              </div>
            </div>
          </div>

          {/* Event Quick Info */}
          <div className="md:col-span-2 lg:col-span-2">
            <div
              className="p-6 rounded-lg h-full bg-card card-elevated"
              style={{
                border: "1px solid oklch(var(--border))",
              }}
            >
              <h4 className="font-semibold text-foreground mb-4 text-sm">
                Event Details
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    label: "Date",
                    value: "March 16, 2026",
                    accent: "oklch(var(--gold))",
                  },
                  {
                    label: "Time",
                    value: "9:00 AM – 3:00 PM",
                    accent: "oklch(var(--foreground))",
                  },
                  {
                    label: "Fee",
                    value: "₹150 / head",
                    accent: "oklch(var(--gold))",
                  },
                  {
                    label: "Events",
                    value: "Max 2 / student",
                    accent: "oklch(var(--foreground))",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <p
                      className="text-[10px] uppercase tracking-wider mb-0.5"
                      style={{ color: "oklch(var(--muted-foreground) / 0.6)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: item.accent }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Email CTA */}
          <a
            href="mailto:elzia2k26@gmail.com"
            data-ocid="contact.link"
            className="block h-full"
          >
            <div
              className="p-5 rounded-lg flex items-center gap-3 cursor-pointer h-full bg-card card-elevated transition-colors duration-200"
              style={{
                border: "1px solid oklch(var(--border))",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(var(--gold) / 0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(var(--border))";
              }}
            >
              <Mail
                className="h-5 w-5 flex-shrink-0"
                style={{ color: "oklch(var(--gold))" }}
              />
              <div>
                <p
                  className="text-xs mb-0.5"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Send Abstract / Queries
                </p>
                <p
                  className="text-sm font-medium hover:underline"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  elzia2k26@gmail.com
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  WhatsApp: 8807502350
                </p>
              </div>
            </div>
          </a>
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
      style={{ borderTop: "1px solid oklch(var(--border))" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/uploads/WhatsApp-Image-2026-03-05-at-12.17.43-PM-1.jpeg"
              alt="ELZIA Logo"
              className="h-7 w-7 object-cover"
              style={{
                borderRadius: "5px",
                border: "1px solid oklch(var(--gold) / 0.4)",
                boxShadow: "0 0 8px oklch(var(--gold) / 0.12)",
              }}
            />
            <div>
              <p
                className="font-display font-semibold text-sm leading-none"
                style={{ color: "oklch(var(--gold))" }}
              >
                ELZIA 2K26
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
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
                  className="text-xs font-medium transition-colors"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "oklch(var(--foreground))";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "oklch(var(--muted-foreground))";
                  }}
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
          <div
            className="flex items-center gap-4 text-xs"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            <a
              href="mailto:elzia2k26@gmail.com"
              data-ocid="footer.link"
              className="font-medium transition-colors hover:underline"
              style={{ color: "oklch(var(--muted-foreground))" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "oklch(var(--foreground))";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "oklch(var(--muted-foreground))";
              }}
            >
              elzia2k26@gmail.com
            </a>
            <a
              href="tel:9585850745"
              data-ocid="footer.link"
              className="font-medium transition-colors"
              style={{ color: "oklch(var(--muted-foreground))" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "oklch(var(--foreground))";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "oklch(var(--muted-foreground))";
              }}
            >
              9585850745
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gold mb-5" />

        {/* Copyright */}
        <p
          className="text-xs text-center"
          style={{ color: "oklch(var(--muted-foreground) / 0.5)" }}
        >
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

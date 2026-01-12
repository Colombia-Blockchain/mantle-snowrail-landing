import { useEffect, useMemo, useRef, useState } from "react";
import {
  Globe,
  ArrowRight,
  ShieldCheck,
  Layers,
  Terminal,
  Cpu,
  Activity,
  Lock,
  Zap,
  Code,
  LayoutGrid,
  TrendingUp,
  Server,
  EyeOff,
  Play,
  Menu,
  X,
  CheckCircle2,
  Boxes,
  Webhook,
  Route,
  Banknote,
  FileText,
  Shield,
  Sparkles,
  Timer,
  Building2,
  Users,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";

/**
 * SNOWRAIL 2026 - CRYPTO->FIAT PAYMENT INFRA (x402)
 * Single-file React component styled with Tailwind
 * Premium dark + glassmorphism + bento + controlled motion
 */

// -----------------------------
// 1) CONFIG
// -----------------------------
const COLORS = {
  bg0: "#070712",
  bg1: "#0a0a16",
  cyan: "#06b6d4",
  purple: "#d946ef",
};

const DICTIONARY = {
  en: {
    nav: {
      product: "Product",
      how: "How it works",
      security: "Security",
      developers: "Developers",
      faq: "FAQ",
      launch: "Request a demo",
      docs: "Read docs",
    },
    hero: {
      badge: "Crypto->Fiat Infrastructure - x402 Protocol",
      headlineA: "Crypto in.",
      headlineB: "Fiat out.",
      subhead:
        "SnowRail is payment infrastructure that routes stablecoins to bank rails with x402 intents, webhooks, reconciliation, and compliance hooks-built for regulated flows and dev velocity.",
      cta: "Request a demo",
      secondary_cta: "Read docs",
      tertiary_cta: "Watch 90s demo",
      proof: "Designed for regulated flows - Idempotent intents - Webhook signed events",
    },
    logos: {
      title: "Integrates with your existing stack",
      note: "Swap these placeholders with real logos when available.",
    },
    how: {
      kicker: "How it works",
      title: "Three steps. One settlement layer.",
      steps: [
        {
          icon: "intent",
          title: "Create an intent (x402)",
          body: "Define payer, amount, currency and policy constraints. Get an idempotent intent_id and a status timeline.",
        },
        {
          icon: "route",
          title: "Route to rails",
          body: "SnowRail selects the best path (stablecoin -> rails) based on availability, cost, and risk policies.",
        },
        {
          icon: "settle",
          title: "Settle + reconcile",
          body: "Funds land in fiat and you get signed webhooks + a ledger view for audit, reconciliation, and reporting.",
        },
      ],
    },
    benefits: {
      kicker: "Why SnowRail",
      title: "Built for conversion, compliance, and speed.",
      cards: {
        big: {
          title: "Settlement to bank in minutes",
          body: "Use one API to accept stablecoins and settle to fiat rails with predictable status updates and retries.",
          meta: "Typical flow: intent -> route -> settle -> reconcile",
        },
        reconciliation: {
          title: "Reconciliation & ledger built-in",
          body: "A unified view of intents, payouts, and bank settlements-no fragmented ops across dashboards.",
          meta: "Export-ready audit logs",
        },
        webhooks: {
          title: "Signed webhooks",
          body: "Real-time events for intent states: created, routed, settled, failed, reversed.",
          meta: "HMAC + idempotency keys",
        },
        policies: {
          title: "Policy engine hooks",
          body: "Plug in KYC/AML, risk rules, limits, and allowlists. Block or route based on compliance.",
          meta: "Composable checks",
        },
        devux: {
          title: "Developer UX first",
          body: "3-5 lines to integrate. Clean SDKs, predictable errors, sandbox mode.",
          meta: "Docs + examples",
        },
        uptime: {
          title: "Observability & SLA ready",
          body: "Status endpoints, request tracing, and deterministic retries built for production.",
          meta: "Designed for scale",
        },
      },
    },
    trust: {
      kicker: "Trust",
      title: "Security & compliance designed in.",
      bullets: [
        "Idempotent intents + deterministic retries",
        "Signed webhooks (HMAC) and replay protection",
        "Audit logs and exportable reconciliation trail",
        "Policy hooks for KYC/AML and risk checks",
        "Encryption in transit and at rest",
        "Separation of duties: keys, policies, and settlement",
      ],
      diagramTitle: "Architecture (simplified)",
      diagram: ["Client", "SnowRail API", "Policy Engine", "Routing", "Bank Rails"],
      note: "Replace policy integrations with your providers (KYC/AML, sanctions, risk).",
    },
    useCases: {
      kicker: "Use cases",
      title: "Where teams win with SnowRail",
      items: [
        {
          icon: "marketplace",
          title: "Marketplace payouts",
          body: "Pay sellers globally while receiving stablecoins. Reduce ops overhead with status + reconciliation.",
          metric: "Fewer failed payouts, faster settlement",
        },
        {
          icon: "payroll",
          title: "Global payroll",
          body: "Automate contractor payments with policy checks and predictable settlement events.",
          metric: "Minutes to settle, not days",
        },
        {
          icon: "checkout",
          title: "Crypto checkout -> fiat",
          body: "Accept stablecoins at checkout and settle to your bank account with webhooks.",
          metric: "Higher conversion, lower friction",
        },
        {
          icon: "invoicing",
          title: "Cross-border invoicing",
          body: "Collect invoices in stablecoins, settle to fiat rails, and reconcile automatically.",
          metric: "Clean audit trail",
        },
        {
          icon: "treasury",
          title: "Treasury ops",
          body: "Route and consolidate liquidity across stablecoins and rails while maintaining compliance constraints.",
          metric: "Unified ops view",
        },
      ],
    },
    dev: {
      kicker: "Developers",
      title: "Ship in a day, not a quarter.",
      desc: "Create intents, subscribe to events, settle to fiat rails. Predictable primitives, minimal surface area.",
      codeTitle: "Example: create an x402 intent",
      endpointsTitle: "Core primitives",
      endpoints: [
        { method: "POST", path: "/v1/intents", desc: "Create an idempotent payment intent" },
        { method: "GET", path: "/v1/intents/{id}", desc: "Fetch intent status + timeline" },
        { method: "POST", path: "/v1/intents/{id}/route", desc: "Trigger routing / settlement" },
        { method: "POST", path: "/v1/webhooks", desc: "Register signed webhooks" },
      ],
      terminalTitle: "CLI / SDK vibe",
      ctaDocs: "Read docs",
    },
    testimonials: {
      kicker: "Proof",
      title: "Built for teams that ship payments",
      items: [
        {
          quote:
            "SnowRail's intent model made our crypto->fiat flow predictable. We finally had clean states, retries, and reconciliation.",
          name: "Head of Payments",
          company: "Fintech (Private)",
        },
        {
          quote:
            "Signed webhooks + audit logs gave our compliance team confidence without slowing down engineering.",
          name: "Engineering Lead",
          company: "Marketplace (Private)",
        },
        {
          quote:
            "Integrating payouts felt like using a modern API: minimal config, clear errors, and fast iteration.",
          name: "Senior Developer",
          company: "Wallet (Private)",
        },
      ],
    },
    faq: {
      kicker: "FAQ",
      title: "Answers to real objections",
      items: [
        {
          q: "How do you handle compliance (KYC/AML) and audit trails?",
          a: "SnowRail supports policy hooks and event trails: you can integrate your providers for KYC/AML/risk checks and export reconciliation logs for audits.",
        },
        {
          q: "How fast is settlement to fiat?",
          a: "Settlement speed depends on rails and region, but SnowRail is designed around quick routing and deterministic retries with real-time state updates via webhooks.",
        },
        {
          q: "Do you support idempotency and safe retries?",
          a: "Yes. Intents are idempotent by default, and the platform uses predictable state transitions and replay-safe webhooks.",
        },
        {
          q: "What does integration look like?",
          a: "Create an intent, route it, and subscribe to webhook events. Most teams integrate in a day with the SDK + examples.",
        },
        {
          q: "Can we start with a sandbox?",
          a: "Yes. Sandbox mode lets you test intents, routing, and webhook flows without touching production rails.",
        },
      ],
    },
    finalCta: {
      title: "Ready to route crypto->fiat payments?",
      sub: "Request a demo to see SnowRail's x402 intent flow, settlement timeline, and reconciliation in action.",
      primary: "Request a demo",
      secondary: "Read docs",
    },
    footer: {
      rights: "(c) 2026 SnowRail. Crypto payment infrastructure with x402.",
      compliance: "Designed for regulated flows - Security-first - Audit-friendly",
      built_on: "API - Webhooks - Intents - Routing - Settlement",
    },
  },
  es: {
    nav: {
      product: "Producto",
      how: "Como funciona",
      security: "Seguridad",
      developers: "Desarrolladores",
      faq: "FAQ",
      launch: "Solicitar demo",
      docs: "Leer docs",
    },
    hero: {
      badge: "Infraestructura Crypto->Fiat - Protocolo x402",
      headlineA: "Crypto entra.",
      headlineB: "Fiat sale.",
      subhead:
        "SnowRail es infraestructura de pagos que enruta stablecoins hacia rails bancarios con intents x402, webhooks, conciliacion y hooks de compliance-hecho para flujos regulados y velocidad de integracion.",
      cta: "Solicitar demo",
      secondary_cta: "Leer docs",
      tertiary_cta: "Ver demo (90s)",
      proof: "Disenado para flujos regulados - Intents idempotentes - Eventos firmados por webhooks",
    },
    logos: {
      title: "Se integra con tu stack actual",
      note: "Reemplaza estos placeholders por logos reales cuando los tengas.",
    },
    how: {
      kicker: "Como funciona",
      title: "Tres pasos. Una capa de settlement.",
      steps: [
        {
          icon: "intent",
          title: "Crea un intent (x402)",
          body: "Define pagador, monto, moneda y restricciones de politica. Obten un intent_id idempotente y un timeline de estados.",
        },
        {
          icon: "route",
          title: "Enruta a rails",
          body: "SnowRail elige la mejor ruta (stablecoin -> rails) segun disponibilidad, costo y politicas de riesgo.",
        },
        {
          icon: "settle",
          title: "Liquida + concilia",
          body: "El dinero llega en fiat y recibes webhooks firmados + vista de ledger para auditoria y conciliacion.",
        },
      ],
    },
    benefits: {
      kicker: "Por que SnowRail",
      title: "Hecho para conversion, compliance y velocidad.",
      cards: {
        big: {
          title: "Settlement a banco en minutos",
          body: "Una sola API para aceptar stablecoins y liquidar en fiat con estados claros y retries predecibles.",
          meta: "Flujo tipico: intent -> route -> settle -> reconcile",
        },
        reconciliation: {
          title: "Conciliacion + ledger",
          body: "Vista unificada de intents, payouts y settlement bancario-sin operaciones fragmentadas.",
          meta: "Logs listos para auditoria",
        },
        webhooks: {
          title: "Webhooks firmados",
          body: "Eventos en tiempo real: created, routed, settled, failed, reversed.",
          meta: "HMAC + idempotencia",
        },
        policies: {
          title: "Hooks de policy engine",
          body: "Integra KYC/AML, reglas de riesgo, limites y allowlists. Bloquea o enruta segun compliance.",
          meta: "Checks componibles",
        },
        devux: {
          title: "Developer UX first",
          body: "3-5 lineas para integrar. SDKs limpios, modo sandbox.",
          meta: "Docs + ejemplos",
        },
        uptime: {
          title: "Observabilidad & SLA",
          body: "Endpoints de estado, trazas y retries deterministas pensados para produccion.",
          meta: "Listo para escala",
        },
      },
    },
    trust: {
      kicker: "Confianza",
      title: "Seguridad y compliance desde el diseno.",
      bullets: [
        "Intents idempotentes + retries deterministas",
        "Webhooks firmados (HMAC) y proteccion anti-replay",
        "Audit logs y rastro de conciliacion exportable",
        "Hooks de policy para KYC/AML y riesgo",
        "Cifrado en transito y en reposo",
        "Separacion de responsabilidades: llaves, politicas y settlement",
      ],
      diagramTitle: "Arquitectura (simple)",
      diagram: ["Cliente", "SnowRail API", "Policy Engine", "Routing", "Rails Bancarios"],
      note: "Cambia integraciones de policy por tus proveedores (KYC/AML, sanciones, riesgo).",
    },
    useCases: {
      kicker: "Casos de uso",
      title: "Donde SnowRail genera impacto",
      items: [
        {
          icon: "marketplace",
          title: "Payouts para marketplaces",
          body: "Paga vendedores globalmente recibiendo stablecoins. Menos soporte gracias a estados + conciliacion.",
          metric: "Menos fallas, settlement rapido",
        },
        {
          icon: "payroll",
          title: "Nomina global",
          body: "Automatiza pagos a contractors con checks de policy y eventos de settlement.",
          metric: "Minutos, no dias",
        },
        {
          icon: "checkout",
          title: "Checkout crypto -> fiat",
          body: "Acepta stablecoins en checkout y liquida a tu cuenta bancaria con webhooks.",
          metric: "Mas conversion, menos friccion",
        },
        {
          icon: "invoicing",
          title: "Facturacion cross-border",
          body: "Cobra en stablecoins, liquida a rails fiat y concilia automaticamente.",
          metric: "Audit trail limpio",
        },
        {
          icon: "treasury",
          title: "Operaciones de tesoreria",
          body: "Enruta y consolida liquidez con restricciones de compliance y vista operativa unificada.",
          metric: "Una sola vista",
        },
      ],
    },
    dev: {
      kicker: "Desarrolladores",
      title: "Integra hoy. Escala manana.",
      desc: "Crea intents, suscribete a eventos y liquida a rails fiat. Primitivas claras, superficie minima.",
      codeTitle: "Ejemplo: crear un intent x402",
      endpointsTitle: "Primitivas core",
      endpoints: [
        { method: "POST", path: "/v1/intents", desc: "Crear intent de pago idempotente" },
        { method: "GET", path: "/v1/intents/{id}", desc: "Ver estado + timeline del intent" },
        { method: "POST", path: "/v1/intents/{id}/route", desc: "Disparar routing / settlement" },
        { method: "POST", path: "/v1/webhooks", desc: "Registrar webhooks firmados" },
      ],
      terminalTitle: "Vibe CLI / SDK",
      ctaDocs: "Leer docs",
    },
    testimonials: {
      kicker: "Prueba",
      title: "Hecho para equipos que envian pagos",
      items: [
        {
          quote:
            "El modelo de intents volvio predecible nuestro flujo crypto->fiat. Por fin tuvimos estados, retries y conciliacion.",
          name: "Head of Payments",
          company: "Fintech (Privado)",
        },
        {
          quote:
            "Webhooks firmados + audit logs le dieron confianza a compliance sin frenar ingenieria.",
          name: "Engineering Lead",
          company: "Marketplace (Privado)",
        },
        {
          quote:
            "Integrar payouts se sintio como usar una API moderna: minimo setup, errores claros y iteracion rapida.",
          name: "Senior Developer",
          company: "Wallet (Privado)",
        },
      ],
    },
    faq: {
      kicker: "FAQ",
      title: "Respuestas a objeciones reales",
      items: [
        {
          q: "Como manejan compliance (KYC/AML) y auditoria?",
          a: "SnowRail soporta hooks de policy y un rastro de eventos: integras tus proveedores de KYC/AML/riesgo y exportas logs de conciliacion para auditorias.",
        },
        {
          q: "Que tan rapido es el settlement a fiat?",
          a: "Depende de rails y region, pero SnowRail esta disenado para routing rapido y retries deterministas con updates en tiempo real via webhooks.",
        },
        {
          q: "Soportan idempotencia y retries seguros?",
          a: "Si. Los intents son idempotentes por defecto y la plataforma usa transiciones de estado predecibles y webhooks a prueba de replay.",
        },
        {
          q: "Como es la integracion?",
          a: "Creas un intent, lo enrutas y te suscribes a eventos. La mayoria de equipos integra en un dia con SDK + ejemplos.",
        },
        {
          q: "Hay sandbox?",
          a: "Si. Sandbox para probar intents, routing y webhooks sin tocar rails productivos.",
        },
      ],
    },
    finalCta: {
      title: "Listo para enrutar pagos crypto->fiat?",
      sub: "Solicita una demo para ver el flujo x402, timeline de settlement y conciliacion en accion.",
      primary: "Solicitar demo",
      secondary: "Leer docs",
    },
    footer: {
      rights: "(c) 2026 SnowRail. Infraestructura de pagos Crypto->Fiat con x402.",
      compliance: "Disenado para flujos regulados - Security-first - Audit-friendly",
      built_on: "API - Webhooks - Intents - Routing - Settlement",
    },
  },
};

// -----------------------------
// 2) UTIL: reveal on scroll
// -----------------------------
function useScrollReveal(disabled: boolean) {
  useEffect(() => {
    if (disabled) return;

    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [disabled]);
}

// -----------------------------
// 3) VISUAL COMPONENTS
// -----------------------------
const Starfield = ({ disabled }: { disabled: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<
    Array<{ x: number; y: number; vx: number; vy: number; r: number; base: string }>
  >([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const pausedRef = useRef(false);

  useEffect(() => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isMobile = () => window.innerWidth < 768;
    const getCount = () => (isMobile() ? 30 : 70);

    const makeParticle = (w: number, h: number) => {
      const cyan = Math.random() > 0.5;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.2,
        base: cyan ? "6, 182, 212" : "217, 70, 239",
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      mouseRef.current = { x: w / 2, y: h / 2 };

      const count = getCount();
      const particles = [];
      for (let i = 0; i < count; i++) particles.push(makeParticle(w, h));
      particlesRef.current = particles;
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (pausedRef.current) return;

      const { w, h } = sizeRef.current;
      ctx.fillStyle = "rgba(10, 10, 22, 0.18)";
      ctx.fillRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p.x += dx * 0.0028;
          p.y += dy * 0.0028;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const a = 0.15 + Math.random() * 0.35;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.base}, ${a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onVis = () => {
      pausedRef.current = document.hidden;
      if (!document.hidden) animate();
      else if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [disabled]);

  if (disabled) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

const SpotlightLink = ({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors duration-300 overflow-hidden group font-medium text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(90px circle at ${position.x}px ${position.y}px, rgba(6, 182, 212, 0.16), transparent 60%)`,
        }}
      />
      <span className="relative z-10">{children}</span>
    </a>
  );
};

const GlassCard = ({
  children,
  className = "",
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) => (
  <div
    className={[
      "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-[32px]",
      "shadow-[0_20px_80px_rgba(0,0,0,.55),0_0_60px_rgba(6,182,212,.10),inset_0_1px_0_rgba(255,255,255,.06)]",
      hover
        ? "transition-all duration-300 hover:bg-white/[0.10] hover:border-cyan-400/30 hover:-translate-y-2 hover:shadow-[0_26px_110px_rgba(0,0,0,.6),0_0_90px_rgba(6,182,212,.18),inset_0_1px_0_rgba(255,255,255,.08)]"
        : "",
      className,
    ].join(" ")}
  >
    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/6 to-purple-500/6 pointer-events-none" />
    {children}
  </div>
);

const Button = ({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
}) => {
  const base =
    "relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-cyan-400/40";
  const primary =
    "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_24px_rgba(6,182,212,0.42)] hover:shadow-[0_0_46px_rgba(6,182,212,0.62)] hover:scale-[1.03]";
  const secondary =
    "bg-white/[0.06] text-white border border-white/10 hover:bg-white/[0.10] hover:border-white/20 hover:-translate-y-0.5";
  const ghost =
    "text-cyan-200 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10";

  const styles = variant === "primary" ? primary : variant === "secondary" ? secondary : ghost;

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`group ${base} ${styles} ${className}`}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`group ${base} ${styles} ${className}`}>
      {inner}
    </button>
  );
};

const SectionHeader = ({
  kicker,
  title,
  center = false,
  desc,
}: {
  kicker?: string;
  title: string;
  center?: boolean;
  desc?: string;
}) => (
  <div className={`${center ? "text-center" : ""} mb-10`} data-reveal>
    {kicker && (
      <div className="text-cyan-300/90 text-xs font-mono tracking-widest uppercase mb-2">
        {kicker}
      </div>
    )}
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
    {desc ? <p className="mt-3 text-gray-300/80 max-w-2xl mx-auto">{desc}</p> : null}
  </div>
);

/** Small icon component */
function CoinsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3c4.418 0 8 1.343 8 3s-3.582 3-8 3-8-1.343-8-3 3.582-3 8-3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity=".9"
      />
      <path
        d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity=".9"
      />
      <path
        d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity=".9"
      />
    </svg>
  );
}

// -----------------------------
// 4) MAIN
// -----------------------------
export default function App() {
  const [lang, setLang] = useState<"en" | "es">("es");
  const [activePersona, setActivePersona] = useState("dev");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const t = DICTIONARY[lang];

  useScrollReveal(reduceMotion);

  useEffect(() => {
    const onHash = () => setMobileOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVideoOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const logos = [
    { name: "BANK RAILS", icon: <Building2 size={18} /> },
    { name: "STABLECOINS", icon: <CoinsIcon /> },
    { name: "WEBHOOKS", icon: <Webhook size={18} /> },
    { name: "RISK / AML", icon: <Shield size={18} /> },
    { name: "LEDGER", icon: <FileText size={18} /> },
    { name: "SDK", icon: <Boxes size={18} /> },
  ];

  const personas = {
    cfo: {
      label: lang === "en" ? "CFO / Finance" : "CFO / Finanzas",
      icon: <TrendingUp />,
      head: lang === "en" ? "Unified payments visibility" : "Visibilidad unificada de pagos",
      body:
        lang === "en"
          ? "One timeline for intents, settlements, and reconciliation-built for audit and reporting."
          : "Un solo timeline para intents, settlement y conciliacion-listo para auditoria y reporting.",
    },
    founder: {
      label: lang === "en" ? "Founders" : "Fundadores",
      icon: <Activity />,
      head: lang === "en" ? "Ship global payouts fast" : "Lanza payouts globales rapido",
      body:
        lang === "en"
          ? "Turn a complex crypto->fiat flow into a predictable API product with clear states."
          : "Convierte un flujo crypto->fiat complejo en un producto API predecible con estados claros.",
    },
    dev: {
      label: lang === "en" ? "Developers" : "Desarrolladores",
      icon: <Code />,
      head: lang === "en" ? "API-first, minimal surface area" : "API-first, superficie minima",
      body:
        lang === "en"
          ? "Create an intent, route it, receive signed webhooks. That's the whole model."
          : "Crea un intent, enrutalo, recibe webhooks firmados. Ese es el modelo.",
    },
    partner: {
      label: lang === "en" ? "Partners" : "Partners",
      icon: <Layers />,
      head: lang === "en" ? "Composable integrations" : "Integraciones componibles",
      body:
        lang === "en"
          ? "Plug in policy providers and rails. Offer compliant flows without reinventing the stack."
          : "Conecta proveedores de policy y rails. Ofrece flujos con compliance sin reinventar el stack.",
    },
  };

  const useCaseIcon = (key: string) => {
    switch (key) {
      case "marketplace":
        return <Users className="text-cyan-300" />;
      case "payroll":
        return <BadgeCheck className="text-cyan-300" />;
      case "checkout":
        return <Zap className="text-cyan-300" />;
      case "invoicing":
        return <FileText className="text-cyan-300" />;
      case "treasury":
        return <LayoutGrid className="text-cyan-300" />;
      default:
        return <Sparkles className="text-cyan-300" />;
    }
  };

  const howIcon = (key: string) => {
    switch (key) {
      case "intent":
        return <Boxes className="text-cyan-300" />;
      case "route":
        return <Route className="text-cyan-300" />;
      case "settle":
        return <Banknote className="text-cyan-300" />;
      default:
        return <Sparkles className="text-cyan-300" />;
    }
  };

  return (
    <div
      className="min-h-screen text-white font-sans selection:bg-cyan-500/30 relative overflow-x-hidden"
      style={{ backgroundColor: COLORS.bg1 }}
    >
      <style>{`
        /* animated mesh background helpers */
        .mesh {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .blob {
          position: absolute;
          width: 540px;
          height: 540px;
          filter: blur(70px);
          opacity: 0.35;
          border-radius: 999px;
          transform: translate3d(0,0,0);
        }
        .blob.cyan { background: radial-gradient(circle at 30% 30%, rgba(6,182,212,.85), transparent 60%); }
        .blob.purple { background: radial-gradient(circle at 40% 40%, rgba(217,70,239,.75), transparent 60%); }
        .blob.blue { background: radial-gradient(circle at 40% 40%, rgba(59,130,246,.55), transparent 60%); }

        /* subtle film grain */
        .noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.22'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
          opacity: .20;
          pointer-events: none;
        }

        /* motion */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0.01; transform: translateY(24px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .float-6 { animation: float 6s ease-in-out infinite; }
        .float-7 { animation: float 7s ease-in-out infinite; }
        .float-8 { animation: float 8s ease-in-out infinite; }
        .spin-slow { animation: spinSlow 12s linear infinite; }

        /* reveal on scroll */
        [data-reveal] {
          opacity: 0.01;
          transform: translateY(24px);
          filter: blur(6px);
        }
        .is-visible[data-reveal] {
          animation: fadeIn .7s cubic-bezier(.2,.8,.2,1) both;
        }

        /* shimmer text */
        .shimmer-text {
          background: linear-gradient(to right, #fff 18%, ${COLORS.purple} 42%, ${COLORS.cyan} 62%, #fff 82%);
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          animation: shimmer 6s linear infinite;
        }
        @keyframes shimmer { to { background-position: 200% center; } }
      `}</style>

      {/* Background layers */}
      <div className="mesh">
        <div className="blob cyan" style={{ left: "-120px", top: "-140px" }} />
        <div className="blob purple" style={{ right: "-140px", top: "80px" }} />
        <div className="blob blue" style={{ left: "25%", bottom: "-220px" }} />
        <div className="noise" />
      </div>

      <Starfield disabled={reduceMotion} />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a16]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a
            href="#hero"
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 rounded-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <Zap size={18} className="text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              SnowRail<span className="text-cyan-400">.OS</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-2">
            <SpotlightLink href="#product">{t.nav.product}</SpotlightLink>
            <SpotlightLink href="#how">{t.nav.how}</SpotlightLink>
            <SpotlightLink href="#security">{t.nav.security}</SpotlightLink>
            <SpotlightLink href="#developers">{t.nav.developers}</SpotlightLink>
            <SpotlightLink href="#faq">{t.nav.faq}</SpotlightLink>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
              aria-label="Toggle language"
            >
              <Globe size={14} />
              {lang.toUpperCase()}
            </button>

            <Button variant="primary" href="#final" className="hidden sm:inline-flex">
              {t.nav.launch} <ArrowRight size={18} />
            </Button>

            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.10] focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#0a0a16]/92 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-4 grid gap-2">
              <div className="flex items-center justify-between pb-2">
                <button
                  onClick={() => setLang(lang === "en" ? "es" : "en")}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs hover:bg-white/10 transition-colors"
                >
                  <Globe size={14} />
                  {lang.toUpperCase()}
                </button>
                <Button variant="primary" href="#final" onClick={() => setMobileOpen(false)}>
                  {t.nav.launch} <ArrowRight size={18} />
                </Button>
              </div>

              <SpotlightLink href="#product" onClick={() => setMobileOpen(false)}>
                {t.nav.product}
              </SpotlightLink>
              <SpotlightLink href="#how" onClick={() => setMobileOpen(false)}>
                {t.nav.how}
              </SpotlightLink>
              <SpotlightLink href="#security" onClick={() => setMobileOpen(false)}>
                {t.nav.security}
              </SpotlightLink>
              <SpotlightLink href="#developers" onClick={() => setMobileOpen(false)}>
                {t.nav.developers}
              </SpotlightLink>
              <SpotlightLink href="#faq" onClick={() => setMobileOpen(false)}>
                {t.nav.faq}
              </SpotlightLink>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative pt-32 pb-20 px-6 z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8" data-reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              {t.hero.badge}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              {t.hero.headlineA} <span className="shimmer-text">{t.hero.headlineB}</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300/80 max-w-xl leading-relaxed">
              {t.hero.subhead}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary" href="#final">
                {t.hero.cta} <ArrowRight size={18} />
              </Button>

              <Button variant="secondary" href="#developers">
                {t.hero.secondary_cta} <Code size={18} />
              </Button>

              <Button variant="ghost" onClick={() => setVideoOpen(true)} className="px-5">
                <Play size={18} /> {t.hero.tertiary_cta}
              </Button>
            </div>

            <div className="text-sm text-gray-400 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-cyan-300" />
              <span>{t.hero.proof}</span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative h-[520px] w-full flex items-center justify-center" data-reveal>
            <div className="relative w-52 h-52 rounded-full border border-cyan-400/25 bg-gradient-to-b from-[#0a0a16] to-[#14142a] shadow-[0_0_80px_rgba(6,182,212,0.22)] flex items-center justify-center z-20 float-6">
              <div className="absolute inset-0 rounded-full border border-cyan-400/20 spin-slow" />
              <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 blur-2xl" />
              <div className="text-center relative z-10">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">
                  SnowRail
                </div>
                <div className="text-[10px] tracking-widest text-gray-500 mt-1">
                  x402 INTENT LAYER
                </div>
              </div>
            </div>

            <GlassCard className="absolute top-10 left-6 w-44 p-4 z-10 float-7">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-300" />
                <span className="text-xs font-bold text-gray-200">Intent Status</span>
              </div>
              <div className="text-sm text-gray-300/80">
                created - routed - <span className="text-white font-semibold">settled</span>
              </div>
              <div className="text-[11px] text-gray-500 mt-2 font-mono">idempotency_key: on</div>
            </GlassCard>

            <GlassCard className="absolute bottom-16 right-0 w-52 p-4 z-30 float-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-purple-300" />
                <span className="text-xs font-bold text-gray-200">Settlement</span>
              </div>
              <div className="text-sm text-gray-300/80">
                stablecoin - rails - <span className="text-white font-semibold">bank</span>
              </div>
              <div className="text-[11px] text-gray-500 mt-2 font-mono">webhooks: signed</div>
            </GlassCard>

            <GlassCard className="absolute bottom-40 left-16 w-48 p-4 z-10 float-7">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-300" />
                <span className="text-xs font-bold text-gray-200">Reconciliation</span>
              </div>
              <div className="text-sm text-gray-300/80">ledger view + exportable audit logs</div>
              <div className="text-[11px] text-gray-500 mt-2 font-mono">trace_id: enabled</div>
            </GlassCard>

            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
              <line
                x1="26%"
                y1="24%"
                x2="50%"
                y2="50%"
                stroke="url(#lineGrad)"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <line
                x1="78%"
                y1="78%"
                x2="50%"
                y2="50%"
                stroke="url(#lineGrad)"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <line
                x1="35%"
                y1="70%"
                x2="50%"
                y2="50%"
                stroke="url(#lineGrad)"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={COLORS.cyan} />
                  <stop offset="100%" stopColor={COLORS.purple} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* LOGO WALL */}
      <section className="relative py-10 px-6 z-10">
        <div className="max-w-7xl mx-auto" data-reveal>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
            <div>
              <div className="text-sm text-gray-400">{t.logos.title}</div>
              <div className="text-xs text-gray-600 mt-1">{t.logos.note}</div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1.5">
              <Timer size={14} className="text-cyan-300" />
              <span>Sandbox + signed webhooks + idempotency</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {logos.map((l, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-[20px] px-4 py-3 flex items-center justify-center gap-2 text-gray-300/80 opacity-80 hover:opacity-100 transition"
              >
                <span className="text-cyan-300/90">{l.icon}</span>
                <span className="text-xs font-bold tracking-wider">{l.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT / VIDEO DEMO */}
      <section id="product" className="relative py-20 px-6 z-10 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            kicker={lang === "en" ? "Product" : "Producto"}
            title={lang === "en" ? "See the intent timeline" : "Mira el timeline de intents"}
            center
          />

          <div
            className="group relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(217,70,239,0.22)] transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_85px_rgba(217,70,239,0.38)] border border-purple-500/25"
            data-reveal
          >
            <div className="aspect-video bg-[#0f0f1e] relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

              <button
                className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                onClick={() => setVideoOpen(true)}
                aria-label="Open video demo"
              >
                <Play size={34} className="ml-1 text-white fill-white" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <div className="text-xs text-purple-300 font-mono mb-1">LIVE FLOW</div>
                  <div className="text-lg font-bold">
                    {lang === "en"
                      ? "From stablecoin to bank settlement"
                      : "De stablecoin a settlement bancario"}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="text-xs text-gray-400">90s</div>
                  <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-cyan-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Persona selector */}
          <div className="mt-14" data-reveal>
            <h3 className="text-center text-2xl md:text-3xl font-bold mb-8">
              {lang === "en"
                ? "Designed for teams shipping payments"
                : "Disenado para equipos que envian pagos"}
            </h3>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 md:w-64 shrink-0">
                {Object.keys(personas).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActivePersona(key)}
                    className={`px-6 py-4 text-left rounded-xl transition-all duration-300 flex items-center justify-between group border ${
                      activePersona === key
                        ? "bg-white/10 text-white border-white/10 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                        : "border-transparent text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)]"
                    }`}
                  >
                    <span className="font-medium">
                      {personas[key as keyof typeof personas].label}
                    </span>
                    <div
                      className={`w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-300 ${
                        activePersona === key
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex-1">
                <GlassCard className="h-full p-8 md:p-12 border-cyan-500/20">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6 text-cyan-300">
                        {personas[activePersona as keyof typeof personas].icon}
                      </div>
                      <h4 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                        {personas[activePersona as keyof typeof personas].head}
                      </h4>
                      <p className="text-lg text-gray-300/85 leading-relaxed">
                        {personas[activePersona as keyof typeof personas].body}
                      </p>
                    </div>

                    {activePersona === "dev" && (
                      <div className="mt-8 p-4 rounded-lg bg-black/50 font-mono text-sm border border-white/10">
                        <div className="text-gray-500 mb-2">// create x402 intent</div>
                        <div className="text-purple-300">
                          const <span className="text-white">intent</span> ={" "}
                          <span className="text-cyan-300">await</span>{" "}
                          <span className="text-yellow-200">snowrail</span>.intents.create(
                          {"{"}
                          <br />
                          &nbsp;&nbsp;amount: <span className="text-green-300">"2500.00"</span>,
                          <br />
                          &nbsp;&nbsp;currency: <span className="text-green-300">"USD"</span>,<br />
                          &nbsp;&nbsp;source: <span className="text-green-300">"USDC"</span>,<br />
                          &nbsp;&nbsp;destination:{" "}
                          <span className="text-green-300">"BANK_RAILS"</span>,<br />
                          &nbsp;&nbsp;idempotency_key:{" "}
                          <span className="text-green-300">"inv_10293"</span>
                          <br />
                          {"}"}
                          );
                        </div>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative py-20 px-6 z-10 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeader kicker={t.how.kicker} title={t.how.title} center />

          <div className="grid md:grid-cols-3 gap-4">
            {t.how.steps.map((s, idx) => (
              <GlassCard key={idx} className="p-7" hover data-reveal>
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-5">
                  {howIcon(s.icon)}
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-300/80 leading-relaxed">{s.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO BENEFITS */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader kicker={t.benefits.kicker} title={t.benefits.title} center />

          <div className="grid lg:grid-cols-12 gap-4">
            <GlassCard className="p-8 lg:col-span-7" hover data-reveal>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-3">
                <Timer size={14} /> SETTLEMENT
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">{t.benefits.cards.big.title}</h3>
              <p className="text-gray-300/80 leading-relaxed max-w-xl">
                {t.benefits.cards.big.body}
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="text-xs text-gray-400 mb-2">{t.benefits.cards.big.meta}</div>
                <div className="flex flex-wrap items-center gap-2">
                  {["intent", "route", "settle", "reconcile"].map((k) => (
                    <span
                      key={k}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.06] border border-white/10 text-gray-200"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 lg:col-span-5" hover data-reveal>
              <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-3">
                <FileText size={14} /> LEDGER
              </div>
              <h3 className="text-2xl font-bold mb-3">{t.benefits.cards.reconciliation.title}</h3>
              <p className="text-gray-300/80 leading-relaxed">
                {t.benefits.cards.reconciliation.body}
              </p>
              <div className="mt-4 text-xs text-gray-500">
                {t.benefits.cards.reconciliation.meta}
              </div>
            </GlassCard>

            <GlassCard className="p-7 lg:col-span-4" hover data-reveal>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-3">
                <Webhook size={14} /> EVENTS
              </div>
              <h3 className="text-xl font-bold mb-2">{t.benefits.cards.webhooks.title}</h3>
              <p className="text-gray-300/80 leading-relaxed">{t.benefits.cards.webhooks.body}</p>
              <div className="mt-4 text-xs text-gray-500">{t.benefits.cards.webhooks.meta}</div>
            </GlassCard>

            <GlassCard className="p-7 lg:col-span-4" hover data-reveal>
              <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-3">
                <ShieldCheck size={14} /> POLICY
              </div>
              <h3 className="text-xl font-bold mb-2">{t.benefits.cards.policies.title}</h3>
              <p className="text-gray-300/80 leading-relaxed">{t.benefits.cards.policies.body}</p>
              <div className="mt-4 text-xs text-gray-500">{t.benefits.cards.policies.meta}</div>
            </GlassCard>

            <GlassCard className="p-7 lg:col-span-4" hover data-reveal>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-3">
                <Code size={14} /> DEV UX
              </div>
              <h3 className="text-xl font-bold mb-2">{t.benefits.cards.devux.title}</h3>
              <p className="text-gray-300/80 leading-relaxed">{t.benefits.cards.devux.body}</p>
              <div className="mt-4 text-xs text-gray-500">{t.benefits.cards.devux.meta}</div>
            </GlassCard>

            <GlassCard className="p-7 lg:col-span-12" hover data-reveal>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-3">
                    <Activity size={14} /> RELIABILITY
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t.benefits.cards.uptime.title}</h3>
                  <p className="text-gray-300/80 leading-relaxed">{t.benefits.cards.uptime.body}</p>
                  <div className="mt-3 text-xs text-gray-500">{t.benefits.cards.uptime.meta}</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5 min-w-[260px]">
                  <div className="text-xs text-gray-400 mb-2">Status timeline</div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(34,197,94,.6)]" />
                    <span className="text-sm font-semibold">Operational</span>
                    <span className="ml-auto text-xs font-mono text-gray-400">
                      trace_id enabled
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* TRUST / SECURITY */}
      <section id="security" className="relative py-20 px-6 z-10 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeader kicker={t.trust.kicker} title={t.trust.title} center />

          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <GlassCard className="p-8" data-reveal>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="text-purple-300" />
                <h3 className="text-xl font-bold">
                  {lang === "en" ? "Controls" : "Controles"}
                </h3>
              </div>

              <ul className="space-y-3">
                {t.trust.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-gray-300/85">
                    <span className="mt-0.5 text-cyan-300">
                      <CheckCircle2 size={16} />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 text-xs text-gray-500">{t.trust.note}</div>
            </GlassCard>

            <GlassCard className="p-8" data-reveal>
              <div className="flex items-center gap-2 mb-4">
                <LayoutGrid className="text-cyan-300" />
                <h3 className="text-xl font-bold">{t.trust.diagramTitle}</h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <div className="grid grid-cols-5 gap-2 items-center">
                  {t.trust.diagram.map((node, idx) => (
                    <div key={idx} className="text-center">
                      <div className="rounded-xl border border-white/10 bg-white/[0.06] py-3 px-2 text-xs font-bold">
                        {node}
                      </div>
                      {idx < t.trust.diagram.length - 1 && (
                        <div className="mx-auto my-2 h-[2px] w-8 bg-gradient-to-r from-cyan-400/70 to-purple-400/70 rounded-full" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="text-xs font-mono text-cyan-300 mb-2">WEBHOOKS</div>
                    <div className="text-sm text-gray-300/80">
                      signed_events + replay protection
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="text-xs font-mono text-purple-300 mb-2">AUDIT</div>
                    <div className="text-sm text-gray-300/80">ledger view + export trail</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-gray-400">
                <Lock size={14} className="text-purple-300" />
                <span>
                  {lang === "en"
                    ? "Security-first primitives by default."
                    : "Primitivas security-first por defecto."}
                </span>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section id="use-cases" className="relative py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader kicker={t.useCases.kicker} title={t.useCases.title} center />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.useCases.items.map((u, idx) => (
              <GlassCard key={idx} className="p-7" hover data-reveal>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                    {useCaseIcon(u.icon)}
                  </div>
                  <div className="text-xs font-mono text-gray-400">{u.metric}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{u.title}</h3>
                <p className="text-gray-300/80 leading-relaxed">{u.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* DEVELOPERS */}
      <section id="developers" className="relative py-20 px-6 z-10 scroll-mt-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeader kicker={t.dev.kicker} title={t.dev.title} desc={t.dev.desc} />

            <GlassCard className="p-7 mb-4" data-reveal>
              <div className="flex items-center gap-2 mb-4">
                <Server className="text-cyan-300" />
                <h3 className="text-lg font-bold">{t.dev.endpointsTitle}</h3>
              </div>

              <div className="space-y-3">
                {t.dev.endpoints.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/30 p-4"
                  >
                    <div className="text-xs font-mono">
                      <span className="text-cyan-300">{e.method}</span>{" "}
                      <span className="text-gray-200">{e.path}</span>
                    </div>
                    <div className="ml-auto text-xs text-gray-400">{e.desc}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex gap-3">
                <Button variant="secondary" href="#final">
                  {t.nav.launch} <ArrowRight size={18} />
                </Button>
                <Button variant="ghost" href="#final">
                  {t.dev.ctaDocs} <FileText size={18} />
                </Button>
              </div>
            </GlassCard>

            <GlassCard className="p-7" data-reveal>
              <div className="flex items-center gap-2 mb-3">
                <Code className="text-purple-300" />
                <h3 className="text-lg font-bold">{t.dev.codeTitle}</h3>
              </div>

              <pre className="text-sm font-mono bg-black/50 border border-white/10 rounded-xl p-4 overflow-x-auto">
                {`import { SnowRail } from "@snowrail/sdk";

const snowrail = new SnowRail({
  apiKey: process.env.SNOWRAIL_API_KEY,
  env: "sandbox"
});

const intent = await snowrail.intents.create({
  amount: "2500.00",
  currency: "USD",
  source: "USDC",
  destination: "BANK_RAILS",
  idempotency_key: "inv_10293"
});

// Subscribe to: intent.routed, intent.settled, intent.failed
`}
              </pre>

              <div className="mt-3 text-xs text-gray-500">
                {lang === "en"
                  ? "Tip: verify webhook signatures and use idempotency keys on retries."
                  : "Tip: valida firmas de webhooks y usa idempotency keys en reintentos."}
              </div>
            </GlassCard>
          </div>

          {/* Terminal */}
          <div className="flex flex-col justify-start" data-reveal>
            <div className="rounded-2xl overflow-hidden bg-[#0f0f1e] border border-white/10 shadow-2xl">
              <div className="bg-[#1a1a2e] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="ml-2 text-xs text-gray-500 font-mono">{t.dev.terminalTitle}</div>
              </div>
              <div className="p-6 font-mono text-sm space-y-4">
                <div>
                  <span className="text-green-400">-&gt;</span>{" "}
                  <span className="text-cyan-300">~</span> npm install @snowrail/sdk
                  <div className="text-gray-500 text-xs mt-1">added 18 packages in 1.1s</div>
                </div>

                <div>
                  <span className="text-green-400">-&gt;</span>{" "}
                  <span className="text-cyan-300">~</span> node create_intent.js
                  <div className="text-gray-300 mt-2 leading-relaxed">
                    [SnowRail] <span className="text-green-400">CONNECTED</span> (sandbox)
                    <br />
                    [Intent] created - routed
                    <br />
                    [Routing] stablecoin - rails
                    <br />
                    <span className="text-cyan-300">[Webhook]</span> intent.settled (signed)
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <div className="text-xs text-gray-400 mb-2">Event payload (preview)</div>
                  <div className="text-xs text-gray-300">
                    {
                      '{"type":"intent.settled","intent_id":"int_8a...2f9","trace_id":"tr_19...ab1"}'
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
              <Terminal size={14} className="text-cyan-300" />
              <span>
                {lang === "en"
                  ? "Predictable states + signed events = fewer edge cases."
                  : "Estados predecibles + eventos firmados = menos edge cases."}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader kicker={t.testimonials.kicker} title={t.testimonials.title} center />

          <div className="grid md:grid-cols-3 gap-4">
            {t.testimonials.items.map((x, i) => (
              <GlassCard key={i} className="p-7" hover data-reveal>
                <div className="text-sm text-gray-200 leading-relaxed">"{x.quote}"</div>
                <div className="mt-5 pt-5 border-t border-white/10">
                  <div className="text-sm font-bold">{x.name}</div>
                  <div className="text-xs text-gray-400">{x.company}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-20 px-6 z-10 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeader kicker={t.faq.kicker} title={t.faq.title} center />

          <div className="space-y-3">
            {t.faq.items.map((item, idx) => {
              const open = faqOpen === idx;
              return (
                <GlassCard key={idx} className="p-0" data-reveal>
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-cyan-400/40 rounded-2xl"
                    onClick={() => setFaqOpen(open ? -1 : idx)}
                    aria-expanded={open}
                  >
                    <span className="font-bold">{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <div className="px-6 pb-6 text-gray-300/85 leading-relaxed">{item.a}</div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="final" className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto" data-reveal>
          <GlassCard className="p-10 md:p-14 border-cyan-400/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {t.finalCta.title}
                </h2>
                <p className="mt-3 text-gray-300/80 max-w-2xl">{t.finalCta.sub}</p>

                <div className="mt-6 flex flex-wrap gap-3 text-xs text-gray-400">
                  <span className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1.5">
                    <ShieldCheck size={14} className="text-cyan-300" />
                    compliance hooks
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1.5">
                    <Webhook size={14} className="text-cyan-300" />
                    signed webhooks
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1.5">
                    <Boxes size={14} className="text-cyan-300" />
                    idempotent intents
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 min-w-[260px]">
                <Button variant="primary" href="#hero">
                  {t.finalCta.primary} <ArrowRight size={18} />
                </Button>
                <Button variant="secondary" href="#developers">
                  {t.finalCta.secondary} <FileText size={18} />
                </Button>
                <Button variant="ghost" onClick={() => setVideoOpen(true)}>
                  <Play size={18} /> {lang === "en" ? "Watch demo" : "Ver demo"}
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/5 bg-[#05050c] pt-16 pb-10 px-6 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="font-bold text-xl tracking-tight mb-2">SnowRail.OS</div>
            <div className="text-sm text-gray-500">{t.footer.rights}</div>
            <div className="text-xs text-gray-600 mt-1">{t.footer.built_on}</div>
          </div>

          <div className="flex gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex flex-col items-center">
              <Cpu size={24} />
              <span className="text-[10px] font-bold mt-1">INTENTS</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck size={24} />
              <span className="text-[10px] font-bold mt-1">POLICY</span>
            </div>
            <div className="flex flex-col items-center">
              <EyeOff size={24} />
              <span className="text-[10px] font-bold mt-1">SIGNATURES</span>
            </div>
            <div className="flex flex-col items-center">
              <Server size={24} />
              <span className="text-[10px] font-bold mt-1">RAILS</span>
            </div>
          </div>

          <div className="text-xs text-gray-400 border border-white/10 px-3 py-1 rounded-full">
            {t.footer.compliance}
          </div>
        </div>
      </footer>

      {/* VIDEO MODAL */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Video demo modal"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setVideoOpen(false)}
          />
          <div className="relative w-full max-w-4xl">
            <GlassCard className="p-0 overflow-hidden border-white/15">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.05]">
                <div className="text-sm font-bold">
                  {lang === "en" ? "SnowRail Demo (placeholder)" : "Demo SnowRail (placeholder)"}
                </div>
                <button
                  className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.10] inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                  onClick={() => setVideoOpen(false)}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="aspect-video bg-[#0f0f1e] flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="text-cyan-300 font-mono text-xs tracking-widest mb-2">
                    EMBED YOUR VIDEO HERE
                  </div>
                  <div className="text-lg font-bold mb-2">
                    {lang === "en"
                      ? "Add a real video embed for maximum conversion."
                      : "Agrega un embed real para maxima conversion."}
                  </div>
                  <div className="text-sm text-gray-400">
                    {lang === "en"
                      ? "Tip: keep it 60-120 seconds, show the intent timeline + webhook events."
                      : "Tip: 60-120s, muestra timeline del intent + eventos por webhooks."}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
}

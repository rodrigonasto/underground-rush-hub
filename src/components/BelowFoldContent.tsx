import { useState, useEffect, useRef, useMemo, lazy, Suspense } from "react";
import { Download, Check, X, Smartphone, ShieldCheck, Zap, Star, Search, ChevronRight, Sparkles } from "lucide-react";
import GameCover from "@/components/GameCover";
import { CDN_BASE_URL } from "@/lib/cdn";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const VTurbPlayer = lazy(() => import("@/components/VTurbPlayer"));

const categories = [
  {
    label: "⚽ Esportes",
    games: [
      "DFL26 Mobile", "Pack 8 Jogos", "PES eFootball 2026", "Bomba Patch 2025",
      "PES 25", "Bomba Patch Cazé TV", "PES 2017", "PES 2012", "PES 2013",
      "PES 2014", "eFootball 2024", "FC 25", "Bomba Patch 2007", "Bomba Patch 2026",
    ],
  },
  {
    label: "⚔️ God of War",
    games: ["God of War 2", "God of War 1", "GoW Ghost of Sparta", "GoW Chains of Olympus"],
  },
  {
    label: "🚗 GTA",
    games: ["GTA V", "GTA Brasil", "GTA San Andreas", "GTA SA Definitive", "GTA Liberty City", "GTA Vice City"],
  },
  {
    label: "🏎️ Corrida",
    games: [
      "Midnight Club 3", "NFS Underground 2", "NFS Underground", "NFS Most Wanted",
      "Gran Turismo 4", "NFS ProStreet", "Burnout 3", "Vigilante 8",
      "Midnight Club LA", "NFS Carbon", "MX vs ATV", "Burnout Dominator",
      "Downhill Domination", "Driver 2",
    ],
  },
  {
    label: "⚡ Ação",
    games: [
      "Black + GoW 1", "Black Hack Edition", "RE4 + Vice City", "Bully PT-BR",
      "Resident Evil 3", "Silent Hill 3", "Battlefield 2", "Call of Duty 3",
      "CoD World at War", "Red Dead Revolver", "Sniper Elite", "Hitman Blood Money",
      "Medal of Honor", "MoH Vanguard", "Metal Gear Solid 3", "Shadow of Colossus",
      "Def Jam Fight", "Tekken 5", "Spider-Man 2", "Spider-Man 3",
      "Príncipe da Pérsia", "Marvel Ultimate Alliance", "Inferno de Dante",
      "Assassin's Creed", "25 to Life", "Soul Calibur", "Daxter",
      "Van Helsing", "Urban Reign", "Darkwatch",
    ],
  },
  {
    label: "⭐ Clássicos & Animes",
    games: [
      "Naruto Shippuden 5", "Guitar Hero III", "Naruto Legends", "MK Unchained",
      "Dragon Ball BT4", "DBZ Shin Budokai", "Jackie Chan", "Os Incríveis",
      "MK Armageddon", "Ben 10",
    ],
  },
];

interface BelowFoldContentProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  downloadModalOpen: boolean;
  setDownloadModalOpen: (open: boolean) => void;
  navigate: (path: string) => void;
}

const PACK_IMAGE_CDN = `${CDN_BASE_URL}/pack-image.webp`;

const PackImage = () => (
  <div className="rounded-xl overflow-hidden mb-6">
    <img
      src={PACK_IMAGE_CDN}
      alt="Pack com todos os jogos"
      className="w-full"
      loading="lazy"
      decoding="async"
      width={600}
      height={400}
    />
  </div>
);

/** Renders a category only when it enters the viewport */
const LazyCategory = ({ cat }: { cat: { label: string; games: string[] } }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-10 last:mb-0">
      <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
        {cat.label}
        <span className="h-px flex-1 bg-border" />
        <span className="text-[10px] text-muted-foreground font-normal">{cat.games.length} jogos</span>
      </h3>
      {visible ? (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-2.5">
          {cat.games.map((name) => (
            <div key={name} className="group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden border border-border/50 group-hover:border-primary/40 transition-all bg-muted">
                <GameCover name={name} className="w-full h-full object-cover" />
              </div>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground text-center mt-1.5 truncate leading-tight">{name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-2.5"
          style={{ minHeight: `${Math.ceil(cat.games.length / 4) * 120}px` }}
        />
      )}
    </div>
  );
};

const TutorialSection = () => {
  const [platform, setPlatform] = useState<"android" | "ios">(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    return /iPhone|iPad|iPod/i.test(ua) ? "ios" : "android";
  });

  return (
    <section id="tutorial" className="px-5 pb-14 pt-4">
      <div className="container max-w-lg mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Tutorial
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">COMO INSTALAR NO CELULAR</h2>
          <p className="text-muted-foreground text-sm mt-2">
            Assista ao vídeo abaixo e siga o passo a passo para rodar Need for Speed Underground 2 no celular.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setPlatform("android")}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
              platform === "android" ? "bg-primary text-primary-foreground glow-primary" : "glass-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xl">🤖</span> Android
          </button>
          <button
            onClick={() => setPlatform("ios")}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
              platform === "ios" ? "bg-primary text-primary-foreground glow-primary" : "glass-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xl">🍎</span> iPhone
          </button>
        </div>

        <div style={{ display: platform === "android" ? "block" : "none" }}>
          <div className="space-y-4">
            <h3 className="text-base font-bold text-foreground text-center">Tutorial Android</h3>
            <Suspense fallback={<div className="w-full bg-muted animate-pulse rounded-2xl" style={{ aspectRatio: "16/9" }} />}>
              <VTurbPlayer playerId="69b22b5e005f4e6dada6b831" visible={platform === "android"} />
            </Suspense>
            <p className="text-muted-foreground text-xs text-center">
              ⚡ Este método é manual e exige seguir os passos mostrados no vídeo.
            </p>
            <p className="text-primary/80 text-xs text-center mt-2 font-medium">
              Se preferir instalar tudo automaticamente com +100 jogos prontos para jogar, escolha o Pack Completo abaixo.
            </p>
          </div>
        </div>

        <div style={{ display: platform === "ios" ? "block" : "none" }}>
          <div className="space-y-4">
            <h3 className="text-base font-bold text-foreground text-center">Tutorial iPhone (iOS)</h3>
            <Suspense fallback={<div className="w-full bg-muted animate-pulse rounded-2xl" style={{ aspectRatio: "888/1920" }} />}>
              <VTurbPlayer playerId="69aa29eea584f1a405f84d6b" visible={platform === "ios"} vertical />
            </Suspense>
            <p className="text-muted-foreground text-xs text-center">
              ⚠️ O vídeo usa outro jogo como exemplo, mas o processo de instalação é o mesmo.
            </p>
            <p className="text-primary/80 text-xs text-center mt-2 font-medium">
              Se preferir instalar tudo automaticamente com +100 jogos prontos para jogar, escolha o Pack Completo abaixo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ACTIVITY_ITEMS = [
  { name: "Lucas M.", city: "São Paulo", game: "NFS Underground 2", time: "há 3 min", avatar: `${CDN_BASE_URL}/lucas%20m.jpg` },
  { name: "Ana C.", city: "Rio de Janeiro", game: "God of War", time: "há 7 min", avatar: `${CDN_BASE_URL}/ana%20c.jpg` },
  { name: "Pedro H.", city: "Belo Horizonte", game: "GTA San Andreas", time: "há 12 min", avatar: `${CDN_BASE_URL}/pedro.jpg` },
  { name: "Mariana S.", city: "Curitiba", game: "Dragon Ball Z", time: "há 18 min", avatar: `${CDN_BASE_URL}/mariana%20S.jpg` },
];

const ActivityFeed = () => {
  const feedRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={feedRef} className="space-y-2.5 mb-6">
      {ACTIVITY_ITEMS.map((item, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 glass-card rounded-xl px-4 py-3 border border-border/50 transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: visible ? `${i * 300}ms` : "0ms" }}
        >
          <img
            src={item.avatar}
            alt={item.name}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
            loading="lazy"
            decoding="async"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-foreground font-medium truncate">
              <span className="text-primary">{item.name}</span>{" "}instalou{" "}
              <span className="font-semibold">{item.game}</span>
            </p>
            <p className="text-[10px] text-muted-foreground">{item.city} • {item.time}</p>
          </div>
          <Check className="w-4 h-4 text-primary flex-shrink-0" />
        </div>
      ))}
    </div>
  );
};


const BelowFoldContent = ({
  searchQuery,
  setSearchQuery,
  downloadModalOpen,
  setDownloadModalOpen,
  navigate,
}: BelowFoldContentProps) => {
  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return categories;
    return categories
      .map(cat => ({ ...cat, games: cat.games.filter(g => g.toLowerCase().includes(query)) }))
      .filter(cat => cat.games.length > 0);
  }, [searchQuery]);

  return (
    <>
      {/* ─── 1. TUTORIAL ─── */}
      <TutorialSection />

      {/* ─── 2. TRANSIÇÃO PARA OFERTA ─── */}
      <section className="px-5 py-12">
        <div className="container max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5" /> Escolha seu plano
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            ESCOLHA COMO QUER JOGAR
          </h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
            Duas formas de ter o jogo no seu celular. Escolha a que faz mais sentido para você.
          </p>

          {/* ── PRICING CARDS SIDE BY SIDE ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* Card Básico — R$9,90 */}
            <div className="rounded-2xl glass-card p-5 text-left relative border border-border">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Instalação Manual</span>
              <div className="flex items-baseline gap-1 mt-2 mb-3">
                <span className="text-3xl font-extrabold text-foreground">R$9</span>
                <span className="text-foreground text-lg font-bold">,90</span>
              </div>
              <p className="text-muted-foreground text-xs mb-4">Apenas Need for Speed Underground 2</p>
              <ul className="space-y-2.5 mb-5">
                {[
                  { text: "Apenas Need for Speed Underground 2", ok: true },
                  { text: "Instalação manual passo a passo", ok: true },
                  { text: "Seguindo o tutorial acima", ok: true },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    {item.text}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setDownloadModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 border border-border text-foreground font-semibold text-xs py-3 rounded-xl hover:bg-muted transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wide">Instalar Manualmente</span>
              </button>
            </div>

            {/* Card Premium — R$27 */}
            <div className="rounded-2xl p-5 text-left relative overflow-hidden border-2 border-primary shadow-[0_0_30px_-6px_hsl(var(--primary)/0.3)]" style={{ background: "linear-gradient(180deg, hsl(142 72% 50% / 0.08), hsl(150 6% 8%))" }}>
              <div className="absolute top-0 inset-x-0 h-0.5 shimmer-border" />
              {/* Badge mais popular */}
              <div className="absolute -top-0 right-4 bg-primary text-primary-foreground text-[9px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-b-lg shadow-lg">
                ⭐ Mais popular
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Completo</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1 mb-1">
                <span className="text-3xl font-extrabold text-gradient-primary">R$27</span>
                <span className="text-muted-foreground text-lg">,00</span>
              </div>
              <p className="text-muted-foreground text-[10px] mb-4">Pagamento único • Acesso vitalício</p>
              <ul className="space-y-2.5 mb-5">
                {[
                  "Instalação automática em 1 clique",
                  "Biblioteca com +100 jogos clássicos",
                  "Jogo pronto para rodar, sem configurar",
                  "Atualizações gratuitas com novos jogos",
                  "Acesso vitalício",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-xs text-foreground/90">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href="https://pay.lowify.com.br/checkout.php?product_id=QnPBLL"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm py-3.5 rounded-xl hover:brightness-110 transition-all glow-primary"
              >
                <Zap className="w-4 h-4 flex-shrink-0" />
                <span className="uppercase tracking-wide">QUERO O PACK COMPLETO</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>
              <p className="text-[10px] text-center mt-2 text-muted-foreground">Instale tudo automaticamente e comece a jogar em minutos.</p>
            </div>
          </div>

          {/* Economia */}
          <div className="inline-flex items-center gap-2 glass-card text-xs font-medium px-5 py-2.5 rounded-full text-foreground/80 border border-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>O pack completo sai por <strong className="text-primary">menos de R$0,27 por jogo</strong></span>
          </div>
        </div>
      </section>

      {/* ─── 3. COMPARATIVO ─── */}
      <section id="comparativo" className="px-5 py-14">
        <div className="container max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Básico vs Pack Completo</h2>
          </div>
          <div className="rounded-2xl overflow-hidden glass-card">
            <div className="grid grid-cols-2">
              <div className="bg-muted/50 p-3.5 text-center border-b border-r border-border">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Básico • R$9,90</span>
              </div>
              <div className="p-3.5 text-center border-b border-border border-l border-primary/20" style={{ background: "hsl(142 72% 50% / 0.10)" }}>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Completo • R$27 ⭐</span>
              </div>
            </div>
            {[
              ["Apenas 1 jogo", "+100 jogos clássicos"],
              ["Instalação manual", "Instalação automática em 1 clique"],
              ["Configuração por conta própria", "Tudo configurado automaticamente"],
              ["Sem atualizações", "Atualizações gratuitas"],
              ["Sem suporte", "Suporte via comunidade VIP"],
            ].map(([manual, auto], i) => (
              <div key={i} className="grid grid-cols-2">
                <div className="bg-muted/30 border-b border-r border-border p-3.5 flex items-center gap-2">
                  <X className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
                  <span className="text-muted-foreground text-xs">{manual}</span>
                </div>
                <div className="border-b border-border p-3.5 flex items-center gap-2 border-l border-primary/20" style={{ background: "hsl(142 72% 50% / 0.07)" }}>
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-xs font-medium">{auto}</span>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-2">
              <div className="bg-muted/30 border-r border-border p-3.5 text-center">
                <span className="text-sm font-bold text-muted-foreground">R$9,90</span>
              </div>
              <div className="p-3.5 text-center border-l border-primary/20" style={{ background: "hsl(142 72% 50% / 0.10)" }}>
                <span className="text-sm font-bold text-primary">R$27</span>
                <span className="text-[9px] text-primary/70 block">menos de R$0,27/jogo</span>
              </div>
            </div>
          </div>
          <a
            href="https://pay.lowify.com.br/checkout.php?product_id=QnPBLL"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full mt-6 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-6 py-3.5 rounded-xl hover:brightness-110 transition-all glow-primary"
          >
            <Zap className="w-4 h-4 flex-shrink-0" />
            <span className="flex flex-col items-center leading-tight"><span className="uppercase tracking-wide">Quero o Pack Completo por R$27</span><span className="text-[10px] font-normal text-background/80">+100 jogos • Instalação automática</span></span>
            <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>

      {/* ─── 4. DOWNLOAD BÁSICO ─── */}
      <section id="download" className="relative px-5 py-14">
        <div className="absolute inset-0 bg-grid-small opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-card/80 to-background/80" />
        <div className="container max-w-lg mx-auto text-center relative z-10">
          <h2 className="inline-flex items-center gap-2 text-xl sm:text-2xl font-bold text-foreground uppercase tracking-wide mb-2">
            <Download className="w-5 h-5 text-primary" /> Download Básico
          </h2>
          <p className="text-muted-foreground text-sm mb-2">Quer apenas o NFS Underground 2?</p>
          <p className="text-muted-foreground text-sm mb-8">Instale manualmente por apenas <strong className="text-foreground">R$9,90</strong>.</p>
          <button
            onClick={() => setDownloadModalOpen(true)}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border-2 border-primary text-primary font-bold text-base px-12 py-4 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Download className="w-5 h-5" />
            <span className="flex flex-col items-center leading-tight"><span className="uppercase tracking-wide">Comprar por R$9,90</span><span className="text-[10px] font-normal opacity-70">Apenas NFS Underground 2</span></span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <p className="text-muted-foreground text-[11px] mt-4 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary/70" /> Pagamento seguro
          </p>
        </div>
      </section>

      {/* ─── MODAL ─── */}
      <Dialog open={downloadModalOpen} onOpenChange={setDownloadModalOpen}>
        <DialogContent className="max-w-md sm:max-w-lg p-0 gap-0 border-border bg-card max-h-[90vh] overflow-y-auto [&>button]:z-20 [&>button]:top-5 [&>button]:right-5 [&>button]:text-muted-foreground">
          <DialogHeader className="p-5 pb-3 text-center bg-card z-10">
            <DialogTitle className="text-base sm:text-lg font-bold text-foreground mt-6">Escolha como quer jogar</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">Duas formas de ter o jogo no seu celular.</DialogDescription>
          </DialogHeader>
          <div className="px-5 pb-5 space-y-4">
            {/* Card Básico */}
            <div className="rounded-xl glass-card p-4 flex flex-col text-center">
              <h3 className="text-sm font-bold text-foreground mb-1">Instalação Manual</h3>
              <span className="text-[10px] text-muted-foreground mb-3">Apenas Need for Speed Underground 2</span>
              <ul className="space-y-2 mb-4 flex-1 text-left">
                {[
                  "Apenas Need for Speed Underground 2",
                  "Instalação manual passo a passo",
                  "Seguindo o tutorial acima",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="w-3 h-3 flex-shrink-0 mt-0.5 text-muted-foreground" />
                    {text}
                  </li>
                ))}
              </ul>
              <div className="mb-3"><span className="text-lg font-bold text-foreground">R$9,90</span></div>
              <button onClick={() => { sessionStorage.setItem("dl_auth", "1"); navigate("/download"); }} className="w-full inline-flex items-center justify-center gap-2 border border-border text-foreground font-semibold text-xs py-2.5 rounded-lg hover:bg-muted transition-colors">
                <span className="uppercase text-[10px]">Instalar Manualmente</span>
              </button>
            </div>

            {/* Card Premium */}
            <div className="rounded-2xl p-5 sm:p-6 text-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(142 72% 50% / 0.06), hsl(150 6% 8%))" }}>
              <div className="absolute top-0 inset-x-0 h-0.5 shimmer-border" />
              <div className="absolute -top-0 right-4 bg-primary text-primary-foreground text-[9px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-b-lg shadow-lg">
                ⭐ Mais popular
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-4 border border-primary/30 bg-primary/10">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  <span className="text-primary">Pack Completo</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  +100 JOGOS CLÁSSICOS<br />
                  <span className="text-gradient-primary">PRONTOS PARA JOGAR</span>
                </h3>
                <ul className="text-left space-y-2 mb-4 grid grid-cols-2 gap-x-3 gap-y-2">
                  {["Instalação em 1 clique", "+100 jogos clássicos", "Jogo pronto para jogar", "Atualizações gratuitas", "Acesso vitalício", "Suporte VIP"].map((t) => (
                    <li key={t} className="flex items-start gap-1.5 text-[11px] text-foreground/90">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg glass-card p-3 mb-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Se comprasse separado</span>
                    <span className="text-foreground font-bold line-through opacity-60">R$127</span>
                  </div>
                  <div className="text-center">
                    <span className="text-muted-foreground text-xs block mb-0.5">Hoje por apenas:</span>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-extrabold text-gradient-primary">R$ 27</span>
                      <span className="text-muted-foreground text-sm">,00</span>
                    </div>
                    <p className="text-[10px] text-center mt-1" style={{ color: "hsl(35 90% 60%)" }}>Economia de R$100 • +2.800 jogadores</p>
                  </div>
                </div>

                <a
                  href="https://pay.lowify.com.br/checkout.php?product_id=QnPBLL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm py-3.5 px-6 rounded-xl hover:brightness-110 transition-all glow-primary overflow-hidden"
                >
                  <Zap className="w-4 h-4 flex-shrink-0" />
                  <span className="uppercase tracking-wide">QUERO O PACK COMPLETO</span>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                </a>
                <p className="text-muted-foreground text-[9px] mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Pagamento único • Acesso imediato
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ─── 5. JOGOS DO PACK ─── */}
      <section id="jogos" className="relative px-5 py-14">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-card/90 via-card/70 to-card/90" />
        <div className="container max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground mb-2">
              BIBLIOTECA GAMER COM<br />
              <span className="text-gradient-primary italic">+100 JOGOS</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">Clássicos do PS2 e outros jogos adaptados para rodar direto no celular.</p>
            <p className="text-muted-foreground text-xs mt-1">Novos jogos são adicionados nas atualizações.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-10 max-w-md mx-auto">
            {[
              { icon: "💰", label: "Pagamento", highlight: "Único" },
              { icon: "♾️", label: "Acesso", highlight: "Vitalício" },
              { icon: "⚡", label: "Download", highlight: "Imediato" },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-xl p-3 text-center">
                <span className="text-lg block mb-1">{item.icon}</span>
                <span className="text-[10px] text-muted-foreground block">{item.label}</span>
                <span className="text-xs font-bold text-primary">{item.highlight}</span>
              </div>
            ))}
          </div>
          <div className="relative mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar jogos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-card rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
            />
          </div>

          {filteredCategories.length > 0 ? filteredCategories.map((cat) => (
            <LazyCategory key={cat.label} cat={cat} />
          )) : (
            <p className="text-muted-foreground text-sm text-center py-8">
              Nenhum jogo encontrado para "{searchQuery}"
            </p>
          )}
          <p className="text-muted-foreground text-[10px] text-center mt-6">Novos jogos são adicionados nas atualizações.</p>
        </div>
      </section>

      {/* ─── 6. OFERTA PREMIUM + ANCORAGEM DE VALOR ─── */}
      <section id="premium" className="px-5 py-14">
        <div className="container max-w-md mx-auto">
          <div className="rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(142 72% 50% / 0.06), hsl(150 6% 8%))" }}>
            <div className="absolute top-0 inset-x-0 h-0.5 shimmer-border" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-primary/8 blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-full mb-5 border border-primary/30 bg-primary/10">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-primary">Instalação automática</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                +100 JOGOS CLÁSSICOS<br />
                <span className="text-gradient-primary">PRONTOS PARA JOGAR NO CELULAR</span>
              </h2>

              <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                Com o instalador automático, o jogo é preparado e configurado para rodar no seu celular sem complicação.
              </p>

              <PackImage />

              {/* Benefícios */}
              <ul className="text-left space-y-3 mb-8 max-w-sm mx-auto">
                {[
                  "Instalação automática em 1 clique",
                  "Jogo pronto para rodar",
                  "Biblioteca com +100 jogos clássicos",
                  "Novos jogos nas atualizações",
                  "Acesso vitalício",
                  "Atualizações gratuitas",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              {/* Ancoragem de Valor */}
              <div className="rounded-xl glass-card p-5 mb-6">
                <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Valor incluído</h3>
                <div className="space-y-2.5 mb-4">
                  {[
                    { label: "Biblioteca com +100 jogos", value: "R$67" },
                     { label: "Instalador automático", value: "R$37" },
                     { label: "Atualizações futuras", value: "R$23" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="text-foreground font-semibold line-through opacity-60">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-border mb-4" />
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Valor total</span>
                  <span className="text-foreground font-bold line-through">R$127</span>
                </div>
                <div className="text-center mt-4">
                  <span className="text-muted-foreground text-sm block mb-1">Hoje você libera tudo por apenas:</span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-extrabold text-gradient-primary">R$ 27</span>
                    <span className="text-muted-foreground text-lg">,00</span>
                  </div>
                </div>
                <p className="text-xs text-center mt-1.5" style={{ color: "hsl(35 90% 60%)" }}>+2.800 jogadores já estão jogando</p>
              </div>

              {/* CTA */}
              <h3 className="text-lg font-bold text-foreground mb-4">COMECE A JOGAR AGORA</h3>

              <a
                href="https://pay.lowify.com.br/checkout.php?product_id=QnPBLL"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-base py-4 px-6 rounded-xl hover:brightness-110 transition-all glow-primary overflow-hidden"
              >
                <Zap className="w-5 h-5 flex-shrink-0" />
                <span className="uppercase tracking-wide">QUERO INSTALAR EM 1 CLIQUE</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>

              <p className="text-muted-foreground text-xs mt-3">
                Pagamento único • Acesso imediato após o pagamento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. PROVA SOCIAL ─── */}
      <section className="px-5 py-12">
        <div className="container max-w-lg mx-auto">
          {/* Header com avatar stack */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center -space-x-3 mb-4">
              {[
                `${CDN_BASE_URL}/535949a4b0fb513757a89ceee9672094.jpg`,
                `${CDN_BASE_URL}/a089c831304c4b0a7ac66041e8621c40.jpg`,
                `${CDN_BASE_URL}/i%20(1).webp`,
                `${CDN_BASE_URL}/i%20(2).webp`,
                `${CDN_BASE_URL}/i.webp`,
              ].map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Jogador ${i + 1}`}
                  className="w-10 h-10 rounded-full border-2 border-background object-cover"
                  style={{ zIndex: 5 - i }}
                  loading="lazy"
                  decoding="async"
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-xs font-bold text-primary" style={{ zIndex: 0 }}>
                +2.8k
              </div>
            </div>
            <div className="flex items-center gap-1.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs text-muted-foreground ml-1">4.9/5</span>
            </div>
            <p className="text-foreground font-bold text-lg">+2.800 JOGADORES JÁ ESTÃO JOGANDO</p>
            <p className="text-muted-foreground text-xs mt-1">Milhares de jogadores já estão rodando clássicos diretamente no celular.</p>
          </div>

          {/* Feed de atividade recente */}
          <ActivityFeed />

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "2.847", label: "Instalações", icon: "📲" },
              { value: "4.9/5", label: "Avaliação", icon: "⭐" },
              { value: "100+", label: "Jogos", icon: "🎮" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-xl p-3 text-center border border-border/50">
                <p className="text-lg mb-0.5">{stat.icon}</p>
                <p className="text-foreground font-bold text-sm">{stat.value}</p>
                <p className="text-muted-foreground text-[10px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. FAQ ─── */}
      <section className="relative px-5 py-14">
        <div className="absolute inset-0 bg-grid-small opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-card/80 to-background/80" />
        <div className="container max-w-lg mx-auto relative z-10">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold uppercase tracking-widest mb-3">FAQ</span>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Dúvidas frequentes</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "Qual a diferença entre Básico e Completo?", a: "O Básico (R$9,90) inclui apenas o NFS Underground 2 com instalação manual. O Completo (R$27) inclui +100 jogos com instalação automática, atualizações e suporte." },
              { q: "O pack completo vale a pena?", a: "Sim! Por apenas R$17,10 a mais que o básico, você leva +100 jogos, instalação automática e atualizações vitalícias." },
              { q: "O instalador automático é seguro?", a: "Sim, ele apenas automatiza a instalação para facilitar." },
              { q: "Quais jogos vêm no pack completo?", a: "GTA, God of War, NFS, Dragon Ball, Naruto, Spider-Man, Tekken, e muitos outros clássicos." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl glass-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{q}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="px-5 py-10 border-t border-border">
        <div className="container max-w-lg mx-auto text-center space-y-2">
          <p className="text-foreground text-sm font-semibold">Pagamento único • Sem mensalidade • Acesso vitalício</p>
          <p className="text-muted-foreground text-xs">
            Acesso liberado imediatamente após o pagamento.
          </p>
          <p className="text-muted-foreground text-xs">
            Instalador automático + biblioteca gamer com +100 jogos.
          </p>
          <p className="text-muted-foreground text-[10px] mt-4">© 2026 JogosMobileClub. Todos os direitos reservados.</p>
          <p className="text-muted-foreground text-[10px]">CNPJ: 87.107.515/0001-73</p>
        </div>
      </footer>
    </>
  );
};

export default BelowFoldContent;

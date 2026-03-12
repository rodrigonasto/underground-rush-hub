import { useState, useMemo, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import nfsCoverWebp from "@/assets/nfs-cover.webp";
import nfsCover from "@/assets/nfs-cover.png";
import packImageWebp from "@/assets/pack-image.webp";
import packImage from "@/assets/pack-image-v2.png";
import { Download, Check, X, Smartphone, ShieldCheck, Zap, Star, Search, ChevronRight, Sparkles, ArrowUp } from "lucide-react";
import VTurbPlayer from "@/components/VTurbPlayer";
import GameCover from "@/components/GameCover";
import SEOHead from "@/components/SEOHead";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

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
    games: [
      "God of War 2", "God of War 1", "GoW Ghost of Sparta", "GoW Chains of Olympus",
    ],
  },
  {
    label: "🚗 GTA",
    games: [
      "GTA V", "GTA Brasil", "GTA San Andreas", "GTA SA Definitive",
      "GTA Liberty City", "GTA Vice City",
    ],
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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const SocialProofBadge = () => {
  const [count, setCount] = useState(() => Math.floor(Math.random() * 15) + 18);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const delay = Math.random() * 8000 + 5000;
      timer = setTimeout(() => {
        setCount(prev => Math.min(52, prev + (Math.random() > 0.15 ? 1 : 0)));
        tick();
      }, delay);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-5 glass-card">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
      </span>
      <span className="text-muted-foreground">{count} jogadores baixando agora</span>
    </div>
  );
};

const PackImage = () => (
  <div className="rounded-xl overflow-hidden mb-6">
    <picture>
      <source srcSet={packImageWebp} type="image/webp" />
      <img
        src={packImage}
        alt="Pack com todos os jogos"
        className="w-full"
        loading="lazy"
        decoding="async"
        width={600}
        height={400}
      />
    </picture>
  </div>
);

const TutorialSection = () => {
  const [platform, setPlatform] = useState<"android" | "ios">(() => {
    const ua = navigator.userAgent || "";
    return /iPhone|iPad|iPod/i.test(ua) ? "ios" : "android";
  });

  return (
    <section
      id="tutorial"
      className="px-5 pb-14 pt-4"
    >
      <div className="container max-w-lg mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Tutorial
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Como instalar
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Escolha seu sistema para ver o tutorial correto.
          </p>
        </div>

        {/* Platform Tabs */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setPlatform("android")}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
              platform === "android"
                ? "bg-primary text-primary-foreground glow-primary"
                : "glass-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xl">🤖</span> Android
          </button>
          <button
            onClick={() => setPlatform("ios")}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
              platform === "ios"
                ? "bg-primary text-primary-foreground glow-primary"
                : "glass-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xl">🍎</span> iPhone
          </button>
        </div>

        {/* Android Content */}
        <div style={{ display: platform === "android" ? "block" : "none" }}>
          <div className="space-y-4">
            <h3 className="text-base font-bold text-foreground text-center">Tutorial Android</h3>
            <VTurbPlayer playerId="69b22b5e005f4e6dada6b831" visible={platform === "android"} />
            <p className="text-muted-foreground text-xs text-center">
              ⚡ Assista ao vídeo abaixo e siga o passo a passo mostrado na tela. Em poucos minutos a instalação estará concluída.
            </p>
          </div>
        </div>

        {/* iOS Content */}
        <div style={{ display: platform === "ios" ? "block" : "none" }}>
          <div className="space-y-4">
            <h3 className="text-base font-bold text-foreground text-center">Tutorial iPhone (iOS)</h3>
            <VTurbPlayer playerId="69aa29eea584f1a405f84d6b" visible={platform === "ios"} vertical />
            <p className="text-muted-foreground text-xs text-center">
              ⚠️ O vídeo usa outro jogo como exemplo, mas o processo de instalação é o mesmo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const navigate = useNavigate();

  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return categories;

    return categories
      .map(cat => ({
        ...cat,
        games: cat.games.filter(g => g.name.toLowerCase().includes(query)),
      }))
      .filter(cat => cat.games.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden noise-overlay">
      <SEOHead
        title="Jogos Mobile Club — Jogue clássicos no celular"
        description="Baixe e jogue NFS Underground 2, GTA, God of War e +100 jogos clássicos no celular. Tutorial completo e instalação fácil."
        path="/"
      />

      {/* ─── HERO ─── */}
      <section className="relative px-5 pt-12 pb-10 sm:pt-20 sm:pb-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

        <motion.div
          className="container max-w-lg mx-auto text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-1.5 glass-card text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
              <Smartphone className="w-3.5 h-3.5" />
              Android & iPhone
            </div>
          </motion.div>

          {/* Cover - LCP element */}
          <motion.div variants={fadeUp} className="w-full max-w-sm mx-auto mb-8">
            <picture>
              <source srcSet={nfsCoverWebp} type="image/webp" />
              <img
                src={nfsCover}
                alt="Need for Speed Underground 2"
                className="w-full rounded-2xl glow-primary-strong border border-primary/20"
                width={448}
                height={252}
                fetchPriority="high"
              />
            </picture>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={fadeUp} className="text-2xl sm:text-4xl font-extrabold text-foreground leading-tight mb-3">
            Aprenda como jogar{" "}
            <span className="text-gradient-primary italic">Need for Speed Underground 2</span>{" "}
            no celular
          </motion.h1>

          <motion.p variants={fadeUp} className="text-muted-foreground text-sm sm:text-base mb-8 max-w-md mx-auto">
            Baixe grátis e instale em poucos minutos para começar a jogar agora.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <button
              onClick={() => scrollTo("download")}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground font-bold text-sm px-10 py-4 rounded-xl hover:brightness-110 transition-all glow-primary"
            >
              <Download className="w-4.5 h-4.5" />
              Baixar grátis
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>

          {/* Trust */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-5 mt-6 text-muted-foreground text-xs">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-primary/70" /> Seguro</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>Sem cadastro</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>Grátis</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="px-5 pb-10">
        <div className="container max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-1 mb-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-center text-muted-foreground text-xs">
            <span className="text-foreground font-semibold">4.9/5</span> • Mais de 2.800 downloads essa semana
          </p>
        </div>
      </section>

      {/* ─── TUTORIAL ─── */}
      <TutorialSection />

      {/* ─── DOWNLOAD ─── */}
      <section id="download" className="relative px-5 py-14">
        <div className="absolute inset-0 bg-grid-small opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-card/80 to-background/80" />

        <div className="container max-w-lg mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold uppercase tracking-widest mb-3">
            <Download className="w-3.5 h-3.5" /> Download
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Download gratuito
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Clique abaixo para baixar o jogo.
          </p>

          <button
            onClick={() => setDownloadModalOpen(true)}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground font-bold text-base px-12 py-4 rounded-xl hover:brightness-110 transition-all glow-primary"
          >
            <Download className="w-5 h-5" />
            Baixar agora
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <p className="text-muted-foreground text-[11px] mt-4 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary/70" /> Download seguro e gratuito
          </p>
        </div>
      </section>

      {/* ─── MODAL DE DOWNLOAD ─── */}
      <Dialog open={downloadModalOpen} onOpenChange={setDownloadModalOpen}>
        <DialogContent className="max-w-md sm:max-w-lg p-0 gap-0 border-border bg-card max-h-[90vh] overflow-y-auto [&>button]:z-20 [&>button]:top-5 [&>button]:right-5 [&>button]:text-muted-foreground">
           <DialogHeader className="p-5 pb-3 text-center bg-card z-10">
            <DialogTitle className="text-base sm:text-lg font-bold text-foreground mt-6">Seu download está pronto</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Escolha como deseja instalar o jogo:
            </DialogDescription>
          </DialogHeader>

          <div className="px-5 pb-5 space-y-4">
            {/* Card Manual */}
            <div className="rounded-xl glass-card p-4 flex flex-col text-center">
              <h3 className="text-sm font-bold text-foreground mb-1">Instalação manual</h3>
              <span className="text-[10px] text-muted-foreground mb-3">Gratuita</span>

              <ul className="space-y-2 mb-4 flex-1 text-left">
                {[
                  "Instalação passo a passo",
                  "Requer configuração manual",
                  "Apenas o jogo Need for Speed Underground 2",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 rounded-full border border-border flex items-center justify-center">
                      <X className="w-2 h-2 text-muted-foreground" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mb-3">
                <span className="text-sm font-bold text-foreground">Grátis</span>
              </div>

              <button
                onClick={() => navigate("/download")}
                className="w-full inline-flex items-center justify-center gap-2 border border-border text-foreground font-semibold text-xs py-2.5 rounded-lg hover:bg-muted transition-colors"
              >
                Baixar manualmente
              </button>
            </div>

            {/* Card Premium */}
            <div className="rounded-2xl p-5 sm:p-6 text-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(142 72% 50% / 0.06), hsl(150 6% 8%))" }}>
              <div className="absolute top-0 inset-x-0 h-0.5 shimmer-border" />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-primary/8 blur-[80px]" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-4 border border-primary/30 bg-primary/10">
                  <ArrowUp className="w-3.5 h-3.5 text-primary" />
                  <span className="text-primary">Promoção Especial Update 2.9.5</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  Instalação automática +{" "}
                  <span className="text-gradient-primary">Biblioteca gamer (+100 jogos)</span>
                </h3>

                {/* Preço */}
                <div className="text-center mb-1 mt-4">
                  <span className="text-muted-foreground text-xs line-through block mb-0.5">De R$127,00</span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-muted-foreground text-xs">Por apenas</span>
                    <span className="text-4xl font-extrabold text-gradient-primary">R$ 47</span>
                    <span className="text-muted-foreground text-base">,00</span>
                  </div>
                </div>
                <p className="text-primary text-xs font-semibold mb-3">Economize R$80 hoje</p>
                <p className="text-muted-foreground text-[10px] mb-4">
                  ⏱ Preço promocional válido apenas durante o lançamento do Update 2.9.5
                </p>

                {/* Pack image */}
                <PackImage />

                {/* Badges */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl glass-card">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-foreground text-[11px] font-bold">Pagamento Único</p>
                      <p className="text-muted-foreground text-[9px]">Pague apenas uma vez</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Star className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-foreground text-[11px] font-bold">Acesso Completo</p>
                      <p className="text-muted-foreground text-[9px]">+100 jogos inclusos</p>
                    </div>
                  </div>
                </div>

                <ul className="text-left space-y-2 mb-5 grid grid-cols-2 gap-x-3 gap-y-2">
                  {[
                    "Instalação em 1 clique",
                    "+100 jogos clássicos",
                    "Jogo pronto para jogar",
                    "Novos jogos nas updates",
                    "Sem erros ou configs",
                    "Acesso vitalício",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-1.5 text-[11px] text-foreground/90">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://pay.lowify.com.br/checkout.php?product_id=QnPBLL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm py-3.5 px-6 rounded-xl hover:brightness-110 transition-all glow-primary overflow-hidden"
                >
                  <Zap className="w-4 h-4 flex-shrink-0" />
                  <span>Quero instalar e jogar em 1 clique</span>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                </a>

                <p className="text-muted-foreground text-[9px] mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Compra segura • Entrega imediata
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ─── COMPARAÇÃO ─── */}
      <section
        id="comparativo"
        className="px-5 py-14"
      >
        <div className="container max-w-lg mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold uppercase tracking-widest mb-3">
              <Zap className="w-3.5 h-3.5" /> Comparativo
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Manual vs Automático
            </h2>
            <p className="text-muted-foreground text-sm">
              Não quer instalar manualmente? Compare:
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden glass-card">
            {/* Header */}
            <div className="grid grid-cols-2">
              <div className="bg-muted/50 p-3.5 text-center border-b border-r border-border">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Manual</span>
              </div>
              <div className="p-3.5 text-center border-b border-border" style={{ background: "hsl(142 72% 50% / 0.06)" }}>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Automático</span>
              </div>
            </div>

            {/* Rows */}
            {[
              ["Instalação demorada", "Instala em 1 clique"],
              ["Configuração manual", "Jogo pronto para jogar"],
              ["Apenas 1 jogo", "Biblioteca com +100 jogos"],
            ].map(([manual, auto], i) => (
              <div key={i} className="grid grid-cols-2">
                <div className="bg-muted/30 border-b border-r border-border p-3.5 flex items-center gap-2">
                  <X className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
                  <span className="text-muted-foreground text-xs">{manual}</span>
                </div>
                <div className="border-b border-border p-3.5 flex items-center gap-2" style={{ background: "hsl(142 72% 50% / 0.04)" }}>
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-xs font-medium">{auto}</span>
                </div>
              </div>
            ))}

            {/* Price */}
            <div className="grid grid-cols-2">
              <div className="bg-muted/30 border-r border-border p-3.5 text-center">
                <span className="text-sm font-bold text-primary">Grátis</span>
              </div>
              <div className="p-3.5 text-center" style={{ background: "hsl(142 72% 50% / 0.04)" }}>
                <span className="text-[10px] text-muted-foreground line-through block">De R$97</span>
                <span className="text-sm font-bold text-primary">R$47</span>
                <span className="text-[9px] text-primary block mt-0.5">Economize R$50</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => scrollTo("premium")}
            className="group w-full mt-6 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-6 py-3.5 rounded-xl hover:brightness-110 transition-all glow-primary"
          >
            <Zap className="w-4 h-4" />
            Quero a versão automática
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>

      {/* ─── JOGOS DO PACK ─── */}
      <section id="jogos" className="relative px-5 py-14">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-card/90 via-card/70 to-card/90" />

        <div className="container max-w-2xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground mb-2">
              Escolha Seu Jogo Favorito
              <br />
              <span className="text-gradient-primary italic">e Comece a Jogar em 1 Clique</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">+100 jogos prontos para instalar no Android e iPhone</p>
          </div>

          {/* Trust badges */}
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

          {/* Search bar */}
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

          {/* Games grid */}
          {filteredCategories.length > 0 ? filteredCategories.map((cat) => (
            <div key={cat.label} className="mb-10 last:mb-0">
              <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                {cat.label}
                <span className="h-px flex-1 bg-border" />
                <span className="text-[10px] text-muted-foreground font-normal">{cat.games.length} jogos</span>
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-2.5">
                {cat.games.map((g) => (
                  <div key={g.name} className="group">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden border border-border/50 group-hover:border-primary/40 transition-all bg-muted">
                      <img src={g.img} alt={g.name} className="w-full h-full object-cover" loading="lazy" decoding="async" width={120} height={160} />
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground text-center mt-1.5 truncate leading-tight">{g.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )) : (
            <p className="text-muted-foreground text-sm text-center py-8">
              Nenhum jogo encontrado para "{searchQuery}"
            </p>
          )}

          <p className="text-muted-foreground text-[10px] text-center mt-6">
            E mais jogos adicionados toda semana!
          </p>
        </div>
      </section>

      {/* ─── PREMIUM ─── */}
      <section
        id="premium"
        className="px-5 py-14"
      >
        <div className="container max-w-md mx-auto">
          <div
            className="rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, hsl(142 72% 50% / 0.06), hsl(150 6% 8%))" }}
          >
            {/* Top shimmer bar */}
            <div className="absolute top-0 inset-x-0 h-0.5 shimmer-border" />

            {/* Glow orb */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-primary/8 blur-[80px]" />

            <div className="relative z-10">
              {/* Badge promoção */}
              <div className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-full mb-5 border border-primary/30 bg-primary/10">
                <ArrowUp className="w-4 h-4 text-primary" />
                <span className="text-primary">Promoção Especial Update 2.9.5</span>
              </div>

              <p className="text-muted-foreground text-sm mb-5 max-w-sm mx-auto">
                Lançamento da versão 2.9.5 com preço especial de lançamento.{" "}
                <strong className="text-foreground">Esta oferta é limitada e o valor retornará ao normal em breve.</strong>
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Instalação automática +{" "}
                <span className="text-gradient-primary">Biblioteca gamer (+100 jogos)</span>
              </h2>

              {/* Preço */}
              <div className="text-center mb-1 mt-6">
                <span className="text-muted-foreground text-sm line-through block mb-1">De R$127,00</span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-muted-foreground text-sm">Por apenas</span>
                  <span className="text-5xl font-extrabold text-gradient-primary">R$ 47</span>
                  <span className="text-muted-foreground text-lg">,00</span>
                </div>
              </div>
              <p className="text-primary text-xs font-semibold mb-4">Economize R$80 hoje</p>
              <p className="text-muted-foreground text-[11px] mb-6 text-center">
                ⏱ Preço promocional válido apenas durante o lançamento do Update 2.9.5
              </p>

              {/* Pack image */}
              <PackImage />

              {/* Badges pagamento e acesso */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl glass-card">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-foreground text-xs font-bold">Pagamento Único</p>
                    <p className="text-muted-foreground text-[10px]">Pague apenas uma vez</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-foreground text-xs font-bold">Acesso Completo</p>
                    <p className="text-muted-foreground text-[10px]">+100 jogos inclusos</p>
                  </div>
                </div>
              </div>

              <ul className="text-left space-y-3 mb-8 grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  "Instalação automática em 1 clique",
                  "Biblioteca com +100 jogos clássicos",
                  "Jogo pronto para jogar",
                  "Novos jogos nas atualizações",
                  "Sem erros ou configurações difíceis",
                  "Acesso vitalício",
                  "Suporte via comunidade",
                  "Atualizações gratuitas",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-xs text-foreground/90">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://pay.lowify.com.br/checkout.php?product_id=QnPBLL"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm py-4 px-6 rounded-xl hover:brightness-110 transition-all glow-primary overflow-hidden"
              >
                <Zap className="w-4 h-4 flex-shrink-0" />
                <span>Quero instalar e jogar em 1 clique</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>

              <p className="text-primary text-xs font-semibold mt-4">Pagamento único</p>
              <p className="text-muted-foreground text-[10px] mt-1 max-w-xs mx-auto">
                Sem mensalidades. Sem taxas escondidas. Sem renovação. Você paga uma única vez e tem acesso completo e vitalício.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section
        className="relative px-5 py-14"
      >
        <div className="absolute inset-0 bg-grid-small opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-card/80 to-background/80" />

        <div className="container max-w-lg mx-auto relative z-10">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold uppercase tracking-widest mb-3">
              FAQ
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Dúvidas frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {[
              { q: "O download é gratuito?", a: "Sim, você pode baixar e instalar o jogo gratuitamente." },
              { q: "Preciso pagar para jogar?", a: "Não. O pagamento é só para quem quer instalação automática e o pack com +100 jogos." },
              { q: "O instalador automático é seguro?", a: "Sim, ele apenas automatiza a instalação para facilitar." },
              { q: "Quais jogos vêm no pack?", a: "GTA, God of War, NFS, Dragon Ball, Naruto, Spider-Man, Tekken, e muitos outros clássicos." },
            ].map(({ q, a }) => (
              <div
                key={q}
                className="rounded-xl glass-card p-5"
              >
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{q}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-5 py-10 border-t border-border flex flex-col items-center gap-4">
        <p className="text-center text-muted-foreground text-[11px]">
          © 2026 JogosMobileClub. Todos os direitos reservados.
        </p>
        <p className="text-center text-muted-foreground text-[10px]">
          CNPJ: 87.107.515/0001-73
        </p>
      </footer>
    </div>
  );
};

export default Index;

import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import nfsCover from "@/assets/nfs-cover.png";
import nfsCoverWebp from "@/assets/nfs-cover.webp";
import packImage from "@/assets/pack-image-v2.png";
import logoFooter from "@/assets/logo-jogosmobileclub.png";
import { Download, Check, X, Smartphone, ShieldCheck, Zap, Star, Search, ChevronRight, Sparkles, ArrowUp } from "lucide-react";
import VTurbPlayer from "@/components/VTurbPlayer";
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
      { name: "DFL26 Mobile", img: "https://ksdigital.shop/wp-content/uploads/2025/10/2026.png" },
      { name: "Pack 8 Jogos", img: "https://ksdigital.shop/wp-content/uploads/2025/10/Design-sem-nome-3.png" },
      { name: "PES eFootball 2026", img: "https://ksdigital.shop/wp-content/uploads/2025/09/Captura-de-tela-2025-09-29-185922.png" },
      { name: "Bomba Patch 2025", img: "https://ksdigital.shop/wp-content/uploads/2025/09/Captura-de-tela-2025-09-29-192312.png" },
      { name: "PES 25", img: "https://ksdigital.shop/wp-content/uploads/2025/07/images-39.jpg" },
      { name: "Bomba Patch Cazé TV", img: "https://ksdigital.shop/wp-content/uploads/2025/07/download-2.jpg" },
      { name: "PES 2017", img: "https://ksdigital.shop/wp-content/uploads/2025/08/pes-2017-mobile-scaled.webp" },
      { name: "PES 2012", img: "https://ksdigital.shop/wp-content/uploads/2025/09/PROEVOLUTIONSOCCER2012.jpg" },
      { name: "PES 2013", img: "https://ksdigital.shop/wp-content/uploads/2025/09/PROEVOLUTIONSOCCER2013.jpg" },
      { name: "PES 2014", img: "https://ksdigital.shop/wp-content/uploads/2025/07/81HK0XmqEfL._UF8941000_QL80_.jpg" },
      { name: "eFootball 2024", img: "https://ksdigital.shop/wp-content/uploads/2025/09/eFootball-2024.jpg" },
      { name: "FC 25", img: "https://ksdigital.shop/wp-content/uploads/2025/07/images-41.jpg" },
      { name: "Bomba Patch 2007", img: "https://ksdigital.shop/wp-content/uploads/2025/07/D_NQ_NP_665172-MLB83879911947_042025-O-e1752550275311.webp" },
      { name: "Bomba Patch 2026", img: "https://ksdigital.shop/wp-content/uploads/2025/09/Celular-Super_Bomba_Patch_2026_V01.fw_.webp" },
    ],
  },
  {
    label: "⚔️ God of War",
    games: [
      { name: "God of War 2", img: "https://ksdigital.shop/wp-content/uploads/2025/07/6cf9f1c447f889b021b25214731d6bfa-Copia.webp" },
      { name: "God of War 1", img: "https://ksdigital.shop/wp-content/uploads/2025/07/PT-BR-1-2.png" },
      { name: "GoW Ghost of Sparta", img: "https://ksdigital.shop/wp-content/uploads/2025/07/PT-BR-1-1.png" },
      { name: "GoW Chains of Olympus", img: "https://ksdigital.shop/wp-content/uploads/2025/07/PT-BR-3.png" },
    ],
  },
  {
    label: "🚗 GTA",
    games: [
      { name: "GTA V", img: "https://ksdigital.shop/wp-content/uploads/2025/09/LEGACY.png" },
      { name: "GTA Brasil", img: "https://ksdigital.shop/wp-content/uploads/2025/07/ChatGPT-Image-16-de-jul.-de-2025-23_26_39.png" },
      { name: "GTA San Andreas", img: "https://ksdigital.shop/wp-content/uploads/2025/07/9ff343a1a37c543ff9bc59c574cbea10.jpg" },
      { name: "GTA SA Definitive", img: "https://ksdigital.shop/wp-content/uploads/2025/07/cover-1.png" },
      { name: "GTA Liberty City", img: "https://ksdigital.shop/wp-content/uploads/2025/07/grand-theft-auto-liberty-city-stories-e1751394846496-1.jpg" },
      { name: "GTA Vice City", img: "https://ksdigital.shop/wp-content/uploads/2025/07/grand-theft-auto-vice-city-stories-e1752552384526.jpg" },
    ],
  },
  {
    label: "🏎️ Corrida",
    games: [
      { name: "Midnight Club 3", img: "https://ksdigital.shop/wp-content/uploads/2025/07/Midnight_Club_3_DUB_Edition_capa.jpg" },
      { name: "NFS Underground 2", img: "https://ksdigital.shop/wp-content/uploads/2025/07/Nfsu2_capa_pt.jpg" },
      { name: "NFS Underground", img: "https://ksdigital.shop/wp-content/uploads/2025/09/Nfsu_capa_pt.jpg" },
      { name: "NFS Most Wanted", img: "https://ksdigital.shop/wp-content/uploads/2025/09/NFSMW_Boxart.webp" },
      { name: "Gran Turismo 4", img: "https://ksdigital.shop/wp-content/uploads/2025/09/gran-turismo-4.jpg" },
      { name: "NFS ProStreet", img: "https://ksdigital.shop/wp-content/uploads/2025/09/NeedforSpeed-ProStreetUSA-image.jpg" },
      { name: "Burnout 3", img: "https://ksdigital.shop/wp-content/uploads/2025/09/Burnout3-TakedownUSA-image.jpg" },
      { name: "Vigilante 8", img: "https://ksdigital.shop/wp-content/uploads/2025/09/220px-Vigilante_8.jpg" },
      { name: "Midnight Club LA", img: "https://ksdigital.shop/wp-content/uploads/2025/07/ChatGPT-Image-1-de-jul.-de-2025-15_13_48-1.png" },
      { name: "NFS Carbon", img: "https://ksdigital.shop/wp-content/uploads/2025/07/71h324tjzmL.jpg" },
      { name: "MX vs ATV", img: "https://ksdigital.shop/wp-content/uploads/2025/07/mx-vs-atv-untamed-e1751393071211.webp" },
      { name: "Burnout Dominator", img: "https://ksdigital.shop/wp-content/uploads/2025/07/burnout-dominator-e1752551639342.jpg" },
      { name: "Downhill Domination", img: "https://ksdigital.shop/wp-content/uploads/2025/11/downhill-domination-button-1652747391683.jpg" },
      { name: "Driver 2", img: "https://ksdigital.shop/wp-content/uploads/2025/11/Driver_2_Coverart.jpg" },
    ],
  },
  {
    label: "⚡ Ação",
    games: [
      { name: "Black + GoW 1", img: "https://ksdigital.shop/wp-content/uploads/2025/07/PT-BR.png" },
      { name: "Black Hack Edition", img: "https://ksdigital.shop/wp-content/uploads/2025/11/Black-Hack-Edition-Dublado-IA-PT-BR-212x300-1.jpg" },
      { name: "RE4 + Vice City", img: "https://ksdigital.shop/wp-content/uploads/2025/07/ChatGPT-Image-1-de-jul.-de-2025-16_04_51.png" },
      { name: "Bully PT-BR", img: "https://ksdigital.shop/wp-content/uploads/2025/07/images-3.jpg" },
      { name: "Resident Evil 3", img: "https://ksdigital.shop/wp-content/uploads/2025/09/ResidentEvil3-NemesisUSA-image.jpg" },
      { name: "Silent Hill 3", img: "https://ksdigital.shop/wp-content/uploads/2025/09/SilentHill3USAEnJaFrDeEsItKo-image.jpg" },
      { name: "Battlefield 2", img: "https://ksdigital.shop/wp-content/uploads/2025/09/Battlefield-2-Modern-Combat-scaled-1.jpg" },
      { name: "Call of Duty 3", img: "https://ksdigital.shop/wp-content/uploads/2025/09/CallofDuty3USA-image.jpg" },
      { name: "CoD World at War", img: "https://ksdigital.shop/wp-content/uploads/2025/09/CallofDuty-WorldatWar-FinalFrontsUSAEnFr-image.jpg" },
      { name: "Red Dead Revolver", img: "https://ksdigital.shop/wp-content/uploads/2025/09/MV5BNTU1MjY1OTkyNF5BMl5BanBnXkFtZTgwNzg5ODAyNTE@._V1_QL75_UX157_.jpg" },
      { name: "Sniper Elite", img: "https://ksdigital.shop/wp-content/uploads/2025/09/Sniper-Elite-V2-Silver-Star-Edition-300x357-1.jpg" },
      { name: "Hitman Blood Money", img: "https://ksdigital.shop/wp-content/uploads/2025/09/Hitman-BloodMoneyUSA-image.jpg" },
      { name: "Medal of Honor", img: "https://ksdigital.shop/wp-content/uploads/2025/09/MedalofHonor-FrontlineUSA-image.jpg" },
      { name: "MoH Vanguard", img: "https://ksdigital.shop/wp-content/uploads/2025/09/Medal-of-Honor-Vanguard-2.jpg" },
      { name: "Metal Gear Solid 3", img: "https://ksdigital.shop/wp-content/uploads/2025/09/MetalGearSolid3-SnakeEaterUSA-image.jpg" },
      { name: "Shadow of Colossus", img: "https://ksdigital.shop/wp-content/uploads/2025/09/ShadowoftheColossusUSA-image.jpg" },
      { name: "Def Jam Fight", img: "https://ksdigital.shop/wp-content/uploads/2025/09/DEFJAMFIGHTFORNY.jpg" },
      { name: "Tekken 5", img: "https://ksdigital.shop/wp-content/uploads/2025/07/Tekken_5_capa.png" },
      { name: "Spider-Man 2", img: "https://ksdigital.shop/wp-content/uploads/2025/07/1c7b75d8ed9271516546560d219ad0b22ee0a263b4537bd8.avif" },
      { name: "Spider-Man 3", img: "https://ksdigital.shop/wp-content/uploads/2025/07/604880f85fdfa4d069dd4dfabe163639-1-1.jpg" },
      { name: "Príncipe da Pérsia", img: "https://ksdigital.shop/wp-content/uploads/2025/07/prince-of-persia-the-two-thrones-e1751392952580.webp" },
      { name: "Marvel Ultimate Alliance", img: "https://ksdigital.shop/wp-content/uploads/2025/07/marvel-ultimate-alliance-2-e1752552624233.webp" },
      { name: "Inferno de Dante", img: "https://ksdigital.shop/wp-content/uploads/2025/07/dantes-inferno-e1751395418118.jpg" },
      { name: "Assassin's Creed", img: "https://ksdigital.shop/wp-content/uploads/2025/07/Assassins_Creed_Bloodlines_capa.png" },
      { name: "25 to Life", img: "https://ksdigital.shop/wp-content/uploads/2025/07/25tolife-1652399533972.jpg" },
      { name: "Soul Calibur", img: "https://ksdigital.shop/wp-content/uploads/2025/07/Soul-Calibur-Broken-Destiny-1-scaled-e1751349412484.jpg" },
      { name: "Daxter", img: "https://ksdigital.shop/wp-content/uploads/2025/07/upscalemedia-transformed-scaled-e1751392482643.jpeg" },
      { name: "Van Helsing", img: "https://ksdigital.shop/wp-content/uploads/2025/11/Captura-de-tela-2025-11-07-032711.png" },
      { name: "Urban Reign", img: "https://ksdigital.shop/wp-content/uploads/2025/11/51E7QES99ML._SY445_.jpg" },
      { name: "Darkwatch", img: "https://ksdigital.shop/wp-content/uploads/2025/11/Darkwatch.jpg" },
    ],
  },
  {
    label: "⭐ Clássicos & Animes",
    games: [
      { name: "Naruto Shippuden 5", img: "https://ksdigital.shop/wp-content/uploads/2025/07/naruto-shippuden-ultimate-ninja-5-turns-15-years-old-today-v0-qpof6pn8l47a1.webp" },
      { name: "Guitar Hero III", img: "https://ksdigital.shop/wp-content/uploads/2025/09/GuitarHeroIII-LegendsofRockUSA-image.jpg" },
      { name: "Naruto Legends", img: "https://ksdigital.shop/wp-content/uploads/2025/07/naruto-shippuden-legends-akatsuki-rising-e1751395992521.webp" },
      { name: "MK Unchained", img: "https://ksdigital.shop/wp-content/uploads/2025/07/PT-BR-2.png" },
      { name: "Dragon Ball BT4", img: "https://ksdigital.shop/wp-content/uploads/2025/07/cover.png" },
      { name: "DBZ Shin Budokai", img: "https://ksdigital.shop/wp-content/uploads/2025/07/dragon-ball-z-shin-budokai-e1751395100715.jpg" },
      { name: "Jackie Chan", img: "https://ksdigital.shop/wp-content/uploads/2025/07/MV5BMjQ5YzZhYTUtM2FlOC00NDlkLTlmOTEtNDI1OGNmMTgwZTY4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
      { name: "Os Incríveis", img: "https://ksdigital.shop/wp-content/uploads/2025/07/Os_Incr3Fveis-scaled.webp" },
      { name: "MK Armageddon", img: "https://ksdigital.shop/wp-content/uploads/2025/07/favorite-cover-art-from-the-3d-era-v0-c54eu3fg1d8d1.webp" },
      { name: "Ben 10", img: "https://ksdigital.shop/wp-content/uploads/2025/07/Ben_10-_For3Fgena-scaled.webp" },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const SocialProofBadge = () => {
  const [count, setCount] = useState(Math.floor(Math.random() * 15) + 18);

  useEffect(() => {
    const tick = () => {
      const delay = Math.random() * 8000 + 5000;
      setTimeout(() => {
        setCount(prev => {
          const bump = Math.random() > 0.15 ? 1 : 0;
          return Math.min(52, prev + bump);
        });
        tick();
      }, delay);
    };
    tick();
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

const TutorialSection = () => {
  const [platform, setPlatform] = useState<"android" | "ios">(() => {
    const ua = navigator.userAgent || "";
    return /iPhone|iPad|iPod/i.test(ua) ? "ios" : "android";
  });

  return (
    <motion.section
      id="tutorial"
      className="px-5 pb-14 pt-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="container max-w-lg mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Tutorial
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Como instalar
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Escolha seu sistema para ver o tutorial correto.
          </p>
        </motion.div>

        {/* Platform Tabs */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 mb-6">
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
        </motion.div>

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
            <VTurbPlayer playerId="69aa29eea584f1a405f84d6b" visible={platform === "ios"} />
            <p className="text-muted-foreground text-xs text-center">
              ⚠️ O vídeo usa outro jogo como exemplo, mas o processo de instalação é o mesmo.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
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

          {/* Cover */}
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
        <motion.div
          className="container max-w-lg mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="flex items-center justify-center gap-1 mb-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-center text-muted-foreground text-xs">
            <span className="text-foreground font-semibold">4.9/5</span> • Mais de 2.800 downloads essa semana
          </p>
        </motion.div>
      </section>

      {/* ─── TUTORIAL ─── */}
      <TutorialSection />

      {/* ─── DOWNLOAD ─── */}
      <section id="download" className="relative px-5 py-14">
        <div className="absolute inset-0 bg-grid-small opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-card/80 to-background/80" />

        <motion.div
          className="container max-w-lg mx-auto text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold uppercase tracking-widest mb-3">
              <Download className="w-3.5 h-3.5" /> Download
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Download gratuito
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              Clique abaixo para baixar o jogo.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
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
          </motion.div>
        </motion.div>
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
                <div className="rounded-xl overflow-hidden mb-4">
                  <img src={packImage} alt="Pack com todos os jogos" className="w-full" loading="lazy" decoding="async" />
                </div>

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
      <motion.section
        id="comparativo"
        className="px-5 py-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="container max-w-lg mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold uppercase tracking-widest mb-3">
              <Zap className="w-3.5 h-3.5" /> Comparativo
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Manual vs Automático
            </h2>
            <p className="text-muted-foreground text-sm">
              Não quer instalar manualmente? Compare:
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden glass-card">
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
          </motion.div>

          <motion.div variants={fadeUp}>
            <button
              onClick={() => scrollTo("premium")}
              className="group w-full mt-6 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-6 py-3.5 rounded-xl hover:brightness-110 transition-all glow-primary"
            >
              <Zap className="w-4 h-4" />
              Quero a versão automática
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── JOGOS DO PACK ─── */}
      <section id="jogos" className="relative px-5 py-14">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-card/90 via-card/70 to-card/90" />

        <motion.div
          className="container max-w-2xl mx-auto relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground mb-2">
              Escolha Seu Jogo Favorito
              <br />
              <span className="text-gradient-primary italic">e Comece a Jogar em 1 Clique</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">+100 jogos prontos para instalar no Android e iPhone</p>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-2 sm:gap-3 mb-10 max-w-md mx-auto">
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
          </motion.div>

          {/* Search bar */}
          <motion.div variants={fadeUp} className="relative mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar jogos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-card rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
            />
          </motion.div>

          {/* Games grid */}
          {filteredCategories.length > 0 ? filteredCategories.map((cat) => (
            <motion.div key={cat.label} className="mb-10 last:mb-0" variants={fadeUp}>
              <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                {cat.label}
                <span className="h-px flex-1 bg-border" />
                <span className="text-[10px] text-muted-foreground font-normal">{cat.games.length} jogos</span>
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-2.5">
                {cat.games.map((g) => (
                  <div key={g.name} className="group">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden border border-border/50 group-hover:border-primary/40 group-hover:glow-primary transition-all bg-muted">
                      <img src={g.img} alt={g.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" decoding="async" width={120} height={160} />
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground text-center mt-1.5 truncate leading-tight">{g.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )) : (
            <p className="text-muted-foreground text-sm text-center py-8">
              Nenhum jogo encontrado para "{searchQuery}"
            </p>
          )}

          <motion.p variants={fadeUp} className="text-muted-foreground text-[10px] text-center mt-6">
            E mais jogos adicionados toda semana!
          </motion.p>
        </motion.div>
      </section>

      {/* ─── PREMIUM ─── */}
      <motion.section
        id="premium"
        className="px-5 py-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="container max-w-md mx-auto">
          <motion.div
            variants={fadeUp}
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
              <div className="rounded-xl overflow-hidden mb-6">
                <img src={packImage} alt="Pack com todos os jogos" className="w-full" loading="lazy" decoding="async" />
              </div>

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
          </motion.div>
        </div>
      </motion.section>

      {/* ─── FAQ ─── */}
      <motion.section
        className="relative px-5 py-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="absolute inset-0 bg-grid-small opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-card/80 to-background/80" />

        <div className="container max-w-lg mx-auto relative z-10">
          <motion.div variants={fadeUp} className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold uppercase tracking-widest mb-3">
              FAQ
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Dúvidas frequentes
            </h2>
          </motion.div>

          <div className="space-y-3">
            {[
              { q: "O download é gratuito?", a: "Sim, você pode baixar e instalar o jogo gratuitamente." },
              { q: "Preciso pagar para jogar?", a: "Não. O pagamento é só para quem quer instalação automática e o pack com +100 jogos." },
              { q: "O instalador automático é seguro?", a: "Sim, ele apenas automatiza a instalação para facilitar." },
              { q: "Quais jogos vêm no pack?", a: "GTA, God of War, NFS, Dragon Ball, Naruto, Spider-Man, Tekken, e muitos outros clássicos." },
            ].map(({ q, a }, i) => (
              <motion.div
                key={q}
                variants={fadeUp}
                className="rounded-xl glass-card p-5"
              >
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{q}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

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

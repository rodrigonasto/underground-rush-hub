import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, ShieldCheck, ChevronRight, Check } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const BelowFoldContent = lazy(() => import("@/components/BelowFoldContent"));

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const CDN_BASE = "https://pub-ea93f56e93a64de8a24b1a7fcd48b703.r2.dev";
const HERO_IMAGE = `${CDN_BASE}/nfs-cover.webp`;

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden noise-overlay">
      <SEOHead
        title="Jogos Mobile Club — Jogue clássicos no celular"
        description="Baixe e jogue NFS Underground 2, GTA, God of War e +100 jogos clássicos no celular. Tutorial completo e instalação fácil."
        path="/"
      />

      <main>
        {/* ─── HERO ─── */}
        <section className="relative px-5 pt-12 pb-10 sm:pt-20 sm:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

          <div className="container max-w-lg mx-auto text-center relative z-10 hero-fade-in">
            <div className="inline-flex items-center gap-1.5 glass-card text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
              <Smartphone className="w-3.5 h-3.5" />
              Android & iPhone
            </div>

            {/* LCP element */}
            <div className="w-full max-w-sm mx-auto mb-8">
              <img
                src={HERO_IMAGE}
                alt="Need for Speed Underground 2 no celular"
                className="w-full rounded-2xl glow-primary-strong border border-primary/20"
                width={448}
                height={252}
                fetchPriority="high"
              />
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground leading-tight mb-3">
              JOGUE{" "}
              <span className="text-gradient-primary italic">NEED FOR SPEED UNDERGROUND 2</span>{" "}
              DIRETO NO CELULAR
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-md mx-auto">
              Sim… o clássico que dominou PS2 e PC agora roda no seu Android ou iPhone.
              Veja o tutorial gratuito e descubra como instalar em poucos minutos.
            </p>

            {/* Bullets */}
            <ul className="flex flex-col items-start gap-2.5 max-w-xs mx-auto mb-8 text-left">
              {[
                "Funciona em Android e iPhone",
                "Tutorial simples passo a passo",
                "Sem console e sem PC",
                "Comece a jogar ainda hoje",
              ].map((text) => (
                <li key={text} className="flex items-center gap-2 text-sm text-foreground/90">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  {text}
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollTo("tutorial")}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground font-bold text-sm px-10 py-4 rounded-xl hover:brightness-110 transition-all glow-primary"
            >
              VER COMO INSTALAR AGORA
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <div className="flex items-center justify-center gap-5 mt-6 text-muted-foreground text-xs">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-primary/70" /> Seguro</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Sem cadastro</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Grátis</span>
            </div>
          </div>
        </section>

        {/* Everything below hero is lazy loaded */}
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <BelowFoldContent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            downloadModalOpen={downloadModalOpen}
            setDownloadModalOpen={setDownloadModalOpen}
            navigate={navigate}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Download, ShieldCheck, ExternalLink, Star, Zap, Check, ChevronRight } from "lucide-react";
import { CDN_BASE_URL } from "@/lib/cdn";
import { trackCheckoutClick } from "@/lib/tracking";
import VTurbPlayer from "@/components/VTurbPlayer";
import SEOHead from "@/components/SEOHead";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });


interface StepItem {
  step: number;
  title: string;
  fileName: string;
  buttonLabel: string;
  description: string;
  link: string;
  isMain?: boolean;
}

const downloadSteps: StepItem[] = [
  {
    step: 1,
    title: "Baixar o jogo completo",
    fileName: "Need for Speed Underground 2",
    buttonLabel: "Baixar o jogo",
    description: "Pacote completo com emulador, BIOS e jogo. Tudo que você precisa para jogar.",
    link: "https://www.transfernow.net/dl/nfs-und2-pack-completo",
    isMain: true,
  },
];

const StepCard = ({ item }: { item: StepItem }) => (
  <div className="relative rounded-2xl p-6 sm:p-8 bg-background border-2 border-primary shadow-[0_0_32px_-4px_hsl(var(--primary)/0.3)] text-center">
    {/* Badge */}
    <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
      <Zap className="w-3.5 h-3.5" />
      PACOTE MOBILE
    </div>

    {/* Title */}
    <h4 className="text-lg sm:text-xl font-extrabold text-foreground mb-2">
      {item.fileName}
    </h4>

    {/* Description */}
    <p className="text-muted-foreground text-sm mb-2 max-w-xs mx-auto">
      {item.description}
    </p>

    {/* Checklist */}
    <div className="flex flex-col items-center gap-1.5 mb-6">
      {["Emulador", "BIOS", "Jogo (ROM)"].map((label) => (
        <span key={label} className="inline-flex items-center gap-1.5 text-xs text-primary font-medium">
          <Check className="w-3.5 h-3.5" /> {label} incluído
        </span>
      ))}
    </div>

    {/* CTA Button */}
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2.5 font-extrabold text-sm sm:text-base px-8 py-4 rounded-xl bg-primary text-primary-foreground hover:brightness-110 shadow-[0_0_24px_-2px_hsl(var(--primary)/0.45)] transition-all w-full sm:w-auto"
    >
      <Download className="w-5 h-5 shrink-0" />
      Baixar jogo completo
      <ChevronRight className="w-4 h-4 shrink-0" />
    </a>

    <p className="text-muted-foreground text-[11px] mt-3">
      Arquivo único — baixe e siga o tutorial acima
    </p>
  </div>
);

const DownloadPage = () => {
  const navigate = useNavigate();
  const [platform, setPlatform] = useState<"android" | "ios">(() => {
    const ua = navigator.userAgent || "";
    return /iPhone|iPad|iPod/i.test(ua) ? "ios" : "android";
  });

  // Acesso livre — sem proteção por sessionStorage

  const steps = downloadSteps;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <main>
      <SEOHead
        title="Download NFS Underground 2 para celular — Jogos Mobile Club"
        description="Baixe Need for Speed Underground 2 grátis para Android e iPhone. Tutorial passo a passo com emulador e arquivos necessários."
        path="/download"
      />

      {/* ─── HERO / CONFIRMAÇÃO ─── */}
      <section className="px-5 pt-10 pb-8 sm:pt-16 sm:pb-12">
        <div className="container max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            ✅ Download liberado
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight mb-2">
            👉 Need for Speed Underground 2 rodando no celular 📱
          </h1>
          <p className="text-muted-foreground text-sm">
            Siga os passos abaixo para instalar e começar a jogar no celular.
          </p>
          <div className="mt-5 bg-secondary/50 border border-border rounded-xl px-4 py-3">
            <p className="text-xs text-muted-foreground text-center leading-loose">
              ⚠️ Segue exatamente o passo a passo<br />
              se pular alguma parte ou fizer diferente<br />
              pode não funcionar direito no seu celular
            </p>
          </div>
        </div>
      </section>

      {/* ─── TUTORIAL + ARQUIVOS ─── */}
      <section id="tutorial" className="px-5 py-10 bg-card">
        <div className="container max-w-lg mx-auto">
          <h2 className="text-lg font-bold text-foreground text-center mb-1">
            Como instalar o jogo no celular
          </h2>
          <p className="text-muted-foreground text-sm text-center mb-6">
            Assista ao vídeo abaixo para aprender como instalar corretamente no seu celular.
          </p>

          {/* Platform Tabs */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setPlatform("android")}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all border ${
                platform === "android"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              <span className="text-xl">🤖</span> Android
            </button>
            <button
              onClick={() => setPlatform("ios")}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all border ${
                platform === "ios"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              <span className="text-xl">🍎</span> iPhone
            </button>
          </div>

          {/* Video por plataforma */}
          <div className="mb-3">
            <VTurbPlayer playerId="69bcad4b6ced9201ea5168ad" visible={platform === "android"} />
            <VTurbPlayer playerId="69bcad03596c6131b739d688" visible={platform === "ios"} vertical />
          </div>
          <p className="text-muted-foreground text-xs text-center mb-4">
            OBS: O TUTORIAL É DE OUTRO JOGO,<br />
            POREM É O MESMO FORMATO DE INSTALAÇÃO
          </p>
          <div className="bg-secondary/50 border border-border rounded-xl px-4 py-3 mb-10">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              💡 Cada detalhe aqui faz diferença pra rodar liso.
            </p>
          </div>

          {/* ─── ARQUIVOS NECESSÁRIOS ─── */}
          <h3 className="text-base font-bold text-foreground text-center mb-1">
            Arquivos necessários para instalar
          </h3>
          <p className="text-muted-foreground text-sm text-center mb-6">
            Siga os passos abaixo para instalar o jogo corretamente no seu celular.
          </p>

          {/* Platform label */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
              {platform === "android" ? "🤖 Android" : "🍎 iPhone"}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Step cards */}
          <div className="space-y-5">
            {steps.map((item) => (
              <StepCard key={item.step} item={item} />
            ))}
          </div>

          <div className="mt-6 bg-secondary/50 border border-border rounded-xl px-4 py-3">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              ⚠️ Se não ajustar certinho, pode travar ou nem abrir.
            </p>
          </div>

          {/* Toggle link */}
          <button
            onClick={() => setPlatform(platform === "android" ? "ios" : "android")}
            className="mt-6 w-full text-center text-muted-foreground text-xs hover:text-primary transition-colors"
          >
            {platform === "android" ? "Usa iPhone? Ver versão iOS →" : "Usa Android? Ver versão Android →"}
          </button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      </main>
      <footer className="px-5 py-6 border-t border-border">
        <p className="text-center text-muted-foreground text-[10px]">
          Conteúdo criado para ajudar jogadores a baixar e instalar Need for Speed Underground no celular sem complicação.
        </p>
      </footer>
    </div>
  );
};

export default DownloadPage;

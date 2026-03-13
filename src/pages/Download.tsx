import { useState } from "react";
import { Download, ShieldCheck, ExternalLink, Star, Zap, Check, ChevronRight } from "lucide-react";
import { CDN_BASE_URL } from "@/lib/cdn";
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

const androidSteps: StepItem[] = [
  {
    step: 1,
    title: "Baixar o emulador",
    fileName: "NetherSX2",
    buttonLabel: "Baixar emulador NetherSX2",
    description: "Aplicativo que permite rodar jogos de PS2 no celular.",
    link: "https://www.mediafire.com/file/hv7aape7n0ar8fm/NetherSX2-v2.0+signed+@JogosMobileClub.com.br.apk/file",
  },
  {
    step: 2,
    title: "Baixar BIOS",
    fileName: "BIOS PS2",
    buttonLabel: "Baixar BIOS",
    description: "Arquivo necessário para o funcionamento do emulador.",
    link: "https://www.mediafire.com/file/ndivybmtt3pb27w/Bios+@JogosMobileClub.com.br.rar/file",
  },
  {
    step: 3,
    title: "Baixar o jogo (principal)",
    fileName: "Need for Speed Underground 2",
    buttonLabel: "Baixar o jogo (arquivo principal)",
    description: "Arquivo do jogo para rodar no emulador.",
    link: "https://www.mediafire.com/file/pwoqlz2zyl6myvs/NEED+FOR+SPEED+UND+2.rar/file",
    isMain: true,
  },
];

const iosSteps: StepItem[] = [
  {
    step: 1,
    title: "Baixar aplicativo de extração",
    fileName: "iRAR",
    buttonLabel: "Baixar iRAR",
    description: "Necessário para extrair os arquivos do jogo.",
    link: "https://apps.apple.com/br/app/irar-descompactar-arquivo/id989212129",
  },
  {
    step: 2,
    title: "Baixar o emulador",
    fileName: "PPSSPP",
    buttonLabel: "Baixar emulador PPSSPP",
    description: "Aplicativo que permite rodar o jogo no celular.",
    link: "https://apps.apple.com/br/app/ppsspp-psp-emulator/id6496972903",
  },
  {
    step: 3,
    title: "Baixar o jogo (principal)",
    fileName: "Need for Speed Underground 2",
    buttonLabel: "Baixar o jogo (arquivo principal)",
    description: "Arquivo do jogo para rodar no emulador.",
    link: "https://drive.google.com/file/d/1VeYjk3UQhaeg6cBHXQO5NMFGa-ekTpwz/view",
    isMain: true,
  },
];

const StepCard = ({ item }: { item: StepItem }) => (
  <div
    className={`relative rounded-2xl p-5 transition-all ${
      item.isMain
        ? "bg-background border-2 border-primary shadow-[0_0_24px_-4px_hsl(var(--primary)/0.35)]"
        : "bg-background border border-border"
    }`}
  >
    {/* Badge principal */}
    {item.isMain && (
      <div className="absolute -top-3 left-4 inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
        <Star className="w-3 h-3 fill-current" />
        Arquivo Principal
      </div>
    )}

    {/* Step number + title */}
    <div className="flex items-center gap-3 mb-2">
      <span
        className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-black shrink-0 ${
          item.isMain
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        {item.step}
      </span>
      <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
    </div>

    {/* File name */}
    <p className="text-foreground/80 text-sm font-semibold ml-11 mb-1">{item.fileName}</p>

    {/* Description */}
    <p className="text-muted-foreground text-xs ml-11 mb-4">{item.description}</p>

    {/* Hint for main */}
    {item.isMain && (
      <p className="text-primary text-[11px] font-semibold ml-11 mb-2">
        Este é o arquivo do jogo
      </p>
    )}

    {/* Download button */}
    <a
      href={item.link}
      className={`ml-11 flex items-center gap-2 font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl transition-all w-fit ${
        item.isMain
          ? "bg-primary text-primary-foreground hover:brightness-110 shadow-[0_0_16px_-2px_hsl(var(--primary)/0.4)]"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      }`}
    >
      <Download className="w-4 h-4 shrink-0" />
      <span>{item.buttonLabel}</span>
    </a>
  </div>
);

const DownloadPage = () => {
  const [platform, setPlatform] = useState<"android" | "ios">(() => {
    const ua = navigator.userAgent || "";
    return /iPhone|iPad|iPod/i.test(ua) ? "ios" : "android";
  });

  const steps = platform === "android" ? androidSteps : iosSteps;

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
            🎮 Need for Speed Underground 2 pronto para baixar
          </h1>
          <p className="text-muted-foreground text-sm">
            Siga os passos abaixo para instalar e começar a jogar no celular.
          </p>
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
            <VTurbPlayer playerId="69b22b5e005f4e6dada6b831" visible={platform === "android"} />
            <VTurbPlayer playerId="69aa29eea584f1a405f84d6b" visible={platform === "ios"} vertical />
          </div>
          <p className="text-muted-foreground text-xs text-center mb-10">
            ⚠️ O vídeo usa outro jogo como exemplo, mas o processo de instalação é o mesmo.
          </p>

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

          {/* ─── PREMIUM ─── */}
          <div
            className="mt-8 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, hsl(142 72% 50% / 0.06), hsl(150 6% 8%))" }}
          >
            {/* Top shimmer bar */}
            <div className="absolute top-0 inset-x-0 h-0.5 shimmer-border" />

            {/* Glow orb */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-primary/8 blur-[80px]" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-full mb-5 border border-primary/30 bg-primary/10">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-primary">Instalação Automática + Biblioteca Gamer</span>
              </div>

              <p className="text-muted-foreground text-sm mb-5 max-w-sm mx-auto">
                Com o instalador automático, o jogo é preparado e configurado para rodar no seu celular sem complicação.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                INSTALAÇÃO AUTOMÁTICA +{" "}
                <span className="text-gradient-primary">BIBLIOTECA GAMER (+100 jogos)</span>
              </h2>

              {/* Pack image */}
              <div className="rounded-xl overflow-hidden mb-6">
                <img src={`${CDN_BASE_URL}/pack-image.webp`} alt="Pack com todos os jogos" className="w-full" loading="lazy" decoding="async" width={600} height={400} />
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

              {/* Ancoragem de Valor */}
              <div className="rounded-xl glass-card p-5 mb-6">
                <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Valor incluído</h3>
                <div className="space-y-2.5 mb-4">
                  {[
                    { label: "Biblioteca com +100 jogos", value: "R$97" },
                    { label: "Instalador automático", value: "R$47" },
                    { label: "Atualizações futuras", value: "R$37" },
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
                  <span className="text-foreground font-bold line-through">R$181</span>
                </div>
                <div className="text-center mt-4">
                  <span className="text-muted-foreground text-sm block mb-1">Hoje você libera tudo por apenas:</span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-extrabold text-gradient-primary">R$ 47</span>
                    <span className="text-muted-foreground text-lg">,00</span>
                  </div>
                </div>
              </div>

              <a
                href="https://pay.lowify.com.br/checkout.php?product_id=QnPBLL"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm py-4 px-6 rounded-xl hover:brightness-110 transition-all glow-primary overflow-hidden"
              >
                <Zap className="w-4 h-4 flex-shrink-0" />
                <span>QUERO INSTALAR E JOGAR EM 1 CLIQUE</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>

              <p className="text-muted-foreground text-xs mt-3">
                Pagamento único • Acesso imediato após o pagamento
              </p>
            </div>
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

      {/* ─── GRUPO VIP ─── */}
      <section className="px-5 py-10">
        <div className="container max-w-lg mx-auto text-center">
          <h2 className="text-lg font-bold text-foreground mb-2">
            Receba novos jogos no celular
          </h2>
          <p className="text-muted-foreground text-sm mb-5 text-left">
            Entre na nossa comunidade e receba:
          </p>
          <ul className="text-left space-y-2.5 mb-6 max-w-sm mx-auto">
            {[
              "Novos jogos que rodam no celular",
              "Dicas para melhorar desempenho",
              "Packs exclusivos",
              "Promoções especiais",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/90">
                <span className="text-primary mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="https://wa.me/5531983496296?text=Quero%20entrar%20no%20grupo%20VIP%20de%20jogos"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 text-background font-bold text-base py-4 rounded-xl hover:bg-amber-300 transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            Solicitar acesso ao Grupo VIP
          </a>
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

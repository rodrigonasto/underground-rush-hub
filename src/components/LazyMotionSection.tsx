import { Check, X, Zap, Star, ShieldCheck, ChevronRight, Search, ArrowUp, Sparkles } from "lucide-react";
import GameCover from "@/components/GameCover";
import packImageWebp from "@/assets/pack-image.webp";
import packImage from "@/assets/pack-image-v2.png";

interface LazyMotionSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredCategories: { label: string; games: string[] }[];
  navigate: (path: string) => void;
}

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

const LazyMotionSection = ({ searchQuery, setSearchQuery, filteredCategories, navigate }: LazyMotionSectionProps) => {
  return (
    <>
      {/* ─── COMPARAÇÃO ─── */}
      <section id="comparativo" className="px-5 py-14">
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
            <div className="grid grid-cols-2">
              <div className="bg-muted/50 p-3.5 text-center border-b border-r border-border">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Manual</span>
              </div>
              <div className="p-3.5 text-center border-b border-border" style={{ background: "hsl(142 72% 50% / 0.06)" }}>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Automático</span>
              </div>
            </div>

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
            onClick={() => document.getElementById("premium")?.scrollIntoView({ behavior: "smooth" })}
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
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground mb-2">
              Escolha Seu Jogo Favorito
              <br />
              <span className="text-gradient-primary italic">e Comece a Jogar em 1 Clique</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">+100 jogos prontos para instalar no Android e iPhone</p>
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
            <div key={cat.label} className="mb-10 last:mb-0">
              <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                {cat.label}
                <span className="h-px flex-1 bg-border" />
                <span className="text-[10px] text-muted-foreground font-normal">{cat.games.length} jogos</span>
              </h3>
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
      <section id="premium" className="px-5 py-14">
        <div className="container max-w-md mx-auto">
          <div
            className="rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, hsl(142 72% 50% / 0.06), hsl(150 6% 8%))" }}
          >
            <div className="absolute top-0 inset-x-0 h-0.5 shimmer-border" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-primary/8 blur-[80px]" />

            <div className="relative z-10">
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

              <PackImage />

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
      <section className="relative px-5 py-14">
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
              <div key={q} className="rounded-xl glass-card p-5">
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
    </>
  );
};

export default LazyMotionSection;

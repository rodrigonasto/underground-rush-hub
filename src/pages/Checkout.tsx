import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, ShieldCheck, Check, Clock, ChevronRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import checkoutProduct from "@/assets/checkout-product.webp";

/* ── Social proof data ── */
const socialProofMessages = [
  "Rafael de Campinas acabou de garantir o acesso",
  "Camila de Curitiba acabou de garantir o acesso",
  "Lucas de São Paulo acabou de garantir o acesso",
  "Bruna de Fortaleza acabou de garantir o acesso",
  "Matheus de Belo Horizonte acabou de garantir o acesso",
  "Felipe de Goiânia acabou de garantir o acesso",
  "Diego de Recife acabou de garantir o acesso",
  "Rodrigo de Brasília acabou de garantir o acesso",
  "Gustavo de Manaus acabou de garantir o acesso",
  "Thiago de São José dos Campos acabou de garantir o acesso",
  "André de Ribeirão Preto acabou de garantir o acesso",
  "Carlos de Salvador acabou de garantir o acesso",
];

/* ── Timer hook (7 min) ── */
const useCountdown = (seconds: number) => {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    if (remaining <= 0) return;
    const t = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, [remaining]);
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  return { mm, ss, expired: remaining <= 0 };
};

/* ── Toast notification component ── */
const SocialToast = ({ message, visible }: { message: string; visible: boolean }) => (
  <div
    className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 transition-all duration-500 ${
      visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
    }`}
  >
    <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-lg">
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
        <Check className="w-4 h-4 text-primary" />
      </div>
      <p className="text-foreground text-xs font-medium leading-snug">{message}</p>
    </div>
  </div>
);

const CHECKOUT_URL = "https://pay.lowify.com.br/checkout.php?product_id=QnPBLL";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { mm, ss } = useCountdown(7 * 60);

  /* Social proof */
  const [toast, setToast] = useState({ message: "", visible: false });
  const indexRef = useRef(Math.floor(Math.random() * socialProofMessages.length));

  const showNext = useCallback(() => {
    const msg = socialProofMessages[indexRef.current % socialProofMessages.length];
    indexRef.current++;
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 4000);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => showNext(), 3000);
    const interval = setInterval(() => showNext(), 13000);
    return () => { clearTimeout(delay); clearInterval(interval); };
  }, [showNext]);

  /* Auth guard */
  useEffect(() => {
    if (!sessionStorage.getItem("dl_auth")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

    return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Checkout — Biblioteca Gamer Premium"
        description="Finalize seu acesso à Biblioteca Gamer Premium com +100 jogos clássicos prontos para jogar no celular."
        path="/checkout"
      />

      <main className="px-4 py-8 sm:py-12">
        <div className="container max-w-md mx-auto">

          {/* ─── STEP INDICATOR ─── */}
          <div className="text-center mb-6">
            <span className="text-xs font-semibold text-primary tracking-wider uppercase">Etapa 2 de 3</span>
            <h1 className="text-foreground font-bold text-lg mt-1">Libere sua biblioteca gamer</h1>
          </div>

          {/* ─── TIMER ─── */}
          <div className="flex items-center justify-center gap-2 mb-6 bg-card border border-border rounded-xl py-3 px-4">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <span className="text-muted-foreground text-xs font-medium">Seu acesso está reservado por:</span>
            <span className="text-foreground font-extrabold text-sm tracking-wider tabular-nums">
              {mm}:{ss}
            </span>
          </div>

          {/* ─── PRODUCT CARD ─── */}
          <div className="bg-card border border-border rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={checkoutProduct}
                alt="Biblioteca Gamer Premium"
                className="w-20 h-20 rounded-xl object-cover shrink-0"
                width={80}
                height={80}
              />
              <div>
                <h2 className="text-foreground font-bold text-sm leading-tight mb-1">
                  Biblioteca Gamer Premium
                </h2>
                <p className="text-muted-foreground text-xs">
                  +100 jogos clássicos • Android e iPhone
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-2 mb-4">
              {[
                "Instalação automática em 1 clique",
                "Biblioteca com +100 jogos clássicos",
                "Atualizações e novos jogos grátis",
                "Acesso vitalício • Sem mensalidade",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-foreground/90 text-xs">{t}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-muted-foreground text-xs">De</span>
                <span className="text-muted-foreground text-sm line-through">R$ 181,00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground text-sm font-bold">Hoje por</span>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-extrabold text-gradient-primary">R$ 27</span>
                  <span className="text-muted-foreground text-sm">,00</span>
                </div>
              </div>
              <p className="text-xs mt-1.5 text-right" style={{ color: "hsl(35 90% 60%)" }}>
                +2.800 jogadores já estão jogando
              </p>
            </div>
          </div>

          {/* ─── CONFIRMATION BLOCK ─── */}
          <div className="bg-card border border-border rounded-2xl p-5 mb-6 text-center">
            <h3 className="text-foreground font-bold text-base mb-1">
              Seu acesso está quase liberado
            </h3>
            <p className="text-muted-foreground text-xs mb-4">
              Revise os benefícios acima e continue para o pagamento seguro.
            </p>

            {/* Security microcopy */}
            <p className="text-muted-foreground text-[11px] mb-3">
              🔒 Ambiente seguro • Acesso liberado imediatamente após o pagamento
            </p>

            {/* Main CTA */}
            <a
              href={CHECKOUT_URL}
              className="premium-checkout-track group w-full flex flex-col items-center justify-center bg-primary text-primary-foreground font-bold text-sm py-4 px-6 rounded-xl hover:brightness-110 transition-all glow-primary"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 shrink-0" />
                CONTINUAR PARA O PAGAMENTO
                <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="text-[11px] font-medium text-primary-foreground/80 mt-1">
                PIX • Liberação imediata
              </span>
            </a>

            {/* Trust line */}
            <p className="text-muted-foreground text-[11px] mt-3">
              Pagamento único • Sem mensalidade • Acesso vitalício
            </p>
          </div>

          {/* ─── TRUST BADGES ─── */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              Compra segura
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
              <Zap className="w-3.5 h-3.5 text-primary" />
              Acesso imediato
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
              <Check className="w-3.5 h-3.5 text-primary" />
              Pagamento único
            </div>
          </div>

        </div>
      </main>

      {/* Social proof toast */}
      <SocialToast message={toast.message} visible={toast.visible} />
    </div>
  );
};

export default CheckoutPage;

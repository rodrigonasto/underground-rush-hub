import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Gamepad2, Star, TrendingUp, Zap, ChevronRight, Flame, Crown, Shield, Download } from "lucide-react";

// Game covers
import godOfWar from "@/assets/games/god-of-war.jpg";
import gtaSa from "@/assets/games/gta-sa.jpg";
import shadowColossus from "@/assets/games/shadow-colossus.jpg";
import dbz from "@/assets/games/dbz.jpg";
import residentEvil from "@/assets/games/resident-evil.jpg";
import fifa from "@/assets/games/fifa.jpg";
import metalGear from "@/assets/games/metal-gear.jpg";
import crash from "@/assets/games/crash.jpg";
import nfsCover from "@/assets/nfs-cover.webp";

interface GameItem {
  id: number;
  title: string;
  cover: string;
  category: string;
  rating: number;
  size: string;
  isHot?: boolean;
  isNew?: boolean;
}

const games: GameItem[] = [
  { id: 1, title: "God of War II", cover: godOfWar, category: "Ação", rating: 4.9, size: "2.1 GB", isHot: true },
  { id: 2, title: "GTA San Andreas", cover: gtaSa, category: "Mundo Aberto", rating: 4.9, size: "1.8 GB", isHot: true },
  { id: 3, title: "NFS Underground 2", cover: nfsCover, category: "Corrida", rating: 4.8, size: "1.5 GB", isNew: true },
  { id: 4, title: "Dragon Ball Z BT3", cover: dbz, category: "Luta", rating: 4.8, size: "2.3 GB", isHot: true },
  { id: 5, title: "Resident Evil 4", cover: residentEvil, category: "Terror", rating: 4.7, size: "1.9 GB" },
  { id: 6, title: "Shadow of Colossus", cover: shadowColossus, category: "Aventura", rating: 4.9, size: "1.6 GB" },
  { id: 7, title: "FIFA Street 2", cover: fifa, category: "Esporte", rating: 4.5, size: "1.2 GB" },
  { id: 8, title: "Metal Gear Solid 3", cover: metalGear, category: "Stealth", rating: 4.8, size: "2.4 GB" },
  { id: 9, title: "Crash Bandicoot", cover: crash, category: "Plataforma", rating: 4.6, size: "0.9 GB", isNew: true },
];

const categories = ["Todos", "Ação", "Corrida", "Luta", "Mundo Aberto", "Terror", "Aventura", "Esporte"];

const GameCard = ({ game, index }: { game: GameItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card */}
      <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-card border border-border/50 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]">
        {/* Cover image */}
        <img
          src={game.cover}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {game.isHot && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.06 + 0.3, type: "spring" }}
              className="flex items-center gap-1 bg-destructive/90 backdrop-blur-sm text-destructive-foreground text-[9px] font-bold px-2 py-0.5 rounded-full"
            >
              <Flame className="w-2.5 h-2.5" />
              HOT
            </motion.div>
          )}
          {game.isNew && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.06 + 0.3, type: "spring" }}
              className="flex items-center gap-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full"
            >
              <Zap className="w-2.5 h-2.5" />
              NOVO
            </motion.div>
          )}
        </div>

        {/* Rating */}
        <div className="absolute top-2 right-2 flex items-center gap-0.5 glass-card px-1.5 py-0.5 rounded-full">
          <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
          <span className="text-[9px] font-bold text-foreground">{game.rating}</span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 inset-x-0 p-3">
          <p className="text-foreground text-xs font-bold truncate mb-0.5">{game.title}</p>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-[9px]">{game.category}</span>
            <span className="text-muted-foreground text-[9px]">{game.size}</span>
          </div>
        </div>

        {/* Hover overlay - download icon */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.5)]"
              >
                <Download className="w-5 h-5 text-primary-foreground" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const GameLibraryShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showCount, setShowCount] = useState(0);

  // Animated counter
  useEffect(() => {
    const target = 127;
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setShowCount(target);
        clearInterval(timer);
      } else {
        setShowCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  const filteredGames = activeCategory === "Todos"
    ? games
    : games.filter((g) => g.category === activeCategory);

  return (
    <div className="relative">
      {/* Phone mockup frame */}
      <div className="relative mx-auto max-w-[380px]">
        {/* Phone bezel */}
        <div className="relative rounded-[2.5rem] border-[3px] border-border/60 bg-background overflow-hidden shadow-[0_0_80px_-20px_hsl(var(--primary)/0.2)]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 py-2 bg-background">
            <span className="text-[10px] text-muted-foreground font-medium">9:41</span>
            <div className="w-20 h-5 rounded-full bg-border/50 mx-auto" />
            <div className="flex items-center gap-1">
              <div className="w-3.5 h-2 rounded-sm border border-muted-foreground/50">
                <div className="w-2.5 h-1 bg-primary rounded-[1px] m-[1px]" />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="px-4 pb-6">
            {/* App header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-4"
            >
              <div>
                <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-primary" />
                  Biblioteca
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  <span className="text-primary font-bold">{showCount}</span> jogos disponíveis
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>
            </motion.div>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`relative mb-4 transition-all duration-300 ${
                searchFocused ? "scale-[1.02]" : ""
              }`}
            >
              <div className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border transition-all duration-300 ${
                searchFocused
                  ? "border-primary/50 bg-primary/5 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.2)]"
                  : "border-border bg-secondary/50"
              }`}>
                <Search className={`w-3.5 h-3.5 transition-colors ${searchFocused ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-[11px] text-muted-foreground">Buscar jogos...</span>
              </div>
            </motion.div>

            {/* Featured banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="relative rounded-2xl overflow-hidden mb-4 aspect-[2.2/1]"
            >
              <img src={nfsCover} alt="Featured" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3 text-primary" />
                  <span className="text-[9px] font-bold text-primary uppercase tracking-wider">Em destaque</span>
                </div>
                <p className="text-foreground text-sm font-bold">NFS Underground 2</p>
                <p className="text-muted-foreground text-[9px]">Agora disponível na biblioteca</p>
              </div>
              <div className="absolute bottom-3 right-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
                  <ChevronRight className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            </motion.div>

            {/* Category pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide"
              style={{ scrollbarWidth: "none" }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* Section title */}
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-foreground">
                {activeCategory === "Todos" ? "Todos os Jogos" : activeCategory}
              </h4>
              <span className="text-[9px] text-primary font-semibold">
                {filteredGames.length} de 127 jogos
              </span>
            </div>

            {/* Game grid */}
            <motion.div
              layout
              className="grid grid-cols-3 gap-2.5"
            >
              <AnimatePresence mode="popLayout">
                {filteredGames.map((game, i) => (
                  <GameCard key={game.id} game={game} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* "More games" indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 text-center"
            >
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary/50 border border-border/50">
                <span className="text-[10px] text-muted-foreground">+118 jogos disponíveis</span>
                <ChevronRight className="w-3 h-3 text-primary" />
              </div>
            </motion.div>
          </div>

          {/* Bottom navigation bar */}
          <div className="flex items-center justify-around py-3 px-4 border-t border-border bg-background/80 backdrop-blur-md">
            {[
              { icon: Gamepad2, label: "Biblioteca", active: true },
              { icon: TrendingUp, label: "Populares", active: false },
              { icon: Star, label: "Favoritos", active: false },
              { icon: Crown, label: "Premium", active: false },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-0.5">
                <item.icon
                  className={`w-4 h-4 ${item.active ? "text-primary" : "text-muted-foreground/50"}`}
                />
                <span
                  className={`text-[8px] font-semibold ${
                    item.active ? "text-primary" : "text-muted-foreground/50"
                  }`}
                >
                  {item.label}
                </span>
                {item.active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="w-1 h-1 rounded-full bg-primary"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Home indicator */}
          <div className="flex justify-center py-2 bg-background">
            <div className="w-28 h-1 rounded-full bg-border/60" />
          </div>
        </div>

        {/* Outer glow */}
        <div className="absolute -inset-4 rounded-[3rem] bg-primary/5 blur-3xl -z-10 pointer-events-none" />
      </div>

      {/* CTA below phone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center"
      >
        <p className="text-muted-foreground text-xs mb-4">
          Tenha acesso a <strong className="text-foreground">+127 jogos clássicos</strong> com instalação automática
        </p>
        <a
          href="https://pay.lowify.com.br/checkout.php?product_id=QnPBLL"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full max-w-xs mx-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm py-4 px-6 rounded-xl hover:brightness-110 transition-all glow-primary"
        >
          <Zap className="w-4 h-4 flex-shrink-0" />
          <span>Quero acesso à biblioteca completa</span>
          <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
        </a>
        <p className="text-primary text-[10px] font-semibold mt-3">Pagamento único • Acesso vitalício</p>
      </motion.div>
    </div>
  );
};

export default GameLibraryShowcase;

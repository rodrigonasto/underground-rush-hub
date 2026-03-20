import { useState, useEffect, useRef } from "react";

interface VTurbPlayerProps {
  playerId: string;
  visible: boolean;
  vertical?: boolean;
}

const COMPANY_ID = "96d39e4a-f943-48d2-b660-6adc0b409f4e";

const VTurbPlayer = ({ playerId, visible, vertical }: VTurbPlayerProps) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Only load iframe when component becomes visible (lazy load)
  useEffect(() => {
    if (visible && !loaded) {
      setLoaded(true);
    }
  }, [visible, loaded]);

  const src = `https://scripts.converteai.net/${COMPANY_ID}/players/${playerId}/embed.html`;

  return (
    <div
      ref={ref}
      className={`w-full rounded-2xl overflow-hidden ${visible ? "block" : "hidden"}`}
    >
      {loaded ? (
        <iframe
          src={src}
          allow="autoplay; fullscreen"
          allowFullScreen
          referrerPolicy="origin"
          className="w-full border-none block"
          style={{ aspectRatio: vertical ? "888/1920" : "16/9" }}
          title="Tutorial de instalação"
          loading="lazy"
        />
      ) : (
        <div
          className="w-full bg-muted animate-pulse rounded-2xl"
          style={{ aspectRatio: vertical ? "888/1920" : "16/9" }}
        />
      )}
    </div>
  );
};

export default VTurbPlayer;

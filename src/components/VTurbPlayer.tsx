import { useRef, useEffect, useState } from "react";

interface VTurbPlayerProps {
  playerId: string;
  visible: boolean;
}

const COMPANY_ID = "a57aea77-33e9-4609-ae0f-96bf93c595a1";

const VTurbPlayer = ({ playerId, visible }: VTurbPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (visible && !mounted) setMounted(true);
  }, [visible, mounted]);

  useEffect(() => {
    if (!mounted || initialized.current || !containerRef.current) return;

    initialized.current = true;

    containerRef.current.innerHTML = `<vturb-smartplayer id="vid-${playerId}" style="display:block;margin:0 auto;width:100%;aspect-ratio:16/9;"></vturb-smartplayer>`;

    const scriptSrc = `https://scripts.converteai.net/${COMPANY_ID}/players/${playerId}/v4/player.js`;

    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.head.appendChild(script);
    }
  }, [mounted, playerId]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={!visible}
      className="w-full rounded-2xl overflow-hidden"
      style={{
        position: visible ? "relative" : "absolute",
        inset: visible ? "auto" : 0,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        height: visible ? "auto" : 0,
      }}
    >
      <div ref={containerRef} className="w-full" />
    </div>
  );
};

export default VTurbPlayer;

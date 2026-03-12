import { useRef, useEffect } from "react";

interface VTurbPlayerProps {
  playerId: string;
  visible: boolean;
}

const VTurbPlayer = ({ playerId, visible }: VTurbPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!visible || initialized.current || !containerRef.current) return;
    initialized.current = true;

    containerRef.current.innerHTML = `<vturb-smartplayer id="vid-${playerId}" style="display:block;margin:0 auto;width:100%;"></vturb-smartplayer>`;

    const scriptSrc = `https://scripts.converteai.net/a57aea77-33e9-4609-ae0f-96bf93c595a1/players/${playerId}/v4/player.js`;
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const s = document.createElement("script");
      s.src = scriptSrc;
      s.async = true;
      document.head.appendChild(s);
    }
  }, [playerId, visible]);

  if (!visible) return null;

  return (
    <div className="rounded-2xl overflow-hidden">
      <div ref={containerRef} />
    </div>
  );
};

export default VTurbPlayer;

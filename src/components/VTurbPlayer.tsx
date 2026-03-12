import { useRef, useEffect, useState } from "react";

interface VTurbPlayerProps {
  playerId: string;
  visible: boolean;
}

const COMPANY_ID = "a57aea77-33e9-4609-ae0f-96bf93c595a1";

const VTurbPlayer = ({ playerId, visible }: VTurbPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!visible) return;
    if (mounted) return;
    setMounted(true);
  }, [visible, mounted]);

  useEffect(() => {
    if (!mounted || !containerRef.current || scriptLoaded.current) return;
    scriptLoaded.current = true;

    // Create the smartplayer element exactly as VTurb documents it
    const wrapper = document.createElement("div");
    wrapper.id = `smartplayer-${playerId}`;
    wrapper.innerHTML = `
      <div id="vid_${playerId}" style="position:relative;width:100%;padding:56.25% 0 0;">
        <img id="thumb_${playerId}" src="https://images.converteai.net/${COMPANY_ID}/players/${playerId}/thumbnail.jpg" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;" alt="video thumbnail">
        <div id="backdrop_${playerId}" style="position:absolute;top:0;left:0;width:100%;height:100%;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);"></div>
      </div>
    `;
    containerRef.current.appendChild(wrapper);

    const scriptSrc = `https://scripts.converteai.net/${COMPANY_ID}/players/${playerId}/v4/player.js`;
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const s = document.createElement("script");
      s.src = scriptSrc;
      s.async = true;
      s.id = `scr_${playerId}`;
      document.head.appendChild(s);
    }
  }, [mounted, playerId]);

  if (!mounted && !visible) return null;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        display: visible ? "block" : "none",
      }}
    >
      <div ref={containerRef} />
    </div>
  );
};

export default VTurbPlayer;

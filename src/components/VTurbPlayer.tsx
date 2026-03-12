import { useRef, useEffect } from "react";

interface VTurbPlayerProps {
  playerId: string;
  visible: boolean;
}

const VTurbPlayer = ({ playerId, visible }: VTurbPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current || !containerRef.current) return;
    mountedRef.current = true;

    // Create the smartplayer element
    const player = document.createElement("vturb-smartplayer");
    player.id = `vid-${playerId}`;
    player.style.display = "block";
    player.style.width = "100%";
    containerRef.current.appendChild(player);

    // Load the script if not already loaded
    const scriptSrc = `https://scripts.converteai.net/a57aea77-33e9-4609-ae0f-96bf93c595a1/players/${playerId}/v4/player.js`;
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const s = document.createElement("script");
      s.src = scriptSrc;
      s.async = true;
      document.head.appendChild(s);
    }
  }, [playerId]);

  // Pause media when hidden
  useEffect(() => {
    if (!visible && containerRef.current) {
      containerRef.current.querySelectorAll("video, audio").forEach((el) => {
        (el as HTMLMediaElement).pause();
      });
    }
  }, [visible]);

  return (
    <div style={{ display: visible ? "block" : "none" }}>
      <div ref={containerRef} className="vturb-container" />
    </div>
  );
};

export default VTurbPlayer;

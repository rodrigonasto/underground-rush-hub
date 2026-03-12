import { useRef, useEffect } from "react";

interface VTurbPlayerProps {
  playerId: string;
  visible: boolean;
}

const VTurbPlayer = ({ playerId, visible }: VTurbPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !containerRef.current) return;
    initialized.current = true;

    // Inject the raw HTML the same way VTurb expects
    containerRef.current.innerHTML = `<vturb-smartplayer id="vid-${playerId}" style="display:block;margin:0 auto;width:100%;"></vturb-smartplayer>`;

    // Load the script
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
    <div
      style={{
        display: visible ? "block" : "none",
        visibility: visible ? "visible" : "hidden",
        height: visible ? "auto" : "0",
        overflow: "hidden",
      }}
      className="rounded-2xl overflow-hidden"
    >
      <div ref={containerRef} />
    </div>
  );
};

export default VTurbPlayer;

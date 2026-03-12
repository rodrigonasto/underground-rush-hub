import { useRef, useEffect } from "react";

interface VTurbPlayerProps {
  playerId: string;
  visible: boolean;
}

const COMPANY_ID = "a57aea77-33e9-4609-ae0f-96bf93c595a1";

const VTurbPlayer = ({ playerId, visible }: VTurbPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!visible || initialized.current || !containerRef.current) return;

    initialized.current = true;

    containerRef.current.innerHTML = "";

    const target = document.createElement("div");
    target.id = `vid_${playerId}`;
    target.style.width = "100%";
    containerRef.current.appendChild(target);

    const scriptSrc = `https://scripts.converteai.net/${COMPANY_ID}/players/${playerId}/v4/player.js`;

    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const s = document.createElement("script");
      s.src = scriptSrc;
      s.async = true;
      document.head.appendChild(s);
    }
  }, [playerId, visible]);

  const keepMounted = visible || initialized.current;

  if (!keepMounted) return null;

  return (
    <div className={`rounded-2xl overflow-hidden ${visible ? "block" : "hidden"}`} aria-hidden={!visible}>
      <div ref={containerRef} />
    </div>
  );
};

export default VTurbPlayer;

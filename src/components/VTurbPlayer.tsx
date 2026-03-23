import { useState, useEffect, useRef } from "react";

interface VTurbPlayerProps {
  playerId: string;
  companyId: string;
  visible: boolean;
  vertical?: boolean;
  maxWidth?: string;
}

const VTurbPlayer = ({ playerId, companyId, visible, vertical, maxWidth }: VTurbPlayerProps) => {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (visible && !loaded) {
      setLoaded(true);
    }
  }, [visible, loaded]);

  // Load SDK script once
  useEffect(() => {
    if (!loaded) return;
    const id = "vturb-sdk";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, [loaded]);

  // Set iframe src after mount
  useEffect(() => {
    if (!loaded || !iframeRef.current) return;
    const embedUrl = `https://scripts.converteai.net/${companyId}/players/${playerId}/v4/embed.html`;
    const search = window.location.search || "?";
    const vl = encodeURIComponent(window.location.href);
    iframeRef.current.src = `${embedUrl}${search}&vl=${vl}`;
  }, [loaded, playerId, companyId]);

  const padding = vertical ? "216.21621621621622%" : "56.25%";

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden ${visible ? "block" : "hidden"}`}
      style={{ maxWidth: maxWidth || "100%", margin: "0 auto" }}
    >
      {loaded ? (
        <div style={{ position: "relative", padding: `${padding} 0 0 0` }}>
          <iframe
            ref={iframeRef}
            id={`ifr_${playerId}`}
            frameBorder="0"
            allowFullScreen
            referrerPolicy="origin"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          />
        </div>
      ) : (
        <div
          className="w-full bg-muted animate-pulse rounded-2xl"
          style={{ paddingTop: padding }}
        />
      )}
    </div>
  );
};

export default VTurbPlayer;

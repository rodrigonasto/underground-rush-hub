interface VTurbPlayerProps {
  playerId: string;
  visible: boolean;
}

const COMPANY_ID = "a57aea77-33e9-4609-ae0f-96bf93c595a1";

const VTurbPlayer = ({ playerId, visible }: VTurbPlayerProps) => {
  const src = `https://scripts.converteai.net/${COMPANY_ID}/players/${playerId}/embed.html`;

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden ${visible ? "block" : "hidden"}`}
    >
      <iframe
        src={src}
        allow="autoplay; fullscreen"
        allowFullScreen
        referrerPolicy="origin"
        className="w-full border-none block aspect-[888/1920] sm:aspect-video"
        title="Tutorial de instalação"
      />
    </div>
  );
};

export default VTurbPlayer;

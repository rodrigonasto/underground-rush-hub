import { useState, useCallback } from "react";
import { getGameCoverUrl, FALLBACK_IMAGE } from "@/lib/cdn";

interface GameCoverProps {
  name: string;
  className?: string;
}

const GameCover = ({ name, className }: GameCoverProps) => {
  const [errored, setErrored] = useState(false);

  const handleError = useCallback(() => {
    if (!errored) setErrored(true);
  }, [errored]);

  const src = errored ? FALLBACK_IMAGE : getGameCoverUrl(name);

  return (
    <img
      src={src}
      alt={name}
      className={className}
      loading="lazy"
      decoding="async"
      width={300}
      height={450}
      onError={handleError}
    />
  );
};

export default GameCover;

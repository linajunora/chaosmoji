import { useState } from "react";
import type { KaomojiData } from "../../types/kaomoji";
import "./KaomojiCard.scss";

type KaomojiCardProps = {
  kaomoji: KaomojiData;
};

export const KaomojiCard = (props: KaomojiCardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.kaomoji.character);

      //put state to 'true' to show it is copied
      setIsCopied(true);

      //restating button after 2 sec
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Could not copy:", error);
    }
  };

  return (
    <button
      className={`kaomoji-card ${isCopied ? "is-copied" : ""}`}
      onClick={handleCopy}
      aria-label={"copy"}
    >
      <div className="character-container">
        <span className="character">{props.kaomoji.character}</span>
      </div>

      <div className="copy-tooltip">{isCopied ? "copied" : ""}</div>
    </button>
  );
};

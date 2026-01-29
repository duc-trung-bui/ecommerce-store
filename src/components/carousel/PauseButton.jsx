import React from "react";
import { Pause, Play } from "lucide-react";

function PauseButton({ isPaused, onToggle, isMobile }) {
  if (isMobile) return null;

  return (
    <button
      aria-label={isPaused ? "Play carousel" : "Pause carousel"}
      onClick={onToggle}
      className="
        absolute bottom-4 right-6
        w-12 h-12
        flex items-center justify-center
        rounded-full
        bg-black/40 backdrop-blur
        text-white
        hover:bg-black/70
        transition
      "
    >
      {isPaused ? <Play size={20} /> : <Pause size={20} />}
    </button>
  );
}

export default PauseButton;

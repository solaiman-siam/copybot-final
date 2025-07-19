import { useState, useEffect } from "react";

export function TypewriterResponse({ text }: { text: string | null }) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const speed = 10; // Milliseconds per word (adjust as needed)

  useEffect(() => {
    if(text) {
        if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer); // Cleanup
    }
    }
  }, [currentIndex, text]);

  return (
    <div className="typewriter-text font-medium font-avant">
      {displayedText}
    </div>
  );
}
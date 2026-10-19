import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ProgressBars from "./ProgressBars";
import PauseButton from "./PauseButton";

const AUTOPLAY_DELAY = 4000;

export default function HeroCarousel({ slides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  /* ---------------- Mobile Detection (Mobile < 768px) ---------------- */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  /* ---------------- Autoplay Reset on Index Change ---------------- */
  useEffect(() => {
    // If the index changes, we assume the user wants the carousel to resume autoplay
    // on the new slide, clearing any previous pause state.

    setIsPaused((prevIsPaused) => {
      // Only set to false if it was true.
      if (prevIsPaused) {
        return false;
      }
      // Otherwise, return the current state to prevent an unnecessary update.
      return prevIsPaused;
    });
  }, [selectedIndex]); // Run whenever the selectedIndex changes (e.g., after a swipe)

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  /* ---------------- Pause toggle (Stays the same) ---------------- */
  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  /* ---------------- Render ---------------- */
  return (
    <div className="relative group">
      {/* Carousel (content omitted for brevity) */}
      <div ref={emblaRef} className="overflow-hidden">
        {/* ... slides ... */}
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="min-w-full relative overflow-hidden flex flex-col md:flex-row items-stretch"
            >
              {/* TEXT SECTION */}
              <div className="relative z-10 w-full md:w-1/2 px-6 py-4 md:pr-[8%] flex items-center justify-center md:justify-start md:bottom-[20px]">
                <div className="max-w-full text-center md:text-left flex flex-col items-center md:items-start">
                  <h1 className="font-bold text-black text-4xl md:text-5xl font-bricolage">
                    {slide.title}
                  </h1>
                  <p className="mt-4 font-bricolage text-black text-xl">
                    {slide.subtitle}
                  </p>
                  {/* READ MORE BUTTON */}
                  <button
                    className="
                      mt-6
                      inline-block
                      px-6 py-3
                      bg-orange-400
                      text-white
                      font-semibold
                      shadow
                      hover:bg-red-500
                      hover:shadow-lg
                      transition
                    "
                  >
                    Read more
                  </button>
                </div>
              </div>

              {/* IMAGE SECTION */}
              <div className="relative w-full md:w-1/2 flex justify-center md:block">
                <img
                  src={slide.image}
                  className="
                    w-full md:w-auto  
                    h-[300px] md:h-[420px]
                    object-cover
                    md:ml-auto md:max-w-none
                    md:transform md:translate-x-[-60px]
                  "
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bars */}
      <ProgressBars
        slides={slides}
        currentIndex={selectedIndex}
        duration={AUTOPLAY_DELAY}
        isPaused={isPaused}
        onSelect={(newIndex) => {

          // 1. Determine if the click is on the current slide or a new slide.
          const isClickOnCurrentSlide = newIndex === selectedIndex;

          // 2. We only care about user clicks originating from the progress bars on mobile.
          if (isMobileView) {

            // If the user clicked the current bar, or clicked a new bar, we TOGGLE the state.
            // The action of clicking ANY progress bar on mobile is the pause/play control.
            setIsPaused((prev) => !prev);

            // If the user clicks a non-current slide, we MUST scroll to it immediately.
            if (!isClickOnCurrentSlide) {
              emblaApi?.scrollTo(newIndex);
            }

            // If the click was on the current slide, we DO NOT call scrollTo,
            // as this would reset the internal Embla timer/state and potentially conflict.

          } else {
            // 3. Desktop Behavior: Always scroll, never toggle pause here.
            // This causes an immediate re-render where the old slide is marked 'isPast' (100%).
            setSelectedIndex(newIndex);

            // This prevents the scroll action from destroying the old component before it renders 100%.
            setTimeout(() => {
              emblaApi?.scrollTo(newIndex);
            }, 1); // 1ms delay is often enough to batch the state update
          }
        }}
      />

      {/* Dedicated Pause Button (Hidden on mobile) */}
      {!isMobileView && (
        <PauseButton
          isPaused={isPaused}
          onToggle={togglePause}
          isMobile={false}
        />
      )}
    </div>
  );
}
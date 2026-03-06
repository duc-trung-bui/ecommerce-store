import React, { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";

const RESET_DELAY_MS = 50;
const START_DELAY_MS = 50;
const BAR_HEIGHT = 4;

function ProgressAnimator(props) {
  const { slides, currentIndex, isPaused, onSelect, duration } = props;

  const [progress, setProgress] = useState(0);

  const rafId = useRef(null);
  const startTimeRef = useRef(null);
  const cumulativeTimeRef = useRef(0);
  const completionTimeoutId = useRef(null);
  const startDelayTimeoutId = useRef(null);
  const currentPropsRef = useRef(props);
  const prevIsPausedRef = useRef(isPaused);
  const tickRef = useRef(() => { });

  // Ref to track initial mount completion
  const isInitialMountRef = useRef(true);

  // Ref to track if the penalty has been applied to cumulative time
  const hasPenaltyBeenApplied = useRef(false);

  // Runs ONCE when the slide changes (due to key).
  useEffect(() => {
    cumulativeTimeRef.current = 0;
    startTimeRef.current = null;
    prevIsPausedRef.current = isPaused;
    hasPenaltyBeenApplied.current = false; // Reset penalty flag

    return () => {
      isInitialMountRef.current = false;
    };
  }, []);

  useEffect(() => {
    currentPropsRef.current = props;
  }, [props]);

  // useLayoutEffect for synchronous visual resume update.
  useLayoutEffect(() => {
    const wasPaused = prevIsPausedRef.current;

    if (wasPaused && !isPaused && cumulativeTimeRef.current > 0) {
      const resumeValue = Math.min((cumulativeTimeRef.current / duration) * 100, 100);

      setProgress(resumeValue);
      startTimeRef.current = null;
    }

    prevIsPausedRef.current = isPaused;
  }, [isPaused, duration]);

  // Stable tick function definition (REMOVED DURATION PENALTY)
  useEffect(() => {
    const tick = (timestamp) => {
      const current = currentPropsRef.current;

      const fullDuration = current.duration;

      if (current.isPaused) {
        if (startTimeRef.current) {
          cumulativeTimeRef.current += timestamp - startTimeRef.current;
        }
        startTimeRef.current = null;
        rafId.current = requestAnimationFrame(tickRef.current);
        return;
      }

      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = (timestamp - startTimeRef.current) + cumulativeTimeRef.current;

      const value = Math.min((elapsed / fullDuration) * 100, 100);

      setProgress(value);

      // Completion Logic: Use a small tolerance on the full duration
      if (elapsed >= fullDuration - START_DELAY_MS) { // Use the START_DELAY_MS as tolerance
        setProgress(100);

        if (completionTimeoutId.current) clearTimeout(completionTimeoutId.current);
        if (startDelayTimeoutId.current) clearTimeout(startDelayTimeoutId.current);
        if (rafId.current) cancelAnimationFrame(rafId.current);

        completionTimeoutId.current = setTimeout(() => {
          current.onSelect((current.currentIndex + 1) % current.slides.length);
        }, RESET_DELAY_MS);

        return;
      }

      rafId.current = requestAnimationFrame(tickRef.current);
    };

    tickRef.current = tick;
  }, []);

  // Main Animation Loop: Starts RAF on mount/unpause and cleans up on unmount/pause
  useEffect(() => {
    // Cleanup any existing timers/loops when isPaused flips or on unmount
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (completionTimeoutId.current) clearTimeout(completionTimeoutId.current);
    if (startDelayTimeoutId.current) clearTimeout(startDelayTimeoutId.current);

    if (!isPaused) {
      // Mark initial mount as complete after first check
      if (isInitialMountRef.current) {
        isInitialMountRef.current = false;
      }

      // Inject the penalty here only if it hasn't been applied and we are starting fresh
      if (!hasPenaltyBeenApplied.current && cumulativeTimeRef.current === 0) {
        cumulativeTimeRef.current -= START_DELAY_MS;
        hasPenaltyBeenApplied.current = true;
      }

      // Use setTimeout to delay the start of the RAF loop
      startDelayTimeoutId.current = setTimeout(() => {
        if (!currentPropsRef.current.isPaused) {
          rafId.current = requestAnimationFrame(tickRef.current);
        }
      }, START_DELAY_MS);
    }

    // Comprehensive cleanup for unmount or dependency change
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (completionTimeoutId.current) clearTimeout(completionTimeoutId.current);
      if (startDelayTimeoutId.current) clearTimeout(startDelayTimeoutId.current);

      // 🛑 FINAL FIX: Aggressively reset cumulative time on component destruction/unmount.
      // This ensures no residual time is left in the ref before it is garbage collected.
      cumulativeTimeRef.current = 0;
    };
  }, [isPaused]);

  const memoizedTitles = useMemo(() => {
    const truncate = (title, maxChars = 25) => {
      if (!title) return '';
      return title.length > maxChars ? title.slice(0, maxChars) + '…' : title;
    };

    return slides.map(slide => truncate(slide.title || ""));
  }, [slides]);


  return (
    <div className="flex items-end gap-2 md:gap-4 lg:gap-8 h-8 w-full mx-auto">
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        const barWidth = isActive ? `${progress}%` : "0%";

        return (
          <button
            key={index}
            onClick={() => onSelect(index)}
            // Ensure the button can shrink if needed
            className="flex-1 group flex flex-col justify-end gap-2 min-w-0"
          >
            <div
              className="relative w-full rounded overflow-hidden transition-all duration-300 ease-out h-1 bg-gray-200"
            >
              <div className="absolute inset-0 bg-black/20 rounded-sm" />
              <div
                className="absolute bottom-0 left-0 bg-orange-300 rounded-sm"
                style={{ width: barWidth, height: `${BAR_HEIGHT}px` }}
              />
            </div>
            <span
              className={`hidden md:block text-[10px] lg:text-xs font-bricolage truncate text-left transition-colors duration-300 ${isActive
                ? "text-orange-300 font-bold text-shadow-sm"
                : "text-gray-800 hover:text-orange-300"
              }`}
            >
              {memoizedTitles[index] || `Slide ${index + 1}`}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default ProgressAnimator;
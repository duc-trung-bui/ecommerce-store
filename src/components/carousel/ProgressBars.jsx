import React from 'react';
import ProgressAnimator from './ProgressAnimator'; // Import the new logic component

/**
 * ProgressBars component acts as a wrapper that manages the layout and enforces 
 * a state reset on the child component (ProgressAnimator) when the slide index changes.
 */
function ProgressBars(props) {
  const { slides, currentIndex, duration, isPaused, onSelect } = props;

  return (
    <div className="absolute bottom-4 md:left-6 left-4 w-[92%] md:w-[85%] lg:max-w-5xl">
      {/* CRITICAL FIX: Using the 'key' prop tied to currentIndex forces 
                 ProgressAnimator to destroy and rebuild (resetting all state) 
                 every time the slide changes.
             */}
      <ProgressAnimator
        key={currentIndex}
        slides={slides}
        currentIndex={currentIndex}
        duration={duration}
        isPaused={isPaused}
        onSelect={onSelect}
      />
    </div>
  );
}

export default ProgressBars;
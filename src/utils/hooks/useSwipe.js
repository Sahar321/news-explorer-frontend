import { useState } from 'react';

export default function useSwipe({
  minSwipeDistance = 80,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onSwipeStart,
  onSwipeEnd,
}) {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  const onTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
    if (onSwipeStart) onSwipeStart();
  };

  const onTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (touchStartX - touchEndX > minSwipeDistance && onSwipeLeft) {
      onSwipeLeft();
    }

    if (touchEndX - touchStartX > minSwipeDistance && onSwipeRight) {
      onSwipeRight();
    }

    if (touchStartY - touchEndY > minSwipeDistance && onSwipeUp) {
      onSwipeUp();
    }

    if (touchEndY - touchStartY > minSwipeDistance && onSwipeDown) {
      onSwipeDown();
    }
    if (onSwipeEnd) onSwipeEnd();
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

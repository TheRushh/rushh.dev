import { useEffect, useRef, useState } from 'react';

const MouseFollower = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isTouching, setIsTouching] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const updateSpotlight = (x: number, y: number) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(600px at ${x}px ${y}px, rgba(59, 130, 246, 0.15), transparent 80%)`;
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Only show spotlight on mouse events if not on a touch device or not currently touching
      if (!isTouching) {
        if (spotlightRef.current) {
          spotlightRef.current.style.opacity = '1';
        }
        updateSpotlight(e.clientX, e.clientY);
      }
    };

    const handleMouseLeave = () => {
      // Hide spotlight when mouse leaves the window
      if (spotlightRef.current && !isTouching) {
        spotlightRef.current.style.opacity = '0';
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setIsTouching(true);
      const touch = e.touches[0];
      if (touch) {
        updateSpotlight(touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updateSpotlight(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      setIsTouching(false);
      // Hide the spotlight by setting opacity to 0
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0';
      }
    };

    // Show spotlight when touching
    if (isTouching && spotlightRef.current) {
      spotlightRef.current.style.opacity = '1';
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isTouching]);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        willChange: 'background, opacity',
        opacity: 0,
      }}
    />
  );
};

export default MouseFollower;

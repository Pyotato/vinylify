import roundToDecimalPoint from '@/utils/number/roundToDecimalPoint';
import { RefObject, useEffect, useRef, useState } from 'react';

export function useThrottleResize({
  throttleMs = 100,
  ref,
}: {
  throttleMs?: number;
  ref: RefObject<HTMLElement | null>;
}) {
  const [height, setHeight] = useState(0);
  const lastRanRef = useRef(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const now = Date.now();
        if (now - lastRanRef.current < throttleMs) {
          return;
        }
        lastRanRef.current = now;

        const newHeight = roundToDecimalPoint(entry.contentRect.height);

        setHeight(newHeight);
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, throttleMs]);

  return { height };
}

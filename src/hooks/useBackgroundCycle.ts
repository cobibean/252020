import { useEffect, useMemo, useRef, useState } from 'react';

export interface BackgroundCycleOptions {
  intervalMs?: number;
  crossfadeMs?: number;
}

export interface BackgroundCycleState {
  currentUrl: string | null;
  previousUrl: string | null;
  isFading: boolean;
  accentPrimaryRgb: string; // "r g b" for css rgb(var(--...))
  accentSecondaryRgb: string; // "r g b"
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function toRgbTripletString(r: number, g: number, b: number): string {
  return `${Math.round(r)} ${Math.round(g)} ${Math.round(b)}`;
}

function deriveSecondaryFromPrimary(r: number, g: number, b: number): string {
  // Simple perceptual lighten for contrast on dark UI
  const lighten = (c: number) => clamp(c * 1.25 + 20, 0, 255);
  return toRgbTripletString(lighten(r), lighten(g), lighten(b));
}

async function computeAverageColor(url: string): Promise<[number, number, number]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve([85, 37, 131]); // fallback purple
        const w = (canvas.width = 64);
        const h = (canvas.height = 64);
        ctx.drawImage(img, 0, 0, w, h);
        const { data } = ctx.getImageData(0, 0, w, h);
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3] / 255;
          if (alpha < 0.1) continue;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
        if (count === 0) return resolve([85, 37, 131]);
        resolve([r / count, g / count, b / count]);
      } catch {
        resolve([85, 37, 131]);
      }
    };
    img.onerror = () => resolve([85, 37, 131]);
  });
}

export function useBackgroundCycle(imageUrls: string[], options?: BackgroundCycleOptions): BackgroundCycleState {
  const { intervalMs = 20000, crossfadeMs = 800 } = options || {};
  const [index, setIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [accentPrimaryRgb, setAccentPrimaryRgb] = useState<string>('85 37 131'); // default purple
  const [accentSecondaryRgb, setAccentSecondaryRgb] = useState<string>('253 185 39'); // default gold
  const timerRef = useRef<number | null>(null);
  const fadeRef = useRef<number | null>(null);

  const currentUrl = useMemo(() => (imageUrls.length > 0 ? imageUrls[index % imageUrls.length] : null), [imageUrls, index]);
  const previousUrl = useMemo(
    () => (previousIndex !== null && imageUrls.length > 0 ? imageUrls[previousIndex % imageUrls.length] : null),
    [imageUrls, previousIndex]
  );

  // Preload next image
  useEffect(() => {
    if (imageUrls.length < 2) return;
    const nextIdx = (index + 1) % imageUrls.length;
    const img = new Image();
    img.src = imageUrls[nextIdx];
  }, [index, imageUrls]);

  // Cycle timer
  useEffect(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => {
      setPreviousIndex(index);
      setIsFading(true);
      setIndex((i) => (i + 1) % Math.max(1, imageUrls.length));
      if (fadeRef.current) {
        window.clearTimeout(fadeRef.current);
      }
      fadeRef.current = window.setTimeout(() => setIsFading(false), crossfadeMs);
    }, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (fadeRef.current) window.clearTimeout(fadeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrls.length, intervalMs, crossfadeMs, index]);

  // Compute accent colors from current image
  useEffect(() => {
    if (!currentUrl) return;
    let cancelled = false;
    computeAverageColor(currentUrl).then(([r, g, b]) => {
      if (cancelled) return;
      // Nudge towards richer saturation for premium look
      const boost = (c: number) => clamp(c * 1.05, 0, 255);
      const pr = boost(r), pg = boost(g), pb = boost(b);
      setAccentPrimaryRgb(toRgbTripletString(pr, pg, pb));
      setAccentSecondaryRgb(deriveSecondaryFromPrimary(pr, pg, pb));
    });
    return () => {
      cancelled = true;
    };
  }, [currentUrl]);

  return {
    currentUrl,
    previousUrl,
    isFading,
    accentPrimaryRgb,
    accentSecondaryRgb,
  };
}



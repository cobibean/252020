import type { Phase } from '../types';
import { formatSeconds } from '../utils/format';

interface PhaseTimerProps {
  remainingSeconds: number;
  currentPhase: Phase;
  progress: number;
}

const phaseConfig: Record<Phase, { label: string; instruction: string; colorClasses: string }> = {
  'focus': {
    label: 'Focus',
    instruction: 'Deep work. No distractions.',
    colorClasses: 'bg-[rgba(var(--accent-primary),0.15)] text-[rgb(var(--accent-secondary))] border-[rgba(var(--accent-primary),0.40)]',
  },
  'eye-break': {
    label: 'Eye Break',
    instruction: 'Look at something ~20 feet away and blink slowly.',
    colorClasses: 'bg-[rgba(var(--accent-secondary),0.15)] text-[rgb(var(--accent-secondary))] border-[rgba(var(--accent-secondary),0.40)]',
  },
  'rest': {
    label: 'Rest Break',
    instruction: 'Stand up, stretch, grab water.',
    colorClasses: 'bg-white/5 text-white/80 border-white/10',
  },
};

export function PhaseTimer({ remainingSeconds, currentPhase, progress }: PhaseTimerProps) {
  const config = phaseConfig[currentPhase];
  const progressPercent = Math.max(0, Math.min(100, progress * 100));

  return (
    <div className="space-y-6">
      {/* Timer Display */}
      <div className="text-center">
        <div
          className="text-5xl md:text-6xl font-mono font-semibold text-white tabular-nums"
          aria-live="polite"
          aria-atomic="true"
        >
          {formatSeconds(remainingSeconds)}
        </div>
      </div>

      {/* Phase Badge */}
      <div className="flex justify-center">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border ${config.colorClasses}`}
        >
          {config.label}
        </span>
      </div>

      {/* Instruction */}
      <p className="text-sm text-white/70 text-center">{config.instruction}</p>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] transition-[width] duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${config.label} progress`}
        />
      </div>
    </div>
  );
}


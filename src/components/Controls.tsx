import type { Phase } from '../types';
import { PHASE_DURATIONS, getNextPhase } from '../config/timerConfig';
import { formatSeconds } from '../utils/format';

interface ControlsProps {
  isRunning: boolean;
  hasStarted: boolean;
  currentPhase: Phase;
  cycleCount: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onSkip: () => void;
  onReset: () => void;
}

export function Controls({
  isRunning,
  hasStarted,
  currentPhase,
  cycleCount,
  onStart,
  onPause,
  onResume,
  onSkip,
  onReset,
}: ControlsProps) {
  const nextPhase = getNextPhase(currentPhase);
  const nextPhaseDuration = PHASE_DURATIONS[nextPhase];

  const getPrimaryButton = () => {
    if (!hasStarted) {
      return (
        <button
          onClick={onStart}
          className="w-full bg-[rgb(var(--accent-primary))] hover:brightness-110 text-white font-semibold py-3 px-6 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-secondary))] focus:ring-offset-2 focus:ring-offset-[rgb(var(--surface-bg))]"
          aria-label="Start timer"
        >
          Start
        </button>
      );
    }

    if (isRunning) {
      return (
        <button
          onClick={onPause}
          className="w-full bg-[rgb(var(--accent-primary))] hover:brightness-110 text-white font-semibold py-3 px-6 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-secondary))] focus:ring-offset-2 focus:ring-offset-[rgb(var(--surface-bg))]"
          aria-label="Pause timer"
        >
          Pause
        </button>
      );
    }

    return (
      <button
        onClick={onResume}
        className="w-full bg-[rgb(var(--accent-primary))] hover:brightness-110 text-white font-semibold py-3 px-6 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-secondary))] focus:ring-offset-2 focus:ring-offset-[rgb(var(--surface-bg))]"
        aria-label="Resume timer"
      >
        Resume
      </button>
    );
  };

  const getNextPhaseLabel = (): string => {
    const labels: Record<Phase, string> = {
      'focus': 'Focus',
      'eye-break': 'Eye Break',
      'rest': 'Rest Break',
    };
    return labels[nextPhase] || 'Focus';
  };

  return (
    <div className="space-y-4">
      {/* Primary Control */}
      {getPrimaryButton()}

      {/* Secondary Controls */}
      <div className="flex gap-2">
        <button
          onClick={onSkip}
          className="flex-1 bg-transparent hover:bg-white/5 text-white/80 font-medium py-2 px-4 rounded-lg border border-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-secondary))] focus:ring-offset-2 focus:ring-offset-[rgb(var(--surface-bg))]"
          aria-label="Skip to next phase"
        >
          Skip Phase
        </button>
        <button
          onClick={onReset}
          className="flex-1 bg-transparent hover:bg-white/5 text-white/80 font-medium py-2 px-4 rounded-lg border border-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-secondary))] focus:ring-offset-2 focus:ring-offset-[rgb(var(--surface-bg))]"
          aria-label="Reset timer"
        >
          Reset
        </button>
      </div>

      {/* Status Info */}
      <div className="text-center space-y-1 pt-2">
        <p className="text-xs text-white/60">
          Next: {getNextPhaseLabel()} ({formatSeconds(nextPhaseDuration)})
        </p>
        {cycleCount > 0 && (
          <p className="text-xs text-white/60">Cycle #{cycleCount}</p>
        )}
      </div>
    </div>
  );
}


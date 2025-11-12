import { usePomodoro2020Timer } from '../hooks/usePomodoro2020Timer';
import { PhaseTimer } from './PhaseTimer';
import { Controls } from './Controls';
import { useBackgroundCycle } from '../hooks/useBackgroundCycle';
import { AnimatePresence, motion } from 'framer-motion';

export function TimerShell() {
  const timer = usePomodoro2020Timer();
  const hasStarted = timer.isRunning || timer.remainingSeconds < timer.totalSecondsForCurrentPhase || timer.cycleCount > 0;
  const backgroundImages = [
    '/imgs/1/u7895789732_abstract_labyrinth_garden_with_sculpted_hedges_an_09a80779-6913-48c8-9335-098eed1c21c8_0.png',
    '/imgs/1/u7895789732_abstract_labyrinth_garden_with_sculpted_hedges_an_09a80779-6913-48c8-9335-098eed1c21c8_1.png',
    '/imgs/1/u7895789732_abstract_labyrinth_garden_with_sculpted_hedges_an_09a80779-6913-48c8-9335-098eed1c21c8_2.png',
    '/imgs/1/u7895789732_an_ancient_temple_courtyard_carved_into_smooth_bl_7a240a0e-4a56-48da-adca-ca37f876d662_2.png',
    '/imgs/1/u7895789732_an_ancient_temple_courtyard_carved_into_smooth_bl_7a240a0e-4a56-48da-adca-ca37f876d662_3.png',
    '/imgs/1/u7895789732_futuristic_sundial_garden_made_of_mossy_stone_a_s_70cdfa3a-6f16-47f2-baa7-26d2aab5e9db_1.png',
    '/imgs/1/u7895789732_surreal_architectural_landscape_curved_temple_cor_0c060109-ecb3-4109-874c-850476d2571e_0.png',
    '/imgs/1/u7895789732_surreal_architectural_landscape_curved_temple_cor_0c060109-ecb3-4109-874c-850476d2571e_1.png',
    '/imgs/1/u7895789732_surreal_architectural_landscape_curved_temple_cor_347af7ad-46bc-4615-aed5-e4678ce7bd2c_0.png',
    '/imgs/1/u7895789732_surreal_architectural_landscape_curved_temple_cor_347af7ad-46bc-4615-aed5-e4678ce7bd2c_1.png',
    '/imgs/1/u7895789732_surreal_architectural_landscape_curved_temple_cor_347af7ad-46bc-4615-aed5-e4678ce7bd2c_2.png',
    '/imgs/1/u7895789732_surreal_architectural_landscape_curved_temple_cor_347af7ad-46bc-4615-aed5-e4678ce7bd2c_3.png',
    '/imgs/1/u7895789732_surreal_architectural_landscape_curved_temple_cor_5d58b4a7-56fc-4351-99e9-4b67ade007d4_2.png',
    '/imgs/1/u7895789732_surreal_architectural_landscape_curved_temple_cor_5d58b4a7-56fc-4351-99e9-4b67ade007d4_3.png',
    '/imgs/1/u7895789732_surreal_architectural_landscape_curved_temple_cor_c4e3bc2a-f729-4fde-a4de-9c790b8c9e99_3.png',
    '/imgs/1/u7895789732_surreal_architectural_landscape_curved_temple_cor_ca982182-146a-430b-b1ab-ffc1004b74db_0.png',
    '/imgs/1/u7895789732_surreal_architectural_landscape_curved_temple_cor_ca982182-146a-430b-b1ab-ffc1004b74db_1.png',
    '/imgs/1/u7895789732_surreal_architectural_landscape_curved_temple_cor_ca982182-146a-430b-b1ab-ffc1004b74db_2.png',
    '/imgs/1/u7895789732_surreal_architectural_landscape_curved_temple_cor_ca982182-146a-430b-b1ab-ffc1004b74db_3.png',
    '/imgs/1/u7895789732_top-down_view_of_an_organic_maze_shaped_like_a_cl_6f8946be-853f-41b1-9a12-1d7063c63ed5_0.png',
  ];
  const bg = useBackgroundCycle(backgroundImages, { intervalMs: 20000, crossfadeMs: 900 });

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4"
      style={
        {
          '--accent-primary': bg.accentPrimaryRgb,
          '--accent-secondary': bg.accentSecondaryRgb,
          '--surface-bg': '10 10 11',
        } as React.CSSProperties
      }
    >
      {/* Background images with crossfade */}
      <div className="absolute inset-0 -z-20">
        <AnimatePresence initial={false}>
          {/* Render both images during transition for seamless crossfade */}
          {bg.previousUrl && bg.previousUrl !== bg.currentUrl && (
            <motion.div
              key={`prev-${bg.previousUrl}`}
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${bg.previousUrl})` }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              aria-hidden="true"
            />
          )}
          {bg.currentUrl && (
            <motion.div
              key={`current-${bg.currentUrl}`}
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${bg.currentUrl})` }}
              initial={{ opacity: bg.previousUrl && bg.previousUrl !== bg.currentUrl ? 0 : 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
        {/* Overlay for readability, tinted by accent */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.65)),' +
              'radial-gradient(1200px 500px at 50% 0%, rgba(var(--accent-primary),0.20), rgba(0,0,0,0) 60%)',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="w-full max-w-md lg:max-w-lg bg-[rgba(10,10,11,0.65)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-3xl shadow-2xl p-6 md:p-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-sm uppercase tracking-[.25em] text-white/80">Pomodoro × 20-20-20</p>
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            20-20-20 Focus Timer
          </h1>
          <p className="text-sm text-white/70">
            25 minutes on. 20 seconds for your eyes. 5 minutes to reset. Then repeat.
          </p>
        </div>

        {/* Timer Display */}
        <PhaseTimer
          remainingSeconds={timer.remainingSeconds}
          currentPhase={timer.currentPhase}
          progress={timer.progress}
        />

        {/* Controls */}
        <Controls
          isRunning={timer.isRunning}
          hasStarted={hasStarted}
          currentPhase={timer.currentPhase}
          cycleCount={timer.cycleCount}
          onStart={timer.start}
          onPause={timer.pause}
          onResume={timer.resume}
          onSkip={timer.skipPhase}
          onReset={timer.reset}
        />
      </div>
    </div>
  );
}


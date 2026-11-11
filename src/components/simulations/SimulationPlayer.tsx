
import { useState } from "react";
import type { Simulation } from "../../schemas/simulation";
import { SimulationHeader } from "./SimulationHeader";
import { SimulationState } from "./SimulationState";
import { SimulationMetrics } from "./SimulationMetrics";
import { SimulationControls } from "./SimulationControls";

type Props = {
  simulation: Simulation;
};

export function SimulationPlayer({ simulation }: Props) {
  const [position, setPosition] = useState(0);

  const totalSteps = simulation.steps.length;
  const isInitial = position === 0;
  const currentStep = isInitial
    ? undefined
    : simulation.steps[position - 1];

  const state = currentStep?.systemState ?? simulation.initialState;
  const metrics = currentStep?.metrics ?? {};

  const goNext = () => {
    setPosition((current) => Math.min(current + 1, totalSteps));
  };

  const goBack = () => {
    setPosition((current) => Math.max(current - 1, 0));
  };

  const reset = () => setPosition(0);

  return (
    <section
      aria-label="Simulation player"
      className="space-y-6 rounded-2xl border border-slate-700 bg-slate-900 p-5 text-slate-100 sm:p-8"
    >
      <SimulationHeader simulation={simulation} />

      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>
          {isInitial
            ? "Ready to begin"
            : `Step ${position} of ${totalSteps}`}
        </span>
        <span>{Math.round((position / totalSteps) * 100)}%</span>
      </div>

      <progress
        aria-label="Simulation progress"
        value={position}
        max={totalSteps}
        className="h-2 w-full accent-teal-400"
      />

      <SimulationState state={state} isInitial={isInitial} />

      {currentStep && (
        <section
          aria-label="Current simulation step"
          className="space-y-3"
        >
          <h3 className="text-xl font-semibold">
            {currentStep.title}
          </h3>

          <p className="text-slate-300">
            {currentStep.description}
          </p>

          <SimulationMetrics metrics={metrics} />

          <div className="rounded-lg border-l-4 border-amber-400 bg-slate-800 p-4">
            <h4 className="font-semibold text-amber-300">
              Why this happens
            </h4>
            <p className="mt-2 text-sm text-slate-200">
              {currentStep.explanation}
            </p>
          </div>
        </section>
      )}

      <SimulationControls
        canGoBack={!isInitial}
        canGoNext={position < totalSteps}
        onBack={goBack}
        onNext={goNext}
        onReset={reset}
      />
    </section>
  );
}


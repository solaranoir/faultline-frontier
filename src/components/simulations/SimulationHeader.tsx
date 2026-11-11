
import type { Simulation } from "../../schemas/simulation";

type Props = {
  simulation: Simulation;
};

export function SimulationHeader({ simulation }: Props) {
  return (
    <header className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
        The Failure Range / {simulation.category}
      </p>

      <h2 className="text-2xl font-bold sm:text-3xl">
        {simulation.title}
      </h2>

      <p className="text-slate-300">
        {simulation.description}
      </p>

      <div className="rounded-lg border border-teal-700/40 bg-slate-800/70 p-4">
        <h3 className="font-semibold text-teal-300">
          Learning objective
        </h3>
        <p className="mt-1 text-sm text-slate-200">
          {simulation.learningObjective}
        </p>
      </div>
    </header>
  );
}


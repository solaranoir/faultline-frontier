type Props = {
  state: string;
  isInitial: boolean;
};

export function SimulationState({
  state,
  isInitial,
}: Props) {
  return (
    <section
      aria-label="System state"
      className="rounded-xl border border-slate-700 bg-slate-800 p-5"
    >
      <p className="text-xs uppercase tracking-widest text-slate-400">
        {isInitial ? "Initial system state" : "Current system state"}
      </p>

      <p
        data-testid="system-state"
        className="mt-2 text-xl font-bold text-teal-300"
      >
        {state}
      </p>
    </section>
  );
}


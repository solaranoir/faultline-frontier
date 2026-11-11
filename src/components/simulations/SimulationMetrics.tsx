
type Props = {
  metrics: Record<string, number>;
};

export function SimulationMetrics({ metrics }: Props) {
  const entries = Object.entries(metrics);

  if (entries.length === 0) {
    return null;
  }

  return (
    <section aria-label="Simulation metrics">
      <h3 className="mb-3 text-lg font-semibold">
        System metrics
      </h3>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {entries.map(([name, value]) => (
          <div
            key={name}
            className="rounded-lg border border-slate-700 bg-slate-800 p-4"
          >
            <dt className="text-xs text-slate-400">
              {name.replaceAll("_", " ")}
            </dt>
            <dd className="mt-2 text-2xl font-bold tabular-nums">
              {value.toLocaleString()}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}


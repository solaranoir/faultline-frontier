
type Props = {
  canGoBack: boolean;
  canGoNext: boolean;
  onBack: () => void;
  onNext: () => void;
  onReset: () => void;
};

export function SimulationControls({
  canGoBack,
  canGoNext,
  onBack,
  onNext,
  onReset,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <button
        type="button"
        onClick={onReset}
        className="rounded-lg border border-slate-600 px-4 py-2 hover:bg-slate-800"
      >
        Reset
      </button>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={!canGoBack}
          onClick={onBack}
          className="rounded-lg border border-slate-600 px-4 py-2 disabled:opacity-40"
        >
          Previous
        </button>

        <button
          type="button"
          disabled={!canGoNext}
          onClick={onNext}
          className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-slate-950 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}


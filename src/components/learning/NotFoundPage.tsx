
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-6 py-16">
      <h1 className="text-3xl font-bold">
        Lost beyond the frontier
      </h1>

      <p>
        This lesson or activity could not be found.
      </p>

      <Link
        to="/"
        className="text-teal-400 underline"
      >
        Return to the learning trail
      </Link>
    </main>
  );
}



import { SimulationSchema } from "../../schemas/simulation";

export const circuitBreakerSimulation = SimulationSchema.parse({
  id: "sim-circuit-breaker",
  title: "Circuit Breaker Recovery",
  description:
    "Observe how a circuit breaker protects a service during dependency failures.",
  category: "reliability",
  initialState: "CLOSED",
  learningObjective:
    "Explain how circuit breakers transition through closed, open, and half-open states.",
  steps: [
    {
      id: "dependency-failure",
      title: "The dependency fails",
      description:
        "A downstream service begins returning errors.",
      systemState: "CLOSED",
      metrics: {
        error_rate_percent: 65,
        latency_ms: 900,
      },
      explanation:
        "The circuit breaker continues observing failures until its threshold is reached.",
    },
    {
      id: "breaker-opens",
      title: "The circuit opens",
      description:
        "The breaker begins rejecting requests without calling the dependency.",
      systemState: "OPEN",
      metrics: {
        error_rate_percent: 65,
        latency_ms: 8,
      },
      explanation:
        "Fail-fast behavior protects resources and prevents repeated calls to the unhealthy dependency.",
    },
    {
      id: "recovery-probe",
      title: "Recovery probes begin",
      description:
        "After a recovery timeout, limited requests are allowed through.",
      systemState: "HALF-OPEN",
      metrics: {
        probe_count: 1,
        probe_success_count: 1,
      },
      explanation:
        "Half-open mode tests recovery while limiting exposure to further failures.",
    },
    {
      id: "recovered",
      title: "The service recovers",
      description:
        "Successful probes allow normal traffic to resume.",
      systemState: "CLOSED",
      metrics: {
        error_rate_percent: 0,
        latency_ms: 42,
      },
      explanation:
        "The circuit closes after the configured recovery criteria are satisfied.",
    },
  ],
});


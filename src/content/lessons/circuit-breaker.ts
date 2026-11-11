
import {
  LessonSchema,
  SimulationSchema,
  QuizSchema,
  CodingChallengeSchema,
} from "../../schemas";

export const circuitBreakerLesson = LessonSchema.parse({
  id: "lesson-circuit-breaker",
  slug: "circuit-breaker-recovery",
  title: "Circuit Breaker Recovery",
  summary: "Learn how services recover safely.",
  category: "distributed-systems",
  difficulty: "intermediate",
  estimatedMinutes: 15,

  learningObjectives: [
    "Explain circuit breaker states",
    "Identify unsafe recovery behavior",
    "Test half-open recovery probes",
  ],

  content: [
    {
      type: "text",
      content:
        "Circuit breakers prevent repeated calls to unhealthy dependencies.",
    },
    {
      type: "code",
      language: "python",
      code: `if breaker.is_open:
    raise ServiceUnavailable()`,
      explanation:
        "Open breakers reject requests before calling the dependency.",
    },
    {
      type: "callout",
      variant: "important",
      content:
        "Half-open recovery should limit concurrent probes.",
    },
  ],

  simulationId: "sim-circuit-breaker",
  quizId: "quiz-circuit-breaker",
  codingChallengeId: "challenge-circuit-breaker",

  tags: ["reliability", "failure-recovery"],
  published: true,
});

export const circuitBreakerSimulation =
  SimulationSchema.parse({
    id: "sim-circuit-breaker",
    title: "Circuit Breaker State Machine",
    description: "Observe failure and recovery.",
    category: "reliability",
    initialState: "closed",
    learningObjective:
      "Understand controlled dependency recovery.",

    steps: [
      {
        id: "step-1",
        title: "Dependency failure",
        description: "Failures exceed the threshold.",
        systemState: "open",
        metrics: { failures: 3, rejected: 0 },
        explanation:
          "The circuit opens to protect the dependency.",
      },
      {
        id: "step-2",
        title: "Recovery probe",
        description: "The recovery timeout expires.",
        systemState: "half-open",
        metrics: { failures: 3, probes: 1 },
        explanation:
          "One request tests dependency health.",
      },
      {
        id: "step-3",
        title: "Successful recovery",
        description: "The probe succeeds.",
        systemState: "closed",
        metrics: { failures: 0, probes: 1 },
        explanation:
          "Normal request processing resumes.",
      },
    ],
  });

export const circuitBreakerQuiz = QuizSchema.parse({
  id: "quiz-circuit-breaker",
  title: "Recovery Knowledge Check",
  description: "Test your circuit breaker knowledge.",
  passingScore: 80,

  questions: [
    {
      id: "q1",
      type: "single-choice",
      prompt:
        "What should happen during half-open recovery?",
      options: [
        {
          id: "a",
          text: "Immediately restore all traffic",
        },
        {
          id: "b",
          text: "Allow a limited recovery probe",
        },
        {
          id: "c",
          text: "Permanently reject all requests",
        },
      ],
      correctAnswer: "b",
      explanation:
        "Limited probes prevent a recovery traffic surge.",
      points: 10,
    },
  ],
});

export const circuitBreakerChallenge =
  CodingChallengeSchema.parse({
    id: "challenge-circuit-breaker",
    title: "Build a Circuit Breaker",
    description:
      "Implement a circuit breaker state machine.",
    difficulty: "intermediate",
    language: "python",
    pythonVersion: "3.12",

    starterCode: `class CircuitBreaker:
    def __init__(self, threshold=3):
        self.threshold = threshold

    def record_failure(self):
        pass`,

    instructions:
      "Open the breaker after the configured number of consecutive failures.",

    expectedFunction: "CircuitBreaker.record_failure",

    timeLimitSeconds: 5,
    memoryLimitMb: 128,

    tests: [
      {
        id: "test-1",
        name: "Opens after threshold",
        description:
          "Three consecutive failures open the breaker.",
        visibility: "public",
        testId: "circuit_breaker_threshold",
        points: 10,
      },
    ],

    tags: ["state-machine", "reliability"],
  });


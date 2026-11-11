
import { QuizSchema } from "../../schemas/quiz";

export const circuitBreakerQuiz = QuizSchema.parse({
  id: "circuit-breaker-quiz",
  title: "Circuit Breaker Knowledge Check",
  description:
    "Test your understanding of failure detection and recovery.",
  passingScore: 70,
  questions: [
    {
      id: "breaker-state",
      type: "single-choice",
      prompt: "Which state rejects calls to an unhealthy dependency?",
      options: [
        { id: "closed", text: "Closed" },
        { id: "open", text: "Open" },
        { id: "half-open", text: "Half-open" },
      ],
      correctAnswer: "open",
      explanation:
        "An open circuit breaker rejects calls immediately rather than contacting the dependency.",
      points: 10,
    },
    {
      id: "recovery-probes",
      type: "multiple-choice",
      prompt: "Which statements describe safe half-open recovery?",
      options: [
        {
          id: "limited",
          text: "Allow a limited number of probe requests.",
        },
        {
          id: "unlimited",
          text: "Immediately restore unlimited traffic.",
        },
        {
          id: "evaluate",
          text: "Evaluate probe results before closing the circuit.",
        },
      ],
      correctAnswers: ["limited", "evaluate"],
      explanation:
        "Half-open recovery limits probes and evaluates their outcomes before returning to normal traffic.",
      points: 10,
    },
    {
      id: "fail-fast",
      type: "true-false",
      prompt:
        "An open circuit breaker should keep sending every request to the failed dependency.",
      correctAnswer: false,
      explanation:
        "Open breakers fail fast to protect the application and downstream resources.",
      points: 10,
    },
  ],
});



import { z } from "zod";

export const ChallengeTestSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),

  visibility: z.enum(["public", "hidden"]),

  // A reference to a test stored on the backend.
  testId: z.string().min(1),
  points: z.number().int().positive(),
});

export const CodingChallengeSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),

  difficulty: z.enum([
    "beginner",
    "intermediate",
    "advanced",
  ]),

  language: z.literal("python"),
  pythonVersion: z.string().min(1),

  starterCode: z.string(),
  instructions: z.string().min(1),

  expectedFunction: z.string().min(1),

  constraints: z.array(z.string()).default([]),
  hints: z.array(z.string()).default([]),

  timeLimitSeconds: z.number().int().positive(),
  memoryLimitMb: z.number().int().positive(),

  tests: z.array(ChallengeTestSchema).min(1),

  tags: z.array(z.string()).default([]),
});

export type CodingChallenge = z.infer<
  typeof CodingChallengeSchema
>;


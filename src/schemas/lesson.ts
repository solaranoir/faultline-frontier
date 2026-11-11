
import { z } from "zod";

export const ContentBlockSchema = z.discriminatedUnion(
  "type",
  [
    z.object({
      type: z.literal("text"),
      content: z.string().min(1),
    }),

    z.object({
      type: z.literal("code"),
      language: z.string().min(1),
      code: z.string(),
      explanation: z.string().optional(),
    }),

    z.object({
      type: z.literal("callout"),
      variant: z.enum([
        "tip",
        "warning",
        "important",
      ]),
      content: z.string().min(1),
    }),
  ]
);

export const LessonSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  ),

  title: z.string().min(1),
  summary: z.string().min(1),

  category: z.enum([
    "distributed-systems",
    "python",
  ]),

  difficulty: z.enum([
    "beginner",
    "intermediate",
    "advanced",
  ]),

  estimatedMinutes: z.number().int().positive(),

  learningObjectives: z.array(
    z.string().min(1)
  ).min(1),

  prerequisites: z.array(z.string()).default([]),

  content: z.array(ContentBlockSchema).min(1),

  simulationId: z.string().optional(),
  quizId: z.string().optional(),
  codingChallengeId: z.string().optional(),

  tags: z.array(z.string()).default([]),

  published: z.boolean().default(false),
  version: z.number().int().positive().default(1),
});

export type Lesson = z.infer<typeof LessonSchema>;
export type ContentBlock = z.infer<
  typeof ContentBlockSchema
>;


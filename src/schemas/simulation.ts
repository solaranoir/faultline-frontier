
import { z } from "zod";

export const SimulationStepSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  systemState: z.string().min(1),
  metrics: z.record(z.string(), z.number()).default({}),
  explanation: z.string().min(1),
});

export const SimulationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),

  category: z.enum([
    "concurrency",
    "network",
    "database",
    "messaging",
    "reliability",
  ]),

  initialState: z.string().min(1),
  steps: z.array(SimulationStepSchema).min(1),

  learningObjective: z.string().min(1),
});

export type Simulation = z.infer<
  typeof SimulationSchema
>;

export type SimulationStep = z.infer<
  typeof SimulationStepSchema
>;


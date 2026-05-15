import { z } from 'zod';

export const aiMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1)
});

export const aiRequestSchema = z.object({
  messages: z.array(aiMessageSchema).min(1)
});

export type AiRequest = z.infer<typeof aiRequestSchema>;

import { env as privateEnv } from '$env/dynamic/private';
import { z } from 'zod';

const envSchema = z.object({
  ANTHROPIC_API_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  CONTACT_EMAIL: z.string().email().optional(),
  CONTACT_FORM_TO_EMAIL: z.string().email().optional(),
  RATE_LIMIT_SECRET: z.string().optional()
});

export const env = envSchema.parse(privateEnv);

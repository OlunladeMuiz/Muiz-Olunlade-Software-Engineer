import { describe, expect, it } from 'vitest';
import { contactSchema } from './contact';

describe('contactSchema', () => {
  it('accepts a valid payload', () => {
    const result = contactSchema.safeParse({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      subject: 'job',
      message: 'I would like to discuss a possible collaboration.',
      honeypot: ''
    });

    expect(result.success).toBe(true);
  });

  it('rejects a filled honeypot', () => {
    const result = contactSchema.safeParse({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      subject: 'job',
      message: 'I would like to discuss a possible collaboration.',
      honeypot: 'bot'
    });

    expect(result.success).toBe(false);
  });
});

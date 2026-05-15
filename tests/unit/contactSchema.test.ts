import { describe, expect, it } from 'vitest';
import { contactSchema } from '../../src/lib/schemas/contact';

describe('contactSchema', () => {
  it('accepts valid contact data', () => {
    const result = contactSchema.safeParse({
      name: 'Muiz',
      email: 'muiz@example.com',
      subject: 'Project inquiry',
      message: 'I would like to discuss a portfolio project.'
    });

    expect(result.success).toBe(true);
  });

  it('rejects short messages', () => {
    const result = contactSchema.safeParse({
      name: 'Muiz',
      email: 'muiz@example.com',
      subject: 'Hello',
      message: 'Too short'
    });

    expect(result.success).toBe(false);
  });
});

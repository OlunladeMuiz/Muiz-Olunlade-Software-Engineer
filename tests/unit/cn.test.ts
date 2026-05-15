import { describe, expect, it } from 'vitest';
import { cn } from '../../src/lib/utils/cn';

describe('cn', () => {
  it('merges class names into a single string', () => {
    expect(cn('px-4', false && 'hidden', 'py-2')).toContain('px-4');
    expect(cn('bg-red-500', 'bg-blue-500')).toContain('bg-blue-500');
  });
});

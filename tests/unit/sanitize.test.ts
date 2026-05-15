import { describe, expect, it } from 'vitest';
import { sanitizeHtml } from '../../src/lib/utils/sanitize';

describe('sanitizeHtml', () => {
  it('strips script tags and keeps safe text', () => {
    const output = sanitizeHtml('<p>Hello</p><script>alert(1)</script>');

    expect(output).toContain('<p>Hello</p>');
    expect(output).not.toContain('<script>');
  });
});

import { describe, expect, it } from 'vitest';
import { stripHtmlTags } from './sanitize';

describe('stripHtmlTags', () => {
  it('removes HTML tags from a string', () => {
    expect(stripHtmlTags('<strong>Hello</strong> <span>world</span>')).toBe('Hello world');
  });
});

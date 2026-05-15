import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'strong', 'em', 'code', 'ul', 'ol', 'li', 'br', 'span'],
    ALLOWED_ATTR: []
  });
}

export function stripHtmlTags(value: string) {
  return value.replace(/<[^>]*>/g, '');
}

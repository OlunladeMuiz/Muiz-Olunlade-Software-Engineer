import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { contactSchema, contactSubjectOptions } from '$lib/schemas/contact';
import { env } from '$lib/utils/env';
import { stripHtmlTags } from '$lib/utils/sanitize';

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normalizePayload(body: unknown) {
  if (!body || typeof body !== 'object') {
    return body;
  }

  const record = body as Record<string, unknown>;

  return {
    name: typeof record.name === 'string' ? stripHtmlTags(record.name).trim() : record.name,
    email: typeof record.email === 'string' ? record.email.trim() : record.email,
    subject: typeof record.subject === 'string' ? stripHtmlTags(record.subject).trim() : record.subject,
    message: typeof record.message === 'string' ? stripHtmlTags(record.message).trim() : record.message,
    honeypot: typeof record.honeypot === 'string' ? record.honeypot.trim() : record.honeypot
  };
}

function getSubjectLabel(subject: string) {
  return contactSubjectOptions.find((option) => option.value === subject)?.label ?? 'General inquiry';
}

function cleanupRateLimits(now: number) {
  for (const [address, entry] of rateLimitMap) {
    if (now >= entry.resetAt) {
      rateLimitMap.delete(address);
    }
  }
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    throw error(400, 'Invalid request body.');
  }

  const parsed = contactSchema.safeParse(normalizePayload(body));
  if (!parsed.success) {
    const visibleIssues = parsed.error.issues.filter((issue) => issue.path[0] !== 'honeypot');

    if (visibleIssues.length === 0) {
      return json({
        success: true,
        mode: 'ignored'
      });
    }

    throw error(400, 'Invalid form data.');
  }

  const ip = getClientAddress();
  const now = Date.now();
  cleanupRateLimits(now);
  const current = rateLimitMap.get(ip);
  const activeEntry = current;

  if (activeEntry && activeEntry.count >= RATE_LIMIT_MAX) {
    throw error(429, 'Too many requests. Please wait before sending another message.');
  }

  rateLimitMap.set(ip, {
    count: (activeEntry?.count ?? 0) + 1,
    resetAt: activeEntry?.resetAt ?? now + RATE_LIMIT_WINDOW_MS
  });

  const { name, email, subject, message } = parsed.data;
  const subjectLabel = getSubjectLabel(subject);
  const recipientEmail = env.CONTACT_FORM_TO_EMAIL ?? env.CONTACT_EMAIL;

  if (env.RESEND_API_KEY && recipientEmail) {
    const { Resend } = await import('resend');
    const resend = new Resend(env.RESEND_API_KEY);
    const normalizedMessage = message.replaceAll('\r\n', '\n');
    const plainTextBody = [
      `From: ${name} <${email}>`,
      `Subject: ${subjectLabel}`,
      '',
      normalizedMessage
    ].join('\n');

    await resend.emails.send({
      from: 'Muiz Portfolio <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `[Portfolio] ${subjectLabel}`,
      text: plainTextBody,
      html: `
        <div style="font-family: Inter, sans-serif; line-height: 1.6;">
          <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
          <p><strong>Subject:</strong> ${escapeHtml(subjectLabel)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(normalizedMessage).replaceAll('\n', '<br />')}</p>
        </div>
      `,
      replyTo: email
    });
  }

  return json({
    success: true,
    mode: env.RESEND_API_KEY && recipientEmail ? 'live' : 'mock'
  });
};

import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { aiRequestSchema } from '$lib/schemas/ai';
import { env } from '$lib/utils/env';

const SYSTEM_PROMPT = `
You are Muiz's AI portfolio assistant.
You know the portfolio belongs to Olunlade Abdulmuiz, a frontend-specialized full-stack developer and CS student.
Known highlights:
- Flagship project: FXGuard, a Nigerian FX intelligence platform for African SMEs.
- Recent case studies: NEXUS Terminal, a real-time crypto analytics dashboard; LifeOS, a calm decision engine; Furniro, a full-stack furniture marketplace.
- Stack: React, Next.js, SvelteKit, Vue 3, Pinia, ECharts, TypeScript, FastAPI, Express, Prisma, PostgreSQL, Node.js, Stripe.
- He built this portfolio for Frontend Wizards Stage 5b.
- He is open to frontend/full-stack roles, onsite Lagos or remote.

Answer concisely, accurately, and warmly.
Never invent experience, employers, or projects.
Keep answers under 150 words unless the question really needs more depth.
`.trim();

function generateFallbackAnswer(question: string) {
  const lower = question.toLowerCase();

  if (lower.includes('strongest project') || lower.includes('best project')) {
    return 'FXGuard is the flagship project, while NEXUS Terminal is the strongest signal for real-time frontend systems and LifeOS shows calm product thinking.';
  }

  if (lower.includes('stack') || lower.includes('tech')) {
    return 'He works across React, Next.js, SvelteKit, Vue 3, Pinia, ECharts, TypeScript, FastAPI, Express, Prisma, PostgreSQL, Node.js, and Stripe depending on the project.';
  }

  if (lower.includes('available') || lower.includes('hire') || lower.includes('role')) {
    return 'He is open to frontend or full-stack roles, onsite in Lagos or remote, depending on the team and product fit.';
  }

  if (lower.includes('portfolio')) {
    return 'This portfolio is built around four clear case studies: FXGuard, NEXUS Terminal, LifeOS, and Furniro, with motion discipline, strong hierarchy, and clean code structure.';
  }

  return 'Muiz focuses on polished frontend systems, fintech product experiences, and pragmatic full-stack shipping. Ask about FXGuard, NEXUS Terminal, LifeOS, Furniro, or availability.';
}

function streamText(text: string) {
  const encoder = new TextEncoder();
  const words = text.split(/(\s+)/);
  let timer: ReturnType<typeof setInterval> | undefined;

  return new Response(
    new ReadableStream({
      start(controller) {
        let index = 0;
        timer = setInterval(() => {
          if (index >= words.length) {
            if (timer) {
              clearInterval(timer);
            }
            controller.close();
            return;
          }

          controller.enqueue(encoder.encode(words[index] ?? ''));
          index += 1;
        }, 22);
      },
      cancel() {
        if (timer) {
          clearInterval(timer);
        }
      }
    }),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }
  );
}

export const POST: RequestHandler = async ({ request }) => {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    throw error(400, 'Invalid request body.');
  }

  const parsed = aiRequestSchema.safeParse(body);
  if (!parsed.success) {
    throw error(400, 'Invalid AI request payload.');
  }

  const lastUserMessage = [...parsed.data.messages].reverse().find((message) => message.role === 'user');
  const question = lastUserMessage?.content.trim() || 'Tell me about Muiz.';

  if (!env.ANTHROPIC_API_KEY) {
    return streamText(generateFallbackAnswer(question));
  }

  const { Anthropic } = await import('@anthropic-ai/sdk');
  const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  const stream = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 350,
    system: SYSTEM_PROMPT,
    stream: true,
    messages: parsed.data.messages.map((message) => ({
      role: message.role,
      content: message.content
    })) as Array<{ role: 'user' | 'assistant'; content: string }>
  });

  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const chunk of stream as AsyncIterable<Record<string, unknown>>) {
          if (chunk && typeof chunk === 'object' && chunk.type === 'content_block_delta') {
            const delta = chunk.delta as { text?: string };
            if (delta.text) {
              controller.enqueue(encoder.encode(delta.text));
            }
          }
        }

        controller.close();
      }
    }),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }
  );
};

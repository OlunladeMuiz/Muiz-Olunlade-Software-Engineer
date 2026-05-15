import type { RequestHandler } from './$types';

function escapePdfText(value: string) {
  return value.replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)');
}

function buildResumePdf() {
  const lines = [
    'Olunlade Abdulmuiz',
    'Frontend-specialized full-stack developer',
    'SvelteKit | React | TypeScript | FastAPI | PostgreSQL',
    'abdulmuiz@example.com'
  ];

  const content = [
    'BT',
    '/F1 24 Tf',
    '72 760 Td',
    '28 TL',
    ...lines.map((line, index) => `${index === 0 ? '' : 'T* '}${`(${escapePdfText(line)}) Tj`}`),
    'ET'
  ]
    .join('\n')
    .replaceAll('T* ', 'T*\n');

  const header = '%PDF-1.4\n';
  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    `5 0 obj\n<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n`
  ];

  let pdf = header;
  const offsets = [0];

  for (const object of objects) {
    offsets.push(pdf.length);
    pdf += object;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';

  for (let index = 1; index < offsets.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new TextEncoder().encode(pdf);
}

export const GET: RequestHandler = async ({ request }) => {
  const resumeUrl = new URL('/resume/Muiz_Olunlade_Resume_2026.pdf', request.url);

  try {
    const asset = await fetch(resumeUrl);
    if (asset.ok) {
      const bytes = await asset.arrayBuffer();

      return new Response(bytes, {
        headers: {
          'Content-Type': asset.headers.get('content-type') ?? 'application/pdf',
          'Content-Disposition': 'attachment; filename="Muiz_Olunlade_Resume_2026.pdf"',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }
  } catch {
    // Fall back to the generated one-page PDF below.
  }

  const bytes = buildResumePdf();

  return new Response(bytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Muiz_Olunlade_Resume_2026.pdf"',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};

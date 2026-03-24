import { NextRequest, NextResponse } from 'next/server';

const NLM_PROXY_URL = process.env.NLM_PROXY_URL || '';
const NLM_PROXY_KEY = process.env.NLM_PROXY_KEY || '';
const NOTEBOOK_ID = process.env.NLM_NOTEBOOK_ID || '';

const MODE_PREFIXES: Record<string, string> = {
  brief:
    'Answer as a numbered list with short bedside-ready points. Start each item with a bold key phrase. Maximum 5 items.\n\n',
  explanatory:
    'Answer as a numbered list. Start each item with a bold key phrase, then explain the point clearly for a clinician using the guidance at the bedside.\n\n',
};

function formatAnswer(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed) return 'No answer returned from NotebookLM.';

  if (/^\d+\.\s+\*\*/.test(trimmed)) {
    return trimmed.replace(/\n(?=\d+\.\s)/g, '\n\n');
  }

  const lines = trimmed
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    return trimmed;
  }

  return lines
    .map((line, index) => {
      if (/^\d+\.\s/.test(line)) return line;
      const cleaned = line.replace(/^[-*•]\s+/, '');
      if (cleaned.startsWith('**')) return `${index + 1}. ${cleaned}`;
      const words = cleaned.split(/\s+/);
      const lead = words.slice(0, Math.min(4, Math.max(2, Math.ceil(words.length / 3)))).join(' ');
      const rest = cleaned.slice(lead.length).trim();
      return rest ? `${index + 1}. **${lead}** ${rest}` : `${index + 1}. ${cleaned}`;
    })
    .join('\n\n');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = body?.question;
    const mode = body?.mode;

    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid question.' }, { status: 400 });
    }

    if (!NLM_PROXY_URL || !NOTEBOOK_ID) {
      return NextResponse.json(
        {
          error:
            'NotebookLM is not configured. Set NLM_PROXY_URL, NLM_PROXY_KEY, and NLM_NOTEBOOK_ID in the environment.',
        },
        { status: 503 },
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    const proxyBase = NLM_PROXY_URL.replace(/\/$/, '');
    const response = await fetch(`${proxyBase}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(NLM_PROXY_KEY ? { 'x-api-key': NLM_PROXY_KEY } : {}),
      },
      body: JSON.stringify({
        question: `${MODE_PREFIXES[mode as string] ?? ''}${question}`,
        notebook_id: NOTEBOOK_ID,
      }),
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const text = await response.text();
      console.error('NotebookLM proxy error:', response.status, text);
      return NextResponse.json(
        { error: 'Failed to query NotebookLM through the configured proxy.' },
        { status: 502 },
      );
    }

    const data = await response.json();
    return NextResponse.json({
      answer: formatAnswer(data.answer ?? ''),
      sources: Array.isArray(data.sources) ? data.sources : [],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${message}` },
      { status: 500 },
    );
  }
}

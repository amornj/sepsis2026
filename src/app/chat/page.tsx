'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Loader2, Send, Square, Trash2, Volume2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { PageContainer } from '@/components/layout/PageContainer';
import { Badge } from '@/components/ui/Badge';
import { useChatStore } from '@/store/chatStore';

type ChatMode = 'brief' | 'explanatory';

const suggestions = [
  'How does SSC 2026 frame sepsis versus septic shock?',
  'What is the initial fluid and vasopressor approach in septic shock?',
  'How should I think about lactate and perfusion reassessment?',
  'When should source control be prioritized in sepsis?',
];

export default function ChatPage() {
  const { messages, addMessage, clearMessages } = useChatStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>('explanatory');
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  function stopSpeaking() {
    window.speechSynthesis.cancel();
    setSpeakingIndex(null);
  }

  function speak(text: string, index: number) {
    if (speakingIndex === index) {
      stopSpeaking();
      return;
    }

    window.speechSynthesis.cancel();
    const cleaned = text.replace(/[#*_`>~-]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);
    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  }

  async function sendQuestion(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    addMessage({ role: 'user', content: trimmed });
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed, mode }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? 'Failed to query NotebookLM');
      }

      addMessage({ role: 'assistant', content: data.answer, sources: data.sources });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to query NotebookLM. Check proxy configuration.';
      addMessage({ role: 'assistant', content: message });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    void sendQuestion(input);
  }

  return (
    <PageContainer className="space-y-6">
      <section className="space-y-3">
        <Badge>Ask NotebookLM</Badge>
        <h1 className="text-3xl font-semibold text-stone-900 sm:text-4xl">Ask the sepsis notebook</h1>
        <p className="max-w-3xl text-base leading-7 text-stone-600">
          This page uses the same lightweight proxy pattern as nearby guideline apps. If the proxy
          or notebook ID is not configured, the UI fails gracefully instead of crashing.
        </p>
      </section>

      <section className="overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_18px_40px_rgba(56,41,28,0.08)]">
        <div className="flex items-center justify-between border-b border-stone-200 px-4 py-4">
          <div>
            <div className="text-lg font-semibold text-stone-900">NotebookLM Q&A</div>
            <div className="text-sm text-stone-500">Grounded answers when `NLM_PROXY_URL`, `NLM_PROXY_KEY`, and `NLM_NOTEBOOK_ID` are set.</div>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={() => {
                stopSpeaking();
                clearMessages();
              }}
              className="rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
              aria-label="Clear chat"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>

        <div ref={scrollRef} className="h-[58dvh] overflow-y-auto px-4 py-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
              <div className="max-w-xl space-y-2">
                <div className="text-lg font-semibold text-stone-900">Suggested prompts</div>
                <p className="text-sm leading-6 text-stone-600">
                  Ask about nuances, bedside tradeoffs, or exact recommendation framing from the
                  notebook source set.
                </p>
              </div>
              <div className="flex max-w-3xl flex-wrap justify-center gap-2">
                {suggestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => void sendQuestion(question)}
                    className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-700 transition hover:border-[var(--color-accent)] hover:bg-[rgba(178,58,45,0.05)]"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-4">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={
                      message.role === 'user'
                        ? 'max-w-[88%] rounded-[24px] rounded-br-md bg-[var(--color-accent)] px-4 py-3 text-sm text-white'
                        : 'max-w-[88%] rounded-[24px] rounded-bl-md bg-stone-100 px-4 py-3 text-sm text-stone-900'
                    }
                  >
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none prose-headings:mb-2 prose-p:my-2 prose-li:my-1.5">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}

                    {message.role === 'assistant' && (
                      <button
                        type="button"
                        onClick={() => speak(message.content, index)}
                        className="mt-2 inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900"
                      >
                        {speakingIndex === index ? (
                          <>
                            <Square className="h-3 w-3" /> Stop
                          </>
                        ) : (
                          <>
                            <Volume2 className="h-3 w-3" /> Read aloud
                          </>
                        )}
                      </button>
                    )}

                    {message.sources && message.sources.length > 0 && (
                      <details className="mt-3 border-t border-stone-200 pt-3">
                        <summary className="cursor-pointer text-xs font-medium text-stone-500">
                          {message.sources.length} source{message.sources.length > 1 ? 's' : ''}
                        </summary>
                        <div className="mt-2 space-y-2">
                          {message.sources.map((source, sourceIndex) => (
                            <div key={`${source.document_name}-${sourceIndex}`} className="rounded-2xl bg-white/80 p-3 text-xs leading-5 text-stone-700">
                              <div className="font-semibold text-stone-900">{source.document_name}</div>
                              <div>{source.chunk_text}</div>
                            </div>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-[24px] rounded-bl-md bg-stone-100 px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-stone-500" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-stone-200 px-4 py-4">
          <div className="mx-auto mb-3 flex max-w-3xl items-center gap-2 text-xs">
            <span className="font-semibold uppercase tracking-[0.16em] text-stone-500">Mode</span>
            <ModePill active={mode === 'brief'} onClick={() => setMode('brief')}>
              Brief
            </ModePill>
            <ModePill active={mode === 'explanatory'} onClick={() => setMode('explanatory')}>
              Explanatory
            </ModePill>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mx-auto flex max-w-3xl items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    void sendQuestion(input);
                  }
                }}
                rows={1}
                disabled={loading}
                placeholder="Ask about sepsis recognition, septic shock, fluids, MAP targets, source control, or escalation..."
                className="min-h-[52px] flex-1 resize-none rounded-[22px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[var(--color-accent)] focus:bg-white"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-[22px] bg-[var(--color-accent)] text-white transition hover:bg-[var(--color-accent-dark)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </PageContainer>
  );
}

function ModePill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'rounded-full bg-[var(--color-accent)] px-3 py-1.5 font-semibold text-white'
          : 'rounded-full bg-stone-100 px-3 py-1.5 font-semibold text-stone-600 hover:bg-stone-200'
      }
    >
      {children}
    </button>
  );
}

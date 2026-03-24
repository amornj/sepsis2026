import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { whatsNewSections } from '@/data/content';

export default function WhatsNewPage() {
  return (
    <PageContainer className="space-y-8">
      <section className="space-y-3">
        <Badge>2026 Update</Badge>
        <h1 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
          What&rsquo;s New in SSC 2026
        </h1>
        <p className="max-w-3xl text-base leading-7 text-stone-600">
          Key changes and clarifications from the 2026 Surviving Sepsis Campaign guideline. Each
          section highlights what shifted from prior guidance and what it means at the bedside.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {whatsNewSections.map((section) => (
          <Card key={section.category} className="space-y-4">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  {section.badge}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-stone-900">{section.category}</h2>
              <p className="mt-1 text-sm leading-6 text-stone-500 italic">{section.summary}</p>
            </div>
            <ul className="space-y-2 text-sm leading-6 text-stone-700">
              {section.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link href="/assessment">
          <Card className="flex h-full items-center justify-between gap-4 transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(56,41,28,0.1)]">
            <div>
              <div className="mb-1 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                Next step
              </div>
              <div className="font-semibold text-stone-900">Open the assessment pathway</div>
              <p className="mt-1 text-sm text-stone-600">
                Apply the updated guidance in step-by-step bedside order.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-stone-400" />
          </Card>
        </Link>

        <Link href="/reference">
          <Card className="flex h-full items-center justify-between gap-4 transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(56,41,28,0.1)]">
            <div>
              <div className="mb-1 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                Quick reference
              </div>
              <div className="font-semibold text-stone-900">Guideline summary</div>
              <p className="mt-1 text-sm text-stone-600">
                Condensed recommendations for all key domains.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-stone-400" />
          </Card>
        </Link>
      </section>

      <section className="rounded-[28px] border border-stone-200 bg-white/80 p-6 text-sm leading-7 text-stone-600">
        This summary is based on the 2026 Surviving Sepsis Campaign international guidelines. It is
        intended as clinical decision support only and is not a substitute for reading the full
        guideline or applying local protocols.
      </section>
    </PageContainer>
  );
}

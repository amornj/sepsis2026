import { ExternalLink } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { referenceSections } from '@/data/content';

export default function ReferencePage() {
  return (
    <PageContainer className="space-y-8">
      <section className="space-y-3">
        <Badge>Reference</Badge>
        <h1 className="text-3xl font-semibold text-stone-900 sm:text-4xl">Guideline quick reference</h1>
        <p className="max-w-3xl text-base leading-7 text-stone-600">
          Condensed bedside summary of the highest-yield workflow points from the 2026 Surviving
          Sepsis Campaign guideline.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {referenceSections.map((section) => (
          <Card key={section.title} className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-stone-900">{section.title}</h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  {section.badge}
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm leading-6 text-stone-700">
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Card>
        ))}
      </section>

      <Card className="space-y-4">
        <h2 className="text-xl font-semibold text-stone-900">Source used for this summary</h2>
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm leading-6 text-stone-700">
          <p className="font-semibold">Surviving Sepsis Campaign: international guidelines for management of sepsis and septic shock 2026</p>
          <p>DOI: 10.1007/s00134-026-08361-1</p>
          <a
            href="https://doi.org/10.1007/s00134-026-08361-1"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 font-semibold text-[var(--color-accent-dark)]"
          >
            Open DOI
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </Card>
    </PageContainer>
  );
}

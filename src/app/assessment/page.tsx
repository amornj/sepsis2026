import { ArrowRight, Clock3, Gauge, Syringe, TestTube2 } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { pathwaySections } from '@/data/content';

const timeline = [
  {
    title: '0-15 min',
    icon: Clock3,
    points: [
      'Recognize suspected infection with organ dysfunction or hypoperfusion.',
      'Escalate nursing and medical review immediately if unstable.',
      'Send cultures and initial labs without slowing treatment.',
    ],
  },
  {
    title: 'Within 1 h',
    icon: Syringe,
    points: [
      'Start antimicrobials for septic shock and for probable or definite sepsis.',
      'Begin crystalloid resuscitation when hypoperfusion or shock is present.',
      'If unstable, start vasopressors without waiting for perfect central access.',
    ],
  },
  {
    title: 'First 3 h',
    icon: TestTube2,
    points: [
      'Move toward at least 30 mL/kg crystalloid for sepsis-induced hypoperfusion or septic shock if clinically appropriate.',
      'Reassess lactate, perfusion, urine output, MAP, oxygenation, and mentation.',
      'Decide whether the source needs urgent drainage, debridement, removal, or decompression.',
    ],
  },
  {
    title: 'Ongoing',
    icon: Gauge,
    points: [
      'Target MAP around 65 mmHg in most adults; individualize for older adults and context.',
      'Escalate pressors, inotropes, airway support, and ICU transfer if shock persists.',
      'Use repeated bedside reassessment rather than one-time bundle completion.',
    ],
  },
];

export default function AssessmentPage() {
  return (
    <PageContainer className="space-y-8">
      <section className="space-y-3">
        <Badge>Pathway</Badge>
        <h1 className="text-3xl font-semibold text-stone-900 sm:text-4xl">Sepsis assessment and early management pathway</h1>
        <p className="max-w-3xl text-base leading-7 text-stone-600">
          Structured for real bedside flow: recognize, classify, resuscitate, press, treat the
          infection, control the source, and keep reassessing.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {timeline.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="bg-[rgba(255,255,255,0.88)]">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-surface-strong)] text-[var(--color-accent)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-500">
                  {item.title}
                </div>
              </div>
              <ul className="space-y-2 text-sm leading-6 text-stone-700">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Card>
          );
        })}
      </section>

      <section className="space-y-4">
        {pathwaySections.map((section, index) => (
          <Card key={section.step} className="overflow-hidden p-0">
            <div className="grid gap-0 md:grid-cols-[220px_1fr]">
              <div className="border-b border-stone-200 bg-[var(--color-surface-strong)] p-5 md:border-r md:border-b-0">
                <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  Step {index + 1}
                </div>
                <h2 className="text-xl font-semibold text-stone-900">{section.step}</h2>
              </div>
              <div className="space-y-4 p-5">
                <p className="text-base leading-7 text-stone-700">{section.summary}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {section.actions.map((action) => (
                    <div
                      key={action}
                      className="rounded-2xl border border-stone-200 bg-stone-50/80 px-4 py-3 text-sm leading-6 text-stone-700"
                    >
                      {action}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <section className="rounded-[28px] border border-stone-200 bg-white p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">Need quick scoring support?</h2>
            <p className="text-sm leading-6 text-stone-600">
              Open the calculators page for qSOFA, SOFA-lite, shock index, and lactate support.
            </p>
          </div>
          <a
            href="/calculators"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-dark)]"
          >
            Open calculators
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </PageContainer>
  );
}

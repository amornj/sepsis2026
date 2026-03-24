import Link from 'next/link';
import { ArrowRight, BookOpen, Calculator, MessageCircle, ShieldAlert, Stethoscope } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { homeHighlights } from '@/data/content';

const quickLinks = [
  {
    href: '/assessment',
    title: 'Assessment Pathway',
    icon: Stethoscope,
    description:
      'Drive recognition, classification, early bundle, fluids, pressors, antimicrobials, and escalation in bedside order.',
  },
  {
    href: '/calculators',
    title: 'Bedside Calculators',
    icon: Calculator,
    description: 'qSOFA, SOFA-lite, shock index, and lactate support in one mobile-friendly page.',
  },
  {
    href: '/chat',
    title: 'Ask NotebookLM',
    icon: MessageCircle,
    description: 'Query the source notebook when configured, with a graceful fallback when it is not.',
  },
  {
    href: '/reference',
    title: 'Guideline Summary',
    icon: BookOpen,
    description: 'Condensed recommendations for screening, fluids, MAP, vasopressors, antibiotics, and source control.',
  },
];

export default function HomePage() {
  return (
    <PageContainer className="space-y-10">
      <section className="overflow-hidden rounded-[36px] border border-stone-200/70 bg-[linear-gradient(135deg,rgba(178,58,45,0.96),rgba(109,33,25,0.98))] text-white shadow-[0_20px_60px_rgba(89,34,24,0.24)]">
        <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.5fr_0.9fr] lg:px-10 lg:py-12">
          <div className="space-y-5">
            <Badge className="border-white/20 bg-white/10 text-white">Surviving Sepsis Campaign 2026</Badge>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
                Bedside sepsis guidance for the first critical hours.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/84 sm:text-lg">
                A mobile-first clinical guide for recognizing suspected infection with organ
                dysfunction, distinguishing sepsis from septic shock, and moving cleanly through
                fluids, vasopressors, antimicrobials, lactate, source control, and ICU escalation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/assessment"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-accent-dark)] transition hover:bg-stone-100"
              >
                Open pathway
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/calculators"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/14"
              >
                Open calculators
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-[28px] border border-white/10 bg-white/10 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                <ShieldAlert className="h-4 w-4" />
                Core bedside priorities
              </div>
              <ul className="space-y-2 text-sm leading-6 text-white/85">
                <li>Recognize infection plus organ dysfunction early</li>
                <li>Start resuscitation and antibiotics without avoidable delay</li>
                <li>Target perfusion, not checklist completion alone</li>
                <li>Reassess often and escalate before refractory shock sets in</li>
              </ul>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-[rgba(248,243,232,0.12)] p-4 text-sm leading-6 text-white/84">
              No PHI storage. No local persistence across refresh. Designed for fast bedside use on
              phones and tablets.
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(56,41,28,0.1)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-surface-strong)] text-[var(--color-accent)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mb-2 text-lg font-semibold text-stone-900">{item.title}</h2>
                <p className="text-sm leading-6 text-stone-600">{item.description}</p>
              </Card>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {homeHighlights.map((item) => (
          <Card key={item.title} className="bg-[rgba(255,255,255,0.82)]">
            <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              {item.title}
            </div>
            <p className="text-base leading-7 text-stone-700">{item.description}</p>
          </Card>
        ))}
      </section>

      <section className="rounded-[28px] border border-stone-200 bg-white/80 p-6 text-sm leading-7 text-stone-600">
        This app is for clinical decision support only. It does not store protected health
        information and is not a substitute for bedside judgment, local protocols, or direct review
        of the full guideline.
      </section>
    </PageContainer>
  );
}

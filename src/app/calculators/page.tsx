'use client';

import { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { calculatorCards } from '@/data/content';
import {
  calculateQsofa,
  calculateShockIndex,
  calculateSofaLite,
  summarizeLactate,
} from '@/lib/calculators';

export default function CalculatorsPage() {
  const [rr, setRr] = useState(24);
  const [sbp, setSbp] = useState(96);
  const [ams, setAms] = useState(true);
  const [hr, setHr] = useState(118);
  const [map, setMap] = useState(62);
  const [platelets, setPlatelets] = useState(110);
  const [bilirubin, setBilirubin] = useState(2.4);
  const [creatinine, setCreatinine] = useState(2.1);
  const [lactate, setLactate] = useState(3.2);

  const qsofa = calculateQsofa({ alteredMentation: ams, respiratoryRate: rr, systolicBp: sbp });
  const sofaLite = calculateSofaLite({ map, platelets, bilirubin, creatinine, alteredMentation: ams });
  const shockIndex = calculateShockIndex(hr, sbp);
  const lactateSummary = summarizeLactate(lactate);

  return (
    <PageContainer className="space-y-8">
      <section className="space-y-3">
        <Badge>Calculators</Badge>
        <h1 className="text-3xl font-semibold text-stone-900 sm:text-4xl">Bedside risk and severity support</h1>
        <p className="max-w-3xl text-base leading-7 text-stone-600">
          These tools support recognition and escalation. They do not replace full clinical
          assessment and should not be used as stand-alone diagnostic gates.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {calculatorCards.map((card) => (
          <Card key={card.title} className="bg-[rgba(255,255,255,0.8)]">
            <h2 className="mb-2 text-lg font-semibold text-stone-900">{card.title}</h2>
            <p className="text-sm leading-6 text-stone-600">{card.description}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">qSOFA</h2>
            <p className="text-sm leading-6 text-stone-600">
              Use as a risk flag and urgency signal. The guideline advises against using qSOFA as
              the sole screening tool.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField label="Respiratory rate" value={rr} onChange={setRr} />
            <NumberField label="Systolic BP" value={sbp} onChange={setSbp} />
          </div>
          <label className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
            <input
              type="checkbox"
              checked={ams}
              onChange={(e) => setAms(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-accent)]"
            />
            Altered mentation present
          </label>
          <ResultCard label={`Score ${qsofa.score}/3`} summary={qsofa.risk} />
        </Card>

        <Card className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">SOFA-lite</h2>
            <p className="text-sm leading-6 text-stone-600">
              Simplified bedside organ dysfunction support. This is intentionally lighter than a
              full SOFA calculation.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField label="MAP" value={map} onChange={setMap} />
            <NumberField label="Platelets x10³/µL" value={platelets} onChange={setPlatelets} />
            <NumberField label="Bilirubin mg/dL" value={bilirubin} onChange={setBilirubin} step="0.1" />
            <NumberField label="Creatinine mg/dL" value={creatinine} onChange={setCreatinine} step="0.1" />
          </div>
          <ResultCard label={`Score ${sofaLite.score}/5`} summary={sofaLite.interpretation} />
        </Card>

        <Card className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">Shock index</h2>
            <p className="text-sm leading-6 text-stone-600">
              Heart rate divided by systolic blood pressure. Useful as a quick hemodynamic stress
              signal, especially when trending.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField label="Heart rate" value={hr} onChange={setHr} />
            <NumberField label="Systolic BP" value={sbp} onChange={setSbp} />
          </div>
          <ResultCard
            label={`${shockIndex.score.toFixed(2)} (${shockIndex.band})`}
            summary={shockIndex.note}
          />
        </Card>

        <Card className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">Lactate helper</h2>
            <p className="text-sm leading-6 text-stone-600">
              Supports bedside interpretation. A lower lactate does not exclude evolving shock.
            </p>
          </div>
          <NumberField label="Lactate mmol/L" value={lactate} onChange={setLactate} step="0.1" />
          <ResultCard label={lactateSummary.level} summary={lactateSummary.summary} />
        </Card>
      </section>
    </PageContainer>
  );
}

function NumberField({
  label,
  value,
  onChange,
  step,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: string;
}) {
  return (
    <label className="space-y-2">
      <div className="text-sm font-medium text-stone-700">{label}</div>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        step={step ?? '1'}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-[var(--color-accent)] focus:bg-white"
      />
    </label>
  );
}

function ResultCard({ label, summary }: { label: string; summary: string }) {
  return (
    <div className="rounded-2xl border border-[rgba(178,58,45,0.14)] bg-[rgba(178,58,45,0.06)] p-4">
      <div className="mb-1 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
        {label}
      </div>
      <p className="text-sm leading-6 text-stone-700">{summary}</p>
    </div>
  );
}

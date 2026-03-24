export interface QsofaInput {
  alteredMentation: boolean;
  respiratoryRate: number;
  systolicBp: number;
}

export function calculateQsofa(input: QsofaInput) {
  const score =
    Number(input.alteredMentation) +
    Number(input.respiratoryRate >= 22) +
    Number(input.systolicBp <= 100);

  return {
    score,
    risk:
      score >= 2
        ? 'Higher risk of poor outcome; escalate evaluation and treatment.'
        : score === 1
          ? 'Intermediate bedside concern; combine with broader assessment.'
          : 'Low qSOFA burden, but qSOFA alone does not exclude sepsis.',
  };
}

export interface SofaLiteInput {
  map: number;
  platelets: number;
  bilirubin: number;
  creatinine: number;
  alteredMentation: boolean;
}

function organPoint(value: boolean) {
  return value ? 1 : 0;
}

export function calculateSofaLite(input: SofaLiteInput) {
  const cardiovascular = organPoint(input.map < 65);
  const coagulation = organPoint(input.platelets > 0 && input.platelets < 150);
  const liver = organPoint(input.bilirubin >= 2);
  const renal = organPoint(input.creatinine >= 2);
  const neuro = organPoint(input.alteredMentation);
  const score = cardiovascular + coagulation + liver + renal + neuro;

  return {
    score,
    interpretation:
      score >= 2
        ? 'SOFA-lite suggests acute organ dysfunction is present; treat as possible sepsis if infection is suspected.'
        : 'Limited organ dysfunction by this simplified bedside screen; continue full clinical assessment.',
  };
}

export function calculateShockIndex(heartRate: number, systolicBp: number) {
  const score = systolicBp > 0 ? heartRate / systolicBp : 0;
  let band = 'Typical range';
  if (score >= 1) band = 'Elevated';
  if (score >= 1.2) band = 'Markedly elevated';

  return {
    score,
    band,
    note:
      score >= 1
        ? 'May support concern for hemodynamic compromise; interpret with exam, lactate, and trend.'
        : 'Does not exclude occult hypoperfusion.',
  };
}

export function summarizeLactate(lactate: number) {
  if (lactate >= 4) {
    return {
      level: 'High',
      summary:
        'Strong hypoperfusion concern. Expedite resuscitation, reassessment, and escalation.',
    };
  }

  if (lactate > 2) {
    return {
      level: 'Intermediate',
      summary:
        'Intermediate elevation can still indicate meaningful risk and may justify fluid resuscitation when clinically appropriate.',
    };
  }

  return {
    level: 'Lower',
    summary:
      'A lower lactate does not rule out sepsis, shock, or evolving organ dysfunction.',
  };
}

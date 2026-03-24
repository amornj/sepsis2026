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

export interface News2Input {
  respiratoryRate: number;
  spo2: number;
  supplementalO2: boolean;
  temperature: number;
  systolicBp: number;
  heartRate: number;
  cvpu: boolean; // true = new confusion, voice, pain, or unresponsive
}

function scoreRr(rr: number) {
  if (rr <= 8) return 3;
  if (rr <= 11) return 1;
  if (rr <= 20) return 0;
  if (rr <= 24) return 2;
  return 3;
}

function scoreSpo2(spo2: number) {
  if (spo2 <= 91) return 3;
  if (spo2 <= 93) return 2;
  if (spo2 <= 95) return 1;
  return 0;
}

function scoreTemp(temp: number) {
  if (temp <= 35.0) return 3;
  if (temp <= 36.0) return 1;
  if (temp <= 38.0) return 0;
  if (temp <= 39.0) return 1;
  return 2;
}

function scoreSbp(sbp: number) {
  if (sbp <= 90) return 3;
  if (sbp <= 100) return 2;
  if (sbp <= 110) return 1;
  if (sbp <= 219) return 0;
  return 3;
}

function scoreHr(hr: number) {
  if (hr <= 40) return 3;
  if (hr <= 50) return 1;
  if (hr <= 90) return 0;
  if (hr <= 110) return 1;
  if (hr <= 130) return 2;
  return 3;
}

export function calculateNews2(input: News2Input) {
  const rrScore = scoreRr(input.respiratoryRate);
  const spo2Score = scoreSpo2(input.spo2);
  const o2Score = input.supplementalO2 ? 2 : 0;
  const tempScore = scoreTemp(input.temperature);
  const sbpScore = scoreSbp(input.systolicBp);
  const hrScore = scoreHr(input.heartRate);
  const cvpuScore = input.cvpu ? 3 : 0;

  const total = rrScore + spo2Score + o2Score + tempScore + sbpScore + hrScore + cvpuScore;
  const anyThree = [rrScore, spo2Score, tempScore, sbpScore, hrScore, cvpuScore].some((s) => s === 3);

  let band: string;
  let interpretation: string;

  if (total >= 7) {
    band = 'High';
    interpretation = 'Emergency response. Continuous monitoring; consider ICU review immediately.';
  } else if (total >= 5 || anyThree) {
    band = 'Medium';
    interpretation = 'Urgent clinical review. Escalate care; monitor at least hourly.';
  } else if (total >= 1) {
    band = 'Low';
    interpretation = 'Low-medium concern. Reassess regularly; increase frequency if trajectory worsens.';
  } else {
    band = 'Low';
    interpretation = 'Minimal physiological derangement. Routine monitoring interval appropriate.';
  }

  return { total, band, interpretation };
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

export const homeHighlights = [
  {
    title: 'Recognize early',
    description:
      'Suspected infection plus new organ dysfunction should trigger immediate sepsis thinking, not delayed labeling.',
  },
  {
    title: 'Treat shock fast',
    description:
      'Septic shock is the higher-risk subset with circulatory dysfunction and deserves parallel fluids, vasopressors, antimicrobials, and escalation.',
  },
  {
    title: 'Reassess repeatedly',
    description:
      'Fluid, perfusion, MAP, lactate, capillary refill, urine output, and mental status all need serial reassessment.',
  },
  {
    title: 'Control the source',
    description:
      'Drain, debride, remove infected hardware, or relieve obstruction as soon as practical once the source is identified.',
  },
];

export const pathwaySections = [
  {
    step: '1. Trigger recognition',
    summary:
      'Suspect sepsis when infection is possible or likely and acute organ dysfunction, hypotension, or hypoperfusion is present.',
    actions: [
      'Look for altered mentation, tachypnea, hypotension, mottling, oliguria, rising creatinine, thrombocytopenia, jaundice, or elevated lactate.',
      'Use NEWS2, NEWS, MEWS, or SIRS for screening; do not rely on qSOFA alone as the only screening tool.',
      'Positive qSOFA should still heighten concern and accelerate review.',
    ],
  },
  {
    step: '2. Classify severity',
    summary:
      'Sepsis is life-threatening organ dysfunction due to infection. Septic shock is the subset with circulatory dysfunction and higher mortality risk.',
    actions: [
      'Treat hypotension, elevated lactate, worsening perfusion, or vasopressor need as high-acuity signals.',
      'Use bedside data and trajectory; do not wait for perfect confirmation before resuscitation.',
      'If the patient is unstable, activate higher-acuity support early.',
    ],
  },
  {
    step: '3. Start the first-hour bundle',
    summary:
      'Sepsis and septic shock are medical emergencies; treatment and resuscitation should begin immediately.',
    actions: [
      'Obtain cultures promptly when feasible, but do not let cultures delay antibiotics.',
      'Measure lactate when septic shock is suspected.',
      'Begin crystalloid resuscitation for sepsis-induced hypoperfusion or septic shock.',
      'Administer antimicrobials immediately, ideally within 1 hour, for septic shock and for probable or definite sepsis.',
    ],
  },
  {
    step: '4. Resuscitate perfusion',
    summary:
      'Guideline-oriented initial fluid strategy is at least 30 mL/kg IV crystalloid in the first 3 hours for sepsis-induced hypoperfusion or septic shock.',
    actions: [
      'Use frequent reassessment to avoid under- or over-resuscitation.',
      'Balanced crystalloids are preferred over normal saline for initial resuscitation when available.',
      'Intermediate lactate elevation above 2 mmol/L can still matter clinically.',
      'Consider albumin only selectively after large crystalloid volumes or in specific contexts such as cirrhosis.',
    ],
  },
  {
    step: '5. Support blood pressure',
    summary:
      'If hypotension persists after the initial bolus, start vasopressors. In unstable septic shock, concurrent vasopressor plus fluid resuscitation may be warranted.',
    actions: [
      'Target an initial MAP around 65 mmHg.',
      'For adults age 65 years or older, an initial MAP range of 60 to 65 mmHg may be reasonable.',
      'Start vasopressors peripherally rather than delaying for central access if needed, using a monitored safety protocol.',
      'Norepinephrine is the preferred first-line vasopressor in most patients.',
    ],
  },
  {
    step: '6. Escalate if shock persists',
    summary:
      'Escalate vasopressor and hemodynamic support when perfusion remains inadequate despite fluids and first-line pressor therapy.',
    actions: [
      'Add vasopressin when norepinephrine requirements are escalating.',
      'Add epinephrine if shock persists despite norepinephrine and vasopressin, or if vasopressin is unavailable.',
      'Consider inotrope support when hypoperfusion persists despite adequate volume status and MAP.',
      'Seek ICU or higher-acuity care early; if ICU admission is required, aim not to delay beyond 6 hours.',
    ],
  },
  {
    step: '7. Control infection source',
    summary:
      'Rapidly evaluate for a source that needs procedural or surgical control.',
    actions: [
      'Abscess, empyema, obstructed pyelonephritis, infected device, perforation, cholangitis, and necrotizing soft tissue infection should move source control to the front of the queue.',
      'Aim for source control as early as practical, ideally within 6 hours when a source requiring intervention is identified.',
      'Do not pursue prolonged medical stabilization while ignoring a fixable source in a deteriorating patient.',
    ],
  },
  {
    step: '8. Reassess and disposition',
    summary:
      'Trend the response to therapy and upgrade care when instability, vasopressor need, respiratory failure, or worsening organ dysfunction persists.',
    actions: [
      'Reassess mental status, capillary refill, urine output, lactate trend, MAP, work of breathing, and bedside perfusion frequently.',
      'Use capillary refill time as an adjunct to other perfusion measures when practical.',
      'Escalate for refractory hypotension, rising vasopressor need, worsening oxygenation, or unresolved source control issues.',
    ],
  },
];

export const referenceSections = [
  {
    title: 'Recognition and screening',
    badge: 'SSC 2026',
    points: [
      'Sepsis is life-threatening acute organ dysfunction due to infection.',
      'Septic shock is the subset with circulatory dysfunction and higher mortality risk.',
      'Use NEWS2, NEWS, MEWS, or SIRS over qSOFA as the sole screening tool in hospital settings.',
      'A positive qSOFA should still increase urgency, but a negative qSOFA does not exclude sepsis.',
    ],
  },
  {
    title: 'Antimicrobial timing',
    badge: 'Strong',
    points: [
      'Possible, probable, or definite septic shock: give antimicrobials immediately, ideally within 1 hour.',
      'Probable or definite sepsis without shock: give antimicrobials immediately, ideally within 1 hour.',
      'Possible sepsis without shock: perform a rapid time-limited assessment and give antimicrobials within 3 hours if infection concern persists.',
      'Cultures should not meaningfully delay therapy.',
    ],
  },
  {
    title: 'Fluids and perfusion',
    badge: 'Early bundle',
    points: [
      'Begin treatment immediately once sepsis or septic shock is recognized.',
      'For sepsis-induced hypoperfusion or septic shock, initial crystalloid strategy is at least 30 mL/kg in the first 3 hours.',
      'Reassess often for response and fluid tolerance.',
      'Intermediate lactate elevation above 2 mmol/L may still represent clinically important hypoperfusion.',
    ],
  },
  {
    title: 'Vasopressors and targets',
    badge: 'Hemodynamics',
    points: [
      'If hypotension persists after the initial bolus, start vasopressors.',
      'In unstable septic shock, concurrent vasopressor and fluid administration can be appropriate.',
      'Peripheral initiation is acceptable when it prevents delay, provided monitoring is robust.',
      'Initial MAP target is around 65 mmHg; older adults may tolerate a lower 60 to 65 mmHg range.',
    ],
  },
  {
    title: 'Source control and escalation',
    badge: 'Critical',
    points: [
      'Rapidly identify drainable or removable sources of infection.',
      'When source control is needed, aim for it as early as practical, ideally within 6 hours.',
      'If ICU admission is required, do not delay unnecessarily.',
      'Escalate for persistent shock, respiratory failure, worsening lactate, or progressive organ dysfunction.',
    ],
  },
];

export const calculatorCards = [
  {
    title: 'qSOFA',
    description: 'Bedside risk signal. Useful for urgency, not as a stand-alone screening strategy.',
  },
  {
    title: 'SOFA-lite',
    description: 'Quick organ dysfunction support using easy bedside inputs.',
  },
  {
    title: 'Shock Index',
    description: 'Heart rate divided by systolic blood pressure to flag hemodynamic strain.',
  },
  {
    title: 'Lactate helper',
    description: 'Guideline-aligned interpretation support for elevated lactate in suspected sepsis.',
  },
];

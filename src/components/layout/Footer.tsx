export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-[var(--color-surface-strong)] px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-2 text-center text-sm text-stone-600">
        <p className="font-semibold text-stone-800">
          Clinical decision support only. No PHI storage. Not a substitute for judgment.
        </p>
        <p>
          Built around the Surviving Sepsis Campaign 2026 guidance for sepsis and septic shock
          management. Always integrate local resources, patient context, and institutional
          protocols.
        </p>
        <p className="text-xs text-stone-500">sepsis2026 v0.1.0</p>
      </div>
    </footer>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Activity, Menu } from 'lucide-react';
import { MobileNav } from './MobileNav';

const links = [
  { href: '/assessment', label: 'Pathway' },
  { href: '/calculators', label: 'Calculators' },
  { href: '/reference', label: 'Reference' },
  { href: '/chat', label: 'Ask NotebookLM' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/50 bg-[rgba(247,244,237,0.86)] backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3 text-stone-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-white shadow-sm">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                Sepsis 2026
              </div>
              <div className="text-base font-semibold">Bedside Guide</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-white hover:text-stone-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="rounded-full p-2 text-stone-700 hover:bg-white md:hidden"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}

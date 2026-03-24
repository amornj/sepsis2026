'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Activity, BookOpen, Calculator, ClipboardList, Home, MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/assessment', label: 'Pathway', icon: ClipboardList },
  { href: '/calculators', label: 'Calculators', icon: Calculator },
  { href: '/reference', label: 'Reference', icon: BookOpen },
  { href: '/chat', label: 'Ask NotebookLM', icon: MessageCircle },
];

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-40 bg-stone-950/40 transition-opacity',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-80 max-w-[88vw] bg-[var(--color-surface)] p-4 shadow-2xl transition-transform',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-white">
              <Activity className="h-5 w-5" />
            </div>
            <div className="font-semibold text-stone-900">Sepsis 2026</div>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-white">
            <X className="h-5 w-5 text-stone-700" />
          </button>
        </div>

        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 hover:bg-white"
              >
                <Icon className="h-4 w-4 text-[var(--color-accent)]" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

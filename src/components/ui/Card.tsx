import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-[28px] border border-stone-200/80 bg-white p-5 shadow-[0_14px_30px_rgba(56,41,28,0.06)]',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

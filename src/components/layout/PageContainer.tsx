import { cn } from '@/lib/utils';

export interface PageContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function PageContainer({ className, children }: PageContainerProps) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 pt-20 pb-10', className)}>{children}</div>;
}

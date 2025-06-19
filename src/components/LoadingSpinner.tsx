import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  text?: string;
}

export function LoadingSpinner({
  size = 24,
  className = '',
  text = 'Loading...',
}: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 className="animate-spin text-primary" size={size} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
}

export function InlineLoadingSpinner({ size = 16, className = '' }: Omit<LoadingSpinnerProps, 'text'>) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    </span>
  );
}

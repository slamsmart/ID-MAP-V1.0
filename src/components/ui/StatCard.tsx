import { type ReactNode } from 'react';

interface StatCardProps {
  icon?: ReactNode;
  label: string;
  value: string;
  delta?: string;
  glass?: boolean;
  dark?: boolean;
  className?: string;
}

export default function StatCard({ icon, label, value, delta, glass, dark, className = '' }: StatCardProps) {
  const base = dark
    ? 'bg-mangrove-deep/60 backdrop-blur-md border-mangrove-teal/30 text-white'
    : glass
      ? 'bg-white/10 backdrop-blur-md border-white/10 text-white'
      : 'bg-white border-gray-100 text-gray-900';

  return (
    <div className={`rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow ${base} ${className}`}>
      <div className="flex items-center gap-3">
        {icon && <div className="w-9 h-9 rounded-lg bg-mangrove-fresh/10 flex items-center justify-center text-mangrove-fresh flex-shrink-0">{icon}</div>}
        <div className="min-w-0">
          <p className={`text-xs ${dark || glass ? 'text-gray-300' : 'text-mangrove-muted'}`}>{label}</p>
          <p className="text-lg font-bold mt-0.5 truncate">{value}</p>
          {delta && (
            <span className="text-[10px] font-medium text-mangrove-fresh inline-block">
              {delta}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

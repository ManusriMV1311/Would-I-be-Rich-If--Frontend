'use client';

import { ReactNode } from 'react';

export function AnimatedScenarioCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function AnimatedGrid({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

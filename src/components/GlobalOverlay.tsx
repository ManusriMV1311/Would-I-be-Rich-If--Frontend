'use client';

import { useUIStore } from '@/store/uiStore';
import SimulatingOverlay from './ui/SimulatingOverlay';

export default function GlobalOverlay() {
  const isSimulating = useUIStore((state) => state.isSimulating);
  
  return <SimulatingOverlay isOpen={isSimulating} />;
}

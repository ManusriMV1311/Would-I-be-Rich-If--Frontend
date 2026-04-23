import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Would I Be Rich If...?',
  description: 'This page does not exist. Go back and explore financial scenarios.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">

      {/* Glitch animation number */}
      <div className="relative mb-6 select-none" aria-hidden="true">
        <span className="text-[10rem] font-extrabold text-slate-800 leading-none">404</span>
        <span className="absolute inset-0 text-[10rem] font-extrabold text-brand/10 leading-none blur-sm">404</span>
      </div>

      {/* Icon */}
      <div className="text-7xl mb-6" role="img" aria-label="broken time machine">
        ⏱️💥
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-3">
        Your time machine broke
      </h1>
      <p className="text-foreground/60 text-base mb-10 max-w-sm leading-relaxed">
        This page doesn't exist — or may have already been lost to the space-time continuum.
        Let's get you back to safety.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          id="not-found-go-home"
          className="
            inline-flex items-center justify-center gap-2
            rounded-full bg-brand px-7 py-3.5
            text-white font-semibold text-sm
            hover:bg-brand/90 transition-colors shadow-lg shadow-brand/25
          "
        >
          ← Back to Home
        </Link>
        <Link
          href="/scenarios"
          id="not-found-explore"
          className="
            inline-flex items-center justify-center gap-2
            rounded-full border border-foreground/20 px-7 py-3.5
            text-foreground/70 font-semibold text-sm
            hover:border-brand/50 hover:text-brand transition-colors
            bg-foreground/5
          "
        >
          Explore Scenarios
        </Link>
      </div>

    </main>
  );
}

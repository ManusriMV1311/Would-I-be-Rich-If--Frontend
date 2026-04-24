'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useEffect } from 'react';
import CurrencyToggle from '@/components/ui/CurrencyToggle';
import RegionToggle from '@/components/ui/RegionToggle';

const NAV_LINKS = [
  { href: '/scenarios',  label: 'Scenarios' },
  { href: '/custom',     label: 'Build My Own' },
  { href: '/about',      label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isDark, toggleTheme } = useUIStore();
  
  useEffect(() => {
    setMounted(true);
    // Initial sync
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Prevent hydration mismatch by not rendering persisted UI until mounted
  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-500">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-white/5 animate-pulse" />
            <div className="h-6 w-32 bg-white/5 animate-pulse rounded-md" />
          </div>
          <div className="flex items-center gap-4">
             <div className="w-24 h-8 bg-white/5 animate-pulse rounded-xl" />
             <div className="w-10 h-10 bg-white/5 animate-pulse rounded-2xl" />
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-500">
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* ── Brand Logo ── */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform hover:scale-[1.02] active:scale-[0.98]"
          aria-label="Would I Be Rich If Home — Return to start"
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-2xl border border-white/40 group-hover:border-brand/40 transition-all overflow-hidden shadow-xl shadow-brand/5">
            <img src="/logo.jpg" alt="Would I Be Rich If...?" className="w-full h-full object-cover" aria-hidden="true" />
          </span>
          <span className="font-black text-foreground tracking-tighter text-xl leading-none">
            Would I Be{' '}
            <span className="text-brand">Rich If</span>
            <span className="text-foreground/30">...?</span>
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <ul className="hidden lg:flex items-center gap-2" role="list">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`
                    px-5 py-2 rounded-xl text-sm font-bold tracking-tight transition-all duration-300
                    ${isActive
                      ? 'bg-brand text-white shadow-lg shadow-brand/20'
                      : 'text-foreground/60 hover:text-foreground hover:bg-white/40'
                    }
                  `}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop CTA & Theme ── */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md">
            <CurrencyToggle />
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-3 rounded-2xl text-foreground/40 hover:text-brand hover:bg-white/40 transition-all duration-300 border border-transparent hover:border-white/40"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>
          
          <Link
            href="/scenarios"
            className="btn-primary"
          >
            Explore →
          </Link>
        </div>

        {/* ── Mobile hamburger & Theme ── */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-foreground/60 hover:text-brand hover:bg-white/40 transition-colors"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>
          
          <button
            className="p-2 rounded-xl text-foreground/60 hover:text-brand hover:bg-white/40 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu panel ── */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="sm:hidden border-t border-white/20 bg-white/10 backdrop-blur-xl px-4 py-6 space-y-2 animate-in slide-in-from-top duration-500"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={`
                  block px-6 py-4 rounded-2xl text-base font-black tracking-tight transition-all
                  ${isActive
                    ? 'bg-brand text-white'
                    : 'text-foreground/60 hover:text-foreground hover:bg-white/40'
                  }
                `}
              >
                {label}
              </Link>
            );
          })}
          <div className="pt-4 flex items-center justify-center px-4">
            <CurrencyToggle />
          </div>
          <Link
            href="/scenarios"
            onClick={() => setMenuOpen(false)}
            className="btn-primary block w-full text-center mt-6"
          >
            Explore Scenarios →
          </Link>
        </div>
      )}
    </header>
  );
}

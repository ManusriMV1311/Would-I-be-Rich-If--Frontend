'use client';

import { useShare } from '@/hooks/useShare';
import { useUIStore } from '@/store/uiStore';
import { Share2, Check } from 'lucide-react';

interface ShareButtonProps {
  resultId: string;
}

export default function ShareButton({ resultId }: ShareButtonProps) {
  const { copied, share } = useShare();
  const { addToast } = useUIStore();

  const handleShare = async () => {
    const url = `${window.location.origin}/result/${resultId}`;
    await share(url);
    if (!copied) {
      addToast('Share link copied to clipboard! 🎉', 'success');
    }
  };

  return (
    <button
      id="share-result-button"
      onClick={handleShare}
      aria-label={copied ? 'Link copied to clipboard!' : 'Copy share link to clipboard'}
      className={`
        flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
        ${copied
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-95'
          : 'bg-card text-foreground/70 border border-border hover:border-foreground/30 hover:text-foreground hover:bg-foreground/5'
        }
      `}
    >
      {copied ? (
        <>
          <Check size={14} aria-hidden="true" />
          Link Copied!
        </>
      ) : (
        <>
          <Share2 size={14} aria-hidden="true" />
          Share Result
        </>
      )}
    </button>
  );
}

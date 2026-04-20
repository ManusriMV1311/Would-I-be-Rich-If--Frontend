'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export default function AnimatedBackground() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { scrollY } = useScroll();

  // Parallax transforms for each blob
  const parallax1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const parallax2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const parallax3 = useTransform(scrollY, [0, 1000], [0, 120]);
  const parallax4 = useTransform(scrollY, [0, 1000], [0, -80]);
  const parallax5 = useTransform(scrollY, [0, 1000], [0, 100]);

  useEffect(() => {
    // Check theme
    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  const blobs = [
    {
      id: 'orange',
      size: 450,
      top: '-20%',
      left: '-10%',
      duration: 25,
      color: isDarkTheme
        ? 'radial-gradient(circle, rgba(249, 115, 22, 0.6), rgba(249, 115, 22, 0))'
        : 'radial-gradient(circle, rgba(249, 115, 22, 0.3), rgba(249, 115, 22, 0))',
      parallaxY: parallax1,
    },
    {
      id: 'cyan',
      size: 500,
      top: 'auto',
      bottom: '-15%',
      right: '-8%',
      left: 'auto',
      duration: 28,
      color: isDarkTheme
        ? 'radial-gradient(circle, rgba(6, 182, 212, 0.6), rgba(6, 182, 212, 0))'
        : 'radial-gradient(circle, rgba(6, 182, 212, 0.3), rgba(6, 182, 212, 0))',
      parallaxY: parallax2,
    },
    {
      id: 'blue',
      size: 400,
      top: '5%',
      right: '-5%',
      left: 'auto',
      duration: 26,
      color: isDarkTheme
        ? 'radial-gradient(circle, rgba(59, 130, 246, 0.5), rgba(59, 130, 246, 0))'
        : 'radial-gradient(circle, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0))',
      parallaxY: parallax3,
    },
    {
      id: 'yellow',
      size: 380,
      top: '40%',
      left: '50%',
      transform: 'translateX(-50%)',
      duration: 30,
      color: isDarkTheme
        ? 'radial-gradient(circle, rgba(234, 179, 8, 0.4), rgba(234, 179, 8, 0))'
        : 'radial-gradient(circle, rgba(234, 179, 8, 0.15), rgba(234, 179, 8, 0))',
      parallaxY: parallax4,
    },
    {
      id: 'purple',
      size: 420,
      bottom: '10%',
      left: '-8%',
      duration: 27,
      color: isDarkTheme
        ? 'radial-gradient(circle, rgba(139, 92, 246, 0.5), rgba(139, 92, 246, 0))'
        : 'radial-gradient(circle, rgba(139, 92, 246, 0.25), rgba(139, 92, 246, 0))',
      parallaxY: parallax5,
    },
  ];

  return (
    <div className="fixed inset-0 -z-40 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: isDarkTheme
            ? 'linear-gradient(135deg, #0a0e27 0%, #1a0a4b 25%, #0d1b45 50%, #051018 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 25%, #f8f9ff 50%, #fafbff 100%)',
        }}
      />

      {/* Animated blobs */}
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className="absolute rounded-full blur-3xl"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            bottom: blob.bottom,
            left: blob.left,
            right: blob.right,
            background: blob.color,
            filter: 'blur(80px)',
            y: blob.parallaxY,
          }}
          animate={{
            x: [0, 60, -40, 30, 0],
            y: [0, -70, 50, -40, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

'use client';

import * as Toggle from '@radix-ui/react-toggle';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div 
      className="inline-flex items-center justify-center rounded-full w-10 h-10 bg-gray-200 dark:bg-gray-800 transition-opacity"
      style={{ opacity: 0 }}
      aria-label="Loading theme toggle"
    />
  );

  const isDark = resolvedTheme === 'dark';

  return (
    <Toggle.Root
      pressed={isDark}
      onPressedChange={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="inline-flex items-center justify-center rounded-full w-10 h-10 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 active:scale-95"
      style={{ opacity: 1 }}
    >
      <div className="relative w-5 h-5">
        {isDark ? (
          <Moon className="h-5 w-5 text-yellow-400 transition-all duration-200 animate-in fade-in" />
        ) : (
          <Sun className="h-5 w-5 text-orange-500 transition-all duration-200 animate-in fade-in" />
        )}
      </div>
    </Toggle.Root>
  );
}

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

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <Toggle.Root
      pressed={isDark}
      onPressedChange={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="inline-flex items-center justify-center rounded-full w-10 h-10 bg-accent/20 hover:bg-accent/30 transition-colors"
    >
      {isDark ? (
        <Moon className="h-5 w-5 text-foreground" />
      ) : (
        <Sun className="h-5 w-5 text-foreground" />
      )}
    </Toggle.Root>
  );
}

'use client';

import { ThemeToggle } from './ThemeToggle';
import Image from 'next/image';
import Link from 'next/link';

export function MenuBar() {
  return (
<header
  className="fixed top-0 left-0 w-full flex justify-between items-center p-4 shadow z-50 bg-background text-foreground"
>
  <Link href="/" aria-label="Home" className="flex items-center space-x-2">
    <Image src="/logo.png" alt="Logo" width={48} height={48} />
    <span
      className="text-4xl font-bold tracking-tight"
      style={{
        WebkitTextStroke: '1.5px var(--foreground)',
        color: 'color-mix(in srgb, var(--background) 92%, black 8%)',
      }}
    >
      Byte Engineering
    </span>
  </Link>
  <ThemeToggle />
</header>

  );
}

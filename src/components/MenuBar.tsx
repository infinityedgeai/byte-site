'use client';

import { ThemeToggle } from './ThemeToggle';
import Image from 'next/image';
import Link from 'next/link';

export function MenuBar() {
  return (
<header
  className="fixed top-0 left-0 w-full flex justify-between items-center p-4 shadow z-50"
  style={{
    backgroundColor: 'var(--background)',
    color: 'var(--foreground)',
  }}
>
  <Link href="/" aria-label="Home" className="flex items-center space-x-2">
    <Image src="/logo.png" alt="Logo" width={48} height={48} />
    <Image src="/byte.png" alt="Byte Engineering" width={180} height={30} />
  </Link>
  <ThemeToggle />
</header>

  );
}
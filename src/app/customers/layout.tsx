import { ReactNode } from 'react';
import Link from 'next/link';

export default function CustomersLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/customers" className="text-2xl font-bold font-headline">RentEase</Link>
          <nav className="flex gap-4">
            <Link href="/customers/rentals" className="hover:underline">My Rentals</Link>
            <Link href="/customers/profile" className="hover:underline">Profile</Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <footer className="bg-muted text-muted-foreground p-4 text-center text-sm">
        <p>&copy; 2024 RentEase. All rights reserved.</p>
      </footer>
    </div>
  );
}

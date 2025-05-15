// components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Efficient Frontier
        </h1>
        <nav className="space-x-6 text-sm font-medium">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/efficient-frontier" className="text-gray-700 hover:text-blue-600 transition">
            Portfolio
          </Link>
          <Link href="/stock-prices" className="text-gray-700 hover:text-blue-600 transition">
            Stocks
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

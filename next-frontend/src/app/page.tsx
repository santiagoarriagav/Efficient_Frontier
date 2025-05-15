import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Welcome to Efficient Frontier</h1>
      <div className="space-x-4">
        <Link href="/portfolio" className="text-blue-600 underline">
          Go to Portfolio
        </Link>
        <Link href="/stocks" className="text-blue-600 underline">
          Go to Stocks
        </Link>
      </div>
    </main>
  );
}
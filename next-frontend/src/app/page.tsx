import Link from 'next/link';


export const metadata = {
title: "FinTools - Home",
description: "Home for various financial tools",
};

export default function HomePage() {

  return (
    <>
      <main className="bg-[#2c1f1a] text-[#ede0d4] min-h-screen px-6 py-8">
        <h1 className="text-2xl font-bold mb-8">Welcome to Efficient Frontier</h1>

        <nav className="flex flex-col gap-4 max-w-sm">
          <NavLink href="/efficient-frontier" label="Efficient Frontier" />
          <NavLink href="/stock-prices" label="Stock Prices Graph" />
        </nav>
      </main>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block text-[#bfa89e] bg-[#a0522d] hover:bg-[#d2691e] hover:text-white px-4 py-3 rounded-lg shadow text-lg font-semibold transition duration-200"
    >
      {label}
    </Link>
  );
}

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#3b2f2a] text-[#ede0d4] border-b border-[#4a3a32] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / App Name */}
        <h1>Efficient Frontier</h1>

        <nav className="space-x-6 text-sm font-medium">
          <NavLink href="/" label="Home" />
          <NavLink href="/efficient-frontier" label="Efficient frontier" />
          <NavLink href="/stock-prices" label="Stock prices graph" />
        </nav>
      </div>
    </header>
  );
}

// Reusable nav link with elegant hover
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-[#bfa89e] hover:text-[#ffa667] transition duration-200"
    >
      {label}
    </Link>
  );
}

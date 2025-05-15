import Link from 'next/link';
import Head from 'next/head';


export default function HomePage() {
  return (
    <>
    <Head>
      <title>HomePage</title>
      <meta name="description" content="This is my awesome Next.js app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    
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
    </>
  );
}
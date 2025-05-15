
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
    
    <main >
      <div className="min-h-screen bg-yellow-400 flex flex-col items-baseline justify-center text-center p-8">
        <h1 className="text-4xl font-bold text-black mb-6">Welcome to Efficient Frontier</h1>
        <div className="space-x-4">
          <a href="/efficient-frontier" className="bg-white text-black px-4 py-2 rounded shadow">
            Go to Portfolio
          </a>
          <a href="/stock-prices" className="bg-white text-black px-4 py-2 rounded shadow">
            Go to Stocks
          </a>
        </div>
      </div>
    </main>
    </>
  );
}
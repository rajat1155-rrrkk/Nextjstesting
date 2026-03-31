"use client";

import { useState } from "react";

const taskText =
  'Create a product object with name, price, and description and render it using map';

const checks = [
  { key: "name", label: '"name"' },
  { key: "price", label: '"price"' },
  { key: "description", label: '"description"' },
  { key: "map(", label: '"map("' },
];

const exampleSnippet = `const products = [
  {
    name: "Phone",
    price: 699,
    description: "Flagship device",
  },
];

products.map((product) => (
  <div key={product.name}>
    <h2>{product.name}</h2>
    <p>{product.price}</p>
    <p>{product.description}</p>
  </div>
));`;

export default function HomePage() {
  const [code, setCode] = useState("");
  const [missingParts, setMissingParts] = useState<string[]>([]);
  const [hasRun, setHasRun] = useState(false);

  const allPassed = hasRun && missingParts.length === 0;

  const runTest = () => {
    const normalizedInput = code.toLowerCase();

    const missing = checks
      .filter((item) => !normalizedInput.includes(item.key))
      .map((item) => item.label);

    setMissingParts(missing);
    setHasRun(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <section className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
        <div className="space-y-3">
          <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Frontend Task Checker
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Next.js Product Object Test
          </h1>
          <p className="text-sm leading-6 text-slate-600 sm:text-base">
            Task: {taskText}
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">Example input</p>
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs leading-6 text-slate-100 sm:text-sm">
            <code>{exampleSnippet}</code>
          </pre>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Paste your code
            </span>
            <textarea
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Write or paste your solution here..."
              className="min-h-[220px] w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <button
            type="button"
            onClick={runTest}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            Run Test
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
          <h2 className="text-sm font-semibold text-slate-900">Feedback</h2>

          {!hasRun ? (
            <p className="mt-2 text-sm text-slate-600">
              Run the test to see whether your code includes all required parts.
            </p>
          ) : allPassed ? (
            <p className="mt-2 text-sm font-semibold text-emerald-600">
              {"\u2705"} All tests passed
            </p>
          ) : (
            <div className="mt-2 space-y-2">
              <p className="text-sm font-semibold text-rose-600">
                {"\u274C"} Missing required parts:
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                {missingParts.map((part) => (
                  <li key={part}>{part}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

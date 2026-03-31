"use client";

import Editor from "@monaco-editor/react";
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
    name: "Sunset Speaker",
    price: 149,
    description: "Warm audio for late-night build sessions",
  },
];

products.map((product) => (
  <article key={product.name}>
    <h2>{product.name}</h2>
    <p>\${product.price}</p>
    <p>{product.description}</p>
  </article>
));`;

const starterSnippet = `const products = [
  {
    name: "Sunset Speaker",
    price: 149,
    description: "Warm audio for late-night build sessions",
  },
];

export default function ProductList() {
  return (
    <section>
      {products.map((product) => (
        <article key={product.name}>
          <h2>{product.name}</h2>
          <p>\${product.price}</p>
          <p>{product.description}</p>
        </article>
      ))}
    </section>
  );
}`;

export default function HomePage() {
  const [code, setCode] = useState(starterSnippet);
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
    <main className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
      <section className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_30px_100px_rgba(80,34,20,0.18)] backdrop-blur-xl sm:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-orange-200/50 via-transparent to-amber-100/60" />

        <div className="relative space-y-3">
          <span className="inline-flex rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-orange-700 shadow-sm">
            Vibe Coding Mode
          </span>
          <h1 className="max-w-2xl text-3xl font-black tracking-[-0.04em] text-slate-900 sm:text-5xl">
            Ship the vibe, then make sure the code still passes.
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-700 sm:text-base">
            Prompt: {taskText}
          </p>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Drop in your solution, hit the button, and this tiny client-side
            checker will look for the key ingredients: <code>name</code>,{" "}
            <code>price</code>, <code>description</code>, and <code>map(</code>.
          </p>
        </div>

        <div className="relative mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-slate-200/70 bg-white/85 p-4 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Example input
            </p>
            <pre className="mt-3 overflow-x-auto rounded-[1.25rem] bg-[#201728] p-4 text-xs leading-6 text-orange-50 sm:text-sm">
              <code>{exampleSnippet}</code>
            </pre>
          </div>

          <div className="rounded-[1.5rem] border border-orange-200/70 bg-gradient-to-br from-orange-50 to-amber-50 p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
              What gets checked
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {checks.map((item) => (
                <li
                  key={item.key}
                  className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3"
                >
                  Presence of <span className="font-semibold">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 rounded-[1.5rem] border border-slate-200/70 bg-white/85 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Monaco editor
              </span>
              <button
                type="button"
                onClick={() => {
                  setCode(starterSnippet);
                  setHasRun(false);
                  setMissingParts([]);
                }}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 transition hover:border-orange-300 hover:text-orange-700"
              >
                Reset Sample
              </button>
            </div>

            <div className="overflow-hidden rounded-[1.25rem] border border-slate-300 bg-[#201728] shadow-inner">
              <Editor
                height="360px"
                defaultLanguage="typescript"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value ?? "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 16, bottom: 16 },
                  tabSize: 2,
                }}
                loading={
                  <div className="flex h-[360px] items-center justify-center text-sm text-orange-100">
                    Loading editor...
                  </div>
                }
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={runTest}
                className="inline-flex items-center justify-center rounded-[1.25rem] bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                Run Vibe Test
              </button>
              <div className="inline-flex items-center rounded-[1.25rem] bg-orange-50 px-4 py-3 text-sm text-orange-800">
                Client-side only. No API, no backend, no database.
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white/70 p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Feedback
            </h2>

            {!hasRun ? (
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Run the test to see whether your code keeps the vibe and includes
                every required piece.
              </p>
            ) : allPassed ? (
              <div className="mt-4 rounded-[1.25rem] border border-emerald-200 bg-emerald-50 px-4 py-4">
                <p className="text-sm font-semibold text-emerald-700">
                  {"\u2705"} All tests passed
                </p>
                <p className="mt-2 text-sm leading-6 text-emerald-800/80">
                  Clean structure, required fields present, and <code>map(</code>{" "}
                  detected. The vibe is intact.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="rounded-[1.25rem] border border-rose-200 bg-rose-50 px-4 py-4">
                  <p className="text-sm font-semibold text-rose-700">
                    {"\u274C"} Missing required parts
                  </p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {missingParts.map((part) => (
                      <li key={part}>{part}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  Add the missing pieces and run the checker again.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

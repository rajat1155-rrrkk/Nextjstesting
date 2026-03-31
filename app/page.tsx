"use client";

import Editor from "@monaco-editor/react";
import { useMemo, useState } from "react";

const taskText =
  "Create a product object with name, price, and description and render it using map";

const checks = [
  { key: "name", label: "name" },
  { key: "price", label: "price" },
  { key: "description", label: "description" },
  { key: "map(", label: "map(" },
];

const starterSnippet = `const products = [
  {
    name: "Studio Headphones",
    price: 249,
    description: "Closed-back design for focused listening",
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

  const resultSummary = useMemo(() => {
    if (!hasRun) {
      return "Run the test to validate the required fields and map usage.";
    }

    if (allPassed) {
      return "All required fields were found and map usage was detected.";
    }

    return "Some required pieces are still missing from the solution.";
  }, [allPassed, hasRun]);

  const runTest = () => {
    const normalizedInput = code.toLowerCase();

    const missing = checks
      .filter((item) => !normalizedInput.includes(item.key))
      .map((item) => item.label);

    setMissingParts(missing);
    setHasRun(true);
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex w-fit items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Frontend Coding Test
              </span>
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                  Product object checker with Monaco editor
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  A polished single-page coding interface for validating whether a
                  solution includes the required fields and renders with
                  <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-slate-100">
                    map(
                  </code>
                  using client-side checks only.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard label="Framework" value="Next.js 14" />
              <StatCard label="Editor" value="Monaco" />
              <StatCard label="Rendering" value="Static" />
              <StatCard label="Backend" value="None" />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.25fr_0.95fr]">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Task
              </p>
              <p className="mt-3 text-lg leading-8 text-slate-100">{taskText}</p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Test Rules
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {checks.map((item) => {
                  const passed = hasRun && !missingParts.includes(item.label);

                  return (
                    <div
                      key={item.key}
                      className={`rounded-2xl border px-4 py-3 text-sm transition ${
                        passed
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                          : "border-white/10 bg-white/[0.03] text-slate-300"
                      }`}
                    >
                      <span className="block text-xs uppercase tracking-[0.16em] text-slate-500">
                        Required
                      </span>
                      <span className="mt-1 block font-medium">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.75fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-100">Solution Editor</p>
                <p className="mt-1 text-sm text-slate-400">
                  Write or paste the candidate solution below.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCode(starterSnippet);
                    setHasRun(false);
                    setMissingParts([]);
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.07]"
                >
                  Reset Sample
                </button>
                <button
                  type="button"
                  onClick={runTest}
                  className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Run Test
                </button>
              </div>
            </div>

            <Editor
              height="560px"
              defaultLanguage="typescript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value ?? "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineHeight: 22,
                wordWrap: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 18, bottom: 18 },
                tabSize: 2,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                roundedSelection: true,
              }}
              loading={
                <div className="flex h-[560px] items-center justify-center text-sm text-slate-300">
                  Loading editor...
                </div>
              }
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Result</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {resultSummary}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                    !hasRun
                      ? "bg-white/10 text-slate-300"
                      : allPassed
                        ? "bg-emerald-400/15 text-emerald-200"
                        : "bg-rose-400/15 text-rose-200"
                  }`}
                >
                  {!hasRun ? "Pending" : allPassed ? "Passed" : "Needs Work"}
                </span>
              </div>

              {!hasRun ? (
                <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-slate-950/40 px-4 py-4 text-sm leading-6 text-slate-400">
                  The checker scans the editor content for the required keywords.
                </div>
              ) : allPassed ? (
                <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-4">
                  <p className="text-sm font-semibold text-emerald-200">
                    All tests passed
                  </p>
                  <p className="mt-2 text-sm leading-6 text-emerald-100/85">
                    The solution includes <code>name</code>, <code>price</code>,
                    <code> description</code>, and <code>map(</code>.
                  </p>
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-4">
                  <p className="text-sm font-semibold text-rose-200">
                    Missing required parts
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-rose-100/90">
                    {missingParts.map((part) => (
                      <li key={part} className="rounded-xl bg-black/10 px-3 py-2">
                        {part}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <p className="text-sm font-semibold text-white">Reference Example</p>
              <p className="mt-1 text-sm text-slate-400">
                A sample solution that satisfies the checker.
              </p>
              <pre className="mt-4 overflow-x-auto rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 text-xs leading-6 text-slate-200 sm:text-sm">
                <code>{starterSnippet}</code>
              </pre>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
              <p className="text-sm font-semibold text-white">Deployment Ready</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                <li>Client-side only with no API routes or backend services.</li>
                <li>Works with `npm install` and `npm run build` for Vercel.</li>
                <li>Responsive layout with Monaco editor and premium styling.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/65 px-4 py-3">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      <span className="mt-1 block text-sm font-medium text-slate-100">{value}</span>
    </div>
  );
}

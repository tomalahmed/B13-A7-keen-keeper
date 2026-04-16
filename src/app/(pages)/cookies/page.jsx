import Link from "next/link";

export default function CookiesPage() {
  return (
    <main className="flex min-h-0 flex-1 justify-center bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <section className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Cookies
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Effective date: {new Date().toLocaleDateString("en-US")}
        </p>

        <article className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-gray-800">Summary</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            This demo uses your browser&apos;s localStorage to save Timeline
            entries. This is not shared with a server in this assignment.
          </p>

          <h3 className="mt-5 text-base font-semibold text-gray-800">
            Clearing data
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            You can reset the timeline from the Timeline page using the
            &quot;Reset Timeline&quot; button.
          </p>

          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center rounded-lg bg-[#1B4332] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#153529]"
            >
              Back to Home
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}


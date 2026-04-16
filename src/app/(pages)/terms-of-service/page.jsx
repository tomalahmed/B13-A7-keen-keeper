import Link from "next/link";

export const metadata = {
  title: "Terms of Service | KeenKeeper",
  description:
    "Read the demo terms of service for KeenKeeper, including how timeline entries work in this assignment.",
};

export default function TermsOfServicePage() {
  return (
    <main className="flex min-h-0 flex-1 justify-center bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <section className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Effective date: {new Date().toLocaleDateString("en-US")}
        </p>

        <article className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-gray-800">Summary</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            This is a demo assignment for building a friend &apos;keeper&apos; app.
            The app includes a Timeline feature that stores entries in your
            browser (localStorage).
          </p>

          <h3 className="mt-5 text-base font-semibold text-gray-800">
            Use of the service
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            You may use the site to add and view timeline entries. This is a demo site only.
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


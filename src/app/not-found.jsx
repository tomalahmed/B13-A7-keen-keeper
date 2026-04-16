import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TimelineProvider } from "@/context/TimelineContext";
import { ToastProvider } from "@/context/ToastContext";

export default function NotFoundPage() {
  return (
    <ToastProvider>
      <TimelineProvider>
        <div className="flex min-h-full flex-1 flex-col">
          <Navbar />
          <main className="flex flex-1 items-center justify-center bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">
            <section className="w-full max-w-xl text-center">
              <p className="text-sm font-semibold tracking-wide text-emerald-700">
                404
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Page not found
              </h1>
              <p className="mt-3 text-sm text-gray-600">
                The page you're looking for doesn't exist or may have been
                moved.
              </p>

              <div className="mt-6 flex justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-lg bg-[#1B4332] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#153529]"
                >
                  Back to Home
                </Link>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </TimelineProvider>
    </ToastProvider>
  );
}


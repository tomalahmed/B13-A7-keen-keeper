"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faPhone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

import { useTimeline } from "@/context/TimelineContext";

const typeIcon = {
  call: faPhone,
  text: faMessage,
  video: faVideo,
};

function formatDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function TimelinePage() {
  const { entries, hydrated } = useTimeline();

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <main className="flex min-h-0 flex-1 justify-center bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <section className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Timeline
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Recent calls, texts, and video check-ins with your friends.
        </p>

        {!hydrated ? (
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <span
              className="loading loading-spinner loading-md text-[#1B4332]"
              aria-label="Loading timeline entries"
            />
            <p className="mt-3 text-sm text-gray-600">Loading timeline…</p>
          </div>
        ) : sortedEntries.length === 0 ? (
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-base font-medium text-gray-800">
              No timeline entries yet.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Open a friend profile and use Quick Check-In to create your first
              entry.
            </p>
          </div>
        ) : (
          <ul className="mt-8 space-y-3">
            {sortedEntries.map((entry) => (
              <li
                key={entry.id}
                className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <FontAwesomeIcon
                    icon={typeIcon[entry.type] ?? faMessage}
                    className="h-4 w-4"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-gray-900">
                    {entry.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {formatDate(entry.date)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowUpShortWide,
  faFilter,
  faMessage,
  faPhone,
  faSearch,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";

import { useTimeline } from "@/context/TimelineContext";
import { useToast } from "@/context/ToastContext";

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
  const { entries, hydrated, resetEntries } = useTimeline();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const { pushToast } = useToast();

  function handleResetTimeline() {
    if (!hydrated) return;
    setSearchQuery("");
    setTypeFilter("all");
    setSortOrder("newest");
    resetEntries();
    pushToast({ type: "success", message: "Timeline reset successfully" });
  }

  const visibleEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = entries.filter((entry) => {
      const matchesType = typeFilter === "all" || entry.type === typeFilter;
      if (!matchesType) return false;

      if (!query) return true;
      const searchable = `${entry.title} ${entry.friendName}`.toLowerCase();
      return searchable.includes(query);
    });

    filtered.sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();
      return sortOrder === "oldest" ? aTime - bTime : bTime - aTime;
    });

    return filtered;
  }, [entries, searchQuery, sortOrder, typeFilter]);

  return (
    <main className="flex min-h-0 flex-1 justify-center bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <section className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Timeline
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Recent calls, texts, and video check-ins with your friends.
        </p>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleResetTimeline}
            disabled={!hydrated}
            className={`rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 ${
              !hydrated ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Reset Timeline
          </button>
        </div>
        <div className="mt-6 grid gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:grid-cols-3">
          <label className="form-control w-full">
            <span className="mb-1 inline-flex items-center gap-2 text-sm font-medium text-gray-700">
              <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
              Search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by title or friend"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none ring-emerald-600 transition focus:ring-2"
            />
          </label>

          <label className="form-control w-full">
            <span className="mb-1 inline-flex items-center gap-2 text-sm font-medium text-gray-700">
              <FontAwesomeIcon icon={faFilter} className="h-4 w-4" />
              Filter
            </span>
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none ring-emerald-600 transition focus:ring-2"
            >
              <option value="all">All Types</option>
              <option value="call">Calls</option>
              <option value="text">Texts</option>
              <option value="video">Videos</option>
            </select>
          </label>

          <label className="form-control w-full">
            <span className="mb-1 inline-flex items-center gap-2 text-sm font-medium text-gray-700">
              <FontAwesomeIcon
                icon={sortOrder === "newest" ? faArrowDownWideShort : faArrowUpShortWide}
                className="h-4 w-4"
              />
              Sort
            </span>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none ring-emerald-600 transition focus:ring-2"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </label>
        </div>

        {!hydrated ? (
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <span
              className="loading loading-spinner loading-md text-[#1B4332]"
              aria-label="Loading timeline entries"
            />
            <p className="mt-3 text-sm text-gray-600">Loading timeline…</p>
          </div>
        ) : visibleEntries.length === 0 ? (
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            {entries.length === 0 ? (
              <>
                <p className="text-base font-medium text-gray-800">
                  No timeline entries yet.
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Open a friend profile and use Quick Check-In to create your
                  first entry.
                </p>
              </>
            ) : (
              <>
                <p className="text-base font-medium text-gray-800">
                  No entries match your filters.
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Try another search term, type filter, or sort order.
                </p>
              </>
            )}
          </div>
        ) : (
          <ul className="mt-8 space-y-3">
            {visibleEntries.map((entry) => (
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

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";

import { useToast } from "@/context/ToastContext";
import FriendCard from "@/components/FriendCard";

function summarize(friends) {
  if (!friends?.length) {
    return {
      total: 0,
      onTrack: 0,
      needAttention: 0,
      interactionsThisMonth: 0,
    };
  }

  const onTrack = friends.filter((f) => f.status === "On-Track").length;
  const needAttention = friends.filter(
    (f) => f.status === "Overdue" || f.status === "Almost Due",
  ).length;

  return {
    total: friends.length,
    onTrack,
    needAttention,
    interactionsThisMonth: 0,
  };
}

export default function HomeDashboard() {
  const [friends, setFriends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const { pushToast } = useToast();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/friends");
        if (!res.ok) throw new Error(`Could not load friends (${res.status})`);
        const data = await res.json();
        if (!cancelled) setFriends(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Something went wrong");
          setFriends(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => summarize(friends), [friends]);
  const filteredFriends = useMemo(() => {
    if (!Array.isArray(friends)) return [];
    if (statusFilter === "all") return friends;
    return friends.filter((f) => f.status === statusFilter);
  }, [friends, statusFilter]);

  function handleStatusOptionClick(nextValue, label) {
    setStatusFilter(nextValue);
    pushToast({
      type: "success",
      message: `Demo: status option "${label}" clicked`,
    });
  }

  function handleResetStatus() {
    setStatusFilter("all");
    pushToast({ type: "success", message: "Status filter reset successfully" });
  }

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-gray-100 py-24">
        <span
          className="loading loading-spinner loading-lg text-[#1B4332]"
          aria-label="Loading friends"
        />
        <p className="text-sm text-gray-600">Loading friends...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-gray-100 px-4 py-24 text-center">
        <p className="font-medium text-red-700">{error}</p>
        <p className="text-sm text-gray-600">Check your connection and try again.</p>
      </div>
    );
  }

  const statCards = [
    { value: stats.total, label: "Total Friends" },
    { value: stats.onTrack, label: "On Track" },
    { value: stats.needAttention, label: "Need Attention" },
    { value: stats.interactionsThisMonth, label: "Interactions This Month" },
  ];

  return (
    <div className="min-h-0 flex-1 bg-gray-100">
      <section className="border-b border-gray-200/80 bg-gray-50 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Friends to keep close in your life
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            KeenKeeper helps you stay in touch with the people who matter - see
            who needs a nudge and celebrate the relationships you are tending well.
          </p>
          <button
            type="button"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#1B4332] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#153529] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] focus-visible:ring-offset-2"
          >
            <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
            Add a Friend
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statCards.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-md"
            >
              <p className="text-3xl font-bold tabular-nums text-gray-900 sm:text-4xl">{value}</p>
              <p className="mt-2 text-sm font-medium text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">Your Friends</h2>

        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { value: "all", label: "All" },
              { value: "On-Track", label: "On-Track" },
              { value: "Almost Due", label: "Almost Due" },
              { value: "Overdue", label: "Overdue" },
            ].map(({ value, label }) => {
              const active = statusFilter === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleStatusOptionClick(value, label)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleResetStatus}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 sm:w-auto"
          >
            Reset Status
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredFriends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </section>
    </div>
  );
}

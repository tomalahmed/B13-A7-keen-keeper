"use client";

import { useMemo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useTimeline } from "@/context/TimelineContext";

const TYPE_CONFIG = {
  text: { label: "Text", color: "#7C3AED" },
  call: { label: "Call", color: "#1F5A4D" },
  video: { label: "Video", color: "#2EAE6B" },
};

export default function StatsPage() {
  const { entries, hydrated } = useTimeline();

  const chartData = useMemo(() => {
    const counts = { text: 0, call: 0, video: 0 };

    for (const entry of entries) {
      const type = String(entry.type).toLowerCase();
      if (type in counts) counts[type] += 1;
    }

    return Object.entries(counts).map(([type, count]) => ({
      type,
      name: TYPE_CONFIG[type].label,
      value: count,
      color: TYPE_CONFIG[type].color,
    }));
  }, [entries]);

  const totalInteractions = chartData.reduce((sum, item) => sum + item.value, 0);
  const hasData = totalInteractions > 0;

  return (
    <main className="flex min-h-0 flex-1 justify-center bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <section className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Friendship Analytics
        </h1>

        <article className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-gray-800">By Interaction Type</h2>

          {!hydrated ? (
            <div className="flex h-80 flex-col items-center justify-center gap-3">
              <span
                className="loading loading-spinner loading-md text-[#1B4332]"
                aria-label="Loading analytics"
              />
              <p className="text-sm text-gray-600">Loading analytics…</p>
            </div>
          ) : !hasData ? (
            <div className="flex h-80 flex-col items-center justify-center text-center">
              <p className="text-base font-medium text-gray-800">
                No interactions yet.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Add check-ins from friend profiles to see analytics.
              </p>
            </div>
          ) : (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={64}
                    outerRadius={96}
                    paddingAngle={4}
                    stroke="#ffffff"
                    strokeWidth={3}
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.type} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, name]} />
                  <Legend verticalAlign="bottom" iconType="circle" iconSize={8} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </article>
      </section>
    </main>
  );
}

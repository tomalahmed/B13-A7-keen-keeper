"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "keenkeeper.timeline.entries";

const TimelineContext = createContext(null);

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setEntries(parsed);
        }
      }
    } catch {
      // Keep app usable if storage is blocked/corrupted.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Ignore storage write failures for private mode/quota errors.
    }
  }, [entries, hydrated]);

  const value = useMemo(
    () => ({
      entries,
      hydrated,
      addEntry({ friendId, friendName, type }) {
        const normalizedType = String(type).toLowerCase();
        const label =
          normalizedType === "call"
            ? "Call"
            : normalizedType === "text"
              ? "Text"
              : "Video";

        const newEntry = {
          id:
            typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          friendId: String(friendId),
          friendName,
          type: normalizedType,
          title: `${label} with ${friendName}`,
          date: new Date().toISOString(),
        };

        setEntries((prev) => [newEntry, ...prev]);
        return newEntry;
      },
      resetEntries() {
        // Clears timeline state; the localStorage write happens via the effect below.
        setEntries([]);
      },
    }),
    [entries, hydrated],
  );

  return (
    <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>
  );
}

export function useTimeline() {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimeline must be used within TimelineProvider");
  }
  return context;
}

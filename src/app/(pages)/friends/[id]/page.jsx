import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faClock,
  faEnvelope,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { notFound } from "next/navigation";

import CheckInActions from "@/components/CheckInActions";
import friends from "@/Data/friends.json";

const statusStyles = {
  Overdue: "bg-red-100 text-red-700",
  "Almost Due": "bg-amber-100 text-amber-700",
  "On-Track": "bg-emerald-100 text-emerald-800",
};

function formatDueDate(dateValue) {
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return dateValue;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function FriendDetailPage({ params }) {
  const resolvedParams = await params;
  const friendId = String(resolvedParams?.id ?? "");
  const friend = friends.find((item) => String(item.id) === friendId);
  if (!friend) notFound();

  const statusClass = statusStyles[friend.status] ?? "bg-gray-100 text-gray-700";

  return (
    <main className="flex min-h-0 flex-1 items-start justify-center bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid w-full max-w-7xl gap-5 lg:grid-cols-[340px_1fr]">
        <div className="space-y-4">
          <article className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-2 ring-gray-100">
              <Image
                src={friend.picture}
                alt={friend.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <h1 className="mt-4 text-2xl font-semibold text-gray-900">{friend.name}</h1>
            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
            >
              {friend.status}
            </span>

            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {friend.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-emerald-900"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-5 text-sm italic text-gray-600">"{friend.bio}"</p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-gray-600">
              <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
              {friend.email}
            </p>
          </article>

          <div className="space-y-2">
            <ActionButton icon={faClock} label="Snooze 2 Weeks" />
            <ActionButton icon={faArchive} label="Archive" />
            <ActionButton icon={faTrashCan} label="Delete" danger />
          </div>
        </div>

        <div className="space-y-4">
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard value={friend.days_since_contact} label="Days Since Contact" />
            <StatCard value={friend.goal} label="Goal (Days)" />
            <StatCard value={formatDueDate(friend.next_due_date)} label="Next Due" />
          </section>

          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Relationship Goal</h2>
              <button
                type="button"
                className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Edit
              </button>
            </div>
            <p className="mt-4 text-base text-gray-700">
              Connect every <span className="font-semibold">{friend.goal} days</span>
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Quick Check-In</h2>
            <CheckInActions friendId={friend.id} friendName={friend.name} />
          </article>
        </div>
      </section>
    </main>
  );
}

function ActionButton({ icon, label, danger = false }) {
  return (
    <button
      type="button"
      className={`flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
        danger
          ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      <FontAwesomeIcon icon={icon} className="h-4 w-4" />
      {label}
    </button>
  );
}

function StatCard({ value, label }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="mt-2 text-sm font-medium text-gray-500">{label}</p>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";

const statusClass = {
  Overdue: "bg-red-600 text-white",
  "Almost Due": "bg-amber-500 text-white",
  "On-Track": "bg-[#1B4332] text-white",
};

export default function FriendCard({ friend }) {
  const badge = statusClass[friend.status] ?? "bg-gray-600 text-white";
  const tags = Array.isArray(friend.tags) ? friend.tags.slice(0, 2) : [];

  return (
    <Link
      href={`/friends/${friend.id}`}
      aria-label={`Open details for ${friend.name}`}
      className="flex min-h-[270px] flex-col items-center rounded-xl border border-gray-100 bg-white p-5 text-center shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative mb-4 h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100">
        <Image
          src={friend.picture}
          alt={friend.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <h3 className="text-base font-semibold text-gray-900">{friend.name}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {friend.days_since_contact}d ago
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-emerald-900"
          >
            {tag}
          </span>
        ))}
      </div>
      <span
        className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${badge}`}
      >
        {friend.status}
      </span>
    </Link>
  );
}

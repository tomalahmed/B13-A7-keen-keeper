import Image from "next/image";
import Link from "next/link";

const statusClass = {
  Overdue: "bg-red-600 text-white",
  "Almost Due": "bg-amber-500 text-white",
  "On-Track": "bg-[#1B4332] text-white",
};

export default function FriendCard({ friend }) {
  const badge = statusClass[friend.status] ?? "bg-gray-600 text-white";

  return (
    <Link
      href={`/friends/${friend.id}`}
      className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-5 text-center shadow-md transition-shadow hover:shadow-lg"
    >
      <div className="relative mb-4 h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100">
        <Image
          src={friend.picture}
          alt={friend.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
      <h3 className="text-base font-semibold text-gray-900">{friend.name}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {friend.days_since_contact}d ago
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {friend.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-emerald-900"
          >
            {tag}
          </span>
        ))}
      </div>
      <span
        className={`mt-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase ${badge}`}
      >
        {friend.status === "Almost Due" ? "Almost Due" : friend.status}
      </span>
    </Link>
  );
}

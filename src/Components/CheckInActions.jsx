"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faPhone, faVideo } from "@fortawesome/free-solid-svg-icons";

import { useTimeline } from "@/context/TimelineContext";
import { useToast } from "@/context/ToastContext";

const ACTIONS = [
  { type: "call", label: "Call", icon: faPhone },
  { type: "text", label: "Text", icon: faMessage },
  { type: "video", label: "Video", icon: faVideo },
];

export default function CheckInActions({ friendId, friendName }) {
  const { addEntry } = useTimeline();
  const { pushToast } = useToast();

  function onCheckIn(type) {
    const entry = addEntry({ friendId, friendName, type });
    pushToast({
      type: "success",
      message: `${entry.title} added to timeline`,
    });
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {ACTIONS.map((action) => (
          <button
            key={action.type}
            type="button"
            onClick={() => onCheckIn(action.type)}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={action.icon} className="h-4 w-4" />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

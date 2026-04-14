"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faClock,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: faHouse },
  { href: "/timeline", label: "Timeline", icon: faClock },
  { href: "/stats", label: "Stats", icon: faChartLine },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center py-1"
          aria-label="KeenKeeper home"
        >
          <Image
            src="/assets/logo.png"
            alt="KeenKeeper"
            width={200}
            height={48}
            priority
            className="h-7 w-auto object-contain object-left sm:h-8"
          />
        </Link>

        <nav
          className="flex items-center gap-2 md:gap-8"
          aria-label="Main navigation"
        >
          {navItems.map(({ href, label, icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "inline-flex items-center gap-2 rounded-lg bg-[#1B4332] px-4 py-2 text-sm font-bold text-white sm:text-base"
                    : "inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-gray-900 sm:px-3 sm:text-base"
                }
              >
                <FontAwesomeIcon
                  icon={icon}
                  className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                  fixedWidth
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

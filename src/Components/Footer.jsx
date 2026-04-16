import Image from "next/image";
import Link from "next/link";

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/cookies", label: "Cookies" },
];

const socialLinks = [
  { href: "https://www.instagram.com/", label: "Instagram", icon: "/assets/instagram.png" },
  { href: "https://www.facebook.com/", label: "Facebook", icon: "/assets/facebook.png" },
  { href: "https://x.com/", label: "X", icon: "/assets/twitter.png" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B4332] text-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/assets/logo-xl.png"
            alt="KeenKeeper"
            width={380}
            height={72}
            className="h-auto w-[220px] sm:w-[300px]"
          />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the relationships that matter most.
          </p>

          <p className="mt-6 text-xl font-medium">Social Links</p>
          <div className="mt-3 flex items-center gap-3">
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="rounded-full bg-white/10 p-1 transition-colors hover:bg-white/20"
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-5 text-xs text-white/60 sm:flex sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} KeenKeeper. All rights reserved.</p>
          <div className="mt-3 flex flex-wrap items-center gap-5 sm:mt-0">
            {legalLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

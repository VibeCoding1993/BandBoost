"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";

const links = [
  { href: "/lessons/", label: "Lessons" },
  { href: "/practice/", label: "Practice tests" },
  { href: "/tools/", label: "Free tools" },
  { href: "/ai-feedback/", label: "AI feedback" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label={site.name + " home"}>
          <span className="logo-mark" aria-hidden>
            B
          </span>
          <span>
            Band<b>Boost</b>
          </span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          <span className="sr-only">Menu</span>
        </button>
        <nav id="main-nav" className={"main-nav" + (open ? " open" : "")} aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname.startsWith(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

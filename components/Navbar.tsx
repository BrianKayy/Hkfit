"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Apparel", href: "/apparel" },
  { label: "Personal coaching", href: "/coaching" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <button className="menu-toggle" type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen} aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>

        <div className="desktop-links">
          {links.map((link) => (
            <Link key={link.href} href={link.href}
              className={pathname === link.href ? "nav-link active" : "nav-link"}>
              {link.label}
            </Link>
          ))}
        </div>

        <Link className="brand" href="/" aria-label="HkFitness home"><span>HK</span>FITNESS</Link>

        <Link className="cart-link" href="/cart" aria-label="View shopping cart">
          <span className="cart-icon" aria-hidden="true" />
          <span className="cart-count">0</span>
        </Link>
      </nav>

      <div id="mobile-menu" className={menuOpen ? "mobile-menu open" : "mobile-menu"}>
        <div className="mobile-menu-inner">
          {links.map((link, index) => (
            <Link key={link.href} href={link.href}
              className={pathname === link.href ? "mobile-link active" : "mobile-link"}>
              <span>0{index + 1}</span>{link.label}
            </Link>
          ))}
          <p>Train with purpose. Wear the standard.</p>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Instagram, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12 pb-32 lg:pb-12 px-4 sm:px-6 lg:px-8 border-t border-primary/20 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-4 mb-2">
              <img 
                src="/logo.jpg" 
                alt="Sheedah's Logo" 
                className="w-14 h-14 rounded-full border-2 border-primary/40 object-cover shadow-sm" 
              />
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary tracking-tighter">
                Sheedah&apos;s
              </h2>
            </Link>
            <p className="text-sm font-sans text-white/70 max-w-xs leading-relaxed">
              Luxury Hair for Every Woman. Curating the finest collections to elevate your natural beauty.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-white/50 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/2347030599735" className="text-white/50 hover:text-primary transition-colors" aria-label="WhatsApp">
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4 md:ml-auto">
            <h3 className="text-lg font-heading font-semibold text-secondary uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Catalog", "Wholesale", "About", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase() === "home" ? "" : link.toLowerCase()}`}
                    className="text-sm font-sans text-white/60 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4 md:text-right">
            <h3 className="text-lg font-heading font-semibold text-secondary uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm font-sans text-white/60">
              <li>Lagos, Nigeria</li>
              <li>Mon - Sat: 9:00 AM - 6:00 PM</li>
              <li>
                <a href="https://wa.me/2347030599735" className="hover:text-primary transition-colors">
                  +234 703 059 9735
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/20 text-center text-xs font-sans text-white/40">
          <p>© 2025 Sheedah&apos;s Hair World. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

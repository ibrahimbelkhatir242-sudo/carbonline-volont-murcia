import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-steel/60 bg-void">
      <div className="container-x py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <span className="font-display font-800 text-xl tracking-widest2 uppercase text-bone">
            CARBON<span className="text-signal">LINE</span>
          </span>
          <p className="mt-4 text-sm text-muted max-w-xs leading-relaxed">
            Carbon fiber steering wheels engineered for Audi, BMW, Mercedes-Benz and Porsche
            performance models. Precision, minus the compromise.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <SocialLink href="#" label="Instagram">
              <Instagram size={18} strokeWidth={1.6} />
            </SocialLink>
            <SocialLink href="#" label="Facebook">
              <Facebook size={18} strokeWidth={1.6} />
            </SocialLink>
            <SocialLink href="#" label="YouTube">
              <Youtube size={18} strokeWidth={1.6} />
            </SocialLink>
          </div>
        </div>

        <FooterCol
          title="Shop"
          links={[
            { href: "/shop", label: "All Wheels" },
            { href: "/shop/audi", label: "Audi" },
            { href: "/shop/bmw", label: "BMW" },
            { href: "/shop/mercedes", label: "Mercedes-Benz" },
            { href: "/shop/porsche", label: "Porsche" },
          ]}
        />
        <FooterCol
          title="Support"
          links={[
            { href: "/contact", label: "Contact" },
            { href: "/contact#faq", label: "FAQ" },
            { href: "/contact", label: "Shipping" },
            { href: "/contact", label: "Warranty" },
            { href: "/contact", label: "Returns" },
          ]}
        />
        <FooterCol
          title="Legal"
          links={[
            { href: "/legal/privacy", label: "Privacy" },
            { href: "/legal/terms", label: "Terms" },
            { href: "/legal/cookies", label: "Cookies" },
          ]}
        />
      </div>

      <div className="border-t border-steel/60">
        <div className="container-x py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted">
          <span>© {new Date().getFullYear()} Carbonline. All rights reserved.</span>
          <span className="spec-label">Made for the drive.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="spec-label mb-4">{title}</p>
      <ul className="space-y-2.5">
        {links.map((l, idx) => (
          <li key={`${l.label}-${idx}`}>
            <Link href={l.href} className="text-sm text-muted hover:text-bone transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center border border-steel-light text-muted hover:text-bone hover:border-bone transition-colors"
    >
      {children}
    </a>
  );
}

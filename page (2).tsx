import { Metadata } from "next";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Carbonline for fitment help, order questions, or custom builds.",
};

export default function ContactPage() {
  return (
    <main className="container-x py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
        <div className="lg:col-span-2">
          <p className="spec-label mb-3">REF. 08 / CONTACT</p>
          <h1 className="font-display font-800 uppercase text-4xl md:text-6xl text-bone mb-4">
            Get In Touch
          </h1>
          <p className="text-sm text-muted leading-relaxed mb-10 max-w-lg">
            Not sure which steering wheel fits your car? Send us a photo of your current wheel
            and your vehicle details, and we'll confirm fitment before you order.
          </p>
          <ContactForm />
        </div>

        <div className="space-y-8">
          <div>
            <p className="spec-label mb-4">Direct Contact</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-muted">
                <Mail size={16} strokeWidth={1.6} className="text-signal shrink-0" />
                <span>support@carbonline-example.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <Instagram size={16} strokeWidth={1.6} className="text-signal shrink-0" />
                <a href="#" className="hover:text-bone transition-colors">
                  @carbonline — Instagram
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <MessageCircle size={16} strokeWidth={1.6} className="text-signal shrink-0" />
                <a href="#" className="hover:text-bone transition-colors">
                  Chat with us on WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div className="border-t border-steel/60 pt-6">
            <p className="text-xs text-muted leading-relaxed">
              Instagram and WhatsApp links are placeholders — connect your real accounts before
              launch.
            </p>
          </div>
        </div>
      </div>

      <div id="faq" className="scroll-mt-24">
        <p className="spec-label mb-4">Frequently Asked Questions</p>
        <FAQ />
      </div>
    </main>
  );
}

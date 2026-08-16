import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" refCode="10B">
      <p>
        This is a placeholder terms of service page. Replace it with real terms covering order
        acceptance, made-to-order production timelines, pricing and currency (EUR), shipping
        responsibility, returns/warranty conditions, and limitation of liability for
        installation-related issues.
      </p>
      <p>Consult a professional to draft terms appropriate for your business and jurisdiction.</p>
    </LegalPage>
  );
}

import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" refCode="10C">
      <p>
        This is a placeholder cookie policy. This storefront doesn't currently set any tracking
        or analytics cookies beyond what's strictly necessary for cart functionality (held in
        memory, not cookies, in the current build). Update this page once you add analytics,
        marketing pixels, or persistent cart storage, and add a consent banner if required in
        your customers' jurisdictions.
      </p>
    </LegalPage>
  );
}

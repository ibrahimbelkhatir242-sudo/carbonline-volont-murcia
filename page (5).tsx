import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" refCode="10A">
      <p>
        This is a placeholder privacy policy. Replace this page with your actual policy before
        launch — covering what customer data you collect (contact and shipping details, order
        history, uploaded fitment photos), how it's stored, who it's shared with (e.g. payment
        and shipping processors), and how customers can request deletion or access.
      </p>
      <p>
        If you're in the EU/UK, this should address GDPR requirements; consult a professional
        for a policy that matches your actual data practices and jurisdiction.
      </p>
    </LegalPage>
  );
}

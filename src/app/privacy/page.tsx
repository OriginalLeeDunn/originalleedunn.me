import { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy | OriginalLeeDunn",
  description: "Privacy policy for OriginalLeeDunn personal website",
};

export default function PrivacyPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <Card className="p-6">
        <div className="prose dark:prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, such as when
            you fill out our contact form. This may include your name, email
            address, and any other information you choose to provide.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We may use the information we collect for various purposes,
            including to:
          </p>
          <ul>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Monitor and analyze usage patterns and preferences</li>
            <li>Improve our website and user experience</li>
            <li>Send you technical notices and updates</li>
          </ul>

          <h2>3. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity
            on our website and hold certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>

          <h2>4. Third-Party Services</h2>
          <p>
            We may employ third-party companies and individuals to facilitate
            our website, provide services on our behalf, or assist us in
            analyzing how our website is used.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We value your trust in providing us your personal information, thus
            we strive to use commercially acceptable means of protecting it.
            However, no method of transmission over the internet or method of
            electronic storage is 100% secure and reliable.
          </p>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;last updated&quot; date.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us through the contact form on our website.
          </p>
        </div>
      </Card>
    </div>
  );
}

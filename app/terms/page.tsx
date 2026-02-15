import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--chidi-surface)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--chidi-text-secondary)] hover:text-[var(--chidi-text-primary)] font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl border border-[var(--chidi-border-subtle)] p-8 sm:p-12 shadow-sm">
          <div className="text-center mb-10 pb-8 border-b border-[var(--chidi-border-subtle)]">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--chidi-text-primary)] mb-2">
              Terms & Conditions
            </h1>
            <p className="text-[var(--chidi-text-secondary)]">
              <strong>Effective Date:</strong> August 27, 2025
            </p>
          </div>

          <div className="prose prose-neutral max-w-none">
            <p className="text-[var(--chidi-text-secondary)] leading-relaxed mb-6">
              Welcome to Chidi. These Terms & Conditions (&quot;Terms&quot;) govern your
              use of our website, products, and services. By accessing or using
              Chidi, you agree to these Terms. If you do not agree, please do
              not use our services.
            </p>

            <Section title="1. Business Information">
              <p>
                Chidi is operated by <strong>CHIDI AI Limited</strong>, a
                company registered in Nigeria.
              </p>
              <ul>
                <li>
                  <strong>Address:</strong> 10, Damilola Ajayi Street, Gbagada,
                  Lagos, NG.
                </li>
                <li>
                  <strong>Contact:</strong>{" "}
                  <a
                    href="mailto:admin@chidi.app"
                    className="text-[var(--chidi-accent)] hover:underline"
                  >
                    admin@chidi.app
                  </a>
                </li>
              </ul>
            </Section>

            <Section title="2. Services">
              <p>
                Chidi provides AI-powered customer interaction tools, including
                chat automation, dashboards, and inventory management features
                (the &quot;Services&quot;).
              </p>
            </Section>

            <Section title="3. Eligibility">
              <ul>
                <li>
                  You must be at least <strong>18 years old</strong> to use our
                  Services.
                </li>
                <li>
                  The Services are intended for business owners and
                  professionals.
                </li>
                <li>
                  By using Chidi, you confirm that you have the authority to
                  bind yourself or your business to these Terms.
                </li>
              </ul>
            </Section>

            <Section title="4. Acceptable Use">
              <p>You agree not to:</p>
              <ul>
                <li>
                  Use Chidi for any unlawful, fraudulent, or harmful purpose.
                </li>
                <li>
                  Send spam, unsolicited messages, or misuse the Services.
                </li>
                <li>
                  Reverse-engineer, copy, or attempt to extract our source code.
                </li>
              </ul>
            </Section>

            <Section title="5. Accounts & Subscriptions">
              <ul>
                <li>
                  To use Chidi, you must create an account and provide accurate
                  information.
                </li>
                <li>
                  Chidi may offer a <strong>free trial</strong>. After the
                  trial, continued use requires a{" "}
                  <strong>paid subscription</strong>.
                </li>
                <li>
                  Fees are billed as stated at the time of subscription.
                </li>
              </ul>
            </Section>

            <Section title="6. Content & Data">
              <ul>
                <li>
                  <strong>Ownership:</strong> Users retain ownership of all
                  content and data uploaded to Chidi.
                </li>
                <li>
                  <strong>License:</strong> By using Chidi, you grant us
                  permission to process your data solely to provide Services,
                  perform analytics, and improve the product.
                </li>
                <li>
                  <strong>Disclaimer on AI Outputs:</strong> Chidi provides
                  automated responses and recommendations. However, final
                  decisions and responsibility remain with the user.
                </li>
              </ul>
            </Section>

            <Section title="7. Termination">
              <p>
                We reserve the right to suspend or terminate your account if:
              </p>
              <ul>
                <li>You breach these Terms.</li>
                <li>You misuse or abuse the Services.</li>
                <li>
                  Continued use would cause harm to other users or our systems.
                </li>
              </ul>
              <p>
                You may close your account at any time by contacting us at{" "}
                <a
                  href="mailto:admin@chidi.app"
                  className="text-[var(--chidi-accent)] hover:underline"
                >
                  admin@chidi.app
                </a>
                .
              </p>
            </Section>

            <Section title="8. Liability">
              <p>To the maximum extent permitted by law:</p>
              <ul>
                <li>
                  Chidi and CHIDI AI Limited are not liable for indirect,
                  incidental, or consequential damages, including loss of
                  profits, business opportunities, or data.
                </li>
                <li>
                  Our liability to you will never exceed the total fees you paid
                  to us in the last 12 months.
                </li>
              </ul>
            </Section>

            <Section title="9. Jurisdiction">
              <p>
                These Terms are governed by the laws of the{" "}
                <strong>Federal Republic of Nigeria</strong>. Any disputes shall
                be subject to the exclusive jurisdiction of the courts of Lagos
                State, Nigeria.
              </p>
            </Section>

            <Section title="10. Changes to Terms">
              <p>
                We may update these Terms from time to time. When we do, we will
                post the revised version on our website with a new &quot;Effective
                Date.&quot; Continued use of our Services after changes are posted
                means you accept the updated Terms.
              </p>
            </Section>

            <Section title="11. Miscellaneous">
              <ul>
                <li>
                  <strong>Entire Agreement:</strong> These Terms constitute the
                  entire agreement between you and CHIDI AI Limited regarding
                  the Services.
                </li>
                <li>
                  <strong>Severability:</strong> If any part of these Terms is
                  found invalid, the remaining provisions remain in full effect.
                </li>
                <li>
                  <strong>Waiver:</strong> Our failure to enforce any right
                  under these Terms does not mean we waive that right.
                </li>
              </ul>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-[var(--chidi-text-primary)] mb-4 pb-2 border-b border-[var(--chidi-border-subtle)]">
        {title}
      </h2>
      <div className="text-[var(--chidi-text-secondary)] leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-[var(--chidi-text-secondary)] [&_strong]:text-[var(--chidi-text-primary)]">
        {children}
      </div>
    </div>
  );
}

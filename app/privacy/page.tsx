import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-[var(--chidi-text-secondary)]">
              <strong>Effective Date:</strong> August 27, 2025
            </p>
          </div>

          <div className="prose prose-neutral max-w-none">
            <p className="text-[var(--chidi-text-secondary)] leading-relaxed mb-6">
              At CHIDI AI Limited (&quot;Chidi,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we respect
              your privacy and are committed to protecting the personal
              information you share with us. This Privacy Policy explains how we
              collect, use, and safeguard your information when you use our
              website and services, including our integrations with third-party
              platforms such as WhatsApp Business and Instagram.
            </p>

            <Section title="1. Information We Collect">
              <p>We may collect the following types of information:</p>
              <ul>
                <li>
                  <strong>Account Information:</strong> Name, email address,
                  business details, and login credentials.
                </li>
                <li>
                  <strong>Messaging Platform Data:</strong> Messages, customer
                  information, and metadata shared through connected accounts on
                  WhatsApp Business, Instagram, and other supported platforms.
                </li>
                <li>
                  <strong>Usage Data:</strong> How you interact with Chidi,
                  including log files, browser type, IP address, and device
                  information.
                </li>
                <li>
                  <strong>Customer Data:</strong> Any content, messages, or data
                  you upload or process through Chidi (e.g., customer chats,
                  inventory details).
                </li>
                <li>
                  <strong>Billing Information:</strong> Payment details for
                  subscriptions, handled securely by third-party payment
                  providers.
                </li>
              </ul>
            </Section>

            <Section title="2. How We Use Your Information">
              <p>We use your information to:</p>
              <ul>
                <li>
                  Provide and maintain our Services, including integrations with
                  messaging platforms.
                </li>
                <li>
                  Deliver customer messaging, automation, and analytics
                  features.
                </li>
                <li>Personalize and improve user experience.</li>
                <li>
                  Communicate with you about updates, support, and promotions.
                </li>
                <li>Perform analytics and improve our product.</li>
                <li>
                  Ensure compliance with legal and platform obligations (e.g.,
                  WhatsApp Business and Instagram platform policies).
                </li>
              </ul>
            </Section>

            <Section title="3. Messaging Platform Integrations">
              <p>
                At launch, Chidi integrates with Telegram. Additional platforms
                (WhatsApp Business, Instagram) will be added as their
                integrations are completed and will be governed by this same
                policy.
              </p>
              <p>
                When you connect a supported platform (e.g., Telegram, or in the
                future WhatsApp Business or Instagram) with Chidi:
              </p>
              <ul>
                <li>
                  We may access, process, and store messages, customer
                  interactions, and related data solely to provide the Services
                  (e.g., chat automation, customer engagement, and analytics).
                </li>
                <li>
                  We do not sell or share this data with advertisers or
                  unrelated third parties.
                </li>
                <li>
                  Data is retained only as long as necessary to provide the
                  Services and in compliance with the respective platform&apos;s
                  policies.
                </li>
                <li>
                  You are responsible for complying with the platform&apos;s own
                  Terms of Service and Business/Platform Policies (e.g.,
                  WhatsApp Business Policy, Instagram Platform Policy) when
                  using Chidi.
                </li>
              </ul>
            </Section>

            <Section title="4. Sharing of Information">
              <p>
                We do not sell or rent your personal data. We may share
                information with:
              </p>
              <ul>
                <li>
                  <strong>Service Providers:</strong> Third-party vendors (e.g.,
                  cloud hosting, analytics, payment processors).
                </li>
                <li>
                  <strong>Messaging Platforms:</strong> Such as WhatsApp
                  Business and Instagram, but only as necessary to provide the
                  Services.
                </li>
                <li>
                  <strong>Legal Authorities:</strong> When required by law or to
                  protect our rights, users, or services.
                </li>
              </ul>
            </Section>

            <Section title="5. Data Ownership & Responsibility">
              <ul>
                <li>
                  You retain ownership of the content and data you upload or
                  process through Chidi.
                </li>
                <li>
                  We process your data only to deliver our Services, improve
                  product functionality, or as required by law.
                </li>
                <li>
                  Responsibility for decisions made based on AI outputs rests
                  with you.
                </li>
              </ul>
            </Section>

            <Section title="6. Data Security">
              <p>
                We implement industry-standard security measures to protect your
                data. However, no system is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </Section>

            <Section title="7. Data Retention">
              <ul>
                <li>
                  We retain your personal and messaging platform data only as
                  long as necessary to provide Services and comply with legal
                  obligations.
                </li>
                <li>
                  If you disconnect an integrated account or close your Chidi
                  account, we will delete or anonymize your data within a
                  reasonable timeframe, unless retention is legally required.
                </li>
              </ul>
            </Section>

            <Section title="8. Your Rights">
              <p>Depending on your location, you may have rights to:</p>
              <ul>
                <li>Access, update, or delete your personal data.</li>
                <li>Object to certain processing activities.</li>
                <li>
                  Withdraw consent where processing is based on consent.
                </li>
              </ul>
              <p>
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:admin@chidi.app"
                  className="text-[var(--chidi-accent)] hover:underline"
                >
                  admin@chidi.app
                </a>
                .
              </p>
            </Section>

            <Section title="9. Children's Privacy">
              <p>
                Our Services are not directed to individuals under 18. We do not
                knowingly collect personal data from children.
              </p>
            </Section>

            <Section title="10. International Users">
              <p>
                If you access Chidi from outside Nigeria, please note your data
                may be transferred and stored in countries with different data
                protection laws.
              </p>
            </Section>

            <Section title="11. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. When we do,
                we will post the revised version on our website with a new
                &quot;Effective Date.&quot;
              </p>
            </Section>

            <Section title="12. Contact Us">
              <p>
                If you have questions about this Privacy Policy, please contact
                us at:
              </p>
              <p>
                <strong>CHIDI AI Limited</strong>
                <br />
                10, Damilola Ajayi Street, Gbagada, Lagos, NG.
                <br />
                Email:{" "}
                <a
                  href="mailto:admin@chidi.app"
                  className="text-[var(--chidi-accent)] hover:underline"
                >
                  admin@chidi.app
                </a>
              </p>
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

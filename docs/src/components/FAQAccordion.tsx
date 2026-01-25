import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

export function FAQAccordion() {
  return (
    <div className="bg-neutral-100/50 dark:bg-neutral-800/20 backdrop-blur-sm border border-neutral-300/50 dark:border-neutral-800/50 rounded-xl overflow-hidden">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="md:text-lg">Is Rybbit GDPR and CCPA compliant?</AccordionTrigger>
          <AccordionContent>
            Yes, Rybbit is fully compliant with GDPR, CCPA, and other privacy regulations. We don&apos;t use
            cookies or collect any personal data that could identify your users. We salt user IDs daily to
            ensure users are not fingerprinted. You will not need to display a cookie consent banner to your
            users.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="md:text-lg">Rybbit vs. Google Analytics</AccordionTrigger>
          <AccordionContent>
            <p>
              Google Analytics is free because Google uses it as a funnel into their ecosystem and to sell ads.
              Rybbit&apos;s only goal is to provide you with high quality analytics. No more confusing
              dashboards pushing random AI features nobody wants.
            </p>
            <br />
            <p>
              You can see for yourself by checking out our{" "}
              <Link
                href="https://demo.rybbit.com/1"
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300"
              >
                demo site
              </Link>
              . The difference in usability is night and day.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="md:text-lg">Rybbit vs. Plausible/Umami/Fathom</AccordionTrigger>
          <AccordionContent>
            <p>
              Rybbit is similar to these simple and privacy-focused analytics platforms, but we are raising the
              bar when it comes to UX and the quality and scope of our feature set.
            </p>
            <br />
            <p>
              We don&apos;t want to just be a simple analytics tool, but we carefully craft every feature to be
              understandable without having to read pages of documentation.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="md:text-lg">Rybbit vs. Posthog/Mixpanel/Amplitude</AccordionTrigger>
          <AccordionContent>
            <p>
              Rybbit has most of the features of enterprise analytics platforms, but packaged in a way that is
              usable for small and medium sized teams.
            </p>
            <br />
            <p>
              We have advanced features like session replay, error tracking, web vitals, and funnels - but you
              don&apos;t need to spend days learning how to use them.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="md:text-lg">Can I self-host Rybbit?</AccordionTrigger>
          <AccordionContent>
            Absolutely! Rybbit is available as a self-hosted option. You can install it on your own server and
            have complete control over your data.{" "}
            <Link
              href="/docs/self-hosting"
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300"
            >
              Learn more here
            </Link>
            . We also offer a cloud version if you prefer a managed solution.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="md:text-lg">How easy is it to set up Rybbit?</AccordionTrigger>
          <AccordionContent>
            <Link
              href="/docs/script"
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300"
            >
              Setting up Rybbit
            </Link>{" "}
            is incredibly simple. Just add a small script to your website or install @rybbit/js from npm, and
            you&apos;re good to go. Most users are up and running in less than 5 minutes. We also provide
            comprehensive documentation and support if you need any help.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger className="md:text-lg">What platforms does Rybbit support?</AccordionTrigger>
          <AccordionContent>
            Rybbit works with virtually any website platform. Whether you&apos;re using WordPress, Shopify,
            Next.js, React, Vue, or any other framework, our simple tracking snippet integrates seamlessly. You
            can also use @rybbit/js, our web SDK you can install from npm. Check out our{" "}
            <Link
              href="/docs"
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300"
            >
              documentation
            </Link>{" "}
            for setup guides.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger className="md:text-lg">Is Rybbit open source?</AccordionTrigger>
          <AccordionContent>
            Yes, Rybbit is open source under the AGPL v3.0 license. You are free to{" "}
            <Link
              href="/docs/self-hosting"
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300"
            >
              self-host Rybbit
            </Link>{" "}
            for either personal or business use.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9">
          <AccordionTrigger className="md:text-lg">Can I invite my team to my organization?</AccordionTrigger>
          <AccordionContent>
            Yes, you can invite unlimited team members to your organization. Each member can have different
            permission levels to view or manage your analytics dashboards.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10">
          <AccordionTrigger className="md:text-lg">Can I share my dashboard publicly?</AccordionTrigger>
          <AccordionContent>
            Yes, you can share your dashboard publicly in two ways: with a secret link that only people with the
            URL can access, or as a completely public dashboard that anyone can view.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-11">
          <AccordionTrigger className="md:text-lg">Does Rybbit have an API?</AccordionTrigger>
          <AccordionContent>
            Yes, Rybbit provides a comprehensive{" "}
            <Link
              href="/docs/api/getting-started"
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300"
            >
              API
            </Link>{" "}
            that allows you to programmatically access your analytics data. You can integrate Rybbit data into
            your own applications, dashboards, or workflows.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

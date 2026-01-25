import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { GitHubStarButton } from "@/components/GitHubStarButton";
import { IntegrationsGrid } from "@/components/Integration";
import { Marquee } from "@/components/magicui/marquee";
import { SectionBadge } from "@/components/SectionBadge";
import { TrackedButton } from "@/components/TrackedButton";
import { TweetCard } from "@/components/Tweet";
import { cn } from "@/lib/utils";
import {
  Activity,
  Bot,
  Building,
  CheckCircle,
  Code,
  Cookie,
  Download,
  Funnel,
  Gauge,
  Globe2,
  Layers,
  Mail,
  Plug,
  Route,
  ShieldCheck,
  Video,
  Zap,
} from "lucide-react";
import { Tilt_Warp } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Funnels } from "../../components/Cards/Funnels";
import { RealTimeAnalytics } from "../../components/Cards/RealTimeAnalytics";
import { SessionReplay } from "../../components/Cards/SessionReplay";
import { UserSessions } from "../../components/Cards/UserSessions";
import { DEFAULT_EVENT_LIMIT } from "../../lib/const";

const tilt_wrap = Tilt_Warp({
  subsets: ["latin"],
});

// FAQ Structured Data
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Rybbit GDPR and CCPA compliant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Rybbit is fully compliant with GDPR, CCPA, and other privacy regulations. We don't use cookies or collect any personal data that could identify your users. We salt user IDs daily to ensure users are not fingerprinted. You will not need to display a cookie consent banner to your users.",
      },
    },
    {
      "@type": "Question",
      name: "How does Rybbit compare to Google Analytics?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rybbit is much less bloated than Google Analytics, both in terms of our tracking script and the UX of the dashboard. We show you exactly what you need to see. The difference in usability is night and day.",
      },
    },
    {
      "@type": "Question",
      name: "Can I self-host Rybbit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! Rybbit is available as a self-hosted option. You can install it on your own server and have complete control over your data. We also offer a cloud version if you prefer a managed solution.",
      },
    },
    {
      "@type": "Question",
      name: "How easy is it to set up Rybbit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Setting up Rybbit is incredibly simple. Just add a small script to your website or install @rybbit/js from npm, and you're good to go. Most users are up and running in less than 5 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "What platforms does Rybbit support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rybbit works with virtually any website platform. Whether you're using WordPress, Shopify, Next.js, React, Vue, or any other framework, our simple tracking snippet integrates seamlessly.",
      },
    },
    {
      "@type": "Question",
      name: "Is Rybbit truly open source?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Rybbit is 100% open source. Every single line of code, including for our cloud/enterprise offerings, is available on GitHub under the AGPL 3.0 license.",
      },
    },
  ],
};

export const metadata = {
  title: "Rybbit - Cookieless Google Analytics Replacement",
  description:
    "Next-gen, open source, lightweight, cookieless web & product analytics for everyone — GDPR/CCPA compliant.",
};

const features = [
  {
    icon: Zap,
    title: "Setup in minutes",
    description: "Add one line of code and start seeing real-time data instantly.",
  },
  {
    icon: Activity,
    title: "Realtime data",
    description: "See what's happening on your site right now.",
  },
  {
    icon: Video,
    title: "Session replay",
    description: "Watch real user sessions to spot usability issues.",
  },
  {
    icon: Funnel,
    title: "Funnels",
    description: "Visualize conversion paths and find where visitors drop off.",
  },
  {
    icon: Route,
    title: "User journeys",
    description: "Map how users navigate from landing to conversion.",
  },
  {
    icon: Gauge,
    title: "Web vitals",
    description: "Monitor Core Web Vitals for fast user experiences.",
  },
  {
    icon: Layers,
    title: "Custom events",
    description: "Track sign-ups, purchases, and any user interaction.",
  },
  {
    icon: Bot,
    title: "Bot blocking",
    description: "Automatically filter out bots to keep data clean.",
  },
  {
    icon: Cookie,
    title: "No cookies",
    description: "Zero cookies, zero banners. Cleaner visitor experiences.",
  },
  {
    icon: ShieldCheck,
    title: "GDPR & CCPA",
    description: "Privacy-first design means you're compliant out of the box.",
  },
  {
    icon: Globe2,
    title: "Globe views",
    description: "Watch traffic flow with stunning 3D globe visualizations.",
  },
  {
    icon: Code,
    title: "Open source",
    description: "100% open source. Self-host or use our cloud.",
  },
  {
    icon: Plug,
    title: "API",
    description: "Full API access to build custom integrations.",
  },
  {
    icon: Download,
    title: "Data export",
    description: "Export your raw data anytime. No lock-in.",
  },
  {
    icon: Mail,
    title: "Email reports",
    description: "Automated reports delivered to your inbox.",
  },
  {
    icon: Building,
    title: "Organizations",
    description: "Manage sites and team access in one place.",
  },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="flex flex-col items-center justify-center overflow-x-hidden pt-16 md:pt-24">
        <GitHubStarButton />

        <h1
          className={cn(
            "text-4xl md:text-5xl lg:text-7xl px-4 tracking-tight max-w-4xl text-center text-neutral-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:via-gray-100 dark:to-gray-400",
            tilt_wrap.className
          )}
        >
          The Modern Google Analytics Replacement
        </h1>
        <h2 className="text-base md:text-xl pt-4 md:pt-6 px-4 tracking-tight max-w-4xl text-center text-neutral-600 dark:text-neutral-300 font-light">
          Rybbit is powerful, lightweight, and super easy to use analytics. Cookieless and GDPR compliant. Hosted on EU
          infrastructure in Germany{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 767 512"
            role="img"
            aria-label="European flag"
            className="inline mr-2 w-8 rounded align-sub"
          >
            <title>European flag</title>
            <path className="fill-[#233E90]/80" d="M766 1H1v510h765V1Z"></path>
            <path
              className="fill-yellow-400"
              d="m387 117-35 25 13-41-35-26h43l14-41 14 41h43l-35 26 13 41-35-25Zm114 43-35 25 13-41-35-26h43l14-41 14 41h43l-35 26 13 41-35-25Zm47 125-35 25 13-41-35-26h43l14-41 14 41h43l-35 26 13 41-35-25Zm-321 0-35 25 13-41-35-26h43l14-41 14 41h43l-35 26 13 41-35-25Zm283 125-35 25 13-41-35-26h43l14-41 14 41h43l-35 26 13 41-35-25Zm-123 35-35 25 13-41-35-26h43l14-41 14 41h43l-35 26 13 41-35-25Zm-123-35-35 25 13-41-35-26h43l14-41 14 41h43l-35 26 13 41-35-25Zm0-250-35 25 13-41-35-26h43l14-41 14 41h43l-35 26 13 41-35-25Z"
            ></path>
          </svg>
        </h2>

        <div className="flex flex-col items-center my-8 md:my-10">
          <div className="flex flex-row items-center justify-center gap-4 md:gap-6 text-base md:text-lg">
            <TrackedButton
              href="https://app.rybbit.io/signup"
              eventName="signup"
              eventProps={{ location: "hero", button_text: "get started" }}
              className="w-full whitespace-nowrap sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-lg shadow-lg shadow-emerald-900/20 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 cursor-pointer"
            >
              Get started
            </TrackedButton>
            <TrackedButton
              href="https://demo.rybbit.com/81"
              eventName="demo"
              target="_blank"
              rel="noopener noreferrer"
              eventProps={{ location: "hero", button_text: "Live demo" }}
              className="w-full whitespace-nowrap sm:w-auto bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-medium px-6 py-3 rounded-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 cursor-pointer"
            >
              Live demo
            </TrackedButton>
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs md:text-sm flex items-center justify-center gap-2 mt-6">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
            First {DEFAULT_EVENT_LIMIT.toLocaleString()} pageviews/m are free. No credit card required.
          </p>
        </div>
        <div className="relative w-full max-w-[1300px] mb-10">
          {/* Background gradients - overlapping circles for organic feel */}
          <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-emerald-500/30 dark:bg-emerald-500/40 rounded-full blur-[80px] opacity-80 dark:opacity-70"></div>
          <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-emerald-600/20 dark:bg-emerald-600/30 rounded-full blur-[70px] opacity-60 dark:opacity-50"></div>

          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/30 dark:bg-blue-500/40 rounded-full blur-[80px] opacity-70 dark:opacity-60"></div>
          <div className="absolute bottom-40 right-20 w-[350px] h-[350px] bg-indigo-500/20 dark:bg-indigo-500/30 rounded-full blur-[75px] opacity-60 dark:opacity-50"></div>

          <div className="absolute top-1/4 right-0 w-[320px] h-[320px] bg-purple-500/30 dark:bg-purple-500/40 rounded-full blur-[70px] opacity-60 dark:opacity-50"></div>
          <div className="absolute top-1/3 right-20 w-[250px] h-[250px] bg-violet-500/20 dark:bg-violet-500/30 rounded-full blur-[65px] opacity-50 dark:opacity-40"></div>

          <div className="absolute bottom-1/3 left-0 w-[320px] h-[320px] bg-emerald-400/20 dark:bg-emerald-400/30 rounded-full blur-[70px] opacity-70 dark:opacity-60"></div>
          <div className="absolute bottom-1/4 left-20 w-[240px] h-[240px] bg-teal-400/15 dark:bg-teal-400/25 rounded-full blur-[65px] opacity-60 dark:opacity-50"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-indigo-400/20 dark:bg-indigo-400/30 rounded-full blur-[80px] opacity-60 dark:opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/3 w-[350px] h-[350px] bg-sky-400/15 dark:bg-sky-400/20 rounded-full blur-[75px] opacity-50 dark:opacity-40"></div>

          {/* Iframe container with responsive visibility */}
          <div className="relative z-10 rounded-2xl overflow-hidden bg-neutral-400/10 dark:bg-neutral-100/5 border-8 shadow-2xl shadow-neutral-900/20 dark:shadow-emerald-900/10">
            {/* Remove mobile message and show iframe on all devices */}
            <iframe
              src="https://demo.rybbit.com/81/main"
              width="1300"
              height="750"
              className="w-full h-[600px] md:h-[700px] lg:h-[750px] rounded-xl"
              style={{ border: "none" }}
              title="Rybbit Analytics Demo"
            ></iframe>
          </div>
        </div>

        {/* Logo Section */}
        <section className="py-12 md:py-16 w-full">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center mb-10 md:mb-12">
              <p className="text-neutral-500 dark:text-neutral-400 text-sm uppercase tracking-wider font-medium">
                Trusted by 4,000+ organizations worldwide
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              <div className="flex items-center justify-center">
                <Image
                  src="/logos/tencent.svg"
                  alt="Tencent"
                  width={130}
                  height={40}
                  className="opacity-50 hover:opacity-80 dark:opacity-70 dark:hover:opacity-100 transition-opacity dark:invert grayscale"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/logos/convex.svg"
                  alt="Convex"
                  width={120}
                  height={40}
                  className="opacity-40 hover:opacity-70 dark:opacity-60 dark:hover:opacity-100 transition-opacity grayscale invert dark:invert-0 dark:grayscale-0"
                />
              </div>
              <div className="flex items-center justify-center">
                <Link href="https://onyx.app" target="_blank">
                  <Image
                    src="/logos/onyx.webp"
                    alt="Onyx"
                    width={100}
                    height={40}
                    className="opacity-40 hover:opacity-70 dark:opacity-60 dark:hover:opacity-100 transition-opacity dark:invert"
                  />
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/logos/vanguard.webp"
                  alt="Vanguard"
                  width={120}
                  height={40}
                  className="opacity-40 hover:opacity-70 dark:opacity-60 dark:hover:opacity-100 transition-opacity dark:invert"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/logos/ustwo.svg"
                  alt="ustwo"
                  width={100}
                  height={40}
                  className="opacity-40 hover:opacity-70 dark:opacity-60 dark:hover:opacity-100 transition-opacity dark:invert"
                />
              </div>
              {/* <div className="flex items-center justify-center">
                <Image
                  src="/logos/strawpoll.svg"
                  alt="StrawPoll"
                  width={120}
                  height={40}
                  className="opacity-40 hover:opacity-70 dark:opacity-60 dark:hover:opacity-100 transition-opacity dark:invert"
                />
              </div> */}
              <div className="flex items-center justify-center">
                <Image
                  src="/logos/mydramalist.png"
                  alt="MyDramaList"
                  width={120}
                  height={40}
                  className="opacity-50 hover:opacity-80 dark:opacity-60 dark:hover:opacity-100 transition-opacity invert dark:invert-0"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/logos/dtelecom.svg"
                  alt="DTelecom"
                  width={120}
                  height={40}
                  className="opacity-40 hover:opacity-70 dark:opacity-60 dark:hover:opacity-100 transition-opacity grayscale invert dark:invert-0"
                />
              </div>

              <div className="flex items-center justify-center">
                <Link href="https://dpm.lol" target="_blank">
                  <Image
                    src="/logos/dpm.webp"
                    alt="DPM.lol"
                    width={120}
                    height={40}
                    className="opacity-40 hover:opacity-70 dark:opacity-60 dark:hover:opacity-100 transition-opacity grayscale invert dark:invert-0"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="py-14 md:py-20 w-full max-w-[1200px] px-4">
          <div className="text-center mb-10 md:mb-12">
            <SectionBadge className="mb-4">Why Rybbit</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need</h2>
            <p className="mt-4 text-base md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto font-light">
              Powerful analytics without the complexity. Privacy-friendly tools that just work.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {features.map(feature => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-neutral-200/50 dark:bg-neutral-800/20 rounded-lg p-5 transition-colors"
                >
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-14 md:py-20 w-full max-w-[1200px] px-4">
          <div className="text-center mb-10 md:mb-16">
            <SectionBadge className="mb-4">Analytics Reimagined</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">See it in action</h2>
            <p className="mt-4 text-base md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto font-light">
              Powerful tools designed for clarity, not complexity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <RealTimeAnalytics />
            <SessionReplay />
            <UserSessions />
            <Funnels />
          </div>
        </section>

        {/* <section className="py-14 md:py-20 w-full max-w-[1200px]">
          <div className="text-center mb-10 md:mb-16 px-4">
            <SectionBadge className="mb-4">Real-Time Insights</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">See Your Users Around the World</h2>
            <p className="mt-4 text-base md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto font-light">
              Watch real-time visitor activity across the globe. Every dot represents a real user exploring your site
              right now.
            </p>
          </div>
          <div className="relative h-[420px] md:h-[700px] max-w-[100vw] mx-auto rounded-2xl">
            <SpinningGlobe />
          </div>
        </section> */}

        {/* Integrations Section */}
        <section className="py-12 md:py-20 w-full">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
              <div className="md:sticky md:top-24 md:self-start">
                <SectionBadge className="mb-4">Seamless Integration</SectionBadge>
                <h2 className="text-3xl md:text-4xl font-bold">Works with all your favorite platforms</h2>
                <p className="mt-4 text-neutral-600 dark:text-neutral-300 font-light">
                  Integrate Rybbit with any platform in minutes
                </p>
              </div>
              <IntegrationsGrid />
            </div>
          </div>
        </section>
        {/* Testimonial Section */}
        <section className="py-10 md:py-16 w-full overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <SectionBadge className="mb-4">User Testimonials</SectionBadge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">People love Rybbit</h2>
              <p className="mt-4 text-base md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto font-light">
                See what others think about Rybbit Analytics
              </p>
            </div>
            <div className="relative bg-neutral-100/50 dark:bg-neutral-800/20 backdrop-blur-sm border border-neutral-300/50 dark:border-neutral-800/50 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px] md:h-[700px] p-4">
                {/* Column 1 - visible on all screen sizes */}
                <Marquee vertical pauseOnHover className="[--duration:60s]" repeat={2}>
                  <TweetCard id="1991296442611184125" />
                  <TweetCard id="1921928423284629758" />
                  <TweetCard id="2000974573005889706" />
                  <TweetCard id="1927817460993884321" />
                  <TweetCard id="1977471983278535071" />
                  <TweetCard id="1958789741635141673" />
                </Marquee>

                {/* Column 2 - hidden on mobile */}
                <Marquee vertical pauseOnHover reverse className="hidden md:flex [--duration:45s]" repeat={2}>
                  <TweetCard id="1920899082253434950" />
                  <TweetCard id="2000788904778326334" />
                  <TweetCard id="2015102995789381815" />
                  <TweetCard id="1982378431166963982" />
                  <TweetCard id="1980082738934993142" />
                  <TweetCard id="1976495558480232672" />
                </Marquee>

                {/* Column 3 - hidden on mobile */}
                <Marquee vertical pauseOnHover className="hidden md:flex [--duration:60s]" repeat={2}>
                  <TweetCard id="2009548405488615871" />
                  <TweetCard id="1920470706761929048" />
                  <TweetCard id="1981795864118243355" />
                  <TweetCard id="1979830490006974510" />
                  <TweetCard id="1970265809122705759" />
                </Marquee>
              </div>

              {/* Gradient overlays */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-neutral-100/90 dark:from-neutral-900/90 to-transparent"></div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-100/90 dark:from-neutral-900/90 to-transparent"></div>
            </div>
          </div>
        </section>


        {/* FAQ Section */}
        <section className="py-10 md:py-16 w-full">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
              <div className="md:sticky md:top-24 md:self-start">
                <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
                <p className="mt-4 text-neutral-600 dark:text-neutral-300 font-light">
                  Everything you need to know about Rybbit Analytics
                </p>
              </div>
              <FAQAccordion />
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </>
  );
}

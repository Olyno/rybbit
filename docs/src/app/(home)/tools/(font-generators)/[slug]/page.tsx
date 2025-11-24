import { ToolPageLayout } from "../../components/ToolPageLayout";
import { FontGeneratorTool } from "../../components/FontGeneratorTool";
import AICommentForm from "../../components/AICommentForm";
import PageNameGenerator from "../../components/PageNameGenerator";
import PostGenerator from "../../components/PostGenerator";
import { platformConfigs, platformList } from "../../components/platform-configs";
import {
  commentPlatformConfigs,
  commentPlatformList,
} from "../../components/comment-platform-configs";
import {
  pageNamePlatformConfigs,
  pageNamePlatformList,
} from "../../components/page-name-platform-configs";
import {
  postGeneratorPlatformConfigs,
  postGeneratorPlatformList,
} from "../../components/post-generator-platform-configs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all platforms at build time
export async function generateStaticParams() {
  const fontGenerators = platformList.map((platform) => ({
    slug: `${platform.id}-font-generator`,
  }));

  const commentGenerators = commentPlatformList.map((platform) => ({
    slug: `${platform.id}-comment-generator`,
  }));

  const pageNameGenerators = pageNamePlatformList.map((platform) => ({
    slug: `${platform.id}-page-name-generator`,
  }));

  const postGenerators = postGeneratorPlatformList.map((platform) => ({
    slug: `${platform.id}-post-generator`,
  }));

  return [
    ...fontGenerators,
    ...commentGenerators,
    ...pageNameGenerators,
    ...postGenerators,
  ];
}

// Generate metadata dynamically based on slug
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Check if it's a post generator
  if (slug.endsWith("-post-generator")) {
    const platformId = slug.replace("-post-generator", "");
    const platform = postGeneratorPlatformConfigs[platformId];

    if (!platform) {
      return { title: "Post Generator Not Found" };
    }

    return {
      title: `${platform.displayName} | AI-Powered ${platform.name} Posts`,
      description: platform.description,
      openGraph: {
        title: platform.displayName,
        description: platform.description,
        type: "website",
        url: `https://rybbit.com/tools/${platform.id}-post-generator`,
        siteName: "Rybbit Documentation",
      },
      twitter: {
        card: "summary_large_image",
        title: platform.displayName,
        description: platform.description,
      },
      alternates: {
        canonical: `https://rybbit.com/tools/${platform.id}-post-generator`,
      },
    };
  }

  // Check if it's a page name generator
  if (slug.endsWith("-page-name-generator")) {
    const platformId = slug.replace("-page-name-generator", "");
    const platform = pageNamePlatformConfigs[platformId];

    if (!platform) {
      return { title: "Page Name Generator Not Found" };
    }

    return {
      title: `${platform.displayName} | AI-Powered ${platform.pageType} Names`,
      description: platform.description,
      openGraph: {
        title: platform.displayName,
        description: platform.description,
        type: "website",
        url: `https://rybbit.com/tools/${platform.id}-page-name-generator`,
        siteName: "Rybbit Documentation",
      },
      twitter: {
        card: "summary_large_image",
        title: platform.displayName,
        description: platform.description,
      },
      alternates: {
        canonical: `https://rybbit.com/tools/${platform.id}-page-name-generator`,
      },
    };
  }

  // Check if it's a comment generator
  if (slug.endsWith("-comment-generator")) {
    const platformId = slug.replace("-comment-generator", "");
    const platform = commentPlatformConfigs[platformId];

    if (!platform) {
      return { title: "Comment Generator Not Found" };
    }

    return {
      title: `${platform.displayName} | AI-Powered ${platform.name} Comments`,
      description: platform.description,
      openGraph: {
        title: platform.displayName,
        description: platform.description,
        type: "website",
        url: `https://rybbit.com/tools/${platform.id}-comment-generator`,
        siteName: "Rybbit Documentation",
      },
      twitter: {
        card: "summary_large_image",
        title: platform.displayName,
        description: platform.description,
      },
      alternates: {
        canonical: `https://rybbit.com/tools/${platform.id}-comment-generator`,
      },
    };
  }

  // It's a font generator
  const platformId = slug.replace("-font-generator", "");
  const platform = platformConfigs[platformId];

  if (!platform) {
    return {
      title: "Font Generator Not Found",
    };
  }

  return {
    title: `Free ${platform.displayName} | Unicode Font Styles for ${platform.name}`,
    description: platform.description,
    openGraph: {
      title: `Free ${platform.displayName}`,
      description: platform.description,
      type: "website",
      url: `https://rybbit.com/tools/${platform.id}-font-generator`,
      siteName: "Rybbit Documentation",
    },
    twitter: {
      card: "summary_large_image",
      title: `Free ${platform.displayName}`,
      description: platform.description,
    },
    alternates: {
      canonical: `https://rybbit.com/tools/${platform.id}-font-generator`,
    },
  };
}

export default async function PlatformToolPage({ params }: PageProps) {
  const { slug } = await params;

  // Check if it's a post generator
  if (slug.endsWith("-post-generator")) {
    const platformId = slug.replace("-post-generator", "");
    const platform = postGeneratorPlatformConfigs[platformId];

    // Handle invalid platform
    if (!platform) {
      notFound();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: platform.displayName,
      description: platform.description,
      url: `https://rybbit.com/tools/${platform.id}-post-generator`,
      applicationCategory: "Utility",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Organization",
        name: "Rybbit",
        url: "https://rybbit.com",
      },
    };

    const educationalContent = (
      <>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          About {platform.name} Posts
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
          {platform.educationalContent}
        </p>

        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
          How to Use This Tool
        </h3>
        <ol className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
          <li>
            <strong>Describe your topic</strong> - What do you want to post
            about?
          </li>
          <li>
            <strong>Select a style</strong> - Choose from{" "}
            {platform.recommendedStyles.length} platform-optimized styles
          </li>
          <li>
            <strong>Add context (optional)</strong> - Include specific details,
            CTAs, or hashtags
          </li>
          <li>
            <strong>Click "Generate Posts"</strong> to get 3 unique variations
          </li>
          <li>
            <strong>Copy and customize</strong> your favorite post before
            publishing
          </li>
        </ol>

        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
          Available Post Styles
        </h3>
        <ul className="grid grid-cols-2 gap-2 text-sm text-neutral-700 dark:text-neutral-300 mb-6">
          {platform.recommendedStyles.map((style) => (
            <li key={style} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {style}
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
          Best Practices for {platform.name}
        </h3>
        <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
          <li>
            <strong>Be authentic:</strong> Personalize AI-generated content to
            match your voice
          </li>
          <li>
            <strong>Add value:</strong> Ensure your post provides insights,
            entertainment, or useful information
          </li>
          <li>
            <strong>Engage your audience:</strong> Include questions or CTAs to
            encourage interaction
          </li>
          <li>
            <strong>Optimize timing:</strong> Post when your audience is most
            active
          </li>
          <li>
            <strong>Review before posting:</strong> Always edit and customize
            generated content
          </li>
        </ul>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-6">
          <strong>Note:</strong> While this tool generates high-quality posts,
          always review and personalize content before publishing. Authentic
          engagement comes from adding your unique perspective and voice.
        </p>
      </>
    );

    const faqs = [
      {
        question: `How does the ${platform.name} post generator work?`,
        answer: `This tool uses AI to create platform-optimized posts based on your topic and chosen style. It considers ${platform.name}'s best practices, character limits, and engagement patterns to generate content that resonates with your audience.`,
      },
      {
        question: "What post styles are available?",
        answer: `You can choose from ${platform.recommendedStyles.length} styles: ${platform.recommendedStyles.join(", ")}. Each style is optimized for ${platform.name} and designed to maximize engagement for different types of content.`,
      },
      {
        question: "Should I edit the generated posts?",
        answer:
          "Yes! Generated posts are starting points. Always personalize them with your unique voice, specific details, and brand personality. The best posts combine AI efficiency with human authenticity.",
      },
      {
        question: "How many posts can I generate?",
        answer:
          "The tool generates 3 unique post variations per request. You're limited to 5 requests per minute. If you need more variations, try adjusting your topic or style.",
      },
      {
        question: "Will the posts sound natural?",
        answer: `Yes! The AI is trained to create authentic, engaging content that matches ${platform.name}'s tone and style. However, adding your personal touch makes posts even more effective and genuine.`,
      },
      {
        question: "How can Rybbit help me measure post performance?",
        answer: (
          <>
            Rybbit tracks clicks, engagement, and traffic from your{" "}
            {platform.name} posts. See which content drives the most interaction
            and optimize your social media strategy.{" "}
            <a
              href="https://rybbit.com"
              className="text-emerald-600 hover:text-emerald-500 underline"
            >
              Start tracking for free
            </a>
            .
          </>
        ),
      },
    ];

    return (
      <ToolPageLayout
        toolSlug={`${platform.id}-post-generator`}
        title={platform.displayName}
        description={platform.description}
        badge="AI-Powered Tool"
        toolComponent={<PostGenerator platform={platform} />}
        educationalContent={educationalContent}
        faqs={faqs}
        relatedToolsCategory="social-media"
        ctaTitle={`Optimize your ${platform.name} strategy with Rybbit`}
        ctaDescription="Track which posts drive the most engagement and refine your content strategy with data-driven insights."
        ctaEventLocation={`${platform.id}_post_generator_cta`}
        structuredData={structuredData}
      />
    );
  }

  // Check if it's a page name generator
  if (slug.endsWith("-page-name-generator")) {
    const platformId = slug.replace("-page-name-generator", "");
    const platform = pageNamePlatformConfigs[platformId];

    // Handle invalid platform
    if (!platform) {
      notFound();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: platform.displayName,
      description: platform.description,
      url: `https://rybbit.com/tools/${platform.id}-page-name-generator`,
      applicationCategory: "Utility",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Organization",
        name: "Rybbit",
        url: "https://rybbit.com",
      },
    };

    const educationalContent = (
      <>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          About {platform.name} {platform.pageType} Names
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
          {platform.educationalContent}
        </p>

        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
          How to Use This Tool
        </h3>
        <ol className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
          <li>
            <strong>Describe your {platform.pageType.toLowerCase()}</strong> -
            What's it about? What topics will you cover?
          </li>
          <li>
            <strong>Add keywords (optional)</strong> - Include specific terms
            you want in the name
          </li>
          <li>
            <strong>Choose name length</strong> - Short, medium, or long
          </li>
          <li>
            <strong>Click "Generate Names"</strong> to get 5 unique suggestions
          </li>
          <li>
            <strong>Copy your favorite</strong> and use it for your{" "}
            {platform.name} {platform.pageType.toLowerCase()}
          </li>
        </ol>

        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
          Best Practices for {platform.name} {platform.pageType} Names
        </h3>
        <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
          <li>
            <strong>Keep it memorable:</strong> Choose a name that's easy to
            remember and spell
          </li>
          <li>
            <strong>Make it relevant:</strong> The name should clearly reflect
            your content or purpose
          </li>
          <li>
            <strong>Consider SEO:</strong> Include keywords that people might
            search for
          </li>
          <li>
            <strong>Check availability:</strong> Make sure the name isn't
            already taken on {platform.name}
          </li>
          <li>
            <strong>Think long-term:</strong> Choose a name that will still work
            as your {platform.pageType.toLowerCase()} grows
          </li>
        </ul>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-6">
          <strong>Note:</strong> Always check if your chosen name is available
          on {platform.name} before committing to it. The best names are unique,
          memorable, and accurately represent your content.
        </p>
      </>
    );

    const faqs = [
      {
        question: `How does the ${platform.name} ${platform.pageType} name generator work?`,
        answer: `This tool uses AI to analyze your topic and keywords, then generates creative, memorable ${platform.pageType.toLowerCase()} names that are optimized for ${
          platform.name
        }. It considers platform-specific best practices and naming conventions.`,
      },
      {
        question: "Can I customize the generated names?",
        answer:
          "Absolutely! The generated names are starting points. Feel free to modify them, combine elements from different suggestions, or use them as inspiration for your own variations.",
      },
      {
        question: "What makes a good name?",
        answer: `A good ${platform.pageType.toLowerCase()} name is memorable, easy to spell, relevant to your content, and unique. It should give potential members or followers a clear idea of what to expect while being catchy enough to remember.`,
      },
      {
        question: "How many names can I generate?",
        answer:
          "The tool generates 5 unique name suggestions per request. You're limited to 5 requests per minute. If you need more options, try adjusting your topic description or keywords for different variations.",
      },
      {
        question: "Are the names guaranteed to be available?",
        answer: `No, the tool generates creative name suggestions but doesn't check availability on ${platform.name}. Always verify that your chosen name is available on the platform before using it.`,
      },
      {
        question: "How can Rybbit help me grow my presence?",
        answer: (
          <>
            Rybbit helps you track engagement, clicks, and traffic sources from
            your {platform.name} presence. Understand what content resonates with
            your audience and optimize your strategy.{" "}
            <a
              href="https://rybbit.com"
              className="text-emerald-600 hover:text-emerald-500 underline"
            >
              Start tracking for free
            </a>
            .
          </>
        ),
      },
    ];

    return (
      <ToolPageLayout
        toolSlug={`${platform.id}-page-name-generator`}
        title={platform.displayName}
        description={platform.description}
        badge="AI-Powered Tool"
        toolComponent={<PageNameGenerator platform={platform} />}
        educationalContent={educationalContent}
        faqs={faqs}
        relatedToolsCategory="social-media"
        ctaTitle={`Grow your ${platform.name} presence with Rybbit`}
        ctaDescription={`Track performance and engagement from your ${platform.name} ${platform.pageType.toLowerCase()} to understand what works.`}
        ctaEventLocation={`${platform.id}_page_name_generator_cta`}
        structuredData={structuredData}
      />
    );
  }

  // Check if it's a comment generator
  if (slug.endsWith("-comment-generator")) {
    const platformId = slug.replace("-comment-generator", "");
    const platform = commentPlatformConfigs[platformId];

    // Handle invalid platform
    if (!platform) {
      notFound();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: platform.displayName,
      description: platform.description,
      url: `https://rybbit.com/tools/${platform.id}-comment-generator`,
      applicationCategory: "Utility",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Organization",
        name: "Rybbit",
        url: "https://rybbit.com",
      },
    };

    const educationalContent = (
      <>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          About {platform.name} Comments
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
          {platform.educationalContent}
        </p>

        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
          How to Use This Tool
        </h3>
        <ol className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
          <li>
            <strong>Paste the original content</strong> you want to comment on
            in the text area
          </li>
          <li>
            <strong>Select your desired tone</strong> (friendly, professional,
            humorous, etc.)
          </li>
          <li>
            <strong>Choose comment length</strong> based on your preference
          </li>
          <li>
            <strong>Click "Generate Comments"</strong> to create 3 unique
            variations
          </li>
          <li>
            <strong>Copy your favorite</strong> and paste it into{" "}
            {platform.name}
          </li>
        </ol>

        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
          Best Practices for {platform.name} Comments
        </h3>
        <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
          <li>
            <strong>Be authentic:</strong> Even AI-generated comments should
            feel genuine and personal
          </li>
          <li>
            <strong>Add context:</strong> Reference specific parts of the
            original content
          </li>
          <li>
            <strong>Encourage dialogue:</strong> Ask questions or invite further
            discussion
          </li>
          <li>
            <strong>Match the tone:</strong> Respect the original post's mood
            and purpose
          </li>
          <li>
            <strong>Personalize before posting:</strong> Edit generated comments
            to add your unique voice
          </li>
        </ul>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-6">
          <strong>Note:</strong> While this tool generates comments using AI,
          always review and personalize them before posting. Authentic
          engagement is key to building genuine connections on {platform.name}.
        </p>
      </>
    );

    const faqs = [
      {
        question: `How does the ${platform.name} comment generator work?`,
        answer: `This tool uses AI to analyze the content you provide and generate contextually relevant comments based on your chosen tone and length preference. It considers ${platform.name}-specific best practices to create authentic, engaging responses.`,
      },
      {
        question: "Can I edit the generated comments before posting?",
        answer:
          "Absolutely! We encourage you to personalize any generated comment to match your voice and add specific details. The generated comments are starting points—your personal touch makes them truly authentic.",
      },
      {
        question: "What tones are available?",
        answer:
          "You can choose from six tones: Friendly (warm and approachable), Professional (polished and business-appropriate), Humorous (light-hearted and funny), Supportive (encouraging and empathetic), Inquisitive (curious and question-asking), and Critical (thoughtfully analytical).",
      },
      {
        question: "How many comments can I generate?",
        answer: (
          <>
            The tool generates 3 unique comment variations per request. You're
            limited to 5 requests per minute to ensure fair usage and maintain
            service quality for all users.
          </>
        ),
      },
      {
        question: "Will the comments sound natural?",
        answer: `Yes! The AI is trained to create authentic, platform-appropriate comments that match ${platform.name}'s culture and style. However, adding your personal touch will make them even more genuine and effective.`,
      },
      {
        question: "How can Rybbit help me track comment engagement?",
        answer: (
          <>
            Rybbit helps you measure which content drives the most engagement
            and comments on your social media. Track clicks, traffic sources,
            and content performance to understand what resonates with your
            audience.{" "}
            <a
              href="https://rybbit.com"
              className="text-emerald-600 hover:text-emerald-500 underline"
            >
              Start tracking for free
            </a>
            .
          </>
        ),
      },
    ];

    return (
      <ToolPageLayout
        toolSlug={`${platform.id}-comment-generator`}
        title={platform.displayName}
        description={platform.description}
        badge="AI-Powered Tool"
        toolComponent={<AICommentForm platform={platform} />}
        educationalContent={educationalContent}
        faqs={faqs}
        relatedToolsCategory="social-media"
        ctaTitle="Track engagement and comment activity with Rybbit"
        ctaDescription="Measure which content drives the most comments and engagement on your social media platforms."
        ctaEventLocation={`${platform.id}_comment_generator_cta`}
        structuredData={structuredData}
      />
    );
  }

  // It's a font generator
  const platformId = slug.replace("-font-generator", "");
  const platform = platformConfigs[platformId];

  // Handle invalid platform
  if (!platform) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: platform.displayName,
    description: platform.description,
    url: `https://rybbit.com/tools/${platform.id}-font-generator`,
    applicationCategory: "Utility",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Rybbit",
      url: "https://rybbit.com",
    },
  };

  const educationalContent = (
    <>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
        About {platform.name} Font Styles
      </h2>
      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
        {platform.educationalContent}
      </p>

      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
        How to Use
      </h3>
      <ol className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
        <li>
          <strong>Type your text</strong> in the input box above
        </li>
        <li>
          <strong>Browse the font styles</strong> that appear automatically
        </li>
        <li>
          <strong>Click "Copy"</strong> on any style you like
        </li>
        <li>
          <strong>Paste it</strong> into your {platform.name} posts, comments,
          or bio
        </li>
      </ol>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-6">
        <strong>Note:</strong> These fonts use Unicode characters and work
        across most platforms and devices. However, some fonts may not display
        correctly on older systems or certain applications.
      </p>
    </>
  );

  const fontFaqs = [
    {
      question: `How do ${platform.name} font generators work?`,
      answer: `This tool uses Unicode characters to transform your text into different font styles. Unicode includes thousands of special characters that look like styled versions of regular letters. When you type text, the generator maps each character to its Unicode equivalent in various styles.`,
    },
    {
      question: "Will these fonts work everywhere?",
      answer: `These Unicode fonts work on most modern platforms and devices, including ${platform.name}, other social media sites, messaging apps, and websites. However, some older systems or applications may not support all Unicode characters and might display them as boxes or question marks.`,
    },
    {
      question: "Can I use these fonts in my bio or username?",
      answer: `Yes! These Unicode fonts work in most text fields on ${platform.name}, including bios, usernames (where special characters are allowed), posts, comments, and messages. However, some platforms may have restrictions on special characters in certain fields.`,
    },
    {
      question: "Are these fonts safe to use?",
      answer:
        "Absolutely! These fonts use standard Unicode characters that are part of the official character encoding system. They're completely safe and won't harm your device or account. However, use them appropriately and avoid excessive styling that might reduce readability.",
    },
    {
      question: "Do I need to install anything?",
      answer:
        "No installation required! This is a web-based tool that works directly in your browser. Simply type your text, copy the style you like, and paste it wherever you want to use it. The Unicode characters are supported natively by most systems.",
    },
    {
      question: "How can Rybbit help me track my social media performance?",
      answer: (
        <>
          Rybbit helps you track clicks, engagement, and traffic sources from
          your {platform.name} posts and bio links. See which content drives the
          most engagement and optimize your social media strategy.{" "}
          <a
            href="https://rybbit.com"
            className="text-emerald-600 hover:text-emerald-500 underline"
          >
            Start tracking for free
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <ToolPageLayout
      toolSlug={`${platform.id}-font-generator`}
      title={platform.displayName}
      description={platform.description}
      badge="Free Tool"
      toolComponent={
        <FontGeneratorTool
          platformName={platform.name}
          characterLimit={platform.characterLimit}
        />
      }
      educationalContent={educationalContent}
      faqs={fontFaqs}
      relatedToolsCategory="social-media"
      ctaTitle="Track your social media engagement with Rybbit"
      ctaDescription="Monitor clicks, traffic sources, and content performance across all your social platforms."
      ctaEventLocation={`${platform.id}_font_generator_cta`}
      structuredData={structuredData}
    />
  );
}

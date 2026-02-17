import { Download } from "lucide-react";

export const metadata = {
  title: "Brand Kit",
  description:
    "Download official Rybbit logos and brand assets for use in your projects",
};

type Variant = {
  name: string;
  file: string;
  bg: "light" | "dark";
};

type LogoSection = {
  title: string;
  type: string;
  variants: Variant[];
};

const SECTIONS: LogoSection[] = [
  {
    title: "Horizontal",
    type: "horizontal",
    variants: [
      { name: "Default", file: "horizontal", bg: "light" },
      { name: "For Dark BG", file: "horizontal_for dark BG", bg: "dark" },
      { name: "Light Green", file: "horizontal_light green", bg: "dark" },
      { name: "Dark Green", file: "horizontal_dark green", bg: "light" },
      { name: "White", file: "horizontal_white", bg: "dark" },
      { name: "Black", file: "horizontal_black", bg: "light" },
    ],
  },
  {
    title: "Vertical",
    type: "vertical",
    variants: [
      { name: "Default", file: "vertical", bg: "light" },
      { name: "For Dark BG", file: "vertical_for dark BG", bg: "dark" },
      { name: "Light Green", file: "vertical_light green", bg: "dark" },
      { name: "Dark Green", file: "vertical_dark green", bg: "light" },
      { name: "White", file: "vertical_white", bg: "dark" },
      { name: "Black", file: "vertical_black", bg: "light" },
    ],
  },
  {
    title: "Frog Icon",
    type: "frog",
    variants: [
      { name: "Light Green", file: "frog_light green", bg: "dark" },
      { name: "Dark Green", file: "frog_dark green", bg: "light" },
      { name: "White", file: "frog_white", bg: "dark" },
      { name: "Black", file: "frog_black", bg: "light" },
    ],
  },
  {
    title: "Wordmark",
    type: "type",
    variants: [
      { name: "Dark Green", file: "type_dark green", bg: "light" },
      { name: "Light Green", file: "type_light green", bg: "dark" },
      { name: "White", file: "type_white", bg: "dark" },
      { name: "Black", file: "type_black", bg: "light" },
    ],
  },
];

function LogoCard({ variant }: { variant: Variant }) {
  const pngPath = `/rybbit/${variant.file}.png`;
  const svgPath = `/rybbit/${variant.file}.svg`;

  return (
    <div className="border border-neutral-300/50 dark:border-neutral-700/50 rounded-xl overflow-hidden">
      <div
        className={`flex items-center justify-center p-8 h-48 ${
          variant.bg === "dark" ? "bg-neutral-900" : "bg-neutral-100"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pngPath}
          alt={`Rybbit ${variant.name} logo`}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-4 bg-neutral-50/50 dark:bg-neutral-800/30">
        <p className="font-medium text-sm mb-3">{variant.name}</p>
        <div className="flex gap-2">
          <a
            href={svgPath}
            download
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
          >
            <Download className="w-3 h-3" />
            SVG
          </a>
          <a
            href={pngPath}
            download
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
          >
            <Download className="w-3 h-3" />
            PNG
          </a>
        </div>
      </div>
    </div>
  );
}

export default function BrandKit() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Brand Kit</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl">
        Download official Rybbit logos and assets. All logos are available in SVG
        and PNG formats for use in your projects, integrations, and content.
      </p>

      {SECTIONS.map((section) => (
        <section key={section.type} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">{section.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.variants.map((variant) => (
              <LogoCard key={variant.file} variant={variant} />
            ))}
          </div>
        </section>
      ))}

      <section className="border border-neutral-300/50 dark:border-neutral-700/50 rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-4">Usage Guidelines</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-green-600 dark:text-green-400 mb-3">
              Do
            </h3>
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li>Use the logo in its original proportions</li>
              <li>
                Use the &quot;For Dark BG&quot; variants on dark backgrounds
              </li>
              <li>Maintain clear space around the logo</li>
              <li>Use SVG format when possible for best quality</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-red-600 dark:text-red-400 mb-3">
              Don&apos;t
            </h3>
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li>Stretch or distort the logo</li>
              <li>Change the logo colors beyond provided variants</li>
              <li>Add effects like shadows or gradients to the logo</li>
              <li>Use the logo in a way that implies endorsement</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

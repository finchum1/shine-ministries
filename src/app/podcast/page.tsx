import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { podcastPlatforms, type PodcastPlatform } from "@/lib/podcast";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Good News Therapy — ${site.name}`,
  description: "Good News Therapy, the Shine Ministries podcast — coming soon.",
};

const tileClass =
  "flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-clay-900/8";

function PlatformIcon({ platform }: { platform: PodcastPlatform }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-7 w-7 shrink-0"
      fill={platform.color}
    >
      <path d={platform.icon} />
    </svg>
  );
}

// A platform with a link is a real button out to it; until its link is added
// in src/lib/podcast.ts, the logo still shows but isn't clickable.
function PlatformTile({ platform }: { platform: PodcastPlatform }) {
  const content = (
    <>
      <PlatformIcon platform={platform} />
      <span className="whitespace-nowrap text-sm font-medium text-clay-900">{platform.name}</span>
    </>
  );

  if (!platform.url) {
    return (
      <li>
        <div className={`${tileClass} cursor-default`} title="Link coming soon">
          {content}
        </div>
      </li>
    );
  }

  return (
    <li>
      <a
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Listen on ${platform.name}`}
        className={`${tileClass} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
      >
        {content}
      </a>
    </li>
  );
}

export default function PodcastPage() {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* soft warm glow behind the page, same feel as the home hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-terracotta-light/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-sage/15 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:py-24 md:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-clay-900">
            The Podcast
          </p>
          <h1 className="font-display text-5xl leading-tight text-clay-900 sm:text-6xl">
            Good News Therapy
          </h1>
          <p className="mt-5 inline-flex items-center rounded-full bg-honey-light px-5 py-2 text-sm font-semibold uppercase tracking-[0.15em] text-clay-900 ring-1 ring-honey/40">
            Coming soon
          </p>

          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-clay-700">
            Listen on
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {podcastPlatforms.map((platform) => (
              <PlatformTile key={platform.name} platform={platform} />
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto w-full max-w-sm md:max-w-md">
          <Image
            src="/podcast/good-news-therapy.jpg"
            alt="A smiling woman in a navy top with her arms crossed"
            width={1120}
            height={1345}
            priority
            sizes="(min-width: 768px) 448px, 90vw"
            className="h-auto w-full rounded-3xl shadow-lg shadow-clay-900/10 ring-1 ring-clay-900/5"
          />
        </Reveal>
      </div>
    </section>
  );
}

export interface FaqItem {
  id: string
  question: string
  /** blank lines split paragraphs; lines starting with "- " become a list */
  answer: string
  link?: { label: string; href: string }
}

interface FaqResponse {
  items: FaqItem[]
}

const API_BASE = (import.meta.env.VITE_ADMIN_API_URL as string || 'http://localhost:3001').replace(/\/$/, '')

// always shown, so the page has answers even when the admin backend is unreachable
export const BUILT_IN_FAQ: FaqItem[] = [
  {
    id: 'free',
    question: 'Is AMVerge free?',
    answer: 'Yes, completely. There are no subscriptions, paid tiers or watermarks, and you don\'t need an account to use it. AMVerge is also open source.',
  },
  {
    id: 'smartscreen',
    question: 'Why does Windows SmartScreen warn me about AMVerge?',
    answer: `SmartScreen warns you about apps from publishers Windows doesn't recognize yet. It's common for independent apps like this one, and it doesn't mean anything was found in the file.

AMVerge is fully open source, so anyone can read the code, and it's been downloaded over 10,000 times.

To continue, click More info, then Run anyway. Just make sure you downloaded it from amverge.app or our GitHub.`,
    link: { label: 'View the source code', href: 'https://github.com/AMVerge-team/AMVerge' },
  },
  {
    id: 'strong-pc',
    question: 'Do I need a strong PC to use AMVerge?',
    answer: `No. AMVerge has lighter options so it stays accessible on lower-end PCs:

- Keyframe detection finds scenes quickly without running AI, and works on any PC.
- WebP previews make small animated previews instead of a video clip for every scene.

A stronger PC gets you a smoother experience, and a good GPU helps most with AI scene detection and Scene Scout.`,
  },
  {
    id: 'data',
    question: 'Does AMVerge collect my data?',
    answer: `No. AMVerge doesn't collect your data, and your videos and clips never leave your PC. It's an offline app that only goes online to:

- Check for updates
- Show announcements from the AMVerge team on startup
- Load community events, and log in with Discord if you host one
- Download AI features, if you turn them on
- Send a bug report, only if you submit one
- Load images and videos on pages like Credits and Resources

While Discord is open, AMVerge can also show what you're working on as your Discord status, including the file name. You can change or turn this off in Settings.`,
  },
  {
    id: 'quality',
    question: 'Will exporting lower the quality of my clips?',
    answer: `Not with Fast Remux, which copies clips straight from your episode with no quality loss. Scenes that don't line up with the video's keyframes get re-encoded at high quality so they stay frame-exact.

You can also export everything in H.264, H.265 or ProRes.`,
  },
  {
    id: 'editors',
    question: 'Which editing software does it work with?',
    answer: `All the common ones. Clips export as regular video files, so you can drag them into After Effects, Premiere Pro, DaVinci Resolve or any other video editor.

With DaVinci Resolve Studio, AMVerge can also send clips straight to your timeline.`,
  },
  {
    id: 'ai-optional',
    question: 'Do I have to use the AI features?',
    answer: `No. AMVerge works fully without them, and they're off until you turn them on.

AI scene detection, Scene Scout and depth maps each download what they need when you switch them on, and you can remove them later to free up space.`,
  },
  {
    id: 'scene-scout',
    question: 'What is Scene Scout?',
    answer: `Scene Scout lets you search your episodes by describing what you want, like "wide shot". Index a show once, then preview and export any result like a regular clip.

It started as a standalone app by SonicFreak, who has since built it into AMVerge.`,
  },
  {
    id: 'formats',
    question: 'What video formats can I import?',
    answer: 'MP4, MKV, MOV, WebM, AVI, M4V and TS.',
  },
  {
    id: 'originals',
    question: 'Does AMVerge change my original episode files?',
    answer: 'No, your originals are never touched. AMVerge only reads them, and saves clips and previews as separate files.',
  },
  {
    id: 'non-anime',
    question: 'Does AMVerge work on videos that aren\'t anime?',
    answer: 'Yes, it works with any video file. The experience is built with anime editors in mind though, so that\'s where it feels most at home.',
  },
  {
    id: 'money',
    question: 'Is AMVerge making any money?',
    answer: `No. We make $0 from AMVerge and we don't ask for any contributions. We built it to make scene selection more fun for ourselves, and it doubles as portfolio work for our developers.

The best way to support us is leaving a star on our GitHub repository. That's the main thing we get out of making this, and it helps for our future career prospects.`,
    link: { label: 'Star AMVerge on GitHub', href: 'https://github.com/AMVerge-team/AMVerge' },
  },
]

export async function fetchFaqItems(): Promise<FaqItem[]> {
  const res = await fetch(`${API_BASE}/api/faq`)
  if (!res.ok) {
    throw new Error(`FAQ fetch failed: ${res.status}`)
  }
  const payload = (await res.json()) as FaqResponse
  return payload.items || []
}

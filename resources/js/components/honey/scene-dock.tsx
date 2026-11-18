import { gsap } from '@/hooks/use-scroll-animation';

export type Step = { title: string; text: string };

type Props = {
    eyebrow: string;
    title: React.ReactNode;
    steps: Step[];
};

/** Light "dock" card pinned to the bottom of a photo scene: title + numbered steps + progress bar. */
export default function SceneDock({ eyebrow, title, steps }: Props) {
    return (
        <div className="absolute inset-x-4 bottom-4 z-20 mx-auto max-w-5xl rounded-3xl bg-cream/95 p-5 shadow-2xl backdrop-blur-md md:bottom-8 md:p-6">
            <div className="grid gap-4 md:grid-cols-[1fr_2fr] md:gap-8">
                <div>
                    <p className="mb-1 text-xs font-semibold tracking-[0.3em] text-amber-deep uppercase">{eyebrow}</p>
                    <h2 className="font-display text-2xl leading-tight font-semibold text-comb md:text-3xl">{title}</h2>
                </div>
                <ol className="grid gap-3 md:grid-cols-3">
                    {steps.map((s, i) => (
                        <li key={s.title} data-step className="flex gap-3 opacity-40">
                            <span
                                data-badge
                                className="grid size-7 shrink-0 place-items-center rounded-full bg-[#e8d9b0] text-sm font-bold text-comb"
                            >
                                {i + 1}
                            </span>
                            <div>
                                <h3 className="font-semibold text-comb">{s.title}</h3>
                                <p className="text-sm text-comb/70">{s.text}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
            <div className="mt-4 h-1 overflow-hidden rounded bg-comb/10">
                <div data-bar className="h-full origin-left scale-x-0 bg-honey" />
            </div>
        </div>
    );
}

/** Highlights each step in turn on a scrubbed timeline of the given length. */
export function addSteps(tl: gsap.core.Timeline, root: HTMLElement, duration: number) {
    const q = gsap.utils.selector(root);
    const steps = q('[data-step]');
    const badges = q('[data-badge]');

    steps.forEach((s, i) => {
        const on = (i / steps.length) * duration;
        tl.to(s, { opacity: 1, duration: 0.2 }, on).to(badges[i], { backgroundColor: '#f5a623', duration: 0.2 }, on);

        if (i < steps.length - 1) {
            const off = ((i + 1) / steps.length) * duration;
            tl.to(s, { opacity: 0.4, duration: 0.2 }, off).to(badges[i], { backgroundColor: '#e8d9b0', duration: 0.2 }, off);
        }
    });
    tl.to(q('[data-bar]'), { scaleX: 1, duration, ease: 'none' }, 0);
}

/** Reduced-motion: show every step fully lit. */
export function settleSteps(root: HTMLElement) {
    const q = gsap.utils.selector(root);
    gsap.set(q('[data-step]'), { opacity: 1 });
    gsap.set(q('[data-bar]'), { scaleX: 1 });
}

import { ArrowDown } from 'lucide-react';
import { useMemo } from 'react';
import { gsap, useScrollAnimation } from '@/hooks/use-scroll-animation';
import Bee from './bee';
import Flower from './flower';
import { FRAME, SECTION } from './layout';

const FAR = [4, 14, 26, 38, 52, 64, 77, 90];
const NEAR = [-1, 12, 26, 44, 58, 72, 86, 98];

function seeded(i: number) {
    const x = Math.sin(i * 9301 + 49297) * 233280;

    return x - Math.floor(x);
}

export default function FlowerHero() {
    const pollen = useMemo(
        () =>
            Array.from({ length: 22 }).map((_, i) => ({
                left: `${seeded(i + 1) * 100}%`,
                top: `${35 + seeded(i + 40) * 60}%`,
                size: 3 + seeded(i + 90) * 5,
                delay: `${-seeded(i + 7) * 9}s`,
                dx: `${(seeded(i + 3) - 0.5) * 120}px`,
            })),
        [],
    );
    const bokeh = useMemo(
        () =>
            Array.from({ length: 9 }).map((_, i) => ({
                left: `${seeded(i + 11) * 100}%`,
                top: `${seeded(i + 21) * 60}%`,
                size: 40 + seeded(i + 31) * 90,
            })),
        [],
    );

    const ref = useScrollAnimation<HTMLElement>((root, reduced) => {
        const q = gsap.utils.selector(root);

        if (reduced) {
            return;
        }

        gsap.timeline({ defaults: { ease: 'power3.out' } })
            .from(q('[data-sun]'), { scale: 0.5, opacity: 0, duration: 2.2 })
            .from(q('[data-flower]'), { scale: 0, transformOrigin: '50% 100%', duration: 1.4, stagger: 0.06, ease: 'back.out(1.5)' }, 0.1)
            .from(q('[data-word]'), { yPercent: 115, duration: 1.2, stagger: 0.12 }, 0.5)
            .from(q('[data-fade]'), { opacity: 0, y: 22, duration: 0.9, stagger: 0.14 }, 1.2);

        gsap.fromTo(
            q('[data-bee]'),
            { x: '-30%', y: '30%', opacity: 0 },
            { x: '0%', y: '0%', opacity: 1, duration: 4, ease: 'sine.out', delay: 0.6 },
        );

        const st = { trigger: root, start: 'top top', end: 'bottom top', scrub: true };
        gsap.utils.toArray<HTMLElement>(q('[data-speed]')).forEach((el) => {
            gsap.to(el, { y: Number(el.dataset.speed) * 120, ease: 'none', scrollTrigger: st });
        });
        gsap.to(q('[data-stage]'), { scale: 1.12, ease: 'none', scrollTrigger: st });
    });

    return (
        <section id="garden" ref={ref} className={SECTION}>
            <div className={`${FRAME} bg-gradient-to-b from-[#bfe3f7] via-[#ffe9a8] to-[#ffc65c]`}>
                <div data-stage className="absolute inset-0 origin-[50%_90%]">
                    <div data-sun className="glow-pulse absolute -top-[10%] -left-[6%] size-[70%] rounded-full bg-[radial-gradient(circle,#fffdf0_0%,#fff3b8_30%,transparent_68%)]" />

                    {/* soft out-of-focus background, like a macro shot */}
                    <div data-speed="0.1" className="absolute inset-0" aria-hidden="true">
                        {bokeh.map((b, i) => (
                            <span key={i} className="absolute rounded-full bg-white/35 blur-md" style={{ left: b.left, top: b.top, width: b.size, height: b.size }} />
                        ))}
                    </div>
                    <svg data-speed="0.15" viewBox="0 0 1600 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-[22%] h-[30%] w-full blur-[3px]" aria-hidden="true">
                        <path d="M0 220 C220 120 420 260 700 190 S1200 90 1600 210 V400 H0Z" fill="#9fb85a" opacity="0.6" />
                    </svg>
                    <svg data-speed="0.25" viewBox="0 0 1600 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-[10%] h-[30%] w-full blur-[1px]" aria-hidden="true">
                        <path d="M0 200 C300 260 520 120 820 200 S1320 270 1600 170 V400 H0Z" fill="#82a23c" opacity="0.85" />
                    </svg>

                    <div data-speed="0.3" className="absolute inset-x-0 bottom-[10%] blur-[1.5px]">
                        {FAR.map((left, i) => (
                            <div key={left} data-flower className="absolute bottom-0 w-[6%] min-w-9" style={{ left: `${left}%` }}>
                                <div className="flower-sway" style={{ animationDelay: `${-i * 0.7}s` }}>
                                    <Flower stem={90 + (i % 3) * 25} petal={i % 2 ? '#ffe066' : '#ffc533'} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div data-speed="0.45" className="absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-t from-[#37521d] to-[#5a8236]" />

                    <div data-speed="0.6" className="absolute inset-x-0 -bottom-[3%]">
                        {NEAR.map((left, i) => (
                            <div key={left} data-flower className="absolute bottom-0" style={{ left: `${left}%`, width: i % 2 ? '12%' : '16%', minWidth: 70 }}>
                                <div className="flower-sway" style={{ animationDelay: `${-i * 0.9}s` }}>
                                    <Flower stem={160 + (i % 3) * 60} petal={i % 3 === 0 ? '#ffb81c' : '#ffd23f'} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                        {pollen.map((p, i) => (
                            <span key={i} className="pollen absolute rounded-full bg-[#fff6c8]" style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay, ['--dx' as string]: p.dx }} />
                        ))}
                    </div>
                </div>

                <div data-bee className="absolute top-[44%] left-[52%] z-10 w-[16%] min-w-[96px]">
                    <div className="bee-hover drop-shadow-[0_16px_14px_rgba(80,40,0,0.3)]">
                        <Bee />
                    </div>
                </div>

                <div className="relative z-20 flex h-full flex-col justify-start px-6 pt-[8%] sm:px-12 md:max-w-[60%]">
                    <p data-fade className="mb-4 text-xs font-semibold tracking-[0.3em] text-comb/70 uppercase">
                        Golden Hive · Raw Wildflower Honey
                    </p>
                    <h1 className="font-display text-[clamp(2.6rem,6.5vw,5.8rem)] leading-[0.98] font-semibold text-comb">
                        <span className="block overflow-hidden pb-1">
                            <span data-word className="inline-block">From Blossom</span>
                        </span>
                        <span className="block overflow-hidden pb-2">
                            <span data-word className="inline-block italic">to Bottle.</span>
                        </span>
                    </h1>
                    <p data-fade className="mt-4 max-w-md text-base text-comb/80 sm:text-lg">
                        Scroll to follow one bee — from the meadow, into the hive, and into your jar.
                    </p>
                    <div data-fade className="mt-6 flex flex-wrap gap-3">
                        <a href="#hive" className="inline-flex items-center gap-2 rounded-full bg-comb px-6 py-3 font-semibold text-cream transition hover:bg-night">
                            Start the journey
                            <ArrowDown className="size-4" aria-hidden="true" />
                        </a>
                        <a href="#shop" className="inline-flex items-center rounded-full bg-white/80 px-6 py-3 font-semibold text-comb backdrop-blur transition hover:bg-white">
                            Shop Honey
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

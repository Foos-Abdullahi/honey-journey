import { gsap, useScrollAnimation } from '@/hooks/use-scroll-animation';
import { FRAME, SECTION } from './layout';
import SceneDock, { addSteps, settleSteps } from './scene-dock';

const STEPS = [
    { title: 'Extract', text: 'Honey is spun from the comb — never heated.' },
    { title: 'Fill', text: 'It runs slowly into clean glass jars.' },
    { title: 'Strain', text: 'Fine mesh catches wax; pollen stays in.' },
];

export default function HoneyExtraction() {
    const ref = useScrollAnimation<HTMLElement>((root, reduced) => {
        const q = gsap.utils.selector(root);

        if (reduced) {
            settleSteps(root);

            return;
        }

        gsap.set(q('[data-stream]'), { scaleY: 0, transformOrigin: '50% 0%' });
        gsap.set(q('[data-pool]'), { yPercent: 100 });

        const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: root, start: 'top top', end: '+=220%', scrub: 0.8, pin: true, anticipatePin: 1 },
        });

        tl.to(q('[data-stream]'), { scaleY: 1, duration: 0.9 }, 0.1)
            .to(q('[data-pool]'), { yPercent: 0, duration: 2 }, 0.8)
            .to(q('[data-swirl]'), { rotate: 120, duration: 3 }, 0)
            .to(q('[data-lens]'), { scale: 1.08, duration: 3 }, 0);
        addSteps(tl, root, 3);
    });

    return (
        <section id="harvest" ref={ref} className={SECTION}>
            <div className={`${FRAME} bg-[radial-gradient(ellipse_at_50%_35%,#fff0c2_0%,#ffd985_55%,#f0a93a_100%)]`}>
                <div className="flex h-[62%] items-center justify-center pt-6 md:h-[68%]">
                    <div
                        data-lens
                        className="relative aspect-square h-full max-h-[420px] overflow-hidden rounded-full border-[6px] border-white/70 bg-[radial-gradient(circle_at_35%_30%,#ffe08a,#f5a623_45%,#8a4f08)] shadow-[0_0_80px_rgba(201,122,18,0.45)]"
                    >
                        <div data-swirl className="absolute inset-[-30%] bg-[conic-gradient(from_0deg,transparent,rgba(255,236,160,0.55),transparent_30%,rgba(138,79,8,0.4),transparent_70%)]" />
                        <div data-pool className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-b from-[#ffc94a] to-[#b8650a]">
                            <div className="absolute inset-x-0 top-0 h-3 bg-[#ffe9a0]/70 blur-[2px]" />
                            {[0, 1, 2].map((i) => (
                                <span key={i} className="ripple absolute top-[-6px] left-1/2 h-4 w-[60%] -translate-x-1/2 rounded-[50%] border border-white/60" style={{ animationDelay: `${-i * 1.05}s` }} />
                            ))}
                        </div>
                        <svg data-stream viewBox="0 0 40 300" preserveAspectRatio="none" className="absolute top-0 left-1/2 h-[62%] w-[9%] -translate-x-1/2" aria-hidden="true">
                            <path d="M10 0 H30 C27 80 24 150 24 300 H16 C16 150 13 80 10 0Z" fill="#ffcc50" />
                            <path d="M14 0 H18 C17 100 17 200 17 300 H15 C15 200 14 100 14 0Z" fill="#fff3b8" opacity="0.7" />
                        </svg>
                        <div className="pointer-events-none absolute top-[8%] left-[14%] h-[18%] w-[26%] -rotate-[24deg] rounded-[50%] bg-white/35 blur-xl" />
                    </div>
                </div>

                <SceneDock
                    eyebrow="The harvest"
                    title={
                        <>
                            Slow, golden, <span className="text-amber-deep italic">untouched.</span>
                        </>
                    }
                    steps={STEPS}
                />
            </div>
        </section>
    );
}

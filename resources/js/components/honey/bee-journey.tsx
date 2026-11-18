import { gsap, useScrollAnimation } from '@/hooks/use-scroll-animation';
import Bee from './bee';
import Flower from './flower';
import { FRAME, SECTION } from './layout';

/** Pinned scene: the bee flies to the hive, the camera dives through its doorway. */
export default function BeeJourney() {
    const ref = useScrollAnimation<HTMLElement>((root, reduced) => {
        const q = gsap.utils.selector(root);
        const stage = q('[data-journey]')[0] as HTMLElement;
        const bee = q('[data-bee]')[0] as HTMLElement;
        const entrance = q('[data-entrance]')[0] as unknown as SVGElement;

        const door = () => {
            const e = entrance.getBoundingClientRect();
            const s = stage.getBoundingClientRect();

            return { x: e.left - s.left + e.width / 2 - bee.offsetWidth / 2, y: e.top - s.top + e.height / 2 - bee.offsetHeight / 2 };
        };

        gsap.set(bee, { x: () => stage.clientWidth * 0.05, y: () => stage.clientHeight * 0.45 });

        if (reduced) {
            gsap.set(bee, { x: () => door().x, y: () => door().y });
            gsap.set(q('[data-caption="1"]'), { opacity: 0 });
            gsap.set(q('[data-caption="2"]'), { opacity: 1 });

            return;
        }

        gsap.timeline({
            defaults: { ease: 'sine.inOut' },
            scrollTrigger: { trigger: root, start: 'top top', end: '+=240%', scrub: 0.8, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
        })
            .to(bee, { x: () => stage.clientWidth * 0.28, y: () => stage.clientHeight * 0.3, duration: 1 })
            .to(bee, { x: () => stage.clientWidth * 0.5, y: () => stage.clientHeight * 0.58, duration: 1 })
            .to(bee, { x: () => door().x, y: () => door().y, duration: 1 })
            .to(q('[data-caption="1"]'), { opacity: 0, y: -30, duration: 0.6 }, 0.4)
            .to(q('[data-caption="2"]'), { opacity: 1, y: 0, duration: 0.6 }, 2.2)
            .to(bee, { scale: 0.2, opacity: 0, duration: 0.5 }, 3)
            .to(q('[data-caption="2"]'), { opacity: 0, duration: 0.4 }, 3.1)
            .to(q('[data-hive]'), { scale: 26, transformOrigin: '50% 74%', duration: 1.6, ease: 'power2.in' }, 3.2)
            .to(q('[data-fadeout]'), { opacity: 0, duration: 0.8 }, 3.4);
    });

    return (
        <section id="hive" ref={ref} className={SECTION}>
            <div className={`${FRAME} bg-comb`}>
                <div data-journey className="absolute inset-0 bg-gradient-to-b from-[#ffd88a] via-[#f3a93a] to-[#b8650a]">
                    <div data-fadeout className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-[#37521d] to-[#5a8236]" />
                    <div data-fadeout className="absolute bottom-[8%] left-[3%] flex w-[40%] gap-[3%]" aria-hidden="true">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="flower-sway w-1/3 min-w-12" style={{ animationDelay: `${-i}s` }}>
                                <Flower stem={110 + i * 30} />
                            </div>
                        ))}
                    </div>

                    <div data-hive className="absolute right-[8%] bottom-[15%] w-[clamp(170px,32%,380px)]">
                        <svg viewBox="0 0 200 240" className="w-full overflow-visible" aria-hidden="true">
                            <ellipse cx="100" cy="236" rx="90" ry="8" fill="#000" opacity="0.18" />
                            <rect x="92" y="196" width="16" height="44" fill="#5a3410" />
                            <rect x="40" y="228" width="120" height="8" rx="3" fill="#3b2208" />
                            {[
                                { y: 168, w: 170, c: '#d9962e' },
                                { y: 130, w: 152, c: '#e4a63c' },
                                { y: 94, w: 130, c: '#d9962e' },
                                { y: 60, w: 104, c: '#e4a63c' },
                            ].map((b) => (
                                <rect key={b.y} x={100 - b.w / 2} y={b.y} width={b.w} height="40" rx="18" fill={b.c} stroke="#8a4f08" strokeWidth="2" />
                            ))}
                            <path d="M62 66 C62 24 138 24 138 66Z" fill="#c8841f" stroke="#8a4f08" strokeWidth="2" />
                            <circle cx="100" cy="22" r="7" fill="#8a4f08" />
                            <path d="M84 196 v-14 a16 16 0 0 1 32 0 v14z" fill="#2a1604" data-entrance="" />
                        </svg>
                    </div>
                </div>

                <div data-bee className="absolute top-0 left-0 z-10 w-[clamp(70px,11%,130px)]">
                    <div className="bee-hover">
                        <Bee />
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 top-[10%] z-20 px-6 text-center">
                    <p data-caption="1" className="font-display text-[clamp(1.6rem,4vw,3.2rem)] leading-tight text-comb">
                        Every jar begins with
                        <br />a thousand flowers.
                    </p>
                    <p data-caption="2" className="absolute inset-x-0 top-0 font-display text-[clamp(1.6rem,4vw,3.2rem)] leading-tight text-cream opacity-0">
                        Then she carries the nectar
                        <br />
                        home to the hive.
                    </p>
                </div>
            </div>
        </section>
    );
}

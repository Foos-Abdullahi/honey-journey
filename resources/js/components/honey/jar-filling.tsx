import { gsap, useScrollAnimation } from '@/hooks/use-scroll-animation';
import Jar from './jar';
import { FRAME, SECTION } from './layout';

export default function JarFilling() {
    const ref = useScrollAnimation<HTMLElement>((root, reduced) => {
        const q = gsap.utils.selector(root);

        if (reduced) {
            gsap.set(q('[data-honey]'), { y: 0 });

            return;
        }

        const grams = { v: 0 };
        const counter = q('[data-grams]')[0] as HTMLElement;

        gsap.set(q('[data-honey]'), { y: 240 });
        gsap.set(q('[data-label]'), { opacity: 0, scale: 0.85, transformOrigin: '50% 50%' });
        gsap.set(q('[data-pour]'), { scaleY: 0, transformOrigin: '50% 0%' });

        gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: root, start: 'top top', end: '+=200%', scrub: 0.7, pin: true, anticipatePin: 1 },
        })
            .from(q('[data-jar]'), { yPercent: -110, opacity: 0, duration: 0.8, ease: 'power3.out' })
            .to(q('[data-pour]'), { scaleY: 1, duration: 0.3 }, 0.9)
            .to(q('[data-honey]'), { y: 0, duration: 2 }, 1.1)
            .to(grams, { v: 340, duration: 2, onUpdate: () => (counter.textContent = String(Math.round(grams.v))) }, 1.1)
            .to(q('[data-pour]'), { opacity: 0, duration: 0.3 }, 3.1)
            .to(q('[data-label]'), { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.6)' }, 3.2);
    });

    return (
        <section id="jar" ref={ref} className={SECTION}>
            <div className={`${FRAME} bg-[radial-gradient(ellipse_at_72%_50%,#ffe7a8_0%,#fff3d0_55%,#fff8e6_100%)]`}>
                <div className="grid h-full items-center gap-4 px-6 sm:px-12 md:grid-cols-2">
                    <div>
                        <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-amber-deep uppercase">Into the jar</p>
                        <h2 className="font-display text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.02] font-semibold text-comb">
                            Poured by hand.
                            <br />
                            <span className="text-amber-deep italic">Labelled with care.</span>
                        </h2>
                        <p className="mt-4 max-w-md text-comb/70">
                            Each jar is filled slowly so no air gets in, then sealed and labelled with its harvest season.
                        </p>
                        <p className="mt-6 font-display text-6xl text-comb">
                            <span data-grams>340</span>
                            <span className="ml-1 text-2xl text-comb/50">g</span>
                        </p>
                    </div>

                    <div className="relative flex justify-center">
                        <div data-jar className="relative w-[min(52%,36vh,300px)] min-w-36 drop-shadow-[0_30px_40px_rgba(138,79,8,0.35)] md:w-[min(60%,40vh,320px)]">
                            <svg data-pour viewBox="0 0 20 200" preserveAspectRatio="none" className="absolute -top-[45%] left-1/2 z-10 h-[72%] w-[5%] -translate-x-1/2" aria-hidden="true">
                                <path d="M3 0 H17 C14 80 12 140 11 200 H9 C8 140 6 80 3 0Z" fill="#f5a623" />
                            </svg>
                            <Jar honeyOffset={240} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { useMemo } from 'react';
import { gsap, useScrollAnimation } from '@/hooks/use-scroll-animation';
import Bee from './bee';
import { FRAME, SECTION } from './layout';
import SceneDock, { addSteps, settleSteps } from './scene-dock';

const R = 64;
const W = Math.sqrt(3) * R;

function hexPoints(cx: number, cy: number, r: number) {
    return Array.from({ length: 6 })
        .map((_, i) => {
            const a = (Math.PI / 180) * (60 * i - 30);

            return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
        })
        .join(' ');
}

const STEPS = [
    { title: 'Nectar arrives', text: 'Foragers carry it home from up to three miles away.' },
    { title: 'Fanned & ripened', text: 'Wings fan the nectar until the water is gone.' },
    { title: 'Capped in wax', text: 'Each ripe cell is sealed with fresh beeswax.' },
];

export default function HoneycombScene() {
    const cells = useMemo(() => {
        const out: { x: number; y: number }[] = [];

        for (let row = 0; row < 11; row++) {
            for (let col = 0; col < 16; col++) {
                out.push({ x: col * W + (row % 2 ? W / 2 : 0), y: row * R * 1.5 });
            }
        }

        return out;
    }, []);

    const ref = useScrollAnimation<HTMLElement>((root, reduced) => {
        const q = gsap.utils.selector(root);

        if (reduced) {
            gsap.set(q('[data-cell]'), { fill: '#f5a623' });
            settleSteps(root);

            return;
        }

        const tl = gsap.timeline({
            defaults: { ease: 'power2.out' },
            scrollTrigger: { trigger: root, start: 'top top', end: '+=220%', scrub: 0.8, pin: true, anticipatePin: 1 },
        });

        tl.from(q('[data-cell]'), { scale: 0, opacity: 0, transformOrigin: '50% 50%', duration: 1, stagger: { amount: 1.4, from: 'center', grid: [11, 16] } })
            .to(q('[data-cell]'), { fill: '#f5a623', duration: 0.6, stagger: { amount: 1.8, from: 'random' } }, 0.8)
            .to(q('[data-comb]'), { scale: 1.1, ease: 'none', duration: 3 }, 0)
            .to(q('[data-bee-s]'), { x: '260%', y: '-70%', duration: 3, ease: 'sine.inOut' }, 0);
        addSteps(tl, root, 3);
    });

    return (
        <section id="comb" ref={ref} className={SECTION}>
            <div className={`${FRAME} bg-comb`}>
                <svg data-comb viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
                    <defs>
                        <radialGradient id="cell-glow" cx="50%" cy="40%" r="70%">
                            <stop offset="0" stopColor="#fff3b0" stopOpacity="0.5" />
                            <stop offset="1" stopColor="#000" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <g transform="translate(0 -40)">
                        {cells.map((c, i) => (
                            <polygon key={i} data-cell points={hexPoints(c.x, c.y, R - 4)} fill="#7a4a0e" stroke="#fbd76b" strokeOpacity="0.6" strokeWidth="3" />
                        ))}
                    </g>
                    <rect width="1600" height="900" fill="url(#cell-glow)" />
                </svg>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/55 via-transparent to-night/70" />

                <div data-bee-s className="absolute top-[40%] left-[6%] w-[14%] min-w-20" aria-hidden="true">
                    <div className="bee-hover">
                        <Bee />
                    </div>
                </div>

                <SceneDock
                    eyebrow="Inside the hive"
                    title={
                        <>
                            Where nectar becomes <span className="text-amber-deep italic">honey.</span>
                        </>
                    }
                    steps={STEPS}
                />
            </div>
        </section>
    );
}

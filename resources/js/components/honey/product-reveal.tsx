import { Check, MoveHorizontal, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useRef, useState } from 'react';
import { gsap, useScrollAnimation } from '@/hooks/use-scroll-animation';
import Jar from './jar';

const SIZES = [
    { grams: 250, price: 12 },
    { grams: 340, price: 18 },
    { grams: 500, price: 25 },
];

const POINTS = ['Raw & unheated', 'Single-meadow wildflower', 'Free shipping over $40'];

export default function ProductReveal() {
    const label = useRef<SVGGElement>(null);
    const shine = useRef<SVGGElement>(null);
    const spin = useRef({ a: 0 });
    const [size, setSize] = useState(1);
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(0);

    const ref = useScrollAnimation<HTMLElement>((root, reduced) => {
        const q = gsap.utils.selector(root);

        if (!reduced) {
            gsap.from(q('[data-reveal]'), {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power2.out',
                scrollTrigger: { trigger: root, start: 'top 70%' },
            });
        }
    });

    // Turn the jar by moving the pointer across it: slide + squash the label, slide the glass highlight.
    const render = () => {
        const rad = (spin.current.a * Math.PI) / 180;

        if (label.current) {
            gsap.set(label.current, {
                x: Math.sin(rad) * 62,
                scaleX: Math.max(0.15, Math.cos(rad) * 0.65 + 0.35),
                transformOrigin: '50% 50%',
            });
        }

        if (shine.current) {
            gsap.set(shine.current, { x: -Math.sin(rad) * 14 });
        }
    };

    const turnTo = (e: React.PointerEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        const t = ((e.clientX - r.left) / r.width - 0.5) * 2; // -1..1
        gsap.to(spin.current, { a: t * 70, duration: 0.6, ease: 'power3.out', onUpdate: render });
    };

    const reset = () => gsap.to(spin.current, { a: 0, duration: 0.8, ease: 'power3.out', onUpdate: render });

    const total = SIZES[size].price * qty;

    return (
        <section id="shop" ref={ref} className="px-4 py-6 sm:px-6"><div className="relative mx-auto max-w-6xl overflow-hidden bg-[#fff3d0] py-16 sm:py-20">
            <div className="pointer-events-none absolute top-1/2 left-[28%] size-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,166,35,0.35)_0%,transparent_65%)]" />

            <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 sm:px-10 md:grid-cols-2">
                <div data-reveal className="flex flex-col items-center">
                    <div
                        className="w-[min(70vw,46vh,380px)] cursor-ew-resize touch-pan-y drop-shadow-[0_30px_40px_rgba(138,79,8,0.35)]"
                        onPointerMove={turnTo}
                        onPointerLeave={reset}
                    >
                        <Jar labelRef={label} shineRef={shine} />
                    </div>
                    <p className="mt-4 flex items-center gap-2 text-sm text-comb/60">
                        <MoveHorizontal className="size-4" aria-hidden="true" />
                        Move over the jar to turn it
                    </p>
                </div>

                <div>
                    <p data-reveal className="mb-2 text-xs font-semibold tracking-[0.3em] text-amber-deep uppercase">
                        The final product
                    </p>
                    <h2 data-reveal className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-semibold text-comb">
                        Golden Hive <span className="text-amber-deep italic">Wildflower Honey</span>
                    </h2>
                    <ul data-reveal className="mt-5 grid gap-2 text-comb/80">
                        {POINTS.map((p) => (
                            <li key={p} className="flex items-center gap-2">
                                <Check className="size-4 text-amber-deep" aria-hidden="true" />
                                {p}
                            </li>
                        ))}
                    </ul>

                    <fieldset data-reveal className="mt-7">
                        <legend className="mb-2 text-sm font-semibold text-comb">Jar size</legend>
                        <div className="flex flex-wrap gap-2">
                            {SIZES.map((s, i) => (
                                <button
                                    key={s.grams}
                                    type="button"
                                    aria-pressed={i === size}
                                    onClick={() => setSize(i)}
                                    className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                                        i === size
                                            ? 'border-comb bg-comb text-cream'
                                            : 'border-comb/20 bg-white text-comb hover:border-comb/50'
                                    }`}
                                >
                                    {s.grams} g
                                </button>
                            ))}
                        </div>
                    </fieldset>

                    <div data-reveal className="mt-6 flex flex-wrap items-center gap-4">
                        <div className="flex items-center rounded-full border border-comb/20 bg-white">
                            <button type="button" aria-label="Fewer jars" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 text-comb">
                                <Minus className="size-4" />
                            </button>
                            <span className="w-8 text-center font-semibold text-comb" aria-live="polite">{qty}</span>
                            <button type="button" aria-label="More jars" onClick={() => setQty((q) => Math.min(12, q + 1))} className="p-3 text-comb">
                                <Plus className="size-4" />
                            </button>
                        </div>
                        <p className="font-display text-3xl text-comb">${total}</p>
                    </div>

                    <div data-reveal className="mt-6">
                        <button
                            type="button"
                            onClick={() => setAdded((n) => n + qty)}
                            className="inline-flex items-center gap-2 rounded-full bg-honey px-8 py-4 text-base font-semibold text-comb shadow-[0_10px_30px_rgba(245,166,35,0.45)] transition hover:scale-105 hover:bg-honey-light"
                        >
                            <ShoppingBag className="size-5" aria-hidden="true" />
                            Shop Honey
                        </button>
                        <p className="mt-3 min-h-6 text-sm text-comb/70" role="status">
                            {added > 0 && `✓ ${added} jar${added > 1 ? 's' : ''} added to your cart (demo — checkout not connected yet)`}
                        </p>
                    </div>
                </div>
            </div>
        </div></section>
    );
}

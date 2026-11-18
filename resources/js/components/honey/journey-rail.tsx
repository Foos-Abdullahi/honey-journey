import { useEffect, useState } from 'react';

const STEPS = [
    { id: 'garden', label: 'Garden' },
    { id: 'hive', label: 'Hive' },
    { id: 'harvest', label: 'Harvest' },
    { id: 'jar', label: 'Jar' },
    { id: 'shop', label: 'Shop' },
];

/** Fixed side rail showing where you are in the journey; each dot jumps to its scene. */
export default function JourneyRail() {
    const [active, setActive] = useState('garden');

    useEffect(() => {
        const onScroll = () => {
            const mid = window.scrollY + window.innerHeight / 2;
            let current = STEPS[0].id;

            for (const s of STEPS) {
                const el = document.getElementById(s.id);
                // pinned sections sit in a pin-spacer; use its top when present
                const top = ((el?.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el)?.getBoundingClientRect().top ?? Infinity) + window.scrollY;

                if (top <= mid) {
                    current = s.id;
                }
            }

            setActive(current);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav aria-label="Journey progress" className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 md:block">
            <ol className="flex flex-col items-end gap-4">
                {STEPS.map((s, i) => {
                    const on = s.id === active;

                    return (
                        <li key={s.id}>
                            <a href={`#${s.id}`} className="group flex items-center gap-3" aria-current={on ? 'step' : undefined}>
                                <span
                                    className={`rounded-full bg-comb px-3 py-1 text-xs font-semibold text-cream transition ${
                                        on ? 'opacity-100' : 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                                    }`}
                                >
                                    {i + 1}. {s.label}
                                </span>
                                <span
                                    className={`block rounded-full border-2 border-comb transition-all ${
                                        on ? 'size-4 bg-honey' : 'size-3 bg-white/80 group-hover:bg-honey-light'
                                    }`}
                                />
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

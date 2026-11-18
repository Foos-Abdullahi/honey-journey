import { Hexagon, Menu, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [
    { href: '#garden', label: 'Garden' },
    { href: '#hive', label: 'Hive' },
    { href: '#harvest', label: 'Harvest' },
    { href: '#jar', label: 'Jar' },
];

/** Floating pill nav, kept inside the same max-w-6xl column as the scenes. */
export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className="fixed inset-x-0 top-3 z-50 px-4 sm:px-6">
            <div className="mx-auto max-w-6xl">
                <nav
                    aria-label="Primary"
                    className="relative flex h-14 items-center justify-between overflow-hidden rounded-full bg-cream/85 px-4 shadow-lg ring-1 ring-comb/10 backdrop-blur-md sm:px-6"
                >
                    <a href="#garden" className="flex items-center gap-2 font-display text-lg font-semibold text-comb">
                        <Hexagon className="size-6 fill-honey text-honey" aria-hidden="true" />
                        Golden Hive
                    </a>

                    <ul className="hidden items-center gap-8 text-sm text-comb/75 md:flex">
                        {links.map((l) => (
                            <li key={l.href}>
                                <a href={l.href} className="transition-colors hover:text-amber-deep">
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2">
                        <a href="#shop" className="inline-flex items-center gap-2 rounded-full bg-comb px-4 py-2 text-sm font-semibold text-cream transition hover:bg-night">
                            <ShoppingBag className="size-4" aria-hidden="true" />
                            Shop Honey
                        </a>
                        <button
                            type="button"
                            className="rounded-full p-2 text-comb md:hidden"
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                        >
                            {open ? <X className="size-5" /> : <Menu className="size-5" />}
                        </button>
                    </div>

                    <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-honey" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
                </nav>

                {open && (
                    <ul className="mt-2 flex flex-col rounded-3xl bg-cream/95 p-2 shadow-lg ring-1 ring-comb/10 backdrop-blur-md md:hidden">
                        {links.map((l) => (
                            <li key={l.href}>
                                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-lg text-comb hover:bg-comb/5">
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </header>
    );
}

import { Hexagon } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#f3e6c4] px-6 py-14 text-comb/70 sm:px-10">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="flex items-center gap-2 font-display text-2xl font-semibold text-comb">
                        <Hexagon className="size-6 fill-honey text-honey" aria-hidden="true" />
                        Golden Hive
                    </p>
                    <p className="mt-2 font-display text-lg text-amber-deep italic">From Blossom to Bottle.</p>
                </div>
                <nav aria-label="Footer" className="flex gap-6 text-sm">
                    <a href="#garden" className="hover:text-comb">Garden</a>
                    <a href="#harvest" className="hover:text-comb">Harvest</a>
                    <a href="#shop" className="hover:text-comb">Shop</a>
                </nav>
            </div>
            <p className="mx-auto mt-10 max-w-6xl border-t border-comb/10 pt-6 text-xs text-comb/50">
                © {new Date().getFullYear()} Golden Hive. Honey is not suitable for infants under 12 months.
            </p>
        </footer>
    );
}

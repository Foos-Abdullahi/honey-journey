import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Runs a GSAP setup function scoped to one section. Everything created inside
 * is reverted on unmount. `reduced` is true when the visitor prefers reduced
 * motion — setup should then skip scrubbed/pinned motion and leave the final
 * (readable) state in place.
 */
export function useScrollAnimation<T extends HTMLElement>(
    setup: (root: T, reduced: boolean) => void,
) {
    const ref = useRef<T>(null);

    useLayoutEffect(() => {
        const root = ref.current;

        if (!root) {
            return;
        }

        const mm = gsap.matchMedia();

        mm.add(
            {
                full: '(prefers-reduced-motion: no-preference)',
                reduced: '(prefers-reduced-motion: reduce)',
            },
            (ctx) => {
                setup(root, Boolean(ctx.conditions?.reduced));
            },
            root,
        );

        return () => mm.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ref;
}

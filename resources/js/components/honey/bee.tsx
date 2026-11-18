import { useId } from 'react';

type Props = { className?: string };

/** Side-view bee facing right, with fuzzy thorax, veined wings and a soft shadow. Wings flap via `.bee-wing`. */
export default function Bee({ className }: Props) {
    const id = useId().replace(/:/g, '');

    return (
        <svg viewBox="0 0 160 110" className={className} aria-hidden="true" overflow="visible">
            <defs>
                <clipPath id={`bb-${id}`}>
                    <ellipse cx="76" cy="66" rx="42" ry="27" />
                </clipPath>
                <radialGradient id={`bs-${id}`} cx="38%" cy="28%" r="85%">
                    <stop offset="0" stopColor="#ffe08a" />
                    <stop offset="0.55" stopColor="#f2a72b" />
                    <stop offset="1" stopColor="#b8650a" />
                </radialGradient>
                <radialGradient id={`bf-${id}`} cx="50%" cy="40%" r="60%">
                    <stop offset="0" stopColor="#f6c562" />
                    <stop offset="1" stopColor="#c98a2a" />
                </radialGradient>
                <linearGradient id={`bw-${id}`} x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
                    <stop offset="1" stopColor="#dbe9f2" stopOpacity="0.4" />
                </linearGradient>
            </defs>

            {/* far wing */}
            <g className="bee-wing" style={{ animationDelay: '-0.04s' }}>
                <ellipse cx="64" cy="36" rx="30" ry="14" transform="rotate(-34 64 36)" fill={`url(#bw-${id})`} opacity="0.5" />
            </g>

            {/* legs */}
            <g stroke="#2a1a08" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M66 90 l-8 8 l-4 8" />
                <path d="M82 92 l0 10 l-2 8" />
                <path d="M98 90 l8 9 l5 6" />
            </g>

            {/* stinger */}
            <path d="M34 66 l-16 3 l16 5 z" fill="#2a1a08" />

            {/* abdomen + stripes */}
            <ellipse cx="76" cy="66" rx="42" ry="27" fill={`url(#bs-${id})`} />
            <g clipPath={`url(#bb-${id})`} fill="#2a1a08">
                <path d="M50 36 q-6 30 0 60 h10 q-6 -30 0 -60z" />
                <path d="M68 34 q-6 32 0 64 h11 q-6 -32 0 -64z" />
                <path d="M88 36 q-5 30 0 60 h10 q-5 -30 0 -60z" />
                <ellipse cx="62" cy="48" rx="26" ry="8" fill="#fff" opacity="0.18" />
            </g>

            {/* fuzzy thorax */}
            <circle cx="104" cy="60" r="22" fill={`url(#bf-${id})`} />
            <g stroke="#e9b34c" strokeWidth="1.6" strokeLinecap="round" opacity="0.9">
                {Array.from({ length: 16 }).map((_, i) => {
                    const a = (i / 16) * Math.PI * 2;

                    return <line key={i} x1={104 + Math.cos(a) * 18} y1={60 + Math.sin(a) * 18} x2={104 + Math.cos(a) * 24} y2={60 + Math.sin(a) * 24} />;
                })}
            </g>

            {/* head */}
            <circle cx="124" cy="62" r="15" fill="#2a1a08" />
            <ellipse cx="129" cy="57" rx="6" ry="8" fill="#0d0805" />
            <ellipse cx="127" cy="53" rx="2" ry="3" fill="#fff" opacity="0.7" />
            <path d="M121 49 q-6 -16 -18 -18 M129 48 q2 -16 14 -20" stroke="#2a1a08" strokeWidth="2.6" strokeLinecap="round" fill="none" />

            {/* near wing with veins */}
            <g className="bee-wing">
                <ellipse cx="88" cy="36" rx="34" ry="17" transform="rotate(-20 88 36)" fill={`url(#bw-${id})`} stroke="#fff" strokeOpacity="0.8" strokeWidth="1" />
                <path d="M62 44 L108 24 M72 46 L112 34 M82 46 L112 42" stroke="#9fb7c6" strokeOpacity="0.55" strokeWidth="0.8" fill="none" />
            </g>
        </svg>
    );
}

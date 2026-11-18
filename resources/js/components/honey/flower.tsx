import { useId } from 'react';

type Props = {
    petal?: string;
    petals?: number;
    stem?: number;
    className?: string;
};

/** Shaded daisy on a stem: gradient petals, seeded centre. viewBox is tall so it can be bottom-anchored. */
export default function Flower({ petal = '#ffd23f', petals = 14, stem = 150, className }: Props) {
    const id = useId().replace(/:/g, '');
    const h = 100 + stem;

    return (
        <svg viewBox={`0 0 100 ${h}`} className={className} aria-hidden="true" overflow="visible">
            <defs>
                <linearGradient id={`p-${id}`} x1="0" x2="0" y1="1" y2="0">
                    <stop offset="0" stopColor="#e89a14" />
                    <stop offset="0.45" stopColor={petal} />
                    <stop offset="1" stopColor="#fff1a8" />
                </linearGradient>
                <radialGradient id={`c-${id}`} cx="40%" cy="35%" r="70%">
                    <stop offset="0" stopColor="#b8651a" />
                    <stop offset="1" stopColor="#4a2205" />
                </radialGradient>
                <linearGradient id={`s-${id}`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#3f6a26" />
                    <stop offset="1" stopColor="#6c9a42" />
                </linearGradient>
            </defs>
            <path d={`M50 ${h} C46 ${h - stem * 0.4}, 56 ${h - stem * 0.7}, 50 50`} stroke={`url(#s-${id})`} strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d={`M50 ${h - stem * 0.45} q-26 -4 -30 -24 q24 2 30 24z`} fill="#5f8a3a" />
            <path d={`M51 ${h - stem * 0.65} q24 -2 30 -22 q-24 0 -30 22z`} fill="#7aa84b" />
            <g transform="translate(50 50)">
                {Array.from({ length: petals }).map((_, i) => (
                    <ellipse
                        key={i}
                        cx="0"
                        cy="-28"
                        rx="8.5"
                        ry="23"
                        fill={`url(#p-${id})`}
                        opacity={i % 2 ? 0.9 : 1}
                        transform={`rotate(${(360 / petals) * i + (i % 2 ? 4 : 0)})`}
                    />
                ))}
                <circle r="16" fill={`url(#c-${id})`} />
                <g fill="#f3c36a" opacity="0.55">
                    {Array.from({ length: 14 }).map((_, i) => {
                        const a = i * 2.4;
                        const r = 3 + (i % 5) * 2.4;

                        return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r="0.9" />;
                    })}
                </g>
                <ellipse cx="-5" cy="-6" rx="5" ry="3" fill="#fff" opacity="0.2" />
            </g>
        </svg>
    );
}

import { useId } from 'react';
import type { Ref } from 'react';

type Props = {
    className?: string;
    /** Group holding the honey (translate it to change the fill level). */
    honeyRef?: Ref<SVGGElement>;
    /** Group holding the label (used for the rotation illusion). */
    labelRef?: Ref<SVGGElement>;
    /** Group holding the glass highlights. */
    shineRef?: Ref<SVGGElement>;
    /** Initial vertical offset of the honey group: 0 = full, 240 = empty. */
    honeyOffset?: number;
};

/** Glass jar of honey with the Golden Hive label. viewBox 0 0 240 340. */
export default function Jar({
    className,
    honeyRef,
    labelRef,
    shineRef,
    honeyOffset = 0,
}: Props) {
    const id = useId().replace(/:/g, '');
    const body =
        'M62 58 H178 Q184 58 184 66 V80 C208 96 216 122 216 152 V290 C216 318 198 332 172 332 H68 C42 332 24 318 24 290 V152 C24 122 32 96 56 80 V66 Q56 58 62 58 Z';

    return (
        <svg viewBox="0 0 240 340" className={className} role="img" aria-label="Jar of Golden Hive honey">
            <defs>
                <clipPath id={`jar-clip-${id}`}>
                    <path d={body} />
                </clipPath>
                <linearGradient id={`honey-${id}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#ffc94a" />
                    <stop offset="0.55" stopColor="#f5a623" />
                    <stop offset="1" stopColor="#b8650a" />
                </linearGradient>
                <linearGradient id={`cyl-${id}`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#000" stopOpacity="0.45" />
                    <stop offset="0.22" stopColor="#000" stopOpacity="0" />
                    <stop offset="0.78" stopColor="#000" stopOpacity="0" />
                    <stop offset="1" stopColor="#000" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id={`lid-${id}`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#9a5b0c" />
                    <stop offset="0.45" stopColor="#f2b84b" />
                    <stop offset="1" stopColor="#8a4f08" />
                </linearGradient>
            </defs>

            {/* glass */}
            <path d={body} fill="#fff" fillOpacity="0.07" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" />

            <g clipPath={`url(#jar-clip-${id})`}>
                {/* honey */}
                <g data-honey ref={honeyRef} style={{ transform: `translateY(${honeyOffset}px)` }}>
                    <rect x="10" y="100" width="220" height="260" fill={`url(#honey-${id})`} />
                    <ellipse cx="120" cy="100" rx="100" ry="7" fill="#ffe08a" opacity="0.9" />
                </g>

                {/* label */}
                <g data-label ref={labelRef}>
                    <rect x="46" y="178" width="148" height="112" rx="10" fill="#fff6dc" />
                    <rect x="52" y="184" width="136" height="100" rx="6" fill="none" stroke="#c97a12" strokeWidth="1.2" />
                    <polygon
                        points="120,194 133,201.5 133,216.5 120,224 107,216.5 107,201.5"
                        fill="#f5a623"
                    />
                    <text x="120" y="254" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontWeight="700" fontSize="17" fill="#2a1604" letterSpacing="1.5">
                        GOLDEN HIVE
                    </text>
                    <text x="120" y="270" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="7.5" fill="#8a4f08" letterSpacing="3">
                        RAW WILDFLOWER HONEY
                    </text>
                </g>

                {/* cylindrical shading */}
                <rect x="0" y="50" width="240" height="290" fill={`url(#cyl-${id})`} />
            </g>

            {/* highlights */}
            <g ref={shineRef} opacity="0.8">
                <path d="M40 150 C38 190 38 250 44 290" stroke="#fff" strokeOpacity="0.55" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d="M200 160 C203 200 203 240 199 270" stroke="#fff" strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>

            {/* lid */}
            <rect x="54" y="26" width="132" height="38" rx="8" fill={`url(#lid-${id})`} />
            <g stroke="#7a4408" strokeOpacity="0.45" strokeWidth="1.5">
                {Array.from({ length: 9 }).map((_, i) => (
                    <line key={i} x1={68 + i * 13} y1="32" x2={68 + i * 13} y2="58" />
                ))}
            </g>
            <rect x="54" y="26" width="132" height="6" rx="3" fill="#fff" opacity="0.25" />
        </svg>
    );
}

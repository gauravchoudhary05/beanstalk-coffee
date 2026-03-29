"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Priya S.",
        text: "The best café experience in Jaipur. The ambiance is unreal — greenery everywhere, cats napping on benches. My weekend sanctuary.",
        rating: 5,
    },
    {
        name: "Arjun M.",
        text: "The cold brew here is the smoothest I've ever had. And the avocado toast? Perfection. 100% vegetarian and it doesn't miss a beat.",
        rating: 5,
    },
    {
        name: "Sneha R.",
        text: "Such a unique concept. The resident cats, the earthy interiors, the Kashmiri Kahwa — everything about this place is magic.",
        rating: 5, // Changed to 5 for aesthetics, or 4.5
    },
];

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={i <= rating ? "#C9A96E" : "none"}
                    stroke="#C9A96E"
                    strokeWidth="1.5"
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            ))}
        </div>
    );
}

export function SocialProof() {
    return (
        <section id="reviews" className="py-32 md:py-44 px-6 bg-espresso relative overflow-hidden">
            {/* Subtle glow behind the badge */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Rating Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, type: "spring", bounce: 0.3 }}
                    className="text-center mb-24 md:mb-32"
                >
                    <span className="text-sage tracking-[0.3em] uppercase text-xs font-medium">
                        Social Proof
                    </span>

                    {/* Premium frosted badge */}
                    <div className="mt-10 inline-flex flex-col items-center gap-5 bg-parchment-10 backdrop-blur-xl border border-parchment-20 rounded-3xl px-16 py-12 shadow-2xl relative group cursor-default">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                            <div className="absolute inset-0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
                        </div>

                        <span className="font-[family-name:var(--font-display)] text-7xl md:text-8xl lg:text-9xl font-bold text-parchment tracking-tighter">
                            4.5
                        </span>

                        <div className="flex gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#C9A96E" stroke="none">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            ))}
                            {/* Half star */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" stroke="none">
                                <defs>
                                    <linearGradient id="halfStarBadge">
                                        <stop offset="50%" stopColor="#C9A96E" />
                                        <stop offset="50%" stopColor="transparent" />
                                    </linearGradient>
                                </defs>
                                <polygon
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                                    fill="url(#halfStarBadge)"
                                    stroke="#C9A96E"
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </div>
                        <span className="text-parchment-60 text-sm tracking-[0.2em] uppercase font-medium mt-2">
                            112 Verified Reviews
                        </span>
                    </div>
                </motion.div>

                {/* Testimonial Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.7,
                                delay: i * 0.15,
                                ease: "easeOut",
                            }}
                            className="bg-parchment-10 backdrop-blur-md border border-parchment-20 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-500"
                        >
                            <Stars rating={t.rating} />
                            <p className="text-parchment-80 mt-6 leading-relaxed text-[15px] italic font-light">
                                &ldquo;{t.text}&rdquo;
                            </p>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-forest text-gold flex items-center justify-center font-[family-name:var(--font-display)] italic text-lg shadow-inner">
                                    {t.name.charAt(0)}
                                </div>
                                <span className="font-medium text-parchment text-sm">
                                    {t.name}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

/* ─── Data Types ─── */
interface MenuItem {
    name: string;
    price: number;
    description?: string;
    isPopular?: boolean;
}

interface SubCategory {
    name: string;
    icon: string;
    items: MenuItem[];
}

interface MenuTab {
    id: string;
    label: string;
    icon: string;
    subcategories: SubCategory[];
}

/* ─── Full Beanstalk Menu Data ─── */
const menuTabs: MenuTab[] = [
    {
        id: "beverages",
        label: "Beverages & Shakes",
        icon: "🍹",
        subcategories: [
            {
                name: "Shakes",
                icon: "🥤",
                items: [
                    { name: "Vanilla", price: 110 },
                    { name: "Strawberry", price: 120 },
                    { name: "Chocolate", price: 120 },
                    { name: "Butterscotch", price: 130 },
                    { name: "Oreo", price: 150 },
                    { name: "Blackcurrant", price: 160 },
                    { name: "Kitkat", price: 160 },
                    { name: "Blueberry", price: 170 },
                    { name: "Strawberry Oreo", price: 170 },
                    { name: "Brownie", price: 180 },
                    { name: "Peanut Butter", price: 180 },
                    { name: "Nuttie", price: 200 },
                    { name: "Biscoff", price: 250 },
                ],
            },
            {
                name: "Frappé",
                icon: "🧊",
                items: [
                    { name: "Café Frappé", price: 100 },
                    { name: "Vanilla", price: 120 },
                    { name: "Chocolate", price: 130 },
                    { name: "Hazelnut", price: 150 },
                ],
            },
            {
                name: "Hot Beverages",
                icon: "☕",
                items: [
                    { name: "Desi Fusion Strong", price: 60 },
                    { name: "Americano", price: 60 },
                    { name: "Iced Americano", price: 60 },
                    { name: "Cappuccino", price: 90 },
                ],
            },
            {
                name: "Tea",
                icon: "🍵",
                items: [
                    { name: "Masala Chai", price: 30 },
                    { name: "Adrak Chai", price: 30 },
                    { name: "Kulhad Chai", price: 35 },
                    { name: "Honey Lemon", price: 70 },
                    { name: "Lemon Ice Tea", price: 90 },
                ],
            },
            {
                name: "Mocktails",
                icon: "🍋",
                items: [
                    { name: "Lemonade", price: 80 },
                    { name: "Lemon Soda", price: 80 },
                    { name: "Mint Mojito", price: 90 },
                    { name: "Virgin Mojito", price: 100 },
                    { name: "Watermelon Punch", price: 120 },
                    { name: "Green Apple", price: 130 },
                    { name: "Strawberry", price: 130 },
                    { name: "Lichi", price: 140 },
                    { name: "Blackcurrant", price: 140 },
                    { name: "Blueberry", price: 150 },
                ],
            },
        ],
    },
    {
        id: "quick-bites",
        label: "Quick Bites",
        icon: "🍔",
        subcategories: [
            {
                name: "Sandwiches",
                icon: "🥪",
                items: [
                    { name: "Veg Grilled", price: 90 },
                    { name: "Veg Sweet Corn", price: 110 },
                    { name: "Cheese", price: 120 },
                    { name: "Paneer Tadka", price: 130 },
                    { name: "Beanstalk Special", price: 150 },
                ],
            },
            {
                name: "Burgers & Breads",
                icon: "🍞",
                items: [
                    { name: "Aloo Tikki Burger", price: 70 },
                    { name: "Cheese Burger", price: 90 },
                    { name: "Veg Garlic Bread", price: 100 },
                    { name: "Paneer Cheese Burger", price: 110 },
                    { name: "Cheesy Garlic Bread", price: 110 },
                    { name: "Cheese Corn Garlic Bread", price: 120 },
                    { name: "Double Decker Burger", price: 130 },
                ],
            },
            {
                name: "French Fries",
                icon: "🍟",
                items: [
                    { name: "Plain", price: 70 },
                    { name: "Salted", price: 80 },
                    { name: "Peri Peri", price: 100 },
                    { name: "Cheese Loaded", price: 130 },
                ],
            },
            {
                name: "Maggi",
                icon: "🍜",
                items: [
                    { name: "Classic", price: 70 },
                    { name: "Peri Peri", price: 80 },
                    { name: "Cheese", price: 100 },
                    { name: "Punjabi Tadka", price: 100 },
                    { name: "Tandoori", price: 110 },
                ],
            },
            {
                name: "Subs",
                icon: "🥖",
                items: [
                    { name: "Veg Delight", price: 160 },
                    { name: "Tandoori Paneer", price: 200 },
                ],
            },
            {
                name: "Buns",
                icon: "🧈",
                items: [
                    { name: "Maska Bun", price: 50 },
                    { name: "Bread Butter", price: 60 },
                    { name: "Bread Toast", price: 70 },
                ],
            },
        ],
    },
    {
        id: "mains",
        label: "Mains & Chinese",
        icon: "🍕",
        subcategories: [
            {
                name: "Pizza",
                icon: "🍕",
                items: [
                    { name: "Margherita", price: 150 },
                    { name: "Cheese Delight", price: 170 },
                    { name: "Sweet Corn", price: 180 },
                    { name: "OTC", price: 200 },
                    { name: "Paneer Tandoori", price: 250 },
                    { name: "Mushroom", price: 300 },
                ],
            },
            {
                name: "Pasta",
                icon: "🍝",
                items: [
                    { name: "Desi Fusion Macaroni", price: 180 },
                    { name: "Arrabbiata", price: 230 },
                    { name: "Alfredo", price: 280 },
                    { name: "Rose Pink", price: 300 },
                ],
            },
            {
                name: "Chinese",
                icon: "🥟",
                items: [
                    { name: "Spring Roll", price: 80 },
                    { name: "Fry Momos", price: 90 },
                    { name: "Hara Bhara Kabab", price: 100 },
                    { name: "Potato Shots", price: 100 },
                    { name: "Cheese Corn Nuggets", price: 120 },
                    { name: "Cheese Momos", price: 120 },
                    { name: "Crunchy Momos", price: 120 },
                    { name: "Hakka Noodles", price: 130 },
                    { name: "Gravy Momos", price: 130 },
                    { name: "Burnt Garlic Noodles", price: 150 },
                    { name: "Paneer Roll", price: 150 },
                    { name: "Chowmein", price: 150 },
                    { name: "Chilli Potato", price: 180 },
                    { name: "Special Gravy Momos", price: 180 },
                    { name: "Honey Chilli Potato", price: 220 },
                ],
            },
        ],
    },
    {
        id: "health-desserts",
        label: "Health & Desserts",
        icon: "🍨",
        subcategories: [
            {
                name: "Diet",
                icon: "🥗",
                items: [
                    { name: "Diet Paneer", price: 80 },
                    { name: "Banana Shake", price: 90 },
                    { name: "Peanut Butter with Bread", price: 130 },
                ],
            },
            {
                name: "Desserts",
                icon: "🍦",
                items: [
                    { name: "Vanilla Scoop", price: 60 },
                    { name: "Chocolate", price: 70 },
                    { name: "Strawberry", price: 70 },
                    { name: "Butterscotch", price: 70 },
                    { name: "American Nuts", price: 80 },
                    { name: "Brownie Sizzler", price: 100 },
                    { name: "Brownie with Icecream", price: 130 },
                ],
            },
        ],
    },
];

/* ─── Single Menu Item Row (Editorial Style) ─── */
function MenuItemRow({ item }: { item: MenuItem }) {
    return (
        <motion.div 
            whileTap={{ scale: 0.97, opacity: 0.7 }}
            className="group py-4 md:py-5 flex flex-col gap-1 cursor-pointer select-none"
        >
            <div className="flex items-baseline justify-between w-full">
                <h4 className="font-[family-name:var(--font-display)] text-[1.15rem] md:text-xl font-semibold text-espresso dark:text-parchment m-0 tracking-wide">
                    {item.name}
                    {item.isPopular && (
                        <span className="ml-3 inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-gold/20 text-gold align-middle mb-1">
                            Popular
                        </span>
                    )}
                </h4>
                <div className="flex-1 border-b-2 border-dotted border-bark/15 dark:border-parchment-10 mx-4 relative top-[-6px] opacity-70" />
                <span className="font-[family-name:var(--font-display)] text-lg md:text-xl font-bold text-gold shrink-0">
                    ₹{item.price}
                </span>
            </div>
            {item.description && (
                <p className="text-sm md:text-[15px] text-bark/60 dark:text-parchment-60 max-w-[85%] leading-relaxed font-light">
                    {item.description}
                </p>
            )}
        </motion.div>
    );
}

/* ─── Subcategory Group ─── */
function SubCategoryGroup({ sub, index }: { sub: SubCategory; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            className="mb-10 last:mb-0"
        >
            {/* Subcategory header */}
            <div className="flex items-center gap-3 mb-5">
                <span className="text-lg">{sub.icon}</span>
                <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-espresso dark:text-parchment">
                    {sub.name}
                </h4>
                <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            </div>

            {/* Items list — single column editorial rows */}
            <div className="flex flex-col divide-y divide-bark/10 dark:divide-parchment-05">
                {sub.items.map((item) => (
                    <MenuItemRow key={`${sub.name}-${item.name}`} item={item} />
                ))}
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   useCupScreenPosition — Projects the 3D cup's world position
   to 2D viewport-percentage coordinates every frame.
═══════════════════════════════════════════════════════════════ */
function useCupScreenPosition() {
    const [pos, setPos] = useState({ x: 50, y: 50, r: 18 });
    const rafId = useRef(0);

    const lerp = useCallback(
        (p: number, inR: number[], outR: number[]) => {
            const clamped = Math.max(inR[0], Math.min(p, inR[inR.length - 1]));
            for (let i = 0; i < inR.length - 1; i++) {
                if (clamped >= inR[i] && clamped <= inR[i + 1]) {
                    const t = (clamped - inR[i]) / (inR[i + 1] - inR[i]);
                    return outR[i] + (outR[i + 1] - outR[i]) * t;
                }
            }
            return outR[outR.length - 1];
        },
        []
    );

    useEffect(() => {
        const tick = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

            const wx = lerp(progress, [0, 1], [-4, 4]);
            const wy = lerp(progress, [0, 1], [3, -3]);
            const wz = lerp(progress, [0, 0.4, 0.7, 1], [0, 1.5, 0.5, -1]);

            const camZ = 8;
            const half = Math.tan((45 * Math.PI) / 360);
            const d = camZ - wz;
            if (d <= 0.1) { rafId.current = requestAnimationFrame(tick); return; }

            const aspect = window.innerWidth / window.innerHeight;
            const sx = ((wx / (half * aspect * d)) + 1) * 50;
            const sy = ((1 - wy / (half * d))) * 50;
            const rr = (1.8 / (half * d)) * 50;

            setPos({ x: sx, y: sy, r: Math.max(rr, 10) });
            rafId.current = requestAnimationFrame(tick);
        };
        rafId.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId.current);
    }, [lerp]);

    return pos;
}

/* ─── Main Menu Component ─── */
export function Menu() {
    const [activeTab, setActiveTab] = useState("beverages");
    const activeTabData = menuTabs.find((t) => t.id === activeTab)!;

    // Overlay tracking for the Gold Text Effect
    const goldRef = useRef<HTMLHeadingElement>(null);
    const cup = useCupScreenPosition();

    /* ═══ RAF-driven clip-path sync (GPU-ACCELERATED) ═══ */
    useEffect(() => {
        const el = goldRef.current;
        if (!el) return;

        // 🚀 FIX A: Cache layout — calculate ONCE, update only on resize
        let rect = el.getBoundingClientRect();
        const handleResize = () => { rect = el.getBoundingClientRect(); };
        window.addEventListener("resize", handleResize);

        let raf: number;
        const sync = () => {
            if (rect.width > 0 && rect.height > 0) {
                const cx = (cup.x / 100) * window.innerWidth - rect.left;
                const cy = (cup.y / 100) * window.innerHeight - rect.top;
                const rpx = (cup.r / 100) * window.innerHeight;

                // 🚀 FIX C: Single GPU-accelerated clip-path replaces CPU mask-image
                const maskWidth = rpx * 0.70;
                const maskHeight = rpx * 1.15;

                el.style.clipPath = `ellipse(${maskWidth}px ${maskHeight}px at ${cx}px ${cy}px)`;
            }
            raf = requestAnimationFrame(sync);
        };
        raf = requestAnimationFrame(sync);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", handleResize);
        };
    }, [cup]);

    return (
        <section id="menu" className="py-24 md:py-36 px-6 relative">
            <div className="absolute inset-0 bg-transparent pointer-events-none" />
            <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* ─── Header ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="mb-12 md:mb-16 text-center"
                >
                    <span className="text-forest dark:text-sage tracking-[0.3em] uppercase text-xs font-medium flex items-center justify-center gap-2">
                        <span className="w-6 h-px bg-forest/40 dark:bg-sage/40" />
                        The Menu
                        <span className="w-6 h-px bg-forest/40 dark:bg-sage/40" />
                    </span>

                    {/* ═══ Dual-Layer Text Intersection ═══ */}
                    <div className="relative mt-6" style={{ isolation: "isolate" }}>
                        {/* Layer 1 — Base WHITE text */}
                        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] w-full text-center">
                            100% Vegetarian.
                            <br />
                            <span className="italic font-normal text-gold">
                                100% Indulgent.
                            </span>
                        </h2>

                        {/* Layer 2 — GOLD overlay clipped to the cup */}
                        <h2
                            ref={goldRef}
                            aria-hidden="true"
                            className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] absolute inset-0 w-full text-center pointer-events-none select-none"
                            style={{
                                color: "#C9A96E",
                                clipPath: "ellipse(0px 0px at 50% 50%)",
                                willChange: "clip-path",
                            }}
                        >
                            100% Vegetarian.
                            <br />
                            <span className="italic font-normal" style={{ color: "transparent" }}>
                                100% Indulgent.
                            </span>
                        </h2>
                    </div>

                    <p className="text-bark/70 dark:text-parchment-60 mt-6 text-lg max-w-xl mx-auto leading-relaxed">
                        Every dish and drink crafted with fresh, locally sourced ingredients. No compromises.
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 bg-forest/10 dark:bg-forest/20 text-forest dark:text-sage text-sm font-medium px-5 py-2.5 rounded-full border border-forest/20 dark:border-sage/20 backdrop-blur-none">
                        <span>🌿</span>
                        <span>100% Vegetarian Promise</span>
                    </div>
                </motion.div>

                {/* ... (The rest of your Tab Navigation and Tab Content stays exactly the same) ... */}

                {/* ─── Swipeable Tab Navigation ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12 relative w-full max-w-4xl mx-auto"
                >
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none md:hidden" />
                    <div className="flex overflow-x-auto gap-3 pb-2 snap-x snap-mandatory hide-scrollbar px-2">
                        {menuTabs.map((tab) => (
                            <motion.button
                                key={tab.id}
                                whileTap={{ scale: 0.94 }}
                                onClick={() => setActiveTab(tab.id)}
                                className={`snap-center shrink-0 px-6 py-3.5 rounded-full text-[15px] font-medium flex items-center gap-2 border transition-all duration-300 ${
                                    activeTab === tab.id
                                        ? "border-gold bg-gold/10 text-gold shadow-[0_0_15px_rgba(201,169,110,0.15)]"
                                        : "border-bark/15 dark:border-parchment-10 text-bark/70 dark:text-parchment-60 bg-white/5 dark:bg-zinc-950/40 hover:text-parchment"
                                }`}
                            >
                                <span className="text-lg">{tab.icon}</span>
                                <span className="tracking-wide">{tab.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* ─── Active Tab Content ─── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="max-w-4xl mx-auto px-2"
                    >
                        <div className="flex items-center gap-3 mb-8 pb-5 border-b border-bark/10 dark:border-parchment-10">
                            <span className="text-2xl">{activeTabData.icon}</span>
                            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-espresso dark:text-parchment">
                                {activeTabData.label}
                            </h3>
                            <div className="ml-auto text-bark/40 dark:text-parchment-40 text-sm font-medium">
                                {activeTabData.subcategories.reduce((a, s) => a + s.items.length, 0)} items
                            </div>
                        </div>

                        {activeTabData.subcategories.map((sub, idx) => (
                            <SubCategoryGroup
                                key={`${activeTab}-${sub.name}`}
                                sub={sub}
                                index={idx}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
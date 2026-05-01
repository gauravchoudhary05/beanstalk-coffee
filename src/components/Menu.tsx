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

/* ─── Full Click Cafe Shillong Menu Data ─── */
const menuTabs: MenuTab[] = [
    {
        id: "manual-brews",
        label: "Manual Brews",
        icon: "☕",
        subcategories: [
            {
                name: "Make Your Own Coffee",
                icon: "🫖",
                items: [
                    { name: "Espresso Machine", price: 150, description: "Pull your own shot", isPopular: true },
                    { name: "Moka Pot", price: 200 },
                    { name: "V-60", price: 200, isPopular: true },
                    { name: "Aero Press", price: 200 },
                    { name: "French Press", price: 200 },
                    { name: "Pour Over (Drip Kettle)", price: 200 },
                ],
            },
        ],
    },
    {
        id: "coffee-specialty",
        label: "Coffee & Specialty",
        icon: "☕",
        subcategories: [
            {
                name: "Strong Coffee",
                icon: "💪",
                items: [
                    { name: "Ristretto", price: 100 },
                    { name: "Espresso", price: 100 },
                    { name: "Doppio", price: 140 },
                    { name: "Lungo", price: 120 },
                ],
            },
            {
                name: "Cafe Specialty",
                icon: "✨",
                items: [
                    { name: "Black Coffee / Americano", price: 100 },
                    { name: "Cappuccino", price: 120, isPopular: true },
                    { name: "Latte", price: 120, isPopular: true },
                    { name: "Mocha", price: 120 },
                    { name: "Affogato", price: 150 },
                    { name: "Shakerato", price: 150 },
                    { name: "Macchiato", price: 120 },
                    { name: "Flat White", price: 120, isPopular: true },
                    { name: "Irish Coffee", price: 150 },
                ],
            },
        ],
    },
    {
        id: "cold-beverages",
        label: "Cold Beverages",
        icon: "🧊",
        subcategories: [
            {
                name: "Iced Coffee",
                icon: "🥤",
                items: [
                    { name: "Cold Brew", price: 180, isPopular: true },
                    { name: "Iced Americano", price: 150 },
                    { name: "Iced Frappé", price: 160 },
                    { name: "Iced Mocha", price: 170 },
                ],
            },
            {
                name: "Refreshers & Iced Tea",
                icon: "🍋",
                items: [
                    { name: "Fresh Lime Soda (sweet/salty)", price: 150 },
                    { name: "Honey Ginger Lemonade", price: 160 },
                    { name: "Classic Strawberry Lemonade", price: 160 },
                    { name: "Ginger Lemon Iced Tea", price: 160 },
                    { name: "Lemon Iced Tea", price: 170 },
                    { name: "Peach Iced Tea", price: 170 },
                ],
            },
        ],
    },
    {
        id: "food",
        label: "Food",
        icon: "🍽️",
        subcategories: [
            {
                name: "Pasta",
                icon: "🍝",
                items: [
                    { name: "Fettuccine White Sauce (Veg)", price: 270 },
                    { name: "Fettuccine Red Sauce (Veg)", price: 270 },
                    { name: "Fettuccine (Non-Veg)", price: 290 },
                    { name: "Penne White Sauce (Veg)", price: 250 },
                    { name: "Penne Red Sauce (Veg)", price: 250 },
                    { name: "Penne (Non-Veg)", price: 270 },
                ],
            },
            {
                name: "Sandwiches",
                icon: "🥪",
                items: [
                    { name: "Veg Grilled Sandwich", price: 200 },
                    { name: "Veg Grilled Sandwich (Cheese)", price: 220 },
                    { name: "Cheese & Herb Sandwich", price: 230, isPopular: true },
                    { name: "Cheese & Corn Sandwich", price: 240 },
                    { name: "Chicken Grilled Sandwich", price: 250 },
                    { name: "Chicken Grilled Sandwich (Cheese)", price: 260 },
                    { name: "BBQ Sandwich", price: 270 },
                    { name: "BBQ Sandwich (Cheese)", price: 280 },
                ],
            },
            {
                name: "Tacos & Wraps",
                icon: "🌮",
                items: [
                    { name: "Tacos (Veg)", price: 240 },
                    { name: "Tacos (Non-Veg)", price: 260 },
                    { name: "Wraps (Veg)", price: 240 },
                    { name: "Wraps (Non-Veg)", price: 260 },
                ],
            },
            {
                name: "Burgers",
                icon: "🍔",
                items: [
                    { name: "Veg Burger", price: 220 },
                    { name: "Cheesy Burger", price: 240 },
                    { name: "Chicken Burger", price: 260 },
                ],
            },
            {
                name: "Belgian Waffles",
                icon: "🧇",
                items: [
                    { name: "Traditional Waffle", price: 199, isPopular: true },
                    { name: "Waffle with Chocolate & Choco Chips", price: 219 },
                    { name: "Waffle with Cream", price: 219 },
                    { name: "Waffle with Ice-Cream", price: 239 },
                ],
            },
        ],
    },
    {
        id: "hot-cold-drinks",
        label: "Hot & Cold Drinks",
        icon: "🍫",
        subcategories: [
            {
                name: "Hot Chocolate",
                icon: "🍫",
                items: [
                    { name: "Traditional Hot Chocolate", price: 129 },
                    { name: "Marshmallow Hot Chocolate", price: 169, isPopular: true },
                    { name: "Crispy Crunch Hot Chocolate", price: 149 },
                    { name: "Hot Chocolate with Cream", price: 159 },
                    { name: "Caramel Hot Chocolate", price: 149, isPopular: true },
                    { name: "Hazelnut Hot Chocolate", price: 149 },
                    { name: "Mint Hot Chocolate", price: 149 },
                ],
            },
            {
                name: "Tea",
                icon: "🍵",
                items: [
                    { name: "Black Tea", price: 30, description: "Kettle (2-3 cups): ₹80" },
                    { name: "Green Tea", price: 40, description: "Kettle (2-3 cups): ₹90" },
                    { name: "Masala Tea", price: 50, description: "Kettle (2-3 cups): ₹120" },
                    { name: "Earl Grey Tea", price: 50, description: "Kettle (2-3 cups): ₹140" },
                    { name: "Peach Tea", price: 50, description: "Kettle (2-3 cups): ₹140" },
                    { name: "Peppermint Tea", price: 50, description: "Kettle (2-3 cups): ₹140" },
                    { name: "Purple Tea", price: 50, description: "Kettle (2-3 cups): ₹140" },
                    { name: "Lemon Ginger Honey Tea", price: 60, description: "Kettle (2-3 cups): ₹150" },
                ],
            },
            {
                name: "Milkshakes",
                icon: "🥛",
                items: [
                    { name: "Chocolate Shake", price: 169 },
                    { name: "Strawberry Shake", price: 169 },
                    { name: "Mango Shake", price: 169 },
                    { name: "Orange Shake", price: 169 },
                    { name: "Pineapple Shake", price: 169 },
                    { name: "Mint-Oreo Shake", price: 189, isPopular: true },
                ],
            },
            {
                name: "Smoothies",
                icon: "🥝",
                items: [
                    { name: "Mixed Smoothie", price: 169 },
                    { name: "Strawberry Smoothie", price: 169 },
                    { name: "Mango Smoothie", price: 169 },
                    { name: "Orange Smoothie", price: 169 },
                    { name: "Pineapple Smoothie", price: 169 },
                ],
            },
        ],
    },
    {
        id: "mocktails-specials",
        label: "Mocktails & Specials",
        icon: "🍹",
        subcategories: [
            {
                name: "Mocktails",
                icon: "🍹",
                items: [
                    { name: "Mojito", price: 159 },
                    { name: "Blue Lagoon", price: 169 },
                    { name: "Fruit Punch", price: 189 },
                ],
            },
            {
                name: "Click Cafe Specials",
                icon: "⭐",
                items: [
                    { name: "The Artic Sun", price: 199, isPopular: true, description: "Our signature creation" },
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
    const [activeTab, setActiveTab] = useState("manual-brews");
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
                            Brew. Sip.
                            <br />
                            <span className="italic font-normal text-gold">
                                Savor.
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
                            Brew. Sip.
                            <br />
                            <span className="italic font-normal" style={{ color: "transparent" }}>
                                Savor.
                            </span>
                        </h2>
                    </div>

                    <p className="text-bark/70 dark:text-parchment-60 mt-6 text-lg max-w-xl mx-auto leading-relaxed">
                        Specialty coffee, manual brews, and artisan food. Every cup crafted with care.
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 bg-forest/10 dark:bg-forest/20 text-forest dark:text-sage text-sm font-medium px-5 py-2.5 rounded-full border border-forest/20 dark:border-sage/20 backdrop-blur-none">
                        <span>☕</span>
                        <span>Add-on: Ice Cream / Whipped Cream / Hazelnut / Caramel — ₹40 each</span>
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
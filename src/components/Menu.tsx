"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";

/* ─── Data Types ─── */
interface MenuItem {
    name: string;
    price: number;
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

/* ─── Steam Lines (reused) ─── */
function SteamLines() {
    return (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className="steam-line w-0.5 h-5 rounded-full"
                    style={{
                        background: "linear-gradient(to top, rgba(201,169,110,0.7), transparent)",
                        animationDelay: `${i * 0.4}s`,
                    }}
                />
            ))}
        </div>
    );
}

/* ─── Single Menu Item Card with 3D Tilt ─── */
function MenuItemCard({ item }: { item: MenuItem }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springConfig = { stiffness: 200, damping: 20 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);
    const glare = useTransform(rotateY, [-8, 8], [0.03, 0.12]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = e.clientX - rect.left - cx;
        const dy = e.clientY - rect.top - cy;
        rotateX.set((-dy / cy) * 8);
        rotateY.set((dx / cx) * 8);
    };

    const handleMouseLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className="group relative cursor-default"
            style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
                perspective: "800px",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.02 }}
            transition={{ scale: { duration: 0.2 } }}
        >
            {/* 🚨 FIX: Replaced solid bg-cream/zinc-deep with translucent white/zinc */}
            <div
                className="relative bg-white/5 dark:bg-zinc-950/50 rounded-xl p-4 border border-bark/10 dark:border-parchment-10 hover:border-gold/30 transition-all duration-300"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Glare overlay */}
                <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)",
                        opacity: glare,
                    }}
                />

                {/* Steam on hover */}
                <SteamLines />

                <div className="flex justify-between items-center gap-3">
                    <span className="font-medium text-espresso dark:text-parchment text-[14px] group-hover:text-forest dark:group-hover:text-gold transition-colors duration-300 leading-snug">
                        {item.name}
                    </span>
                    <span className="text-gold font-semibold text-sm shrink-0 font-[family-name:var(--font-display)]">
                        ₹{item.price}
                    </span>
                </div>
            </div>
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

            {/* Items grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {sub.items.map((item) => (
                    <MenuItemCard key={`${sub.name}-${item.name}`} item={item} />
                ))}
            </div>
        </motion.div>
    );
}

/* ─── Main Menu Component ─── */
export function Menu() {
    const [activeTab, setActiveTab] = useState("beverages");
    const activeTabData = menuTabs.find((t) => t.id === activeTab)!;

    return (
        <section id="menu" className="py-24 md:py-36 px-6 relative">
            {/* 🚨 FIX: Removed solid background so the page wrapper's layer strategy works */}
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
                    {/* ═══ Dynamic Intersection Text Color ═══
                         Two-layer technique using mix-blend-mode: darken
                         
                         Layer 1 (base): White/parchment text — visible on dark bg
                         Layer 2 (overlay): Gold text with darken blend —
                           • On dark bg: darken(gold, dark) → dark wins → gold invisible
                           • On white cup: darken(gold, white) → gold wins → gold shows
                         
                         Result: text is white everywhere EXCEPT where it overlaps
                         the white 3D cup, where it seamlessly turns gold.
                    ═══════════════════════════════════════════════ */}
                    <div className="relative mt-6">
                        {/* Layer 1: Base text — white/parchment, always visible on dark */}
                        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-bold text-espresso dark:text-parchment leading-[1.05]">
                            100% Vegetarian.
                            <br />
                            <span className="italic font-normal text-forest dark:text-gold">
                                100% Indulgent.
                            </span>
                        </h2>

                        {/* Layer 2: Gold overlay — mix-blend-mode: darken
                             Only the "100% Vegetarian." line needs the effect,
                             since "100% Indulgent." is already gold. */}
                        <h2
                            aria-hidden="true"
                            className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] absolute inset-0 pointer-events-none select-none"
                            style={{
                                color: "#C9A96E",
                                mixBlendMode: "darken",
                            }}
                        >
                            100% Vegetarian.
                            <br />
                            {/* This line is transparent so it doesn't interfere
                                 with the already-gold "100% Indulgent." below */}
                            <span className="italic font-normal" style={{ color: "transparent" }}>
                                100% Indulgent.
                            </span>
                        </h2>
                    </div>
                    <p className="text-bark/70 dark:text-parchment-60 mt-6 text-lg max-w-xl mx-auto leading-relaxed">
                        Every dish and drink crafted with fresh, locally sourced ingredients. No compromises.
                    </p>

                    {/* Veg badge */}
                    <div className="mt-6 inline-flex items-center gap-2 bg-forest/10 dark:bg-forest/20 text-forest dark:text-sage text-sm font-medium px-5 py-2.5 rounded-full border border-forest/20 dark:border-sage/20 backdrop-blur-none">
                        <span>🌿</span>
                        <span>100% Vegetarian Promise</span>
                    </div>
                </motion.div>

                {/* ─── Tab Navigation ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12"
                >
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                        {menuTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                /* 🚨 FIX: Replaced solid tab background with translucent */
                                className={`menu-tab px-5 py-3 md:px-6 md:py-3.5 rounded-full text-sm md:text-[15px] font-medium flex items-center gap-2 border ${activeTab === tab.id
                                    ? "menu-tab-active border-gold/50 bg-white/10 dark:bg-zinc-800/60"
                                    : "border-bark/15 dark:border-parchment-10 text-bark dark:text-parchment-60 hover:text-espresso dark:hover:text-parchment bg-white/5 dark:bg-zinc-950/40"
                                    }`}
                            >
                                <span className="text-base">{tab.icon}</span>
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
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
                        /* 🚨 FIX: Killed backdrop-blur-sm, changed solid background to dark translucent */
                        className="bg-white/5 dark:bg-zinc-950/60 rounded-3xl p-6 md:p-10 border border-bark/10 dark:border-parchment-05"
                    >
                        {/* Tab title */}
                        <div className="flex items-center gap-3 mb-8 pb-5 border-b border-bark/10 dark:border-parchment-10">
                            <span className="text-2xl">{activeTabData.icon}</span>
                            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-espresso dark:text-parchment">
                                {activeTabData.label}
                            </h3>
                            <div className="ml-auto text-bark/40 dark:text-parchment-40 text-sm font-medium">
                                {activeTabData.subcategories.reduce((a, s) => a + s.items.length, 0)} items
                            </div>
                        </div>

                        {/* Subcategory groups */}
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
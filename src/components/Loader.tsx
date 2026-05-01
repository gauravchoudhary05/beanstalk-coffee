"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Wait 2.5 seconds to let the 3D assets, textures, and 240 hero frames buffer
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    // Also listen for full window load, but guarantee a minimum 1.5s delay for the animation
    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-espresso"
                >
                    <div className="relative w-24 h-24 mb-10">
                        {/* Outer rotating ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-[1px] border-gold/20 rounded-full border-t-gold"
                        />
                        
                        {/* Inner pulsing dot */}
                        <motion.div
                            animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 m-auto w-3 h-3 bg-gold rounded-full"
                        />
                    </div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-parchment tracking-tight"
                    >
                        Click <span className="italic font-normal text-gold">Cafe</span>
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-gold/60 text-xs md:text-sm mt-6 tracking-[0.3em] uppercase font-medium"
                    >
                        Brewing Experience
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

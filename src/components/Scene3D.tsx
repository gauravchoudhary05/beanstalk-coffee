"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { CoffeeCup3D } from "./CoffeeCup3D";
import { CoffeeParticles3D } from "./CoffeeParticles3D";
import { useState, useEffect } from "react";

export function Scene3D() {
    const [showCup, setShowCup] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 1.0) {
                setShowCup(true);
            } else {
                setShowCup(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out ${showCup ? "opacity-100" : "opacity-0"
                }`}
            style={{ zIndex: 10 }}
        >
            <Canvas
                shadows
                camera={{ position: [0, 0, 8], fov: 45 }}
                // 🚀 FIX 1: The Silver Bullet. Caps resolution on mobile so the GPU doesn't melt.
                dpr={[1, 1.5]}
                // 🚀 FIX 2: Asks the browser to dedicate GPU power, and disables expensive antialiasing on high-res screens.
                gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
                eventSource={typeof window !== "undefined" ? document.body : undefined}
            >
                <ambientLight intensity={0.4} />

                {/* 🚀 FIX 3: Reduced shadow map size from 1024 to 512. Looks the same, runs twice as fast. */}
                <directionalLight position={[3, 5, 5]} intensity={1.4} color="#fdf6e3" castShadow shadow-mapSize={[512, 512]} />
                <directionalLight position={[-5, -2, -5]} intensity={0.5} color="#C9A96E" />

                <CoffeeCup3D />
                <CoffeeParticles3D />

                {/* 🚀 FIX 4: Drastically reduced the computational cost of the ground shadow */}
                <ContactShadows
                    position={[0, -4.5, 0]}
                    opacity={0.4}
                    scale={20}
                    blur={2}
                    far={10}
                    resolution={256}
                />

                <Environment preset="apartment" />
            </Canvas>
        </div>
    );
}
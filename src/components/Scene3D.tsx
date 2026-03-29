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
            // Lowered to 1.0 so it fades in sooner while we test!
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
                gl={{ alpha: true, antialias: true }}
                eventSource={typeof window !== "undefined" ? document.body : undefined}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[3, 5, 5]} intensity={1.4} color="#fdf6e3" castShadow shadow-mapSize={[1024, 1024]} />
                <directionalLight position={[-5, -2, -5]} intensity={0.5} color="#C9A96E" />

                <CoffeeCup3D />
                <CoffeeParticles3D />

                <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2} far={10} />
                <Environment preset="apartment" />
            </Canvas>
        </div>
    );
}
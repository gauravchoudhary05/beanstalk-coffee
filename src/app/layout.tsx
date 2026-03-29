import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-display",
    display: "swap",
    weight: ["400", "500", "600", "700", "800"],
    style: ["normal", "italic"],
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
    weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
    title: "Beanstalk Coffee — A Jaipur Hidden Gem",
    description:
        "A cozy, nature-inspired café in Jaipur. 100% vegetarian menu, resident cats, and artisan coffee on Gandhi Path Road.",
    keywords: ["Beanstalk Coffee", "Jaipur café", "vegetarian café Jaipur", "Gandhi Path coffee shop"],
    openGraph: {
        title: "Beanstalk Coffee — A Jaipur Hidden Gem",
        description: "Nature-inspired café with artisan coffee & resident cats. Gandhi Path, Jaipur.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
            <body>{children}</body>
        </html>
    );
}

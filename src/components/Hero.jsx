// src/components/Hero.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
    {
        title: "Find Your Secure Home in Kenya",
        subtitle: "Ardhisasa Verified • M-Pesa Secure • AI Fraud Protection",
        bgColor: "#0f172a",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
    },
    {
        title: "Luxury Homes",
        subtitle: "End-to-End Encrypted Transactions • Bank-Grade Security",
        bgColor: "#064e3b",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=2000",
    },
    {
        title: "Spacious Family Homes",
        subtitle: "Title Checks • Fraud Detection • Secure Payments",
        bgColor: "#7c2d12",
        image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&q=80&w=2000",
    },
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [tab, setTab] = useState("Buy");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("Any Price (KES)");
    const [propertyType, setPropertyType] = useState("Property Type");
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 6500);
        return () => clearInterval(timer);
    }, []);

    const current = slides[currentIndex];

    const handleSearch = () => {
        if (tab === "Buy") navigate("/buy");
        else if (tab === "Rent") navigate("/rent");
        else navigate("/sell");
    };

    return (
        <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">

            {/* Animated background color */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`bg-${currentIndex}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ backgroundColor: current.bgColor }}
                />
            </AnimatePresence>

            {/* Animated background image — blurred */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`img-${currentIndex}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 0.45, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    style={{
                        backgroundImage: `url(${current.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(4px)",
                        transform: "scale(1.05)", // prevent blurred edges showing
                    }}
                />
            </AnimatePresence>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Animated text — changes with slides */}
            <div className="relative z-10 text-center text-white px-6 mb-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`text-${currentIndex}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-4">
                            {current.title}
                        </h1>
                        <p className="text-xl md:text-2xl font-light opacity-90">
                            {current.subtitle}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Search bar — OUTSIDE AnimatePresence, never moves */}
            <div className="relative z-10 w-full max-w-4xl px-6">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl text-gray-900">
                    {/* Tabs */}
                    <div className="flex bg-gray-100 rounded-2xl p-1 mb-4">
                        {["Buy", "Rent", "Sell"].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                                    tab === t
                                        ? "bg-white shadow text-emerald-700"
                                        : "text-gray-500 hover:bg-gray-200"
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <input
                            type="text"
                            placeholder="Nairobi, Westlands, Karen..."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="border border-gray-200 focus:ring-2 focus:ring-emerald-500 rounded-2xl px-5 py-3 w-full text-sm outline-none"
                        />
                        <select
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="border border-gray-200 focus:ring-2 focus:ring-emerald-500 rounded-2xl px-5 py-3 text-sm outline-none"
                        >
                            <option>Any Price (KES)</option>
                            {tab === "Rent" ? (
                                <>
                                    <option>Under 50K</option>
                                    <option>50K - 100K</option>
                                    <option>Above 100K</option>
                                </>
                            ) : (
                                <>
                                    <option>Under 5M</option>
                                    <option>5M - 15M</option>
                                    <option>Above 15M</option>
                                </>
                            )}
                        </select>
                        <select
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                            className="border border-gray-200 focus:ring-2 focus:ring-emerald-500 rounded-2xl px-5 py-3 text-sm outline-none"
                        >
                            <option>Property Type</option>
                            <option>Apartment</option>
                            <option>House</option>
                            <option>Villa</option>
                            <option>Land</option>
                            <option>Commercial</option>
                        </select>
                        <button
                            onClick={handleSearch}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl px-6 py-3 flex items-center justify-center gap-2 text-sm transition-colors"
                        >
                            <i className="fas fa-search"></i>
                            Search
                        </button>
                    </div>
                </div>

                {/* Trust badges */}
                <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-white/90">
                    <div className="flex items-center gap-2"><i className="fas fa-check text-emerald-400"></i> Ardhisasa Verified</div>
                    <div className="flex items-center gap-2"><i className="fas fa-check text-emerald-400"></i> M-Pesa Secure</div>
                    <div className="flex items-center gap-2"><i className="fas fa-check text-emerald-400"></i> AI Fraud Protection</div>
                </div>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-2 rounded-full transition-all duration-500 ${
                            i === currentIndex ? "bg-white w-8" : "bg-white/50 w-2 hover:bg-white/80"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
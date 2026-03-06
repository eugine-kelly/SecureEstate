export default function Hero() {
    return (
        <section className="relative h-screen flex items-center text-white hero-bg">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

            <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
                <h1 className="text-6xl font-bold mb-4">Find Your Secure Home in Kenya</h1>
                <p className="text-2xl mb-10">Verified properties • M-Pesa payments • Ardhisasa title checks • AI fraud protection</p>

                {/* Search Bar */}
                <div className="bg-white rounded-3xl p-3 shadow-2xl max-w-4xl mx-auto">
                    <div className="flex bg-gray-100 rounded-2xl p-1">
                        <button className="flex-1 py-4 rounded-2xl font-semibold bg-white shadow text-emerald-700">Buy</button>
                        <button className="flex-1 py-4 rounded-2xl font-semibold text-gray-600">Rent</button>
                        <button className="flex-1 py-4 rounded-2xl font-semibold text-gray-600">Sell</button>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
                        <input
                            type="text"
                            placeholder="Nairobi, Westlands, Karen..."
                            className="border-0 focus:ring-2 focus:ring-emerald-500 rounded-2xl px-6 py-4 text-gray-900 w-full"
                        />
                        <select className="border-0 focus:ring-2 focus:ring-emerald-500 rounded-2xl px-6 py-4 text-gray-900">
                            <option>Any Price (KES)</option>
                            <option>Under 5M</option>
                            <option>5M - 15M</option>
                            <option>Above 15M</option>
                        </select>
                        <select className="border-0 focus:ring-2 focus:ring-emerald-500 rounded-2xl px-6 py-4 text-gray-900">
                            <option>Property Type</option>
                            <option>Apartment</option>
                            <option>House</option>
                            <option>Land</option>
                        </select>
                        <button
                            onClick={() => alert("Searching secure listings...")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl px-10 py-4 flex items-center justify-center gap-3"
                        >
                            <i className="fas fa-search"></i>
                            Search Securely
                        </button>
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-8 text-sm">
                    <div className="flex items-center gap-2"><i className="fas fa-check text-emerald-400"></i> Ardhisasa Verified</div>
                    <div className="flex items-center gap-2"><i className="fas fa-check text-emerald-400"></i> M-Pesa Secure</div>
                    <div className="flex items-center gap-2"><i className="fas fa-check text-emerald-400"></i> AI Fraud Protection</div>
                </div>
            </div>
        </section>
    );
}
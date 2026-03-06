export default function Insights() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-5xl font-bold text-center mb-4">Kenya Real Estate Market Insights</h1>
            <p className="text-center text-gray-600 mb-16">Data-driven intelligence powered by SecureEstate analytics</p>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-3xl p-10 shadow">
                    <p className="text-emerald-600 font-medium">NAIROBI 2025</p>
                    <p className="text-6xl font-bold mt-6">8.4%</p>
                    <p className="text-xl mt-2">Average Annual Growth</p>
                </div>

                <div className="bg-white rounded-3xl p-10 shadow">
                    <p className="text-emerald-600 font-medium">NATIONAL CONTRIBUTION</p>
                    <p className="text-6xl font-bold mt-6">KES 1.36T</p>
                    <p className="text-xl mt-2">To Kenya's GDP</p>
                </div>

                <div className="bg-white rounded-3xl p-10 shadow">
                    <p className="text-emerald-600 font-medium">FRAUD REDUCTION</p>
                    <p className="text-6xl font-bold mt-6">71%</p>
                    <p className="text-xl mt-2">With AI + Ardhisasa Verification</p>
                </div>
            </div>

            <div className="mt-20 text-center">
                <p className="text-2xl font-semibold">More insights coming soon (Market trends, price heatmaps, investment reports)</p>
                <p className="text-gray-500 mt-4">SecureEstate uses localized analytics to help you make informed decisions</p>
            </div>
        </div>
    );
}
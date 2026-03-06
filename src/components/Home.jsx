import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';

export default function Home() {
    return (
        <>
            <Hero />
            <TrustBar />

            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex justify-between items-end mb-10">
                    <h2 className="text-4xl font-bold">Featured Secure Properties</h2>
                    <a href="/listings" className="text-emerald-600 font-medium">View all verified listings →</a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {properties.slice(0, 4).map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </section>

            {/* Market Insights Section (same as before) */}
            <section className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">Kenya Real Estate Insights</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-800 p-8 rounded-3xl">
                            <p className="text-emerald-400 text-sm">NAIROBI</p>
                            <p className="text-5xl font-bold mt-4">8.4%</p>
                            <p className="text-xl">Average Annual Growth (2025)</p>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-3xl">
                            <p className="text-emerald-400 text-sm">NATIONAL</p>
                            <p className="text-5xl font-bold mt-4">KES 1.36T</p>
                            <p className="text-xl">Real Estate Contribution to GDP</p>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-3xl">
                            <p className="text-emerald-400 text-sm">SECURE TRANSACTIONS</p>
                            <p className="text-5xl font-bold mt-4">71%</p>
                            <p className="text-xl">Fraud Reduction with AI Verification</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
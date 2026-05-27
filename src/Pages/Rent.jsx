import { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import { rentals } from '../data/rentals';

export default function Rent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('Any');
    const [typeFilter, setTypeFilter] = useState('Any');

    const filtered = rentals.filter(p => {
        const matchesSearch =
            p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.title.toLowerCase().includes(searchTerm.toLowerCase());

        const price = parseInt(p.price.replace(/,/g, '').replace('/mo', ''));
        const matchesPrice =
            priceFilter === 'Any' ||
            (priceFilter === 'Under 50K' && price < 50000) ||
            (priceFilter === '50K - 100K' && price >= 50000 && price <= 100000) ||
            (priceFilter === 'Above 100K' && price > 100000);

        const matchesType = typeFilter === 'Any' || p.type === typeFilter;

        return matchesSearch && matchesPrice && matchesType;
    });

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold mb-2">Properties for Rent</h1>
                <p className="text-gray-500">Verified landlords • Secure M-Pesa payments • AI fraud protection</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-10">
                <input
                    type="text"
                    placeholder="Search by location or title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 min-w-[220px] border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500"
                />
                <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500"
                >
                    <option>Any</option>
                    <option>Under 50K</option>
                    <option>50K - 100K</option>
                    <option>Above 100K</option>
                </select>
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500"
                >
                    <option>Any</option>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                    <option>Commercial</option>
                </select>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-500 mb-6">{filtered.length} propert{filtered.length !== 1 ? 'ies' : 'y'} found</p>

            {/* Grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filtered.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 text-gray-400">
                    <i className="fas fa-search text-5xl mb-4 block"></i>
                    <p className="text-xl font-medium">No rentals found</p>
                    <p className="text-sm mt-2">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
}
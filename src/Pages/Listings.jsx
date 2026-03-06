import { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';

export default function Listings() {
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = properties.filter(p =>
        p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-8">Secure Property Listings</h1>

            <input
                type="text"
                placeholder="Search by location or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                {filtered.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </div>
    );
}
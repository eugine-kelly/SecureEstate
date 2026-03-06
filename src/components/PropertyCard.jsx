import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
    return (
        <Link to={`/property/${property.id}`} className="block">
            <div className="bg-white rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow hover:shadow-xl">
                <div className="relative">
                    <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />
                    {property.verified && (
                        <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs px-4 py-1 rounded-full flex items-center gap-1">
                            <i className="fas fa-shield-alt"></i> Ardhisasa Verified
                        </div>
                    )}
                </div>
                <div className="p-6">
                    <p className="text-2xl font-bold text-emerald-700">KES {property.price}</p>
                    <p className="font-semibold mt-2">{property.title}</p>
                    <p className="text-gray-500 text-sm">{property.location}</p>
                    <div className="flex gap-4 mt-4 text-xs text-gray-500">
                        {property.beds > 0 && <span><i className="fas fa-bed"></i> {property.beds}</span>}
                        {property.baths > 0 && <span><i className="fas fa-bath"></i> {property.baths}</span>}
                    </div>
                </div>
            </div>
        </Link>
    );
}
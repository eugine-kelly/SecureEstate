import { useParams, Link } from 'react-router-dom';
import { properties } from '../data/properties';

export default function PropertyDetail() {
    const { id } = useParams();
    const property = properties.find(p => p.id === parseInt(id));

    if (!property) return <h2>Property not found</h2>;

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <Link to="/listings" className="text-emerald-600 mb-6 inline-block">← Back to listings</Link>

            <div className="grid md:grid-cols-2 gap-10">
                <img src={property.image} alt={property.title} className="rounded-3xl w-full" />

                <div>
                    <h1 className="text-4xl font-bold">{property.title}</h1>
                    <p className="text-2xl text-gray-600 mt-2">{property.location}</p>
                    <p className="text-5xl font-bold text-emerald-700 mt-6">KES {property.price}</p>

                    {property.verified && (
                        <div className="mt-6 inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full">
                            <i className="fas fa-shield-alt"></i>
                            Ardhisasa Verified Title
                        </div>
                    )}

                    <div className="mt-10 space-y-4">
                        <p><strong>Description:</strong> {property.description}</p>
                        <p><strong>Security Features:</strong> MFA Protected • End-to-End Encrypted • AI Fraud Scanned</p>
                        <p><strong>Payment:</strong> Secure M-Pesa + Escrow</p>
                    </div>

                    <button className="mt-10 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-semibold text-lg">
                        Proceed to Secure Transaction
                    </button>
                </div>
            </div>
        </div>
    );
}
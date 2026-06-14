import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';
import { Link } from 'react-router-dom';

const WHY_US = [
    {
        icon: 'fas fa-shield-alt',
        title: 'Ardhisasa Verified',
        desc: 'Every listing is verified through Kenya\'s official land registry system for your peace of mind.',
        color: 'bg-emerald-50 text-emerald-600',
    },
    {
        icon: 'fas fa-lock',
        title: 'Secure Transactions',
        desc: 'End-to-end encrypted payments via M-Pesa with escrow protection on all deals.',
        color: 'bg-blue-50 text-blue-600',
    },
    {
        icon: 'fas fa-robot',
        title: 'AI Fraud Detection',
        desc: 'Our AI scans every listing for fraud signals before it goes live on the platform.',
        color: 'bg-purple-50 text-purple-600',
    },
    {
        icon: 'fas fa-headset',
        title: '24/7 AI Agent',
        desc: 'Chat with our intelligent agent anytime — property questions answered instantly.',
        color: 'bg-orange-50 text-orange-600',
    },
];

const NEIGHBORHOODS = [
    { name: 'Karen', count: '3 listings', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' },
    { name: 'Westlands', count: '3 listings', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600' },
    { name: 'Kilimani', count: '3 listings', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=600' },
    { name: 'Mombasa', count: '3 listings', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600' },
];

const STATS = [
    { value: '2,400+', label: 'Active Listings' },
    { value: 'KES 1.36T', label: 'Real Estate GDP' },
    { value: '71%', label: 'Fraud Reduction' },
    { value: '8.4%', label: 'Annual Growth' },
];

const TESTIMONIALS = [
    {
        name: 'James Mwangi',
        role: 'Property Buyer, Karen',
        text: 'SecureEstate made finding my dream home so easy. The Ardhisasa verification gave me full confidence in the transaction.',
        avatar: 'JM',
        color: 'bg-emerald-500',
    },
    {
        name: 'Amina Hassan',
        role: 'Landlord, Westlands',
        text: 'I listed my apartment and got a verified tenant within a week. The M-Pesa escrow system is brilliant.',
        avatar: 'AH',
        color: 'bg-blue-500',
    },
    {
        name: 'Brian Otieno',
        role: 'Real Estate Agent, Nairobi',
        text: 'As an agent, the AI fraud detection has saved me from multiple scam listings. This platform is a game changer.',
        avatar: 'BO',
        color: 'bg-purple-500',
    },
];

export default function Home() {
    return (
        <>
            <Hero />
            <TrustBar />

            {/* Featured Properties */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <p className="text-emerald-600 font-medium text-sm mb-2">HANDPICKED FOR YOU</p>
                        <h2 className="text-4xl font-bold text-gray-900">Featured Properties</h2>
                    </div>
                    <Link to="/buy" className="text-emerald-600 font-medium hover:underline flex items-center gap-2">
                        View all <i className="fas fa-arrow-right text-sm"></i>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {properties.slice(0, 4).map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </section>

            {/* Browse by Neighborhood */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-emerald-600 font-medium text-sm mb-2">EXPLORE KENYA</p>
                        <h2 className="text-4xl font-bold text-gray-900">Browse by Neighborhood</h2>
                        <p className="text-gray-500 mt-3">Discover properties in Kenya's most sought-after locations</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {NEIGHBORHOODS.map((n) => (
                            <Link to={`/buy?location=${encodeURIComponent(n.name)}`} key={n.name} className="group relative rounded-2xl overflow-hidden h-48 block">
                                <img src={n.image} alt={n.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <p className="text-lg font-bold">{n.name}</p>
                                    <p className="text-xs text-white/80">{n.count}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why SecureEstate */}
            <section className="py-20 max-w-7xl mx-auto px-6">
                <div className="text-center mb-14">
                    <p className="text-emerald-600 font-medium text-sm mb-2">WHY CHOOSE US</p>
                    <h2 className="text-4xl font-bold text-gray-900">Kenya's Most Secure Platform</h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">We combine cutting-edge cybersecurity with Kenya's land registry to protect every transaction</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {WHY_US.map((item) => (
                        <div key={item.title} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all border border-gray-100">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${item.color}`}>
                                <i className={`${item.icon} text-xl`}></i>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats Banner */}
            <section className="bg-emerald-700 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
                        {STATS.map((s) => (
                            <div key={s.label}>
                                <p className="text-4xl md:text-5xl font-bold">{s.value}</p>
                                <p className="text-emerald-200 mt-2 text-sm font-medium">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-emerald-600 font-medium text-sm mb-2">TESTIMONIALS</p>
                        <h2 className="text-4xl font-bold text-gray-900">What Our Clients Say</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((t) => (
                            <div key={t.name} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star text-sm"></i>)}
                                </div>
                                <p className="text-gray-600 leading-relaxed mb-6 italic">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                                        <p className="text-gray-400 text-xs">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-20 bg-gray-900 text-white text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect Property?</h2>
                    <p className="text-gray-400 mb-8 text-lg">Join thousands of Kenyans who trust SecureEstate for safe, verified property transactions.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/buy" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2">
                            <i className="fas fa-home"></i> Browse Properties
                        </Link>
                        <Link to="/agent" className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2">
                            <i className="fas fa-robot"></i> Chat with Agent
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
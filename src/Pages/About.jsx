import { Link } from 'react-router-dom';

const TEAM = [
    { name: 'Okongo Eugene Kelly Otieno', role: 'Founder & CEO', avatar: 'OE', color: 'bg-emerald-500' },
    { name: 'SecureEstate Agent', role: 'AI Real Estate Assistant', avatar: 'AI', color: 'bg-blue-500' },
];

const VALUES = [
    { icon: 'fas fa-shield-alt', title: 'Security First', desc: 'Every feature is built with cybersecurity at its core — MFA, RBAC, end-to-end encryption.', color: 'bg-emerald-100 text-emerald-600' },
    { icon: 'fas fa-handshake', title: 'Trust', desc: 'We verify every property through Ardhisasa and every agent through our vetting process.', color: 'bg-blue-100 text-blue-600' },
    { icon: 'fas fa-users', title: 'Community', desc: 'Built for Kenyans, by Kenyans. We understand the local real estate market deeply.', color: 'bg-purple-100 text-purple-600' },
    { icon: 'fas fa-lightbulb', title: 'Innovation', desc: 'We use AI fraud detection and smart matching to make property search safer and faster.', color: 'bg-orange-100 text-orange-600' },
];

export default function About() {
    return (
        <div>
            {/* Hero */}
            <section className="bg-gray-900 text-white py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-emerald-400 font-medium text-sm mb-3">ABOUT US</p>
                    <h1 className="text-5xl font-bold mb-6">Kenya's Most Secure Property Marketplace</h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                        SecureEstate was built to solve one of Kenya's biggest real estate problems — fraud. We combine Ardhisasa land verification, M-Pesa escrow payments, and AI fraud detection to make property transactions safe for everyone.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 max-w-5xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-emerald-600 font-medium text-sm mb-2">OUR MISSION</p>
                        <h2 className="text-3xl font-bold text-gray-900 mb-5">Making Property Transactions Safe in Kenya</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Kenya's real estate sector contributes over KES 1.36 trillion to GDP, yet fraud remains rampant. Fake title deeds, ghost agents, and money scams cost Kenyans billions every year.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            SecureEstate was founded to change this. By integrating with the official Ardhisasa land registry and using AI to scan every listing, we ensure that what you see is real — and what you pay is protected.
                        </p>
                        <Link to="/buy" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2">
                            <i className="fas fa-home"></i> Browse Properties
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { value: '2,400+', label: 'Active Listings' },
                            { value: '71%', label: 'Fraud Reduction' },
                            { value: 'KES 1.36T', label: 'Market Size' },
                            { value: '8.4%', label: 'Annual Growth' },
                        ].map(s => (
                            <div key={s.label} className="bg-emerald-50 rounded-2xl p-6 text-center">
                                <p className="text-3xl font-bold text-emerald-700">{s.value}</p>
                                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-gray-50 py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-emerald-600 font-medium text-sm mb-2">OUR VALUES</p>
                        <h2 className="text-3xl font-bold text-gray-900">What We Stand For</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VALUES.map(v => (
                            <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className={`w-12 h-12 ${v.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <i className={`${v.icon} text-xl`}></i>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 max-w-5xl mx-auto px-6">
                <div className="text-center mb-12">
                    <p className="text-emerald-600 font-medium text-sm mb-2">THE TEAM</p>
                    <h2 className="text-3xl font-bold text-gray-900">Built with Passion</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    {TEAM.map(m => (
                        <div key={m.name} className="text-center">
                            <div className={`w-20 h-20 ${m.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3`}>
                                {m.avatar}
                            </div>
                            <p className="font-semibold text-gray-900">{m.name}</p>
                            <p className="text-sm text-gray-500">{m.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-emerald-700 py-16 px-6 text-white text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Ready to Find Your Property Securely?</h2>
                    <p className="text-emerald-200 mb-8">Join thousands of Kenyans who trust SecureEstate</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/register" className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-3 rounded-xl font-semibold">
                            Get Started Free
                        </Link>
                        <Link to="/contact" className="border border-white/40 hover:bg-white/10 px-8 py-3 rounded-xl font-semibold">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
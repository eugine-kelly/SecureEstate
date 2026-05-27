import { Link } from 'react-router-dom';

const STEPS_BUY = [
    { step: '01', title: 'Create Account', desc: 'Register with your email or Google account. Your data is protected under the Kenya Data Protection Act.', icon: 'fas fa-user-plus', color: 'bg-blue-100 text-blue-600' },
    { step: '02', title: 'Browse Listings', desc: 'Search properties by location, price, and type. All listings are AI-scanned for fraud before going live.', icon: 'fas fa-search', color: 'bg-emerald-100 text-emerald-600' },
    { step: '03', title: 'Pay Access Fee', desc: 'Pay a small M-Pesa fee (KES 200–1,500) to unlock the agent\'s contacts and full property brochure.', icon: 'fas fa-mobile-alt', color: 'bg-purple-100 text-purple-600' },
    { step: '04', title: 'Contact Agent', desc: 'Get the agent\'s phone, email and WhatsApp. Negotiate directly and arrange a property viewing.', icon: 'fas fa-handshake', color: 'bg-orange-100 text-orange-600' },
];

const STEPS_AGENT = [
    { step: '01', title: 'Register as Agent', desc: 'Sign up and select "Agent" as your role. Our team verifies your credentials.', icon: 'fas fa-id-badge', color: 'bg-blue-100 text-blue-600' },
    { step: '02', title: 'Submit Properties', desc: 'Contact our admin team to list properties. Each listing goes through Ardhisasa title verification.', icon: 'fas fa-home', color: 'bg-emerald-100 text-emerald-600' },
    { step: '03', title: 'Get Leads', desc: 'Buyers pay an access fee to see your contacts. You receive qualified, serious leads only.', icon: 'fas fa-users', color: 'bg-purple-100 text-purple-600' },
    { step: '04', title: 'Close Deals', desc: 'Negotiate and close deals directly with buyers. SecureEstate facilitates the introduction.', icon: 'fas fa-check-circle', color: 'bg-orange-100 text-orange-600' },
];

const SECURITY = [
    { icon: 'fas fa-shield-alt', title: 'Ardhisasa Verification', desc: 'Every title deed is verified through Kenya\'s official land registry' },
    { icon: 'fas fa-lock', title: 'End-to-End Encryption', desc: 'All data is encrypted in transit and at rest' },
    { icon: 'fas fa-robot', title: 'AI Fraud Detection', desc: 'Machine learning scans every listing for fraud signals' },
    { icon: 'fas fa-mobile-alt', title: 'M-Pesa Escrow', desc: 'Payments held securely until conditions are met' },
    { icon: 'fas fa-user-check', title: 'MFA Protection', desc: 'Multi-factor authentication on all accounts' },
    { icon: 'fas fa-balance-scale', title: 'Kenya Data Protection Act', desc: 'Fully compliant with Kenya\'s data protection laws' },
];

export default function HowItWorks() {
    return (
        <div>
            {/* Hero */}
            <section className="bg-gray-900 text-white py-20 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <p className="text-emerald-400 font-medium text-sm mb-3">HOW IT WORKS</p>
                    <h1 className="text-5xl font-bold mb-4">Simple, Secure, Transparent</h1>
                    <p className="text-gray-400 text-lg">SecureEstate connects verified property buyers with trusted agents through a safe, transparent process</p>
                </div>
            </section>

            {/* For Buyers */}
            <section className="py-20 max-w-5xl mx-auto px-6">
                <div className="text-center mb-12">
                    <p className="text-emerald-600 font-medium text-sm mb-2">FOR BUYERS & RENTERS</p>
                    <h2 className="text-3xl font-bold text-gray-900">Find Your Property in 4 Steps</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STEPS_BUY.map((s, i) => (
                        <div key={s.step} className="relative">
                            {i < STEPS_BUY.length - 1 && (
                                <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gray-200 z-0" style={{width: 'calc(100% - 3rem)', left: '4rem'}}></div>
                            )}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative z-10">
                                <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <i className={`${s.icon} text-xl`}></i>
                                </div>
                                <span className="text-3xl font-bold text-gray-100">{s.step}</span>
                                <h3 className="font-bold text-gray-900 mt-1 mb-2">{s.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Access Fee Explained */}
            <section className="bg-emerald-50 py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="text-emerald-600 font-medium text-sm mb-2">ACCESS FEE MODEL</p>
                        <h2 className="text-3xl font-bold text-gray-900">Why We Charge a Small Access Fee</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                            <p>Instead of charging millions directly on the platform (which would be impractical), SecureEstate charges a small access fee via M-Pesa to unlock agent contacts and full property details.</p>
                            <p>This model ensures that only serious buyers contact agents — reducing spam and wasted time for both parties.</p>
                            <p>The fee also funds Ardhisasa verification costs and AI fraud scanning for every listing.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
                            <p className="font-bold text-gray-800 mb-4">Access Fee Structure:</p>
                            {[
                                { type: 'Rental Properties', fee: 'KES 200', color: 'text-blue-600' },
                                { type: 'Properties Under KES 10M', fee: 'KES 500', color: 'text-emerald-600' },
                                { type: 'Properties KES 10M–30M', fee: 'KES 1,000', color: 'text-purple-600' },
                                { type: 'Luxury Above KES 30M', fee: 'KES 1,500', color: 'text-orange-600' },
                                { type: 'Land & Commercial', fee: 'KES 1,000', color: 'text-red-600' },
                            ].map(row => (
                                <div key={row.type} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                    <span className="text-sm text-gray-600">{row.type}</span>
                                    <span className={`font-bold ${row.color}`}>{row.fee}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* For Agents */}
            <section className="py-20 max-w-5xl mx-auto px-6">
                <div className="text-center mb-12">
                    <p className="text-emerald-600 font-medium text-sm mb-2">FOR AGENTS</p>
                    <h2 className="text-3xl font-bold text-gray-900">List Properties & Get Qualified Leads</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STEPS_AGENT.map(s => (
                        <div key={s.step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-4`}>
                                <i className={`${s.icon} text-xl`}></i>
                            </div>
                            <span className="text-3xl font-bold text-gray-100">{s.step}</span>
                            <h3 className="font-bold text-gray-900 mt-1 mb-2">{s.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Security Features */}
            <section className="bg-gray-900 text-white py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-emerald-400 font-medium text-sm mb-2">SECURITY</p>
                        <h2 className="text-3xl font-bold">Bank-Grade Security at Every Step</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SECURITY.map(s => (
                            <div key={s.title} className="bg-gray-800 rounded-2xl p-6">
                                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                    <i className={`${s.icon} text-white`}></i>
                                </div>
                                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                                <p className="text-gray-400 text-sm">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6 text-center bg-white">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
                    <p className="text-gray-500 mb-8">Create your free account and start browsing verified properties today</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold">
                            Create Free Account
                        </Link>
                        <Link to="/help" className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-xl font-semibold">
                            View FAQ
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
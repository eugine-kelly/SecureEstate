import { Link } from 'react-router-dom';

const FOOTER_LINKS = {
    'Buy & Rent': [
        { label: 'Properties for Sale', to: '/buy' },
        { label: 'Properties for Rent', to: '/rent' },
        { label: 'New Listings', to: '/buy' },
        { label: 'Commercial Properties', to: '/buy' },
    ],
    'Company': [
        { label: 'About SecureEstate', to: '/about' },
        { label: 'How It Works', to: '/how-it-works' },
        { label: 'AI Agent', to: '/agent' },
    ],
    'Support': [
        { label: 'Help Center', to: '/help' },
        { label: 'Contact Us', to: '/contact' },
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Terms of Service', to: '/terms' },
    ],
};

const SOCIALS = [
    { icon: 'fab fa-x-twitter', href: 'https://share.google/Fssycbg9r4CVVtkWa' },
    { icon: 'fab fa-instagram', href: 'https://www.instagram.com/eug.1ne?igsh=MXJ3ZXNvem5sZDZzZA==' },
    { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/eugine-kelly-okongo' },
    { icon: 'fab fa-github', href: 'https://eugine-kelly.github.io/my-portfolio/' },
];

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">SE</div>
                            <div>
                                <p className="text-white font-bold text-xl">SecureEstate</p>
                                <p className="text-emerald-500 text-xs">Kenya's Most Secure Marketplace</p>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6 max-w-xs">
                            Kenya's most trusted property marketplace — powered by Ardhisasa verification, M-Pesa secure payments, and AI fraud detection.
                        </p>
                        <div className="flex gap-3">
                            {SOCIALS.map((s) => (
                                <a key={s.icon} href={s.href} target="_blank" rel="noreferrer"
                                   className="w-9 h-9 bg-gray-800 hover:bg-emerald-600 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all">
                                    <i className={`${s.icon} text-sm`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                        <div key={title}>
                            <p className="text-white font-semibold mb-5">{title}</p>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link to={link.to} className="text-sm hover:text-emerald-400 transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-10 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-emerald-500">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">Location</p>
                            <p className="text-xs">Westlands, Nairobi, Kenya</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-emerald-500">
                            <i className="fas fa-phone-alt"></i>
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">Phone</p>
                            <p className="text-xs">+254 700 000 000</p>
                        </div>
                    </div>
                    <a href="mailto:kellyeugine583@gmail.com" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-emerald-500">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">Email</p>
                            <p className="text-xs">kellyeugine583@gmail.com</p>
                        </div>
                    </a>
                </div>
            </div>

            <div className="border-t border-gray-800 py-6">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs">© 2026 SecureEstate • Built by Okongo Eugene Kelly Otieno • All rights reserved</p>
                    <div className="flex items-center gap-6 text-xs">
                        <div className="flex items-center gap-2 text-emerald-500">
                            <i className="fas fa-shield-alt"></i><span>Bank-Grade Security</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-500">
                            <i className="fas fa-lock"></i><span>Kenya Data Protection Act</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
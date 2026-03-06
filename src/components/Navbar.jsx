import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">SE</div>
                    <div>
                        <span className="text-2xl font-bold text-gray-900">SecureEstate</span>
                        <p className="text-[10px] text-emerald-600 -mt-1">Kenya's Most Secure Marketplace</p>
                    </div>
                </Link>

                <div className="flex items-center gap-8 text-sm font-medium">
                    <Link to="/listings" className="hover:text-emerald-600">Buy</Link>
                    <Link to="/listings" className="hover:text-emerald-600">Rent</Link>
                    <Link to="/sell" className="hover:text-emerald-600">Sell</Link>
                    <Link to="/insights" className="hover:text-emerald-600">Insights</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        to="/sell"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2"
                    >
                        <i className="fas fa-plus"></i> Post Property
                    </Link>
                    <Link
                        to="/login"
                        className="border border-gray-300 hover:bg-gray-50 px-5 py-2.5 rounded-xl font-medium"
                    >
                        Login / Register
                    </Link>
                    <div className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                        <i className="fas fa-shield-alt"></i>
                        <span>Bank-Grade Security</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
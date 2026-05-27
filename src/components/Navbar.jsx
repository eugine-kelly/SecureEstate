import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

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
                    <Link to="/buy" className="hover:text-emerald-600">Buy</Link>
                    <Link to="/rent" className="hover:text-emerald-600">Rent</Link>
                    <Link to="/agent" className="hover:text-emerald-600 flex items-center gap-1">
                        <i className="fas fa-robot text-emerald-500"></i> Agent
                    </Link>

                </div>

                <div className="flex items-center gap-4">
                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="border border-gray-300 hover:bg-gray-50 px-5 py-2.5 rounded-xl font-medium text-sm"
                        >
                            <i className="fas fa-sign-out-alt mr-2"></i>Logout
                        </button>
                    ) : (
                        <Link to="/login" className="border border-gray-300 hover:bg-gray-50 px-5 py-2.5 rounded-xl font-medium text-sm">
                            Login / Register
                        </Link>
                    )}
                    <div className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                        <i className="fas fa-shield-alt"></i>
                        <span>Bank-Grade Security</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
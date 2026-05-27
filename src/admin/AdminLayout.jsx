import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const navItems = [
    { path: '/admin', label: 'Dashboard', icon: 'fas fa-chart-bar', exact: true },
    { path: '/admin/properties', label: 'Properties', icon: 'fas fa-home' },
    { path: '/admin/users', label: 'Users', icon: 'fas fa-users' },
    { path: '/admin/rentals', label: 'Rentals', icon: 'fas fa-key' },
    { path: '/admin/transactions', label: 'Transactions', icon: 'fas fa-money-bill-wave' },
    { path: '/admin/chat-logs', label: 'Chat Logs', icon: 'fas fa-comments' },
];

export default function AdminLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full z-40">
                <div className="p-6 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-bold text-lg">SE</div>
                        <div>
                            <p className="font-bold text-white">SecureEstate</p>
                            <p className="text-xs text-emerald-400">Admin Panel</p>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink key={item.path} to={item.path} end={item.exact}
                                 className={({ isActive }) =>
                                     `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                         isActive ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                     }`
                                 }>
                            <i className={`${item.icon} w-4`}></i>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-700 space-y-2">
                    <NavLink to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white">
                        <i className="fas fa-globe w-4"></i>View Site
                    </NavLink>
                    <button onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300">
                        <i className="fas fa-sign-out-alt w-4"></i>Logout
                    </button>
                </div>
            </aside>
            <main className="ml-64 flex-1 p-8"><Outlet /></main>
        </div>
    );
}
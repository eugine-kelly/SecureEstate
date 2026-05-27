import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const StatCard = ({ label, value, icon, color, to }) => (
    <Link to={to || '#'} className="block">
        <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border-l-4 ${color}`}>
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-500 font-medium">{label}</p>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${color.replace('border-', 'bg-')}`}>
                    <i className={icon}></i>
                </div>
            </div>
            <p className="text-4xl font-bold text-gray-800">{value ?? <i className="fas fa-spinner fa-spin text-2xl text-gray-300"></i>}</p>
        </div>
    </Link>
);

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [chatSessions, setChatSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [statsRes, usersRes, propsRes, chatRes] = await Promise.all([
                    api.get('/admin/stats'),
                    api.get('/admin/users'),
                    api.get('/admin/properties'),
                    api.get('/admin/chat-logs'),
                ]);
                setStats(statsRes.data);
                setUsers(usersRes.data);
                setProperties(propsRes.data);
                setChatSessions(chatRes.data);
            } catch (err) {
                setError('Failed to load dashboard data. Make sure you are logged in as ADMIN.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center">
                <i className="fas fa-spinner fa-spin text-emerald-600 text-4xl mb-4 block"></i>
                <p className="text-gray-500">Loading dashboard...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-6">
            <i className="fas fa-exclamation-circle mr-2"></i>{error}
        </div>
    );

    const recentUsers = users.slice(-5).reverse();
    const recentProperties = properties.slice(-5).reverse();
    const bannedUsers = users.filter(u => !u.enabled);
    const verifiedProps = properties.filter(p => p.ardhisasaVerified);
    const unverifiedProps = properties.filter(p => !p.ardhisasaVerified);

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back, Admin — here's your platform overview</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <StatCard
                    label="Total Users"
                    value={stats?.totalUsers}
                    icon="fas fa-users"
                    color="border-blue-500"
                    to="/admin/users"
                />
                <StatCard
                    label="Total Properties"
                    value={stats?.totalProperties}
                    icon="fas fa-home"
                    color="border-emerald-500"
                    to="/admin/properties"
                />
                <StatCard
                    label="Verified Properties"
                    value={stats?.verifiedProperties}
                    icon="fas fa-shield-alt"
                    color="border-purple-500"
                    to="/admin/properties"
                />
                <StatCard
                    label="Active Chat Sessions"
                    value={chatSessions.length}
                    icon="fas fa-comments"
                    color="border-orange-500"
                    to="/admin/chat-logs"
                />
            </div>

            {/* Second row stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <div className="bg-blue-50 rounded-2xl p-5 text-center">
                    <p className="text-3xl font-bold text-blue-600">{stats?.buyerCount ?? 0}</p>
                    <p className="text-sm text-blue-500 font-medium mt-1">Buyers</p>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-5 text-center">
                    <p className="text-3xl font-bold text-emerald-600">{stats?.sellerCount ?? 0}</p>
                    <p className="text-sm text-emerald-500 font-medium mt-1">Sellers</p>
                </div>
                <div className="bg-purple-50 rounded-2xl p-5 text-center">
                    <p className="text-3xl font-bold text-purple-600">{stats?.agentCount ?? 0}</p>
                    <p className="text-sm text-purple-500 font-medium mt-1">Agents</p>
                </div>
                <div className="bg-red-50 rounded-2xl p-5 text-center">
                    <p className="text-3xl font-bold text-red-600">{bannedUsers.length}</p>
                    <p className="text-sm text-red-500 font-medium mt-1">Banned Users</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Recent Users */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-5 border-b">
                        <h2 className="font-semibold text-gray-800">Recent Users</h2>
                        <Link to="/admin/users" className="text-emerald-600 text-sm hover:underline">View all</Link>
                    </div>
                    <div className="divide-y">
                        {recentUsers.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center py-8">No users yet</p>
                        ) : recentUsers.map(u => (
                            <div key={u.id} className="flex items-center justify-between px-5 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-semibold text-sm">
                                        {u.fullName ? u.fullName[0].toUpperCase() : u.email[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{u.fullName || 'No name'}</p>
                                        <p className="text-xs text-gray-400">{u.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                        u.role === 'ADMIN' ? 'bg-red-100 text-red-600' :
                                            u.role === 'SELLER' ? 'bg-emerald-100 text-emerald-600' :
                                                u.role === 'AGENT' ? 'bg-purple-100 text-purple-600' :
                                                    'bg-blue-100 text-blue-600'
                                    }`}>{u.role}</span>
                                    {!u.enabled && <span className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full">Banned</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Properties */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-5 border-b">
                        <h2 className="font-semibold text-gray-800">Recent Properties</h2>
                        <Link to="/admin/properties" className="text-emerald-600 text-sm hover:underline">View all</Link>
                    </div>
                    <div className="divide-y">
                        {recentProperties.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center py-8">No properties yet</p>
                        ) : recentProperties.map(p => (
                            <div key={p.id} className="flex items-center justify-between px-5 py-3">
                                <div className="flex items-center gap-3">
                                    {p.imageUrl
                                        ? <img src={p.imageUrl} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                                        : <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400"><i className="fas fa-home text-sm"></i></div>
                                    }
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{p.title}</p>
                                        <p className="text-xs text-gray-400">{p.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-emerald-700">KES {Number(p.price).toLocaleString()}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${p.ardhisasaVerified ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                                        {p.ardhisasaVerified ? '✓' : '○'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Property Verification Status */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="font-semibold text-gray-800 mb-5">Property Verification Status</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Verified</span>
                                <span className="font-semibold text-emerald-600">{verifiedProps.length}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3">
                                <div
                                    className="bg-emerald-500 h-3 rounded-full transition-all"
                                    style={{ width: properties.length ? `${(verifiedProps.length / properties.length) * 100}%` : '0%' }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Unverified</span>
                                <span className="font-semibold text-orange-500">{unverifiedProps.length}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3">
                                <div
                                    className="bg-orange-400 h-3 rounded-full transition-all"
                                    style={{ width: properties.length ? `${(unverifiedProps.length / properties.length) * 100}%` : '0%' }}
                                />
                            </div>
                        </div>
                    </div>
                    {unverifiedProps.length > 0 && (
                        <div className="mt-5 bg-orange-50 border border-orange-100 rounded-xl p-4">
                            <p className="text-sm text-orange-600 font-medium">
                                <i className="fas fa-exclamation-triangle mr-2"></i>
                                {unverifiedProps.length} propert{unverifiedProps.length > 1 ? 'ies' : 'y'} pending verification
                            </p>
                            <Link to="/admin/properties" className="text-xs text-orange-500 hover:underline mt-1 block">
                                Review now →
                            </Link>
                        </div>
                    )}
                </div>

                {/* Active Chat Sessions */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-5 border-b">
                        <h2 className="font-semibold text-gray-800">Active Chat Sessions</h2>
                        <Link to="/admin/chat-logs" className="text-emerald-600 text-sm hover:underline">View all</Link>
                    </div>
                    <div className="divide-y max-h-64 overflow-y-auto">
                        {chatSessions.length === 0 ? (
                            <div className="text-center py-10 text-gray-400">
                                <i className="fas fa-comments text-3xl mb-2 block"></i>
                                <p className="text-sm">No chat sessions yet</p>
                                <p className="text-xs mt-1">Sessions appear after users chat with the agent</p>
                            </div>
                        ) : chatSessions.map((sessionKey, i) => {
                            const sessionId = sessionKey.replace('chat:session:', '');
                            return (
                                <Link
                                    key={i}
                                    to="/admin/chat-logs"
                                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"
                                >
                                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                        <i className="fas fa-comment-dots text-emerald-600 text-xs"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Session {sessionId.substring(0, 12)}...</p>
                                        <p className="text-xs text-gray-400">Click to view messages</p>
                                    </div>
                                    <i className="fas fa-chevron-right text-gray-300 text-xs ml-auto"></i>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
                <h2 className="font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                    <Link to="/admin/properties" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2">
                        <i className="fas fa-plus"></i> Add Property
                    </Link>
                    <Link to="/admin/users" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2">
                        <i className="fas fa-users"></i> Manage Users
                    </Link>
                    <Link to="/admin/rentals" className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2">
                        <i className="fas fa-key"></i> Manage Rentals
                    </Link>
                    <Link to="/admin/chat-logs" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2">
                        <i className="fas fa-comments"></i> View Chat Logs
                    </Link>
                    <Link to="/" className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2">
                        <i className="fas fa-globe"></i> View Site
                    </Link>
                </div>
            </div>
        </div>
    );
}
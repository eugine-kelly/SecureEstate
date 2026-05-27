import { useState, useEffect } from 'react';
import api from '../api/axios';

const ROLE_COLORS = {
    ADMIN: 'bg-red-100 text-red-700',
    SELLER: 'bg-emerald-100 text-emerald-700',
    AGENT: 'bg-purple-100 text-purple-700',
    BUYER: 'bg-blue-100 text-blue-700',
};

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchUsers = () => {
        api.get('/admin/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleRoleChange = async (userId, newRole) => {
        await api.put(`/admin/users/${userId}/role`, { role: newRole });
        fetchUsers();
    };

    const handleToggleBan = async (userId) => {
        await api.put(`/admin/users/${userId}/toggle-ban`);
        fetchUsers();
    };

    const filtered = users.filter(u =>
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.fullName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Users</h1>
                <p className="text-gray-500 mt-1">Manage platform users and roles</p>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by email or name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-xl px-5 py-3 w-full max-w-md focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                />
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <i className="fas fa-spinner fa-spin text-emerald-600 text-3xl"></i>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                        <tr>
                            {['Name', 'Email', 'Phone', 'Role', 'Status', 'Actions'].map(h => (
                                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {filtered.map(u => (
                            <tr key={u.id} className={`hover:bg-gray-50 ${!u.enabled ? 'opacity-50' : ''}`}>
                                <td className="px-4 py-3 font-medium text-gray-800">{u.fullName || '—'}</td>
                                <td className="px-4 py-3 text-gray-500">{u.email}</td>
                                <td className="px-4 py-3 text-gray-500">{u.phone || '—'}</td>
                                <td className="px-4 py-3">
                                    {u.role === 'ADMIN' ? (
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${ROLE_COLORS['ADMIN']}`}>ADMIN</span>
                                    ) : (
                                        <select
                                            value={u.role}
                                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                            className={`text-xs font-medium px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${ROLE_COLORS[u.role]}`}
                                        >
                                            <option value="BUYER">BUYER</option>
                                            <option value="SELLER">SELLER</option>
                                            <option value="AGENT">AGENT</option>
                                        </select>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.enabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {u.enabled ? 'Active' : 'Banned'}
                                        </span>
                                </td>
                                <td className="px-4 py-3">
                                    {u.role !== 'ADMIN' && (
                                        <button
                                            onClick={() => handleToggleBan(u.id)}
                                            className={`px-3 py-1 rounded-lg text-xs font-medium ${u.enabled ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                                        >
                                            {u.enabled ? <><i className="fas fa-ban mr-1"></i>Ban</> : <><i className="fas fa-check mr-1"></i>Unban</>}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="text-center py-16 text-gray-400">
                            <i className="fas fa-users text-4xl mb-3 block"></i>
                            <p>No users found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
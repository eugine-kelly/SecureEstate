import { useState, useEffect } from 'react';
import api from '../api/axios';

const STATUS_STYLES = {
    PENDING:    'bg-yellow-100 text-yellow-700',
    PAID:       'bg-blue-100 text-blue-700',
    IN_ESCROW:  'bg-purple-100 text-purple-700',
    RELEASED:   'bg-emerald-100 text-emerald-700',
    REFUNDED:   'bg-gray-100 text-gray-600',
    FAILED:     'bg-red-100 text-red-600',
};

export default function AdminTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    const fetchTransactions = () => {
        api.get('/mpesa/admin/transactions')
            .then(res => setTransactions(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchTransactions(); }, []);

    const handleRelease = async (id) => {
        if (!window.confirm('Release escrow funds to seller?')) return;
        await api.post(`/mpesa/admin/release/${id}`);
        fetchTransactions();
    };

    const handleRefund = async (id) => {
        if (!window.confirm('Refund this transaction to buyer?')) return;
        await api.post(`/mpesa/admin/refund/${id}`);
        fetchTransactions();
    };

    const filtered = filter === 'ALL' ? transactions : transactions.filter(t => t.status === filter);
    const escrowTotal = transactions
        .filter(t => t.status === 'IN_ESCROW')
        .reduce((sum, t) => sum + (t.amount || 0), 0);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Escrow Transactions</h1>
                <p className="text-gray-500 mt-1">Manage M-Pesa payments and escrow releases</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                {[
                    { label: 'Total', value: transactions.length, color: 'bg-gray-50 text-gray-700' },
                    { label: 'In Escrow', value: transactions.filter(t => t.status === 'IN_ESCROW').length, color: 'bg-purple-50 text-purple-700' },
                    { label: 'Released', value: transactions.filter(t => t.status === 'RELEASED').length, color: 'bg-emerald-50 text-emerald-700' },
                    { label: 'Escrow Value', value: `KES ${escrowTotal.toLocaleString()}`, color: 'bg-blue-50 text-blue-700' },
                ].map(s => (
                    <div key={s.label} className={`${s.color} rounded-2xl p-5`}>
                        <p className="text-2xl font-bold">{s.value}</p>
                        <p className="text-sm mt-1 font-medium">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
                {['ALL', 'PENDING', 'IN_ESCROW', 'RELEASED', 'REFUNDED', 'FAILED'].map(s => (
                    <button key={s} onClick={() => setFilter(s)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${filter === s ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                        {s.replace('_', ' ')}
                    </button>
                ))}
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
                            {['ID', 'Phone', 'Property', 'Amount', 'Type', 'Status', 'Receipt', 'Actions'].map(h => (
                                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {filtered.map(t => (
                            <tr key={t.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-400 text-xs">#{t.id}</td>
                                <td className="px-4 py-3 font-medium">{t.phoneNumber || '—'}</td>
                                <td className="px-4 py-3 text-gray-500">#{t.propertyId || '—'}</td>
                                <td className="px-4 py-3 font-semibold text-emerald-700">KES {t.amount?.toLocaleString()}</td>
                                <td className="px-4 py-3">
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{t.paymentType}</span>
                                </td>
                                <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[t.status] || ''}`}>
                                            {t.status?.replace('_', ' ')}
                                        </span>
                                </td>
                                <td className="px-4 py-3 text-xs text-gray-400">{t.mpesaReceiptNumber || '—'}</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        {t.status === 'IN_ESCROW' && (
                                            <>
                                                <button onClick={() => handleRelease(t.id)}
                                                        className="text-xs bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-3 py-1 rounded-lg font-medium">
                                                    Release
                                                </button>
                                                <button onClick={() => handleRefund(t.id)}
                                                        className="text-xs bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-lg font-medium">
                                                    Refund
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="text-center py-16 text-gray-400">
                            <i className="fas fa-money-bill-wave text-4xl mb-3 block"></i>
                            <p>No transactions found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
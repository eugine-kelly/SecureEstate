import { useState, useEffect } from 'react';
import api from '../api/axios';

const emptyForm = {
    title: '', location: '', price: '', type: 'Apartment',
    description: '', imageUrl: ''
};

const RISK_COLORS = {
    LOW:     'bg-emerald-100 text-emerald-700 border-emerald-200',
    MEDIUM:  'bg-yellow-100 text-yellow-700 border-yellow-200',
    HIGH:    'bg-red-100 text-red-700 border-red-200',
    UNKNOWN: 'bg-gray-100 text-gray-600 border-gray-200',
};

const RISK_ICONS = {
    LOW: 'fas fa-check-circle',
    MEDIUM: 'fas fa-exclamation-triangle',
    HIGH: 'fas fa-times-circle',
    UNKNOWN: 'fas fa-question-circle',
};

export default function AdminProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [error, setError] = useState('');
    const [fraudResult, setFraudResult] = useState(null);
    const [scanDone, setScanDone] = useState(false);

    const fetchProperties = () => {
        api.get('/admin/properties')
            .then(res => setProperties(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchProperties(); }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Reset scan when form changes
        setScanDone(false);
        setFraudResult(null);
    };

    const handleScanFraud = async () => {
        if (!form.title || !form.location || !form.price) {
            setError('Please fill in title, location and price before scanning.');
            return;
        }
        setScanning(true);
        setError('');
        setFraudResult(null);
        try {
            const res = await api.post('/admin/properties/scan', {
                ...form,
                price: parseFloat(form.price),
            });
            setFraudResult(res.data);
            setScanDone(true);
        } catch (err) {
            setError('Fraud scan failed. You can still save the property.');
            setScanDone(true);
        } finally {
            setScanning(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            if (editingId) {
                await api.put(`/admin/properties/${editingId}`, {
                    ...form, price: parseFloat(form.price)
                });
            } else {
                await api.post('/admin/properties', {
                    ...form, price: parseFloat(form.price)
                });
            }
            setShowForm(false);
            setForm(emptyForm);
            setEditingId(null);
            setFraudResult(null);
            setScanDone(false);
            fetchProperties();
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to save property.');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (property) => {
        setForm({
            title: property.title,
            location: property.location,
            price: property.price,
            type: property.type,
            description: property.description || '',
            imageUrl: property.imageUrl || '',
        });
        setEditingId(property.id);
        setFraudResult(null);
        setScanDone(false);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this property?')) return;
        await api.delete(`/admin/properties/${id}`);
        fetchProperties();
    };

    const handleToggleVerify = async (id) => {
        await api.put(`/admin/properties/${id}/toggle-verify`);
        fetchProperties();
    };

    const openNewForm = () => {
        setShowForm(true);
        setEditingId(null);
        setForm(emptyForm);
        setFraudResult(null);
        setScanDone(false);
        setError('');
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Properties</h1>
                    <p className="text-gray-500 mt-1">Manage listings — AI fraud scan on every submission</p>
                </div>
                <button onClick={openNewForm}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2">
                    <i className="fas fa-plus"></i> Add Property
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">
                            {editingId ? 'Edit Property' : 'Add New Property'}
                        </h2>

                        {error && (
                            <div className="mb-4 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm border border-red-200">
                                <i className="fas fa-exclamation-circle mr-2"></i>{error}
                            </div>
                        )}

                        {/* Fraud Scan Result */}
                        {fraudResult && (
                            <div className={`mb-5 border rounded-2xl p-4 ${RISK_COLORS[fraudResult.riskLevel] || RISK_COLORS.UNKNOWN}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <i className={RISK_ICONS[fraudResult.riskLevel] || RISK_ICONS.UNKNOWN}></i>
                                        AI Fraud Scan — {fraudResult.riskLevel} Risk
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold">{fraudResult.fraudScore}</span>
                                        <span className="text-xs">/100</span>
                                        <p className="text-xs">fraud score</p>
                                    </div>
                                </div>
                                {/* Score bar */}
                                <div className="w-full bg-white/50 rounded-full h-2 mb-2">
                                    <div
                                        className={`h-2 rounded-full transition-all ${
                                            fraudResult.fraudScore < 30 ? 'bg-emerald-500' :
                                                fraudResult.fraudScore < 60 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                        style={{ width: `${fraudResult.fraudScore}%` }}
                                    />
                                </div>
                                {fraudResult.reasons && (
                                    <p className="text-xs mt-1">
                                        <strong>Notes:</strong> {fraudResult.reasons}
                                    </p>
                                )}
                                {fraudResult.recommendation && (
                                    <p className="text-xs mt-1">
                                        <strong>Recommendation:</strong> {fraudResult.recommendation}
                                    </p>
                                )}
                                {!fraudResult.approved && (
                                    <p className="text-xs mt-2 font-semibold">
                                        ⚠️ This listing was flagged. Saving will be blocked.
                                    </p>
                                )}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title *</label>
                                    <input name="title" value={form.title} onChange={handleChange} required
                                           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Location *</label>
                                    <input name="location" value={form.location} onChange={handleChange} required
                                           placeholder="e.g. Westlands, Nairobi"
                                           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Price (KES) *</label>
                                    <input name="price" type="number" value={form.price} onChange={handleChange} required
                                           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Type</label>
                                    <select name="type" value={form.type} onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm">
                                        <option>Apartment</option>
                                        <option>House</option>
                                        <option>Villa</option>
                                        <option>Land</option>
                                        <option>Commercial</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                <input name="imageUrl" value={form.imageUrl} onChange={handleChange}
                                       placeholder="https://images.unsplash.com/..."
                                       className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description *</label>
                                <textarea name="description" value={form.description} onChange={handleChange} rows={3} required
                                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm resize-none" />
                            </div>

                            <div className="flex gap-3 pt-2">
                                {/* Scan button */}
                                {!editingId && (
                                    <button type="button" onClick={handleScanFraud} disabled={scanning}
                                            className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2">
                                        {scanning
                                            ? <><i className="fas fa-spinner fa-spin"></i> Scanning...</>
                                            : <><i className="fas fa-robot"></i> {scanDone ? 'Re-scan' : 'AI Fraud Scan'}</>
                                        }
                                    </button>
                                )}

                                {/* Save button */}
                                <button type="submit"
                                        disabled={saving || (!editingId && !scanDone)}
                                        title={!editingId && !scanDone ? 'Run AI fraud scan first' : ''}
                                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2">
                                    {saving
                                        ? <><i className="fas fa-spinner fa-spin"></i> Saving...</>
                                        : <><i className="fas fa-save"></i> {!editingId && !scanDone ? 'Scan First' : 'Save Property'}</>
                                    }
                                </button>

                                <button type="button" onClick={() => setShowForm(false)}
                                        className="px-6 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl font-medium text-gray-600">
                                    Cancel
                                </button>
                            </div>

                            {!editingId && !scanDone && (
                                <p className="text-xs text-center text-gray-400">
                                    <i className="fas fa-info-circle mr-1"></i>
                                    Run AI fraud scan before saving to verify listing authenticity
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            )}

            {/* Properties Table */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <i className="fas fa-spinner fa-spin text-emerald-600 text-3xl"></i>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                        <tr>
                            {['Image', 'Title', 'Location', 'Price', 'Type', 'Verified', 'Actions'].map(h => (
                                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {properties.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    {p.imageUrl
                                        ? <img src={p.imageUrl} alt={p.title} className="w-14 h-10 object-cover rounded-lg" />
                                        : <div className="w-14 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400"><i className="fas fa-image"></i></div>
                                    }
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-800">{p.title}</td>
                                <td className="px-4 py-3 text-gray-500">{p.location}</td>
                                <td className="px-4 py-3 font-semibold text-emerald-700">
                                    KES {Number(p.price).toLocaleString()}
                                </td>
                                <td className="px-4 py-3">
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">{p.type}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <button onClick={() => handleToggleVerify(p.id)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${p.ardhisasaVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                        {p.ardhisasaVerified ? '✓ Verified' : 'Unverified'}
                                    </button>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(p)}
                                                className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-50 text-xs font-medium">
                                            <i className="fas fa-edit mr-1"></i>Edit
                                        </button>
                                        <button onClick={() => handleDelete(p.id)}
                                                className="text-red-600 hover:text-red-800 px-3 py-1 rounded-lg hover:bg-red-50 text-xs font-medium">
                                            <i className="fas fa-trash mr-1"></i>Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {properties.length === 0 && (
                        <div className="text-center py-16 text-gray-400">
                            <i className="fas fa-home text-4xl mb-3 block"></i>
                            <p>No properties yet. Add your first one!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
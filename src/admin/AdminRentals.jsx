import { useState } from 'react';
import { rentals as initialRentals } from '../data/rentals';

// Note: Rentals are currently static. Move rentals to the DB,
// replace this with API calls like AdminProperties.jsx

const emptyForm = { title: '', location: '', price: '', type: 'Apartment', description: '', image: '', beds: 0, baths: 0, verified: false };

export default function AdminRentals() {
    const [rentals, setRentals] = useState(initialRentals);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm({ ...form, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            setRentals(rentals.map(r => r.id === editingId ? { ...r, ...form } : r));
        } else {
            const newRental = { ...form, id: Date.now(), price: form.price + '/mo' };
            setRentals([...rentals, newRental]);
        }
        setShowForm(false);
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleEdit = (rental) => {
        setForm({
            title: rental.title,
            location: rental.location,
            price: rental.price.replace('/mo', ''),
            type: rental.type,
            description: rental.description,
            image: rental.image,
            beds: rental.beds,
            baths: rental.baths,
            verified: rental.verified,
        });
        setEditingId(rental.id);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (!window.confirm('Delete this rental?')) return;
        setRentals(rentals.filter(r => r.id !== id));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Rentals</h1>
                    <p className="text-gray-500 mt-1">Manage rental listings</p>
                </div>
                <button
                    onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i> Add Rental
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Rental' : 'Add New Rental'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input name="title" value={form.title} onChange={handleChange} required
                                           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Location</label>
                                    <input name="location" value={form.location} onChange={handleChange} required
                                           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Price (KES/mo)</label>
                                    <input name="price" value={form.price} onChange={handleChange} required
                                           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Type</label>
                                    <select name="type" value={form.type} onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm">
                                        <option>Apartment</option>
                                        <option>House</option>
                                        <option>Villa</option>
                                        <option>Commercial</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Beds</label>
                                    <input name="beds" type="number" value={form.beds} onChange={handleChange}
                                           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Baths</label>
                                    <input name="baths" type="number" value={form.baths} onChange={handleChange}
                                           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                <input name="image" value={form.image} onChange={handleChange}
                                       className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea name="description" value={form.description} onChange={handleChange} rows={3} required
                                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm resize-none" />
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" name="verified" checked={form.verified} onChange={handleChange} className="accent-emerald-600 w-4 h-4" />
                                <span className="text-sm font-medium">Ardhisasa Verified</span>
                            </label>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-medium">
                                    Save Rental
                                </button>
                                <button type="button" onClick={() => setShowForm(false)}
                                        className="flex-1 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl font-medium text-gray-600">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Rentals Table */}
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
                    {rentals.map(r => (
                        <tr key={r.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                                {r.image
                                    ? <img src={r.image} alt={r.title} className="w-14 h-10 object-cover rounded-lg" />
                                    : <div className="w-14 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400"><i className="fas fa-image"></i></div>
                                }
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-800">{r.title}</td>
                            <td className="px-4 py-3 text-gray-500">{r.location}</td>
                            <td className="px-4 py-3 font-semibold text-emerald-700">KES {r.price}</td>
                            <td className="px-4 py-3"><span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">{r.type}</span></td>
                            <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                        {r.verified ? '✓ Verified' : 'Unverified'}
                                    </span>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(r)} className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-50 text-xs font-medium">
                                        <i className="fas fa-edit mr-1"></i>Edit
                                    </button>
                                    <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:text-red-800 px-3 py-1 rounded-lg hover:bg-red-50 text-xs font-medium">
                                        <i className="fas fa-trash mr-1"></i>Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
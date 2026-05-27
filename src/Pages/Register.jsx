import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        role: 'BUYER',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/register', formData);
            const { accessToken, role } = response.data;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('role', role);

            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-emerald-600 rounded-2xl mx-auto flex items-center justify-center text-white text-4xl font-bold">SE</div>
                    <h2 className="text-3xl font-bold mt-6">Create Account</h2>
                    <p className="text-gray-600 mt-2">Join Kenya's most secure property marketplace</p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-2xl text-sm">
                        <i className="fas fa-exclamation-circle mr-2"></i>{error}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g. 0712345678"
                            className="w-full border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2">Password <span className="text-gray-400 font-normal">(min. 6 characters)</span></label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            minLength={6}
                            className="w-full border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                            required
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium mb-2">I want to</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                            <option value="BUYER">Buy or Rent a Property</option>
                            <option value="SELLER">Sell or List a Property</option>
                            <option value="AGENT">Work as a Real Estate Agent</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2"
                    >
                        {loading ? <><i className="fas fa-spinner fa-spin"></i> Creating account...</> : 'Create Account Securely'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-emerald-600 font-medium hover:underline">Login here</Link>
                </p>

                <p className="text-center text-xs text-gray-400 mt-6">
                    Protected by RBAC • End-to-End Encryption • Kenya Data Protection Act
                </p>
            </div>
        </div>
    );
}
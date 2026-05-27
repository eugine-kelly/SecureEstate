import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [newPassword, setNewPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirm) {
            setError('Passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await api.post('/auth/reset-password', { token, newPassword });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Reset failed. The link may have expired.');
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-6">
                <div className="text-center">
                    <i className="fas fa-exclamation-triangle text-5xl text-red-400 mb-4 block"></i>
                    <h2 className="text-2xl font-bold mb-2">Invalid Reset Link</h2>
                    <p className="text-gray-500 mb-6">This link is missing or invalid.</p>
                    <Link to="/forgot-password" className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-medium hover:bg-emerald-700">
                        Request New Link
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-emerald-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl">
                        <i className="fas fa-lock"></i>
                    </div>
                    <h2 className="text-3xl font-bold mt-4">New Password</h2>
                    <p className="text-gray-500 mt-1 text-sm">Choose a strong password</p>
                </div>

                {success ? (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto flex items-center justify-center mb-4">
                            <i className="fas fa-check text-emerald-600 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Password Reset!</h3>
                        <p className="text-gray-500 text-sm">Redirecting you to login...</p>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">
                                <i className="fas fa-exclamation-circle mr-2"></i>{error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label className="block text-sm font-medium mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                                    placeholder="Min. 6 characters"
                                    required
                                />
                            </div>
                            <div className="mb-8">
                                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    className="w-full border border-gray-300 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                                    placeholder="Repeat password"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2"
                            >
                                {loading
                                    ? <><i className="fas fa-spinner fa-spin"></i> Resetting...</>
                                    : <><i className="fas fa-shield-alt"></i> Reset Password</>
                                }
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
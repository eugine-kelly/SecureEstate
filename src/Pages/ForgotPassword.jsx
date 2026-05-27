import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/auth/forgot-password', { email });
            setSent(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-emerald-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl">
                        <i className="fas fa-key"></i>
                    </div>
                    <h2 className="text-3xl font-bold mt-4">Reset Password</h2>
                    <p className="text-gray-500 mt-1 text-sm">
                        Enter your email and we'll send you a reset link
                    </p>
                </div>

                {sent ? (
                    // Success state
                    <div className="text-center">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto flex items-center justify-center mb-4">
                            <i className="fas fa-envelope text-emerald-600 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Check your inbox!</h3>
                        <p className="text-gray-500 text-sm mb-6">
                            We've sent a password reset link to <strong>{email}</strong>.
                            The link expires in 30 minutes.
                        </p>
                        <p className="text-xs text-gray-400 mb-6">
                            Didn't receive it? Check your spam folder or{' '}
                            <button
                                onClick={() => setSent(false)}
                                className="text-emerald-600 hover:underline"
                            >
                                try again
                            </button>
                        </p>
                        <Link
                            to="/login"
                            className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-semibold text-center"
                        >
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    // Form state
                    <>
                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">
                                <i className="fas fa-exclamation-circle mr-2"></i>{error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2"
                            >
                                {loading
                                    ? <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                                    : <><i className="fas fa-paper-plane"></i> Send Reset Link</>
                                }
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-6">
                            Remember your password?{' '}
                            <Link to="/login" className="text-emerald-600 font-medium hover:underline">
                                Back to login
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function OAuth2Callback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (token) {
            try {
                // Decode JWT to get role
                const base64Payload = token.split('.')[1];
                // Fix base64 padding
                const paddedPayload = base64Payload + '=='.slice((base64Payload.length % 4) || 4);
                const payload = JSON.parse(atob(paddedPayload));
                const role = payload.role || 'BUYER';

                // Save token and role
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);

                console.log('OAuth2 login successful, role:', role);

                // Redirect based on role
                if (role === 'ADMIN') {
                    navigate('/admin', { replace: true });
                } else {
                    navigate('/', { replace: true });
                }
            } catch (e) {
                console.error('Token decode error:', e);
                navigate('/login?error=invalid_token', { replace: true });
            }
        } else if (error) {
            navigate('/login?error=oauth_failed', { replace: true });
        } else {
            navigate('/login', { replace: true });
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4">SE</div>
                <p className="text-gray-600 text-lg">Signing you in...</p>
                <i className="fas fa-spinner fa-spin text-emerald-600 text-2xl mt-4 block"></i>
            </div>
        </div>
    );
}
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    const location = useLocation();

    if (!token) {
        // Redirect to login, remembering where they wanted to go
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return children;
}
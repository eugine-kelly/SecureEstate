import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProperties from './admin/AdminProperties';
import AdminUsers from './admin/AdminUsers';
import AdminRentals from './admin/AdminRentals';
import AdminChatLogs from './admin/AdminChatLogs';
import AdminTransactions from './admin/AdminTransactions';
import Home from './Pages/Home';
import Buy from './Pages/Buy';
import Rent from './Pages/Rent';
import Listings from './Pages/Listings';
import PropertyDetail from './Pages/PropertyDetail';
import Agent from './Pages/Agent';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import OAuth2Callback from './Pages/OAuth2Callback';
import HelpCenter from './Pages/HelpCenter';
import About from './Pages/About';
import HowItWorks from './Pages/HowItWorks';
import Contact from './Pages/Contact';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';

function App() {
    return (
        <Router>
            <Routes>
                {/* Admin routes — no Navbar/Footer */}
                <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="properties" element={<AdminProperties />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="rentals" element={<AdminRentals />} />
                    <Route path="transactions" element={<AdminTransactions />} />
                    <Route path="chat-logs" element={<AdminChatLogs />} />
                </Route>

                {/* Public + protected routes */}
                <Route path="*" element={
                    <div className="min-h-screen bg-gray-50">
                        <Navbar />
                        <Routes>
                            {/* Public */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/oauth2/callback" element={<OAuth2Callback />} />
                            <Route path="/help" element={<HelpCenter />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/how-it-works" element={<HowItWorks />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />

                            {/* Protected */}
                            <Route path="/buy" element={<PrivateRoute><Buy /></PrivateRoute>} />
                            <Route path="/rent" element={<PrivateRoute><Rent /></PrivateRoute>} />
                            <Route path="/listings" element={<PrivateRoute><Listings /></PrivateRoute>} />
                            <Route path="/property/:id" element={<PrivateRoute><PropertyDetail /></PrivateRoute>} />
                            <Route path="/agent" element={<PrivateRoute><Agent /></PrivateRoute>} />
                        </Routes>
                        <Footer />
                    </div>
                } />
            </Routes>
        </Router>
    );
}

export default App;
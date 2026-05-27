export default function Privacy() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
            <p className="text-gray-500 mb-10">Last updated: April 2026</p>

            {[
                {
                    title: '1. Information We Collect',
                    content: 'We collect information you provide when registering, including your name, email address, phone number, and M-Pesa transaction details. We also collect property search and browsing activity to improve your experience.'
                },
                {
                    title: '2. How We Use Your Information',
                    content: 'Your information is used to provide property listings, process M-Pesa payments, verify property titles through Ardhisasa, send notifications about listings you\'ve unlocked, and improve our AI agent responses.'
                },
                {
                    title: '3. M-Pesa Payments',
                    content: 'All payment transactions are processed through Safaricom\'s official Daraja API. We do not store your M-Pesa PIN. Transaction receipts are stored securely to prove access to property details.'
                },
                {
                    title: '4. Data Security',
                    content: 'We implement bank-grade security including end-to-end encryption, Multi-Factor Authentication (MFA), Role-Based Access Control (RBAC), and compliance with the Kenya Data Protection Act 2019.'
                },
                {
                    title: '5. Data Sharing',
                    content: 'We do not sell your personal data to third parties. Agent contact details are only shared with users who have paid the access fee for a specific property. We share data with Safaricom only for payment processing.'
                },
                {
                    title: '6. Your Rights',
                    content: 'Under the Kenya Data Protection Act, you have the right to access, correct, or delete your personal data. Contact us at hello@secureestate.co.ke to exercise these rights.'
                },
                {
                    title: '7. Contact',
                    content: 'For privacy concerns, contact our Data Protection Officer at privacy@secureestate.co.ke or call +254 700 000 000.'
                },
            ].map(section => (
                <div key={section.title} className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">{section.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{section.content}</p>
                </div>
            ))}
        </div>
    );
}
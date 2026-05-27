export default function Terms() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Terms of Service</h1>
            <p className="text-gray-500 mb-10">Last updated: April 2026</p>

            {[
                {
                    title: '1. Acceptance of Terms',
                    content: 'By using SecureEstate, you agree to these Terms of Service. If you do not agree, please do not use our platform.'
                },
                {
                    title: '2. Access Fees',
                    content: 'SecureEstate charges a one-time access fee to unlock agent contacts and full property details. Fees range from KES 200 for rentals to KES 1,500 for premium properties. All fees are paid via M-Pesa and are non-refundable once agent details have been revealed.'
                },
                {
                    title: '3. Property Listings',
                    content: 'All properties listed on SecureEstate are verified through the Ardhisasa land registry system. However, SecureEstate acts as a marketplace and is not responsible for the accuracy of information provided by property owners or agents.'
                },
                {
                    title: '4. User Accounts',
                    content: 'You are responsible for maintaining the security of your account. SecureEstate uses MFA and RBAC to protect accounts. Do not share your login credentials with anyone.'
                },
                {
                    title: '5. Prohibited Activities',
                    content: 'You may not post fraudulent listings, impersonate agents, use the platform for money laundering, or attempt to bypass the access fee system. Violations will result in immediate account termination.'
                },
                {
                    title: '6. Limitation of Liability',
                    content: 'SecureEstate is not liable for any transactions that occur directly between buyers and agents outside our platform. We facilitate introductions only and are not party to property sale agreements.'
                },
                {
                    title: '7. Governing Law',
                    content: 'These Terms are governed by the laws of Kenya, including the Kenya Data Protection Act 2019 and the Consumer Protection Act.'
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
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
                        <Link
                            href="/"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

                {/* Mission Section */}
                <section className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        We&apos;re building a platform that brings people together to share ideas,
                        collaborate on projects, and create meaningful connections. Our mission
                        is to provide a space where everyone feels welcome and empowered to
                        contribute to the community.
                    </p>
                </section>

                {/* Values Grid */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Community First</h3>
                            <p className="text-gray-600">
                                We prioritize the needs and feedback of our community members in everything we do.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🌱</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Continuous Growth</h3>
                            <p className="text-gray-600">
                                We believe in constant improvement and learning from our experiences.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">💡</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
                            <p className="text-gray-600">
                                We embrace new ideas and technologies to create better experiences.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🔒</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy & Security</h3>
                            <p className="text-gray-600">
                                Your data and privacy are our top priorities. We use industry-standard security practices.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🌍</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Inclusivity</h3>
                            <p className="text-gray-600">
                                Everyone is welcome here, regardless of background, experience, or perspective.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality</h3>
                            <p className="text-gray-600">
                                We are committed to delivering high-quality experiences and reliable service.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <span className="text-blue-600 mr-3">📧</span>
                                    <div>
                                        <p className="font-medium text-gray-900">Email</p>
                                        <a href="mailto:contact@example.com" className="text-blue-600 hover:text-blue-800">
                                            contact@example.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <span className="text-blue-600 mr-3">💬</span>
                                    <div>
                                        <p className="font-medium text-gray-900">Support</p>
                                        <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-800">
                                            support@example.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <span className="text-blue-600 mr-3">🐦</span>
                                    <div>
                                        <p className="font-medium text-gray-900">Social Media</p>
                                        <a href="#" className="text-blue-600 hover:text-blue-800">
                                            @yourplatform
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Send us a Message</h3>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mt-8 bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

                    <div className="space-y-4">
                        <details className="group">
                            <summary className="cursor-pointer font-semibold text-gray-900 py-2 flex justify-between items-center">
                                How do I get started?
                                <span className="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="text-gray-600 mt-2 pl-4">
                                Simply register for an account, complete your profile, and start exploring our community features!
                            </p>
                        </details>

                        <details className="group">
                            <summary className="cursor-pointer font-semibold text-gray-900 py-2 flex justify-between items-center">
                                Is this platform free to use?
                                <span className="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="text-gray-600 mt-2 pl-4">
                                Yes! Our core features are completely free. We may offer premium features in the future.
                            </p>
                        </details>

                        <details className="group">
                            <summary className="cursor-pointer font-semibold text-gray-900 py-2 flex justify-between items-center">
                                How do I report a problem?
                                <span className="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="text-gray-600 mt-2 pl-4">
                                You can contact our support team via email or use the contact form above to report any issues.
                            </p>
                        </details>
                    </div>
                </section>
            </main>
        </div>
    );
}
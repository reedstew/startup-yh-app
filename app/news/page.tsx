import Link from 'next/link';

export default function NewsPage() {
    // This would typically come from your database/API
    const newsItems = [
        {
            id: 1,
            title: "Welcome to Our Platform",
            date: "2024-11-01",
            category: "Announcement",
            excerpt: "We're excited to announce the launch of our new community platform. Join us in building something amazing together.",
            author: "Admin Team"
        },
        {
            id: 2,
            title: "New Features Released",
            date: "2024-10-28",
            category: "Update",
            excerpt: "Check out our latest features including enhanced forums, better navigation, and improved user profiles.",
            author: "Development Team"
        },
        {
            id: 3,
            title: "Community Guidelines Updated",
            date: "2024-10-25",
            category: "Important",
            excerpt: "We've updated our community guidelines to ensure a safe and welcoming environment for all members.",
            author: "Moderation Team"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">News & Updates</h1>
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
                {/* Categories */}
                <div className="mb-8 flex gap-2 flex-wrap">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700">
                        All
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300">
                        Announcements
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300">
                        Updates
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300">
                        Important
                    </button>
                </div>

                {/* News Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {newsItems.map((item) => (
                        <article
                            key={item.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                    {item.category}
                  </span>
                                    <span className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                  </span>
                                </div>

                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    {item.title}
                                </h2>

                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {item.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    By {item.author}
                  </span>
                                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                                        Read more →
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Featured Game Section */}
                <section className="mt-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-md p-8 text-white">
                    <h2 className="text-2xl font-bold mb-4">🎮 Featured Game: 7 Habits Mountain Climb</h2>
                    <p className="mb-4 text-lg">
                        Embark on an educational adventure! Climb the mountain and learn the 7 Habits of Highly Effective People.
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">🏔️</span>
                        <div>
                            <p className="font-semibold">Learn leadership skills while you play!</p>
                            <p className="text-sm opacity-90">Defeat monsters, reach checkpoints, and discover each habit</p>
                        </div>
                    </div>
                    <Link
                        href="/game"
                        className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                    >
                        Play Now! 🎮
                    </Link>
                </section>

                {/* Forums Section */}
                <section className="mt-12 bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Forums</h2>

                    <div className="space-y-4">
                        <div className="border-l-4 border-blue-600 pl-4 py-2 hover:bg-gray-50 transition-colors">
                            <h3 className="font-semibold text-gray-900">General Discussion</h3>
                            <p className="text-sm text-gray-600">Talk about anything and everything</p>
                            <span className="text-xs text-gray-500">1,234 posts</span>
                        </div>

                        <div className="border-l-4 border-green-600 pl-4 py-2 hover:bg-gray-50 transition-colors">
                            <h3 className="font-semibold text-gray-900">Feature Requests</h3>
                            <p className="text-sm text-gray-600">Suggest new features and improvements</p>
                            <span className="text-xs text-gray-500">567 posts</span>
                        </div>

                        <div className="border-l-4 border-yellow-600 pl-4 py-2 hover:bg-gray-50 transition-colors">
                            <h3 className="font-semibold text-gray-900">Support & Help</h3>
                            <p className="text-sm text-gray-600">Get help from the community</p>
                            <span className="text-xs text-gray-500">890 posts</span>
                        </div>

                        <div className="border-l-4 border-red-600 pl-4 py-2 hover:bg-gray-50 transition-colors">
                            <h3 className="font-semibold text-gray-900">Bug Reports</h3>
                            <p className="text-sm text-gray-600">Report issues and bugs</p>
                            <span className="text-xs text-gray-500">123 posts</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
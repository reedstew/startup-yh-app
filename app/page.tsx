import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center text-white max-w-4xl">
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
                        Young Changemakers
                    </h1>
                    <p className="text-xl md:text-2xl mb-4 opacity-90">
                        Empowering kids to change the world, one story at a time
                    </p>
                    <p className="text-lg mb-12 opacity-80">
                        Discover inspiring stories, support youth-led nonprofits, and find resources to start your own journey
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/stories"
                            className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors inline-block shadow-lg"
                        >
                            View Stories
                        </Link>
                        <Link
                            href="/campaigns"
                            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-block"
                        >
                            Support a Cause
                        </Link>
                    </div>

                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                            <div className="text-4xl font-bold mb-2">100+</div>
                            <div className="text-sm opacity-90">Young Changemakers</div>
                        </div>
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                            <div className="text-4xl font-bold mb-2">50K+</div>
                            <div className="text-sm opacity-90">Lives Impacted</div>
                        </div>
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                            <div className="text-4xl font-bold mb-2">$2M+</div>
                            <div className="text-sm opacity-90">Funds Raised</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
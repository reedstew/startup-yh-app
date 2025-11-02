import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white p-4 md:p-8 relative">
            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)]">

                {/* Upper Left - News & Forums */}
                <Link
                    href="/news"
                    className="flex items-center justify-center bg-[#E21B3C] hover:bg-[#C91132] transition-colors duration-300 text-white rounded-3xl shadow-lg"
                >
                    <div className="text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-2">News & Forums</h2>
                        <p className="text-lg md:text-xl opacity-90">Stay updated with the latest</p>
                    </div>
                </Link>

                {/* Upper Right - Login */}
                <Link
                    href="/login"
                    className="flex items-center justify-center bg-[#1368CE] hover:bg-[#0F5AAF] transition-colors duration-300 text-white rounded-3xl shadow-lg"
                >
                    <div className="text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-2">Login</h2>
                        <p className="text-lg md:text-xl opacity-90">Access your account</p>
                    </div>
                </Link>

                {/* Bottom Left - About & Contact */}
                <Link
                    href="/about"
                    className="flex items-center justify-center bg-[#FFA602] hover:bg-[#E69500] transition-colors duration-300 text-white rounded-3xl shadow-lg"
                >
                    <div className="text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-2">About & Contact</h2>
                        <p className="text-lg md:text-xl opacity-90">Learn more about us</p>
                    </div>
                </Link>

                {/* Bottom Right - Register */}
                <Link
                    href="/register"
                    className="flex items-center justify-center bg-[#26890C] hover:bg-[#1E6D0A] transition-colors duration-300 text-white rounded-3xl shadow-lg"
                >
                    <div className="text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-2">New Registration</h2>
                        <p className="text-lg md:text-xl opacity-90">Create your account</p>
                    </div>
                </Link>
            </div>

            {/* Centered Logo */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="bg-white rounded-full p-6 md:p-8 shadow-2xl">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={120}
                        height={120}
                        className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32"
                    />
                </div>
            </div>
        </div>
    );
}
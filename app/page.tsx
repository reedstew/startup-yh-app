import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
    return (
        <>
            {/* Mobile Layout: Logo on top, grid below */}
            <div className="md:hidden min-h-screen bg-white flex flex-col">
                {/* Logo Section - Top */}
                <div className="flex items-center justify-center py-12 bg-white">
                    <div className="bg-white p-3 shadow-xl rounded-2xl inline-block">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={1000}
                            height={640}
                            className="w-auto h-32"
                        />
                    </div>
                </div>

                {/* Grid Section - Bottom */}
                <div className="flex-1 grid grid-cols-2 gap-3 p-3">
                    {/* Upper Left - News & Forums */}
                    <Link
                        href="/news"
                        className="flex items-center justify-center bg-[#E21B3C] hover:bg-[#C91132] active:bg-[#C91132] transition-colors duration-200 text-white rounded-2xl shadow-lg"
                    >
                        <div className="text-center p-4">
                            <h2 className="text-2xl font-bold mb-1">News & Forums</h2>
                            <p className="text-sm opacity-90">Stay updated</p>
                        </div>
                    </Link>

                    {/* Upper Right - Login */}
                    <Link
                        href="/login"
                        className="flex items-center justify-center bg-[#1368CE] hover:bg-[#0F5AAF] active:bg-[#0F5AAF] transition-colors duration-200 text-white rounded-2xl shadow-lg"
                    >
                        <div className="text-center p-4">
                            <h2 className="text-2xl font-bold mb-1">Login</h2>
                            <p className="text-sm opacity-90">Access account</p>
                        </div>
                    </Link>

                    {/* Bottom Left - About & Contact */}
                    <Link
                        href="/about"
                        className="flex items-center justify-center bg-[#FFA602] hover:bg-[#E69500] active:bg-[#E69500] transition-colors duration-200 text-white rounded-2xl shadow-lg"
                    >
                        <div className="text-center p-4">
                            <h2 className="text-2xl font-bold mb-1">About & Contact</h2>
                            <p className="text-sm opacity-90">Learn more</p>
                        </div>
                    </Link>

                    {/* Bottom Right - Register */}
                    <Link
                        href="/register"
                        className="flex items-center justify-center bg-[#26890C] hover:bg-[#1E6D0A] active:bg-[#1E6D0A] transition-colors duration-200 text-white rounded-2xl shadow-lg"
                    >
                        <div className="text-center p-4">
                            <h2 className="text-2xl font-bold mb-1">Register</h2>
                            <p className="text-sm opacity-90">Create account</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Desktop Layout: Logo centered, 2x2 grid */}
            <div className="hidden md:block min-h-screen bg-white p-4 relative">
                {/* Grid Container */}
                <div className="grid grid-cols-2 gap-4 h-[calc(100vh-2rem)]">

                    {/* Upper Left - News & Forums */}
                    <Link
                        href="/news"
                        className="flex items-center justify-center bg-[#E21B3C] hover:bg-[#C91132] transition-colors duration-300 text-white rounded-3xl shadow-lg"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl lg:text-5xl font-bold mb-2">News & Forums</h2>
                            <p className="text-lg lg:text-xl opacity-90">Stay updated with the latest</p>
                        </div>
                    </Link>

                    {/* Upper Right - Login */}
                    <Link
                        href="/login"
                        className="flex items-center justify-center bg-[#1368CE] hover:bg-[#0F5AAF] transition-colors duration-300 text-white rounded-3xl shadow-lg"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl lg:text-5xl font-bold mb-2">Login</h2>
                            <p className="text-lg lg:text-xl opacity-90">Access your account</p>
                        </div>
                    </Link>

                    {/* Bottom Left - About & Contact */}
                    <Link
                        href="/about"
                        className="flex items-center justify-center bg-[#FFA602] hover:bg-[#E69500] transition-colors duration-300 text-white rounded-3xl shadow-lg"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl lg:text-5xl font-bold mb-2">About & Contact</h2>
                            <p className="text-lg lg:text-xl opacity-90">Learn more about us</p>
                        </div>
                    </Link>

                    {/* Bottom Right - Register */}
                    <Link
                        href="/register"
                        className="flex items-center justify-center bg-[#26890C] hover:bg-[#1E6D0A] transition-colors duration-300 text-white rounded-3xl shadow-lg"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl lg:text-5xl font-bold mb-2">New Registration</h2>
                            <p className="text-lg lg:text-xl opacity-90">Create your account</p>
                        </div>
                    </Link>
                </div>

                {/* Centered Logo */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="bg-white p-4 shadow-2xl rounded-2xl inline-block">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={1000}
                            height={640}
                            className="w-auto h-36 lg:h-48"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
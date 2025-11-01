'use client'

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
                {/* Add your registration form here */}
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}
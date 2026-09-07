"use client";
export default function GlobalError({ error, reset }) {
    return (
        <html lang="en">
            <body>
                <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gray-50">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Something went wrong
                    </h1>
                    <p className="text-gray-600 mb-6 max-w-md">
                        We encountered an unexpected error. Please try again, or go back
                        to the homepage if the problem persists.
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={() => reset()}
                            className="bg-[#000DAF] text-white px-6 py-3 rounded-full hover:bg-[#000DAF]/90 transition-colors"
                        >
                            Try again
                        </button>
                        <a
                            href="/"
                            className="border-2 border-[#000DAF] text-[#000DAF] px-6 py-3 rounded-full hover:bg-[#000DAF] hover:text-white transition-colors"
                        >
                            Go Home
                        </a>
                    </div>

                    {process.env.NODE_ENV === "development" && (
                        <pre className="mt-6 text-left text-xs text-red-500 bg-red-50 p-4 rounded max-w-xl overflow-auto">
                            {error?.message}
                            {"\n"}
                            {error?.stack}
                        </pre>
                    )}
                </div>
            </body>
        </html>
    );
}
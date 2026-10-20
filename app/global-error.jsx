"use client";
import Link from "next/link";
export default function GlobalError({ error, reset }) {
    return (
        <html lang="en">
            <body>
                <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
                    <h1 className="text-3xl font-bold text-ink mb-2">
                        Something went wrong
                    </h1>
                    <p className="text-muted mb-6 max-w-md">
                        We encountered an unexpected error. Please try again, or go back
                        to the homepage if the problem persists.
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={() => reset()}
                            className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-200 transition-colors"
                        >
                            Try again
                        </button>
                        <Link
                            href="/"
                            className="border-2 border-primary text-primary px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-colors"
                        >
                            Go Home
                        </Link>
                    </div>

                    {process.env.NODE_ENV === "development" && (
                        <pre className="mt-6 text-left text-xs text-red bg-red-50 p-4 rounded max-w-xl overflow-auto">
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
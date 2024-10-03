import Link from 'next/link';
import React from 'react';

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">Oops! The page you're looking for doesn't exist.</p>
        <Link href="/" className="mt-6 inline-block px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-500">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

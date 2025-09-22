"use client";

import Link from 'next/link';
import { User, UserCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Career<span className="text-blue-600">Live</span>
            </h1>
            <p className="text-xl text-gray-600 mb-2">Prototype Platform</p>
            <p className="text-gray-500">Connect students with recruiters seamlessly</p>
          </div>

          {/* Role Selection */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Student Button */}
            <Link href="/student">
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Continue as Student</h3>
                  <p className="text-gray-600 text-center">
                    Build your profile, showcase your projects, and connect with recruiters
                  </p>
                </div>
              </div>
            </Link>

            {/* Recruiter Button */}
            <Link href="/recruiter">
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-purple-200 hover:-translate-y-1">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <UserCheck className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Continue as Recruiter</h3>
                  <p className="text-gray-600 text-center">
                    Discover talented students and filter candidates by their experiences
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-16 text-gray-400 text-sm">
            <p>No authentication required • Prototype version</p>
          </div>
        </div>
      </div>
    </div>
  );
}
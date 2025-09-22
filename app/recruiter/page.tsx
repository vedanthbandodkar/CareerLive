"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Filter, Briefcase, Trophy, Users, BookOpen } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import { Section } from '@/app/student/page';

const sectionIcons = {
  'Project': Briefcase,
  'Leadership Role': Users,
  'Competition': Trophy,
  'MOOC': BookOpen,
};

const filterOptions = [
  { key: 'Project', label: 'Projects', icon: Briefcase },
  { key: 'Leadership Role', label: 'Leadership Roles', icon: Users },
  { key: 'Competition', label: 'Competitions', icon: Trophy },
  { key: 'MOOC', label: 'MOOCs', icon: BookOpen },
] as const;

export default function RecruiterPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Load sections from localStorage
  useEffect(() => {
    const savedSections = localStorage.getItem('careerLiveSections');
    if (savedSections) {
      setSections(JSON.parse(savedSections));
    }
  }, []);

  const toggleFilter = (filterKey: string) => {
    setActiveFilters(prev => 
      prev.includes(filterKey)
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  const filteredSections = activeFilters.length === 0 
    ? sections 
    : sections.filter(section => activeFilters.includes(section.type));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <div className="w-px h-6 bg-gray-300" />
              <h1 className="text-2xl font-bold text-gray-900">
                Career<span className="text-purple-600">Live</span>
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Recruiter Dashboard</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter Candidates
            </h2>
            
            <div className="space-y-3">
              {filterOptions.map((option) => {
                const Icon = option.icon;
                const isActive = activeFilters.includes(option.key);
                const count = sections.filter(s => s.type === option.key).length;
                
                return (
                  <label key={option.key} className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => toggleFilter(option.key)}
                      className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <div className="ml-3 flex items-center justify-between flex-1">
                      <div className="flex items-center">
                        <Icon className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-700 group-hover:text-gray-900">
                          {option.label}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {count}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>

            {activeFilters.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={() => setActiveFilters([])}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Summary</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Total sections: {sections.length}</p>
                <p>Showing: {filteredSections.length}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Student Profiles
                {activeFilters.length > 0 && (
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    (filtered by {activeFilters.join(', ')})
                  </span>
                )}
              </h2>
            </div>

            {sections.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No student data available</h3>
                <p className="text-gray-600">
                  Students haven't added any sections yet. Check back later or ask them to build their profiles.
                </p>
              </div>
            ) : filteredSections.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No matching sections</h3>
                <p className="text-gray-600">
                  No sections match your current filters. Try adjusting your filter criteria.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredSections.map((section) => (
                  <SectionCard
                    key={section.id}
                    section={section}
                    icon={sectionIcons[section.type]}
                    isRecruiterView={true}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
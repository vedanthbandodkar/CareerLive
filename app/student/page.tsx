"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, ArrowLeft, Briefcase, Trophy, Users, BookOpen } from 'lucide-react';
import AddSectionModal from '@/components/AddSectionModal';
import SectionCard from '@/components/SectionCard';

export interface Section {
  id: string;
  type: 'Project' | 'Leadership Role' | 'Competition' | 'MOOC';
  title: string;
  description: string;
  tags: string[];
  link?: string;
  createdAt: string;
}

const sectionIcons = {
  'Project': Briefcase,
  'Leadership Role': Users,
  'Competition': Trophy,
  'MOOC': BookOpen,
};

export default function StudentPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load sections from localStorage on component mount
  useEffect(() => {
    const savedSections = localStorage.getItem('careerLiveSections');
    if (savedSections) {
      setSections(JSON.parse(savedSections));
    }
  }, []);

  // Save to localStorage whenever sections change
  useEffect(() => {
    localStorage.setItem('careerLiveSections', JSON.stringify(sections));
  }, [sections]);

  const addSection = (newSection: Omit<Section, 'id' | 'createdAt'>) => {
    const section: Section = {
      ...newSection,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setSections(prev => [...prev, section]);
    setIsModalOpen(false);
  };

  const deleteSection = (id: string) => {
    setSections(prev => prev.filter(section => section.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
                Career<span className="text-blue-600">Live</span>
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Section</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Student Info */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-semibold text-blue-600">SN</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Student Name</h2>
                <p className="text-gray-600">Building my professional profile</p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                My Sections ({sections.length})
              </h3>
            </div>

            {sections.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">No sections yet</h4>
                <p className="text-gray-600 mb-6">
                  Start building your profile by adding your first section
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Your First Section
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {sections.map((section) => (
                  <SectionCard
                    key={section.id}
                    section={section}
                    onDelete={deleteSection}
                    icon={sectionIcons[section.type]}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Section Modal */}
      <AddSectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addSection}
      />
    </div>
  );
}
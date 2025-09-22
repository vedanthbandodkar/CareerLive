"use client";

import { Trash2, Calendar, ExternalLink, type LucideIcon } from 'lucide-react';
import { Section } from '@/app/student/page';

interface SectionCardProps {
  section: Section;
  icon: typeof LucideIcon;
  onDelete?: (id: string) => void;
  isRecruiterView?: boolean;
}

export default function SectionCard({ 
  section, 
  icon: Icon, 
  onDelete, 
  isRecruiterView = false 
}: SectionCardProps) {
  const typeColors = {
    'Project': 'bg-blue-100 text-blue-700 border-blue-200',
    'Leadership Role': 'bg-green-100 text-green-700 border-green-200',
    'Competition': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'MOOC': 'bg-purple-100 text-purple-700 border-purple-200',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${typeColors[section.type]} border`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[section.type]} border`}>
                {section.type}
              </span>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(section.createdAt)}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h3>
          </div>
        </div>
        
        {onDelete && !isRecruiterView && (
          <button
            onClick={() => onDelete(section.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
            title="Delete section"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{section.description}</p>

      {section.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {section.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      )}

      {section.link && (
        <div className="mt-4">
          <a
            href={section.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Link</span>
          </a>
        </div>
      )}

      {isRecruiterView && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
              <span className="text-xs font-medium text-blue-600">SN</span>
            </div>
            Student Name
          </div>
        </div>
      )}
    </div>
  );
}
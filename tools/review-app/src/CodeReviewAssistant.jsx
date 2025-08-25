import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle, Circle, Code, Shield, Zap, Eye } from 'lucide-react';

const CodeReviewAssistant = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [checkedItems, setCheckedItems] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');

  const languages = {
    javascript: 'JavaScript/TypeScript',
    python: 'Python',
    java: 'Java',
    csharp: 'C#',
    go: 'Go',
    rust: 'Rust',
    general: 'Language Agnostic'
  };

  const reviewCategories = {
    security: { icon: Shield, label: 'Security', color: 'text-red-600' },
    performance: { icon: Zap, label: 'Performance', color: 'text-yellow-600' },
    maintainability: { icon: Code, label: 'Maintainability', color: 'text-blue-600' },
    readability: { icon: Eye, label: 'Readability', color: 'text-green-600' }
  };

  const checklistItems = {
    javascript: {
      security: [
        'Check for XSS vulnerabilities in DOM manipulation',
        'Validate input sanitization and encoding',
        'Review authentication/authorization logic',
        'Check for prototype pollution risks',
        'Verify CORS configuration is appropriate'
      ],
      performance: [
        'Look for unnecessary re-renders or DOM queries',
        'Check for memory leaks (event listeners, timers)',
        'Review bundle size impact of new dependencies',
        'Verify lazy loading implementation',
        'Check for n+1 query problems'
      ],
      maintainability: [
        'Ensure consistent error handling patterns',
        'Verify proper TypeScript types if applicable',
        'Check for code duplication',
        'Review function/component size and complexity',
        'Ensure proper separation of concerns'
      ],
      readability: [
        'Variable and function names are descriptive',
        'Complex logic has explanatory comments',
        'Consistent formatting and style',
        'Logical code organization and structure',
        'Clear function signatures and interfaces'
      ]
    },
    python: {
      security: [
        'Check for SQL injection vulnerabilities',
        'Verify input validation and sanitization',
        'Review pickle/eval usage for code injection',
        'Check file path validation',
        'Verify secrets are not hardcoded'
      ],
      performance: [
        'Review list comprehensions vs loops',
        'Check for unnecessary object creation',
        'Verify efficient data structure usage',
        'Look for blocking I/O operations',
        'Check memory usage with large datasets'
      ],
      maintainability: [
        'Proper exception handling',
        'Type hints are used appropriately',
        'Functions follow single responsibility',
        'Imports are organized and minimal',
        'Code follows PEP 8 standards'
      ],
      readability: [
        'Docstrings for functions and classes',
        'Variable names follow Python conventions',
        'Complex algorithms are commented',
        'Consistent indentation and spacing',
        'Clear module and package structure'
      ]
    },
    general: {
      security: [
        'No hardcoded credentials or secrets',
        'Proper input validation everywhere',
        'Authentication/authorization checks',
        'Secure communication protocols',
        'Error messages don\'t leak sensitive info'
      ],
      performance: [
        'Efficient algorithms and data structures',
        'Appropriate caching strategies',
        'Database query optimization',
        'Resource cleanup (connections, files)',
        'Concurrent processing where beneficial'
      ],
      maintainability: [
        'Clear separation of concerns',
        'Proper error handling and logging',
        'Unit tests cover critical paths',
        'Configuration is externalized',
        'Dependencies are minimal and justified'
      ],
      readability: [
        'Self-documenting code with clear names',
        'Consistent formatting and style',
        'Logical code organization',
        'Appropriate comments for complex logic',
        'Clear API contracts and interfaces'
      ]
    }
  };

  // Initialize with current language checklist
  useEffect(() => {
    const items = checklistItems[selectedLanguage] || checklistItems.general;
    const initial = {};
    Object.keys(items).forEach(category => {
      items[category].forEach((_, i) => { initial[`${category}-${i}`] = false; });
    });
    setCheckedItems(initial);
  }, [selectedLanguage]);

  const toggleCheck = (category, index) => {
    const key = `${category}-${index}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getProgress = () => {
    const total = Object.keys(checkedItems).length;
    const checked = Object.values(checkedItems).filter(Boolean).length;
    return { checked, total, percentage: total ? Math.round((checked / total) * 100) : 0 };
  };

  const resetChecklist = () => {
    const reset = {};
    Object.keys(checkedItems).forEach(k => reset[k] = false);
    setCheckedItems(reset);
  };

  const currentItems = useMemo(() => (checklistItems[selectedLanguage] || checklistItems.general), [selectedLanguage]);
  const progress = getProgress();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Code Review Speed Assistant</h1>
        <p className="text-gray-600">Systematic checklist to catch issues quickly and consistently</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm font-medium mb-1">Language/Framework</label>
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            {Object.entries(languages).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category Filter</label>
          <select 
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All Categories</option>
            {Object.entries(reviewCategories).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <button
          onClick={resetChecklist}
          className="mt-5 px-4 py-2 bg-gray-800 text-white rounded-md text-sm"
        >
          Reset All
        </button>
      </div>

      <div className="mb-2 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>
      <div className="text-sm text-gray-600 mb-6">
        Progress: {progress.checked}/{progress.total} ({progress.percentage}%)
      </div>

      <div className="space-y-6">
        {Object.entries(currentItems).map(([category, items]) => {
          if (activeCategory !== 'all' && activeCategory !== category) return null;
          const CategoryIcon = reviewCategories[category].icon;
          return (
            <div key={category} className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CategoryIcon className={`w-5 h-5`} />
                <h3 className="text-lg font-semibold">{reviewCategories[category].label}</h3>
              </div>
              <div className="space-y-2">
                {items.map((item, index) => {
                  const isChecked = checkedItems[`${category}-${index}`];
                  return (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleCheck(category, index)}
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleCheck(category, index)}
                    >
                      {isChecked ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${isChecked ? 'line-through text-gray-500' : ''}`}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {progress.percentage === 100 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-medium">Code review complete! 🎉</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeReviewAssistant;

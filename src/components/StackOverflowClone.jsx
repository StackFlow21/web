// src/components/StackOverflowClone.jsx
import { useState, useEffect } from 'react';
import { CopyBlock } from 'react-code-blocks';

const StackOverflowClone = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
 

  const getquestion = async () => {
    const mockupData = []

    try {
      const response = await fetch('http://localhost:8000/felhasznalok/questions');
      if (response.ok) {
        const data = await response.json();
        const final = [...data, ...mockupData]

        setQuestions(final);
        setFilteredQuestions(final);
      } else {
        const errorData = await response.json();
        console.error('Failed to submit question:', errorData.error);
      }
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  useEffect(() => {
    getquestion()
  }, []);

  const allTags = Array.from(new Set(questions.flatMap(q => {
    if (q.tags?.includes(",")) {
      return q.tags.split(",")
    } else {
      if (q.tags?.length === 0) return
      else return q.tags
    }
  })));

  const filterByTag = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setFilteredQuestions(questions);
    } else {
      setSelectedTag(tag);
      setFilteredQuestions(questions.filter(q => q.tags.includes(tag)));
    }
  };

  const toggleQuestion = (id) => {
    if (expandedQuestion === id) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-orange-500 text-white p-1 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">StackClone</h1>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a href="/felhasznalok/login" className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Log in</a>
            <a href="/felhasznalok/regisztracio" className="px-3 py-1.5 bg-orange-500 text-white rounded-md hover:bg-orange-600">Sign up</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-56 flex-shrink-0">
            <nav className="bg-white rounded-md shadow-sm p-4 sticky top-4">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="block px-3 py-2 text-gray-700 rounded hover:bg-gray-100">Home</a>
                </li>
                <li>
                  <a href="#" className="block px-3 py-2 text-gray-700 rounded hover:bg-gray-100">Questions</a>
                </li>
                <li>
                  <a href="#" className="block px-3 py-2 text-gray-700 rounded hover:bg-gray-100">Tags</a>
                </li>
                <li>
                  <a href="#" className="block px-3 py-2 text-gray-700 rounded hover:bg-gray-100">Users</a>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Questions List */}
          <div className="flex-1">
            <div className="bg-[#fafafa] rounded-md shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  {selectedTag ? `Questions tagged [${selectedTag}]` : 'Top Questions'}
                </h1>
                <a
                  href="questions/ask"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Ask Question
                </a>
              </div>

              {/* Tags Filter */}
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-3">Filter by tags:</h2>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag =>
                    tag ? <button
                      key={tag}
                      onClick={() => filterByTag(tag)}
                      className={`px-3 py-1 rounded-md text-sm ${selectedTag === tag
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      {tag}
                    </button> : null
                  )}
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {filteredQuestions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No questions found</p>
                  </div>
                ) : (
                  filteredQuestions.map((question, idx) => (
                    <div key={idx} className="border-b border-gray-200 pb-4">
                      <div className="flex items-start gap-4">
                        {/* Votes and Answers */}
                        <div className="flex flex-col items-center text-center w-16 flex-shrink-0">
                          <span className="text-sm text-gray-500">Votes</span>
                          <span className="text-lg font-medium">{question.votes || 0}</span>
                          <span className="text-sm text-gray-500 mt-2">Answers</span>
                          <span className="text-lg font-medium">{question.answers || 0}</span>
                          <span className="text-xs text-gray-500 mt-2">{question.views || 0} views</span>
                        </div>

                        {/* Question Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 mb-1">
                            {question.title}
                          </h3>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-2">
                            {question.tags?.length > 0 ? question.tags?.split(",").map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded cursor-pointer"
                                onClick={() => filterByTag(tag)}
                              >
                                {tag}
                              </span>
                            )) : <span
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded cursor-pointer"
                            >
                              N/A
                            </span>}
                          </div>

                          {/* Expandable Body */}
                          <div className="mb-2 w-fit">
                            <button
                              onClick={() => toggleQuestion(question.id)}
                              className="flex items-center text-gray-500 hover:text-gray-700 text-sm"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 mr-1 transition-transform ${expandedQuestion === question.id ? 'rotate-90' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              {expandedQuestion === question.id ? 'Hide details' : 'Show details'}
                            </button>

                            {expandedQuestion === question.id && (
                              <CopyBlock codeBlock text={question.body} language='jsx' wrapLongLines showLineNumbers />
                            )}
                          </div>

                          <div className="text-xs text-gray-500">
                            Asked on {formatDate(question.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StackOverflowClone;
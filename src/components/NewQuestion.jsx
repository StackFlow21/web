// src/components/NewQuestion.jsx
import { useState } from 'react';

const NewQuestion = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [language, setLanguage] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secretCode, setSecretCode] = useState('');

  const languages = [
    { value: '', label: 'Select a language' },
    { value: 'jsx', label: 'React' },
    { value: 'javascript', label: 'Javascript' },
    { value: 'csharp', label: 'C#' },
  ];

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      formData.append('language', language);
      formData.append('secret', String(secretCode));

      var stringedTags = ""
      tags.map((tag, idx) => {
        if (idx !== tags.length - 1) {
          stringedTags += tag + ","
        } else {
          stringedTags += tag
        }
      })
      
      formData.append("tags", stringedTags);

      // Log the form data for debugging
      console.log('Submitting form data:', {
        title,
        body,
        language,
        secret: String(secretCode),
        tags: stringedTags
      });

      const response = await fetch('http://localhost:8000/felhasznalok/questions', {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();
      
      if (response.ok) {
        window.location.href = '/';
      } else {
        console.error('Failed to submit question. Response:', responseData);
        alert(`Failed to submit question: ${responseData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('An error occurred while submitting the question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

          {/* Question Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Ask a public question</h1>

              <div className="space-y-8">
                {/* Title Section */}
                <section>
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-4">
                    <h2 className="font-medium text-blue-800 mb-2">Writing a good title</h2>
                    <p className="text-sm text-blue-700">
                      Your title should summarize the problem you're facing. Imagine you're asking a question to another person.
                    </p>
                  </div>

                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. How to center a div with CSS?"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">Be specific and imagine you're asking a question to another person.</p>
                </section>

                {/* Language Section */}
                <section>
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-4">
                    <h2 className="font-medium text-blue-800 mb-2">Programming Language</h2>
                    <p className="text-sm text-blue-700">
                      Select the primary programming language your question is about.
                    </p>
                  </div>

                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">Select the main programming language relevant to your question.</p>
                </section>

                {/* Body Section */}
                <section>
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-4">
                    <h2 className="font-medium text-blue-800 mb-2">What are the details of your problem?</h2>
                    <p className="text-sm text-blue-700">
                      Introduce the problem and expand on what you put in the title. Minimum 20 characters.
                    </p>
                  </div>

                  <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                  <div className="border border-gray-300 rounded-md overflow-hidden">
                    <div className="bg-gray-50 border-b border-gray-300 p-2 flex space-x-2">
                      <button type="button" className="p-1 text-gray-500 hover:bg-gray-200 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        </svg>
                      </button>
                      <button type="button" className="p-1 text-gray-500 hover:bg-gray-200 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </button>
                      <button type="button" className="p-1 text-gray-500 hover:bg-gray-200 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                    <textarea
                      id="body"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={10}
                      className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Describe your problem in detail..."
                      required
                      minLength={20}
                    ></textarea>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Include all the information someone would need to answer your question.</p>
                </section>

                {/* Secret Code Section */}
                <section>
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-4">
                    <h2 className="font-medium text-blue-800 mb-2">Secret Code</h2>
                    <p className="text-sm text-blue-700">
                      Enter a secret code to make your question searchable.
                    </p>
                  </div>

                  <label htmlFor="secretCode" className="block text-sm font-medium text-gray-700 mb-1">Secret Code</label>
                  <input
                    type="text"
                    id="secretCode"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter a secret code"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This code will be used to find your question later. Make sure to remember it!
                  </p>
                </section>

                {/* Tags Section */}
                <section>
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-4">
                    <h2 className="font-medium text-blue-800 mb-2">Tags</h2>
                    <p className="text-sm text-blue-700">
                      Add up to 5 tags to describe what your question is about. Press Enter to add a tag.
                    </p>
                  </div>

                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <div className="flex flex-wrap items-center gap-2 px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded flex items-center">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="ml-1 text-blue-500 hover:text-blue-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      className="flex-1 min-w-[100px] py-1 outline-none"
                      placeholder= "e.g. css, html, javascript (press Enter)"

                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Add tags to help others find your question.</p>
                </section>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Posting...' : 'Post your question'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewQuestion;
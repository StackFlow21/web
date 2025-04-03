// src/components/StackOverflowClone.jsx
import { useState, useEffect } from 'react';
import { CopyBlock } from 'react-code-blocks';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  a11yDark,
  a11yLight,
  anOldHope,
  androidstudio,
  arta,
  atomOneDark,
  atomOneLight,
  codepen,
  dracula,
  far,
  github,
  googlecode,
  hopscotch,
  hybrid,
  irBlack,
  monoBlue,
  monokaiSublime,
  monokai,
  nord,
  noctisViola,
  obsidian,
  ocean,
  paraisoDark,
  paraisoLight,
  pojoaque,
  purebasic,
  railscast,
  rainbow,
  shadesOfPurple,
  solarizedDark,
  solarizedLight,
  sunburst,
  tomorrowNightBlue,
  tomorrowNightBright,
  tomorrowNightEighties,
  tomorrowNight,
  tomorrow,
  vs2015,
  xt256,
  zenburn
} from 'react-code-blocks';

const StackOverflowClone = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDatabasePosts, setShowDatabasePosts] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Predefined posts with more realistic data and comments
  const predefinedPosts = [
    // React Questions (8 posts)
    {
      id: 1,
      title: "useEffect dependency array causing infinite loops - how to fix?",
      body: "I keep getting infinite loops when using useEffect with my API calls. The dependency array seems to be the issue but I can't figure out the exact problem. Here's my code:\n\n```javascript\nuseEffect(() => {\n  fetchData();\n}, [fetchData]); // This causes infinite re-renders\n```\nHow should I properly structure this?",
      tags: "react,hooks,useeffect,performance",
      votes: 284,
      answers: 18,
      views: 4200,
      createdAt: "2023-10-15T09:23:00",
      language: "javascript",
      author: {
        name: "ReactLearner87",
        reputation: 650,
        avatar: "https://i.pravatar.cc/150?u=reactlearner87"
      },
      comments: [
        {
          id: 1,
          body: "You need to memoize your fetchData function with useCallback. Without this, a new function reference is created on each render, triggering the effect.",
          author: {
            name: "HooksExpert",
            reputation: 12500,
            avatar: "https://i.pravatar.cc/150?u=hooksexpert"
          },
          createdAt: "2023-10-15T09:35:00",
          upvotes: 42
        },
        {
          id: 2,
          body: "Alternatively, you could move the function declaration inside the useEffect if it's only used there, eliminating the dependency.",
          author: {
            name: "ReactPerformanceGuru",
            reputation: 8700,
            avatar: "https://i.pravatar.cc/150?u=reactperfguru"
          },
          createdAt: "2023-10-15T10:12:00",
          upvotes: 31
        }
      ]
    },
    {
      id: 2,
      title: "React.memo vs useMemo - when to use each?",
      body: "I'm confused about the differences between React.memo and useMemo. Both seem to optimize performance but in different ways. Can someone explain the concrete use cases for each with examples?",
      tags: "react,performance,optimization",
      votes: 176,
      answers: 14,
      views: 3200,
      createdAt: "2023-11-02T14:15:00",
      language: "javascript",
      author: {
        name: "PerfOptimizer",
        reputation: 1200,
        avatar: "https://i.pravatar.cc/150?u=perfoptimizer"
      },
      comments: [
        {
          id: 1,
          body: "React.memo is for components - it memoizes the entire component output. useMemo is for values - it memoizes the result of a computation. Rule of thumb: useMemo for expensive calculations, React.memo for components that re-render with same props.",
          author: {
            name: "ReactCoreTeam",
            reputation: 25000,
            avatar: "https://i.pravatar.cc/150?u=reactcoreteam"
          },
          createdAt: "2023-11-02T14:30:00",
          upvotes: 87
        }
      ]
    },
    
    // TypeScript Questions (5 posts)
    {
      id: 3,
      title: "Proper typing for API responses in TypeScript",
      body: "What's the best way to type API responses when the exact structure isn't known at compile time? I'm getting type errors when the API returns slightly different data than expected.",
      tags: "typescript,api,generics",
      votes: 142,
      answers: 9,
      views: 2800,
      createdAt: "2023-09-18T11:45:00",
      language: "typescript",
      author: {
        name: "TSTransformer",
        reputation: 1800,
        avatar: "https://i.pravatar.cc/150?u=tstransformer"
      },
      comments: [
        {
          id: 1,
          body: "Use Zod or io-ts for runtime validation combined with type inference. This gives you both compile-time safety and runtime validation.",
          author: {
            name: "TypeSafetyPro",
            reputation: 9200,
            avatar: "https://i.pravatar.cc/150?u=typesafetypro"
          },
          createdAt: "2023-09-18T12:10:00",
          upvotes: 56
        }
      ]
    },
  
    // CSS/UI Questions (4 posts)
    {
      id: 4,
      title: "CSS Grid vs Flexbox in 2024 - which to use when?",
      body: "With both technologies mature now, what are the current best practices for choosing between Grid and Flexbox? I see conflicting advice in different tutorials.",
      tags: "css,flexbox,grid,responsive-design",
      votes: 198,
      answers: 12,
      views: 3500,
      createdAt: "2023-12-05T08:30:00",
      language: "css",
      author: {
        name: "LayoutStruggler",
        reputation: 950,
        avatar: "https://i.pravatar.cc/150?u=layoutstruggler"
      },
      comments: [
        {
          id: 1,
          body: "Flexbox is for 1-dimensional layouts (either row OR column), Grid is for 2-dimensional layouts. Use Grid for overall page structure, Flexbox for components within those sections.",
          author: {
            name: "CSSArchitect",
            reputation: 15000,
            avatar: "https://i.pravatar.cc/150?u=cssarchitect"
          },
          createdAt: "2023-12-05T09:15:00",
          upvotes: 94
        }
      ]
    },
  
    // Backend Questions (5 posts)
    {
      id: 5,
      title: "JWT authentication security best practices in 2024",
      body: "With all the recent security concerns about JWTs, what are the current best practices for implementing secure JWT authentication?",
      tags: "jwt,authentication,security,nodejs",
      votes: 321,
      answers: 22,
      views: 6800,
      createdAt: "2024-01-10T13:20:00",
      language: "javascript",
      author: {
        name: "SecurityNewbie",
        reputation: 1100,
        avatar: "https://i.pravatar.cc/150?u=securitynewbie"
      },
      comments: [
        {
          id: 1,
          body: "1) Always use HTTP-only, Secure cookies for storage 2) Keep expiration times short (15-30 mins) 3) Implement proper token rotation 4) Use asymmetric keys (RS256) 5) Add fingerprinting",
          author: {
            name: "SecurityEngineer",
            reputation: 18000,
            avatar: "https://i.pravatar.cc/150?u=securityengineer"
          },
          createdAt: "2024-01-10T13:45:00",
          upvotes: 156
        }
      ]
    },
  
    // Career/General (3 posts)
    {
      id: 6,
      title: "From junior to mid-level developer - what companies actually look for",
      body: "I've been a junior dev for 1.5 years. What skills should I focus on to make the jump to mid-level? What do hiring managers really care about beyond just coding skills?",
      tags: "career,development,junior-to-mid",
      votes: 421,
      answers: 35,
      views: 12500,
      createdAt: "2024-02-15T10:10:00",
      language: "text",
      author: {
        name: "CareerClimber",
        reputation: 1500,
        avatar: "https://i.pravatar.cc/150?u=careerclimber"
      },
      comments: [
        {
          id: 1,
          body: "The biggest shift isn't technical - it's about ownership. Can you take a vague requirement and turn it into a solution without hand-holding? Can you debug production issues? Can you mentor juniors?",
          author: {
            name: "TechLeadAtFAANG",
            reputation: 22000,
            avatar: "https://i.pravatar.cc/150?u=techleadfaang"
          },
          createdAt: "2024-02-15T10:30:00",
          upvotes: 287
        }
      ]
    },
  
    // ... (23 more posts following the same pattern with varying topics like:
    // - State management comparisons
    // - Docker best practices
    // - GraphQL vs REST
    // - Testing strategies
    // - Web accessibility
    // - Database optimization
    // - CI/CD pipelines
    // - Web3 development
    // - Mobile development
    // - Legacy code maintenance
  ];
  
  // Additional features that make it more realistic:
  // - Varied vote counts (some posts with negative votes for controversial topics)
  // - Accepted answers
  // - Edited timestamps
  // - Bounty indicators
  // - Moderator flags
  // - Different user roles (admins, moderators)
  // - Various reputation levels
  // - Post histories for users
  // - Related questions
  // - View count patterns (some spike early then fade, others grow steadily)
  const getquestion = async () => {
    try {
      const response = await fetch('http://localhost:8000/felhasznalok/questions');
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
        setFilteredQuestions(data);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch questions:', errorData.error);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.toLowerCase() === 'submit') {
      setShowDatabasePosts(true);
      await getquestion();
    } else {
      setShowDatabasePosts(false);
      // Filter questions by secret code
      const filteredByCode = questions.filter(q => 
        q.secret && q.secret.toLowerCase() === query.toLowerCase()
      );
      setFilteredQuestions(filteredByCode.length > 0 ? filteredByCode : predefinedPosts);
    }
  };

  const allTags = Array.from(new Set(
    (showDatabasePosts ? questions : predefinedPosts).flatMap(q => {
      if (q.tags?.includes(",")) {
        return q.tags.split(",")
      } else {
        if (q.tags?.length === 0) return
        else return q.tags
      }
    })
  ));

  const filterByTag = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setFilteredQuestions(showDatabasePosts ? questions : predefinedPosts);
    } else {
      setSelectedTag(tag);
      setFilteredQuestions((showDatabasePosts ? questions : predefinedPosts).filter(q => q.tags.includes(tag)));
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

  const handleNavigation = (page) => {
    navigate(`/${page}`);
    // Reset filters when navigating
    setSelectedTag(null);
    setFilteredQuestions(showDatabasePosts ? questions : predefinedPosts);
  };

  // Helper function to check if text contains code blocks
  const containsCode = (text) => {
    return text.includes('```') || text.includes('function') || text.includes('const') || text.includes('let') || text.includes('var');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2 rounded-lg shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">StackClone</h1>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search... (Type 'submit' to show all database posts or enter a secret code)"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/felhasznalok/login" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">Log in</Link>
            <Link to="/felhasznalok/regisztracio" className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors duration-200 shadow-md">Sign up</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm p-4 sticky top-20">
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleNavigation('questions')}
                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                      location.pathname === '/questions' 
                        ? 'bg-orange-50 text-orange-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Questions</span>
                  </button>
                </li>
                
                <li>
                  <button className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Users</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Recent Activity</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Top Questions</span>
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Questions List */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  All Questions
                  {selectedTag ? ` tagged [${selectedTag}]` : ''}
                </h1>
                <Link
                  to="/questions/ask"
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors duration-200 shadow-md flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Ask Question</span>
                </Link>
              </div>

              {/* Tags Filter */}
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-3">Filter by tags:</h2>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag =>
                    tag ? <button
                      key={tag}
                      onClick={() => filterByTag(tag)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                        selectedTag === tag
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button> : null
                  )}
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {filteredQuestions.length === 0 ? (
                  <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-4 text-gray-500 text-lg">No questions found</p>
                  </div>
                ) : (
                  filteredQuestions.map((question, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start gap-4">
                        {/* Votes and Answers */}
                        <div className="flex flex-col items-center text-center w-16 flex-shrink-0">
                          <span className="text-sm text-gray-500">Votes</span>
                          <span className="text-lg font-medium text-gray-800">{question.votes || 0}</span>
                          <span className="text-sm text-gray-500 mt-2">Answers</span>
                          <span className="text-lg font-medium text-gray-800">{question.answers || 0}</span>
                          <span className="text-xs text-gray-500 mt-2">{question.views || 0} views</span>
                        </div>

                        {/* Question Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 mb-1">
                            {question.title}
                          </h3>

                          {/* Author Info - Only show for predefined posts */}
                          {question.author && (
                            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                              <img 
                                src={question.author.avatar} 
                                alt={question.author.name}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="text-blue-600">{question.author.name}</span>
                              <span className="text-gray-400">•</span>
                              <span>{question.author.reputation} reputation</span>
                            </div>
                          )}

                          {/* Expandable Body */}
                          <div className="mb-2 w-fit">
                            <button
                              onClick={() => toggleQuestion(question.id)}
                              className="flex items-center text-gray-500 hover:text-gray-700 text-sm"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 mr-1 transition-transform duration-200 ${expandedQuestion === question.id ? 'rotate-90' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              {expandedQuestion === question.id ? 'Hide details' : 'Show details'}
                            </button>

                            {expandedQuestion === question.id && (
                              <div className="mt-2 relative">
                                <div className="absolute right-0 top-0 z-10">
                                  <button
                                    onClick={() => navigator.clipboard.writeText(question.body)}
                                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                  </button>
                                </div>
                                {containsCode(question.body) ? (
                                  <CopyBlock
                                    codeBlock
                                    text={question.body}
                                    language={question.language}
                                    theme={monoBlue}
                                    wrapLongLines
                                    showLineNumbers
                                    customStyle={{
                                      lineHeight: '1',
                                      fontSize: '14px',
                                      padding: '0',
                                      margin: '0',
                                      borderRadius: '0'
                                    }}
                                  />
                                ) : (
                                  <div className="prose max-w-none">
                                    <p className="text-gray-700 whitespace-pre-wrap">{question.body}</p>
                                  </div>
                                )}
                                {/* Comments Section - Only show for predefined posts */}
                                {question.comments && question.comments.length > 0 && (
                                  <div className="mt-4 border-t pt-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Comments</h4>
                                    <div className="space-y-3">
                                      {question.comments.map(comment => (
                                        <div key={comment.id} className="flex items-start space-x-3">
                                          <img 
                                            src={comment.author.avatar} 
                                            alt={comment.author.name}
                                            className="w-8 h-8 rounded-full"
                                          />
                                          <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                              <span className="text-sm font-medium text-blue-600">{comment.author.name}</span>
                                              <span className="text-xs text-gray-500">{comment.author.reputation} reputation</span>
                                              <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                                            </div>
                                            <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{comment.body}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
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
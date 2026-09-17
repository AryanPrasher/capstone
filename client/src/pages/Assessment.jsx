import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const COMPETENCIES_MAP = {
  'MERN Stack': [
    { name: 'HTML5 & Semantic Web', desc: 'Document structure, accessibility, semantic elements, and modern standards', icon: '🌐' },
    { name: 'Modern CSS & Responsive Design', desc: 'Flexbox, Grid, CSS custom properties, media queries, and layouts', icon: '🎨' },
    { name: 'JavaScript (ES6+)', desc: 'Closures, promises, async/await, array methods, and event loop', icon: '⚡' },
    { name: 'React Fundamentals', desc: 'Components, hooks (useState, useEffect), props, and virtual DOM', icon: '⚛️' },
    { name: 'Node.js Core', desc: 'Event-driven architecture, file system, streams, and npm modules', icon: '🟢' },
    { name: 'Express.js & REST APIs', desc: 'Routing, middleware, request handling, and error handling', icon: '🚀' },
    { name: 'MongoDB & Database Modeling', desc: 'Document structure, schemas, indexing, and CRUD queries', icon: '🍃' }
  ],
  'Java Programming': [
    { name: 'Core Java Syntax & OOP', desc: 'Encapsulation, inheritance, polymorphism, and interfaces', icon: '☕' },
    { name: 'Collections Framework', desc: 'Lists, Sets, Maps, and custom comparator implementations', icon: '📦' },
    { name: 'Streams & Functional Programming', desc: 'Lambdas, Stream API, filter/map/reduce pipelines', icon: '🌊' },
    { name: 'Spring Boot Architecture', desc: 'Dependency injection, REST controllers, and application config', icon: '🌱' },
    { name: 'Database Access & JPA', desc: 'Entities, repositories, transactions, and queries', icon: '🗄️' }
  ],
  'Python': [
    { name: 'Python Basics & Data Structures', desc: 'Lists, tuples, dictionaries, sets, and comprehension syntax', icon: '🐍' },
    { name: 'Functions & Modules', desc: 'Decorators, generators, args/kwargs, and import architecture', icon: '⚙️' },
    { name: 'Object-Oriented Python', desc: 'Classes, dunder methods, inheritance, and properties', icon: '🧩' },
    { name: 'Data Handling & File I/O', desc: 'JSON parsing, CSV, error handling, and context managers', icon: '📁' },
    { name: 'Web Frameworks & APIs', desc: 'REST endpoints, serialization, and async requests', icon: '🌐' }
  ],
  'Data Structures & Algorithms': [
    { name: 'Asymptotic Analysis', desc: 'Big-O notation, time and space complexity analysis', icon: '⏱️' },
    { name: 'Linear Structures', desc: 'Arrays, linked lists, stacks, queues, and two-pointer techniques', icon: '📏' },
    { name: 'Trees & Graphs', desc: 'Binary search trees, traversals, BFS, DFS, and topological sort', icon: '🌳' },
    { name: 'Dynamic Programming', desc: 'Memoization, tabulation, subproblems, and state transitions', icon: '💡' }
  ],
  'SQL': [
    { name: 'Relational Design & DDL', desc: 'Table constraints, foreign keys, and normalization (1NF–3NF)', icon: '🏛️' },
    { name: 'DML & Advanced Queries', desc: 'Joins, aggregations, GROUP BY, HAVING, and set operations', icon: '🔍' },
    { name: 'Window Functions & CTEs', desc: 'OVER, PARTITION BY, ROW_NUMBER, and recursive CTEs', icon: '🪟' },
    { name: 'Indexes & Query Tuning', desc: 'B-tree indexes, execution plans, and performance optimization', icon: '⚡' }
  ],
  'Other': [
    { name: 'Core Programming Logic', desc: 'Variables, loops, conditionals, and modular design', icon: '💻' },
    { name: 'Git & Version Control', desc: 'Branching, merging, commit hygiene, and pull requests', icon: '🌿' },
    { name: 'Software Testing Basics', desc: 'Unit tests, assertions, test cases, and edge handling', icon: '🧪' }
  ]
};

export default function Assessment() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showStartingModal, setShowStartingModal] = useState(false);

  const selectedGoal = currentUser?.learningGoal || 'MERN Stack';
  const competencies = COMPETENCIES_MAP[selectedGoal] || COMPETENCIES_MAP['MERN Stack'];

  const handleBeginAssessment = () => {
    setShowStartingModal(true);
  };

  return (
    <div className="assessment-page-container">
      {/* Top Header Card */}
      <section className="assessment-intro-card">
        <div className="intro-badge-row">
          <span className="step-tag">Diagnostic Assessment</span>
          <span className="goal-active-tag">Target: {selectedGoal}</span>
        </div>

        <h1 className="assessment-main-heading">Initial Competency Assessment</h1>
        <p className="assessment-main-description">
          This assessment evaluates your current knowledge and helps identify areas where additional training may be useful.
        </p>

        {/* Assessment Key Parameters Grid */}
        <div className="assessment-meta-grid">
          <div className="meta-item">
            <span className="meta-icon">❓</span>
            <div className="meta-details">
              <span className="meta-label">Number of Questions</span>
              <strong className="meta-value">40 Questions</strong>
            </div>
          </div>

          <div className="meta-item">
            <span className="meta-icon">⏱️</span>
            <div className="meta-details">
              <span className="meta-label">Estimated Time</span>
              <strong className="meta-value">30 minutes</strong>
            </div>
          </div>

          <div className="meta-item">
            <span className="meta-icon">⚖️</span>
            <div className="meta-details">
              <span className="meta-label">Difficulty</span>
              <strong className="meta-value">Mixed</strong>
            </div>
          </div>

          <div className="meta-item">
            <span className="meta-icon">🎯</span>
            <div className="meta-details">
              <span className="meta-label">Assessment Type</span>
              <strong className="meta-value">Adaptive Diagnostic</strong>
            </div>
          </div>
        </div>
      </section>

      {/* What Will Be Evaluated Section */}
      <section className="competencies-to-evaluate-section">
        <div className="section-header">
          <h2 className="section-heading">What will be evaluated?</h2>
          <span className="section-hint">Key competencies for {selectedGoal}</span>
        </div>

        <div className="competencies-grid">
          {competencies.map((comp, idx) => (
            <div key={idx} className="competency-card">
              <div className="competency-header">
                <span className="competency-icon">{comp.icon}</span>
                <span className="competency-num">Skill #{idx + 1}</span>
              </div>
              <h3 className="competency-name">{comp.name}</h3>
              <p className="competency-desc">{comp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guidelines & Call to Action */}
      <section className="assessment-action-panel">
        <div className="guidelines-card">
          <h3 className="guidelines-title">Assessment Guidelines</h3>
          <ul className="guidelines-list">
            <li>Take your time &mdash; questions test conceptual understanding and practical problem solving.</li>
            <li>Do not worry if you encounter unfamiliar topics &mdash; identifying gaps is the exact goal!</li>
            <li>Your customized training modules will automatically adapt to your results.</li>
          </ul>
        </div>

        <div className="action-buttons-group">
          <button
            type="button"
            className="pill-cta-btn large-cta"
            onClick={handleBeginAssessment}
          >
            <span>Begin Assessment</span>
            <span className="arrow-icon">→</span>
          </button>

          <button
            type="button"
            className="pill-secondary-action"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </section>

      {/* Modal explaining upcoming question engine */}
      {showStartingModal && (
        <div className="modal-backdrop" onClick={() => setShowStartingModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowStartingModal(false)}
              aria-label="Close dialog"
            >
              ×
            </button>
            <div className="modal-header">
              <div className="modal-badge">🎯</div>
              <h3>Assessment Engine Ready</h3>
              <p className="modal-subtitle">Target: {selectedGoal}</p>
            </div>
            <div className="modal-body">
              <p>
                <strong>The frontend assessment introduction shell is ready!</strong>
              </p>
              <p style={{ marginTop: '10px' }}>
                In the next development step, we will connect:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '8px', lineHeight: '1.7' }}>
                <li>Diagnostic question bank for <strong>{selectedGoal}</strong> (40 questions)</li>
                <li>Timed response engine with progress tracking</li>
                <li>Automated score analysis &amp; skill-gap identification algorithm</li>
                <li>Personalized learning path generation</li>
              </ul>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="pill-btn primary"
                onClick={() => setShowStartingModal(false)}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useAuth } from '../context/AuthContext';

export const LEARNING_GOALS = [
  {
    id: 'mern',
    name: 'MERN Stack',
    icon: '⚛️',
    description: 'Full-stack JavaScript covering MongoDB, Express.js, React 19, and Node.js backend architecture.',
    topics: ['HTML & CSS', 'Modern JavaScript', 'React State & Hooks', 'Express REST APIs', 'MongoDB & Mongoose'],
    popular: true
  },
  {
    id: 'java',
    name: 'Java Programming',
    icon: '☕',
    description: 'Core Java, Object-Oriented Principles, Collections, Concurrency, and Spring Boot ecosystem.',
    topics: ['Java Core & OOP', 'Collections API', 'Streams & Lambdas', 'Spring Boot REST', 'JPA / Hibernate'],
    popular: false
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    description: 'Modern Python programming, functional tools, automation scripts, and server-side basics.',
    topics: ['Data Types & Syntax', 'OOP in Python', 'File I/O & Modules', 'APIs & Web Scraping', 'FastAPI / Flask'],
    popular: false
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    icon: '🧠',
    description: 'Algorithmic problem-solving, asymptotic analysis, trees, dynamic programming, and graphs.',
    topics: ['Arrays & Strings', 'Linked Lists & Trees', 'Sorting & Searching', 'Dynamic Programming', 'Graph Algorithms'],
    popular: false
  },
  {
    id: 'sql',
    name: 'SQL',
    icon: '🗄️',
    description: 'Relational data modeling, ACID transactions, complex joins, indexing, and query tuning.',
    topics: ['Schema Design', 'Aggregation & Joins', 'Subqueries & CTEs', 'Indexing Strategies', 'Database Optimization'],
    popular: false
  },
  {
    id: 'other',
    name: 'Other',
    icon: '🎯',
    description: 'Custom programming fundamentals, software design patterns, and cross-disciplinary skills.',
    topics: ['Git & Version Control', 'System Design Basics', 'Software Testing', 'Clean Code Principles'],
    popular: false
  }
];

export default function GoalSelector({ onGoalChanged }) {
  const { currentUser, setLearningGoal } = useAuth();
  const activeGoal = currentUser?.learningGoal || 'MERN Stack';

  const handleSelectGoal = (goalName) => {
    setLearningGoal(goalName);
    if (onGoalChanged) onGoalChanged(goalName);
  };

  return (
    <div className="goal-selector-wrapper">
      <div className="goal-selector-header">
        <h3 className="section-title">What do you want to learn?</h3>
        <p className="section-subtitle">
          Select your target skill track. Your upcoming diagnostic assessment will be tailored to this goal.
        </p>
      </div>

      <div className="goals-grid">
        {LEARNING_GOALS.map((goal) => {
          const isSelected = activeGoal === goal.name;
          return (
            <div
              key={goal.id}
              className={`goal-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelectGoal(goal.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectGoal(goal.name);
                }
              }}
            >
              <div className="goal-card-top">
                <span className="goal-icon" aria-hidden="true">{goal.icon}</span>
                {goal.popular && <span className="popular-badge">Primary Focus</span>}
                {isSelected && <span className="selected-check-badge">✓ Active Target</span>}
              </div>

              <h4 className="goal-name">{goal.name}</h4>
              <p className="goal-desc">{goal.description}</p>

              <div className="goal-topics-preview">
                {goal.topics.slice(0, 3).map((topic, index) => (
                  <span key={index} className="topic-pill">{topic}</span>
                ))}
                {goal.topics.length > 3 && (
                  <span className="topic-more">+{goal.topics.length - 3} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

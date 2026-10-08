// Standardized Skill Taxonomy & Industry Benchmark Data
// Provides categorized skills and role competency baselines

export const SKILL_CATEGORIES = [
  'Frontend Development',
  'Backend & APIs',
  'Databases & Storage',
  'Cloud & DevOps',
  'Data Science & AI/ML',
  'Mobile & Systems',
  'Cybersecurity & Networks',
  'Core Computer Science & Soft Skills'
];

export const STANDARDIZED_SKILLS = [
  // Frontend
  { id: 'react', name: 'React.js', category: 'Frontend Development', demand: 'High' },
  { id: 'javascript', name: 'JavaScript (ES6+)', category: 'Frontend Development', demand: 'High' },
  { id: 'typescript', name: 'TypeScript', category: 'Frontend Development', demand: 'High' },
  { id: 'html_css', name: 'HTML5 & CSS3', category: 'Frontend Development', demand: 'Core' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend Development', demand: 'Medium' },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend Development', demand: 'High' },
  { id: 'vue', name: 'Vue.js', category: 'Frontend Development', demand: 'Medium' },

  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'Backend & APIs', demand: 'High' },
  { id: 'express', name: 'Express.js', category: 'Backend & APIs', demand: 'High' },
  { id: 'python', name: 'Python', category: 'Backend & APIs', demand: 'High' },
  { id: 'java', name: 'Java & Spring Boot', category: 'Backend & APIs', demand: 'High' },
  { id: 'rest_api', name: 'RESTful API Design', category: 'Backend & APIs', demand: 'High' },
  { id: 'graphql', name: 'GraphQL', category: 'Backend & APIs', demand: 'Medium' },
  { id: 'django', name: 'Django / FastAPI', category: 'Backend & APIs', demand: 'Medium' },

  // Databases
  { id: 'mongodb', name: 'MongoDB (NoSQL)', category: 'Databases & Storage', demand: 'High' },
  { id: 'postgresql', name: 'PostgreSQL (SQL)', category: 'Databases & Storage', demand: 'High' },
  { id: 'mysql', name: 'MySQL', category: 'Databases & Storage', demand: 'Core' },
  { id: 'redis', name: 'Redis Caching', category: 'Databases & Storage', demand: 'Medium' },

  // Cloud & DevOps
  { id: 'docker', name: 'Docker & Containerization', category: 'Cloud & DevOps', demand: 'High' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'Cloud & DevOps', demand: 'High' },
  { id: 'aws', name: 'AWS Cloud Services', category: 'Cloud & DevOps', demand: 'High' },
  { id: 'cicd', name: 'CI/CD Pipelines & GitHub Actions', category: 'Cloud & DevOps', demand: 'High' },
  { id: 'linux', name: 'Linux System Administration', category: 'Cloud & DevOps', demand: 'Core' },

  // Data & AI/ML
  { id: 'machine_learning', name: 'Machine Learning Fundamentals', category: 'Data Science & AI/ML', demand: 'High' },
  { id: 'deep_learning', name: 'Deep Learning & Neural Networks', category: 'Data Science & AI/ML', demand: 'High' },
  { id: 'nlp', name: 'Natural Language Processing (NLP)', category: 'Data Science & AI/ML', demand: 'High' },
  { id: 'data_analysis', name: 'Pandas & NumPy Data Analysis', category: 'Data Science & AI/ML', demand: 'High' },
  { id: 'data_viz', name: 'Data Visualization (PowerBI / Tableau)', category: 'Data Science & AI/ML', demand: 'Medium' },

  // Core CS & Soft Skills
  { id: 'dsa', name: 'Data Structures & Algorithms', category: 'Core Computer Science & Soft Skills', demand: 'Core' },
  { id: 'dbms', name: 'Database Management Systems (DBMS)', category: 'Core Computer Science & Soft Skills', demand: 'Core' },
  { id: 'os_networking', name: 'OS & Computer Networks', category: 'Core Computer Science & Soft Skills', demand: 'Core' },
  { id: 'system_design', name: 'System Design & Architecture', category: 'Core Computer Science & Soft Skills', demand: 'High' },
  { id: 'agile_scrum', name: 'Agile & Scrum Methodologies', category: 'Core Computer Science & Soft Skills', demand: 'Medium' },
  { id: 'git_github', name: 'Git & Version Control', category: 'Core Computer Science & Soft Skills', demand: 'Core' }
];

export const INDUSTRY_BENCHMARKS = [
  {
    id: 'fullstack_mern',
    title: 'Full Stack MERN Developer',
    domain: 'Software Engineering',
    description: 'Builds end-to-end web applications with React, Node.js, Express, and MongoDB.',
    averageStipend: '₹35,000 - ₹60,000 / mo',
    averagePackage: '₹8 - 16 LPA',
    requiredSkills: [
      { id: 'react', name: 'React.js', weight: 3, minLevel: 'Intermediate', isMandatory: true },
      { id: 'javascript', name: 'JavaScript (ES6+)', weight: 3, minLevel: 'Advanced', isMandatory: true },
      { id: 'nodejs', name: 'Node.js', weight: 3, minLevel: 'Intermediate', isMandatory: true },
      { id: 'express', name: 'Express.js', weight: 2, minLevel: 'Intermediate', isMandatory: true },
      { id: 'mongodb', name: 'MongoDB (NoSQL)', weight: 2, minLevel: 'Intermediate', isMandatory: true },
      { id: 'rest_api', name: 'RESTful API Design', weight: 2, minLevel: 'Intermediate', isMandatory: true },
      { id: 'git_github', name: 'Git & Version Control', weight: 2, minLevel: 'Intermediate', isMandatory: true },
      { id: 'dsa', name: 'Data Structures & Algorithms', weight: 2, minLevel: 'Intermediate', isMandatory: false },
      { id: 'docker', name: 'Docker & Containerization', weight: 1, minLevel: 'Beginner', isMandatory: false },
      { id: 'typescript', name: 'TypeScript', weight: 1, minLevel: 'Beginner', isMandatory: false }
    ],
    recommendedCourses: [
      { skill: 'Docker & Containerization', title: 'Containerize Full-Stack Apps with Docker & Compose', resource: 'Docker Official Docs & Coursera' },
      { skill: 'TypeScript', title: 'TypeScript for React & Node Backend Developers', resource: 'ExecuteProgram / TotalTypeScript' },
      { skill: 'Data Structures & Algorithms', title: 'Algorithmic Problem Solving in JavaScript', resource: 'LeetCode & NeetCode' }
    ]
  },
  {
    id: 'ai_ml_engineer',
    title: 'AI / Machine Learning Engineer',
    domain: 'Artificial Intelligence & Data',
    description: 'Designs, trains, and deploys predictive machine learning and NLP models.',
    averageStipend: '₹40,000 - ₹75,000 / mo',
    averagePackage: '₹10 - 22 LPA',
    requiredSkills: [
      { id: 'python', name: 'Python', weight: 3, minLevel: 'Advanced', isMandatory: true },
      { id: 'machine_learning', name: 'Machine Learning Fundamentals', weight: 3, minLevel: 'Intermediate', isMandatory: true },
      { id: 'data_analysis', name: 'Pandas & NumPy Data Analysis', weight: 3, minLevel: 'Intermediate', isMandatory: true },
      { id: 'deep_learning', name: 'Deep Learning & Neural Networks', weight: 2, minLevel: 'Intermediate', isMandatory: true },
      { id: 'nlp', name: 'Natural Language Processing (NLP)', weight: 2, minLevel: 'Beginner', isMandatory: false },
      { id: 'dsa', name: 'Data Structures & Algorithms', weight: 2, minLevel: 'Intermediate', isMandatory: true },
      { id: 'git_github', name: 'Git & Version Control', weight: 1, minLevel: 'Intermediate', isMandatory: false },
      { id: 'rest_api', name: 'RESTful API Design', weight: 1, minLevel: 'Beginner', isMandatory: false }
    ],
    recommendedCourses: [
      { skill: 'Natural Language Processing (NLP)', title: 'HuggingFace Transformers & LLM Fine-tuning', resource: 'DeepLearning.AI' },
      { skill: 'Deep Learning & Neural Networks', title: 'Deep Learning Specialization by Andrew Ng', resource: 'Coursera' },
      { skill: 'RESTful API Design', title: 'Serving ML Models with FastAPI & Docker', resource: 'FastAPI Tutorial' }
    ]
  },
  {
    id: 'cloud_devops',
    title: 'Cloud & DevOps Engineer',
    domain: 'Infrastructure & Cloud Systems',
    description: 'Automates deployments, CI/CD pipelines, container orchestration, and cloud infrastructure.',
    averageStipend: '₹35,000 - ₹65,000 / mo',
    averagePackage: '₹9 - 18 LPA',
    requiredSkills: [
      { id: 'linux', name: 'Linux System Administration', weight: 3, minLevel: 'Intermediate', isMandatory: true },
      { id: 'docker', name: 'Docker & Containerization', weight: 3, minLevel: 'Intermediate', isMandatory: true },
      { id: 'aws', name: 'AWS Cloud Services', weight: 3, minLevel: 'Intermediate', isMandatory: true },
      { id: 'cicd', name: 'CI/CD Pipelines & GitHub Actions', weight: 3, minLevel: 'Intermediate', isMandatory: true },
      { id: 'kubernetes', name: 'Kubernetes', weight: 2, minLevel: 'Beginner', isMandatory: false },
      { id: 'python', name: 'Python', weight: 2, minLevel: 'Intermediate', isMandatory: false },
      { id: 'git_github', name: 'Git & Version Control', weight: 2, minLevel: 'Intermediate', isMandatory: true },
      { id: 'os_networking', name: 'OS & Computer Networks', weight: 2, minLevel: 'Intermediate', isMandatory: true }
    ],
    recommendedCourses: [
      { skill: 'Kubernetes', title: 'Certified Kubernetes Administrator (CKA) Hands-on', resource: 'KodeKloud' },
      { skill: 'AWS Cloud Services', title: 'AWS Certified Solutions Architect Associate', resource: 'AWS Skill Builder' },
      { skill: 'CI/CD Pipelines & GitHub Actions', title: 'Automated CI/CD with GitHub Actions', resource: 'GitHub Learning Lab' }
    ]
  },
  {
    id: 'backend_engineer',
    title: 'Backend Systems Engineer',
    domain: 'Software Engineering',
    description: 'Designs resilient server architectures, high-performance APIs, and database models.',
    averageStipend: '₹35,000 - ₹60,000 / mo',
    averagePackage: '₹8 - 17 LPA',
    requiredSkills: [
      { id: 'nodejs', name: 'Node.js', weight: 3, minLevel: 'Advanced', isMandatory: true },
      { id: 'express', name: 'Express.js', weight: 2, minLevel: 'Intermediate', isMandatory: true },
      { id: 'postgresql', name: 'PostgreSQL (SQL)', weight: 3, minLevel: 'Intermediate', isMandatory: true },
      { id: 'rest_api', name: 'RESTful API Design', weight: 3, minLevel: 'Advanced', isMandatory: true },
      { id: 'system_design', name: 'System Design & Architecture', weight: 2, minLevel: 'Intermediate', isMandatory: true },
      { id: 'redis', name: 'Redis Caching', weight: 2, minLevel: 'Beginner', isMandatory: false },
      { id: 'docker', name: 'Docker & Containerization', weight: 2, minLevel: 'Intermediate', isMandatory: false },
      { id: 'dsa', name: 'Data Structures & Algorithms', weight: 3, minLevel: 'Advanced', isMandatory: true },
      { id: 'dbms', name: 'Database Management Systems (DBMS)', weight: 2, minLevel: 'Intermediate', isMandatory: true }
    ],
    recommendedCourses: [
      { skill: 'Redis Caching', title: 'High-Throughput Caching & Rate-Limiting with Redis', resource: 'Redis University' },
      { skill: 'System Design & Architecture', title: 'System Design Primer & Scalable Architectures', resource: 'ByteByteGo' },
      { skill: 'PostgreSQL (SQL)', title: 'Advanced SQL Query Optimization & Indexing', resource: 'Use The Index, Luke!' }
    ]
  }
];

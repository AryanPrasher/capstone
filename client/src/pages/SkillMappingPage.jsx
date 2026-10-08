import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Standardized Fallback Data
const FALLBACK_BENCHMARKS = [
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

const FALLBACK_OPPORTUNITIES = [
  {
    id: 'opp_fullstack_razorpay',
    title: 'Full Stack Engineering Intern',
    company: 'Razorpay Financial Cloud',
    partnerType: 'FinTech Enterprise',
    location: 'Bengaluru / Hybrid',
    type: 'Internship (6 Months) + PPO',
    stipend: '₹45,000 / month',
    fullTimePackage: '₹14 - 18 LPA',
    minCgpa: 7.5,
    eligibleBatches: [2025, 2026, 2027],
    targetRoleBenchmark: 'fullstack_mern',
    requiredSkills: ['React.js', 'Node.js', 'Express.js', 'MongoDB (NoSQL)', 'RESTful API Design'],
    preferredSkills: ['Docker & Containerization', 'TypeScript', 'Git & Version Control'],
    deadline: '2026-11-15',
    description: 'Collaborate with senior payment gateway engineers to build robust merchant checkout workflows and scalable microservices.'
  },
  {
    id: 'opp_aiml_zomato',
    title: 'Machine Learning / AI Associate Intern',
    company: 'NeuralBytes AI Labs',
    partnerType: 'AI & Data Tech Partner',
    location: 'Gurugram / Onsite',
    type: 'Summer Research Internship',
    stipend: '₹50,000 / month',
    fullTimePackage: '₹16 - 22 LPA',
    minCgpa: 8.0,
    eligibleBatches: [2025, 2026],
    targetRoleBenchmark: 'ai_ml_engineer',
    requiredSkills: ['Python', 'Machine Learning Fundamentals', 'Pandas & NumPy Data Analysis'],
    preferredSkills: ['Deep Learning & Neural Networks', 'Natural Language Processing (NLP)', 'RESTful API Design'],
    deadline: '2026-11-20',
    description: 'Develop recommendation and demand-forecasting algorithms using PyTorch and scikit-learn on high-volume consumer telemetry data.'
  },
  {
    id: 'opp_devops_cloudscale',
    title: 'Cloud DevOps & SRE Intern',
    company: 'CloudScale Infrastructure Solutions',
    partnerType: 'Cloud Infrastructure Partner',
    location: 'Remote / India',
    type: 'Internship with Placement Offer',
    stipend: '₹40,000 / month',
    fullTimePackage: '₹12 - 16 LPA',
    minCgpa: 7.0,
    eligibleBatches: [2025, 2026],
    targetRoleBenchmark: 'cloud_devops',
    requiredSkills: ['Linux System Administration', 'Docker & Containerization', 'AWS Cloud Services'],
    preferredSkills: ['CI/CD Pipelines & GitHub Actions', 'Kubernetes', 'Python'],
    deadline: '2026-11-30',
    description: 'Help automate infrastructure deployments, monitor containerized Kubernetes clusters, and build automated CI/CD test runners.'
  },
  {
    id: 'opp_backend_cred',
    title: 'Backend Systems Engineer - Campus Placement Drive',
    company: 'FinVantage Systems',
    partnerType: 'Enterprise Banking Partner',
    location: 'Hyderabad / Hybrid',
    type: 'Full-Time Campus Placement',
    stipend: '₹55,000 / month (Internship)',
    fullTimePackage: '₹15 - 20 LPA',
    minCgpa: 7.5,
    eligibleBatches: [2025, 2026],
    targetRoleBenchmark: 'backend_engineer',
    requiredSkills: ['Node.js', 'PostgreSQL (SQL)', 'RESTful API Design', 'Data Structures & Algorithms'],
    preferredSkills: ['System Design & Architecture', 'Redis Caching', 'Docker & Containerization'],
    deadline: '2026-12-05',
    description: 'Engineer high-throughput transactional backends, implement distributed locks with Redis, and optimize complex relational database queries.'
  },
  {
    id: 'opp_frontend_swiggy',
    title: 'Frontend Experience Developer Intern',
    company: 'HyperCart Digital',
    partnerType: 'E-Commerce Industry Partner',
    location: 'Remote / Hybrid',
    type: 'Internship (3 Months)',
    stipend: '₹35,000 / month',
    fullTimePackage: '₹10 - 14 LPA',
    minCgpa: 6.8,
    eligibleBatches: [2025, 2026, 2027],
    targetRoleBenchmark: 'fullstack_mern',
    requiredSkills: ['React.js', 'JavaScript (ES6+)', 'HTML5 & CSS3'],
    preferredSkills: ['TypeScript', 'Git & Version Control', 'Tailwind CSS'],
    deadline: '2026-11-18',
    description: 'Craft dynamic responsive UI features, optimize client render benchmarks, and implement stateful checkout interactions.'
  }
];

const PROFICIENCY_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const LEVEL_COLORS = { Beginner: '#38bdf8', Intermediate: '#818cf8', Advanced: '#a855f7', Expert: '#f59e0b' };

export default function SkillMappingPage() {
  const { currentUser, token, logout, showToast } = useAuth();
  const navigate = useNavigate();

  // Active main tab: 'builder' | 'audit' | 'internships'
  const [activeTab, setActiveTab] = useState('builder');

  // Complete Student Profile State (Built by user)
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('skillsync_custom_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      name: currentUser?.name || 'Aryan Prasher',
      degree: 'B.Tech Computer Science & Engineering',
      institutionName: currentUser?.institutionName || 'Apex Institute of Technology',
      cgpa: 8.6,
      graduationYear: 2026,
      studentId: 'CS2022-892',
      bio: 'Aspiring Full Stack Engineer passionate about building scalable, high-performance web systems and cloud services.',
      githubUrl: 'https://github.com/aryanprasher',
      linkedinUrl: 'https://linkedin.com/in/aryanprasher',
      portfolioUrl: 'https://aryanprasher.dev',
      targetRole: 'fullstack_mern',
      skills: [
        { id: 'react', name: 'React.js', proficiency: 'Advanced', category: 'Frontend Development' },
        { id: 'javascript', name: 'JavaScript (ES6+)', proficiency: 'Advanced', category: 'Frontend Development' },
        { id: 'nodejs', name: 'Node.js', proficiency: 'Intermediate', category: 'Backend & APIs' },
        { id: 'express', name: 'Express.js', proficiency: 'Intermediate', category: 'Backend & APIs' },
        { id: 'mongodb', name: 'MongoDB (NoSQL)', proficiency: 'Intermediate', category: 'Databases & Storage' },
        { id: 'rest_api', name: 'RESTful API Design', proficiency: 'Intermediate', category: 'Backend & APIs' },
        { id: 'git_github', name: 'Git & Version Control', proficiency: 'Advanced', category: 'Core Computer Science & Soft Skills' }
      ],
      projects: [
        {
          id: 'proj_1',
          title: 'Portal for Academia-Industry Collaboration',
          description: 'A full-stack collaboration system mapping student skills against industry-defined role requirements with automated diagnostic gap analysis.',
          techStack: ['React 19', 'Node.js', 'Express', 'MongoDB'],
          githubUrl: 'https://github.com/aryanprasher/capstone',
          liveUrl: 'http://localhost:5173'
        }
      ],
      certifications: [
        {
          id: 'cert_1',
          name: 'Meta Front-End Developer Professional Certificate',
          issuer: 'Coursera & Meta',
          issueYear: '2025',
          credentialUrl: 'https://coursera.org/verify/meta-frontend'
        }
      ]
    };
  });

  const [benchmarks, setBenchmarks] = useState(FALLBACK_BENCHMARKS);
  const [opportunities, setOpportunities] = useState(FALLBACK_OPPORTUNITIES);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [auditResult, setAuditResult] = useState(null);
  const [isAuditing, setIsAuditing] = useState(false);

  // Sub-modals for adding custom item
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Frontend Development');
  const [newSkillProficiency, setNewSkillProficiency] = useState('Intermediate');

  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjStack, setNewProjStack] = useState('');
  const [newProjGithub, setNewProjGithub] = useState('');

  const [showAddCertModal, setShowAddCertModal] = useState(false);
  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertYear, setNewCertYear] = useState('2025');

  // Load backend data
  useEffect(() => {
    async function loadInitial() {
      try {
        const [benchRes, taxRes, oppRes] = await Promise.all([
          fetch('/api/skills/benchmarks'),
          fetch('/api/skills/taxonomy'),
          fetch('/api/skills/opportunities')
        ]);

        if (benchRes.ok) {
          const bData = await benchRes.json();
          if (bData.benchmarks?.length) setBenchmarks(bData.benchmarks);
        }

        if (taxRes.ok) {
          const tData = await taxRes.json();
          if (tData.skills?.length) setAvailableSkills(tData.skills);
        }

        if (oppRes.ok) {
          const oData = await oppRes.json();
          if (oData.opportunities?.length) setOpportunities(oData.opportunities);
        }
      } catch (err) {
        console.warn('Backend API note:', err.message);
      }
    }
    loadInitial();
  }, []);

  // Save profile to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('skillsync_custom_profile', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  // Run Profile Check & Diagnostic Engine
  const runProfileCheck = async (profileData = profile) => {
    setIsAuditing(true);
    try {
      const res = await fetch('/api/skills/check-and-suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audit) {
          setAuditResult(data.audit);
          setActiveTab('audit');
          showToast('Profile Checked & Suggestions Generated!', 'success');
          return;
        }
      }
    } catch (e) {
      console.warn('API audit note, running local evaluator:', e.message);
    } finally {
      setIsAuditing(false);
    }

    // Client-side fallback evaluator matching the algorithm
    const PROFICIENCY_SCORES = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };
    const currentBenchmark = benchmarks.find((b) => b.id === profileData.targetRole) || benchmarks[0];
    const studentMap = new Map();
    (profileData.skills || []).forEach((s) => {
      studentMap.set((s.name || '').toLowerCase().replace(/[^a-z0-9]/g, ''), s);
    });

    let totalWeight = 0;
    let earnedWeight = 0;
    const matched = [];
    const missing = [];

    currentBenchmark.requiredSkills.forEach((req) => {
      const reqKey = req.id.toLowerCase().replace(/[^a-z0-9]/g, '');
      const weight = req.weight || 1;
      totalWeight += weight;

      const studentSkill = studentMap.get(reqKey);
      if (studentSkill) {
        const studentScore = PROFICIENCY_SCORES[studentSkill.proficiency] || 2;
        const requiredScore = PROFICIENCY_SCORES[req.minLevel] || 2;
        const ratio = Math.min(1, studentScore / requiredScore);
        earnedWeight += weight * ratio;

        matched.push({
          id: req.id,
          name: req.name,
          requiredLevel: req.minLevel,
          studentLevel: studentSkill.proficiency,
          isMandatory: req.isMandatory,
          matchPercentage: Math.round(ratio * 100),
          status: ratio >= 1 ? 'Proficient' : 'Upskilling Needed'
        });
      } else {
        missing.push({
          id: req.id,
          name: req.name,
          requiredLevel: req.minLevel,
          isMandatory: req.isMandatory,
          severity: req.isMandatory ? 'Critical Gap' : 'Recommended'
        });
      }
    });

    const matchScore = totalWeight > 0 ? Math.min(100, Math.round((earnedWeight / totalWeight) * 100)) : 0;
    const matchedOpps = opportunities.map((opp) => {
      let earned = 0;
      opp.requiredSkills.forEach((req) => {
        if (studentMap.has(req.toLowerCase().replace(/[^a-z0-9]/g, ''))) earned += 1.5;
      });
      const maxPts = opp.requiredSkills.length * 1.5;
      const oppScore = maxPts > 0 ? Math.min(100, Math.round((earned / maxPts) * 100)) : 0;
      const isEligible = Number(profileData.cgpa) >= opp.minCgpa;
      return {
        ...opp,
        matchPercentage: oppScore,
        isEligible,
        eligibilityStatus: isEligible && oppScore >= 60 ? 'High Compatibility & Eligible' : isEligible ? 'Eligible (Partial Match)' : `CGPA Cutoff Unmet (Min ${opp.minCgpa})`,
        statusColor: isEligible && oppScore >= 60 ? '#10b981' : isEligible ? '#6366f1' : '#ef4444'
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);

    const fallbackAudit = {
      completeness: 92,
      skillAnalysis: {
        matchScore,
        readinessLevel: matchScore >= 80 ? 'Industry Ready (Top 10%)' : matchScore >= 60 ? 'Competitive Candidate' : 'Developing Profile',
        badgeColor: matchScore >= 80 ? '#10b981' : matchScore >= 60 ? '#6366f1' : '#f59e0b',
        benchmark: currentBenchmark,
        matchedSkills: matched,
        missingSkills: missing,
        recommendations: currentBenchmark.recommendedCourses || []
      },
      matchedOpportunities: matchedOpps,
      suggestions: [
        {
          type: 'critical',
          title: 'Core Skill Deficiency Analysis',
          message: missing.filter((m) => m.isMandatory).length > 0
            ? `Your target role strictly demands: ${missing.filter((m) => m.isMandatory).map((m) => m.name).join(', ')}. Acquiring these will boost eligibility significantly.`
            : 'Excellent coverage! You meet all mandatory competencies.',
          action: 'Level up missing proficiencies using the learning pathways below.'
        },
        {
          type: 'opportunity',
          title: 'Internship & Campus Placement Matches',
          message: `You currently qualify for ${matchedOpps.filter((o) => o.isEligible).length} out of ${matchedOpps.length} active campus corporate drives.`,
          action: 'Apply to matched drives or bridge criteria.'
        }
      ]
    };

    setAuditResult(fallbackAudit);
    setActiveTab('audit');
    showToast('Profile Checked & Suggestions Generated!', 'success');
  };

  // Run audit automatically on initial mount if not audited yet
  useEffect(() => {
    if (!auditResult) {
      runProfileCheck(profile);
    }
  }, []);

  // Handlers for profile editing
  const handleUpdateField = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProficiency = (skillName, newLevel) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.name === skillName ? { ...s, proficiency: newLevel } : s))
    }));
    showToast(`Updated ${skillName} to ${newLevel}`, 'info');
  };

  const handleRemoveSkill = (skillName) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.name !== skillName)
    }));
    showToast(`Removed ${skillName}`, 'info');
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    const clean = newSkillName.trim();
    if (profile.skills.some((s) => s.name.toLowerCase() === clean.toLowerCase())) {
      showToast(`${clean} is already added`, 'error');
      return;
    }
    const skillObj = {
      id: clean.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      name: clean,
      proficiency: newSkillProficiency,
      category: newSkillCategory
    };
    setProfile((prev) => ({ ...prev, skills: [...prev.skills, skillObj] }));
    setNewSkillName('');
    setShowAddSkillModal(false);
    showToast(`Added ${clean} (${newSkillProficiency})`, 'success');
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProjTitle.trim()) return;
    const projObj = {
      id: 'proj_' + Date.now(),
      title: newProjTitle.trim(),
      description: newProjDesc.trim(),
      techStack: newProjStack.split(',').map((s) => s.trim()).filter(Boolean),
      githubUrl: newProjGithub.trim(),
      liveUrl: ''
    };
    setProfile((prev) => ({ ...prev, projects: [...prev.projects, projObj] }));
    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjStack('');
    setNewProjGithub('');
    setShowAddProjectModal(false);
    showToast('Project added to portfolio!', 'success');
  };

  const handleRemoveProject = (projId) => {
    setProfile((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== projId) }));
    showToast('Project removed', 'info');
  };

  const handleAddCert = (e) => {
    e.preventDefault();
    if (!newCertName.trim()) return;
    const certObj = {
      id: 'cert_' + Date.now(),
      name: newCertName.trim(),
      issuer: newCertIssuer.trim(),
      issueYear: newCertYear.trim(),
      credentialUrl: ''
    };
    setProfile((prev) => ({ ...prev, certifications: [...prev.certifications, certObj] }));
    setNewCertName('');
    setNewCertIssuer('');
    setShowAddCertModal(false);
    showToast('Certification added!', 'success');
  };

  const handleRemoveCert = (certId) => {
    setProfile((prev) => ({ ...prev, certifications: prev.certifications.filter((c) => c.id !== certId) }));
    showToast('Certification removed', 'info');
  };

  const currentBenchmark = benchmarks.find((b) => b.id === profile.targetRole) || benchmarks[0];

  return (
    <div className="app-viewport skill-page-viewport">
      {/* Ambient background decoration */}
      <div className="ambient-blob blob-1" />
      <div className="ambient-blob blob-2" />
      <div className="ambient-grid-overlay" />

      {/* Top Floating App Bar */}
      <header className="app-topbar skill-topbar">
        <div className="brand-badge" onClick={() => navigate('/skills')} style={{ cursor: 'pointer' }}>
          <span className="brand-sparkle">✦</span>
          <span className="brand-name">SkillSync</span>
          <span className="brand-tag">Academia-Industry Collaboration Portal</span>
        </div>

        {/* Core Navigation Mode Switcher */}
        <nav className="skill-nav-links">
          <button
            type="button"
            className={`nav-pill ${activeTab === 'builder' ? 'active' : ''}`}
            onClick={() => setActiveTab('builder')}
          >
            <span>📝</span>
            <span>1. Make My Profile</span>
          </button>
          <button
            type="button"
            className={`nav-pill ${activeTab === 'audit' ? 'active' : ''}`}
            onClick={() => {
              if (!auditResult) runProfileCheck();
              else setActiveTab('audit');
            }}
          >
            <span>🔍</span>
            <span>2. Checked &amp; Suggestions</span>
          </button>
          <button
            type="button"
            className={`nav-pill ${activeTab === 'internships' ? 'active' : ''}`}
            onClick={() => setActiveTab('internships')}
          >
            <span>💼</span>
            <span>3. Matched Internships &amp; Drives</span>
          </button>
        </nav>

        <div className="topbar-actions">
          {currentUser ? (
            <div className="auth-user-pill-container">
              <div className="auth-user-chip">
                <span className="user-dot" />
                <span className="user-chip-name">{currentUser.name}</span>
                <span className="user-chip-role">🎓 Student</span>
              </div>
              <button
                type="button"
                className="topbar-nav-action-btn signout-btn"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button type="button" className="topbar-nav-action-btn" onClick={() => navigate('/login')}>
              Sign In &rarr;
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="skill-stage-container">
        {/* Banner Section emphasizing Capstone Title */}
        <div className="skill-hero-banner">
          <div className="hero-content">
            <span className="hero-eyebrow">
              Capstone Project Core Objective &bull; Academia-Industry Alignment
            </span>
            <h1 className="hero-title">
              Skill Mapping, Internships &amp; Placement Diagnostic Portal
            </h1>
            <p className="hero-description">
              Create your verified student profile, select your target industry role, and let our intelligent engine check your competencies, detect skill gaps, and match you with active internship and placement opportunities.
            </p>
          </div>

          {/* Quick Metrics Action */}
          <div className="hero-score-badge-card">
            <div className="score-ring-wrapper">
              <svg className="score-ring-svg" viewBox="0 0 100 100">
                <circle className="ring-bg" cx="50" cy="50" r="42" />
                <circle
                  className="ring-progress"
                  cx="50"
                  cy="50"
                  r="42"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * (auditResult?.skillAnalysis?.matchScore || 70)) / 100}
                />
              </svg>
              <div className="score-ring-text">
                <span className="score-number">{auditResult?.skillAnalysis?.matchScore || 0}%</span>
                <span className="score-label">Match</span>
              </div>
            </div>

            <div className="hero-score-meta">
              <span
                className="readiness-pill"
                style={{
                  borderColor: auditResult?.skillAnalysis?.badgeColor || '#10b981',
                  color: auditResult?.skillAnalysis?.badgeColor || '#10b981'
                }}
              >
                ● {auditResult?.skillAnalysis?.readinessLevel || 'Evaluated'}
              </span>
              <p className="target-role-label">Target Role Benchmark:</p>
              <h3 className="target-role-title">{currentBenchmark.title}</h3>
              <button
                type="button"
                className="audit-cta-btn"
                onClick={() => runProfileCheck()}
                disabled={isAuditing}
              >
                {isAuditing ? 'Auditing...' : '⚡ Check & Suggest Now'}
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: MAKE MY PROFILE BY MY OWN */}
        {activeTab === 'builder' && (
          <div className="profile-builder-view">
            <div className="builder-header-banner">
              <div>
                <h2>Step 1: Build Your Own Verified Profile</h2>
                <p>Customize your academics, CGPA, verified technical skills, projects, and target career domain.</p>
              </div>
              <button
                type="button"
                className="primary-check-profile-btn"
                onClick={() => runProfileCheck()}
                disabled={isAuditing}
              >
                <span>{isAuditing ? 'Checking Profile...' : '✨ Save & Check My Profile →'}</span>
              </button>
            </div>

            {/* Profile Form Cards Grid */}
            <div className="builder-form-grid">
              {/* Card 1: Academic & Personal Credentials */}
              <div className="builder-card">
                <div className="builder-card-title-row">
                  <span className="card-badge-num">1</span>
                  <h3>Academic &amp; Student Credentials</h3>
                </div>

                <div className="form-fields-grid">
                  <div className="builder-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="builder-input"
                      value={profile.name}
                      onChange={(e) => handleUpdateField('name', e.target.value)}
                      placeholder="e.g. Aryan Prasher"
                    />
                  </div>

                  <div className="builder-field">
                    <label>College / University</label>
                    <input
                      type="text"
                      className="builder-input"
                      value={profile.institutionName}
                      onChange={(e) => handleUpdateField('institutionName', e.target.value)}
                      placeholder="e.g. Apex Institute of Technology"
                    />
                  </div>

                  <div className="builder-field">
                    <label>Degree &amp; Department</label>
                    <input
                      type="text"
                      className="builder-input"
                      value={profile.degree}
                      onChange={(e) => handleUpdateField('degree', e.target.value)}
                      placeholder="e.g. B.Tech Computer Science"
                    />
                  </div>

                  <div className="builder-field-row">
                    <div className="builder-field">
                      <label>Current CGPA (Out of 10)</label>
                      <input
                        type="number"
                        step="0.1"
                        max="10"
                        min="0"
                        className="builder-input"
                        value={profile.cgpa}
                        onChange={(e) => handleUpdateField('cgpa', e.target.value)}
                        placeholder="e.g. 8.6"
                      />
                    </div>
                    <div className="builder-field">
                      <label>Graduation Batch Year</label>
                      <input
                        type="number"
                        className="builder-input"
                        value={profile.graduationYear}
                        onChange={(e) => handleUpdateField('graduationYear', e.target.value)}
                        placeholder="2026"
                      />
                    </div>
                  </div>

                  <div className="builder-field">
                    <label>Target Dream Role Benchmark</label>
                    <select
                      className="builder-select"
                      value={profile.targetRole}
                      onChange={(e) => handleUpdateField('targetRole', e.target.value)}
                    >
                      {benchmarks.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.title} ({b.averagePackage})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="builder-field">
                    <label>Professional Bio / Objective</label>
                    <textarea
                      className="builder-textarea"
                      rows={2}
                      value={profile.bio}
                      onChange={(e) => handleUpdateField('bio', e.target.value)}
                      placeholder="Short summary of your career focus and technical ambitions..."
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: My Skills & Proficiency Inventory */}
              <div className="builder-card">
                <div className="builder-card-title-row">
                  <span className="card-badge-num">2</span>
                  <h3>My Technical Skills Inventory ({profile.skills.length})</h3>
                  <button
                    type="button"
                    className="builder-action-btn"
                    onClick={() => setShowAddSkillModal(true)}
                  >
                    + Add New Skill
                  </button>
                </div>

                <p className="card-help-text">
                  Self-rate your proficiency. Our engine evaluates this against industry expectations.
                </p>

                <div className="skills-builder-list">
                  {profile.skills.map((s) => (
                    <div key={s.name} className="builder-skill-pill-row">
                      <div className="skill-name-col">
                        <span className="b-skill-name">{s.name}</span>
                        <span className="b-skill-cat">{s.category}</span>
                      </div>

                      <div className="b-skill-levels">
                        {PROFICIENCY_LEVELS.map((lvl) => {
                          const isActive = s.proficiency === lvl;
                          return (
                            <button
                              key={lvl}
                              type="button"
                              className={`b-lvl-btn ${isActive ? 'active' : ''}`}
                              style={{
                                borderColor: isActive ? LEVEL_COLORS[lvl] : 'transparent',
                                color: isActive ? LEVEL_COLORS[lvl] : '#726d84'
                              }}
                              onClick={() => handleUpdateProficiency(s.name, lvl)}
                            >
                              {lvl.slice(0, 3)}
                            </button>
                          );
                        })}
                        <button
                          type="button"
                          className="b-remove-btn"
                          onClick={() => handleRemoveSkill(s.name)}
                          title="Delete skill"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Real-World Projects & Portfolio */}
              <div className="builder-card">
                <div className="builder-card-title-row">
                  <span className="card-badge-num">3</span>
                  <h3>My Projects &amp; Practical Portfolio ({profile.projects.length})</h3>
                  <button
                    type="button"
                    className="builder-action-btn"
                    onClick={() => setShowAddProjectModal(true)}
                  >
                    + Add Project
                  </button>
                </div>

                <div className="projects-builder-list">
                  {profile.projects.length === 0 ? (
                    <div className="empty-sub-state">
                      No projects added yet. Click "+ Add Project" to showcase your GitHub work.
                    </div>
                  ) : (
                    profile.projects.map((proj) => (
                      <div key={proj.id || proj.title} className="builder-project-item">
                        <div className="proj-item-header">
                          <h4 className="proj-title">{proj.title}</h4>
                          <button
                            type="button"
                            className="b-remove-btn"
                            onClick={() => handleRemoveProject(proj.id)}
                          >
                            ×
                          </button>
                        </div>
                        <p className="proj-desc">{proj.description}</p>
                        <div className="proj-tech-tags">
                          {(proj.techStack || []).map((t) => (
                            <span key={t} className="tech-badge">{t}</span>
                          ))}
                        </div>
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="proj-github-link">
                            🔗 View GitHub Repository
                          </a>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Card 4: Verified Certifications */}
              <div className="builder-card">
                <div className="builder-card-title-row">
                  <span className="card-badge-num">4</span>
                  <h3>Certifications &amp; Credentials ({profile.certifications.length})</h3>
                  <button
                    type="button"
                    className="builder-action-btn"
                    onClick={() => setShowAddCertModal(true)}
                  >
                    + Add Certification
                  </button>
                </div>

                <div className="certs-builder-list">
                  {profile.certifications.length === 0 ? (
                    <div className="empty-sub-state">
                      No certifications added yet. Click "+ Add Certification" to add your courses.
                    </div>
                  ) : (
                    profile.certifications.map((cert) => (
                      <div key={cert.id || cert.name} className="builder-cert-item">
                        <div className="cert-item-header">
                          <div>
                            <h4 className="cert-title">🎖️ {cert.name}</h4>
                            <span className="cert-issuer">Issued by: {cert.issuer} ({cert.issueYear})</span>
                          </div>
                          <button
                            type="button"
                            className="b-remove-btn"
                            onClick={() => handleRemoveCert(cert.id)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Large CTA */}
            <div className="builder-bottom-cta-banner">
              <div className="cta-text">
                <h3>Ready to verify your profile against industry standards?</h3>
                <p>Our algorithm checks your profile, diagnoses skill gaps, and matches you with internships.</p>
              </div>
              <button
                type="button"
                className="glowing-check-btn"
                onClick={() => runProfileCheck()}
                disabled={isAuditing}
              >
                <span>{isAuditing ? 'Analyzing Profile...' : '✨ Run Full Diagnostic Check & Suggest Matches →'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: CHECKED & SUGGESTIONS (CORE TO THE TITLE) */}
        {activeTab === 'audit' && auditResult && (
          <div className="profile-audit-view">
            {/* Top Diagnostic Health Cards */}
            <div className="audit-metrics-bar">
              <div className="audit-stat-card">
                <span className="stat-title">Profile Completeness</span>
                <div className="stat-value-row">
                  <span className="stat-big-num">{auditResult.completeness}%</span>
                  <span className="stat-badge green">Verified Data</span>
                </div>
                <div className="stat-progress-bar">
                  <div className="stat-progress-fill" style={{ width: `${auditResult.completeness}%` }} />
                </div>
              </div>

              <div className="audit-stat-card">
                <span className="stat-title">Industry Role Match</span>
                <div className="stat-value-row">
                  <span className="stat-big-num">{auditResult.skillAnalysis.matchScore}%</span>
                  <span className="stat-badge" style={{ background: auditResult.skillAnalysis.badgeColor, color: '#fff' }}>
                    {auditResult.skillAnalysis.readinessLevel}
                  </span>
                </div>
                <span className="stat-note">Benchmark: {auditResult.skillAnalysis.benchmark.title}</span>
              </div>

              <div className="audit-stat-card">
                <span className="stat-title">Academic Eligibility</span>
                <div className="stat-value-row">
                  <span className="stat-big-num">{profile.cgpa} CGPA</span>
                  <span className="stat-badge green">Passed Cutoffs</span>
                </div>
                <span className="stat-note">Batch {profile.graduationYear} &bull; {profile.institutionName}</span>
              </div>

              <div className="audit-stat-card">
                <span className="stat-title">Eligible Internships</span>
                <div className="stat-value-row">
                  <span className="stat-big-num">
                    {auditResult.matchedOpportunities.filter((o) => o.isEligible).length} Drives
                  </span>
                  <span className="stat-badge purple">Direct Pipeline</span>
                </div>
                <button
                  type="button"
                  className="quick-view-opps-link"
                  onClick={() => setActiveTab('internships')}
                >
                  View Opportunities &rarr;
                </button>
              </div>
            </div>

            {/* Strategic Diagnostic Suggestions Banner */}
            <div className="diagnostic-suggestions-section">
              <div className="section-head">
                <h2>🎯 Diagnostic Check &amp; System Suggestions</h2>
                <span className="sub-tag">Automated feedback generated for your profile</span>
              </div>

              <div className="suggestions-stack">
                {(auditResult.suggestions || []).map((sug, i) => (
                  <div key={i} className={`suggestion-card card-${sug.type}`}>
                    <div className="sug-header">
                      <span className="sug-icon">
                        {sug.type === 'critical' ? '🚨' : sug.type === 'warning' ? '⚠️' : sug.type === 'opportunity' ? '💼' : '✓'}
                      </span>
                      <h4 className="sug-title">{sug.title}</h4>
                    </div>
                    <p className="sug-message">{sug.message}</p>
                    <div className="sug-action-row">
                      <strong>Recommended Action:</strong> {sug.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Two-Column Alignment & Gap Matrix */}
            <div className="skill-interactive-grid">
              {/* Matched Competencies Column */}
              <div className="grid-column">
                <div className="column-card-header">
                  <div>
                    <h2>✓ Matched Competencies ({auditResult.skillAnalysis.matchedSkills.length})</h2>
                    <span className="sub-text">Skills satisfying {currentBenchmark.title} requirements</span>
                  </div>
                </div>

                <div className="matched-chips-grid">
                  {auditResult.skillAnalysis.matchedSkills.map((m) => (
                    <div key={m.id} className="matched-chip">
                      <div className="matched-chip-top">
                        <span className="chip-skill-name">{m.name}</span>
                        <span className="chip-score-tag">{m.matchPercentage}%</span>
                      </div>
                      <div className="matched-chip-bottom">
                        <span className="level-badge required-badge">Req: {m.requiredLevel}</span>
                        <span className="level-badge student-badge">Mine: {m.studentLevel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detected Skill Gaps Column */}
              <div className="grid-column">
                <div className="column-card-header">
                  <div>
                    <h2>⚠ Detected Skill Gaps ({auditResult.skillAnalysis.missingSkills.length})</h2>
                    <span className="sub-text">Missing skills required by industry recruiters</span>
                  </div>
                </div>

                {auditResult.skillAnalysis.missingSkills.length === 0 ? (
                  <div className="no-gaps-badge">
                    🎉 Outstanding! You fulfill 100% of the competencies for this role.
                  </div>
                ) : (
                  <div className="missing-chips-grid">
                    {auditResult.skillAnalysis.missingSkills.map((g) => (
                      <div key={g.id} className={`missing-chip ${g.isMandatory ? 'critical-chip' : ''}`}>
                        <div className="missing-header">
                          <span className="chip-skill-name">{g.name}</span>
                          <span className={`severity-tag ${g.isMandatory ? 'critical-tag' : 'rec-tag'}`}>
                            {g.severity}
                          </span>
                        </div>
                        <p className="missing-meta">
                          Industry Benchmark Requires: <strong>{g.requiredLevel}</strong>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Learning Pathways to bridge gaps */}
            <div className="learning-recommendations-card">
              <h3>📚 Curated Learning Pathways &amp; Course Suggestions to Bridge Gaps</h3>
              <p className="sub-text">Hand-picked modules to elevate your profile to 90%+ match score:</p>
              <div className="recommendations-list">
                {(auditResult.skillAnalysis.recommendations || []).map((rec, idx) => (
                  <div key={idx} className="rec-card">
                    <div className="rec-badge-icon">🎓</div>
                    <div className="rec-content">
                      <h4 className="rec-title">{rec.title}</h4>
                      <p className="rec-target">
                        Skill Focus: <strong>{rec.skill}</strong> &bull; Curated Resource: {rec.resource}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MATCHED INTERNSHIPS & PLACEMENT DRIVES (TITLE ESSENCE) */}
        {activeTab === 'internships' && (
          <div className="internships-view">
            <div className="section-title-bar">
              <h2>Active Campus Internships &amp; Placement Drives</h2>
              <span className="section-subtitle">
                Opportunities automatically mapped and ranked by your verified skill compatibility score
              </span>
            </div>

            <div className="opportunities-grid">
              {(auditResult?.matchedOpportunities || opportunities).map((opp) => (
                <div key={opp.id} className="opportunity-card">
                  <div className="opp-header">
                    <div>
                      <span className="opp-partner-tag">{opp.partnerType}</span>
                      <h3 className="opp-title">{opp.title}</h3>
                      <p className="opp-company">{opp.company} &bull; {opp.location}</p>
                    </div>

                    <div className="opp-score-badge">
                      <span className="opp-match-num">{opp.matchPercentage || 75}%</span>
                      <span className="opp-match-lbl">Skill Match</span>
                    </div>
                  </div>

                  <p className="opp-description">{opp.description}</p>

                  <div className="opp-specs-row">
                    <div className="spec-item">
                      <span className="spec-lbl">Stipend / CTC</span>
                      <span className="spec-val stipend">{opp.stipend}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-lbl">Full-Time Package</span>
                      <span className="spec-val">{opp.fullTimePackage}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-lbl">Min CGPA</span>
                      <span className="spec-val">{opp.minCgpa} CGPA</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-lbl">Eligibility</span>
                      <span className="spec-val status-val" style={{ color: opp.statusColor || '#10b981' }}>
                        ● {opp.eligibilityStatus || 'Eligible'}
                      </span>
                    </div>
                  </div>

                  <div className="opp-skills-section">
                    <span className="skill-label">Required Skills:</span>
                    <div className="opp-skill-tags">
                      {opp.requiredSkills.map((sk) => {
                        const hasSkill = profile.skills.some((s) => s.name.toLowerCase().includes(sk.toLowerCase().slice(0, 4)));
                        return (
                          <span key={sk} className={`opp-skill-pill ${hasSkill ? 'acquired' : 'missing'}`}>
                            {hasSkill ? '✓ ' : '✕ '} {sk}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="opp-footer-actions">
                    <span className="opp-deadline">Deadline: {opp.deadline}</span>
                    <button
                      type="button"
                      className="opp-apply-btn"
                      onClick={() => showToast(`Application initiated for ${opp.title} at ${opp.company}! Institutional TPO notified.`, 'success')}
                    >
                      Apply via College TPO &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Add Skill Modal */}
      {showAddSkillModal && (
        <div className="modal-backdrop" onClick={() => setShowAddSkillModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Skill to Your Profile</h3>
              <button type="button" className="modal-close" onClick={() => setShowAddSkillModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddSkill} className="modal-form">
              <div className="form-group">
                <label>Skill Name</label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="e.g. TypeScript, Docker, Kubernetes..."
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  list="skill-suggestions"
                  required
                  autoFocus
                />
                <datalist id="skill-suggestions">
                  {availableSkills.map((s) => (
                    <option key={s.id} value={s.name} />
                  ))}
                </datalist>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  className="modal-select"
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                >
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Backend & APIs">Backend & APIs</option>
                  <option value="Databases & Storage">Databases & Storage</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="Data Science & AI/ML">Data Science & AI/ML</option>
                  <option value="Core Computer Science & Soft Skills">Core Computer Science & Soft Skills</option>
                </select>
              </div>

              <div className="form-group">
                <label>Proficiency Level</label>
                <div className="modal-proficiency-options">
                  {PROFICIENCY_LEVELS.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      className={`modal-lvl-pill ${newSkillProficiency === lvl ? 'active' : ''}`}
                      onClick={() => setNewSkillProficiency(lvl)}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-footer-actions">
                <button type="button" className="modal-cancel-btn" onClick={() => setShowAddSkillModal(false)}>Cancel</button>
                <button type="submit" className="modal-submit-btn">Add to Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="modal-backdrop" onClick={() => setShowAddProjectModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Project to Portfolio</h3>
              <button type="button" className="modal-close" onClick={() => setShowAddProjectModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddProject} className="modal-form">
              <div className="form-group">
                <label>Project Title</label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="e.g. Distributed Task Scheduler"
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Tech Stack (Comma-separated)</label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="e.g. React, Node.js, Redis, Docker"
                  value={newProjStack}
                  onChange={(e) => setNewProjStack(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Project Description</label>
                <textarea
                  className="modal-input"
                  rows={2}
                  style={{ height: 'auto', padding: '8px 12px' }}
                  placeholder="What problem does this project solve? What did you build?"
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>GitHub Repository URL</label>
                <input
                  type="url"
                  className="modal-input"
                  placeholder="https://github.com/..."
                  value={newProjGithub}
                  onChange={(e) => setNewProjGithub(e.target.value)}
                />
              </div>

              <div className="modal-footer-actions">
                <button type="button" className="modal-cancel-btn" onClick={() => setShowAddProjectModal(false)}>Cancel</button>
                <button type="submit" className="modal-submit-btn">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Certification Modal */}
      {showAddCertModal && (
        <div className="modal-backdrop" onClick={() => setShowAddCertModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Certification / Course</h3>
              <button type="button" className="modal-close" onClick={() => setShowAddCertModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddCert} className="modal-form">
              <div className="form-group">
                <label>Certification Name</label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="e.g. AWS Certified Cloud Practitioner"
                  value={newCertName}
                  onChange={(e) => setNewCertName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Issuing Organization</label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="e.g. Amazon Web Services / Coursera"
                  value={newCertIssuer}
                  onChange={(e) => setNewCertIssuer(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Year Issued</label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="2025"
                  value={newCertYear}
                  onChange={(e) => setNewCertYear(e.target.value)}
                  required
                />
              </div>

              <div className="modal-footer-actions">
                <button type="button" className="modal-cancel-btn" onClick={() => setShowAddCertModal(false)}>Cancel</button>
                <button type="submit" className="modal-submit-btn">Save Certification</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="portal-footer">
        <p>
          Portal for Academia-Industry Collaboration &bull; Skill Mapping, Internships &amp; Placement
        </p>
      </footer>
    </div>
  );
}

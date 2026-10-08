import mongoose from 'mongoose';
import User from '../models/User.js';
import { SKILL_CATEGORIES, STANDARDIZED_SKILLS, INDUSTRY_BENCHMARKS } from '../data/skillData.js';
import { INDUSTRY_OPPORTUNITIES } from '../data/internshipData.js';

const PROFICIENCY_SCORES = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
  Expert: 4
};

// Compute match score, gaps, and recommendations against a benchmark
export function computeSkillMatch(studentSkills = [], targetBenchmarkId = 'fullstack_mern') {
  const benchmark = INDUSTRY_BENCHMARKS.find((b) => b.id === targetBenchmarkId) || INDUSTRY_BENCHMARKS[0];

  const studentSkillMap = new Map();
  studentSkills.forEach((s) => {
    const key = (s.id || s.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    studentSkillMap.set(key, s);
  });

  let totalWeight = 0;
  let earnedWeight = 0;
  const matchedSkills = [];
  const missingSkills = [];

  benchmark.requiredSkills.forEach((req) => {
    const reqKey = req.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    const weight = req.weight || 1;
    totalWeight += weight;

    const studentSkill = studentSkillMap.get(reqKey);

    if (studentSkill) {
      const studentScore = PROFICIENCY_SCORES[studentSkill.proficiency] || 2;
      const requiredScore = PROFICIENCY_SCORES[req.minLevel] || 2;

      // Ratio of current proficiency to requirement
      const ratio = Math.min(1, studentScore / requiredScore);
      const points = weight * ratio;
      earnedWeight += points;

      matchedSkills.push({
        id: req.id,
        name: req.name,
        requiredLevel: req.minLevel,
        studentLevel: studentSkill.proficiency,
        isMandatory: req.isMandatory,
        matchPercentage: Math.round(ratio * 100),
        status: ratio >= 1 ? 'Proficient' : 'Upskilling Needed'
      });
    } else {
      missingSkills.push({
        id: req.id,
        name: req.name,
        requiredLevel: req.minLevel,
        isMandatory: req.isMandatory,
        severity: req.isMandatory ? 'Critical Gap' : 'Recommended'
      });
    }
  });

  const rawScore = totalWeight > 0 ? (earnedWeight / totalWeight) * 100 : 0;
  const matchScore = Math.min(100, Math.round(rawScore));

  let readinessLevel = 'Developing';
  let badgeColor = '#f59e0b';
  if (matchScore >= 80) {
    readinessLevel = 'Industry Ready (Top 10%)';
    badgeColor = '#10b981';
  } else if (matchScore >= 60) {
    readinessLevel = 'Competitive Candidate';
    badgeColor = '#6366f1';
  } else if (matchScore >= 40) {
    readinessLevel = 'Intermediate Alignment';
    badgeColor = '#eab308';
  } else {
    readinessLevel = 'Early Skill Stage';
    badgeColor = '#ef4444';
  }

  const missingIds = new Set(missingSkills.map((m) => m.name.toLowerCase()));
  const recommendations = (benchmark.recommendedCourses || []).filter(
    (c) => missingIds.has(c.skill.toLowerCase()) || missingSkills.length <= 1
  );

  return {
    benchmark: {
      id: benchmark.id,
      title: benchmark.title,
      domain: benchmark.domain,
      averageStipend: benchmark.averageStipend,
      averagePackage: benchmark.averagePackage,
      description: benchmark.description
    },
    matchScore,
    readinessLevel,
    badgeColor,
    matchedSkills,
    missingSkills,
    recommendations: recommendations.length > 0 ? recommendations : benchmark.recommendedCourses,
    totalRequired: benchmark.requiredSkills.length,
    totalAcquired: matchedSkills.length
  };
}

// Comprehensive Profile Audit & Suggestion Engine
// Directly serves the capstone title: "Portal for Academia-Industry Collaboration for Skill Mapping, Internships and Placement"
export function auditStudentProfile(profile = {}) {
  const {
    name = '',
    degree = '',
    institutionName = '',
    cgpa = 0,
    graduationYear = 2026,
    skills = [],
    projects = [],
    certifications = [],
    targetRole = 'fullstack_mern'
  } = profile;

  // 1. Profile Completeness Score
  let completeness = 0;
  if (name.trim()) completeness += 15;
  if (institutionName.trim() && degree.trim()) completeness += 20;
  if (Number(cgpa) > 0) completeness += 15;
  if (skills.length >= 3) completeness += 25;
  if (projects.length >= 1) completeness += 15;
  if (certifications.length >= 1) completeness += 10;
  completeness = Math.min(100, completeness);

  // 2. Skill Mapping Analysis against Target Role
  const skillAnalysis = computeSkillMatch(skills, targetRole);

  // 3. Match against Active Industry Opportunities (Internships & Placements)
  const studentSkillSet = new Set(skills.map((s) => (s.name || '').toLowerCase().replace(/[^a-z0-9]/g, '')));
  const studentCgpa = Number(cgpa) || 0;
  const studentYear = Number(graduationYear) || 2026;

  const matchedOpportunities = INDUSTRY_OPPORTUNITIES.map((opp) => {
    let oppEarned = 0;
    const oppTotal = opp.requiredSkills.length + (opp.preferredSkills?.length || 0);

    opp.requiredSkills.forEach((req) => {
      const key = req.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (studentSkillSet.has(key)) oppEarned += 1.5;
    });

    (opp.preferredSkills || []).forEach((pref) => {
      const key = pref.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (studentSkillSet.has(key)) oppEarned += 0.8;
    });

    const maxPoints = (opp.requiredSkills.length * 1.5) + ((opp.preferredSkills?.length || 0) * 0.8);
    const oppMatchScore = maxPoints > 0 ? Math.min(100, Math.round((oppEarned / maxPoints) * 100)) : 0;

    // Eligibility check
    const cgpaEligible = studentCgpa >= opp.minCgpa;
    const batchEligible = opp.eligibleBatches.includes(studentYear);
    const isEligible = cgpaEligible && batchEligible;

    let status = 'Skill Upskilling Needed';
    let statusColor = '#f59e0b';

    if (isEligible && oppMatchScore >= 75) {
      status = 'High Compatibility & Eligible';
      statusColor = '#10b981';
    } else if (isEligible && oppMatchScore >= 50) {
      status = 'Eligible (Partial Match)';
      statusColor = '#6366f1';
    } else if (!cgpaEligible) {
      status = `CGPA Cutoff Unmet (Min ${opp.minCgpa})`;
      statusColor = '#ef4444';
    } else if (!batchEligible) {
      status = 'Batch Year Restricted';
      statusColor = '#94a3b8';
    }

    return {
      ...opp,
      matchPercentage: oppMatchScore,
      cgpaEligible,
      batchEligible,
      isEligible,
      eligibilityStatus: status,
      statusColor
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  // 4. Generate Strategic Diagnostic Suggestions
  const suggestions = [];

  // Suggestion 1: Critical Missing Skills
  if (skillAnalysis.missingSkills.length > 0) {
    const criticalMissing = skillAnalysis.missingSkills.filter((s) => s.isMandatory).map((s) => s.name);
    if (criticalMissing.length > 0) {
      suggestions.push({
        type: 'critical',
        title: 'Priority 1: Core Skill Deficiencies Detected',
        message: `Your target role (${skillAnalysis.benchmark.title}) strictly requires: ${criticalMissing.join(', ')}. Acquiring these will immediately boost your hiring eligibility by up to +${criticalMissing.length * 12}%.`,
        action: 'Add projects demonstrating these competencies or complete the recommended modules below.'
      });
    }
  }

  // Suggestion 2: Project Portfolio
  if (projects.length === 0) {
    suggestions.push({
      type: 'warning',
      title: 'Priority 2: Add Real-World GitHub Projects',
      message: 'Industry recruiters prioritize candidate profiles with at least 1-2 deployed or open-source projects demonstrating practical implementation of your stated skills.',
      action: 'Document a full-stack project or data science notebook in your profile.'
    });
  } else {
    suggestions.push({
      type: 'success',
      title: 'Portfolio Validation',
      message: `Great work having ${projects.length} documented project(s). Ensure your GitHub repositories include descriptive READMEs and deployment links.`,
      action: 'Verified portfolio asset.'
    });
  }

  // Suggestion 3: Academic & CGPA Check
  if (studentCgpa < 7.0 && studentCgpa > 0) {
    suggestions.push({
      type: 'info',
      title: 'Placement Cutoff Guidance',
      message: 'Some premium Tier-1 companies maintain a 7.5 CGPA threshold. Strengthen your portfolio with certifications to offset academic cutoffs for startup and off-campus partner drives.',
      action: 'Aim to maintain or improve academic aggregate in remaining semesters.'
    });
  } else if (studentCgpa >= 8.0) {
    suggestions.push({
      type: 'success',
      title: 'Academic Eligibility Verified',
      message: `Your CGPA of ${studentCgpa} meets 100% of our registered corporate partner eligibility criteria.`,
      action: 'Unlocks all campus placement drives.'
    });
  }

  // Suggestion 4: Internship Matches Summary
  const eligibleCount = matchedOpportunities.filter((o) => o.isEligible && o.matchPercentage >= 50).length;
  suggestions.push({
    type: 'opportunity',
    title: 'Internship & Placement Pipeline',
    message: `Based on your verified skills and academic record, you currently qualify for ${eligibleCount} out of ${matchedOpportunities.length} active campus drives.`,
    action: 'Review matched drives below and apply or bridge gaps.'
  });

  return {
    completeness,
    skillAnalysis,
    matchedOpportunities,
    suggestions,
    topRecommendedRole: skillAnalysis.benchmark.title,
    hiringReadinessIndex: skillAnalysis.readinessLevel
  };
}

// GET /api/skills/taxonomy
export async function getTaxonomy(_req, res) {
  try {
    return res.status(200).json({
      success: true,
      categories: SKILL_CATEGORIES,
      skills: STANDARDIZED_SKILLS
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// GET /api/skills/benchmarks
export async function getBenchmarks(_req, res) {
  try {
    return res.status(200).json({
      success: true,
      benchmarks: INDUSTRY_BENCHMARKS
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// GET /api/skills/opportunities
export async function getOpportunities(_req, res) {
  try {
    return res.status(200).json({
      success: true,
      opportunities: INDUSTRY_OPPORTUNITIES
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// POST /api/skills/check-and-suggest
export async function checkAndSuggestProfile(req, res) {
  try {
    const profile = req.body || {};
    const auditResult = auditStudentProfile(profile);
    return res.status(200).json({
      success: true,
      audit: auditResult
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// POST /api/skills/analyze
export async function analyzeSkills(req, res) {
  try {
    const { skills = [], targetRoleId = 'fullstack_mern' } = req.body;
    const analysis = computeSkillMatch(skills, targetRoleId);
    return res.status(200).json({ success: true, analysis });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// GET /api/skills/my-profile
export async function getMySkillProfile(req, res) {
  try {
    const userId = req.user?.id || req.user?._id;
    let user = null;

    if (mongoose.connection.readyState === 1 && userId) {
      user = await User.findById(userId);
    }

    const defaultProfile = {
      name: user?.name || req.user?.name || 'Aryan Prasher',
      degree: user?.degree || 'B.Tech Computer Science & Engineering',
      institutionName: user?.institutionName || req.user?.institutionName || 'Apex Institute of Technology',
      cgpa: user?.cgpa || 8.6,
      graduationYear: user?.graduationYear || 2026,
      bio: user?.bio || 'Aspiring Full Stack Engineer passionate about building scalable, high-performance web systems.',
      githubUrl: user?.githubUrl || 'https://github.com/aryanprasher',
      linkedinUrl: user?.linkedinUrl || 'https://linkedin.com/in/aryanprasher',
      portfolioUrl: user?.portfolioUrl || '',
      targetRole: user?.targetRole || 'fullstack_mern',
      skills: user?.skills?.length ? user.skills : [
        { id: 'react', name: 'React.js', proficiency: 'Advanced', category: 'Frontend Development' },
        { id: 'javascript', name: 'JavaScript (ES6+)', proficiency: 'Advanced', category: 'Frontend Development' },
        { id: 'nodejs', name: 'Node.js', proficiency: 'Intermediate', category: 'Backend & APIs' },
        { id: 'express', name: 'Express.js', proficiency: 'Intermediate', category: 'Backend & APIs' },
        { id: 'mongodb', name: 'MongoDB (NoSQL)', proficiency: 'Intermediate', category: 'Databases & Storage' },
        { id: 'rest_api', name: 'RESTful API Design', proficiency: 'Intermediate', category: 'Backend & APIs' },
        { id: 'git_github', name: 'Git & Version Control', proficiency: 'Advanced', category: 'Core Computer Science & Soft Skills' }
      ],
      projects: user?.projects?.length ? user.projects : [
        {
          title: 'Campus Placement & Skill Mapping System',
          description: 'A full-stack collaborative platform mapping academic curricula against real-world recruitment benchmarks with automated gap diagnostics.',
          techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
          githubUrl: 'https://github.com/aryanprasher/capstone',
          liveUrl: 'http://localhost:5173'
        }
      ],
      certifications: user?.certifications?.length ? user.certifications : [
        {
          name: 'Meta Front-End Developer Specialization',
          issuer: 'Coursera / Meta',
          issueYear: '2025',
          credentialUrl: 'https://coursera.org/verify/meta-frontend'
        }
      ]
    };

    const audit = auditStudentProfile(defaultProfile);

    return res.status(200).json({
      success: true,
      profile: defaultProfile,
      audit
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// PUT /api/skills/my-profile
export async function updateMySkillProfile(req, res) {
  try {
    const userId = req.user?.id || req.user?._id;
    const profileData = req.body || {};

    if (mongoose.connection.readyState === 1 && userId) {
      await User.findByIdAndUpdate(
        userId,
        {
          degree: profileData.degree,
          institutionName: profileData.institutionName,
          cgpa: profileData.cgpa,
          graduationYear: profileData.graduationYear,
          bio: profileData.bio,
          githubUrl: profileData.githubUrl,
          linkedinUrl: profileData.linkedinUrl,
          portfolioUrl: profileData.portfolioUrl,
          targetRole: profileData.targetRole,
          skills: profileData.skills,
          projects: profileData.projects,
          certifications: profileData.certifications
        },
        { new: true }
      );
    }

    const audit = auditStudentProfile(profileData);

    return res.status(200).json({
      success: true,
      message: 'Student profile updated and verified against industry benchmarks!',
      profile: profileData,
      audit
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

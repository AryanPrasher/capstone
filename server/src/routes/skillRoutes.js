import express from 'express';
import {
  getTaxonomy,
  getBenchmarks,
  getOpportunities,
  checkAndSuggestProfile,
  analyzeSkills,
  getMySkillProfile,
  updateMySkillProfile
} from '../controllers/skillController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes for skill taxonomies and benchmark standards
router.get('/taxonomy', getTaxonomy);
router.get('/benchmarks', getBenchmarks);
router.get('/opportunities', getOpportunities);
router.post('/analyze', analyzeSkills);
router.post('/check-and-suggest', checkAndSuggestProfile);

// User-authenticated profile routes
router.get('/my-profile', authenticateToken, getMySkillProfile);
router.put('/my-profile', authenticateToken, updateMySkillProfile);

export default router;

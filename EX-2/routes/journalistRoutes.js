import express from 'express';
import * as journalistController from '../controllers/journalistController.js';

const router = express.Router();

router.get('/', journalistController.getAllJournalists);
router.get('/:id', journalistController.getJournalistById);
router.post('/', journalistController.createJournalist);
router.put('/:id', journalistController.updateJournalist);
router.delete('/:id', journalistController.deleteJournalist);
router.get('/:id/articles', journalistController.getArticlesByJournalist);

export default router;

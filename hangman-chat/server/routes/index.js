import express from 'express';
import chatController from '../controllers/chatController';

const router = express.Router();

router.get('/', chatController.homePage);

export default router;
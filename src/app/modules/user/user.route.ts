import express from 'express';
import { auth } from '../../middleware/auth';
import { userControllers } from './user.controller';

const router = express.Router();

router.get('/', auth('Admin'), userControllers.getAllUsers);
router.put('/:_id', auth('Admin', 'User'), userControllers.updateUser);
// Delete a Book
router.delete('/:_id', auth('Admin'), userControllers.deleteUser);
export const UserRoutes = router;

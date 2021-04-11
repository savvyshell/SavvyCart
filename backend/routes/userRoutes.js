import express from 'express'
const router = express.Router()

// Middleware
import { protect, admin } from '../middleware/authMiddleware.js'

// Controllers
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUserProfileById,
    getUsers,
    deleteUserById,
    getUserById,
    updateUserById
} from '../controllers/userController.js'

/**
 * @base    GET /api/users
 */

router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers)

router.route('/login').post(authUser)
router.route('/profile/:id').get(protect, getUserProfileById)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/:id')
    .delete(protect, admin, deleteUserById)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUserById)

export default router

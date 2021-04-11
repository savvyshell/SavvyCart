import express from 'express'
const router = express.Router()

import { protect, admin } from "../middleware/authMiddleware.js"

// Controllers
import {
    index,
    show,
    remove,
    create,
    update,
    createReview,
    showTopRated } from '../controllers/productController.js'

/**
 * @base     /api/products/
 */

router.route('/')
    .get(index)
    .post(protect, admin, create)
router.route('/:id/reviews').post(protect, createReview)
router.route('/toprated').get(showTopRated)
router.route('/:id')
    .get(show)
    .delete(protect, admin, remove)
    .put(protect, admin, update)

export default router

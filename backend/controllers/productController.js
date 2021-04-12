import asyncHandler from 'express-async-handler'
import Product from "../models/productModel.js"

/**
 * @desc    Fetch all products
 * @route   GET /api/products/
 * @access  Public
 * */
const index = asyncHandler(async (req, res) => {
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
                                    .limit(pageSize)
                                    .skip(pageSize * (page - 1))
    res.json({ products, page, pages: Math.ceil(count / pageSize)})
})

/**
 * @desc    Fetch single product
 * @route   GET /api/products/:id
 * @access  Public
 * */
const show = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 * */
const remove = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

/**
 * @desc    Create a product
 * @route   POST /api/products/
 * @access  Private/Admin
 * */
const create = asyncHandler(async (req, res) => {
    try {
        const product = new Product({
            name: 'Sample name',
            price: 0,
            user: req.user._id,
            image: '/images/sample.jpg',
            brand: 'Sample brand',
            category: 'Sample category',
            countInStock: 0,
            numReviews: 0,
            description: 'Sample description'
        })

        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } catch (err) {
        throw new Error('Product creation failed')
    }
})

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 * */
const update = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            image,
            brand,
            category,
            countInStock
        } = req.body

        const product = await Product.findById(req.params.id)

        if (product) {
            product.name = name
            product.price = price
            product.description = description
            product.image = image
            product.brand = brand
            product.category = category
            product.countInStock = countInStock

            const updatedProduct = await product.save()
            res.json(updatedProduct)
        } else {
            res.status(404).json({ message: "Product not found" })
        }
    } catch (err) {
        throw new Error('Product update failed')
    }
})

/**
 * @desc    Create new review
 * @route   POST /api/products/:id/reviews
 * @access  Private
 * */
const createReview = asyncHandler(async (req, res) => {
    try {
        const {
            rating,
            comment
        } = req.body

        const product = await Product.findById(req.params.id)
        if (product) {
            const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
            if (alreadyReviewed) {
                res.status(400)
                throw new Error('Product already reviewed')
            }

            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            }

            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = product.reviews.reduce((accum, item) => item.rating + accum, 0) / product.reviews.length
            await product.save()
            res.status(201).json({ message: "Review added" })
        } else {
            throw new Error('Product not found')
        }
    } catch (err) {
        throw new Error('Product already reviewed')
    }
})

/**
 * @desc    Get top rated products
 * @route   GET /api/products/toprated
 * @access  Public
 * */
const showTopRated = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    if (products) {
        res.json(products)
    } else {
        res.status(404)
        throw new Error('Products not found')
    }
})

export {
    index,
    show,
    remove,
    create,
    update,
    createReview,
    showTopRated
}

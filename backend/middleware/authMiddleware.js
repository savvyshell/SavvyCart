import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {

    const authHeader = req.headers.authorization && req.headers.authorization.startsWith('Bearer')

    if (authHeader) {

        try {
            const bearerToken = req.headers.authorization.split(' ')[1]
            // console.log(bearerToken)
            const decoded = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (err) {
            console.log(err)
            res.status(401)
            throw new Error('Not authorized, invalid token!')
        }

    } else {
        res.status(401)
        throw new Error('Not authorized, no token!')
    }
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

export { protect, admin }

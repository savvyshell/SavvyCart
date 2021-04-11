import colors from 'colors'
import dotenv from 'dotenv'
import conn from './config/db.js'

// Preset Data
import usersData from './presets/data/users.js'
import productsData from './presets/data/products.js'

// Models
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'

dotenv.config()
await conn()

const clearData = async () => {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()
}

const importData = async (doc, options) => {
    try {
        await clearData()

        let adminUser = {}
        await User.insertMany(usersData, {}).then((res) => {
            adminUser = res.filter((user) => { return user.isAdmin })[0]._id
        })

        const productsSampleData = productsData.map((product) => {
            return { ...product, user: adminUser }
        })
        const generatedProducts = await Product.insertMany(productsSampleData, {})

        console.log(`Data Imported`.green.inverse)
        process.exit(0)
    } catch (err) {
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await clearData()
        console.log(`Data Destroyed`.red.inverse)
        process.exit(0)
    } catch (err) {
        console.err(`${err}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    await destroyData()
} else {
    await importData()
}

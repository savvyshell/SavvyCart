import mongoose from 'mongoose'
import colors from 'colors'

const conn = () => mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then((con) => {
    console.log(`MongoDB Connected for: ${con.connection.host}`.cyan.underline)
}).catch((err) => {
    console.error(`Error: ${err.message}`.red.underline.bold)
    process.exit(1)
})

export default conn

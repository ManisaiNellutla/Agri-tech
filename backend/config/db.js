// import mongoose from 'mongoose'

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//                 useNewUrlParser: true,
//                 useCreateIndex: true,
//                 useFindAndModify: false,
//                 useUnifiedTopology: true
//             })
//             console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
//     } catch (error) {
//         console.error(`Error: ${error.message}`.red.underline.bold)
//         process.exit(1)
//     }
// }

// export default connectDB;
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

// 👇 This makes sure .env from the parent folder is loaded
dotenv.config({ path: '../.env' })

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB

require("dotenv").config()
import mongoose from 'mongoose'

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

const dbConnect = async () => {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

// Schema

const AulaSchema = mongoose.Schema({
    name: String,
    id: Number,
    date: {$type: Date, default: Date.now()},
    algorithms: [{
        name: String,
        id: Number,
        lang: String,
        syntax: String,
        description: String,
        tags: [{
            type: String,
            value: String,
            level: {type: String, required: false}
        }],
        content: String
    }]
}, { typeKey: '$type' })

let Aula
try {
    Aula = mongoose.model('Aula')
} catch (error) {
    Aula = mongoose.model('Aula', AulaSchema)
        }

export {Aula, dbConnect}
import bcrypt from 'bcryptjs'

const users = [
    {
        name: "Admin User",
        email: "admin",
        password: bcrypt.hashSync('p123', 10),
        isAdmin: true,
    },
    {
        name: 'Jeff',
        email: 'jeff@example.com',
        password: bcrypt.hashSync('123', 10),
        isAdmin: false
    },
    {
        name: 'Mary',
        email: 'mary@example.com',
        password: bcrypt.hashSync('123', 10),
        isAdmin: false
    }
]

export default users

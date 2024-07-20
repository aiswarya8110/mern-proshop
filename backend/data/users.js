import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Admin User",
        email: 'admin@emial.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: "John Smith",
        email: 'johnsmith@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'John doe',
        email: 'johndoe@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    }
]

export default users;
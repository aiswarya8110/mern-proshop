import jwt from 'jsonwebtoken';

const generateToken = (userId, res)=>{
    const token = jwt.sign({_id: userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: true,
    })
}

export default generateToken;
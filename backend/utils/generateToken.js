import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
         expiresIn: '15d' 
        });

    res.cookie("jwt", token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        sameSite: 'Strict', // Helps prevent CSRF attacks
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        secure: process.env.NODE_ENV !== "development" // Use secure cookies in production
    });
};

export default generateTokenAndSetCookie;
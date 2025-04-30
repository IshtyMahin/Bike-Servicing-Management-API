import jwt, { JwtPayload } from "jsonwebtoken";


export const generateToken =(payload:any,secret:any,expiresIn:any)=>{
    const token = jwt.sign(
        payload,
        secret,
        {
            algorithm: "HS256",
            expiresIn
        }
    );

    return token;
}

export const verifyToken = (token:string, secret:string) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded as JwtPayload;
    } catch (error) {
        throw new Error("Invalid token");
    }
}
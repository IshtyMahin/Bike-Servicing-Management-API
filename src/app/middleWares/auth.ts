import config from "../../config"
import { verifyToken } from "../../helpers/jwtHelpers"
import express from 'express'
import httpStatus  from "http-status"
import ApiError from "../errors/ApiError"

const auth = (...roles:string[])=>{
    return (req:express.Request  & {user?:any}, res:express.Response, next:express.NextFunction)=>{
        try {
            const token = req.headers.authorization
            if(!token){
                throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized")
            }
            
            const verifiedUser = verifyToken(token, config.jwt.secret as string)
            
            if(roles.length && !roles.includes(verifiedUser.role)){
                throw new ApiError(httpStatus.FORBIDDEN,"FOrbidden!!, you are not allowed to access this route")
            }
            req.user = verifiedUser
            next()

        } catch (error) {
            next(error)
        }
    }
}

export default auth
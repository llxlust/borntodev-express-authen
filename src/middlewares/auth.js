import db from "../config/db.js"
import { ErrorResponse } from "../utils/errorResponse.js"
import jwt from 'jsonwebtoken'
export const Protect = async (req,res,next) => {
    let token
   
    if(req.headers.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        next(new ErrorResponse('Not authorized to access this route',401))
        //return
    }
    try{
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        //console.log(decoded,":decoded")
        const currentUser = db.query('SELECT * FROM users WHERE id = ?',[decoded.id],(error,result)=>{
            if(error){
                next(new ErrorResponse('User id not found',400))
                return
            }
            
            return result
        })
        if(currentUser){
          next()
        }else{
            next(new ErrorResponse('User id not found',400))
            return
        }
    }catch(error){
        next(new ErrorResponse('Your token is invalid', 401))
    }
}
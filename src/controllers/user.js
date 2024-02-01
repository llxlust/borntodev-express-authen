import db from "../config/db.js"
import { ErrorResponse } from "../utils/errorResponse.js"

export const  getAllUser = (req,res,next) => {
 const sql = `SELECT * FROM users`
 db.query(sql,(error,result)=>{
    if(error){
        next(new ErrorResponse(error.sqlMessage,404))
    }
    else{
        res.status(200).json({data:result})
    }
 })
}

// export const getUserById = (req,res,next) => {
//     const sql = `SELECT * FROM user WHERE id = ?`
//     db.query(sql,[req.params.id])
// }
import bcrypt from 'bcryptjs'
import db from '../config/db.js'
import jwt from 'jsonwebtoken'
import { ErrorResponse } from '../utils/errorResponse.js'
import * as dotenv from 'dotenv'
dotenv.config()
export const register = async (req,res,next) => {
    const {username,password} = req.body
    const salt = await bcrypt.genSalt(10)
    const cryptPass = await bcrypt.hash(password,salt)
    const sql = 'insert into users (username,password) value(?,?) '
    db.query(sql,[username,cryptPass],(error,result)=>{
        if(error){
           // const error = new ErrorResponse("ทำเซิฟพังทำไมครับ",500)
           next(new ErrorResponse(error.sqlMessage,404))
        }
        else{
            sendTokenResponse(req.body,202,res)
        }
    })
}

export const login = async (req,res,next) => {
  const {username,password} = req.body

  if(!username || !password ){
    next(new ErrorResponse("Please provide email or password",400))
  }


    const sql = 'SELECT * FROM users WHERE username = ?'
       db.query(sql,[username],(error,result)=>{
        if(error){
          console.group(error,":error")
          next(new ErrorResponse('not found user',401))
        }else{
          const isMatch = bcrypt.compare(password,result[0].password)

          if(!isMatch){
            next(new ErrorResponse('Password is in correct',401))
            return
          }
          sendTokenResponse(result[0],200,res)
        }
      })
  }


const sendTokenResponse = async (user,statusCode,res) => {
    const token = jwt.sign(user,process.env.JWT_SECRET)
      res.status(statusCode).json({
        data: { user, token },
        timestamp: Date.now()
      })
}



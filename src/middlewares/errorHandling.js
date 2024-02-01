export const ErrorHandling = (err,req,res,next) => {
   res.status(err.statusCode).json({message:err.message,status:err.statusCode})
}

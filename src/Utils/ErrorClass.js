class ErrorClass extends Error {
    constructor(message,status){
        super(message)
        this.status=status
    }
}

 const asyncHandler = (fn)=>{
    return (req,res,next)=>{
      return fn(req,res,next).catch(err=>{
       return next(new Error(err))
      })
    }
 }
 
 
 
 
 
  const GlobalErrorHandling = (error,req,res,next)=>{
    return res.json({message:"G err",errMsg:error.message,errstack:error.stack})
 }

 module.exports = {
    asyncHandler,GlobalErrorHandling,ErrorClass
  }


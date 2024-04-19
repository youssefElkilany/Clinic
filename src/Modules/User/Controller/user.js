const client = require ("../../../../DB/Connection.js")


 const getUsers = async(req,res,next)=>{

    let id = 10
    client.query(`Select * from users WHERE id = '${id}'`,(err,result)=>{
        if(err)
        {
            return res.json({message: "err",err,errMessage:err.message,stack:err.stack})
        }
        return  res.json({message:"done",result:result.rows})
    })
  
}

const getdoctors = (req,res,next)=>{
    let role = 'doctor'
    client.query(`Select * from users WHERE role = '${role}'`,(err,result)=>{
        if(err)
        {
            return res.json({message: "err",err,errMessage:err.message,stack:err.stack})
        }
        return  res.json({message:"done",result:result.rows})
    })
}


const allUsers = async(req,res,next)=>{

    // let id = 10
     client.query(`Select * from users`,(err,result)=>{
         if(err)
         {
             return res.json({message: "err",err,errMessage:err.message,stack:err.stack})
         }
         return  res.json({message:"done",result:result.rows})
     })
   
 }


module.exports= {
    getUsers,allUsers,getdoctors
}
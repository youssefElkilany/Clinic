const client = require("../../../../DB/Connection.js")
//const ErrorClass = require("../../../Utils/ErrorClass.js")
var bcrypt = require('bcryptjs');
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
const { asyncHandler } = require("../../../Utils/ErrorClass.js");


const signUp =asyncHandler( async(req,res,next)=>{

    console.log("d5lt")
   
        let {id,name,email,password,cpassword,phone,role} = req.body

    console.log({id,name,email,password,cpassword,phone,role})
    if(password!=cpassword)
    {
        client.end()
       return next(new Error('password mismatch'))
    }

   client.query(`SELECT email FROM users WHERE email = '${email}'`,(err,result)=>{
         if(err)
         {
            client.end()
            return next(new Error(err.message)) 
         }
         
         console.log({rows:result.rowCount})
          if(result?.rowCount>0)
          {
            client.end()
            return res.json({message:"email already exist"})   
          }
          else{
            const hashedpass = bcrypt.hashSync(password,5)

            const cryptedPhone = CryptoJS.AES.encrypt(phone,'key').toString()
          
           
          
            const query = `INSERT INTO users(name , email , password ,phone ,role) VALUES('${name}','${email}','${hashedpass}','${cryptedPhone}','${role}')` 
             client.query(query,(err,result)=>{
              if(err)
              {
                  client.end()
                  return res.json({message: "err",err,errMessage:err.message,stack:err.stack}) 
              }
              client.end()
                 return res.json({message:"added succssefully",result})
          
            })
          }
        // return res.json({message:"no user found"})
    })
    //console.log({userssss:user})
//   const hashedpass = bcrypt.hashSync(password,5)

//   const cryptedPhone = CryptoJS.AES.encrypt(phone,'key').toString()

 

//   const query = `INSERT INTO users(name , email , password ,phone ,role) VALUES('${name}','${email}','${hashedpass}','${cryptedPhone}','${role}')` 
//    client.query(query,(err,result)=>{
//     if(err)
//     {
//         client.end()
//         return res.json({message: "err",err,errMessage:err.message,stack:err.stack}) 
//     }
//     client.end()
//        return res.json({message:"added succssefully",result})

//   })


//})
    // const query4 = `SELECT * FROM users WHERE email = ${email}`
    // client.query(query4,(err,result)=>{
    //     if(err)
    //     {
    //         return res.json({message: "err",err,errMessage:err.message,stack:err.stack})
    //     }
    //     let token = jwt.sign({id:result.rows[0].id,email},'hambozo',{expiresIn:"1y"})
    //     return res.json({message:"added succssefully",token})
    // })
    //
    
//client.end
   

})


const login = (req,res,next)=>{

    const {email,password,role}=req.body

//n3ml query t3ml check lel email b3deha n3ml check en pass = password

    const query = `Select * from users WHERE email = '${email}' AND role = '${role}'`
    client.query(query,(err,result)=>{
        if(err)
        {
            return res.json({message: "err",err,errMessage:err.message,stack:err.stack})
        }
        console.log(result.rows)
        if(!result.rowCount || !bcrypt.compareSync(password,result.rows[0].password))
        {
            return next(new Error("email not found or wrong pass"))
        }
        //console.log(result.rows[0].userId)
        let token = jwt.sign({id:result.rows[0].id,email},'hambozo',{expiresIn:"1h"})
        return res.json({message:"done",token})
    })

    // const hashedpass = bcrypt.compareSync(password)





}

module.exports = {
    signUp,login
}
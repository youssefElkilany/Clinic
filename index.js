const express = require("express")
const Bootstrap =require("./src/index.route.js")
const cors = require('cors')
const app = express()
const dotenv =require('dotenv')
dotenv.config()
app.use(cors())
//const path =require('path')
//const  fileURLToPath  =require( 'url')

//set directory dirname 
 //const _dirname = path.dirname(fileURLToPath(import.meta.url))
//dotenv.config({ path: path.join(_dirname, './config/.env') })


const port = process.env.LOCAL_PORT || 3000

Bootstrap(express,app)



app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
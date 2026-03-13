const express = require("express")
const fetch = require("node-fetch")

const app = express()

app.use(express.json())
app.use(express.static("."))

app.post("/join", async (req,res)=>{

  const { id, name } = req.body

  try{

    const r = await fetch("https://api.blooket.com/api/users/join",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({ id, name })
    })

    const data = await r.json()

    res.json(data)

  }catch(err){

    res.json({
      success:false,
      msg:"Server error"
    })

  }

})

app.listen(3000, ()=>{
  console.log("Server running")
})

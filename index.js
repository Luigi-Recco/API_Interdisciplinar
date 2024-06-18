const express = require("express");
const mongoose  = require("mongoose");
const bcrypt = require("bcrypt")

const app = express();
app.use(express.json())
const port = 3000
mongoose.connect('mongodb+srv://luigireccopinheiro:QKDvxFwL3c1qrt95@cluster0.ugd4sgt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const User = mongoose.model('Users',{
    name:String,
    password:String ,
    age:Number,
    id:Number
})

const encrypt = async(password)=>{
    return await bcrypt.hash(password,10);
    }


//Create
app.post('/',async (req,res)=>{
    let encrypt = req.body.password;
    const salt = await bcrypt.genSalt(10);
    encrypt = await bcrypt.hash(encrypt,salt)

    const user = new User({
        name:req.body.name,
        password:encrypt,
        age:req.body.age,
        id:req.body.id

    })

    await user.save()
    return res.send(user) 
    
})
//Read
app.get('/', async(req,res)=>{
    const user = await User.find()
    return res.send(user)
})

//Update
app.put('/:id', async(req,res)=>{
    let encrypt = req.body.password;
    const salt = await bcrypt.genSalt(10);
    encrypt = await bcrypt.hash(encrypt,salt)

    const user = await User.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        password:encrypt,
        age:req.body.age,
        id:req.body.id
    })
    return res.send(user)

})

// Delete
app.delete('/:id', async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id)
     return res.send(user)
})

app.listen(port, ()=>{
console.log("Tá funcionando")
})


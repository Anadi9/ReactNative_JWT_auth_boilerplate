const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        const token = jwt.sign({userId: user._id}, process.env.JWT_KEY)
        res.status(200).json({
            message: 'Signup successful',
            user: req.body,
            token: token,
        });
    } catch (err) {
        console.log('Error', err);
        return res.status(401).send(err.message)
    };
});


router.post('/signin',async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).send({error :"must provide email or password"})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(422).send({error :"must provide email or password"})
    }
    try{
      await user.comparePassword(password);    
      const token = jwt.sign({userId:user._id},process.env.JWT_KEY)
      res.send({token})
    }catch(err){
        return res.status(422).send({error :"must provide email or password"})
    }
})


module.exports = router;
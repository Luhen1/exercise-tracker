const User = require('../Models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
       
    try{
          const { email, password } = req.body;

          if (!email || !password)
          return res
          .status(400)
          .json({errorMessage: "Please enter all required fields." });
          
          const existingUser = await User.findOne({ email });

          if (!existingUser){

              return res.status(404).json({errorMessage: "Wrong email or password." });
            }
            
            const passwordCorrect = await bcrypt.compare(
                password, 
                existingUser.passwordHash
                );

                if (!passwordCorrect)
                return res.status(401).json({errorMessage: "Wrong email or password."});
                
                // sign the token
                
                const token = jwt.sign(
                    {
                        user: existingUser.id,
                    },
                    process.env.JWT_SECRET
                    );
                    
                    // send the token in a HTTP-only cookie
                    
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                    })
                    .send();
                }  catch (err) {
                    console.error(err);
                    res.status(500).send();
                  }
                
                return res.status(200).json({message:"Login successful"});
            };
        
const register = async (req, res) => {
        try {
            const {email, password, passwordVerify } = req.body;
            

            if (!email || !password || !passwordVerify) 
                return res.status(400).json({errorMessage:"Por favor, insere os dados corretamente"});
            if (password.length < 6)
                return res.status(400).json({errorMessage:"Por favor, insere no minimo 6 caracteres"});
            if (password !== passwordVerify)
                return res.status(400).json({
                    errorMessage: "Por favor, insere a mesma senha 2 vez",
                });
            const existingUser = await User.findOne({email});
            if (existingUser)
                return res.status(400).json({
                    errorMessage: "Existe uma conta com este email.",
                });
            else {res.status(200).json({message: "Account is created"})}
            //hash password
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
    
            // save new user account
    
            const newUser = new User({
                email, passwordHash
            });
    
            const savedUser = newUser.save();
    
            //log the user in
    
            const token = jwt.sign(
                {
                    user: savedUser._id,
                }, 
                process.env.JWT_SECRET
            );
    
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            }).send();
    
        }catch (err) {
            console.error(err);
            res.status(500).send();
        }
    };

const logout = async (req, res) => {
        res.cookie("token", "", {
          httpOnly: true,
          expires: new Date(0),
        })
        .send({message: "logged out"});
      };

const loggedIn = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);
    
        jwt.verify(token, process.env.JWT_SECRET);
    
        res.send(true);
      } catch (err) {
        res.json(false);
      }
}

module.exports = {login, register, logout, loggedIn};
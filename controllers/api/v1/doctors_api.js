// requiring jsonwebtoken to create token
const jwt = require('jsonwebtoken');
const Doctor = require('../../../models/doctor');

module.exports.register = async function(req, res){

    try{
        // finding if doctor already registered with provided email
        let doctor = await Doctor.findOne({email: req.body.email});
        if(doctor){
            return res.json(200, {
                message: "You are already registered!"
            });
        }
        // creating new entry in DB for Doctor
        let new_doctor = await Doctor.create({email: req.body.email, password: req.body.password, name: req.body.name});
        return res.json(500, {
            message: "Registered Successfully!",
            data:new_doctor
        });
        
    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}

// creating JWT for doctor after log-in
module.exports.createSession = async function(req, res){

    try{
        // finding doctor with given email
        let doctor = await Doctor.findOne({email: req.body.email});
        // checking if doctor exist and password is correct or not 
        if (!doctor || doctor.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:  {
                token: jwt.sign(doctor.toJSON(), 'secret_key', {expiresIn:  '1000000'}) // returning a JWT after successfull login
            }
        })

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}
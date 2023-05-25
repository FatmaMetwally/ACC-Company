const app = require('express').Router()
const { body, validationResult } = require('express-validator');
const ApplicantModel=require('../models/user.model')
app.post('/SendInformation', [
  body('Iam_Individual').trim().notEmpty().withMessage('You Should Choose you are Individual or Owner'),
  body('Iam_Owner_Of_CallCenter').trim().notEmpty().withMessage('You Should Choose you are Individual or Owner'),
  body('name').trim().notEmpty().withMessage('Name is required'),

  body('email').trim().isEmail().withMessage('Invalid email address'),
  body('phone').isMobilePhone().withMessage('Phone number is invalid'),
  //example of a valid Skype ID: live:jane.doe_1234
  body('skype').optional().matches(/^[a-zA-Z][a-zA-Z0-9\.,\-_]{5,31}$/).withMessage('Skype ID is invalid'),
  body('age').custom((value) => {
     const age = parseInt(value);
       if (!Number.isInteger(age) || age < 0 || age > 120) {
         throw new Error('Age is invalid');
         }
         return true;
  }),
  body('location').matches(/^[a-zA-Z\s]+,\s*[a-zA-Z\s]+$/).withMessage('Location is invalid You Should enter your Country followed by & then your city'),
  body('previousExperience').isNumeric().notEmpty().withMessage('Previous Experience in years is required'),
  body('DialedVertical').notEmpty().withMessage('Dialed Vertical is required'),
 
], 



async(req, res) => {
  try {
    const {Iam_Individual,Iam_Owner_Of_CallCenter,name,email,phone ,skype,age,location,previousExperience,DialedVertical}=req.body
    const [country,city] = req.body.location.split(',').map(part => part.trim())
   // Check for validation errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(422).json({ errors: errors.array() });
   }
 
   // If there are no validation errors, proceed with registration logic
   else {
     const Applicant= await ApplicantModel.findOne({email})
     if (Applicant)
     {
         
         res.status(409).json({ message: "Email already exist" })
     }
     else{
         await  ApplicantModel.insertMany({Iam_Individual,Iam_Owner_Of_CallCenter,name,email,phone ,skype,age,country,city,previousExperience,DialedVertical})
         res.status(200).json({message:"Your Appplication is send Successfully"})
     }
 
 
 
 
  }
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: err});
  }
   
});
module.exports=app

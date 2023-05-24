const mongoose = require('mongoose');
const ApplicantSchema= mongoose.Schema({
     Iam_Individual:Boolean,
     Iam_Owner_Of_CallCenter:Boolean,
     name:String,
     email:String,
     phone : String,
     skype:String,
     age:Number,
     country:String,
     city:String,
     previousExperience:Number,
     DialedVertical:String,
   

})
module.exports= mongoose.model('Applicant',ApplicantSchema)

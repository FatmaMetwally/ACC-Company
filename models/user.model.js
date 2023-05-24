const mongoose = require('mongoose');
const ApplicantSchema= mongoose.Schema({
     chosenRole:String,
     name:String,
     email:String,
     phone : String,
     skype:String,
     age:Number,
     country:String,
     city:String,
     previousExperience:String,
     DialedVertical:String

})
module.exports= mongoose.model('Applicant',ApplicantSchema)
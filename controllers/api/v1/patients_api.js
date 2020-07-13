const Patient = require('../../../models/patient');
const Report = require('../../../models/report');
// requiring 'generate-password' library to generate random password
var generator = require('generate-password');
// requiring password_mailer to send password via mail
const passwordMailer = require('../../../mailers/password_mailer');

// registering a patient
module.exports.register = async function(req, res){

    try{
        // Checking if patient already registered or not
        let patient = await Patient.findOne({mobile: req.body.mobile});
        if(patient){
            return res.json(200, {
                message: "You are already registered!"
            });
        }
        // registering a new patient after generating random password
        var password = generator.generate({
            length: 10,
            numbers: true
        });
        
        let new_patient = await Patient.create({mobile: req.body.mobile, password:password, name: req.body.name, email: req.body.email, doctor: req.user.id});
        new_patient = await new_patient.populate('doctor').execPopulate();
        // sending password to patient mail
        passwordMailer.patientPassword(new_patient);
        
        return res.json(500, {
            message: "Patient Registered Successfully, password sent to patient's mail",
            data: {
                id: new_patient.id,
                patient_name: new_patient.name,
                email: new_patient.email,
                mobile: new_patient.mobile,
                doctor: new_patient.doctor.name
            }
        });
        
    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}

// creating a report
module.exports.createReport = async function(req, res){
    
    try{
        let patient = await Patient.findById(req.params.id);
        // if patient exist, create report for that patient in Report model
        if(patient){
            let report = await Report.create({ comments : req.body.comments, patient:req.params.id, status : req.body.status, doctor:req.user._id });
            return res.json(200, {
                message: "Report Created!",
                data:report
            });
        }
        // if patient not registred
        return res.json(200, {
            message: "Patient not Registered",
        });
        
    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}

// patient can check all his/her reports
module.exports.allReports = async function(req, res){
    // finding a patient
    let patient = await Patient.findById(req.params.id);
    // checking if password is correct or not
    if(req.body.password != patient.password){
        return res.json(422, {
            message: "Invalid username/password",
        });
    }

    try{
        // finding patients all reports
        let reports = await Report.find({patient: req.params.id})
        .sort('-createdAt')
        .populate('patient', 'name mobile')
        .populate('doctor', 'name email');

        if(reports && reports.length != 0){
            return res.json(200, {
                message: "List of Reports",
                data:reports
            });
        }
        // if no reports
        return res.json(200, {
            message: "No reports",
        });
        
    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}